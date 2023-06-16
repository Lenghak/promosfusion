const QrScannerViewFinder = () => {
  return (
    <>
      <svg
        viewBox="0 0 100 100"
        className="absolute left-0 top-0 z-10 h-full w-full border-transparent"
      >
        <path
          fill="none"
          d="M23,0 L0,0 L0,23"
          stroke={"white"}
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          fill="none"
          d="M0,77 L0,100 L23,100"
          stroke={"white"}
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          fill="none"
          d="M77,100 L100,100 L100,77"
          stroke={"white"}
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          fill="none"
          d="M100,23 L100,0 77,0"
          stroke={"white"}
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
};

export { QrScannerViewFinder };
