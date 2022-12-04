import React from "react";
import * as styles from "./loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.heading}>
          LA GENTE: The Latinx/e Theatre Production Network
        </h1>
        <div className={styles.spinner} />
      </div>
    </div>
  );
};

export default Loader;
