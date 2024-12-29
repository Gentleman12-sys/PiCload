import { NavLink } from "react-router-dom";

import bonusLogo from "../../../img/icons/bonuses.svg";
import mainLogo from "../../../img/icons/main.svg";
import shopLogo from "../../../img/icons/shop.svg";

import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.navigation__menu}>
      <NavLink
        to="/bonus"
        className={(navData) =>
          navData.isActive ? styles.choosen : styles.navigation
        }
      >
        <img src={bonusLogo} alt="" className={styles.navigation__image} />
        <p className={styles.navigation__name}>Бонусы</p>
      </NavLink>
      <NavLink
        to="/"
        className={(navData) =>
          navData.isActive ? styles.choosen : styles.navigation
        }
      >
        <img src={mainLogo} alt="" className={styles.navigation__image} />
        <p className={styles.navigation__name}>Главная</p>
      </NavLink>
      <NavLink
        to="/shop"
        className={(navData) =>
          navData.isActive ? styles.choosen : styles.navigation
        }
      >
        <img src={shopLogo} alt="" className={styles.navigation__image} />
        <p className={styles.navigation__name}>Магазин</p>
      </NavLink>
    </nav>
  );
};
export default Navbar;
