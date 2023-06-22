(()=>{"use strict";const t={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let e;const r=new Uint8Array(16);function n(){if(!e&&(e="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!e))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return e(r)}const s=[];for(let t=0;t<256;++t)s.push((t+256).toString(16).slice(1));const i=function(e,r,i){if(t.randomUUID&&!r&&!e)return t.randomUUID();const o=(e=e||{}).random||(e.rng||n)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,r){i=i||0;for(let t=0;t<16;++t)r[i+t]=o[t];return r}return function(t,e=0){return(s[t[e+0]]+s[t[e+1]]+s[t[e+2]]+s[t[e+3]]+"-"+s[t[e+4]]+s[t[e+5]]+"-"+s[t[e+6]]+s[t[e+7]]+"-"+s[t[e+8]]+s[t[e+9]]+"-"+s[t[e+10]]+s[t[e+11]]+s[t[e+12]]+s[t[e+13]]+s[t[e+14]]+s[t[e+15]]).toLowerCase()}(o)};class o{get id(){return this._id}get name(){return this._name}set name(t){this._name=t}get price(){return this._price}set price(t){this._price=t}get description(){return this._description}set description(t){this._description=t}constructor(t=i(),e,r,n){this._id=t,this._name=e,this._price=r,this._description=n}ItemHTMLElement(){const t=document.createElement("div");return t.classList.add("row"),t.innerHTML=`<strong>${this._name}</strong><p>$${this._price} ${this._description}<p><button class = 'add-one' id = 'a1${this._id}'>Add One</button>`,t}}class a{get id(){return this._id}get name(){return this._name}set name(t){this._name=t}get age(){return this._age}set age(t){this._age=t}get cart(){return this._cart}set cart(t){this._cart=t}constructor(t=i(),e,r,n){this._id=t,this._name=e,this._age=r,this._cart=n}addToCart(t){this._cart.push(t)}removeFromCart(t){this._cart=this._cart.filter((e=>t.id!==e.id))}removeQuantityFromCart(t,e){let r=this._cart.filter((e=>t.id==e.id)).length;this.removeFromCart(t);for(let n=r-e;n>0;n--)this.addToCart(t)}cartTotal(){return this._cart.length?this._cart.map((t=>t.price)).reduce(((t,e)=>t+e)):0}printCart(){for(let t of this._cart)console.log(t.name)}CartHTMLElement(){let t={},e={},r={};for(let n of this._cart)r.hasOwnProperty(n.name)?r[n.name]++:(r[n.name]=1,e[n.name]=n.id,t[n.name]=n.price);const n=document.createElement("div");let s="Your Cart:";for(const n in r)s+=`<div class = 'row'><strong>${n}:</strong><p> $${t[n]} Qty:${r[n]} <p><button class = 'remove-one' id = 'r1${e[n]}'>Remove One</button><button class = 'remove-all' id = 'ra${e[n]}'>Remove All</button></div>`;return s+=`<div class = 'row justify-content-center'><strong>Total:</strong> $${this.cartTotal()}</div>`,n.innerHTML=s,n}static loginUser(t,e){return new a(i(),t,e,[])}}class c{static loginUser(t){t.preventDefault(),new c;const e=document.getElementById("username").value,r=parseInt(document.getElementById("userage").value);c.myUser=a.loginUser(e,r);const n=document.getElementById("login");null==n||n.classList.replace("is-visible","is-invisible");const s=document.getElementById("shoparea"),i=document.getElementById("cartarea");null==s||s.classList.replace("is-invisible","is-visible"),null==i||i.classList.replace("is-invisible","is-visible")}ShowItems(){const t=document.getElementById("shoparea");for(let e of this._stock){const r=e.ItemHTMLElement();null==t||t.appendChild(r);const n=document.getElementById(`a1${e.id}`);null==n||n.addEventListener("click",(t=>{var r;null===(r=c.myUser)||void 0===r||r.addToCart(e),this.UpdateCart()}))}}UpdateCart(){var t,e;const r=document.getElementById("cartarea"),n=document.createElement("div");n.innerHTML="Your cart is empty",r.innerHTML="",(null===(t=c.myUser)||void 0===t?void 0:t.CartHTMLElement())?null==r||r.appendChild(null===(e=c.myUser)||void 0===e?void 0:e.CartHTMLElement()):null==r||r.appendChild(n);const s=document.getElementsByClassName("remove-one");for(let t=0;t<s.length;t++)s[t].addEventListener("click",(e=>{const r=c.myUser.cart.filter((e=>e.id==s[t].id.slice(2)))[0];c.myUser.removeQuantityFromCart(r,1),this.UpdateCart()}));const i=document.getElementsByClassName("remove-all");for(let t=0;t<i.length;t++)i[t].addEventListener("click",(e=>{const r=c.myUser.cart.filter((e=>e.id==s[t].id.slice(2)))[0];c.myUser.removeFromCart(r),this.UpdateCart()}))}get stock(){return this._stock}set stock(t){this._stock=t}constructor(){let t=new o(i(),"lollipop",4,"licky licky"),e=new o(i(),"laffy taffy",2,"sticky icky"),r=new o(i(),"chocolates",5,"ooey gooey"),n=new o(i(),"candy cane",1,"crickle crackle"),s=new o(i(),"bubblegum",2,"pop!"),a=new o(i(),"gummy worms",3,"creepy crawlie");this._stock=[t,e,r,n,s,a],this.ShowItems(),this.UpdateCart()}}document.getElementById("submitbutton").addEventListener("click",(t=>c.loginUser(t)))})();