import React, { useEffect } from 'react'

/**
 * Componente de notificação Toast
 */
export default function Toast({ message, description, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️'
  }

  return (
    <div className={`toast ${type}`}>
      <div className="toast-icon">{icons[type]}</div>
      <div className="toast-content">
        <div className="toast-message">{message}</div>
        {description && <div className="toast-description">{description}</div>}
      </div>
    </div>
  )
}





