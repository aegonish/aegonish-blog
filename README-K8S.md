# 🧠 Aegonish Blog — Kubernetes Deployment Guide

This guide explains **how to deploy the full Aegonish Blog application on Kubernetes** — including backend, frontend, and MongoDB — using Minikube (local) or EKS (AWS).

---

## ⚙️ Prerequisites

Make sure your system has:

- [Docker](https://docs.docker.com/get-docker/)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [Helm (optional)](https://helm.sh/docs/intro/install/)

> 🧩 If using Windows PowerShell, run all `kubectl` commands **without backticks** (`\``).

---

## 🚀 Step 1: Start Minikube

```bash
minikube start --driver=docker
kubectl get nodes
```

Wait for the node to show **Ready**.

---

## 📦 Step 2: Create Namespace

```bash
kubectl create namespace aegonish
```

---

## 🔐 Step 3: Add Secrets (Google OAuth)

1. Copy `k8s/secrets.example.yaml` → `k8s/secrets.local.yaml`
2. Fill in your real credentials (Google Drive API keys, refresh token, etc.).
3. Apply it:

```bash
kubectl apply -f k8s/secrets.local.yaml
```

---

## 🧱 Step 4: Deploy MongoDB Storage

```bash
kubectl apply -f k8s/mongo-pv.yaml
kubectl apply -f k8s/mongo-pvc.yaml
```

Verify:
```bash
kubectl get pv,pvc -n aegonish
```

You should see **Bound** status for both.

---

## 🧩 Step 5: Deploy Backend & Frontend

```bash
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/configmap.yaml
```

Check pod status:
```bash
kubectl get pods -n aegonish
```

When all are `Running`, continue.

---

## 🌐 Step 6: Access the App

Expose frontend via Minikube:

```bash
minikube service frontend -n aegonish
```

Or find IP manually:

```bash
minikube ip
```

Then visit:

```
http://aegonish.local
```

---

## 🧪 Step 7: Test Uploads

Go to **Upload New Post**, try uploading an image — the backend will push it to **Google Drive** using your OAuth credentials.

If you see `500 Internal Server Error`, check backend logs:

```bash
kubectl logs -n aegonish -l app=backend -f
```

---

## 🧹 Step 8: Tear Down

```bash
kubectl delete namespace aegonish
minikube stop
```

---

## ☁️ Deploying to AWS (EKS)

Once AWS setup is ready:

- Replace `minikube` with your EKS context (`kubectl config use-context <eks-cluster>`)
- Apply the same manifests (`kubectl apply -f k8s/`)
- Store secrets using AWS Secrets Manager or SealedSecrets

---

## 📜 Summary

| Component  | Description | Manifest |
|-------------|--------------|-----------|
| MongoDB | Database | `mongo-deployment.yaml`, `mongo-pv.yaml`, `mongo-pvc.yaml` |
| Backend | Node.js API + Google Drive | `backend-deployment.yaml`, `configmap.yaml` |
| Frontend | React/Vite static site | `frontend-deployment.yaml` |
| Secrets | Google API credentials | `secrets.local.yaml` |

---

### ✅ Quick Commands

```bash
kubectl get all -n aegonish
kubectl logs -n aegonish -l app=backend --tail=50
kubectl delete all --all -n aegonish
```

---

© 2025 Aegonish Blog — "neon vibes."
