type NotFoundProps = {};

export default function NotFound({}: NotFoundProps) {
  return (
    <div className="w-full h-full min-h-screen grid place-content-center place-items-center">
      <span className="text-xl">
        <b>404 |</b> Page Not Found
      </span>
    </div>
  );
}
