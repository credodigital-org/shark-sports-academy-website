import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

import Header from "../components/Header";
import HeroFX from "../components/HeroFX";
import SplitText from "../components/SplitText";
import Footer from "../components/Footer";

import "./Gallery.css";

const galleryData = [
  { image: "gallery-01.jpg", category: "Achievements" },
  { image: "gallery-02.jpg", category: "Achievements" },
  { image: "gallery-03.jpg", category: "Sports" },
  { image: "gallery-04.jpg", category: "Achievements" },
  { image: "gallery-05.jpg", category: "Achievements" },
  { image: "gallery-06.jpg", category: "Achievements" },
  { image: "gallery-07.jpg", category: "Training" },
  { image: "gallery-08.jpg", category: "Achievements" },
  { image: "gallery-09.jpg", category: "Sports" },
  { image: "gallery-10.jpg", category: "Achievements" },
  { image: "gallery-11.jpg", category: "Events" },
  { image: "gallery-12.jpg", category: "Achievements" },
  { image: "gallery-13.jpg", category: "Training" },
  { image: "gallery-14.jpg", category: "Sports" },
  { image: "gallery-15.jpg", category: "Events" },
  { image: "gallery-16.jpg", category: "Achievements" },
  { image: "gallery-01.jpg", category: "Training" },
  { image: "gallery-02.jpg", category: "Sports" },
  { image: "gallery-03.jpg", category: "Events" },
  { image: "gallery-04.jpg", category: "Achievements" },
];

const galleryImages = galleryData.map((item, i) => ({ ...item, id: i }));

const categories = [
  "All",
  "Sports",
  "Events",
  "Training",
  "Achievements",
];

const PAGE_SIZE = 16;

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter(
          (item) => item.category === activeCategory
        );

  const visibleImages = filteredImages.slice(0, visibleCount);

  const handleCategory = (category) => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <>
      <Header />

      <main className="gallery-page">

        {/* HERO SECTION */}
        <section className="gallery-hero">

          <div className="gallery-hero-image">
            <img
              src="/images/hero.png"
              alt="Shark Sports Academy swimming"
            />
          </div>

          <div className="gallery-hero-overlay"></div>
          <HeroFX />

          <div className="gallery-hero-content">
            <h1><SplitText text="Our Gallery" /></h1>

            <p>
              Moments of dedication, teamwork, and achievement.
              Explore highlights from our training sessions,
              events, and activities. Celebrate the passion,
              progress, and memorable moments of our athletes.
            </p>

            <a href="#contact" className="gallery-admission-btn">
              Admission Open
              <span>
                <ArrowRight size={19} />
              </span>
            </a>
          </div>

          <div className="gallery-wave">
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
              <path
                d="M0,45 C120,25 150,0 260,25 S430,75 560,40 S720,10 850,35 S1050,65 1170,35 S1350,15 1440,45 L1440,100 L0,100 Z"
                fill="#ffffff"
              />
            </svg>
          </div>

        </section>

        {/* GALLERY SECTION */}
        <section className="gallery-main" id="gallery">

          <div className="gallery-heading">
            <h2>Moments at Shark</h2>

            <p>
              A glimpse of our training, activities, events,
              and achievements.
            </p>
          </div>

          {/* CATEGORY FILTERS */}
          <div className="gallery-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category ? "selected" : ""
                }
                onClick={() => handleCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* IMAGE GRID */}
          <div className="gallery-grid">

            {visibleImages.map((item, index) => (
              <div
                className="gallery-image-card"
                key={item.id}
              >
                <img
                    src={`/images/gallery/${item.image}`}
                    alt={`Shark Sports Academy ${item.category} ${index + 1}`}
                    loading="lazy"
                />
              </div>
            ))}

          </div>

          {/* LOAD MORE */}
          {visibleCount < filteredImages.length && (
            <div className="gallery-load-more">
              <button
                onClick={() =>
                  setVisibleCount((previous) => previous + 8)
                }
              >
                Load More

                <span>
                  <ChevronDown size={19} />
                </span>
              </button>
            </div>
          )}

          {visibleImages.length === 0 && (
            <p className="gallery-empty">
              No images available in this category.
            </p>
          )}

        </section>

      </main>

      <Footer />
    </>
  );
};

export default Gallery;
