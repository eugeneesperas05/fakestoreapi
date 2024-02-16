fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => {
    const cardContainer = document.querySelector(".card-container");

    const renderProductCard = (product) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const cardImage = document.createElement("img");
      cardImage.classList.add("card-image");
      cardImage.src = product.image;

      const cardText = document.createElement("div");
      cardText.classList.add("card-text");
      cardText.innerHTML = `
        <p class="title">${product.title}</p>
        <p class="price">₱${product.price.toFixed(2)}</p>
      `;

      const addToCartBtn = document.createElement("button");
      addToCartBtn.textContent = "Add to cart";
      addToCartBtn.classList.add("add-to-cart");

      card.appendChild(cardImage);
      card.appendChild(cardText);
      card.appendChild(addToCartBtn);
      cardContainer.appendChild(card);

      card.addEventListener("click", () => {
        showProductDetails(product);
      });
    };

    const showProductDetails = (product) => {
      const view = document.querySelector(".view");
      view.style.display = "block";
      view.innerHTML = ""; // Clear previous content

      const previewCardContainer = document.createElement("div");
      previewCardContainer.classList.add("preview-card-container");

      const previewCard = document.createElement("div");
      previewCard.classList.add("preview-card");

      const previewCardImage = document.createElement("div");
      previewCardImage.classList.add("preview-card-image");
      previewCardImage.style.backgroundImage = `url(${product.image})`;

      const previewCardText = document.createElement("div");
      previewCardText.classList.add("preview-card-text");
      previewCardText.innerHTML = `
        <p class="category">Category: ${product.category.toUpperCase()}</p>
        <p class="description">Description: ${product.description}</p>
        <p class="rating">Rating: ${product.rating.rate} ⭐ / ${
        product.rating.count
      }</p>
        <p class="price">Price: ₱${product.price}</p>
        <div class="quantity-controls">
          <button class="minus-btn">-</button>
          <input type="text" class="quantity-input" value="0" readonly>
          <button class="plus-btn">+</button>
          <button class="add-to-cart">Add to cart</button>
        </div>
      `;

      previewCard.appendChild(previewCardImage);
      previewCard.appendChild(previewCardText);
      previewCardContainer.appendChild(previewCard);
      view.appendChild(previewCardContainer);

      const quantityInput = previewCard.querySelector(".quantity-input");
      const minusBtn = previewCard.querySelector(".minus-btn");
      const plusBtn = previewCard.querySelector(".plus-btn");
      const addToCartBtn = previewCard.querySelector(".add-to-cart");

      minusBtn.addEventListener("click", () => {
        quantityInput.value = Math.max(parseInt(quantityInput.value) - 1, 0);
      });

      plusBtn.addEventListener("click", () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
      });

      addToCartBtn.addEventListener("click", () => {
        const quantity = parseInt(quantityInput.value);
        if (quantity > 0) {
          alert(`Added ${quantity} ${product.title}(s) to cart`);
        } else {
          alert("Please specify quantity before adding to cart");
        }
      });
    };

    products.slice(0, 5).forEach(renderProductCard);
  })
  .catch((error) => {
    console.error("Error fetching products:", error);
  });
