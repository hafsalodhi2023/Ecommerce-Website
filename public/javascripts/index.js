const hamburger = document.querySelector("#hamburger");
const sidebar = document.querySelector("#sidebar");
const close_btn = document.querySelector("#close-btn");

hamburger.addEventListener("click", (e) => {
  sidebar.className =
    "fixed flex flex-col pt-20 top-0 left-0 w-full h-dvh bg-color_1  items-center justify-center";
});

close_btn.addEventListener("click", () => {
  sidebar.className =
    "fixed flex flex-col pt-20 top-0 left-[-100%] w-full h-dvh bg-color_1  items-center justify-center";
});
