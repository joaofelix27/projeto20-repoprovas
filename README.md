# projeto20-RepoProvas
A typescript project to create tests, see all the tests by disciplines or by teachers. And also to send emails to all users when a new test is created.


<p align="center">
  <img  src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4dd.svg" height=200>
</p>
<h1 align="center">
  RepoProvas
</h1>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Prisma-316192?style=for-the-badge&logo=prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Jest-316192?style=for-the-badge&logo=jest&logoColor=white" height="30px"/>
  <img src ="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" height ="30px">
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Description

RepoProvas is a back-end application that simulates a system that manages tests.

</br>

## Features

-   User sign-up and sign-in
-   Create tests.
-   Search tests by discipline.
-   Search tests by teacher id.

</br>

## API Reference

### User Sign Up

```
POST /sign-up
```

#### Request:

| Body            | Type     | Description                     |
| :-------------- | :------- | :------------------------------ |
| `email`         | `string` | **Required**. user email        |
| `password`      | `string` | **Required**. user password     |
| `confirmedPassword` | `string` | **Required**. user confirmedpassword  |

#

### Sign In

```
POST /sign-in
```

#### Request:

| Body            | Type     | Description                     |
| :-------------- | :------- | :------------------------------ |
| `email`         | `string` | **Required**. user email        |
| `password`      | `string` | **Required**. user password     |

#


### Create a new test

```
POST /tests/create
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `Authorization`  | `string`| **Required**. authentication token | 

####

| Body                     | Type      | Description                             |
| :----------------------- | :-------- | :-------------------------------------- |
| `name`                   | `string`  | **Required**. test name                 |
| `pdfUrl`                 | `string`  | **Required**. pdf's url                 |
| `categoryId`             | `integer` | **Required**. test category id          |
| `teacherDisciplineId`    | `integer` | **Required**. teacher discipline id     |

#

### Search tests.

```
GET /tests/disciplines
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `Authorization` | `string`| **Required**. authentication token |

#

### Search tests by teachers.

```
GET /tests/teachers
```

#### Request:

| Headers          | Type    | Description                         |
| :--------------- | :-------| :--------------------------------- |
| `Authorization`  | `string`| **Required**. authentication token |


## Environment Variables

To run this project locally you will have to add this variables to your .env

`DATABASE_URL=` </br>
`REDIRECT_URL=` </br>
`CLIENT_ID=`    </br>
`CLIENT_SECRET=` </br>
`EMAIL_API_KEY=` </br>
`SECRET=` </br>
`PORT=`</br>

## To test

It's necessary to always makes sure that you have the initial data on the test database, for this to happend, run this command: <br/>
`npx prisma db seed`

#
