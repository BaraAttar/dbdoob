import ProductRow from "./ProductRow";
import styles from "./styles/ProductsList.module.css"; 

export default function ProductsList({ productsList, status }) {
  return (
    <tbody className={styles.tbody}>
      {status === "pending" && (
        <tr>
          <td colSpan="7">Loading...</td>
        </tr>
      )}
      {productsList.length === 0 && status !== "pending" && (
        <tr>
          <td colSpan="7">No products available</td>
        </tr>
      )}
      {productsList.map((product) => (
        <ProductRow key={product._id} product={product} />
      ))}
    </tbody>
  );
}
