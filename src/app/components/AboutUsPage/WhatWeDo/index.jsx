"use client";
import React from "react";
import styles from "./whatWeDo.module.css";
import content from "./whatWeDoContent";

const WhatWeDoSection = () => {
  return (
    <section className={styles.section}>
      {/* Left Side Text */}
      <div className={styles.textBlock}>
        <h1 className={styles.mainTitle}>{content.title}</h1>
        <p className={styles.description}>{content.description}</p>
        <p className={styles.philosophy}>{content.philosophy}</p>
        <p className={styles.closing}>{content.closing}</p>
      </div>

      {/* Right Side Images */}
      <div className={styles.imageBlock}>
        <img src={content.images} alt={`what-we-do-image`} />
      </div>
    </section>
  );
};

export default WhatWeDoSection;
