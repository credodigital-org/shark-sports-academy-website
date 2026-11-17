
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const trainers = [
  { name: "Trainer One", image: "/images/trainer1.png" },
  { name: "Trainer Two", image: "/images/trainer2.png" },
  { name: "Trainer Three", image: "/images/trainer3.png" },
  { name: "Trainer Four", image: "/images/trainer4.png" },
];

const Trainers = () => {
  return (
    <section className="section trainers-section" id="trainers">
      <div className="section-heading">
        <div>
          <h2>Our Trainers</h2>
          <p>
            Meet our experienced and dedicated trainers who inspire, guide,
            and support every athlete to reach their full potential.
          </p>
        </div>

        <Link to="/about" className="small-btn">
          View Trainers <ArrowRight size={18} />
        </Link>
      </div>

      <div className="trainer-grid">
        {trainers.map((trainer) => (
          <article className="trainer-card" key={trainer.name}>
            <img src={trainer.image} alt={trainer.name} />
            <div className="trainer-info">
              <h3>{trainer.name}</h3>
              <span>Sports Coach</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Trainers;
