# 占いアプリ

```
cd frontend
npm i
npm run dev
```

```
cd backend
npm i
npm run dev
```

## frontend

```
npm run build
firebase deploy --only hosting
```

## backend

cloud shell

```
git clone https://github.com/michi100/fortune-app.git
```

```
cd fortune-app/backend/
```

```
gcloud run deploy fortune-backend \
  --source . \
  --region asia-northeast1 \
  --allow-unauthenticated \
  --max-instances 3 \
  --concurrency 5 \
  --set-env-vars GEMINI_API_KEY="XXXX"
```
