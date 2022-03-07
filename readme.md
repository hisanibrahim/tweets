## Server

#### Getting Started

`cd server`

##### Create a `.env` file in the root of the project

```.env
PORT=4000
BEARER_TOKEN="copy_paste_key_here"
```

`npm install`
`npm start`

## Client

#### Getting Started

`cd client`

##### Create a `.env` file in the root of the project

```.env
REACT_APP_SERVER_URL="copy_paste_key_here"
```

`npm install`
`npm start`

## Heroku deployment steps

##### 1. Fork this project

##### 2. Create brand new Heroku app

##### 3. Connect the github repo to your Heroku app

##### 4. Add below Config Vars Heroku app

```.env
REACT_APP_SERVER_URL="copy_paste_key_here"
BEARER_TOKEN="copy_paste_key_here"
```

##### 5. Hit manual deploy
