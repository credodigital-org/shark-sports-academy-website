
import {
  ArrowRight,
  GraduationCap,
  Award,
  Building2,
  Trophy,
  Target,
  Eye,
  Quote,
} from "lucide-react";

import Header from "../components/Header";
import HeroFX from "../components/HeroFX";
import SplitText from "../components/SplitText";
import Footer from "../components/Footer";

import "./About.css";

const stats = [
  {
    icon: GraduationCap,
    number: "200+",
    label: "Happy Students",
  },
  {
    icon: Award,
    number: "20+",
    label: "Expert Trainers",
  },
  {
    icon: Building2,
    number: "3",
    label: "Branches",
  },
  {
    icon: Trophy,
    number: "200+",
    label: "Awards Won",
  },
];

const testimonials = [
  {
    review:
      "Shark Sports Academy has been an amazing experience for my daughter. The coaches are patient, encouraging, and highly professional. We have seen a big improvement in her swimming skills, confidence, and discipline.",
    name: "Emily Johnson",
    role: "Parent of a Student",
    image: "/images/parent-1.jpg",
  },
  {
    review:
      "The academy provides excellent coaching and a friendly atmosphere. My son looks forward to every training session and has developed a real passion for sports.",
    name: "Daniel Thomas",
    role: "Parent of a Student",
    image: "/images/parent-2.jpg",
  },
];

const About = () => {
  return (
    <>
      <Header />

      <main className="about-page">

        {/* ABOUT HERO */}
        <section className="about-hero">
          <div className="about-hero-image">
            <img
              src="/images/hero.png"
              alt="Swimming training at Shark Sports Academy"
            />
          </div>

          <div className="about-hero-overlay"></div>
          <HeroFX />

          <div className="about-hero-content">
            <h1><SplitText text="About Shark Sports Academy" /></h1>

            <p>
              Whether you're a beginner or an experienced athlete,
              our expert coaches provide professional training in a
              safe, modern, and supportive environment for all ages
              and skill levels.
            </p>

            <a href="#contact" className="about-admission-btn">
              Admission Open
              <span>
                <ArrowRight size={20} />
              </span>
            </a>
          </div>

          <div className="about-wave">
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
              <path
                d="M0,45 C120,25 150,0 260,25 S430,75 560,40 S720,10 850,35 S1050,65 1170,35 S1350,15 1440,45 L1440,100 L0,100 Z"
                fill="#ffffff"
              />
            </svg>
          </div>
        </section>

        {/* OUR STORY */}
        <section className="about-story section" id="about-story">

          <h2 className="about-section-title">Our Story</h2>

          <div className="story-grid">

            <div className="story-content">
              <p>
                Shark Sports Academy was founded with a simple belief –
                that sports can transform lives. We are committed to
                providing world-class training in a safe, supportive,
                and inspiring environment.
              </p>

              <p>
                Our mission is to nurture talent, build confidence,
                instill discipline, and help every athlete reach their
                full potential both on and off the field.
              </p>

              <p>
                We offer a wide range of sports and fitness programs
                for kids, teens, and adults, designed for beginners
                as well as competitive athletes. Our experienced
                coaches focus on individual development, proper
                technique, teamwork, and continuous improvement.
              </p>
            </div>

            <div className="story-image">
              <img
                src="/images/about-collage.png"
                alt="Shark Sports Academy sports activities"
              />
            </div>

          </div>
        </section>

        {/* STATISTICS */}
        <section className="about-stats section">

          <div className="about-stats-inner">

            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <div className="about-stat-item" key={index}>
                  <div className="about-stat-icon">
                    <Icon size={30} />
                  </div>

                  <div className="about-stat-text">
                    <h3>{item.number}</h3>
                    <p>{item.label}</p>
                  </div>
                </div>
              );
            })}

          </div>
        </section>

        {/* MISSION AND VISION */}
        <section className="mission-vision section">

          <div className="mission-card">
            <div className="mission-card-heading">
              <h2>Our Mission</h2>

              <span>
                <Target size={30} />
              </span>
            </div>

            <p>
              To provide high-quality sports training in a safe,
              professional, and supportive environment. We help
              athletes develop their skills while building confidence,
              discipline, teamwork, and leadership. Our coaches
              provide personalized guidance based on each athlete's
              abilities and goals. We encourage healthy habits and
              an active lifestyle through enjoyable sports programs.
              We create opportunities for athletes to learn, compete,
              and continuously improve. Above all, we aim to make
              every athlete feel motivated, valued, and inspired.
            </p>
          </div>

          <div className="mission-card">
            <div className="mission-card-heading">
              <h2>Our Vision</h2>

              <span>
                <Eye size={30} />
              </span>
            </div>

            <p>
              To become a trusted and respected sports academy
              recognized for excellence in coaching and athlete
              development. We aim to inspire the next generation
              of athletes and leaders through the power of sports.
              Our vision is to create a community where everyone
              has the opportunity to discover their potential and
              achieve their goals. We strive to create an environment
              where passion, dedication, and teamwork lead to
              lasting success. We envision a future where every
              athlete is empowered to dream bigger, perform better,
              and grow with confidence.
            </p>
          </div>

        </section>

        {/* TESTIMONIALS */}
        <section className="about-testimonials section">

          <div className="testimonial-heading">
            <h2>Client Testimonials</h2>

            <span>
              <Quote size={30} />
            </span>
          </div>

          <div className="testimonial-grid">

            {testimonials.map((item, index) => (
              <article className="about-testimonial-card" key={index}>

                <p className="testimonial-review">
                  “{item.review}”
                </p>

                <div className="testimonial-person">
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div>
                    <h3>{item.name}</h3>
                    <span>{item.role}</span>
                  </div>
                </div>

              </article>
            ))}

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default About;
