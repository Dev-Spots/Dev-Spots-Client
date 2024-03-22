import HeaderApp from "@/components/atoms/headerApp";
import type { ChildrenProps } from "@/interfaces";
import Script from "next/script";
import ThemeProvider from "@/providers/themeProvider";
import "@/styles/globals.css";

export default function SeoLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <HeaderApp />
      <body>
        <ThemeProvider>
          <>{children}</>
        </ThemeProvider>
        <Script src="/scripts/postHog.js" strategy="afterInteractive" />
        <Script
          src="/scripts/googleTagManager.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
