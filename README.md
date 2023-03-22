# document-uploader
Prerequsites:
1) Install PostgreSQL

Set your DB connection properties:
type: 'postgres',
host: process.env.DB_HOST || 'localhost',
port: process.env.DB_PORT || 5433,
username: process.env.DB_USERNAME || 'postgres',
password: process.env.DB_PASSWORD || 'postgres',

2) Run commands
npm i nx -g
npm i

3) Launch app
nx serve backend
nx serve client

4) Navigate to http://localhost:4200
