type Props = {};

const CouponSeparator = ({}: Props) => {
  return (
    <svg
      width="100%"
      height="1"
      className={"self-center"}
    >
      <line
        height="100%"
        strokeDasharray="16, 16"
        x1="0"
        y1="0"
        x2="100%"
        y2="0"
        strokeWidth={8}
        stroke="#fff"
      />
    </svg>
  );
};

export { CouponSeparator };
