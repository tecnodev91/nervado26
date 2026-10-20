import { contact } from '../config/site';

/**
 * Genera URL de WhatsApp con mensaje opcional.
 * @param {string} [message]
 */
export function getWhatsAppUrl(message = '') {
  const base = `https://wa.me/${contact.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Link estándar para pedir presupuesto desde la web */
export function getBudgetWhatsAppUrl() {
  return getWhatsAppUrl(contact.whatsappBudgetMessage);
}

export function productWhatsAppMessage(productName) {
  return `${contact.whatsappProductPrefix} Quiero consultar por: ${productName}`;
}
