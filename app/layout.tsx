import type { Metadata } from "next";
import { JetBrains_Mono, Noto_Serif_KR, Playfair_Display } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import NotifyContainer from "@/components/ui/notify/notify-container";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500"],
});

// 한글 서브셋은 next/font 의 preload 대상이 아니라서 preload 를 끈다
const notoSerifKr = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  weight: ["400", "600", "700"],
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Yggdrasil — Yggdrasil로 git을 쉽게 관리하세요",
  description:
    "커밋 그래프를 직접 끌어 놓아 git 히스토리를 고치는 데스크톱 앱. Yggdrasil로 git을 쉽게 관리하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${playfair.variable} ${notoSerifKr.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <NotifyContainer />
      </body>
    </html>
  );
}
