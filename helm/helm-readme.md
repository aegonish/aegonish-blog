# Aegonish Blog — Helm Deployment (Local)

This README explains how to run the **Aegonish Blog** app locally using **Helm** and **Minikube**, including secrets, ingress, and minikube tunnel.

---

## Prerequisites

* [Minikube](https://minikube.sigs.k8s.io/docs/)
* [kubectl](https://kubernetes.io/docs/tasks/tools/)
* [Helm 3+](https://helm.sh/docs/intro/install/)
* Node.js / npm (if building locally)

---

## 1. Start Minikube

```bash
minikube start --driver=docker
```

Enable ingress addon:

```bash
minikube addons enable ingress
```

Start minikube tunnel (in a separate terminal, required for LoadBalancer services):

```bash
minikube tunnel
```

---

## 2. Apply required secrets

Create the `google-oauth` secret in Kubernetes (sensitive credentials are hidden):

```powershell
kubectl create secret generic google-oauth `
  --from-literal=GOOGLE_REDIRECT_URI="https://developers.google.com/oauthplayground" `
  --from-literal=MONGO_URI="mongodb://mongo:27017/aegonish_blog" `
  --from-literal=PORT="4000" `
  -n aegonish
```

> ⚠️ If the secret already exists, delete it first:
>
> ```powershell
> kubectl delete secret google-oauth -n aegonish
> ```

---

## 3. Install / upgrade Helm chart

From your project root:

```bash
helm lint k8s/helm/aegonish

# Dry-run template check
helm template k8s/helm/aegonish --values k8s/helm/aegonish/values.yaml

# Install or upgrade release
helm upgrade --install aegonish ./k8s/helm/aegonish -n aegonish --create-namespace `
  --set backend.image=aegonishblog/aegonish-backend:latest `
  --set frontend.image=aegonishblog/aegonish-frontend:latest
```

---

## 4. Verify deployment

Check pods and services:

```bash
kubectl get pods,svc,ingress -n aegonish
kubectl logs -n aegonish -l app=backend -f
```

Open frontend in browser (replace `aegonish.local` with your configured host):

```bash
minikube service frontend -n aegonish
```

---

## 5. Notes

* **Secrets:** Must be applied manually before deploying.
* **Ingress:** Must be enabled in Minikube (`minikube addons enable ingress`).
* **LoadBalancer:** Requires `minikube tunnel` running to expose services on localhost.
* **Images:** Already built and pushed to Docker Hub via Jenkins.

---

## 6. Cleaning up

```bash
helm uninstall aegonish -n aegonish
kubectl delete namespace aegonish
minikube stop
```
