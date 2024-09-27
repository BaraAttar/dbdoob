import { useState } from 'react';
import styles from "./style/Products.module.css";
import Image from 'next/image';
import Modal from '../components/Modal'; // Adjust the path as needed

// icon
import cartPlus from '@/assets/cart-plus.svg'

export default function Products({ categoryId }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [modalImageAlt, setModalImageAlt] = useState('');

  const cards = Array.from({ length: 12 });

  const addToCart = (i) => {
    console.log(i);
  };

  const openModal = (imageSrc, alt) => {
    setModalImageSrc(imageSrc);
    setModalImageAlt(alt);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImageSrc('');
    setModalImageAlt('');
  };

  return (
    <div className={styles.productsComponent}>
      <h1>Products for Category {categoryId}</h1>
      <div className={styles.productsList}>
        {cards.map((_, i) => (
          <div key={i} className={styles.productCard}>
            <Image
              className={styles.img}
              src="https://i.pinimg.com/736x/60/4b/7c/604b7c5e0854ca82a80a95e49deda0f3.jpg"
              width={150}
              height={150}
              alt={`Card image ${i + 1}`}
              onClick={() => openModal('https://i.pinimg.com/736x/60/4b/7c/604b7c5e0854ca82a80a95e49deda0f3.jpg', `Card image ${i + 1}`)}
            />
            <div className={styles.cardDetails}>
              <div>
                <h1 style={{ margin: "0px" }}>KW1014</h1>
                <p style={{ margin: "0px" }}>
                  عبارة عن كوشة بطول 10متر وارتفاع مترين ونص
                </p>
              </div>
              <Image src={cartPlus} width={50} height={50} alt='cart-plus' className={styles.addToCart} onClick={() => addToCart(i)}>
              </Image>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageSrc={modalImageSrc}
        alt={modalImageAlt}
      />
    </div>
  );
}
