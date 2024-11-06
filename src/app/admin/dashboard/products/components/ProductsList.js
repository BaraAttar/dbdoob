import ProductRow from "./ProductRow";
import styles from "./ProductTable.module.css";
import Loading from "../[productsCategory]/Loading";

export default function ProductsList({ productsList, status }) {
  if (status === "pending") {
    return (
      <tbody>
        <Loading />
      </tbody>
    );
  }

  if (productsList?.length === 0) {
    return (
      <tbody>
        <tr>
          <td className={styles.noProductsMessage} colSpan="7">
            No products available
          </td>
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
