const cardDiv = document.querySelector(".cardMainDiv");

(async () => {
  const response = await fetch("http://localhost:8080/api/dress/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  const data = json.data;

  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add(
      "w-auto",
      "lg:w-60",
      "mb-10",
      "overflow-hidden",
      "flex",
      "items-center",
      "justify-between",
      "flex-col",
    );
    card.id = "card_main-div";
    card.innerHTML = `
             <div class="image-div w-full h-[65%] overflow-hidden flex items-start justify-center">
                <img src=" /images/pant1.png" alt="" />
            </div>
            <div id="text-div" class="flex w-full flex-col items-center justify-end h-[45%]">
                <p class="font-[Poppins] text-xl font-semibold text-center">
                    ${item.name}
                </p>
                <p class="font-[Poppins] text-lg text-center px-2">
                    ${item.SKU}
                </p>
                <p class="font-[Poppins] text-2xl font-semibold">PKR. ${item.sizes[0].colors[0].price}
                </p>
                <a href="#"
                    class="flex w-full items-center justify-center border-2 border-color_4 py-2 text-2xl font-semibold text-color_4">View Product</a>
            </div>
    `;
    cardDiv.appendChild(card);
  });
})();
