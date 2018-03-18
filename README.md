# FAMILY COOKING RECIPE DATABASE

This nodeJS server will provide a REST Api that save and provide the recipes from the whole family.
MEAN implementation using Passport for authentication

## NodeJS Server

### REST Api.

- /signin
- /signup
- /recipe : GET and POST
- /recipe/id : GET, PUT and DELETE

Authentication is using JWT with the library Passport. User are stored in the local database.

## Qt Application 

Multi platform (Android, PC and iOS)

## WebApplication

The Interface is provided by Angular5. 

## Setup

setup on Ubuntu 16.04
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install nodejs

### TODO
- enable HTTPS
- hash user and password when transmitting (registration AND log in)
- improve interface design
- authentication is 'only' used for the REST api. User can request all urls without being redirected to the login page if the token is null.
