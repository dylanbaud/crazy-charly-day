### Pages front
- Création d’un besoin
- Affichage de la liste des besoins d’un client
- Affichage de la liste de tous les besoins (admin)
- Création d’un salarié (admin)
- Affichage de la liste des salariés (admin)
- Gestion de la liste des compétences (admin) : rajout, suppression
- Création d’une nouvelle compétence lors de la saisie d’un salarié
- Authentification (avancé)
- Lancement des affectations et affichage des résultats (admin)
- Pagination des listes des besoins
- Ajout de compétences par les clients
- Les gestionnaires peuvent valider ou refuser une candidature

### Pages backend
Implémentation des algorithmes d’affectation suivante :
- Stratégie gloutonne
- Backtracking
- Algorithme de Gale-Shapley (algorithme de mariage stable)

Fonctionnalité de la durée des besoins dans le back-end (pas eu le temps de l'implémenter en front-end):
- Chaque tâche à une durée de début et une durée de fin, quand un employé est affecté à une tâche, il ne peut pas être affecté à une autre tâche afin la durée de fin de sa tâche en cours.
  ( endpoint /free-employees ).
- Quand un employé est affecté à une tâche, d'autres employés ne peuvent pas être affectés à la même tâche.
  ( endpoint /free-needs ).

# Dépôt du projet de l'équipe Netlordes #

https://github.com/dylanbaud/crazy-charly-day

## Liste des membres ##

    - BAUDSON Dylan (IL-1)
    - DAZA Sasha (DWM-1)
    - FONTANEZ Antoine (IL-2)
    - PEDRETTI Zack (IL-1)
    - PINOT Gaetan (DWM- 1)
    - SLIMANI Robin (DACS)
    - TOUSSAINT Jarod (IL-1)

## URL ##

- http://docketu.iutnc.univ-lorraine.fr:45556

##  Déploiement ##

#### Connection au serveur en ligne

Se rendre sur http://docketu.iutnc.univ-lorraine.fr:45556
Emails : 
`client@mail.com`
`admin@mail.com`  
#### Mise en place local

Il faut avoir docker d'installer avec docker compose
et ensuite faire un simple docker compose up --build -d

On attend environ 10 secondes

ensuite on accede au site en allant sur http://localhost:45556
