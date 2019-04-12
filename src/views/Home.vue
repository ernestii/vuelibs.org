<template>
  <div class="home">
    <!-- Search -->
    <input
      class="search"
      v-model="opts.search"
      placeholder="Search here..."
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
    />

    <!-- Sort -->
    <div class="sort">
      <label>Sort by</label>
      <a
        v-for="(name, sortby) of sortOptions"
        :key="sortby"
        href="#"
        @click.prevent="opts.sortby = sortby"
        :class="{ 'active': opts.sortby === sortby  }"
      >
        {{ name }}
      </a>
    </div>
    <div v-if="!loading && count === 0">
      Nothing found 😞
    </div>
    <div v-if="!loading && error">
      Error occured 😞
    </div>
    <template
      v-for="(item, idx) of items"
    >
      <div v-if="idx % 20 === 0" class="divider" :key="`divider-${item._id}`">
        Results {{ idx }}—{{ min([idx + 20, count]) }} of {{ count }}
      </div>
      <ComponentItem
        :data="item"
        :key="item._id"
      />
    </template>
    
    <a href="#" class="loadmore" @click.prevent="more" v-if="count > 20 + opts.skip">Load more</a>
  </div>
</template>

<script>
import axios from 'axios';
import { debounce } from 'debounce';
import ComponentItem from '@/components/ComponentItem.vue'

const e = encodeURIComponent;

const apiUrl = 'http://localhost:3000';
const api = (opt) => `${location.port === '8080' ? apiUrl : ''}/api?search=${e(opt.search)}&category=${e(opt.category)}&subcategory=${e(opt.subcategory)}&query=${e(opt.query)}limit=${opt.limit}&skip=${opt.skip}&sortby=${opt.sortby}&${opt.asc && 'asc'}`;

const LIMIT = 20;

export default {
  name: 'home',
  components: {
    ComponentItem
  },
  data() {
    return {
      items: [],
      loading: true,
      error: false,
      sortOptions: {
        'stats.stars': 'Stars',
        'stats.updated': 'Updated',
        'stats.issues': 'Issues',
        'stats.created': 'Created'
      },
      count: 0,
      opts: {
        category: '',
        subcategory: '',
        search: '',
        asc: false,
        query: '',
        sortby: 'stats.stars',
        limit: LIMIT,
        skip: 0,
      },
    }
  },
  methods: {
    load: debounce(async function() {
      this.loading = true;
      this.error = false;
      try {
        const result = await axios.get(api(this.opts));
        if (this.opts.skip > 0) {
          this.items = [...this.items, ...result.data.items];
        } else {
          this.items = result.data.items;
        }
        this.count = result.data.count;
      } catch(e) {
        console.error(e);
        this.error = true;
      } finally {
        this.loading = false;
      }
    }),
    more() {
      this.opts.skip += LIMIT;
    },
    min(arr) {
      return Math.min(...arr);
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        this.opts.category = to.params.category || '';
        this.opts.subcategory = to.params.subcategory || '';
        this.opts.skip = 0;
        this.opts.search = '';
      },
      immediate: true,
    },
    'opts.search': {
      handler(val) {
        this.opts.asc = false;
        // this.opts.sortby = 'stats.stars';
        this.opts.limit = LIMIT;
        this.opts.skip = 0;
      }
    },
    opts: {
      immediate: true,
      deep: true,
      handler(val, oldVal = {}) {
        this.load();
        if (val.category != '' && val.subcategory != '') {
          document.title = `${val.subcategory} / ${val.category} – Vue.js libraries and components`;
        } else if (val.category != '') {
          document.title = `${val.category} – Vue.js libraries and components`;
        } else if (val.subcategory != '') {
          document.title = `${val.subcategory} – Vue.js libraries and components`;
        } else {
          document.title = 'VueLibs.org – Vue.js libraries and components';
        }
      },
    }
  }
}
</script>
<style lang="scss">
.home {
  padding: 32px;
  flex: 1;

  .search {
    display: block;
    font-family: 'Francois One', Helvetica, Arial, sans-serif;
    border: 0;
    border-bottom: 1px solid #eee;
    width: 100%;
    padding: 8px 0;
    font-size: 22px;
    &:focus {
      outline: none;
      border-bottom-color: #42B883;
    }
  }

  .divider {
    font-size: 12px;
    color: #666;
  }

  .sort {
    padding: 8px 0 6px;
    margin-top: 8px;
    border-bottom: 1px solid #eee;
    margin-bottom: 24px;

    label {
      color: #999;
    }
    a {
      color: #999;
      padding: 0 8px;
      &:hover {
        color: #42B883;
      }
      &.active {
        color: black;
        font-weight: bold;
      }
    }
  }

  .loadmore {
    display: block;
    background-color: #f9f9f9;
    padding: 8px;
    text-align: center;
    border-radius: 2px;
  }
}
</style>
