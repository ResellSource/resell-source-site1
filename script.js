// === Resell Source | Stripe Buy Now Button Script ===

document.addEventListener("DOMContentLoaded", async () => {
  console.log("✅ Resell Source script loaded.");

  try {
    const response = await fetch("data/products.json");
    if (!response.ok) throw new Error(`Could not load products.json: ${response.status}`);

    const products = await response.json();
    console.log("✅ Products loaded successfully:", products);

    const buttons = document.querySelectorAll("[data-product]");
    if (buttons.length === 0) {
      console.warn("⚠️ No Buy Now buttons found on this page.");
      return;
    }

    buttons.forEach((button) => {
      const id = button.getAttribute("data-product");
      const product = products.find((p) => p.id === id);

      if (product && product.stripe) {
        button.addEventListener("click", () => {
          console.log(`🛒 Opening Stripe checkout for: ${product.name}`);
          window.open(product.stripe, "_blank", "noopener");
        });
      } else {
        console.warn(`⚠️ Stripe link missing for product ID: ${id}`);
        button.addEventListener("click", () => {
          alert("Sorry, this product is not available right now.");
        });
      }
    });
  } catch (err) {
    console.error("❌ Error initializing Buy Now buttons:", err);
  }
});

