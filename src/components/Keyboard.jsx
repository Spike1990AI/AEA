import { Delete, CheckCircle, RotateCcw } from 'lucide-react';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

export default function Keyboard({ onKeyPress, onBackspace, onClear, onSubmit, disabled = false }) {
  const handleKeyPress = (key) => {
    if (disabled) return;

    // Haptic feedback on supported devices
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }

    onKeyPress(key);
  };

  const handleBackspace = () => {
    if (disabled) return;
    if (navigator.vibrate) navigator.vibrate(10);
    onBackspace();
  };

  const handleClear = () => {
    if (disabled) return;
    if (navigator.vibrate) navigator.vibrate(15);
    onClear();
  };

  const handleSubmit = () => {
    if (disabled) return;
    if (navigator.vibrate) navigator.vibrate(20);
    onSubmit();
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-2 pb-6 no-select">
      {/* Letter keys */}
      <div className="space-y-2 mb-3">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-center gap-1"
            style={{
              paddingLeft: rowIndex === 1 ? '1.5rem' : rowIndex === 2 ? '3rem' : '0'
            }}
          >
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                disabled={disabled}
                className={`
                  min-w-[2.5rem] h-12 sm:min-w-12 sm:h-14
                  bg-white rounded-lg shadow-md
                  font-semibold text-lg sm:text-xl
                  transition-all duration-100
                  active:scale-95 active:shadow-sm
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}
                `}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Space bar */}
      <div className="flex justify-center mb-3">
        <button
          onClick={() => handleKeyPress(' ')}
          disabled={disabled}
          className={`
            w-64 h-12
            bg-white rounded-lg shadow-md
            font-semibold text-base
            transition-all duration-100
            active:scale-95 active:shadow-sm
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}
          `}
        >
          SPACE
        </button>
      </div>

      {/* Action keys */}
      <div className="flex justify-center gap-2 mt-3">
        <button
          onClick={handleClear}
          disabled={disabled}
          className={`
            flex items-center gap-2 px-6 py-3
            bg-gray-200 text-gray-800 rounded-lg shadow-md
            font-semibold
            transition-all duration-100
            active:scale-95 active:shadow-sm
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}
          `}
        >
          <RotateCcw className="w-5 h-5" />
          <span className="hidden sm:inline">Clear</span>
        </button>

        <button
          onClick={handleBackspace}
          disabled={disabled}
          className={`
            flex items-center gap-2 px-6 py-3
            bg-red-100 text-red-700 rounded-lg shadow-md
            font-semibold
            transition-all duration-100
            active:scale-95 active:shadow-sm
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-200'}
          `}
        >
          <Delete className="w-5 h-5" />
          <span className="hidden sm:inline">Delete</span>
        </button>

        <button
          onClick={handleSubmit}
          disabled={disabled}
          className={`
            flex items-center gap-2 px-8 py-3
            bg-green-500 text-white rounded-lg shadow-lg
            font-bold text-lg
            transition-all duration-100
            active:scale-95 active:shadow-md
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}
          `}
        >
          <CheckCircle className="w-6 h-6" />
          <span>Check</span>
        </button>
      </div>

      {/* Prevents native keyboard on iOS */}
      <input
        type="text"
        readOnly
        style={{
          position: 'absolute',
          left: '-9999px',
          pointerEvents: 'none'
        }}
        tabIndex={-1}
      />
    </div>
  );
}
