import styles from "./css/Footer.module.css";

function Footer() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.copyright}>
        @copyright Mythcarver - A Worldbuilding App
      </p>
    </div>
  );
}

export default Footer;
