#!/bin/bash

docker_initilized=false

while true do 
    echo "Veuilez choisir une option :"
    echo "1) Start les containers docker"
    echo "2) Build & Run Docker"
    echo "3) Afficher les containers"
    echo "4) Arreter les containers docker"
    echo "5) Quitter"
    read -p "Votre choix : " choix

    if [ "$choix" -eq 1 ]; then
        echo "Vous avez choisi de démarrer les containers docker ! "
        docker-compose up
        docker_initilized=true
        read -p "Appuyer sur Entrée pour continuer..."
    elif [ "$choix" -eq 2 ]; then
        echo "Vous avez choisi de Build et de Run docker !"
        docker-compose build && docker-compose up
        docker_initilized=true
        read -p "Appuyer sur Entrée pour continuer..."
    elif [ "$choix" -eq 3 ]; then
        echo "Vous avez choisi d'afficher les containers !"
        docker ps
        read -p "Appuyer sur Entrée pour continuer..."
    elif [ "$choix" -eq 4 ]; then
        echo "Vous avez choisi d'arreter les containers !"
        docker-compose down
        read -p "Appuyer sur Entrée pour continuer..."
    elif [ "$choix" -eq 5 ]; then 
        echo "Au revoir !"
        break
    fi
    echo
done

