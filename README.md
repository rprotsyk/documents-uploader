# document-uploader
Prerequsites:
1) Install PostgreSQL

    Set your DB connection properties:
    <br />
    type: 'postgres',
    <br />
    host: process.env.DB_HOST || 'localhost',
    <br />
    port: process.env.DB_PORT || 5433,
    <br />
    username: process.env.DB_USERNAME || 'postgres',
    <br />
    password: process.env.DB_PASSWORD || 'postgres',

2) Run commands
    npm i -g nx 
    <br>
    npm i
    <br>

3) Launch app
    nx serve backend
    <br>
    nx serve client

4) Navigate to http://localhost:4200
