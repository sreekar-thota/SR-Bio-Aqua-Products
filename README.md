# SR Bio Aqua Products - Official Website

A production-ready website for **SR Bio Aqua Products**, an aquaculture products business serving aqua farmers across Andhra Pradesh and Telangana, India.

Built with **React 18**, **Vite**, and **Plain Vanilla CSS** using reusable modular components.

---

## 1. Brand Identity & Design System

The site adheres strictly to the specified solid aquaculture color theme. **No gradients are used anywhere** in backgrounds, buttons, text, borders, or decorative effects.

- **Primary Dark Green:** `#17391C` (Headings, brand titles, solid contact section background)
- **Secondary Forest Green:** `#285B32` (Primary action buttons, brand accents, feature highlights)
- **Accent Aqua Green:** `#55A86A` (Interactive hover states, active tags, subtle check icons)
- **Soft Natural Background:** `#F5F8F2` (Clean page backgrounds, feature cards, image container boxes)
- **White:** `#FFFFFF` (Product cards, header background, clear readability surfaces)
- **Main Text:** `#202820` (High-contrast, readable dark text)
- **Muted Text:** `#667166` (Subtitles, descriptions, secondary copy)
- **Borders:** `#DCE6D9` (Crisp, subtle solid borders)
- **Typography:** Inter (`font-family: 'Inter', sans-serif`) with fluid typography (`clamp()`) and comfortable line heights.

---

## 2. Website Structure (Order of Sections)

1. **Header and Navigation:**
   - Real brand logo (`/images/logo.jpeg`) & company name.
   - Smooth navigation links: **Home, About Us, Products, Contact**.
   - Prominent solid-green **"Enquire Now"** button linking directly to WhatsApp.
   - Accessible mobile hamburger navigation with smooth toggle interaction.
   - Sticky header with subtle elevation shadow.

2. **Company Introduction / Hero Section:**
   - Company Name: **SR Bio Aqua Products**
   - Main Headline: **Quality Aquaculture Solutions**
   - Supporting Headline: **Supporting Aqua Farmers with Trusted Aquaculture Products**
   - Description: *"Explore our range of aquaculture products designed to support pond management and the needs of aqua farmers."*
   - Buttons: **"Explore Our Products"** (smoothly scrolls to `#products`) and **"Contact Us"** (smoothly scrolls to `#contact`).
   - Authentic aquaculture imagery: Hexagon brand logo and Vannamei shrimp photography (`/images/healthy-vannamei-shrimp.jpg`).
   - Verified Quality Indicators: `✓ ISO & GMP Certified | ✓ CAA Approved`.

3. **About SR Bio Aqua Products:**
   - Exact introductory copy: *"SR Bio Aqua Products is committed to serving the aquaculture community with a range of products for aqua farming. Our focus is on product quality, dependable service, and helping farmers find suitable solutions for their farming needs."*
   - Three compact feature blocks:
     - **Quality-Focused Products**
     - **Farmer-Centric Support**
     - **Solutions for Aquaculture**
   - Factual facility details: Hyderabad manufacturing unit & Tanuku sales office.

4. **Explore Our Products (Catalogue):**
   - Heading: **Explore Our Products**
   - Supporting Text: *"Discover our range of aquaculture products and contact our team to learn more."*
   - **Responsive Grid:** 3 columns on desktop, 2 columns on tablets, 1 column on mobile.
   - **Interactive Selection Behavior:**
     - Clicking or tapping any card makes it rise slightly (`translateY(-6px) scale(1.02)`) with a refined border and shadow. Other cards remain stable without layout shift.
     - The selected card reveals a solid **"Click for More Info"** button.
     - Clicking another product switches the selected state smoothly.
     - Clicking the already-selected card, clicking outside, or pressing <kbd>Esc</kbd> deselects it.
     - Keyboard accessible with <kbd>Enter</kbd> / <kbd>Space</kbd>.
   - **WhatsApp Link:** Formats message dynamically:
     ```text
     Hi, I would like to get more information about [PRODUCT_NAME]. Can I get more info about this product?
     ```

5. **Why Choose SR Bio Aqua Products?**
   - Four customer-focused feature cards:
     - **A Range of Aquaculture Products**
     - **Clear Product Information**
     - **Direct Communication with the Team**
     - **Support for Aqua Farmers**
   - Restrained icons, clean spacing, and strictly factual copy with no invented claims.

6. **Contact Section:**
   - Solid dark-green background (`#17391C`) with white text (strictly no gradients).
   - Heading: **Get in Touch**
   - Supporting Text: *"Have questions about our products? Contact our team for more information."*
   - Phone: `+91 9959713456` (clickable `tel:`)
   - Email: `sales@srbioaquaproducts.com` (clickable `mailto:`)
   - Location: `Hyderabad`
   - Prominent solid **"Chat on WhatsApp"** button.
   - Verified facility addresses:
     - **Manufacturing Unit:** Plot No. 168, IDA Prashanthi Nagar, Kukatpally, Hyderabad – 500037
     - **Sales Office:** Velpuru – 534222, Tanuku, West Godavari Dist., Andhra Pradesh

7. **Footer:**
   - Company logo & "Quality Aquaculture Solutions".
   - Navigation links to Home, About, Products, and Contact.
   - Clickable telephone and email details.
   - Dynamic year copyright: `© 2026 SR Bio Aqua Products. All rights reserved.`

8. **Floating WhatsApp Button:**
   - Fixed, accessible quick-action button in the bottom right corner.

---

## 3. Product Catalog Data

Located centrally in [`src/data/products.js`](./src/data/products.js):

| Product Name | Category | Pack Size | Asset File |
| :--- | :--- | :--- | :--- |
| **SR MINWIN** | Minerals and Nutrition | 10 kg bag | `/images/sr-minwin.png` |
| **AQUA PROBY+** | Probiotics and Pond Health | 500g pouch | `/images/aqua-proby.jpg` |
| **ZEOLITE Gold Plus** | Water Quality Management | 10 kg bag | `/images/zeolite-gold.jpg` |
| **Oxy Tab** | Oxygen Supplements | 10 kg bucket | `/images/oxy-tab.jpg` |
| **Oxy Granules** | Oxygen Supplements | 10 kg bucket | `/images/oxy-granules.jpg` |

All product pack packaging images use `object-fit: contain` so bottles, bags, and buckets are never cropped or stretched.

---

## 4. Key Configurations & Pre-Launch Verification

Check [`src/data/company.js`](./src/data/company.js) for contact constants:

```javascript
// Phone number for direct phone calls (tel:)
export const COMPANY_PHONE = '+91 9959713456';

// WhatsApp number for product enquiries
export const WHATSAPP_NUMBER = '+91 9959713456';
```

> [!NOTE]
> **Verified Contact Information:**
> WhatsApp & Direct Contact Number: `+91 9959713456` (click-to-chat `https://wa.me/919959713456`).
> 2. **Certifications:** The site displays verified ISO, GMP, and CAA compliance badges as confirmed from company materials.

---

## 5. How to Run Locally

### Development Server:
```bash
# In Windows PowerShell:
node node_modules/vite/bin/vite.js --port 5173
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build & Preview:
```bash
# Build production bundle:
npm.cmd run build

# Preview production build:
node node_modules/vite/bin/vite.js preview --port 4173
```
