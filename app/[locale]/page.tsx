"use client";
import Header from "../../components/header";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const t = useTranslations();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Text animation
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.8, delay: 2, ease: "power3.out" }
      );
    }

    // Image zoom in/out loop
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 1 },
        {
          scale: 1.08,
          duration: 8,
          delay: 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        }
      );
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="relative w-screen h-screen overflow-hidden">
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src="/images/2V8A5028-Pano.jpg"
            alt="Chata Claudia"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        {/* Blur overlay */}
        <div
          className={`absolute inset-0 bg-transparent backdrop-blur-md transition-all duration-4000 ease-in-out ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        />
        <div ref={textRef} className="absolute bottom-15 left-5 md:top-100 md:left-15 pl-3 opacity-0">
          <h1 className="home-welcome text-white md:text-8xl text-5xl font-bold">
            {t('home_welcome').split('\n').map((line, i) => (
              <span key={i} style={{ display: 'block' }}>{line}</span>
            ))}
          </h1>
          <p className="text-neutral-300 md:text-3xl text-md ps-1">Lúčky • Demänovská dolina</p>
        </div>
      </div>
    </div>
  );
}