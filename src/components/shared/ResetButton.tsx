interface ResetButtonProps {
  onClick: () => void;
  title?: string;
}

export function ResetButton({ onClick, title = "Reset to interpolated value" }: ResetButtonProps) {
  return (
    <button
      className="reset-button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      title={title}
      aria-label={title}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 2L10 10M10 2L2 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
