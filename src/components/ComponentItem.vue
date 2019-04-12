<template>
  <div class="component">
    <div class="component__meta">
      <div class="component__stars">{{ data.stats.stars }}</div>
      <p>Updated {{ data.stats.updated | moment('from') }}</p>
      <p>Created {{ data.stats.created | moment('from') }}</p>
      <p>{{ data.stats.forks }} forks</p>
      <p><a target="_blank" :href="`${data.url}/issues`">{{ data.stats.issues }} issues</a></p>
    </div>
    <div class="component__content">
      <p class="component__category">
        <template v-if="!currentCategory">
          {{ data.category }}
        </template>
        <template v-if="!currentCategory && !currentSubcategory"> → </template>
        <template v-if="!currentSubcategory">
          {{ data.subcategory }}
        </template>
      </p>
      <h2 class="component__name"><a :href="data.url" target="_blank">{{ data.name }}</a></h2>
      <p>{{ data.desc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
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
}
</script>

<style lang="scss">
.component {
  display: flex;
  padding: 24px 0;
  margin: 12px 0;

  &__meta {
    width: 160px;
    padding-right: 30px;
    p {
      font-size: 12px;
      color: #666;
    }
  }
  &__content {
    flex: 1;
  }

  &__stars {
    margin-bottom: 5px;
    &:after {
      content: '★';
      padding-left: 2px;
    }
  }
  &__category {
    font-size: 12px;
    color: #666;
  }
  &__name {
    font-size: 22px;
    margin-bottom: 8px;
  }
  &__desc {}
}
</style>
