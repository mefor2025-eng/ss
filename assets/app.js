const API="https://script.google.com/macros/s/AKfycbyj4yPuQyJkLjy8kpXRs1cZZ3rZmxHSKwKTG6KHzLQ2QtpcJWw8q_bMW5esfYvhVAWQ/exec";

function hideBroken(img){img.onerror=()=>img.remove();}

function qs(k){return new URLSearchParams(location.search).get(k)}

function saveLS(k,v){localStorage.setItem(k,JSON.stringify(v))}
function getLS(k,d=[]){return JSON.parse(localStorage.getItem(k)||JSON.stringify(d))}

/* PRODUCTS */
async function loadProducts(el){
  const res=await fetch(API+"?action=products");
  const data=await res.json();
  el.innerHTML=data.map(p=>`
    <a href="product.html?id=${p.id}" class="card">
      <img src="${p.images[0]||''}" onerror="hideBroken(this)">
      <div class="card-body">
        <div>${p.name}</div>
        <div class="price">₹${p.price}</div>
      </div>
    </a>
  `).join("");
}

/* PRODUCT PAGE */
async function loadProduct(){
  const id=qs("id");
  const res=await fetch(API+"?action=product&id="+id);
  const p=await res.json();

  document.getElementById("title").innerText=p.name;
  document.getElementById("price").innerText="₹"+p.price;
  document.getElementById("desc").innerText=p.desc;

  const media=document.getElementById("media");
  p.images.forEach(i=>{
    const img=document.createElement("img");
    img.src=i; img.onerror=()=>img.remove();
    media.appendChild(img);
  });
  if(p.video){
    media.innerHTML+=`<video controls src="${p.video}" width="100%"></video>`;
  }

  saveLS("cart",[p]);
}

/* ORDER */
function placeOrder(){
  const n=name.value,p=phone.value,a=address.value;
  if(!n||!p||!a){alert("All fields required");return;}

  const items=getLS("cart");
  const total=items.reduce((s,i)=>s+i.price,0);

  fetch(API+"?action=order&phone="+p+"&name="+n+"&address="+a+"&items="+encodeURIComponent(JSON.stringify(items))+"&total="+total);

  const msg=`New Order\nName: ${n}\nPhone: ${p}\nAddress: ${a}\nTotal: ₹${total}`;
  location.href="https://wa.me/919847420195?text="+encodeURIComponent(msg);
}
