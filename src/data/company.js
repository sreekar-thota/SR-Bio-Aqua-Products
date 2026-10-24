/**
 * Company information and contact configuration for SR Bio Aqua Products.
 * 
 * Contact configuration:
 * - Phone & WhatsApp Number: +91 9959713456
 */

// Phone number for direct phone calls (tel:)
export const COMPANY_PHONE = '+91 9959713456';

// WhatsApp number for product enquiries
export const WHATSAPP_NUMBER = '+91 9959713456';

// Helper to get digits only for WhatsApp click-to-chat URLs (e.g. 919959713456)
export function getCleanWhatsAppDigits(phoneStr = WHATSAPP_NUMBER) {
  return phoneStr.replace(/\D/g, '');
}

export const COMPANY_INFO = {
  name: 'SR Bio Aqua Products',
  legalName: 'SR Bio Aqua Products',
  mainHeadline: 'Quality Aquaculture Solutions',
  supportingHeadline: 'Supporting Aqua Farmers with Trusted Aquaculture Products',
  heroDescription: 'Explore our range of aquaculture products designed to support pond management and the needs of aqua farmers.',
  aboutIntro: 'SR Bio Aqua Products is committed to serving the aquaculture community with a range of products for aqua farming. Our focus is on product quality, dependable service, and helping farmers find suitable solutions for their farming needs.',
  
  phoneDisplay: COMPANY_PHONE,
  phoneCall: '+919959713456',
  whatsappDisplay: WHATSAPP_NUMBER,
  whatsappCleanDigits: getCleanWhatsAppDigits(WHATSAPP_NUMBER),
  email: 'sales@srbioaquaproducts.com',
  website: 'https://srbioaquaproducts.com/',
  
  businessHours: 'Monday – Saturday: 9:00 AM – 6:00 PM (IST)',
  
  locations: {
    manufacturing: {
      title: 'Manufacturing Unit',
      addressLine1: 'Plot No. 168, IDA Prashanthi Nagar',
      addressLine2: 'Kukatpally, Hyderabad – 500037',
      state: 'Telangana',
      city: 'Hyderabad'
    },
    sales: {
      title: 'Sales Office',
      addressLine1: 'Velpuru – 534222, Tanuku',
      addressLine2: 'West Godavari Dist., Andhra Pradesh',
      state: 'Andhra Pradesh',
      city: 'Tanuku'
    }
  },
  
  certifications: [
    {
      title: 'ISO & GMP Certified',
      description: 'Adhering to quality standards and good manufacturing practices.'
    },
    {
      title: 'CAA Approved',
      description: 'Formulations compliant with Coastal Aquaculture Authority requirements.'
    }
  ]
};
