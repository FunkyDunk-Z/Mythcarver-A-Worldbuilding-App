import styles from "./css/Spinner.module.css";

function Spinner() {
  return (
    <div className={styles.container}>
      <span className={styles.spinner}></span>
    </div>
  );
}

export default Spinner;
