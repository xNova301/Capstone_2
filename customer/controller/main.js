document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    //Prevent right click
  }, false);
  document.onkeydown = function (event) {
    event = (event || window.event);
    if (event.keyCode == 123) {
      // Prevent F12 
      return false;
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
      // Prevent Ctrl+Shift+I 
      return false;
    }
  }
  
  
  
  
  const getEle = (id) => document.getElementById(id);
  
  import { Service } from '../services/phoneService.js';
  import { CartItem } from '../model/cartItem.js';
  import { Product } from '../model/product.js';
  
  const service = new Service();
  let cart = [];
  
  const renderList = (phoneList) => {
    let content = '';
    phoneList.forEach((ele) => {
      content += ` <div class="col-lg-3 col-md-6">
      <div class="card text-black h-100">
      <div class="content-overlay"></div>
        <img src=${ele.img} class="card-img" alt="Phone Image" />
        <div class="content-details fadeIn-top">
        <h3 class ='pb-5'>Specifications</h3>
              <div class="d-flex justify-content-start py-1">
            <span class='text-light'><b>Screen:</b></span>
            <span class='text-light'>&nbsp ${ele.screen}</span>
          </div>
          <div class="d-flex justify-content-start py-1">
            <span class='text-light'><b>Back Camera:</b> ${ele.backCamera}</span>
          </div>
          <div class="d-flex justify-content-start py-1">
            <span class='text-light'><b>Front Camera:</b> ${ele.frontCamera}</span>
          </div>
  
          <p class = 'pt-5'><u>click here for more details</u></p>
        </div>
        <div class="card-body">
          <div class="text-center">
            <h5 class="card-title pt-3">${ele.name}</h5>
            <span class="text-muted mb-2">$${ele.price}</span>
            <span class="text-danger"><s>$${Number(ele.price) + 300}</s></span>
          </div>
          <div class="mt-3 brand-box text-center">
            <span>${ele.type}</span>
          </div>
          <div class="d-flex justify-content-start pt-3">
            <span><b>Description:</b> ${ele.desc}</span>
          </div>
          <div class="d-flex justify-content-between pt-3">
            <div class="text-warning">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
            </div>
            <span class = 'text-success'><b>In Stock</b></span>
          </div>
          <button type="button" class="btn btn-block w-50" onclick ="btnAddToCart('${ele.id
        }')">Add to cart</button>
        </div>
      </div>
    </div>`;
    });
    getEle('phoneList').innerHTML = content;
  };
  
  const renderCart = (cart) => {
    let content = '';
    cart.forEach((ele) => {
      content += `<div class="product">
    <div class="product__1">
      <div class="product__thumbnail">
        <img src=${ele.product.img} 
          alt="Italian Trulli">
      </div>
      <div class="product__details">
        <div style="margin-bottom: 8px;"><b>${ele.product.name}</b></div>
        <div style="font-size: 90%;">Screen: <span class="tertiary">${ele.product.screen
        }</span></div>
        <div style="font-size: 90%;">Back Camera: <span class="tertiary">${ele.product.backCamera
        }</span></div>
        <div style="font-size: 90%;">Front Camera: <span class="tertiary">${ele.product.frontCamera
        }</span></div>
        <div style="margin-top: 8px;"><a href="#!" onclick ="btnRemove('${ele.product.id
        }')">Remove</a></div>
      </div>
    </div>
    <div class="product__2">
      <div class="qty">
        <span><b>Quantity:</b> </span> &nbsp &nbsp
        <span class="minus bg-dark" onclick ="btnMinus('${ele.product.id}')">-</span>
        <span class="quantityResult mx-2">${ele.quantity}</span>
        <span class="plus bg-dark" onclick ="btnAdd('${ele.product.id}')">+</span>
      </div>
      <div class="product__price"><b>$${ele.quantity * ele.product.price}</b></div>
    </div>
  </div>`;
    });
    getEle('cartList').innerHTML = content;
  
    let cartCount = 0;
    cart.forEach((ele) => {
      cartCount += ele.quantity;
    });
    const subTotal = calculateSubTotal(cart);
    const shipping = subTotal > 0 ? 10 : 0;
    getEle('cartCount').innerHTML = cartCount;
    getEle('shipping').innerHTML = '$' + shipping;
    getEle('subTotal').innerHTML = '$' + subTotal;
    getEle('tax').innerHTML = '$' + Math.floor(subTotal * 0.1);
    getEle('priceTotal').innerHTML = '$' + Math.floor(subTotal * 1.1 + shipping);
  };
  
  // hàm tính tổng tiền trong giỏ hàng
  const calculateSubTotal = (cart) => {
    let subTotal = 0;
    cart.forEach((ele) => {
      subTotal += ele.product.price * ele.quantity;
    });
    return subTotal;
  };
  
  // hàm tìm cart item trong giỏ hàng theo id sản phẩm, trả về cartitem
  const findItemById = (cart, id) => {
    let item;
    cart.forEach((ele) => {
      if (ele.product.id == id) {
        item = ele;
        return;
      }
    });
    return item;
  };
  
  window.onload = async () => {
    const phoneList = await service.getPhones();
    renderList(phoneList);
    cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    renderCart(cart);
  };
  
  //lọc phone theo hãng
  getEle('selectList').onchange = async () => {
    const data = await service.getPhones();
    const selectValue = getEle('selectList').value;
    let filterData =
      selectValue == 'all' ? data : data.filter((ele) => ele.type == selectValue);
    renderList(filterData);
  };
  
  window.btnAddToCart = async (productId) => {
    const phoneData = await service.getPhoneById(productId);
    const { id, name, price, screen, backCamera, frontCamera, img, desc, type } = phoneData;
    const product = new Product(
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type
    );
    const newCartItem = new CartItem(product, 1);
    let cartItem = findItemById(cart, newCartItem.product.id);
    !cartItem ? cart.push(newCartItem) : cartItem.quantity++;
    renderCart(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  // dấu cộng trong giỏ hàng
  window.btnAdd = (id) => {
    let cartItem = findItemById(cart, id);
    if (cartItem) cartItem.quantity++;
    renderCart(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  // dấu trừ trong giỏ hàng
  window.btnMinus = (id) => {
    let cartItem = findItemById(cart, id);
    if (cartItem) cartItem.quantity--;
    cart = cart.filter((ele) => ele.quantity != 0);
    renderCart(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  // xóa sản phẩm khỏi giỏ hàng
  window.btnRemove = (id) => {
    cart = cart.filter((ele) => ele.product.id != id);
    renderCart(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  // clear giỏ hàng
  window.emptyCart = () => {
    cart = [];
    renderCart(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  //Nút thanh toán
  window.payNow = () => {
    if (cart.length > 0) {
      Swal.fire({
        // position: 'top-end',
        icon: 'success',
        title: 'Your order is completed',
        showConfirmButton: false,
        timer: 1500,
      });
      emptyCart();
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your cart is empty',
      });
    }
  };
  