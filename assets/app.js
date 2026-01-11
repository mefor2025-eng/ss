const API="https://script.google.com/macros/s/AKfycbyj4yPuQyJkLjy8kpXRs1cZZ3rZmxHSKwKTG6KHzLQ2QtpcJWw8q_bMW5esfYvhVAWQ/exec";
const WA="https://wa.me/919847420195?text=";

function qs(k){return new URLSearchParams(location.search).get(k);}
function hideBroken(img){img.onerror=()=>img.style.display="none";}

/* Live Search: name + category */
function enableSearch(input, cards){
  input.oninput=()=>{
    const q=input.value.toLowerCase();
    cards.forEach(c=>{
      c.style.display=c.innerText.toLowerCase().includes(q)?"":"none";
    });
  };
}

/* Wishlist (localStorage) */
function toggleWish(id){
  let w=JSON.parse(localStorage.getItem("wish")||"[]");
  w=w.includes(id)?w.filter(x=>x!==id):[...w,id];
  localStorage.setItem("wish",JSON.stringify(w));
  alert(w.includes(id)?"Added to Wishlist":"Removed from Wishlist");
}

/* WhatsApp-first Order (permanent fix) */
function placeOrderDirect(){
  const n=name.value.trim(), p=phone.value.trim(),
        a=address.value.trim(), c=city.value.trim(),
        z=pincode.value.trim();
  if(!n||!p||!a||!c||!z){alert("All fields required");return;}

  const item=JSON.parse(localStorage.getItem("cart"));
  const msg=`New Order
Name: ${n}
Phone: ${p}
Address: ${a}, ${c} - ${z}
Total: ₹${item.price}`;

  // 1) Open WhatsApp immediately (user click)
  window.open(WA+encodeURIComponent(msg),"_blank");

  // 2) Save order after
  fetch(API+"?"+new URLSearchParams({
    action:"order", phone:p, name:n,
    address:a, city:c, pincode:z,
    items:item.name, total:item.price
  }));
}
