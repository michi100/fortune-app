import { useState } from "react";
import Button from "../ui/Button";
import { ZODIAC_SIGNS, BLOOD_TYPES } from "../../types";
import type { ZodiacSign, BloodType } from "../../types";

interface FortuneResultProps {
  zodiac: ZodiacSign;
  bloodType: BloodType;
  onReset: () => void;
  onLockOptions: () => void;
}

function FortuneResult({
  zodiac,
  bloodType,
  onReset,
  onLockOptions,
}: FortuneResultProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const generateFortune = async () => {
    onLockOptions();
    setIsLoading(true);

    try {
      // throw new Error("ネットワークアクセス失敗");
      const response = await fetch("http://localhost:3001/api/fortune", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ zodiac, bloodType }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (e) {
      console.error("APIエラー:", e);
      setResult("占いの取得に失敗しました。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
      {!result && !isLoading && (
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            {ZODIAC_SIGNS.find((z) => z.value === zodiac)?.label}・
            {BLOOD_TYPES.find((b) => b.value === bloodType)?.label}
            の今日の運勢を占います
          </p>
          <Button variant="primary" onClick={generateFortune}>
            占う
          </Button>
        </div>
      )}

      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">占い中...</p>
        </div>
      )}

      {result && !isLoading && (
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            {ZODIAC_SIGNS.find((z) => z.value === zodiac)?.label}・
            {BLOOD_TYPES.find((b) => b.value === bloodType)?.label}の占い結果
          </h2>
          <div className="bg-white p-4 rounded-md mb-4 shadow-sm">
            <p className="text-gray-800 leading-relaxed">{result}</p>
          </div>
          <div className="flex gap-3 justify-center">
            <Button variant="primary" onClick={onReset}>
              別の占いをする
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FortuneResult;
