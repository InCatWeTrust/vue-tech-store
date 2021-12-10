<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">

      <ProductFilter
      :price-from.sync="filterPriceFrom"
      :price-to.sync="filterPriceTo"
      :category-id.sync="filterCategoryId"
      :color-id.sync="filterColorId"
      :page.sync="page"
      :isLoading="productsLoading"
      />

      <section class="catalog" style="position: relative;">
        <PreloaderComponent :preloader-size="60" v-if="productsLoading" />
        <div v-if="productsLoadingFailed">
          Loading failed, please try again later
          <button @click.prevent="loadProducts">Refresh</button>
        </div>
        <ProductList :products="products" />
        <BasePagination v-model="page" :count="countProducts" :per-page="productPerPage" />
      </section>

    </div>
  </main>
</template>

<script>
import axios from 'axios';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import PreloaderComponent from '@/components/PreloaderComponent.vue';
import API_BASE_URL from '@/config';

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
    PreloaderComponent,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      page: 1,
      productPerPage: 3,

      productsData: null,

      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData ? this.productsData.items : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;

      clearTimeout(this.loadProductsTimer);

      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productPerPage,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            categoryId: this.filterCategoryId,
            colorId: this.filterColorId,
          },
        })
          .then((res) => { this.productsData = res.data; })
          .catch(() => { this.productsLoadingFailed = true; })
          .finally(() => { this.productsLoading = false; });
      }, 0);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
