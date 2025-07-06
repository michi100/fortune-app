FROM node:18-alpine

WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm ci --only=production

# ソースコードをコピー
COPY . .

# TypeScript をビルド
RUN npm run build

# ポート設定
EXPOSE 3001

# アプリ起動
CMD ["npm", "start"]