import { ArrowRight } from "lucide-react";
import HeroFX from "./HeroFX";
import SplitText from "./SplitText";

const Hero = () => (
  <section className="hero" id="home">
    <div className="hero-background">
      <img src="/images/hero.png" alt="Swimmer training at Shark Sports Academy" />
    </div>
    <div className="hero-overlay"></div>
    <HeroFX />

    <div className="hero-content">
      <h1>
        <SplitText lines={["Dive Into Confidence.", "Swim Towards Success."]} />
      </h1>

      <p>
        Whether you&apos;re taking your first stroke or training for
        competition, our certified coaches provide expert guidance in a safe,
        modern, and supportive environment for kids and adults of all skill
        levels.
      </p>

      <a href="#contact" className="primary-btn">
        Admission Open
        <span>
          <ArrowRight size={19} />
        </span>
      </a>
    </div>

    <div className="hero-wave" aria-hidden="true">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path
          d="M0,45 C120,25 150,0 260,25 S430,75 560,40 S720,10 850,35 S1050,65 1170,35 S1350,15 1440,45 L1440,100 L0,100 Z"
          fill="#ffffff"
        />
      </svg>
    </div>
  </section>
);

export default Hero;
