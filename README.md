# Ticketing with microservice architecture

## To build the auth service, run following command in terminal
`cd auth`
`docker build -t ticketing/auth .`

## Run docker build command to build other services

## To build and deploy using skaffold
Run `skaffold dev`

## creating a secret using kubctl / env variables

## instead of using config files to inject env variables
`kubectl create secret generic jwt-secret --from-literal=JWT_KEY=jwtsecret`
