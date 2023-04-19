import Image from "next/image";

function Maintenance() {
  return (
    <>
      <Image
        src="/new-logo.png"
        style={{ objectFit: "contain" }}
        unoptimized
        priority
        fill="false"
        alt="Fletushka Online"
      />
    </>
  );
}
export default Maintenance;
