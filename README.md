# deploy

Faire le script shell pour l'installation

npm i dans ./frontend/app ?

docker compose up --build

Une fois que docker tourne :

-   faire les migration (très important si non pas de fonctionnement de l'application) php artisan migrate
-   faire les seed (optionnel) php artisan db:seed