import { useState } from "react";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { BsBalloonHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import styles from "./Header.module.css";

type HeaderProps = {
  onCartClick: () => void;
  cartCount: number;
};

export default function Header({ onCartClick, cartCount }: HeaderProps) {
  const [isMobNavOpen, setIsMobNavOpen] = useState<boolean>(false);

  const toggleMobNav = () => {
    setIsMobNavOpen(!isMobNavOpen);
  };

  const links = [
    { path: "/shop", label: "SHOP" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT US" },
    { path: "/faq", label: "FAQ" },
  ];

  return (
    <header>
      <div className={styles.bigScreen}>
        <h1 className={styles.title}>
          <Link to="/">BALLOONS</Link>
        </h1>
        <nav className={styles.navbar}>
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={styles.mobScreen}>
        <BsBalloonHeart size={32} onClick={toggleMobNav} />
        <BurgerMenu
          isMobNavOpen={isMobNavOpen}
          setIsMobNavOpen={setIsMobNavOpen}
        />
      </div>
      <section className={styles.icons}>
        <div className={styles.icon} onClick={onCartClick}>
          {cartCount ? (
            <div className={styles.cartCounter}>{cartCount}</div>
          ) : null}
          <PiShoppingCartSimpleBold />
        </div>
      </section>
    </header>
  );
}
