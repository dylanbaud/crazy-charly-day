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

### Réponse:
```json
{
  "title": "BR",
  "description": "Bricolage"
}
```