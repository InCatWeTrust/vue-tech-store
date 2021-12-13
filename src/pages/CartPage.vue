<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        Товаров в корзине: {{ products.length }}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.productId" :item="item" />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <CatalogRedirect v-if="products.length <= 0" />

          <router-link
          tag="button"
          :to="{name: 'order'}"
          class="cart__button button button--primery"
          type="submit"
          style="position: relative;"
          :disabled="updatingProductAmount"
          v-if="products.length > 0"
          >
            <PreloaderComponent
            v-if="updatingProductAmount || deletingProductLoad"
            :preloader-size="30"
            :background-color="'#9eff00'"
            />
            Оформить заказ
          </router-link>

          <div v-if="deletingProductFail" style="padding: 10px 0; color: orangered">
            Не удалось удалить товар
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem.vue';
import CatalogRedirect from '@/components/CatalogRedirect.vue';
import numberFormat from '@/helpers/numberFormat';
import PreloaderComponent from '@/components/PreloaderComponent.vue';
import eventBus from '@/eventBus';

export default {
  components: {
    CartItem,
    PreloaderComponent,
    CatalogRedirect,
  },
  data() {
    return {
      updatingProductAmount: false,
      deletingProductLoad: false,
      deletingProductFail: false,
    };
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
  created() {
    eventBus.$on('updatingItemAmount', (isUpdating) => { this.updatingProductAmount = isUpdating; });
    eventBus.$on('deletingProduct', (isDeleting) => { this.deletingProductLoad = isDeleting; });
    eventBus.$on('deletingProductFail', (isFail) => { this.deletingProductFail = isFail; });
  },
};
</script>

<style lang="scss">
.cart__button:disabled {
  opacity: 1;
}
</style>
