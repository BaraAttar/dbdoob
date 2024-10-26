import ProductRow from "./ProductRow";
import styles from "./ProductsList.module.css";

export default function ProductsList({ productsList, status, error }) {
  if (status === "pending") {
    return (
      <tbody>
        <tr>
          <td colSpan="7">Loading...</td>
        </tr>
      </tbody>
    );
  }

  if (error) {
    return (
      <tbody>
        <tr>
          <td colSpan="7">{error}</td>
        </tr>
      </tbody>
    );
  }

  if (productsList?.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan="7">No products available</td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className={styles.tbody}>
      {productsList.map((product) => (
        <ProductRow key={product._id} product={product} />
      ))}
    </tbody>
  );

}
