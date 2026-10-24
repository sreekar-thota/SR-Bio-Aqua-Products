import React from 'react';
import { MessageSquare } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../data/products';

export default function WhatsAppFloatingButton() {
  const handleClick = () => {
    window.open(getGeneralWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <button 
      type="button"
      onClick={handleClick}
      className="floating-whatsapp-btn"
      aria-label="Direct WhatsApp Enquiry"
      title="Chat with SR Bio Aqua Technical Team"
      id="floating-whatsapp-trigger"
    >
      <MessageSquare size={26} aria-hidden="true" />
      <span className="floating-whatsapp-label">WhatsApp</span>
    </button>
  );
}
