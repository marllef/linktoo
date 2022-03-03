import Link from "next/link";
import Button from "../Button";

interface Props {
  links: {
    href: string;
    title: string;
    color?:
      | "red"
      | "blue"
      | "green"
      | "black"
      | "white"
      | "insta"
      | "face"
      | "whats"
      | "git"
      | "telegram";
  }[];
}

export const LinkArea = ({ links }: Props) => {
  return (
    <div className="flex flex-col justify-start w-full h-full min-w-max px-8 lg:px-96 xl:px-[35rem]">
      {(links || []).map(
        (item, index) =>
          index <= 4 && (
            <Link href={item.href}>
              <Button.Link colorScheme={item.color}>{item.title}</Button.Link>
            </Link>
          )
      )}
    </div>
  );
};
