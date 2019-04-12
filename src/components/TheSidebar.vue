<template>
  <div class="sidebar">
    <h1 class="sidebar__logo">
      <router-link to="/">
        Vuelibs
      </router-link>
    </h1>
    <p class="sidebar__headline">
      A list of Vue.js libraries and components based on the <a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a> repo.
    </p>
    
    <div class="sidebar__nav">
      <ul class="primary">
        <li>
          <router-link to="/">All</router-link>
        </li>
        <li v-for="(cat, name) of $options.categories" :key="name">
          <router-link :to="`/${e(name)}`">{{ name }}</router-link>
          <ul class="secondary" v-if="secondaryMenuItems && name == currentCategory">
          <li>
            <router-link :to="`/${e(currentCategory)}`">All</router-link>
          </li>
          <li v-for="(subcat, i) of secondaryMenuItems" :key="i">
            <router-link :to="`/${e(currentCategory)}/${e(subcat)}`">{{ subcat }}</router-link>
          </li>
        </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import categories from '@/categories';

export default {
  categories,
  computed: {
    currentCategory() {
      return this.$route.params.category;
    },
    currentSubcategory() {
      return this.$route.params.subcategory;
    },
    secondaryMenuItems() {
      return this.currentCategory && categories[this.currentCategory];
    }
  },
  methods: {
    e: encodeURIComponent
  }
}
</script>

<style lang="scss">
.sidebar {
  padding: 32px;
  width: 140px;
  flex-basis: 140px;
  
  &__logo {
    font-size: 22px;
    &::first-letter {
      color: #42B883;
    }
  }
  &__headline {
    padding: .5rem 0;
    font-size: 12px;
    color: #666;
  }
  &__nav {
    margin-top: 16px;
    a {
      color: #666;
      display: inline-block;
      padding: 6px 0;
    }
    a.router-link-exact-active {
      color: #000;
      font-weight: bold;
    }
    .secondary {
      margin-left: 16px;
      a {
        padding: 4px 0;
      }
    }
  }
}
</style>
