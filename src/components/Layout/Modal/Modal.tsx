import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.css'
import CloseIcon from '@/components/Icons/CloseIcon'

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const [modalContainer, setModalContainer] = useState<HTMLDivElement | null>(
    null
  )

  useEffect(() => {
    const modalRoot = document.createElement('div')
    modalRoot.id = 'modal-root'
    document.body.appendChild(modalRoot)
    setModalContainer(modalRoot)

    // Cleanup function
    return () => {
      if (modalContainer && document.body.contains(modalContainer)) {
        document.body.removeChild(modalContainer)
      }
    }
  }, [])

  if (!isOpen || !modalContainer) return null

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon color='#f87171' />
        </button>
        {children}
      </div>
    </div>,
    modalContainer
  )
}

export default Modal
