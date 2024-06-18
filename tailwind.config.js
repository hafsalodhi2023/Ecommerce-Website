/** @type {import('tailwindcss').Config} */
export default {
  content: ["./views/**/*.ejs"],
  theme: {
    colors: {
      transparent: "transparent",
      color_1: "#F3EFE0",
      color_2: "#434242",
      color_3: "#222222",
      color_4: "#22A39F",
      color_5: "#000000",
      color_6: "#FFFFFF",
    },
    extend: {
      backgroundImage: {
        "gradient-1": "linear-gradient(170deg, #FFF 7.26%, #48B4B6 89.5%);",
        "gradient-2": "linear-gradient(170deg, #FFF 7.26%, #808080 89.5%);",
        "gradient-3": "linear-gradient(170deg, #FFF 7.26%, #F1B0B0 89.5%);",
        "gradient-4": "linear-gradient(170deg, #FFF 7.26%, #169C6A 89.5%);",
        "gradient-5": "linear-gradient(170deg, #FFF 7.26%, #F24616 89.5%);",
        "gradient-6": "linear-gradient(170deg, #FFF 7.26%, #F5BB8D 89.5%);",
      },
    },
  },
  plugins: [],
};
