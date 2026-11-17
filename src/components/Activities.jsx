
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const activities = [
  {
    name: "FOOTBALL",
    image: "/images/football.png",
  },
  {
    name: "BASKETBALL",
    image: "/images/basketball.png",
  },
  {
    name: "DODGE BALL",
    image: "/images/dodgeball.png",
  },
  {
    name: "SWIMMING",
    image: "/images/swimming.png",
  },
];

const Activities = () => {
  return (
    <section className="section activities-section" id="activities">
      <div className="section-heading">
        <div>
          <h2>Our Activities</h2>
          <p>
            Choose from a wide range of exciting activities designed to
            build skills, confidence, fitness, and a passion for sports.
          </p>
        </div>

        <Link to="/classes" className="small-btn">
          View Activities <ArrowRight size={18} />
        </Link>
      </div>

      <div className="activity-grid">
        {activities.map((activity) => (
          <article className="home-activity-card" key={activity.name}>
            <img src={activity.image} alt={activity.name} />
            <div className="activity-label">{activity.name}</div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Activities;
