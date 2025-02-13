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
GET /skill/:id
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

### Get a skill

```http
GET /skill/:id
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

### Create an employee

```http
POST /employee
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
    },
    "need_index": 1
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
- `need_index`: Index du besoin

#### Réponse:

```json
{
  "customer_id": 1,
  "description": "Besoin de bricolage",
  "skill_id": 1,
  "need_index": 1
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
- `need_index`: Index du besoin

#### Réponse:

```json
{
  "customer_id": 1,
  "description": "Besoin de bricolage",
  "skill_id": 1,
  "need_index": 1
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
    },
    "need_index": 1
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
    },
    "need_index": 1
  }
]
```



