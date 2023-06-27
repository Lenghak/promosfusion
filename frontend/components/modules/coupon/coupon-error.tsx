const CouponError = () => {
  return (
    <div className="flex h-full w-full items-center justify-center text-center">
      <span>
        <span className="font-bold">Error | </span>There was an error getting
        your coupon. Or the coupon does not exist.
      </span>
    </div>
  );
};

export { CouponError };
