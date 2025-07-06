import Select from "./components/ui/Select";
import FortuneResult from "./components/features/FortuneResult";
import { ZODIAC_SIGNS, BLOOD_TYPES } from "./types";
import { useState } from "react";

function App() {
  const [zodiac, setZodiac] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [canSelectOptions, setCanSelectOptions] = useState(true);

  const handleLockOptions = () => {
    setCanSelectOptions(false);
  };

  const handleReset = () => {
    setZodiac("");
    setBloodType("");
    setCanSelectOptions(true);
  };

  const isFormValid = zodiac !== "" && bloodType !== "";

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full mx-4">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          今日の占い
        </h1>

        <div className="space-y-6">
          <Select
            label="星座を選択してください"
            value={zodiac}
            onChange={setZodiac}
            options={ZODIAC_SIGNS}
            disabled={!canSelectOptions}
          />

          <Select
            label="血液型を選択してください"
            value={bloodType}
            onChange={setBloodType}
            options={BLOOD_TYPES}
            disabled={!canSelectOptions}
          />

          {isFormValid && (
            <FortuneResult
              zodiac={zodiac}
              bloodType={bloodType}
              onReset={handleReset}
              onLockOptions={handleLockOptions}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
