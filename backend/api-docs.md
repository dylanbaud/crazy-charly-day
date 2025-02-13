# Documentation API

## Skills :

### Get all skills

```http
GET /skills
```

#### Description:

Cette route permet de récupérer la liste de toutes les compétences.

#### Réponse:

```json
[
  {
    "title": "BR",
    "description": "Bricolage"
  },
  {
    "title": "JR",
    "description": "Jardinage"
  }
]
```

### Create a skill

```http
POST /skills
```

#### Description:

Cette route permet de créer une nouvelle compétence.

#### Paramètres:

- `title` : Titre de la compétence
- `description` : Description de la compétence

#### Réponse:

```json
{
  "title": "BR",
  "description": "Bricolage"
}
```

### Update a skill

```http
PUT /skills/:id
```

#### Description:

Cette route permet de mettre à jour une compétence.

#### Paramètres:

- `title` : Titre de la compétence
- `description` : Description de la compétence

#### Réponse:

```json
{
  "title": "BR",
  "description": "Bricolage"
}
```

### Delete a skill

```http
DELETE /skills/:id
```

#### Description:

Cette route permet de supprimer une compétence.

#### Réponse:

```json
{
  "title": "BR",
  "description": "Bricolage"
}
```

### Get a skill

```http
GET /skills/:id
```

#### Description:

Cette route permet de récupérer une compétence.

#### Réponse:

```json
{
  "title": "BR",
  "description": "Bricolage"
}
```

## Accounts :

### Get all employees

```http
GET /employees
```

#### Description:

Cette route permet de récupérer l'ensemble des employés.

#### Réponse:

```json
[
  {
    "id": 1,
    "email": "albert.morel@email.com",
    "last_name": "Morel",
    "first_name": "Albert",
    "tel": "+33 6 12 34 56 78",
    "type": "employee",
    "valid": true
  },
  {
    "id": 2,
    "email": "bertrand.lefevre@email.com",
    "last_name": "Lefevre",
    "first_name": "Bertrand",
    "tel": "+33 6 98 76 54 32",
    "type": "employee",
    "valid": true
  }
]
```

### Create an employee

```http
POST /employees
```

#### Description:

Cette route permet de récupérer l'ensemble des employés.

#### Paramètres:

- `email`: Email de l'employé,
- `lastName`: Nom de famille de l'employé,
- `firstName`: Prénom de l'employé,
- `tel`: Numéro de téléphone de l'employé
- `skills`: [
  {
    - `id`: Id de la compétence
    - `interest`: Interêt de l'employé pour la compétence  
      }   
      ]

#### Réponse:

```json
{
  "email": "antoine.fontanez@gmail.com",
  "lastName": "FONTANEZ",
  "firstName": "Antoine",
  "tel": "0677889910"
}
```

### Get free employees

```http
GET /free-employees
```

#### Description:

Cette route permet de récupérer l'ensemble des employés disponibles.

#### Réponse:

```json
[
  {
    "id": 1,
    "email": "albert.morel@email.com",
    "last_name": "Morel",
    "first_name": "Albert",
    "tel": "+33 6 12 34 56 78",
    "type": "employee",
    "valid": true
  },
  {
    "id": 2,
    "email": "bertrand.lefevre@email.com",
    "last_name": "Lefevre",
    "first_name": "Bertrand",
    "tel": "+33 6 98 76 54 32",
    "type": "employee",
    "valid": true
  }
]
```

### Login

```http
POST /login
```

#### Description:

Cette route permet de se connecter.

#### Paramètres:

- `email`: Email de l'utilisateur

#### Réponse:

```json
{
  "id": 1,
  "email": "albert.morel@email.com",
  "last_name": "Morel",
  "first_name": "Albert",
  "tel": "+33 6 12 34 56 78",
  "type": "employee",
  "valid": true
}
```

### Get an account by id

```http
GET /accounts/:id
```

#### Description:

Cette route permet de récupérer un compte.

#### Réponse:

```json
{
  "id": 1,
  "email": "albert.morel@email.com",
  "last_name": "Morel",
  "first_name": "Albert",
  "tel": "+33 6 12 34 56 78",
  "type": "employee",
  "valid": true
}
```

## Needs :

### Get all needs

```http
GET /needs
```

#### Description:

Cette route permet de récupérer l'ensemble des besoins.

#### Réponse:

```json
[
  {
    "id": 1,
    "customer": {
      "id": 1,
      "email": "albert.morel@email.com",
      "last_name": "Morel",
      "first_name": "Albert",
      "tel": "+33 6 12 34 56 78",
      "type": "customer",
      "valid": true
    },
    "skill": {
      "id": 1,
      "title": "BR",
      "description": "Bricolage"
    }
  }
]
```

### Get needs from page

```http
GET /needs?page=[pageNumber]
```

#### Description:

Cette route permet de récupérer les needs d'une page.

#### Réponse:

```json
[
  {
    "id": 1,
    "customer": {
      "id": 1,
      "email": "albert.morel@email.com",
      "last_name": "Morel",
      "first_name": "Albert",
      "tel": "+33 6 12 34 56 78",
      "type": "customer",
      "valid": true
    },
    "skill": {
      "id": 1,
      "title": "BR",
      "description": "Bricolage"
    }
  }
]
```

### Create a need

```http
POST /needs
```

#### Description:

Cette route permet de créer un nouveau besoin.

#### Paramètres:

- `customer_id`: Id du client
- `description`: Description du besoin
- `skill_id`: Id de la compétence

#### Réponse:

```json
{
  "customer_id": 1,
  "description": "Besoin de bricolage",
  "skill_id": 1
}
```

### Update a need

```http
PUT /needs/:id
```

#### Description:

Cette route permet de mettre à jour un besoin.

#### Paramètres:

- `description`: Description du besoin
- `skill_id`: Id de la compétence

#### Réponse:

```json
{
  "customer_id": 1,
  "description": "Besoin de bricolage",
  "skill_id": 1
}
```

### Get all needs for a customer

```http
GET /needs/:customer_id
```

#### Description:

Cette route permet de récupérer l'ensemble des besoins d'un client.

#### Réponse:

```json
[
  {
    "id": 1,
    "customer": {
      "id": 1,
      "email": "albert.morel@email.com",
      "last_name": "Morel",
      "first_name": "Albert",
      "tel": "+33 6 12 34 56 78",
      "type": "customer",
      "valid": true
    },
    "skill": {
      "id": 1,
      "title": "BR",
      "description": "Bricolage"
    }
  }
]
```

### Get needs by page number

```http
GET /needs/:page
```

#### Description:

Cette route permet de récupérer l'ensemble des besoins par page.

#### Réponse:

#### Réponse:

```json
[
  {
    "id": 1,
    "customer": {
      "id": 1,
      "email": "albert.morel@email.com",
      "last_name": "Morel",
      "first_name": "Albert",
      "tel": "+33 6 12 34 56 78",
      "type": "customer",
      "valid": true
    },
    "skill": {
      "id": 1,
      "title": "BR",
      "description": "Bricolage"
    }
  }
]
```

## Tasks :

### Add a task

```http
POST /tasks
```

#### Description:
Cette route permet de créer une nouvelle tâche.

#### Paramètres:
- `need_id`: Id du besoin
- `employee_id`: Id de l'employé
- `start_date`: Date de début
- `finish_date`: Date de fin

#### Réponse:

```json
{
  "need_id": 1,
  "employee_id": 1,
  "start_date": "2021-06-01:00:00:00",
  "finish_date": "2021-06-02:00:00:00"
}
```


