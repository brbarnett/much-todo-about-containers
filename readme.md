# Much todo about containers
A containerized todo app

_Note: this was tested on MacOS -- YMMV depending on OS_

## Requirements
Docker version v18.03.0-ce

## Testing
### todo-web
```
cd src/web
npm run serve
```
Navigate to http://localhost:8080

### todo-api
```
cd src/api
node api
```

## Deploying the app to Docker Swarm
Run the following in terminal
```
docker-compose -f docker-compose.stack.yaml build # only run this if you want to run from local images

docker stack deploy --compose-file docker-compose.stack.yaml todo-stack

docker service ls
```
Navigate to http://localhost

_Note: in Windows, you might have to stop IIS to avoid a conflict on port 80_

## Deploying the app to Kubernetes (local minikube cluster)
Run the following in terminal
```
minikube addons enable ingress

kubectl apply -f src/ingress/deployment.yaml

kubectl apply -f src/api/deployment.yaml

kubectl apply -f src/web/deployment.yaml

minikube ip # use output to navigate to http://{ip}:80
```

## Deploying the app to Kubernetes (Azure AKS cluster)
Create an AKS cluster (docs: https://docs.microsoft.com/en-us/cli/azure/aks?view=azure-cli-latest)
```
az login
az account set --subscription xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
az group create --name much-todo-about-containers --location centralus
az aks create \
    --name todo-aks-cluster \
    --resource-group much-todo-about-containers \
    --dns-name-prefix todo-aks-cluster \
    --generate-ssh-keys \
    --location centralus \
    --node-count 3 \
    --node-vm-size Standard_DS1_v2 \
    --no-wait

az network public-ip create \
    --name todo-aks-public-ip \
    --resource-group MC_much-todo-about-containers_todo-aks-cluster_centralus \     # note: this is a different resource group that contains your nodes
    --allocation-method static \
    --dns-name todo-aks-cluster \
    --location=centralus

az aks get-credentials --name todo-aks-cluster --resource-group much-todo-about-containers

az aks browse --resource-group much-todo-about-containers --name todo-aks-cluster

az aks show --resource-group much-todo-about-containers --name todo-aks-cluster
```

Deploy the application
```
kubectl apply -f src/load-balancer/default.deployment.yaml
kubectl apply -f src/load-balancer/deployment.yaml          # note: add your public IP in the load balancer config

kubectl apply -f src/ingress/deployment.yaml

kubectl apply -f src/api/deployment.yaml

kubectl apply -f src/web/deployment.yaml
```
You will have to wait to hit your public IP directly until the load balancer finishes provisioning.

AKS clusters can be expensive -- don't forget to spin it down if you're not using it
```
az aks delete 
    --name todo-aks-cluster \
    --resource-group much-todo-about-containers \
    --no-wait \
    --yes
```