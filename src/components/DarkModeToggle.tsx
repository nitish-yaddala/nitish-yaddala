'use client';

interface Props {
  isDark: boolean;
  toggle: () => void;
}

export default function DarkModeToggle({ isDark, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110"
      style={{
        zIndex: 10001,
        borderColor: isDark ? '#E0D8C8' : '#111',
        background: isDark ? '#2A2520' : '#F5F0E8',
        color: isDark ? '#E0D8C8' : '#111',
      }}
      aria-label="Toggle dark mode"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="text-lg">{isDark ? '\u2600' : '\u263E'}</span>
    </button>
  );
}
