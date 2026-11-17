
import {
  ArrowRight,
  MapPin,
  Clock,
  Waves,
} from "lucide-react";

import Header from "../components/Header";
import HeroFX from "../components/HeroFX";
import SplitText from "../components/SplitText";
import Footer from "../components/Footer";

import "./Branches.css";

const branches = [
  {
    name: "Shaikh Zayed PVT Academy for Boys",
    image: "/images/branch/branch1.jpg",
    location: "Al Khalidiya",
    map: "Al Khalidiya, Abu Dhabi, UAE",
    timings: [
      "Mon - Thu : 10:00 AM - 7:00 PM",
      "Fri : 2:00 PM - 10:00 PM",
      "Sat : 8:00 AM - 7:00 PM",
    ],
    activities: [
      "Swimming",
      "Basket Ball",
      "Volley Ball",
      "Football",
      "Jiujitsu",
      "Taekwondo",
      "Gymnastic",
      "Badminton",
    ],
  },

  {
    name: "Bateen World Academy",
    image: "/images/branch/branch2.jpg",
    location: "Al Bateen",
    map: "Bateen World Academy, Abu Dhabi, UAE",
    timings: [
      "Mon - Thu : 4:30 PM - 10:00 PM",
      "Fri : 2:00 PM - 10:00 PM",
      "Sat : 10:00 AM - 7:00 PM",
      "Sun : 10:00 AM - 7:00 PM",
    ],
    activities: [
      "Swimming",
      "Basket Ball",
      "Volley Ball",
      "Football",
    ],
  },

  {
    name: "Al Nahda National School for Boys",
    image: "/images/branch/branch3.jpg",
    location: "Al Nahyan",
    map: "Al Nahda National School, Abu Dhabi, UAE",
    timings: [
      "Mon - Thu : 4:00 PM - 10:00 PM",
      "Fri : 2:00 PM - 10:00 PM",
      "Sat : 10:00 AM - 7:00 PM",
      "Sun : 10:00 AM - 7:00 PM",
    ],
    activities: [
      "Swimming",
      "Pre Team",
    ],
  },

  {
    name: "Horizon PVT School",
    image: "/images/branch/branch4.jpg",
    location: "Khalifa City",
    map: "Horizon Private School, Khalifa City, Abu Dhabi, UAE",
    timings: [
      "Mon - Thu : 4:00 PM - 10:00 PM",
      "Fri : 2:00 PM - 10:00 PM",
      "Sat : 10:00 AM - 7:00 PM",
      "Sun : 10:00 AM - 7:00 PM",
    ],
    activities: [
      "Camps",
      "Swimming",
      "Pre Team",
      "Competitive Team",
    ],
  },
];

const Branches = () => {
  return (
    <>
      <Header />

      <main className="branches-page">

        {/* HERO SECTION */}
        <section className="branches-hero">

          <div className="branches-hero-bg">
            <img
              src="/images/hero.png"
              alt="Shark Sports Academy swimming pool"
            />
          </div>

          <div className="branches-hero-overlay"></div>
          <HeroFX />

          <div className="branches-hero-content">
            <h1><SplitText text="Our Branches" /></h1>

            <p>
              Find a convenient branch near you and enjoy
              expert coaching, modern facilities, flexible
              timings, and a supportive environment for
              every age and skill level.
            </p>

            <a href="#contact" className="branches-admission-btn">
              Admission Open
              <span>
                <ArrowRight size={19} />
              </span>
            </a>
          </div>

          <div className="branches-wave">
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
              <path
                d="M0,45 C120,25 150,0 260,25 S430,75 560,40 S720,10 850,35 S1050,65 1170,35 S1350,15 1440,45 L1440,100 L0,100 Z"
                fill="#ffffff"
              />
            </svg>
          </div>

        </section>

        {/* BRANCHES SECTION */}
        <section className="branches-main" id="branches">

          <div className="branches-heading">
            <h2>Branches &amp; Timing</h2>

            <p>
              Find a branch near you and start your sports journey today.
            </p>
          </div>

          <div className="branches-grid">

            {branches.map((branch, index) => (
              <article
                className="branch-card"
                key={branch.name}
                style={{ animationDelay: `${index * 0.12}s` }}
              >

                {/* IMAGES */}
                <div className="branch-images">

                  <div className="branch-school-image">
                    <img
                      src={branch.image}
                      alt={branch.name}
                      loading="lazy"
                    />
                  </div>

                  <div className="branch-map">
                    <img
                        src="/images/branch/branch-map.png"
                        alt={`${branch.name} location map`}
                        loading="lazy"
                    />
                </div>

                </div>

                {/* BRANCH NAME */}
                <h3>{branch.name}</h3>

                {/* LOCATION */}
                <div className="branch-location">
                  <span className="branch-icon">
                    <MapPin size={17} />
                  </span>

                  <span>{branch.location}</span>
                </div>

                {/* TIMINGS */}
                <div className="branch-subheading">
                  <span className="branch-icon">
                    <Clock size={17} />
                  </span>

                  <strong>Timing</strong>
                </div>

                <div className="branch-timings">
                  {branch.timings.map((time, i) => (
                    <p key={i}>{time}</p>
                  ))}
                </div>

                {/* ACTIVITIES */}
                <div className="branch-subheading branch-activities-title">
                  <span className="branch-icon">
                    <Waves size={17} />
                  </span>

                  <strong>Activities</strong>
                </div>

                <div className="branch-activities">
                  {branch.activities.map((activity, i) => (
                    <span key={i}>
                      {activity}
                    </span>
                  ))}
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

export default Branches;
