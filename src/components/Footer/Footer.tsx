import { useState, useEffect } from "react";
import { BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";
import styles from "./Footer.module.css";

const SECTIONS = [
  {
    title: "Shop",
    links: [
      "Balloons",
      "Accessories",
      "Gift Cards",
      "Best Sellers",
      "New Arrivals",
    ],
  },
  {
    title: "About",
    links: ["Our Story", "Careers", "Press", "Corporate Sales"],
  },
  {
    title: "Support",
    links: [
      "FAQ",
      "Contact Us",
      "Shipping & Returns",
      "Terms & Conditions",
      "Privacy Policy",
    ],
  },
];

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
    window.innerWidth > 768
  );

  const updateScreenSize = () => {
    setIsLargeScreen(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  useEffect(() => {
    if (!isLargeScreen) {
      setOpenSection(null);
    }
  }, [isLargeScreen]);

  const handleClick = (title: string) => {
    if (!isLargeScreen) {
      if (openSection === title) {
        setOpenSection(null);
      } else {
        setOpenSection(title);
      }
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {SECTIONS.map((section) => (
          <div className={styles.section} key={section.title}>
            <h2 onClick={() => handleClick(section.title)}>{section.title}</h2>
            {(isLargeScreen || openSection === section.title) && (
              <ul>
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#!">{link}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className={styles.socialIcons}>
          <li>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsInstagram aria-label="Instagram" size={24} />
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsFacebook aria-label="Facebook" size={24} />
            </a>
          </li>
          <li>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTwitter aria-label="Twitter" size={24} />
            </a>
          </li>
        </div>
      </div>
    </footer>
  );
}
