<template>
<div>
  <div class="cart__block">
    <CatalogRedirect v-if="products.length <= 0" />
    <ul class="cart__orders">
      <li class="cart__order" v-for="product in products" :key="product.productId">
        <h3>
          {{ product.product.title }}
          <span v-if="product.amount > 1">({{product.amount}} шт)</span>
        </h3>
        <b>{{ product.product.price * product.amount | numberFormat }} ₽</b>
        <span>Артикул: {{ product.productId }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>Итого товаров: <b>{{ products.length }}</b> на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
    </div>

    <button
    class="cart__button button button--primery"
    type="submit"
    :disabled="formLoading"
    style="position: relative;"
    v-if="products.length > 0"
    >
      <PreloaderComponent
      :preloader-size="40"
      :background-color="'#9eff00'"
      v-if="formLoading"
      />
      Оформить заказ
    </button>
  </div>
  <div class="cart__error form__error-block" v-if="formErrorMessage">
    <h4>Заявка не отправлена!</h4>
    <p>
      {{ formErrorMessage }}
    </p>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import PreloaderComponent from '@/components/PreloaderComponent.vue';
import CatalogRedirect from '@/components/CatalogRedirect.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  props: [
    'formErrorMessage',
    'formLoading',
  ],
  components: {
    PreloaderComponent,
    CatalogRedirect,
  },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
    }),
  },
};
</script>

<style lang="scss">
  .cart__block {
    margin-bottom: 20px;
  }

  .order__to-catalog {
    width: 100%;
    padding: 15px 0;
    margin-bottom: 15px;
    border: 1px solid transparent;
    font-size: 18px;
    font-weight: 600;
    background-color: #9eff00;
    cursor: pointer;
    transition-property: background-color, border-color, color;
    transition-duration: 200ms;
    transition-timing-function: ease;
  }

  .order__to-catalog:hover {
    color: #fff;
    background-color: transparent;
    border-color: #9eff00;
  }
</style>
