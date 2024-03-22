import { Typography } from "@/components/atoms/typography/material-tailwind";
import Link from "next/link";

const links = [
  {
    href: "#",
    name: "About Us",
  },
  {
    href: "#",
    name: "Contact Us",
  },
];

export default function SimpleFooter() {
  return (
    <footer className="flex bottom-0 w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between m-4 px-16 h-[5vh]">
      <Typography color="blue-gray" className="font-normal text-cyan-200">
        &copy; {new Date().getFullYear()} Dev Spots
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        {links.map(({ href, name }) => (
          <li key={name}>
            <Link
              href={href}
              prefetch
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
