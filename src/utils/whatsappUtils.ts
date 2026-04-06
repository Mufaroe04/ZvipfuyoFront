export const sendOrderToWhatsApp = (po: any) => {
  // Format the phone number (ensure no spaces or + signs, starting with 263)
  let phone = po.supplier_phone || '';
  phone = phone.replace(/\D/g, ''); // Remove non-numeric characters
  if (phone.startsWith('0')) phone = '263' + phone.substring(1);
  if (!phone.startsWith('263')) phone = '263' + phone;

  const message = `*Zvipfuyo Purchase Order: #${po.id}*
---
*Supplier:* ${po.supplier_name}
*Item:* ${po.item_name}
*Quantity:* ${po.order_quantity}
*Est. Cost:* $${po.estimated_cost}

Please confirm availability and current pricing.
Generated via Zvipfuyo Livestock Management.`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
};