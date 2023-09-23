import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Spacer from "./Spacer";
import "./Playground.scss";

function Playground() {
  gsap.registerPlugin(ScrollTrigger);
  const slideRef = useRef(null);
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(`.square`, {
        x: window.innerWidth,
        rotation: 180,
        duration: 3,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: `.square`,
          start: "center 80%",
          end: "center 20%",
          scrub: 1,
          markers: true,
        },
      });
      if (slideRef.current) {
        gsap.set(slideRef.current, {
          xPercent: -80,
        });

        gsap.to(slideRef.current, {
          xPercent: 80,
          duration: 3,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".slide-container",
            start: "center center",
            end: "100% top",
            scrub: 1,
            markers: {
              startColor: "blue",
              endColor: "pink",
            },
            pin: slideRef.current,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={rootRef}>
        <Spacer />
        <div style={{ height: "100vh", border: "3px solid white" }}>
          <div className="square"></div>
        </div>
        <div
          style={{
            width: "80vw",
            height: "100vh",
            border: "3px solid white",
            position: "relative",
          }}
          className="slide-container"
        >
          <div className="slide" ref={slideRef}>
            <h1>Your Text here</h1>
          </div>
        </div>
        <Spacer />
      </div>
    </>
  );
}

export default Playground;
