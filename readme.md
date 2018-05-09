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

### Prerequisites
- Azure CLI (this was tested on v2.0.32)
- Helm (https://docs.helm.sh/using_helm/#installing-helm)

### Intialize AKS cluster
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
    --node-vm-size Standard_DS1_v2

az network public-ip create \
    --name todo-aks-public-ip \
    --resource-group MC_much-todo-about-containers_todo-aks-cluster_centralus \     # note: this is a different resource group that contains your nodes
    --allocation-method static \
    --dns-name todo-aks-cluster \
    --location=centralus

az aks get-credentials --name todo-aks-cluster --resource-group much-todo-about-containers

az aks show --resource-group much-todo-about-containers --name todo-aks-cluster
```

The following is largely based off of this tutorial: https://blog.n1analytics.com/free-automated-tls-certificates-on-k8s/

### Initialize Helm on the cluster
```
helm init --upgrade --service-account default   # required, otherwise you get a 'no available release name' error

helm repo update
```

### Deploy the ingress controller
```
helm install stable/nginx-ingress \
    --name nginx-ingress \
    --namespace kube-system \
    --set controller.service.loadBalancerIP=104.43.217.79 \    # this connects to the static IP you just provisioned and sets up a Load Balancer resource in Azure
    --set rbac.create=false

kubectl get service -l app=nginx-ingress --namespace kube-system    # it will take a bit before the external IP shows up
```

### Install cert-manager for Let's Encrypt TLS support
```
helm install stable/cert-manager \
    --name cert-manager \
    --namespace kube-system \
    --set ingressShim.extraArgs='{--default-issuer-name=letsencrypt-prod,--default-issuer-kind=Issuer}' \
    --set rbac.create=false     # AKS does not support RBAC at this time

kubectl apply -f src/ingress/tls/issuer-prod.yaml
```

### Deploy the application
```
kubectl apply -f src/ingress/ingress.yaml

kubectl apply -f src/api/deployment.yaml

kubectl apply -f src/web/deployment.yaml

kubectl get services --all-namespaces   # view all running services
```
You will have to wait to hit your public IP directly until the load balancer finishes provisioning. The cluster is available here: https://todo-aks-cluster.centralus.cloudapp.azure.com/

AKS clusters can be expensive -- don't forget to spin it down if you're not using it
```
az aks delete \
    --name todo-aks-cluster \
    --resource-group much-todo-about-containers \
    --no-wait \
    --yes
```