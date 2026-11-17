
import { ArrowRight, PersonStanding, Building2, Settings } from "lucide-react";
import {
  TbSwimming,
  TbBallBasketball,
  TbBallFootball,
  TbBallVolleyball,
  TbKarate,
} from "react-icons/tb";
import { GiKimono } from "react-icons/gi";
import { MdSportsGymnastics, MdSportsTennis } from "react-icons/md";

import Header from "../components/Header";
import HeroFX from "../components/HeroFX";
import SplitText from "../components/SplitText";
import Footer from "../components/Footer";

import "./Classes.css";

const activities = [
  {
    name: "Swimming",
    icon: TbSwimming,
    description:
      "Professional swimming activities designed to improve water confidence, swimming techniques, fitness, and overall physical development in a safe and supportive environment.",
  },
  {
    name: "Basketball",
    icon: TbBallBasketball,
    description:
      "An energetic basketball program focused on developing fundamental skills, coordination, teamwork, fitness, and confidence through structured training and practice.",
  },
  {
    name: "Football",
    icon: TbBallFootball,
    description:
      "A dynamic football program that helps participants improve their technical skills, physical fitness, teamwork, game awareness, and sportsmanship.",
  },
  {
    name: "Volleyball",
    icon: TbBallVolleyball,
    description:
      "Build essential volleyball skills, coordination, communication, and teamwork through engaging training sessions suitable for different skill levels.",
  },
  {
    name: "Jiu-Jitsu",
    icon: GiKimono,
    description:
      "Develop strength, discipline, self-confidence, and self-defense skills through structured Jiu-Jitsu training focused on technique, control, and physical fitness.",
  },
  {
    name: "Taekwondo",
    icon: TbKarate,
    description:
      "A structured martial arts program that promotes discipline, flexibility, strength, focus, and self-confidence while developing essential Taekwondo techniques.",
  },
  {
    name: "Gymnastics",
    icon: MdSportsGymnastics,
    description:
      "Improve strength, flexibility, balance, coordination, and body control through engaging gymnastics activities designed to support physical development and confidence.",
  },
  {
    name: "Badminton",
    icon: MdSportsTennis,
    description:
      "Develop badminton techniques, agility, coordination, speed, and fitness through structured training and enjoyable practice sessions.",
  },
];

const services = [
  {
    title: "Camps – Winter, Spring & Summer",
    icon: PersonStanding,
    description:
      "Seasonal sports camps offering engaging activities, skill development, fitness, teamwork, and fun experiences for participants during school breaks.",
  },
  {
    title: "Rental Facilities",
    icon: Building2,
    description:
      "Well-equipped sports facilities available for rental for training sessions, sports activities, events, tournaments, and other recreational needs.",
  },
  {
    title: "Facility Management",
    icon: Settings,
    description:
      "Professional sports facility management focused on smooth daily operations, proper maintenance, safety, cleanliness, and providing a quality experience for users.",
  },
];

const benefits = [
  "Certified & Experienced Coaches",
  "Safe & Clean Environment",
  "Personalized Training",
  "Focus on Discipline & Values",
];

const events = [
  {
    name: "Inter Academy Swimming Meet",
    time: "10:00 AM",
    location: "Al Bateen World Academy",
  },
  {
    name: "Shark Sports Annual Day",
    time: "03:00 PM",
    location: "Main Branch",
  },
  {
    name: "Summer Sports Camp",
    time: "09:00 AM",
    location: "All Branches",
  },
];

const Classes = () => {
  return (
    <>
      <Header />

      <main className="classes-page">

        {/* HERO SECTION */}
        <section className="classes-hero">

          <div className="classes-hero-image">
            <img
              src="/images/hero.png"
              alt="Swimming training"
            />
          </div>

          <div className="classes-hero-overlay"></div>
          <HeroFX />

          <div className="classes-hero-content">
            <h1><SplitText text="Our Classes" /></h1>

            <p>
              From competitive sports to creative pursuits, our
              activities help children and adults build confidence,
              stay active, develop new skills, and enjoy learning
              in a fun and supportive environment.
            </p>

            <a href="#contact" className="classes-admission-btn">
              Admission Open
              <span>
                <ArrowRight size={19} />
              </span>
            </a>
          </div>

          <div className="classes-wave">
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
              <path
                d="M0,45 C120,25 150,0 260,25 S430,75 560,40 S720,10 850,35 S1050,65 1170,35 S1350,15 1440,45 L1440,100 L0,100 Z"
                fill="#ffffff"
              />
            </svg>
          </div>

        </section>

        {/* ACTIVITIES */}
        <section className="classes-activities" id="activities">

          <div className="classes-section-heading">
            <h2>Our Activities</h2>
            <p>
              Choose from a wide range of exciting activities designed
              to build skills, confidence, fitness, and a passion for sports.
            </p>
          </div>

          <div className="activities-grid">

            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <article className="activity-card" key={activity.name}>

                  <div className="activity-icon">
                    <Icon size={30} strokeWidth={2.3} />
                  </div>

                  <h3>{activity.name}</h3>

                  <p>{activity.description}</p>

                </article>
              );
            })}

          </div>
        </section>

        {/* SERVICES */}
        <section className="classes-services" id="services">

          <div className="classes-section-heading">
            <h2>Our Services</h2>
          </div>

          <div className="services-grid">

            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article className="service-card" key={service.title}>

                  <div className="service-icon">
                    <Icon size={29} />
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                </article>
              );
            })}

          </div>
        </section>

        {/* WHY CHOOSE US AND EVENTS */}
        <section className="classes-extra">

          <div className="classes-benefits">

            <h3>
              Why Choose <span>Shark Sports Academy?</span>
            </h3>

            <ul>
              {benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>

          </div>

          <div className="classes-events">

            <div className="events-overlay"></div>

            <div className="events-content">
              <h3>Upcoming Events</h3>

              {events.map((event) => (
                <div className="event-item" key={event.name}>
                  <h4>{event.name}</h4>

                  <p>
                    {event.time} | {event.location}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default Classes;
