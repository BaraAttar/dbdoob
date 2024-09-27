import styles from './style/Modal.module.css'; 

// imported in "(main)/component/Products"
export default function Modal({ isOpen, onClose, imageSrc, alt }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <img src={imageSrc} alt={alt} className={styles.modalImage} />
        <button className={styles.closeButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
