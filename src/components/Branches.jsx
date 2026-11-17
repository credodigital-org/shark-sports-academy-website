
import { Link } from "react-router-dom";

const branches = [
  {
    name: "Albateen World Academy",
    image: "/images/branch1.jpg",
  },
  {
    name: "Al Nahda National School for Boys, Al Nahyan",
    image: "/images/branch2.jpg",
  },
  {
    name: "Horizon Private School, Khalifa",
    image: "/images/branch3.jpg",
  },
];

const Branches = () => {
  return (
    <section className="branches-section" id="branches">
      <div className="section">
        <h2 className="branches-title">Branches &amp; Timing</h2>

        <div className="branch-grid">
          {branches.map((branch) => (
            <Link to="/branches" className="home-branch-card" key={branch.name}>
              <img src={branch.image} alt="" loading="lazy" />
              <div className="branch-overlay">
                <h3>{branch.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Branches;
