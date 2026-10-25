import { WHATSAPP_NUMBER, getCleanWhatsAppDigits } from './company.js';

export const PRODUCT_CATEGORIES = [
  'All Products',
  'Minerals and Nutrition',
  'Probiotics and Pond Health',
  'Water Quality Management',
  'Oxygen Supplements'
];

export const PRODUCTS = [
  {
    id: 'sr-minwin',
    name: 'SR MINWIN',
    category: 'Minerals and Nutrition',
    image: '/images/sr-minwin.png',
    description: 'Complete mineral mixture for shell formation and growth',
    packSize: '10 kg bag',
    benefits: [
      'Helps moulting and shell formation in shrimp',
      'Improves metabolism and growth performance',
      'Promotes plankton development',
      'Protects from shell & muscle related problems',
      'Increases resistance & immunity with probiotics and vitamins',
      'Prevents mineral deficiency diseases'
    ],
    composition: 'Essential macro and trace minerals in chelated form including Phosphorus (12%), Calcium (24%), Zinc Sulphate, Magnesium, Ferrous Sulphate, Manganese Sulphate, Copper Sulphate, Sodium Butyrate, Vitamins and Probiotics.',
    dosage: '20 kg per hectare OR 10 kg per acre, or as directed by aqua consultant.'
  },
  {
    id: 'aqua-proby',
    name: 'AQUA PROBY+',
    category: 'Probiotics and Pond Health',
    image: '/images/aqua-proby.png',
    description: 'Complete multi-species probiotic for aquaculture ponds',
    packSize: '500g pouch',
    benefits: [
      'Increases productivity and survival rate',
      'Inhibits pathogens and promotes disease resistance',
      'Reduces toxic metabolites (ammonia, nitrite, hydrogen sulphide)',
      'Reduces organic matter & degrades bottom pond sludge',
      'Decreases FCR and improves overall feed conversion',
      'Optimizes beneficial phytoplankton growth'
    ],
    composition: 'Multi-species consortium including Bacillus subtilis, B. megaterium, B. pumilus, B. polymyxa, Nitrosomonas, Nitrobacter, etc. (10-12 Billion CFU/g).',
    dosage: '250g per acre weekly throughout the culture period.'
  },
  {
    id: 'zeolite-gold-plus',
    name: 'ZEOLITE Gold Plus',
    category: 'Water Quality Management',
    image: '/images/zeolite-gold.png',
    description: 'Natural mineral for ammonia removal and water quality improvement',
    packSize: '10 kg bag',
    benefits: [
      'Removes toxic ammonia rapidly from pond water',
      'Regulates and stabilizes pH levels of pond water',
      'Eliminates bad odors and cleans bottom environment',
      'Promotes healthy plankton growth',
      'Improves dissolved oxygen penetration',
      'Granulated form reaches pond bottom directly'
    ],
    composition: 'Microporous crystalline aluminosilicates (SiO2: 65-70%, Al: 20%, Fe: 1-2%, Na: 1-3%, K: 0.5-1%).',
    dosage: '10 kg per acre or as advised by aqua consultant.'
  },
  {
    id: 'oxy-tab',
    name: 'AQUA Oxy Tab',
    category: 'Oxygen Supplements',
    image: '/images/oxy-tab.png',
    description: 'Immediate oxygen booster for pond water',
    packSize: '10 kg bag',
    benefits: [
      'Immediately elevates dissolved oxygen levels in pond water',
      'Prevents mass mortalities from low oxygen emergency',
      'Converts toxic substances into non-toxic oxidized forms',
      'Increases growth rate and overall survival',
      'Reaches pond bottom and releases oxygen steadily'
    ],
    composition: 'Sodium percarbonate (active oxygen release with minimum 13.5% activity).',
    dosage: 'Moulting period: 1-2 kg/acre. DO depletion: 2-3 kg/acre (1m water depth).'
  },
  {
    id: 'oxy-granules',
    name: 'Oxy Granules',
    category: 'Oxygen Supplements',
    image: '/images/oxy-granules.png',
    description: 'Fast-acting granular oxygen supplement',
    packSize: '10 kg bag',
    benefits: [
      'Fast-acting granular oxygen supplement for uniform broadcast',
      'Prevents mass mortalities during night-time or cloudy weather oxygen drops',
      'Converts toxic compounds into non-toxic forms',
      'Increases shrimp vitality and survival rate',
      'Releases active oxygen across the pond benthic zone'
    ],
    composition: 'Granular sodium percarbonate (minimum 13.5% available active oxygen).',
    dosage: 'Moulting period: 1-2 kg/acre. DO depletion: 2-3 kg/acre (1m water depth).'
  }
];

/**
 * Builds the WhatsApp enquiry URL for a specific product.
 * Format: https://wa.me/WHATSAPP_NUMBER?text=ENCODED_MESSAGE
 * Default message: "Hello SR Bio Aqua Products! Can I get more info about this product? Product: [productName]"
 */
export function getProductWhatsAppUrl(productName) {
  const cleanNumber = getCleanWhatsAppDigits(WHATSAPP_NUMBER);
  const text = productName
    ? `Hello SR Bio Aqua Products! Can I get more info about this product? Product: ${productName}`
    : `Hello SR Bio Aqua Products! Can I get more info about your products?`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Builds general WhatsApp enquiry link.
 */
export function getGeneralWhatsAppUrl() {
  const cleanNumber = getCleanWhatsAppDigits(WHATSAPP_NUMBER);
  const text = 'Hello SR Bio Aqua Products! Can I get more info about your products?';
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}
