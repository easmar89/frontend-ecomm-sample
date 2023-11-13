import HomeCard from "./HomeCard/HomeCard";
import HeroImage from "../../assets/image1.jpg";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <img
        className={styles.homeImage}
        src={HeroImage}
        alt="a collection of balloons"
      />
      <p className={styles.textContainer}>
        Summer deal is here... <br />
        <span className={styles.promo}>50% discount</span>
        <br /> Let's Party!!!
      </p>
      <div className={styles.container}>
        <h1>Latest collection</h1>
        <section className={styles.imagesContainer}>
          <HomeCard type="NORMAL" />
          <HomeCard type="HEART" />
          <HomeCard type="STAR" />
        </section>
      </div>
    </>
  );
}
