import HeaderApp from "@/components/atoms/headerApp";
import type { ChildrenProps } from "@/interfaces";
import ThemeProvider from "@/providers/themeProvider";
import "@/styles/globals.css";

export default function SSRLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <HeaderApp />
      <body>
        <ThemeProvider>
          <>{children}</>
        </ThemeProvider>
      </body>
    </html>
  );
}
