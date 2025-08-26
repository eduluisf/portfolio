import { useRef } from "react";
import { useSpotsParallax } from "../hooks/useSpotsParallaxs";
import "./BackgroundSpots.css";

export default function BackgroundSpots() {
  const s1 = useRef(null);
  const s2 = useRef(null);
  const s3 = useRef(null);

  // aumenta o baja la intensidad con el argumento (1 = base)
  useSpotsParallax([s1, s2, s3], 1.0);

  return (
    <>
      <span ref={s1} className="bg-spot spot1" aria-hidden="true" />
      <span ref={s2} className="bg-spot spot2" aria-hidden="true" />
      <span ref={s3} className="bg-spot spot3" aria-hidden="true" />
      <span className="bg-noise" aria-hidden="true" />
    </>
  );
}
