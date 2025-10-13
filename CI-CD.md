# 🚀 CI/CD Pipeline — Aegonish Blog

## Overview
This document describes the CI/CD workflow for the **Aegonish Blog** project, implemented using **Jenkins**, **Docker**, and **Docker Hub**.

The pipeline automates:
- Source checkout from GitHub
- Building Docker images (frontend + backend)
- Pushing images to Docker Hub
- Deploying via Docker Compose (production stack)

---

## 🧱 Infrastructure Setup

### Jenkins Master
- Installed on **Windows 11**
- Runs Jenkins at [http://localhost:8080](http://localhost:8080)
- Manages all builds and orchestrates pipelines
- Stores credentials and configuration

### Jenkins Agent (Slave)
- Path: `C:\Jenkins\agent`
- Connected to master via WebSocket
- Executes all Docker-related commands (build, push, deploy)
- Configured to start automatically after system reboot (recommended)

---

## 🔑 Credentials Configuration

| ID                    | Type             | Description                           |
|------------------------|------------------|----------------------------------------|
| `github-pat`           | Secret Text      | Personal Access Token for GitHub       |
| `dockerhub-credentials`| Username/Password| Docker Hub credentials for image push  |

---

## 📂 Repositories

| Purpose             | Repo URL |
|----------------------|----------|
| Main application     | [https://github.com/anish-kapuskar/aegonish-blog](https://github.com/anish-kapuskar/aegonish-blog) |
| Jenkins Shared Libs  | [https://github.com/anish-kapuskar/jenkins-shared-libs](https://github.com/anish-kapuskar/jenkins-shared-libs) |

---

## ⚙️ Pipeline Flow

**Jenkinsfile** stages:

1. **Checkout**
   - Clones the main repository from GitHub.
   - Authenticates using the `github-pat` credential.

2. **Build Backend Image**
   - Builds the Node.js (Express) backend Docker image.
   - Image: `aegonish-backend:latest`

3. **Build Frontend Image**
   - Builds the Vite/React frontend Docker image.
   - Image: `aegonish-frontend:latest`

4. **Push to Docker Hub**
   - Logs into Docker Hub using stored credentials.
   - Tags and pushes both backend and frontend images to:
     ```
     docker.io/aegonishblog/aegonish-backend:latest
     docker.io/aegonishblog/aegonish-frontend:latest
     ```

5. **Deploy**
   - Runs the production stack via:
     ```bash
     docker compose -f docker-compose.prod.yml down
     docker compose -f docker-compose.prod.yml up -d --build
     ```
   - Health checks ensure all containers are alive.

6. **Post-Build Cleanup**
   - Cleans up Jenkins workspace to free disk space.

---

## 🧩 Supporting Files

### `docker-compose.prod.yml`
Defines the production stack:
- MongoDB (`mongo:6.0`)
- Backend (`aegonish-backend`)
- Frontend (`aegonish-frontend`)
- Healthchecks + persistent volumes

### `.env`
Contains required environment variables for backend services.
Must exist in root of project before running pipeline.

---

## 🧠 Notes

- Pipeline runs **entirely on the Jenkins agent** (not on the master).  
- If Jenkins or agent is restarted, the agent must reconnect:
  ```bash
  java -jar agent.jar -url http://localhost:8080/ -secret <SECRET> -name "local-agent" -webSocket -workDir "C:\Jenkins\agent"
  ```
- To test builds locally:
  ```bash
  docker compose -f docker-compose.prod.yml up -d --build
  ```

---

## 📦 Future Enhancements

| Feature | Description |
|----------|--------------|
| Jenkins Shared Libraries | Modularize repetitive pipeline steps |
| Multi-Environment Pipelines | Separate dev/stage/prod pipelines |
| AWS ECR + ECS/Kubernetes | Replace Docker Hub + local compose |
| Terraform Integration | Infrastructure provisioning via Jenkins |
| Notifications | Slack/email build notifications |

---

## ✅ Status

| Component | Status |
|------------|--------|
| Jenkins Master | ✅ Running |
| Jenkins Agent | ✅ Connected |
| CI/CD Pipeline | ✅ Successful |
| Docker Builds | ✅ Passed |
| Image Push to Hub | ✅ Verified |
| Deployment | ✅ Working |

---

**Author:** Anish Kapuskar  
**Project:** Aegonish Blog  
**Milestone:** CI/CD (Phase 1 — Jenkins + Docker Complete)
