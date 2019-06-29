//Add a description to the data object with the value "A pair of warm, fuzzy socks". Then display the description using an expression in an p element, underneath the h1.
Vue.component("kitten-details", {
  props: {
    hobbies: {
      type: Array,
      required: true
    }
  },
  template: `
        <ul>
            <li v-for="hobby in hobbies">{{ hobby }}</li>
        </ul>`
});
Vue.component("kitten-component", {
  props: {
    catperson: {
      type: Boolean,
      required: true
    }
  },
  template: `    
    <div class="product">      
        <div class="product-image">
            <img :src="image" />
        </div>
        <div class="product-info">
            <h1>{{ cat }}</h1>
            <p>{{ description }}</p>
            <p v-if="adoptable">You can adopt me!</p>
            <p v-else="adoptable">I have a forever home!</p>
            <p> User is catperson: {{ catperson }}</p>
            <a :href="link" target="_blank">Find me and my siblings on Instagram!</a>

            <h4>Hobbies:</h4>
            <kitten-details :hobbies="hobbies"></kitten-details>


            <div class="color-box">
            <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateColor(index)">
            </div>
            </div>

            <button v-on:click="addToBasket"
                :disabled="!adoptable"
                :class="{ disabledButton: !adoptable }"> Add to Basket 
            </button>

            <button v-on:click="removeFromBasket"
                :disabled="!adoptable"
                :class="{ disabledButton: !adoptable }"> Remove from Basket 
            </button>

        </div>
    </div>`,
  data() {
    return {
      cat: "Phyllis",
      description: "Female Kitten",
      selectedVariant: 0,
      link: "https://www.instagram.com/michaelscottkittenco/",
      adoptable: true,
      hobbies: ["climbing", "napping", "exploring"],
      variants: [
        {
          variantId: 123,
          variantView: "Near",
          variantImage: "./assets/phyllis_1.JPG",
          variantColor: "blue"
        },
        {
          variantId: 124,
          variantView: "Far",
          variantImage: "./assets/phyllis_2.JPG",
          variantColor: "green"
        }
      ],
      basket: 0
    };
  },
  methods: {
    addToBasket() {
      this.$emit(
        "add-to-basket",
        this.variants[this.selectedVariant].variantId
      );
    },
    removeFromBasket() {
      this.$emit(
        "remove-from-basket",
        this.variants[this.selectedVariant].variantId
      );
    },
    updateColor(index) {
      this.selectedVariant = index;
    }
  },
  computed: {
    image() {
      return this.variants[this.selectedVariant].variantImage;
    }
  }
});
var app = new Vue({
  el: "#app",
  data: {
    catperson: true,
    basket: []
  },
  methods: {
    updateBasket(id) {
      //   this.basket += 1;
      this.basket.push(id);
    },
    removeItem(id) {
      for (var i = this.basket.length - 1; i >= 0; i--) {
        console.log("ID!", id);
        if (this.basket[i] === id) {
          this.basket.splice(i, 1);
        }
      }
    }
  }
});
