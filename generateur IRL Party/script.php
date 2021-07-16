<?php

use EscapeGame\Database;

require_once 'lib/autoload.php';

$faker = Faker\Factory::create();
$escapegame = new Database();

if (empty($argv[1])) {
    $timer = 1000000;
} else {
    $timer = $argv[1] * 1000;
}

$user = 'admin';
$password = '12345';

//$myPDO = new PDO('pgsql:host=localhost;dbname=vdm', $user, $password);
//$myPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

function insertBuyerData($data, $pdo)
{

    $rounds = 5; // Used for crypting emails
    $salt = 'thebestworldsalt';
    $crypted_email = crypt($data['Acheteur']['Email'], '$5$' . "rounds=" . $rounds . strrev($salt));

    $buyer_exist_SQL = 'SELECT buyer_id FROM Buyer WHERE buyer_email = :email';
    $statement = $pdo->prepare($buyer_exist_SQL);
    $statement->bindValue(':email', $crypted_email, PDO::PARAM_STR);
    $statement->execute();
    $res = $statement->fetch();
    if (isset($res['buyer_id'])) {
        return $res['buyer_id'];
    }

    $buyer_sql = 'INSERT INTO Buyer(buyer_fname,buyer_lname,buyer_age,buyer_email,buyer_civ) values(:fname,:lname,:age,:email,:civ)';
    $statement = $pdo->prepare($buyer_sql);

    $statement->bindValue(':fname', $data['Acheteur']['Prenom'], PDO::PARAM_STR);
    $statement->bindValue(':lname', $data['Acheteur']['Nom'], PDO::PARAM_STR);
    $statement->bindValue(':age', $data['Acheteur']['Age'], PDO::PARAM_INT);
    $statement->bindValue(':email', $crypted_email, PDO::PARAM_STR);
    $statement->bindValue(':civ', $data['Acheteur']['Civilite'], PDO::PARAM_STR);

    $statement->execute();
    return $pdo->lastInsertId('buyer_buyer_id_seq');
}

function insertSpectatorData($data, $pdo)
{
    $spectator_sql = 'insert into Spectator(spectator_fname,spectator_lname,spectator_age,spectator_civ) values(:fname,:lname,:age,:civ)';
    $statement = $pdo->prepare($spectator_sql);
    $idList = [];
    foreach ($data['Reservation'] as $element) {
        $statement->bindValue(':civ', $element["Spectateur"]["Civilite"], PDO::PARAM_STR);
        $statement->bindValue(':lname', $element['Spectateur']['Nom'], PDO::PARAM_STR);
        $statement->bindValue(':fname', $element['Spectateur']['Prenom'], PDO::PARAM_STR);
        $statement->bindValue(':age', $element['Spectateur']['Age'], PDO::PARAM_INT);
        $statement->execute();
        array_push($idList, $pdo->lastInsertId('spectator_spectator_id_seq'));
    }

    return $idList;
}

function insertGameData($data, $pdo)
{
    if ($data['Game']['VR'] == "Oui") {
        $data['Game']['VR'] = true;
    } else {
        $data['Game']['VR'] = false;
    }
    $pieces = explode(":", $data['Game']['Horaire']);
    $hours = $pieces[0] * 60;
    $minutes = $pieces[1];


    $game_exist_SQL = 'SELECT game_id FROM Game WHERE game_name= :gname AND game_timestamp = :tstamp AND game_day = :gday AND game_vr= :gvr';
    $statement = $pdo->prepare($game_exist_SQL);
    $statement->bindValue(':gname', $data['Game']['Nom'], PDO::PARAM_STR);
    $statement->bindValue(':gday', $data['Game']['Jour'], PDO::PARAM_STR);
    $statement->bindValue(':gvr', $data['Game']['VR'], PDO::PARAM_BOOL);
    $statement->bindValue(':tstamp', $hours + $minutes, PDO::PARAM_INT);


    $statement->execute();
    $res = $statement->fetch();
    if (isset($res['game_id'])) {
        return $res['game_id'];
    }

    $gamesql = 'insert into Game(game_name,game_timestamp,game_day,game_vr) values(:name,:timestamp,:date,:vr)';
    $statement = $pdo->prepare($gamesql);
    $statement->bindValue(':name', $data['Game']['Nom'], PDO::PARAM_STR);
    $statement->bindValue(':date', $data['Game']['Jour'], PDO::PARAM_STR);

    $statement->bindValue(':vr', $data['Game']['VR'], PDO::PARAM_BOOL);

    $statement->bindValue(':timestamp', $hours + $minutes, PDO::PARAM_INT);

    $statement->execute();
    return $pdo->lastInsertId('game_game_id_seq');
}


function insertBookingData($data, $pdo)
{
    try {
        $pdo->beginTransaction();
        $bookingsql = ('insert into Booking(game_id,buyer_id,spectator_id,booking_price) values (:game,:buyer,:spectator,:price)');
        $statement = $pdo->prepare($bookingsql);
        $buyer_id = insertBuyerData($data, $pdo);
        $game_id = insertGameData($data, $pdo);

        $array = insertSpectatorData($data, $pdo);
        $i = 0;
        foreach ($data['Reservation'] as $element) {
            $statement = $pdo->prepare($bookingsql);
            $statement->bindValue(':buyer', $buyer_id);
            $statement->bindValue(':game', $game_id);

            $statement->bindValue(':spectator', $array[$i]);
            if ($element['Tarif'] == 'Plein tarif') {
                $statement->bindValue(':price', 'Plein tarif', PDO::PARAM_STR);
            } else if ($element['Tarif'] == 'Tarif reduit') {
                $statement->bindValue(':price', 'Tarif réduit', PDO::PARAM_STR);
            } else if ($element['Tarif'] == 'Senior') {
                $statement->bindValue(':price', 'Senior', PDO::PARAM_STR);
            } else {
                $statement->bindValue(':price', 'Etudiant', PDO::PARAM_STR);
            }

            $i++;
            $statement->execute();
        }
        $pdo->commit();
    } catch (\PDOException $e) {
        // rollback the changes
        $pdo->rollBack();
        throw $e;
    }
}

function insertBuyerDataThroughApi($json)
{
    $url = "http://127.0.0.1:8080/api/buyer/";
    $payload = array(
        "buyer_fname" => $json['Acheteur']['Prenom'],
        "buyer_lname" => $json['Acheteur']['Nom'],
        "buyer_age" => $json['Acheteur']['Age'],
        "buyer_civ" => $json['Acheteur']['Civilite'],
        "buyer_email" => $json['Acheteur']['Email']
    );

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($payload)
        )
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    if ($result === FALSE) {
        echo "ERROR BUYER!!!!!!!!!!!!!!!!!";
    }
    preg_match("/\d+/", $result, $last_id);
    //var_dump($result);

    return $last_id[0];
}

function insertSpectatorDataThroughApi($json)
{
    $url = "http://127.0.0.1:8080/api/spectator/";
    $payload = array(
        "spectator_fname" => $json['Spectateur']['Prenom'],
        "spectator_lname" => $json['Spectateur']['Nom'],
        "spectator_age" => $json['Spectateur']['Age'],
        "spectator_civ" => $json['Spectateur']['Civilite'],
    );

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($payload)
        )
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    if ($result === FALSE) {
        echo "ERROR SPECTATOR!!!!!!!!!!!!!!!!!";
    }

    preg_match("/\d+/", $result, $last_id);
    //var_dump($result);
    return $last_id[0];
}

function insertGameDataThroughApi($json)
{
    $pieces = explode(":", $json['Game']['Horaire']);
    $hours = $pieces[0] * 60;
    $minutes = $pieces[1];
    $correct_timestamp = $hours + $minutes;

    if ($json['Game']['VR'] == "Oui") {
        $correct_bool = true;
    } elseif ($json['Game']['VR'] == "Non") {
        $correct_bool = false;
    }

    $url = "http://127.0.0.1:8080/api/game/";
    $payload = array(
        "game_name" => $json['Game']['Nom'],
        "game_timestamp" => $correct_timestamp,
        "game_day" => $json['Game']['Jour'],
        "game_vr" => $correct_bool,
    );
    //print_r($payload);
    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($payload)
        )
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    if ($result === FALSE) {
        echo "ERROR GAME!!!!!!!!!!!!!!!!!";
    }

    preg_match("/\d+/", $result, $last_id);
    //var_dump($result);

    return $last_id[0];
}

function insertBookingDataThroughApi($json)
{
    $url = "http://127.0.0.1:8080/api/booking/";

    $buyer_id = insertBuyerDataThroughApi($json);
    $game_id = insertGameDataThroughApi($json);
    //print_r($json["Reservation"]);
    foreach ($json["Reservation"] as $reservation) {
        $spectator_id = insertSpectatorDataThroughApi($reservation);
        //echo $spectator_id."\n";
        $payload = array(
            "buyer_id" => $buyer_id,
            "game_id" => $game_id,
            "spectator_id" => $spectator_id,
            "booking_price" => $reservation['Tarif']
        );
        print_r($payload);
        $options = array(
            'http' => array(
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                'method'  => 'POST',
                'content' => http_build_query($payload)
            )
        );
        $context  = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        if ($result === FALSE) {

            echo "BOOKING ERROOOOOOR";
        }
        // var_dump($result);
    }
}


while (true) {
    usleep($timer);
    $firstAge = $escapegame->getAge();
    $nbTickets = $escapegame->getNbTickets();
    $firstCivility = $escapegame->getGender(false);
    $firstNom = $faker->firstName;
    $firstPrenom = $faker->firstName;
    $firstEmail = $firstNom . '.' . $firstPrenom . '@' . $escapegame->getSuffixEmail();
    $firstPersonType = $escapegame->getPersonType($firstAge);

    $result['Acheteur']['Civilite'] = $firstCivility;
    $result['Acheteur']['Nom'] = $firstNom;
    $result['Acheteur']['Prenom'] = $firstPrenom;
    $result['Acheteur']['Age'] = $firstAge;
    $result['Acheteur']['Email'] = strtolower($firstEmail);
    $result['Game']['Nom'] = $escapegame->getEscapeGameName();
    $result['Game']['Jour'] = $escapegame->getReservationDate();
    $result['Game']['Horaire'] = $escapegame->getReservationHour();
    $result['Game']['VR'] = $escapegame->useVirtualReality();
    for ($i = 0; $i < $nbTickets; $i++) {
        if ($i == 0) {
            $result['Reservation'][$i]['Spectateur']['Civilite'] = $firstCivility;
            $result['Reservation'][$i]['Spectateur']['Nom'] = $firstNom;
            $result['Reservation'][$i]['Spectateur']['Prenom'] = $firstPrenom;
            $result['Reservation'][$i]['Spectateur']['Age'] = $firstAge;
            $result['Reservation'][$i]['Tarif'] = $firstPersonType;
        } else {
            $otherAge = $escapegame->getAge();
            $otherCivility = $escapegame->getGender(false);
            $otherNom = $faker->firstName;
            $otherPrenom = $faker->firstName;
            $otherPersonType = $escapegame->getPersonType($otherAge);

            $result['Reservation'][$i]['Spectateur']['Civilite'] = $otherCivility;
            $result['Reservation'][$i]['Spectateur']['Nom'] = $otherNom;
            $result['Reservation'][$i]['Spectateur']['Prenom'] = $otherPrenom;
            $result['Reservation'][$i]['Spectateur']['Age'] = $otherAge;
            $result['Reservation'][$i]['Tarif'] = $otherPersonType;
        }
    }
    // foreach ($result["Reservation"] as $e) {
    //     print_r($e);
    // }
    // echo "TOOOOOOOOOOOOOOOOOOOOOOOOOOOOOTAL";
    // print_r($result);
    //echo json_encode($result);
    //echo PHP_EOL;
    insertBookingDataThroughApi($result);
}
