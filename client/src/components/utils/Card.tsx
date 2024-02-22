import { useNavigate } from "react-router-dom";

import styles from "./css/Card.module.css";

type CardProps = {
  link: string;
  image: string;
  cardName: string;
};

function Card({ link, image, cardName }: CardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    return navigate(`${link}`);
  };

  return (
    <div className={styles.wrapper} onClick={handleClick}>
      <img className={styles.image} src={image} alt="image of category" />
      <p className={styles.cardName}>{cardName}</p>
    </div>
  );
}

export default Card;
