# Much todo about containers
A containerized todo app

_Note: this was tested on MacOS -- YMMV depending on OS_

## Requirements
Docker version v18.03.0-ce

## Testing
### todo-web
```
cd todo-web
npm run serve
```
Navigate to http://localhost:8080

### todo-api
```
cd todo-api
node api
```

## Deploying the app to Docker Swarm
Run the following in terminal
```
docker-compose -f docker-compose.stack.yaml build

docker stack deploy --compose-file docker-compose.stack.yaml todo-stack

docker service ls
```
Navigate to http://localhost

_Note: in Windows, you might have to stop IIS to avoid a conflict on port 80_

## Deploying the app to Kubernetes (local minikube cluster)
Run the following in terminal
```
minikube addons enable ingress

kubectl apply -f ingress/ingress.deployment.yaml

kubectl apply -f todo-api/todo-api.deployment.yaml

kubectl apply -f todo-web/todo-web.deployment.yaml

minikube ip # use output to navigate to http://{ip}:80
```

## Other commands

Combining docker-compose config files

`docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml config > docker-compose.stack.yaml`
