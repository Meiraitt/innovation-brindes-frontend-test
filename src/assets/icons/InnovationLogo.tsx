export const InnovationLogo = () => {
  return (
    <div
      className="flex items-center gap-4 text-white"
      aria-label="Innovation Brindes"
    >
      <svg
        aria-hidden="true"
        className="size-16 shrink-0 min-[920px]:size-20"
        fill="currentColor"
        viewBox="0 0 80 80"
      >
        <circle cx="40" cy="40" r="38" />
        <path
          d="M16 36c11-1 20-5 28-13 4-4 7-9 9-15l8 5c-4 11-12 20-23 26v29h-9V43c-5 2-9 3-13 3V36Z"
          fill="#76c900"
        />
        <path
          d="M47 27h8v41h-8V27ZM31 43h9v25h-9V43Z"
          fill="#76c900"
        />
        <path
          d="M24 18c11-2 20-8 25-17l8 6c-7 10-18 18-33 21V18Z"
          fill="#76c900"
        />
      </svg>

      <div className="leading-none">
        <p className="font-serif text-4xl font-bold tracking-tight min-[920px]:text-5xl">
          innovation
        </p>
        <p className="-mt-1 text-right text-base font-bold leading-none tracking-[0.15em] min-[920px]:text-xl">
          BRINDES
        </p>
      </div>
    </div>
  );
};
