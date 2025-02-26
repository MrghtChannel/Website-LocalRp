"use client";

import React, { useState, useEffect, useRef } from "react";
import Preloader from "./component/preloader";
import Footer from "./component/footer";
import Blog from "./component/blog";
import Social from "./component/social";
import About from "./component/about";
import Hero from "./component/hero";
import HOW from "./component/how";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<number>(0);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const blogRef = useRef<HTMLDivElement | null>(null);
  const socialRef = useRef<HTMLDivElement | null>(null);

  const sectionsRef = [heroRef, aboutRef, blogRef, socialRef];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionOffsets = sectionsRef.map(ref => ref.current?.offsetTop || 0);

      let currentSection = 0;
      for (let i = 0; i < sectionOffsets.length; i++) {
        if (scrollPosition >= sectionOffsets[i] - 100) {
          currentSection = i;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionsRef]);

  const scrollToSection = (index: number) => {
    sectionsRef[index].current?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(index);
  };

  return (
    <div style={{ backgroundColor: "#141414", minHeight: "100vh", position: "relative" }}>
      {isLoading ? (
        <Preloader />
      ) : (
        <div style={{ position: "relative" }}>
          <Hero />
          <div
            style={{
              backgroundImage: 'url(/sadasdsadwe431.png)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              height: '150px',
              position: 'relative',
              marginTop: '-50px',
              marginBottom: '-50px',
              zIndex: 2,
            }}
          ></div>
          <div ref={aboutRef}>
            
            <About />
          </div>
          <div
            style={{
              backgroundImage: 'url(/sadasdsadwe431.png)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              height: '150px',
              position: 'relative',
              marginTop: '-50px',
              marginBottom: '-50px',
              zIndex: 2,
            }}
          ></div>
          <HOW />
          <div
            style={{
              backgroundImage: 'url(/sadasdsadwe431.png)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              height: '150px',
              position: 'relative',
              marginTop: '-50px',
              marginBottom: '-50px',
              zIndex: 2,
            }}
          ></div>
          <div
            ref={blogRef}
            style={{
              backgroundImage: 'url(/frh8sad2.png)',
              backgroundPosition: 'center 20%',
              backgroundSize: 'cover',
              position: 'relative',
              zIndex: 1,
              minHeight: "100vh",
            }}
          >
            <Blog />
          </div>
          <div
            style={{
              backgroundImage: 'url(/sadasdsadwe431.png)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              height: '150px',
              position: 'relative',
              marginTop: '-50px',
              marginBottom: '-50px',
              zIndex: 2,
            }}
          ></div>
          <div
            ref={socialRef}
            style={{
              backgroundImage: 'url(/background-2.2d7dad18.png)',
              backgroundPosition: 'center 20%',
              backgroundSize: 'cover',
              position: 'relative',
              zIndex: 1,
              minHeight: "100vh",
            }}
          >
            <Social />
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
