import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const quickLinks = [
  { name: "Home", to: "/" },
  { name: "Classes", to: "/classes" },
  { name: "Gallery", to: "/gallery" },
  { name: "Branches", to: "/branches" },
  { name: "Trainers", to: "/#trainers" },
];

// TODO: replace "#" with the academy's real profile URLs.
const socials = [
  { label: "WhatsApp", href: "https://wa.me/971565981246", Icon: FaWhatsapp },
  { label: "Facebook", href: "#", Icon: FaFacebookF },
  { label: "Instagram", href: "#", Icon: FaInstagram },
  { label: "TikTok", href: "#", Icon: FaTiktok },
];

const Footer = () => (
  <footer className="footer" id="contact">
    <div className="footer-main">
      <div className="footer-about">
        <img src="/images/logo.png" alt="Shark Sports Academy" />
        <p>
          Shark Sports Academy is dedicated to providing high-quality training
          in a safe, friendly and inspiring environment.
        </p>
      </div>

      <nav className="footer-links" aria-label="Quick links">
        <h3>Quick Links</h3>
        {quickLinks.map((l) => (
          <Link key={l.name} to={l.to}>
            {l.name}
          </Link>
        ))}
      </nav>

      <div className="footer-contact">
        <h3>Contact Us</h3>

        <div className="contact-item">
          <MapPin />
          <span>
            Bateen World Academy – 35 Al Najah Street – Al Manhal – W18 01 –
            Abu Dhabi – United Arab Emirates
          </span>
        </div>

        <a href="tel:+971565981246" className="contact-item">
          <Phone />
          <span>+971565981246</span>
        </a>

        <a href="mailto:info@sharksportsacademy.com" className="contact-item">
          <Mail />
          <span>Send an Email</span>
        </a>
      </div>
    </div>

    <div className="footer-bottom">
      <div className="social-line">
        <span></span>
        <div className="social-icons">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              <Icon />
            </a>
          ))}
        </div>
        <span></span>
      </div>

      <p>Copyright © 2026 Shark Sports Academy. All Rights Reserved.</p>
    </div>
  </footer>
);

export default Footer;
