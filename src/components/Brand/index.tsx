import { FaShareAlt } from "react-icons/fa";

export const Brand = () => {
  return (
    <div className="flex text-xl sm:text-lg items-center select-none">
      <FaShareAlt className="text-sky-500" />
      <div className="font-bold">Link</div>
      <div className="text-sky-500">Too</div>
    </div>
  );
};
