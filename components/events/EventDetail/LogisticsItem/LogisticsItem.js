import styles from './LogisticsItem.module.css';

function LogisticsItem(props) {
  const { icon: Icon } = props;

  return (
    <li className={styles.item}>
      <span className={styles.icon}>
        <Icon />
      </span>
      <span>{props.children}</span>
    </li>
  );
}

export default LogisticsItem;
