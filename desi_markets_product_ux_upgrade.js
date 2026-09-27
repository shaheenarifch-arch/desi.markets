/*
 * Desi Markets Product UX Upgrade
 *
 * Features:
 * 1. Removes repeated product variants from homepage carousels
 * 2. Validates AWIN affiliate-link structure
 * 3. Adds Quick View
 * 4. Adds complementary product suggestions
 * 5. Adds "Pairs well with your selection"
 * 6. Keeps affiliate disclosures and sponsored attributes
 */

(() => {
  "use strict";

  const AWIN_AFFILIATE_ID = "3067297";

  const catalogData =
    window.catalogs ||
    (typeof catalogs !== "undefined" ? catalogs : null);

  const catalogNames =
    window.names ||
    (typeof names !== "undefined" ? names : null);

  if (!catalogData || !catalogNames) {
    console.error(
      "Desi Markets UX upgrade could not find catalogs or category names."
    );
    return;
  }

  window.catalogs = catalogData;
  window.names = catalogNames;

  /* ---------------------------------
     Styles
  --------------------------------- */

  const style = document.createElement("style");

  style.textContent = `
    .product {
      cursor: pointer;
    }

    .product:focus-within {
      outline: 3px solid var(--gold, #f3c552);
      outline-offset: 3px;
    }

    .product .body h3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-actions {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 8px;
      margin-top: auto;
    }

    .product-actions .shop {
      width: 100%;
    }

    .quick-view {
      min-width: 105px;
      min-height: 44px;
      padding: 0 14px;
      border: 1px solid var(--line, #ead8b5);
      border-radius: 999px;
      background: #ffffff;
      color: var(--indigo, #2b1458);
      font: inherit;
      font-weight: 800;
      cursor: pointer;
    }

    .quick-view:hover {
      background: var(--gold, #f3c552);
      color: var(--indigo2, #1a0c38);
    }

    .recommendation-panel {
      margin: 26px 0 0;
      padding: 24px;
      border: 1px solid var(--line, #ead8b5);
      border-radius: 22px;
      background: #ffffff;
      box-shadow: var(--shadow, 0 16px 42px rgba(43,20,88,.12));
    }

    .recommendation-heading {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 18px;
      margin-bottom: 18px;
    }

    .recommendation-heading h3 {
      margin: 0 0 6px;
      color: var(--indigo, #2b1458);
      font: 1.8rem/1.1 var(--serif, Georgia, serif);
    }

    .recommendation-heading p {
      max-width: 720px;
      margin: 0;
      color: var(--muted, #695b79);
    }

    .recommendation-close {
      width: 42px;
      height: 42px;
      flex: 0 0 42px;
      border: 1px solid var(--line, #ead8b5);
      border-radius: 50%;
      background: #ffffff;
      color: var(--indigo, #2b1458);
      font-size: 1.2rem;
      cursor: pointer;
    }

    .recommendation-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 14px;
    }

    .mini-product {
      display: flex;
      flex-direction: column;
      min-width: 0;
      overflow: hidden;
      border: 1px solid var(--line, #ead8b5);
      border-radius: 16px;
      background: #ffffff;
    }

    .mini-product-image {
      display: grid;
      place-items: center;
      height: 150px;
      padding: 12px;
      
