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
    },
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
POST /create-employee
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
  "email":"antoine.fontanez@gmail.com",
  "lastName":"FONTANEZ",
  "firstName":"Antoine",
  "tel":"0677889910",
}
```

### Get all needs

```http
GET /needs
```

#### Description:
Cette route permet de récupérer l'ensemble des besoins.

#### Réponse:
