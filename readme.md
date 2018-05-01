# Much todo about containers
A containerized todo app

_Note: this was tested on MacOS -- YMMV depending on OS_

## Requirements
Docker version v18.03.0-ce

## Running the app
Run the following in terminal
```
$ docker-compose -f docker-compose.stack.yaml build

$ docker stack deploy --compose-file docker-compose.stack.yaml todo-stack

$ docker service ls
```
Navigate to http://localhost

## Other commands

Combining docker-compose config files

`docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml config > docker-compose.stack.yaml`
