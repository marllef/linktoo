import { useRouter } from "next/router";
import { FaShareAlt } from "react-icons/fa";

export const Brand = () => {
  const router = useRouter();
  return (
    <div
      className="flex text-xl sm:text-lg items-center cursor-pointer select-none"
      onClick={() => router.push("/")}
    >
      <FaShareAlt className="text-sky-500" />
      <div className="font-bold">Link</div>
      <div className="text-sky-500">Too</div>
    </div>
  );
};
