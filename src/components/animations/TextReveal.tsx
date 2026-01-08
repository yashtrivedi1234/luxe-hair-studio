import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const TextReveal = ({ children, className = "", as: Tag = "p" }: TextRevealProps) => {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = textRef.current.querySelectorAll(".char");

    gsap.fromTo(
      chars,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.02,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const splitText = children.split("").map((char, index) => (
    <span
      key={index}
      className="char inline-block"
      style={{ display: char === " " ? "inline" : "inline-block" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <Tag ref={textRef as any} className={`overflow-hidden ${className}`}>
      {splitText}
    </Tag>
  );
};

export default TextReveal;
