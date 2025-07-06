FROM node:18-alpine

WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール（開発用も含む）
RUN npm ci

# ソースコードをコピー
COPY . .

# TypeScript をビルド
RUN npm run build

# 本番用依存関係のみ再インストール
RUN npm ci --only=production && npm cache clean --force

# ポート設定
EXPOSE 3001

# アプリ起動
CMD ["npm", "start"]