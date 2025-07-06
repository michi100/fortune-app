interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly SelectOption[];
  disabled: boolean;
}

function Select({ label, value, onChange, options, disabled }: SelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-">
        {label}
      </label>
      <div className="grid grid-cols-4 gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="radio"
              name={label}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              className="mr-3 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default Select;
