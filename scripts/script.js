// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  // initial cart
  if (localStorage.getItem("cart") === null) {
    window.localStorage.setItem('cart', JSON.stringify({}));
  }
  else{
    try {
      a = JSON.parse(localStorage.getItem("cart"));
    } catch(e) {
      window.localStorage.setItem('cart', JSON.stringify({}));
    }
  }
  fetch('https://fakestoreapi.com/products')
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      var cart = JSON.parse(window.localStorage.getItem('cart'));
      var cartcnt = 0;
      for (var element in myJson) {
        let plist = document.getElementById("product-list");
        let pitemclass = window.customElements.get("product-item");
        let incart = myJson[element].id in cart ? true : false;
        cartcnt += incart ? 1 : 0;
        let item = new pitemclass(myJson[element], incart);
        plist.appendChild(item);
      }
      document.getElementById("cart-count").innerText = cartcnt;
    });
});