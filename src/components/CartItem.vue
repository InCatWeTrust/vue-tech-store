<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
      :src="item.product.image.file.url"
      width="120"
      height="120"
      :alt="item.product.title"
      >
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
      Артикул: {{ item.productId }}
    </span>

    <CartCounter :is-class="true" :item-amount="item.amount" :id="item.productId" />

    <b class="product__price">
      {{ (item.product.price * item.amount) | numberFormat }} ₽
    </b>

    <button
    class="product__del button-del"
    type="button"
    aria-label="Удалить товар из корзины"
    @click.prevent="deleteProduct(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapActions } from 'vuex';
import CartCounter from '@/components/CartCounter.vue';
import numberFormat from '@/helpers/numberFormat';
import eventBus from '@/eventBus';

export default {
  name: 'CartItem',
  components: {
    CartCounter,
  },
  props: [
    'item',
  ],
  filters: {
    numberFormat,
  },
  methods: {
    ...mapActions({
      deleteCartProduct: 'deleteCartProduct',
    }),

    deleteProduct(productId) {
      this.deletingFail(false);

      this.deleteCartProduct(productId)
        .then((res) => {
          if (res === '500') {
            this.deletingFail(true);
          }
        })
        .finally(() => {
          this.deletingProduct(false);
        });
      this.deletingProduct(true);
    },

    deletingProduct(isDeleting) {
      eventBus.$emit('deletingProduct', isDeleting);
    },
    deletingFail(isFail) {
      eventBus.$emit('deletingProductFail', isFail);
    },
  },
};
</script>
