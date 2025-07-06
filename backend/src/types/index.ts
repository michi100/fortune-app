export const ZODIAC_SIGNS = [
  { value: "ohitsujiza", label: "おひつじ座♈️" },
  { value: "oushiza", label: "おうし座♉️" },
  { value: "futagoza", label: "ふたご座♊️" },
  { value: "kaniza", label: "かに座♋️" },
  { value: "shishiza", label: "しし座♌️" },
  { value: "otomeza", label: "おとめ座♍️" },
  { value: "tenbinza", label: "てんびん座♎️" },
  { value: "sasoriza", label: "さそり座♏️" },
  { value: "iteza", label: "いて座♐️" },
  { value: "yagiza", label: "やぎ座♑️" },
  { value: "mizugameza", label: "みずがめ座♒️" },
  { value: "uoza", label: "うお座♓️" },
] as const;
export type ZodiacSign = (typeof ZODIAC_SIGNS)[number]["value"];

export const BLOOD_TYPES = [
  { value: "A", label: "A型" },
  { value: "B", label: "B型" },
  { value: "AB", label: "AB型" },
  { value: "O", label: "O型" },
] as const;
export type BloodType = (typeof BLOOD_TYPES)[number]["value"];

export interface FortuneInput {
  zodiac: ZodiacSign | "";
  bloodType: BloodType | "";
}

export interface FortuneResult {
  id: string;
  input: FortuneInput;
  result: string;
  created_at: Date;
}
