const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.querySelector('#cart-total strong:last-child');
const cartInput = document.getElementById('cart-data');

let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    renderCart();
  });
});

function renderCart() {
  cartItemsContainer.innerHTML = '';

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.style.display = 'flex';
    itemDiv.style.justifyContent = 'space-between';
    itemDiv.style.alignItems = 'center';
    itemDiv.style.marginBottom = '8px';

    itemDiv.innerHTML = `
      <div>
        <strong>${item.name}</strong> x${item.quantity}
      </div>
      <div>
        <span style="margin-right: 15px;">$${(item.price * item.quantity).toFixed(2)}</span>
        <button class="decrease-btn" data-index="${index}">-</button>
        <button class="increase-btn" data-index="${index}">+</button>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  cartTotalElement.textContent = `$${total.toFixed(2)}`;
  cartInput.value = JSON.stringify(cart);

  // Add event listeners for buttons after rendering
  document.querySelectorAll('.increase-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.getAttribute('data-index'));
      cart[i].quantity++;
      renderCart();
    });
  });

  document.querySelectorAll('.decrease-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.getAttribute('data-index'));
      if (cart[i].quantity > 1) {
        cart[i].quantity--;
      } else {
        cart.splice(i, 1);
      }
      renderCart();
    });
  });

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.getAttribute('data-index'));
      cart.splice(i, 1);
      renderCart();
    });
  });
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.ripple').forEach(button => {
    button.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      const diameter = Math.max(this.clientWidth, this.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - this.offsetLeft - radius}px`;
      circle.style.top = `${e.clientY - this.offsetTop - radius}px`;
      circle.classList.add('ripple-effect');

      this.appendChild(circle);

      setTimeout(() => circle.remove(), 600);
    });
  });
});
<script>
document.getElementById('checkout-form').addEventListener('submit', function(event) {
  const checkboxes = document.querySelectorAll('input[name="dish"]:checked');
  if (checkboxes.length === 0) {
    event.preventDefault(); // Stop form from submitting
    alert('Please select at least one dish before proceeding to checkout.');
  }
});
</script>
document.getElementById('checkout-btn').addEventListener('click', function () {
  document.getElementById('main-content').innerHTML = `
    <div class="tick">✔️</div>
    <h1>Thank you for your order!</h1>
    <div class="btn-group">
      <button class="btn" onclick="window.location.href='{{ url_for('index') }}'">Back to Home</button>
      <button class="btn" onclick="alert('Orders page coming soon!')">My Orders</button>
    </div>
  `;
});
