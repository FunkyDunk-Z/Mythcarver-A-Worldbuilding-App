import Spinner from "../components/utils/Spinner";

import styles from "./css/LoadingPage.module.css";

function LoadingPage() {
  return (
    <div className={styles.wrapper}>
      <Spinner />
    </div>
  );
}

export default LoadingPage;
