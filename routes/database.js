var mysql = require('mysql');

var conn = {
    host : 'localhost',
    user : 'root',
    password : 'jagan@jagan',
    database : 'zomato'
};

var knex = require('knex')({client:'mysql',connection:conn});

knex.raw("CREATE DATABASE IF NOT EXISTS zomato")
    .then((data)=>{console.log('database created successfully')})
    .catch((err)=>{console.log('err in creating database: ',err)})

knex.schema.hasTable('user')
    .then((exists)=>{
        if(!exists){
            return knex.schema.createTable('user',(table)=>{
                table.increments('id').primary();
                table.string('name',100).notNullable();
                table.string('email').unique().notNullable();
                table.string('password').notNullable();
                table.string('status').notNullable();
            })
            
        }return console.log('table is created')
    })
    .catch((err)=>{
        console.log('err in creating table',err)
    })
