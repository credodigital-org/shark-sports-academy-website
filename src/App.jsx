
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Activities from "./components/Activities";
import HomeGallery from "./components/Gallery";
import Trainers from "./components/Trainers";
import Branches from "./components/Branches";
import Footer from "./components/Footer";

import About from "./pages/About";
import Classes from "./pages/Classes";
import GalleryPage from "./pages/Gallery";
import BranchesPage from "./pages/Branches";

import SiteFX from "./components/SiteFX";
import useReveal from "./components/useReveal";

import "./App.css";
import "./design-match.css";
import "./animations.css";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "instant" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}

function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Activities />
        <HomeGallery />
        <Trainers />
        <Branches />
      </main>

      <Footer />
    </>
  );
}

function PageTransition() {
  const { pathname } = useLocation();
  useReveal();
  return <div key={pathname} className="page-transition" />;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageTransition />
      <SiteFX />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/branches" element={<BranchesPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
