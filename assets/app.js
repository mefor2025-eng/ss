const API = "https://script.google.com/macros/s/AKfycbyj4yPuQyJkLjy8kpXRs1cZZ3rZmxHSKwKTG6KHzLQ2QtpcJWw8q_bMW5esfYvhVAWQ/exec";

function loadProducts(target) {
  fetch(API + "?action=products")
    .then(r => r.json())
    .then(data => {
      document.getElementById(target).innerHTML = data.map(p => `
        <div class="card" onclick="location.href='product.html?id=${p[0]}'">
          <img src="${p[6]}">
          <h4>${p[1]}</h4>
          <p>₹${p[2]}</p>
        </div>
      `).join("");
    });
}

function loadProduct() {
  const id = new URLSearchParams(location.search).get("id");
  fetch(API + "?action=product&id=" + id)
    .then(r => r.json())
    .then(p => {
      document.getElementById("name").innerText = p[1];
      document.getElementById("price").innerText = "₹" + p[2];
      document.getElementById("desc").innerText = p[3];

      const imgs = p[6].split(",");
      document.getElementById("mainImage").src = imgs[0];
      document.getElementById("thumbs").innerHTML = imgs.map(i =>
        `<img src="${i}" onclick="mainImage.src='${i}'">`
      ).join("");

      localStorage.setItem("cart", JSON.stringify(p));
    });
}

function addToCart() {
  location.href = "cart.html";
}

function placeOrder() {
  const n = name.value, p = phone.value, a = address.value, c = city.value, z = pincode.value;
  if (!n || !p || !a || !z) return alert("All fields required");

  const prod = JSON.parse(localStorage.getItem("cart"));
  const msg = `New Order\nName:${n}\nPhone:${p}\nAddress:${a}, ${c} - ${z}\nTotal:₹${prod[2]}`;
  window.open(`https://wa.me/919847420195?text=${encodeURIComponent(msg)}`);
}
