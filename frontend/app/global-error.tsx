type ErrorProps = {};

export default function Error({}: ErrorProps) {
  return (
    <div className="grid h-full min-h-screen w-full place-content-center place-items-center">
      <span className="text-xl">
        <b>500 |</b> Internal Server Error
      </span>
    </div>
  );
}
