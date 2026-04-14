"use client";
import { useEffect } from "react";
import styles from "./ImageHover.module.css";

export default function ImageHover() {
  useEffect(() => {
    const hoverImagesContainer = document.getElementById("imageHover");
    const loadingScreen = document.getElementById("loadingScreen");

    if (hoverImagesContainer && loadingScreen) {
      loadingScreen.style.opacity = "0";
      loadingScreen.style.zIndex = "-1";
      hoverImagesContainer.style.opacity = "1";
    }
  }, []);

  return (
    <div>
      <div style={{ opacity: 0 }} id="imageHover">
        <div className={styles.imageHoverContainer}>
          <div className={styles.container}>
            <div className={styles.middle}>
              <div className={`${styles.bgImage} ${styles.lancaster}`}></div>
              <a
                href="https://www.visitlancashire.com/explore/lancaster"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.overlay}
              >
                <p>Lancaster</p>
                <p>Lancashire, UK</p>
                <p className={styles.mobileLink}>Read More</p>
              </a>
            </div>
            <div className={styles.bottomRight}>
              <div className={`${styles.bgImage} ${styles.lancaster}`}></div>
            </div>
            <div className={styles.bottomLeft}>
              <div className={`${styles.bgImage} ${styles.lancaster}`}></div>
            </div>
            <div className={styles.topLeft}>
              <div className={`${styles.bgImage} ${styles.lancaster}`}></div>
            </div>
            <div className={styles.topRight}>
              <div className={`${styles.bgImage} ${styles.lancaster}`}></div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.loadingContainer} id="loadingScreen">
        <div id="loading"></div>
      </div>
      <a
        className={styles.branding}
        href="https://cameronfitzwilliam.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M43.1942 32.8554C43.1942 32.781 43.1942 32.781 43.1942 32.8554C43.2686 32.781 43.2686 32.7066 43.2686 32.7066C43.2686 32.6322 43.343 32.6322 43.343 32.5578C44.6818 29.657 45.5 26.4587 45.5 23.0372C45.5 10.5413 35.3843 0.5 22.9628 0.5C10.5413 0.5 0.5 10.5413 0.5 22.9628C0.5 26.8306 1.46694 30.5496 3.25207 33.7479C3.25207 33.8223 3.32645 33.8967 3.40083 33.9711C7.19421 40.814 14.5579 45.5 22.9628 45.5C27.1281 45.5 31.0702 44.3843 34.4174 42.376C38.2107 40.0702 41.2603 36.7975 43.1942 32.8554ZM22.9628 3.84711C33.5248 3.84711 42.1529 12.4752 42.1529 23.0372C42.1529 24.9711 41.8554 26.8306 41.3347 28.5413L31.8884 15.376C30.9959 14.186 29.657 13.4422 28.095 13.4422C26.6074 13.4422 25.1942 14.1116 24.3017 15.376L20.657 20.4339L19.9876 19.4669C19.095 18.2769 17.7562 17.5331 16.1942 17.5331C14.7066 17.5331 13.2934 18.2025 12.4008 19.4669L5.03719 29.7314C4.21901 27.6488 3.77273 25.343 3.77273 22.9628C3.84711 12.4008 12.4008 3.84711 22.9628 3.84711ZM6.74793 33.0785L15.1529 21.4752C15.376 21.1033 15.7479 20.9545 16.1942 20.9545C16.6405 20.9545 17.0124 21.1777 17.2355 21.4752L30.9215 40.3678C28.4669 41.4835 25.7893 42.0785 22.9628 42.0785C16.1198 42.1529 10.095 38.5083 6.74793 33.0785ZM33.8967 38.7314L22.7397 23.3347L27.0537 17.3843C27.2769 17.0124 27.7231 16.8636 28.095 16.8636C28.4669 16.8636 28.9132 17.0868 29.1364 17.3843L39.7727 32.1116C38.3595 34.7149 36.3512 37.0207 33.8967 38.7314Z"
            fill="#2F4858"
          />
        </svg>
      </a>
    </div>
  );
}
