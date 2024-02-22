import Image from "../assets/Logo.jpg";
import styles from "./css/PageUnderConstruction.module.css";

function PageUnderConstruction() {
  return (
    <div className={styles.wrapper}>
      <img src={Image} alt="Company Logo" className={styles.image} />
      <h1>This page is under construction</h1>
    </div>
  );
}

export default PageUnderConstruction;
