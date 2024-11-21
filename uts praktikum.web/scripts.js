// Simpan keranjang belanja
let cart = [];

// Tambah produk ke keranjang
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (event) => {
    const productElement = event.target.closest(".product");
    const productId = productElement.getAttribute("data-id");
    const productName = productElement.getAttribute("data-name");
    const productPrice = parseInt(productElement.getAttribute("data-price"));

    // Cek apakah produk sudah ada di keranjang
    const existingProduct = cart.find((item) => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
  });
});

// Perbarui tampilan keranjang
function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  let totalPrice = 0;

  cart.forEach((item, index) => {
    totalPrice += item.price * item.quantity;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>Rp ${item.price.toLocaleString()}</td>
      <td>
        <button class="decrease" data-index="${index}">-</button>
        ${item.quantity}
        <button class="increase" data-index="${index}">+</button>
      </td>
      <td><button class="remove" data-index="${index}">Hapus</button></td>
    `;
    cartItemsContainer.appendChild(row);
  });

  // Update total harga
  document.getElementById("total-price").innerText = `Rp ${totalPrice.toLocaleString()}`;

  // Tambahkan event listener ke tombol aksi
  document.querySelectorAll(".remove").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      cart.splice(index, 1);
      updateCart();
    });
  });

  document.querySelectorAll(".increase").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      cart[index].quantity += 1;
      updateCart();
    });
  });

  document.querySelectorAll(".decrease").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
      updateCart();
    });
  });
}

// Tombol checkout
document.getElementById("checkout-button").addEventListener("click", () => {
  if (cart.length > 0) {
    alert("Terima kasih! Pesanan Anda telah diproses.");
    cart = [];
    updateCart();
  } else {
    alert("Keranjang belanja kosong!");
  }
});

// Tombol checkout
document.getElementById("checkout-button").addEventListener("click", () => {
  if (cart.length > 0) {
    // Ambil metode pembayaran yang dipilih
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    alert(`Terima kasih! Pesanan Anda telah diproses.\nMetode Pembayaran: ${paymentMethod}`);
    cart = [];
    updateCart();
  } else {
    alert("Keranjang belanja kosong!");
  }
});
