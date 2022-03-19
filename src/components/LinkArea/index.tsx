import { useBreakpointValue, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Link as ButtonLink } from "~/components/Button/Link";

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
    <div className="flex flex-col justify-start w-full h-full px-8 lg:px-96 xl:px-[35rem]">
      {(links || []).map(
        (item, index) =>
          index <= 4 && (
            <Link key={item.href + index} href={`http://${item.href}`} passHref>
              <ButtonLink
                color={"white"}
                isTruncated
                mb="1"
                h={["3.5rem", "3rem"]}
                fontSize={["2xl", "lg"]}
                maxW="xs"
                variant="glass"
              >
                {item.title}
              </ButtonLink>
            </Link>
          )
      )}
    </div>
  );
};
