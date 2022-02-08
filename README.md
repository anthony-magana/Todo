<h1 align="center">Todo App 📓✔️</h1>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![Issues](https://img.shields.io/github/issues/anthony-magana/JobsJet)](https://github.com/anthony-magana/Todo/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/anthony-magana/JobsJet.svg)](https://github.com/anthony-magana/Todo/pulls)

</div>

---
## 🏁 [WEBSITE](http://golang-todo.netlify.app)

Todo App created with React and typescript on the front end with golang on the backend while using gorm (ORM library for go) for handling mysql database/queries of todos and users.

## ⛏️ Built Using

- [Reactjs](https://beta.reactjs.org) - Web Framework
- [Typescript](https://create-react-app.dev/docs/adding-typescript/) - typed superset of JavaScript that compiles to plain JavaScript.
- [ChakraUI](https://chakra-ui.com) - React component library
- [JWT](https://pkg.go.dev/github.com/dgrijalva/jwt-go/v4#section-readme) - JWT for Authentication
- [MySQL](https://dev.mysql.com/doc/) - MySQL Database ([ClearDB](https://www.cleardb.com) add on, on Heroku)
- [Gorm](https://gorm.io/) - ORM library for go ([Gorm_Mysql](https://gorm.io/docs/connecting_to_the_database.html) version)
- [Heroku](https://id.heroku.com/) - Server and DB hosting service

## 🔧 Getting Started

1. Clone or Fork repository
2. `cd` to project directory
3. `cd` to client directory and run `npm install` to install project dependencies.
4. Create `.env` file in root of client directory
5. Add following configurations/keys to .env file
    - `REACT_APP_ENDPOINT='https://YOUR-HEROKU-PROJECT-NAME.herokuapp.com/api'` OR `'http://localhost:YOUR-LOCAL-PORT'` E.g.(8080)
6. Create Heroku app and or account
    - Go to settings -> Buildpacks -> Add Buildpack -> Add Go
    - Go to resources -> Addons -> quick search ClearDb -> Add ClearDb
    - Go to settings -> Config vars -> reveal config vars -> Copy CLEARDB_DATABASE_URL value to notepad -> add following config vars
        - `DB_USER="ClearDB user"` which is after mysql:// from copied url which ends at first colon(:)
        - `DB_PASSWORD="ClearDB password"` which is after first colon(:) from copied url and ends at before @
        - `DB_HOST="Heroku clearDB host"` which is after @ from copied url which ends at first slash(/)
        - `DB_NAME="Heroku ClearDB name"` which is after first slash(/) from copied url
        - `PORT="DESIRED PORT E.g.(5432)"`
        - `JWT_SECRET="secret"`
7. `cd` to server directory and create `.env` file in root directory
    - `DB_USER="ClearDB user"` OR local mysql user
    - `DB_PASSWORD="ClearDB password"` OR local mysql user password
    - `DB_NAME="Heroku ClearDB name"` OR local mysql DB name
    - `DB_HOST="Heroku clearDB host"` OR `localhost:`
    - `PORT="DESIRED PORT"`
    - `JWT_SECRET="secret"`
8. Create file called `Procfile` in server directory
    - Enter `web: bin/server`
9. Run `go mod` to get and update dependencies

Run the development server:

```bash
go run main.go
```

Run the client development server:

```bash
cd ../client && npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.