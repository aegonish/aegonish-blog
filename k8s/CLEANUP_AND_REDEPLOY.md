Full cleanup + fresh start (minikube)

# 1) Delete the aegonish namespace (removes all resources in it)
kubectl delete namespace aegonish

# 2) Wait until namespace and pods are gone:
kubectl get ns
kubectl get pods -A

# 3) (Optional) Remove persistent volume claims / volumes if stuck
kubectl get pvc -n aegonish
kubectl delete pvc mongo-pvc backend-uploads-pvc -n aegonish

# 4) Re-apply manifests (fresh):
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml -n aegonish
kubectl apply -f k8s/pvc.yaml -n aegonish
kubectl apply -f k8s/mongo-deployment.yaml -n aegonish
kubectl apply -f k8s/backend-deployment.yaml -n aegonish
kubectl apply -f k8s/frontend-deployment.yaml -n aegonish
kubectl apply -f k8s/ingress.yaml -n aegonish

# 5) Start minikube tunnel in separate terminal (required for ingress external IP):
minikube tunnel

# 6) Check pod logs if anything fails:
kubectl get pods -n aegonish
kubectl logs -n aegonish <pod-name> -c <container-name>

# Notes:
- If ingress as LoadBalancer shows ADDRESS 127.0.0.1 then mapping to aegonish.local should work.
- If frontend/backends still show ImagePullBackOff, run: kubectl describe pod <pod> -n aegonish to see details.
