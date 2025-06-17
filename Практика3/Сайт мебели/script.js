const products = [
    { id: 1, name: 'Угловой диван-кровать Рим', price: 18000, img: '1.jpg' },
    { id: 2, name: 'Диван Ассоль', price: 17500, img: '2.jpg' },
    { id: 3, name: 'Диван Ардеон', price: 22000, img: '3.jpg' },
    { id: 4, name: 'Диван детский Умка', price: 24000, img: '4.jpg' },
    { id: 5, name: 'Кушетка Фан', price: 21000, img: '5.jpg' },
    { id: 6, name: 'Диван Палермо', price: 35000, img: '6.jpg' },
    { id: 7, name: 'Диван Марсель', price: 19000, img: '7.jpg' },
    { id: 8, name: 'Диван-кровать Тони', price: 19000, img: '8.jpg' },
    { id: 9, name: 'Диван Бомбей', price: 16000, img: '9.jpg' },
    { id: 10, name: 'Диван Каир', price: 27000, img: '10.jpg' },
    { id: 11, name: 'Диван выкатной Кармен-2', price: 41000, img: '11.jpg' },
    { id: 12, name: 'Диван Эльпида', price: 26000, img: '12.jpg' },
    { id: 13, name: 'Диван Ардеон', price: 14000, img: '13.jpg' },
    { id: 14, name: 'Диван выкатной Санта', price: 55000, img: '14.jpg' },
    { id: 15, name: 'Диван еврокнижка Марк', price: 34000, img: '15.jpg' },
    { id: 16, name: 'Кровать Герда (160х200)', price: 87000, img: '16.jpg' },
    { id: 17, name: 'Кровать Далия (160х200)', price: 64000, img: '17.jpg' },
    { id: 18, name: 'Кровать Сицилия (160х200)', price: 94000, img: '18.jpg' },
    { id: 19, name: 'Кровать Ларго (180х200)', price: 98000, img: '19.jpg' },
    { id: 20, name: 'Кровать Камилла (160x200)', price: 75000, img: '20.jpg' },
];
let cart = {};

function renderProducts(list) {
    const container = document.getElementById('product-list');
    container.innerHTML = '';
    list.forEach(product => {
        const quantity = cart[product.id]?.quantity || 0;
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-number">${product.id}</div>
            <img src="${product.img}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h2>${product.name}</h2>
                <p>Цена: ${product.price} ₽</p>
                <div class="quantity-controls">
                    <button class="minus" data-id="${product.id}">-</button>
                    <span>${quantity}</span>
                    <button class="plus" data-id="${product.id}">+</button>
                </div>
            </div>`;
        container.appendChild(card);
    });

    document.querySelectorAll('.plus').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            cart[id] = cart[id] || { ...products.find(p => p.id === id), quantity: 0 };
            cart[id].quantity++;
            updateCartCount();
            renderProducts(products);
        });
    });

    document.querySelectorAll('.minus').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            if (cart[id] && cart[id].quantity > 0) {
                cart[id].quantity--;
                if (cart[id].quantity === 0) delete cart[id];
                updateCartCount();
                renderProducts(products);
            }
        });
    });
}

function updateCartCount() {
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

document.getElementById('search').addEventListener('input', e => {
    const query = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    renderProducts(filtered);
});

document.getElementById('price-filter').addEventListener('change', e => {
    const value = e.target.value;
    let filtered = products;
    if (value === 'low') {
        filtered = products.filter(p => p.price <= 5000);
    } else if (value === 'mid') {
        filtered = products.filter(p => p.price > 5000 && p.price <= 10000);
    } else if (value === 'high') {
        filtered = products.filter(p => p.price > 10000);
    }
    renderProducts(filtered);
});

document.getElementById('view-cart').addEventListener('click', () => {
    const modal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;
    Object.values(cart).forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.quantity} — ${item.price * item.quantity} ₽`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });
    cartTotal.textContent = total;
    modal.classList.remove('hidden');
});

document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('cart-modal').classList.add('hidden');
});

document.getElementById('clear-cart').addEventListener('click', () => {
    cart = {};
    updateCartCount();
    renderProducts(products);
    document.getElementById('cart-modal').classList.add('hidden');
});

document.getElementById('contact-btn').addEventListener('click', () => {
    document.getElementById('contact-modal').classList.remove('hidden');
});

document.querySelector('.close-contact').addEventListener('click', () => {
    document.getElementById('contact-modal').classList.add('hidden');
});

renderProducts(products);
