import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Preloader: React.FC = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.fromTo(
      loaderRef.current,
      { opacity: 0, scale: 1.2 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power2.inOut" }
    );
    
    gsap.fromTo(
      logoRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "bounce.out" }
    );
    
    gsap.to(loaderRef.current, {
      x: "100%",
      duration: 1.5,
      delay: 2,
      ease: "power2.inOut",
      onComplete: () => {
        if (loaderRef.current) loaderRef.current.style.display = "none";
      },
    });
  }, []);

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "9999",
      }}
    >
      <img
        ref={logoRef}
        src="/logo.png"
        alt="Logo"
        style={{ width: "150px" }}
      />
    </div>
  );
};

export default Preloader;