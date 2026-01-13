const API = "https://script.google.com/macros/s/AKfycbyj4yPuQyJkLjy8kpXRs1cZZ3rZmxHSKwKTG6KHzLQ2QtpcJWw8q_bMW5esfYvhVAWQ/exec";

function hideBroken(img){
  img.onerror=()=>img.style.display="none";
}

function getUser(){
  return JSON.parse(localStorage.getItem("user")||"null");
}

function loadProducts(target, limit=0){
  fetch(API+"?action=products")
    .then(r=>r.json())
    .then(data=>{
      if(limit) data=data.slice(0,limit);
      target.innerHTML=data.map(p=>`
        <div class="card" onclick="location.href='product.html?id=${p.id}'">
          <img src="${p.images[0]||''}" onerror="hideBroken(this)">
          <h3>${p.name}</h3>
          <p>₹${p.price}</p>
        </div>
      `).join("");
    });
}

function addToCart(p){
  localStorage.setItem("cart",JSON.stringify(p));
  location.href="cart.html";
}

function whatsappOrder(order){
  const msg = `New Order
Name: ${order.name}
Phone: ${order.phone}
Address: ${order.address}, ${order.city} - ${order.pincode}
Total: ₹${order.total}`;
  window.open("https://wa.me/919847420195?text="+encodeURIComponent(msg));
}
