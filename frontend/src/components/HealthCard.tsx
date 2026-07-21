import styles from "./HealthCard.module.css";

interface Props {
  title: string;
  value: string;
  subtitle: string;
  color?: string;
}

export default function HealthCard({
  title,
  value,
  subtitle,
  color = "#2563eb",
}: Props) {
  return (
    <div className={styles.card}>
      <small>{title}</small>

      <h2 style={{ color }}>
        {value}
      </h2>

      <p>{subtitle}</p>
    </div>
  );
}