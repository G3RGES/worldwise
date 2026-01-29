/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    // weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, emoji, date, notes } = city;

  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <p className={styles.date}>({formatDate(date || null)})</p>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
