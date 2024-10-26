import styles from "./Loading.module.css"
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
    <>
      <tr className={styles.tr}>
        <td className={styles.td}></td>
        <td className={styles.td}></td>
        <td className={styles.td}></td>
        <td className={styles.td}></td>
      </tr>
      <tr className={styles.tr}>
        <td className={styles.td}></td>
        <td className={styles.td}></td>
        <td className={styles.td}></td>
        <td className={styles.td}></td>
      </tr>
      <tr className={styles.tr}>
        <td className={styles.td}></td>
        <td className={styles.td}></td>
        <td className={styles.td}></td>
        <td className={styles.td}></td>
      </tr>
      <tr className={styles.tr}>
        <td className={styles.td}></td>
        <td className={styles.td}></td>
        <td className={styles.td}></td>
        <td className={styles.td}></td>
      </tr>
      
     
    </>
  );
  }