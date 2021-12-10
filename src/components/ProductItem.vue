<template>
    <li class="catalog__item">
      <router-link
      class="catalog__pic"
      href="#"
      :to="{name: 'product', params: {id: product.id}}"
      >
        <img :src="product.image.file.url" :alt="product.title">
      </router-link>

      <h3 class="catalog__title">
        <router-link
        href="#"
        :to="{name: 'product', params: {id: product.id}}"
        >
          {{ product.title }}
        </router-link>
      </h3>

      <span class="catalog__price">
        {{ product.price | numberFormat }} ₽
      </span>

      <ul class="colors colors--black">
        <li class="colors__item" v-for="color in colors" :key="color.id">
          <label class="colors__label">
            <input
            class="colors__radio sr-only"
            type="radio"
            :value="color.code"
            v-model="currentColor"
            >
            <span class="colors__value" :style="`background-color: ${color.code}`">
            </span>
          </label>
        </li>
      </ul>
    </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'ProductItem',
  props: [
    'product',
  ],
  data() {
    return {
      currentColor: this.product.colors[0].code,
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    colors() {
      return this.product.colors;
    },
  },
};
</script>
