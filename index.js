fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    console.log(json[0]);
    const getProducts = () => {
      const cardCont = document.querySelector(".card-container");
      // Clear previous content
      cardCont.innerHTML = "";

      // Get the first 5 items from the JSON data
      // const firstFiveItems = json.slice(0, 19);

      json.forEach((item) => {
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
        <p class="price">$${item.price.toFixed(2)}</p>
      `;

        // Append card elements to card container
        card.appendChild(cardImage);
        card.appendChild(cardText);
        cardCont.appendChild(card);
        card.appendChild(addCartBtn);

        card.addEventListener("click", () => {
          const view = document.querySelector(".view");
          view.style.display = "block";
          // view.style.height = window.innerHeight + "px";
          // document.body.style.overflow = "hidden";

          const xBtn = document.createElement("div");
          xBtn.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
          xBtn.classList.add("x-btn");
          const previewCardContainer = document.createElement("div");
          previewCardContainer.classList.add("preview-card-container");
          const previewCard = document.createElement("div");
          previewCard.classList.add("preview-card");
          const previewCardImage = document.createElement("div");
          previewCardImage.classList.add("preview-card-image");
          const previewCardText = document.createElement("div");
          previewCardText.classList.add("preview-card-text");

          previewCardText.innerHTML = `
            <p id="category">${item.category.toUpperCase()}</p>
              <p id="description">${item.description}</p>
              <p id="title">${item.title}</p>
              <p id="rating">${item.rating.rate} ⭐ / ${item.rating.count}</p>
              <p id="price"><span>$</span>${item.price}</p>
            `;

          xBtn.addEventListener("click", () => {
            card.style.display = "block";
            view.style.display = "none";
            document.body.style.overflow = "auto";
            view.innerHTML = "";
          });

          // + and - button
          const buttonContainer = document.createElement("div");
          let minusBtn = document.createElement("button");
          let plusBtn = document.createElement("button");
          let inputQty = document.createElement("input");
          const clonedAddCartBtn = addCartBtn.cloneNode(true);

          minusBtn.textContent = "-";
          plusBtn.textContent = "+";

          view.appendChild(previewCardContainer);
          previewCardContainer.appendChild(previewCard);
          previewCard.appendChild(previewCardImage);
          previewCard.appendChild(xBtn);

          const clonedCardImage = cardImage.cloneNode(true);
          previewCardImage.appendChild(clonedCardImage);
          previewCard.appendChild(previewCardText);

          previewCardText.appendChild(buttonContainer);
          buttonContainer.appendChild(minusBtn);
          buttonContainer.appendChild(inputQty);
          buttonContainer.appendChild(plusBtn);
          buttonContainer.appendChild(clonedAddCartBtn);

          inputQty.value = 0;
          const subtracBtn = () => {
            minusBtn.addEventListener("click", () => {
              if (inputQty.value == 0) {
                inputQty.value = 0;
              } else {
                inputQty.value -= 1;
              }
            });
            return inputQty.value;
          };
          subtracBtn();

          const addBtn = () => {
            plusBtn.addEventListener("click", () => {
              ++inputQty.value;
            });
            return inputQty.value;
          };
          addBtn();
          clonedAddCartBtn.addEventListener("click", () => {
            if (addBtn() == 0) {
              alert("add QTY");
            } else {
              alert(addBtn() * item.price);
            }
          });
        });
      });
    };
    getProducts();
  });
