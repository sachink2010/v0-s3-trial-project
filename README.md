# New Project

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/sachink2010s-projects/v0-new-project-d1h7j7q7aar)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/d1h7J7Q7aar)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/sachink2010s-projects/v0-new-project-d1h7j7q7aar](https://vercel.com/sachink2010s-projects/v0-new-project-d1h7j7q7aar)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/d1h7J7Q7aar](https://v0.dev/chat/projects/d1h7J7Q7aar)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

# Backend Setup & Development

This project uses **AWS SAM** to run two Python Lambdas (`POST /upload` and `GET /list-images`) backed by an existing S3 bucket.

## Prerequisites

- **Python 3.13** (or 3.12+)
- **AWS CLI** v2, configured with an IAM user/role that has:
  - `cloudformation:*`, `iam:PassRole`, `s3:*`, `lambda:*`, `apigateway:*`, and `logs:*`
- **AWS SAM CLI**
- **Docker** (for `sam local`)

---

## 1. Clone & Install Dependencies

```bash
git clone <url>
cd v0-s3-trial-project/backend
python3.13 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## 2. Create .env in backend/

BUCKET_NAME=13052025-sachin

## 3. Create env.json in backend/ ( For local development only.)

{
  "UploadFunction":    { "BUCKET_NAME": "13052025-sachin" },
  "ListImagesFunction": { "BUCKET_NAME": "13052025-sachin" }
}

## 4. Local Dev 

sam build

sam local start-api \
  --env-vars env.json \
  --port 3000 \
  --binary-media-types image/jpeg,image/png

curl -v -X POST http://127.0.0.1:3000/upload \
     -H "Content-Type: image/jpeg" \
     -H "X-Filename: test.jpeg" \
     --data-binary @test_data/test.jpeg

curl -v "http://127.0.0.1:3000/list-images?sort=size&order=desc"


## 5. Remote (Production)

cd backend
sam build
sam deploy ( use --guided if you want to use different config other than committed one)


curl -X POST <ApiUrl>/upload \
     -H "Content-Type: image/png" \
     -H "X-Filename: test.png" \
     --data-binary @test_data/test.png


curl <ApiUrl>/list-images?sort=size&order=desc"

## 6 Logs

sam logs --stack-name s3-trial-app --name UploadFunction --tail

sam logs --stack-name s3-trial-app --name ListImagesFunction --tail
