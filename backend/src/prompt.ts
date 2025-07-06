import type { ZodiacSign, BloodType } from "./types/index";

export function createFortunePrompt(
  zodiac: ZodiacSign,
  bloodType: BloodType
): string {
  return `
        あなたは経験豊富な占い師です。
        以下の情報を基に、今日の運勢を占ってください：
        
        星座: ${zodiac}
        血液型: ${bloodType}
        
        以下の形式で回答してください：
        - 150文字程度
        - 前向きで優しい口調
        - 具体的なアドバイスを含める
        - 今日一日に焦点を当てる
        - 最後にラッキーカラーとラッキーアイテムを改行して追加
        - ラッキーアイテムは具体的なものを書く
        - ラッキーアイテムは〇〇な〇〇と書く

        回答例：
        今日は新しいチャレンジに最適な日です。積極的に行動しましょう！
        ラッキーカラー: 青
        ラッキーアイテム: 〇〇な〇〇
        `;
}
