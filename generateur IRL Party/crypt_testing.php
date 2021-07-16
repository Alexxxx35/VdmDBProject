
<?php
$mail = 'kenyon.lbert@gogole.com';
$hashed_password = crypt($mail, '$5$' . "rounds=" . '5' . "thebestworldhash");
print_r($hashed_password);
if (hash_equals($hashed_password, crypt($mail, $hashed_password))) {
    echo "\nMot de passe correcte !\n";
} else {
    echo "\nMot de passe incorrecte !\n";
}

?>
