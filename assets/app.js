const API = "https://script.google.com/macros/s/AKfycbyj4yPuQyJkLjy8kpXRs1cZZ3rZmxHSKwKTG6KHzLQ2QtpcJWw8q_bMW5esfYvhVAWQ/exec";

function hideBroken(img){
  img.onerror = () => img.style.display = "none";
}

async function loadProducts(target){
  const res = await fetch(API + "?action=products");
  const data = await res.json();

  target.innerHTML = data.map(p => `
    <a class="card" href="product.html?id=${p.id}">
      <img src="${p.images[0] || ""}" onerror="hideBroken(this)">
      <div class="info">
        ${p.name}<br>
        ₹${p.price}
      </div>
    </a>
  `).join("");
}
