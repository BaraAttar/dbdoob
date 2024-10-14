import SortInput from "./SortInput";
import styles from "./styles/SortCard.module.css";

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

export default function SortCard() {
  const handleOptionSelect = (option) => {
    console.log(`Selected type: ${option.type} / option: ${option.option}`);
  };

  return (
    <div className={styles.sortCadr}>
      {/* <h1>Search</h1> */}
      <div className={styles.sortInputs}>
        <div>
          <p>العميل</p>
          <SortInput
            type={"custumer"}
            options={options}
            onOptionSelect={handleOptionSelect}
          />
        </div>
        <div>
          <p>المنتجات</p>
          <SortInput
            type={"product"}
            options={options}
            onOptionSelect={handleOptionSelect}
          />
        </div>
        <div>
          <p>حالة الطلب</p>
          <SortInput
            type={"orderStatus"}
            options={options}
            onOptionSelect={handleOptionSelect}
          />
        </div>
        <div className={styles.buttons}>
          <button type="submit" className={styles.searchButton}>
            بحث
          </button>
          <button type="submit" className={styles.clearButton}>
            تصفية 
          </button>
        </div>
      </div>
    </div>
  );
}
