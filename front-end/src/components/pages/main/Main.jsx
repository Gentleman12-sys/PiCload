import Profile from "./profile/Profile";
import Categories from "./categories/Categories";
import Storage from "./storage/Storage";
import Wallet from "./wallet/Wallet";
import Promocode from "./promocode/Promocode";
import Support from "./support/Support";
import { useState, useEffect } from "react";
import Faq from "./faq/Faq";


import styles from "./main.module.scss";

const Main = () => {
  return (
    <main className={styles.main__page}>
      <Profile />
      <Categories />
      <Storage />
      <Wallet />
      <Promocode />
      <Support />
      <Faq />
    </main>
  );
};
export default Main;
