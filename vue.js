//Add a description to the data object with the value "A pair of warm, fuzzy socks". Then display the description using an expression in an p element, underneath the h1.

var app = new Vue({
  el: "#app",
  data: {
    cat: "Phyllis",
    description: "Female Kitten",
    image: "./assets/phyllis_1.JPG",
    link: "https://www.instagram.com/michaelscottkittenco/",
    adoptable: true,
    hobbies: ["climbing", "napping", "exploring"],
    variants: [
      {
        variantId: 123,
        variantPhoto: "Near"
      },
      {
        variantId: 124,
        variantPhoto: "Far"
      }
    ]
  }
});
