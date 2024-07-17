# deploy

Prérequis :

 -Installer git :
 
    -sudo apt update
    -sudo apt install git
  
 Vérifier que git est bien installé (optionnel):
 
    -git --version


 -Installer python3-distutils :  
 
    -sudo nano /etc/apt/sources.list
  
  Ajoutez ou décommentez les lignes suivantes si elles ne sont pas présentes :
  
     -deb http://archive.ubuntu.com/ubuntu/ focal main universe
     -deb http://archive.ubuntu.com/ubuntu/ focal-updates main universe
   
    -sudo apt update 
    -sudo apt install python3
  
   Si les étapes au dessus ne fonctionnent pas voic une autres méthode :
   
     -wget https://www.python.org/ftp/python/3.x.x/Python-3.x.x.tgz
     -tar -xvf Python-3.x.x.tgz
     -cd Python-3.x.x/Lib/distutils
     -python3 setup.py install

Installer Docker :
   
  Mettre à jour la liste des paquets :
  
      -sudo apt update
      
  Installer les paquets nécessaires :
  
      -sudo apt install apt-transport-https ca-certificates curl software-properties-common
      
  Ajouter la clé GPG officielle de Docker :
  
      -curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
      
  Ajouter le dépôt Docker à vos sources APT :
  
      -echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
      
  Mettre à jour la liste des paquets à nouveau :
  
      -sudo apt update
      
  Vérifier que vous allez installer Docker à partir du dépôt Docker :
  
      -apt-cache policy docker-ce
      
  Installer Docker :
  
      -sudo apt install docker-ce
      
  Vérifier que Docker est installé et fonctionne correctement :
  
      -sudo systemctl status docker
      
-Installer Docker-compose :
    
  Télécharger la dernière version de Docker Compose :
  
        -sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

  Appliquer les permissions exécutables au binaire :
  
        -sudo chmod +x /usr/local/bin/docker-compose

  Vérifier l'installation de Docker Compose :
  
        -docker-compose --version

  Ajouter votre utilisateur au groupe Docker :
  
        -sudo usermod -aG docker ${USER}

  Redémarrer votre session :
  
        -sudo reboot

  Redémarrer Docker :
  
        -sudo systemctl restart docker

  Vérifier le statut :
  
        -sudo systemctl status docker

-Cloner le repot :

      -Git clone [URL du repot]

-Donner les permission d'execution au script

      -chmod +x menu.sh (à faire dans le dossier où se trouve le script, normalement là où on clone.)

Redémarrer la machine

Lors du premier déploiement le choix du script va aussi build.

npm i dans ./frontend/app ?

docker compose up --build

Une fois que docker tourne :

-   faire les migration (très important si non pas de fonctionnement de l'application) php artisan migrate
-   faire les seed (optionnel) php artisan db:seed
