# Jenkins + GitHub Setup

## 1. Push This Project To GitHub

From this folder:

```powershell
cd C:\Users\bhara\lab27\lab27
git init
git branch -M main
git add .
git commit -m "Add Jenkins pipeline"
git remote add origin https://github.com/bharadwajba/lab31.git
git push -u origin main
```

GitHub repository:

```text
https://github.com/bharadwajba/lab31.git
```

## 2. Create Jenkins Pipeline Job

1. Open Jenkins.
2. Click **New Item**.
3. Choose **Pipeline** or **Multibranch Pipeline**.
4. Use **Pipeline script from SCM**.
5. SCM: **Git**.
6. Repository URL: `https://github.com/bharadwajba/lab31.git`.
7. Branch: `*/main`.
8. Script Path: `Jenkinsfile`.
9. Save and click **Build Now**.

## 3. Add GitHub Webhook

In GitHub:

1. Open your repo.
2. Go to **Settings > Webhooks > Add webhook**.
3. Payload URL:

```text
http://YOUR_JENKINS_URL/github-webhook/
```

4. Content type: `application/json`.
5. Choose **Just the push event**.
6. Save.

## 4. Local URLs After Jenkins Deploy

```text
Frontend: http://localhost:3000
Backend:  http://localhost:5001
API:      http://localhost:5001/api
Compass:  mongodb://localhost:27017
```

Jenkins agent must have Node.js, npm, Docker, and Docker Compose available.
