const hamburger = document.querySelector("#hamburger");
const sidebar = document.querySelector("#sidebar");
const close_btn = document.querySelector("#close-btn");
const shop_btn = document.querySelector("#shop-btn");
const shop_subs = document.querySelectorAll(".shop_sub");

shop_subs.forEach((shop_sub) => {
  shop_btn.addEventListener("click", () => {
    if (shop_sub.classList.contains("hidden")) {
      shop_sub.classList.remove("hidden");
      shop_sub.classList.add("flex");
    } else if (shop_sub.classList.contains("flex")) {
      shop_sub.classList.remove("flex");
      shop_sub.classList.add("hidden");
    }
  });
});

hamburger.addEventListener("click", (e) => {
  sidebar.className =
    "fixed flex flex-col z-20 pt-20 top-0 left-0 w-full h-dvh bg-color_1  items-center justify-center";
});

close_btn.addEventListener("click", () => {
  sidebar.className =
    "fixed flex flex-col pt-20 top-0 left-[-100%] w-full h-dvh bg-color_1 items-center justify-center";
});
