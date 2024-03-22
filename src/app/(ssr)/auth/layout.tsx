import SimpleFooter from "@/components/molleculs/footer/simpleFooter";
import type { ChildrenProps } from "@/interfaces";

export default function AuthLayout({ children }: ChildrenProps) {
  return (
    <>
      <main>{children}</main>
      <SimpleFooter />
    </>
  );
}
