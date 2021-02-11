// product-item.js

class ProductItem extends HTMLElement {
  // TODO
  constructor(product, incart) {
    // Always call super first in constructor
    super();

    // Element functionality written in here
    // Create a shadow root
    this.attachShadow({ mode: 'open' }); // sets and returns 'this.shadowRoot'

    // li
    const wrapper = document.createElement('li');

    // img tag
    const imgtag = document.createElement('img');
    imgtag.setAttribute('src', product.image);
    imgtag.setAttribute('alt', product.title);
    imgtag.setAttribute('width', 200);
    wrapper.appendChild(imgtag);

    // title
    const ptitle = document.createElement('p');
    ptitle.className = "title";
    ptitle.innerText = product.title;
    wrapper.appendChild(ptitle);

    // price
    const pprice = document.createElement('p');
    pprice.className = "price";
    pprice.innerText = product.price;
    wrapper.appendChild(pprice);

    // button
    const button = document.createElement('button');
    button.setAttribute('onclick', `
    alert('Added to Cart!');
    var cartcount = document.getElementById("cart-count");
    var delta = (this.innerText == "Add to Cart") ? 1 : -1
    cartcount.innerText = parseInt(cartcount.innerText) + delta;
    this.innerText = (this.innerText == "Add to Cart") ? "Remove from Cart" : "Add to Cart";
    cart = JSON.parse(window.localStorage.getItem('cart'))
    if (delta == 1){
      cart[this.id] = 1;
    } else{
      delete cart[this.id]; 
    }
    window.localStorage.setItem('cart', JSON.stringify(cart));
    `);
    button.setAttribute('id', product.id);
    button.innerText = incart ? "Remove from Cart" : "Add to Cart";
    wrapper.appendChild(button);


    const style = document.createElement('style')
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`
    this.shadowRoot.append(style, wrapper);


  }
}

customElements.define('product-item', ProductItem);