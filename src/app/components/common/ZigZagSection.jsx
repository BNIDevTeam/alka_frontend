import React from "react";
import styles from "./zigzagsection.module.css";

const ZigZagSection = () => {
  return (
    <>
      {/* Left Side Text */}
      <div className={styles.textBlock}>
        <h1 className={styles.mainTitle}>{content.title}</h1>
        <h3 className={styles.subtitle}>{content.subtitle}</h3>
        <h2 className={styles.heading}>{content.heading}</h2>
        <p className={styles.description}>{content.description}</p>
        <p className={styles.philosophy}>{content.philosophy}</p>
        <p className={styles.closing}>{content.closing}</p>
      </div>

      {/* Right Side Images */}
      <div className={styles.imageBlock}>
        {content.images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`what-we-do-${index}`}
            className={styles.image}
          />
        ))}
      </div>
    </>
  );
};

export default ZigZagSection;
