var eventBus = new Vue();

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
              
              <h2> Reviews </h2>
              <review-tabs :reviews="reviews"></review-tabs>
  
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
      reviews: []
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
  },
  mounted() {
    eventBus.$on("review-submitted", productReview => {
      this.reviews.push(productReview);
    });
  }
});

Vue.component("kitten-review", {
  template: `
      <form class="review-form" @submit.prevent="onSubmit">
          <p v-if="errors.length">Please correct the following error(s):
              <ul>
                  <li v-for="error in errors">{{ error }}</li>
              </ul>
          </p>
          <p>
              <label for="name">Name:</label>
              <input id="name" v-model="name" placeholder="name">
          </p>
          
          <p>
              <label for="review">Review:</label>      
              <textarea id="review" v-model="review"></textarea>
          </p>
          
          <p>
              <label for="rating">Rating:</label>
              <select id="rating" v-model.number="rating">
              <option>5</option>
              <option>4</option>
              <option>3</option>
              <option>2</option>
              <option>1</option>
              </select>
          </p>
  
          <p> Would you recommend this product? </p>
          <label>
              Yes
              <input type="radio" value="Yes" v-model="recommend"/>
          </label>
          <label>
              No
              <input type="radio" value="No" v-model="recommend"/>
          </label>
  
          <p>
              <input type="submit" value="Submit">  
          </p>    
  
      </form>
      `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    };
  },
  methods: {
    onSubmit() {
      this.errors = [];
      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        };
        console.log("PRODUCT REVIEW", productReview);
        eventBus.$emit("review-submitted", productReview);
        (this.name = null), (this.review = null), (this.rating = null);
      } else {
        if (!this.name) this.errors.push("Name required");
        if (!this.review) this.errors.push("Review required");
        if (!this.rating) this.errors.push("Rating required");
        if (!this.recommend) this.errors.push("Recommendation required");
      }
    }
  }
});

Vue.component("review-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template: `
        <div>
            <span 
                class="tab"
                :class="{ activeTab: selectedTab === tab }" 
                v-for="(tab, index) in tabs" 
                :key="index" 
                @click="selectedTab = tab">
                {{ tab }}</span>
            <div v-show="selectedTab ==='Reviews'">
                <p v-if="!reviews.length">No reviews yet</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>Review: {{ review.review }}</p>
                        <p>Rating: {{ review.rating }}</p>
                    </li>
                </ul>
            </div>
            <div v-show="selectedTab === 'Make a Review'">
            <kitten-review></kitten-review>
            </div>
        </div>
    `,
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedTab: "Reviews"
    };
  }
});

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
      for (let i = this.basket.length - 1; i >= 0; i--) {
        console.log("ID!", id);
        if (this.basket[i] === id) {
          this.basket.splice(i, 1);
        }
      }
    }
  }
});
