// components/Modal.js

import React from 'react';
import styles from './Modal.module.scss';
import { X } from 'lucide-react';

const Modal = ({ onClose, children }: any) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.closeIcon} onClick={onClose}>
                    <X />
                </div>
                <div className={styles.modalContent}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
