import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

import Navbar from "./Navbar";

import styles from "./css/Header.module.css";

function Header() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div id="header" className={styles.wrapper}>
      <h1 className={styles.title} onClick={handleNavigate}>
        Mythcarver
      </h1>
      {user ? <Navbar /> : ""}
    </div>
  );
}

export default Header;
