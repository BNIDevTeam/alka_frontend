import React from "react";
import styles from "./HomeBanner.module.css";
import content from "./bannerContent";
import Image from "next/image";
import bannerImage from "./banner-image.jpg";

const HomeBanner = () => {
  return (
    <section className={styles.bannerContainer}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <Image
            src={bannerImage}
            alt="Education Banner"
            className={styles.bannerImage}
            priority
          />
        </div>
        <h1 className={styles.title}>{content.title}</h1>
        <h2 className={styles.subtitle}>{content.subtitle}</h2>
        <p className={styles.description}>{content.description}</p>
        <button className={styles.ctaButton}>{content.ctaText}</button>
      </div>
    </section>
  );
};

export default HomeBanner;
