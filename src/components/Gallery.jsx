
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  "/images/gallery1.jpg",
  "/images/gallery2.png",
  "/images/gallery3.png",
];

const Gallery = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % galleryImages.length);
  };

  const previous = () => {
    setCurrent(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const visibleImages = Array.from({ length: 3 }, (_, index) => {
    return galleryImages[(current + index) % galleryImages.length];
  });

  return (
    <section className="section gallery-section" id="gallery">
      <div className="section-heading">
        <div>
          <h2>Our Gallery</h2>
          <p>
            Experience the excitement, dedication, and achievements of our
            swimmers. Explore moments from training sessions, competitions,
            events, and memorable milestones at Shark Sports Academy.
          </p>
        </div>

        <Link to="/gallery" className="small-btn">
          View More <ArrowRight size={18} />
        </Link>
      </div>

      <div className="home-gallery-grid">
        {visibleImages.map((image, index) => (
          <div className="gallery-image" key={`${image}-${index}`}>
            <img src={image} alt={`Academy gallery ${index + 1}`} />
          </div>
        ))}
      </div>

      <div className="gallery-controls">
        <div className="gallery-indicators">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              className={current === index ? "indicator active" : "indicator"}
              onClick={() => setCurrent(index)}
              aria-label={`Show gallery image ${index + 1}`}
            />
          ))}
        </div>

        <div className="gallery-arrows">
          <button onClick={previous} aria-label="Previous images">
            <ChevronLeft />
          </button>
          <button onClick={next} aria-label="Next images">
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
