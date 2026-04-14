import React from "react";
import styles from "./button.module.css";

const Button = ({ link, buttonText }) => {
  return (
    <>
      <a href={link} className={styles.button}>
        {buttonText}
      </a>
    </>
  );
};

export default Button;
