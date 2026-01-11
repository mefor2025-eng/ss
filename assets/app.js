const API="https://script.google.com/macros/s/AKfycbyj4yPuQyJkLjy8kpXRs1cZZ3rZmxHSKwKTG6KHzLQ2QtpcJWw8q_bMW5esfYvhVAWQ/exec";
const WA="https://wa.me/919847420195?text=";

function hideBroken(img){
  img.onerror=()=>img.style.display="none";
}

/* LOAD ALL PRODUCTS */
async function getProducts(){
  const r=await fetch(API+"?action=products");
  return await r.json();
}

/* RENDER PRODUCT CARD */
function productCard(p){
  return `
    <a href="product.html?id=${p.id}" class="card">
      <img src="${p.images[0]||""}" onerror="hideBroken(this)">
      <div class="info">
        ${p.name}<br>
        <span class="price">₹${p.price}</span>
      </div>
    </a>`;
}
