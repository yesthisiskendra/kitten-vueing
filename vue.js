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
        variantView: "Near",
        variantImage: "./assets/phyllis_1.JPG"
      },
      {
        variantId: 124,
        variantView: "Far",
        variantImage: "./assets/phyllis_2.JPG"
      }
    ],
    basket: 0
  },
  methods: {
    addToBasket: function() {
      this.basket += 1;
    },
    updatePhoto: function(variantImage) {
      this.image = variantImage;
    }
  }
});
