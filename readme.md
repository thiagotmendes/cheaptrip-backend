# Cheaptrip backend

![NodeJs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![javaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![HerokuApp](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)

Backend system to be integrated with the front-end app cheaptrip, an app to help people to save money by creating traveling groups. This is an integration project from Newton Paiva college.

## Technologies

NodeJs + Express

MongoDB + Atlas

Deplyed on Heroku

## Endpoints

https://cheaptrip-backend.herokuapp.com/

All verbs will be followed by the standard:

```
get: /

get: /id

post: /save

put: /update/id

delete: /delete/id
```

Example to user collection:

```
get: siteurl/users/ -> get user list

get: siteurl/users/iduser -> get user by id

post: siteurl/users -> save user according with json contract

put: siteurl/users/id -> update user by id

delete: siteurl/users/delete/id -> delete user by id
```

## Environment variables

```
MONGODB_URI=
PORT=
TOKEN_KEY=
```

## Integrantes

Gabriela Tiago Fernandes Lima RA: 10921390

Henrique Ramalho Antunes RA: 11312971

Nayara Adriana dos Santos RA: 11313012

Thiago Tavares Mendes RA: 12109641
