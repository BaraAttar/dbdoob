"use client";
import { useEffect, useState } from "react";
import SortInput from "../../../adminComponents/SortInput";
import styles from "./SortCard.module.css";
import { useCategoriesStore } from "@/stores/useCategoriesStore";

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

export default function SortCard() {
  const { categories, fetchCategories } = useCategoriesStore();

  const [searchQuery, setSearchQuery] = useState({
    category: null,
  });

  const [categoriesOptions, setCategoriesOptions] = useState([]);

  useEffect(() => {
    if (!categories) {
      fetchCategories();
    } else {
      const newOptions = categories.map((element) => element.name);
      setCategoriesOptions(newOptions);
    }
  }, [categories, fetchCategories]);

  function handleOptionSelect({ type, option }) {
    if (type === "Catrgory") {
      
      setSearchQuery((prevQuery) => ({
        ...prevQuery,
        category: option,
      }));
    }
  }

  function search() {
    console.log(searchQuery);
  }

  return (
    <div className={styles.sortCadr}>
      {/* <h1>Search</h1> */}
      <div className={styles.sortInputs}>
        <div>
          <p>Catrgory</p>
          <SortInput
            type={"Catrgory"}
            options={categoriesOptions}
            onOptionSelect={(option) =>
              handleOptionSelect({ type: "Catrgory", option })
            }
          />
        </div>
        <div>
          <p>المنتجات</p>
          <SortInput
            type={"product"}
            options={options}
            onOptionSelect={(option) =>
              handleOptionSelect({ type: "product", option })
            }
          />
        </div>
        <div>
          <p>حالة الطلب</p>
          <SortInput
            type={"orderStatus"}
            options={options}
            onOptionSelect={(option) =>
              handleOptionSelect({ type: "orderStatus", option })
            }
          />
        </div>
        <div className={styles.buttons}>
          <button
            onClick={search}
            type="submit"
            className={styles.searchButton}
          >
            Search
          </button>
          <button type="submit" className={styles.clearButton}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
