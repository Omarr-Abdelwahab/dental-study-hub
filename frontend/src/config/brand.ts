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
  instaPayAddress: import.meta.env["VITE_INSTAPAY_ADDRESS"] || "",
  siteUrl: import.meta.env["VITE_SITE_URL"] || "",
  currency: "EGP",
  locale: "en-GB",
} as const;
