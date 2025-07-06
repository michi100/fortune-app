import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { createFortunePrompt } from "./prompt";
import { ZODIAC_SIGNS, BLOOD_TYPES } from "./types";
import type { ZodiacSign, BloodType } from "./types";

const app = express();
const PORT = process.env.PORT || 3001;

if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY が設定されていません");
  process.exit(1);
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function isValidZodiac(zodiac: string): zodiac is ZodiacSign {
  return ZODIAC_SIGNS.some((z) => z.value === zodiac);
}
function isValidBloodType(bloodType: string): bloodType is BloodType {
  return BLOOD_TYPES.some((b) => b.value === bloodType);
}

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.post("/api/fortune", async (req, res): Promise<void> => {
  try {
    const { zodiac, bloodType } = req.body;

    console.log("受信データ:", { zodiac, bloodType });

    if (!isValidZodiac(zodiac) || !isValidBloodType(bloodType)) {
      res.status(400).json({
        error: "無効な入力です",
        message: "正しい星座と血液型を選択してください",
      });
      return;
    }

    const prompt = createFortunePrompt(zodiac, bloodType);

    const result = await model.generateContent(prompt);
    const response = result.response;

    // トークン使用量をログ出力
    const usageMetadata = response.usageMetadata;
    if (usageMetadata) {
      console.log("トークン使用量:", {
        promptTokens: usageMetadata.promptTokenCount, // 入力トークン
        candidateTokens: usageMetadata.candidatesTokenCount, // 出力トークン
        totalTokens: usageMetadata.totalTokenCount, // 合計トークン
      });
    }

    const text = response.text();
    const fortuneResult = {
      id: Date.now().toString(),
      zodiac,
      bloodType,
      result: text,
      createdAt: new Date().toISOString(),
    };
    res.json(fortuneResult);
  } catch (error) {
    console.error("API エラー:", error);
    res.status(500).json({
      error: "占いの生成に失敗しました",
      message: "しばらくしてからもう一度お試しください",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
