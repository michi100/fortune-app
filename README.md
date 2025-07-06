# 占いアプリ
![スクリーンショット 2025-07-06 22 21 53](https://github.com/user-attachments/assets/bfa26a55-5e74-492b-a572-9b95ebca8c3f)
![スクリーンショット 2025-07-06 22 22 02](https://github.com/user-attachments/assets/3ac959a6-5f87-48e1-8581-6b9e14c97d15)
![スクリーンショット 2025-07-06 22 22 10](https://github.com/user-attachments/assets/0576e352-77ea-4123-9adb-92b1d9a5d942)
一応LLM使ってる。\
今後の展望:占い体験の向上と回答結果のDBへの保存。
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
