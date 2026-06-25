const WA_NUMBER = '6281234567890';

export function getWhatsAppUrl() {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo heybrews, aku mau ngajak collab')}`;
}
