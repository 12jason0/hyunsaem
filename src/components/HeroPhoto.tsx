"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// 접속할 때마다 사진 하나를 무작위로 보여줌 (서버 렌더와 어긋나지 않게 마운트 후 선택)
export default function HeroPhoto({ photos }: { photos: { src: string; alt: string }[] }) {
  const [i, setI] = useState<number | null>(null);
  useEffect(() => setI(Math.floor(Math.random() * photos.length)), [photos.length]);
  if (i === null) return null;
  return <Image src={photos[i].src} alt={photos[i].alt} fill priority sizes="(min-width: 1144px) 1080px, 100vw" className="animate-[fadein_.4s_ease-out] object-cover object-[50%_55%]" />;
}
