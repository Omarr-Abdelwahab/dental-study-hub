/**
 * Central brand configuration.
 * Replace these values to rebrand the whole product.
 */
export const brand = {
  name: "Denta Help",
  shortName: "DH",
  tagline: "Dental courses made clear for university students",
  supportEmail: import.meta.env["VITE_SUPPORT_EMAIL"] || "support@dentahelp.com",
  supportPhone: import.meta.env["VITE_SUPPORT_PHONE"] || "+20 100 000 0000",
  whatsAppUrl: import.meta.env["VITE_WHATSAPP_URL"] || "https://wa.me/201000000000",
  trainingMapUrl: import.meta.env["VITE_TRAINING_MAP_URL"] || "",
  instaPayAddress: import.meta.env["VITE_INSTAPAY_ADDRESS"] || "+20 10 14842224",
  siteUrl: import.meta.env["VITE_SITE_URL"] || "",
  currency: "EGP",
  locale: "en-GB",
} as const;
