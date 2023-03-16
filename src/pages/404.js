import Image from "next/image";

function notFound() {
  return (
    <>
      <Image
        src="/logo.png"
        style={{ objectFit: "none" }}
        unoptimized
        priority
        fill="true"
        alt="Fletushka Online"
      />
    </>
  );
}
export default notFound;
