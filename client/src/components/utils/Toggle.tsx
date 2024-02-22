import styles from "./css/Toggle.module.css";

function Toggle() {
  return (
    // <div className={styles.toggleSwitch}>
    //   <label className={styles.label}>
    //     <input className={styles.input} type="checkbox" />
    //     <span className={styles.slider}></span>
    //   </label>
    // </div>
    <>
      <label className={styles.toggle}>
        <input className={styles.toggleCheckbox} type="checkbox" />
        <div className={styles.toggleSwitch}></div>
      </label>
    </>
  );
}

export default Toggle;
