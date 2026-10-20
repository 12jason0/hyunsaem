import type { Metadata, Viewport } from "next";
import { site } from "@/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hyunsaem.com"),
  title: site.title,
  description: site.description,
  openGraph: { title: site.title, description: site.description, siteName: site.name, locale: "ko_KR", type: "website" },
};

export const viewport: Viewport = { themeColor: "#2b3346" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
