import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useLocation } from "react-router-dom";

const PageTransition = ({ children }) => {
  const containerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const element = containerRef.current;

    // Анимация появления
    gsap.fromTo(
      element,
      { opacity: 0, x: -80 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
    );

    return () => {
      // Анимация исчезновения
      gsap.to(element, {
        opacity: 0,
        x: 20,
        duration: 0.5,
        ease: "power3.in",
      });
    };
  }, [location]);

  return <div ref={containerRef}>{children}</div>;
};

export default PageTransition;
