import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./BurgerMenu.module.css";

type BurgerMenuProps = {
  isMobNavOpen: boolean;
  setIsMobNavOpen: Function;
};

export default function BurgerMenu({
  isMobNavOpen,
  setIsMobNavOpen,
}: BurgerMenuProps) {
  const closeMobNav = () => {
    setIsMobNavOpen(false);
  };

  const links = [
    { path: "/", label: "HOME" },
    { path: "/shop", label: "SHOP" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT US" },
    { path: "/faq", label: "FAQ" },
  ];

  return (
    <nav className={`${styles.mobNav} ${isMobNavOpen ? styles.openNav : ""}`}>
      <AiOutlineClose onClick={closeMobNav} size={46} />
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.path} onClick={closeMobNav}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
