## Project Get Started

- Back-end and api starting (in Webapp folder)
``` 
npm run start
```
- Seed of prices starting to inject prices in database (in Webapp folder)
```
npm run seed
```
- Launch php script in order to inject all other data in database (in generateur IRL Party folder)
```
php script.php
```
- Launch the Front-end for user experience (in Webapp folder)
```
npm run serve
```

## Project configuration

- clone the project

```
git clone git@rendu-git.etna-alternance.net:module-7997/activity-43897/group-873583
```

- postgres installation (shell installation)

```
sudo apt install postgresql
```

- check postgresql status :
```
service postgresql status
```


- pgadmin4 installation (gui client)

```
sudo curl https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo apt-key add
sudo sh -c 'echo "deb https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list && apt update'
sudo apt install pgadmin4
```

- web version configuration (optional)

```
sudo /usr/pgadmin4/bin/setup-web.sh
```

- psql shell configuration (windows/linux)

```
SELECT usename FROM pg_user;
CREATE USER $USER;
SELECT usename FROM pg_user;
\du;
ALTER USER $USER WITH SUPERUSER;


sudo -u postgres createuser --superuser $USER
psql postgres $USER
\password sde $USER
GRANT CONNECT ON DATABASE DATABASE_NAME TO $USER;
GRANT USAGE ON SCHEMA public TO $USER;
```

- launch shell

```
psql postgres $USER
```

- database creation

```
create database vdm;
```

- connect database as user

```
\c vdm
```

- show tables with indexes

```
\d+
```
