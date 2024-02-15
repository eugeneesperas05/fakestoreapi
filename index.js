fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    console.log(json[0]);
    const getProducts = () => {
      const cardCont = document.querySelector(".card-container");
      // Clear previous content
      cardCont.innerHTML = "";

      // Get the first 5 items from the JSON data
      const firstFiveItems = json.slice(0, 19);

      firstFiveItems.forEach((item) => {
        // Create card elements
        const card = document.createElement("div");
        card.classList.add("card");
        const cardImage = document.createElement("img");
        cardImage.classList.add("card-image");
        cardImage.src = `${item.image}`;
        const cardText = document.createElement("div");
        cardText.classList.add("card-text");
        const addCartBtn = document.createElement("button");
        addCartBtn.textContent = "Add to cart";
        addCartBtn.classList.add("addtocart");

        // Set card content
        cardText.innerHTML = `
       <p class="title">${item.title}</p>
        <p class="price">₱${item.price.toFixed(2)}</p>
      `;

        // Append card elements to card container
        card.appendChild(cardImage);
        card.appendChild(cardText);
        cardCont.appendChild(card);
        card.appendChild(addCartBtn);

        card.addEventListener("click", () => {
          const view = document.querySelector(".view");
          view.style.display = "block";

          const previewCardContainer = document.createElement("div");
          previewCardContainer.classList.add("preview-card-container");
          const previewCard = document.createElement("div");
          previewCard.classList.add("preview-card");
          const previewCardImage = document.createElement("div");
          previewCardImage.classList.add("preview-card-image");
          const previewCardText = document.createElement("div");
          previewCardText.classList.add("preview-card-text");

          previewCardText.innerHTML = `
            <p class="category"><span id="category">Category: </span>${item.category.toUpperCase()}</p>
              <p class="description"><span id="description">Description: </span><br>${
                item.description
              }</p>
              <p class="title"><span id="title">Title: </span>${item.title}</p>
              <p class="rating"><span id="rating">Rating: </span>${
                item.rating.rate
              } ⭐ / ${item.rating.count}</p>
              <p class="price"><span id="price">Price: </span>₱${item.price}</p>
            `;

          // + and - button
          const minusBtn = document.createElement("div");
          const plusBtn = document.createElement("div");
          const inputQty = document.createElement("input");

          view.appendChild(previewCardContainer);
          previewCardContainer.appendChild(previewCard);
          previewCard.appendChild(previewCardImage);

          const clonedCardImage = cardImage.cloneNode(true);
          previewCardImage.appendChild(clonedCardImage);
          previewCard.appendChild(previewCardText);
        });
      });
    };
    getProducts();
  });
