<template>
  <main class="content container" style="position: relative;">
    <div
    v-if="orderLoadFail"
    style="text-align: center; padding: 200px 0; font-size: 48px; front-weight: 500;"
    >
      Заказ не найден
      <br>
      <router-link
      tag="button"
      :to="{name: 'main'}"
      >
        Перейти в каталог
      </router-link>
    </div>
    <PreloaderComponent v-if="orderDataLoading" />
    <div v-if="!orderLoadFail">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link :to="{name: 'main'}" class="breadcrumbs__link" href="index.html">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link :to="{name: 'cart'}" class="breadcrumbs__link" href="cart.html">
              Корзина
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              Оформление заказа
            </a>
          </li>
        </ul>

        <h1 class="content__title">
          Заказ оформлен <span>№ {{order.id}}</span>
        </h1>
      </div>

      <section class="cart">
        <form class="cart__form form" action="#" method="POST">
          <div class="cart__field">
            <p class="cart__message">
              Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
              Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
            </p>

            <ul class="dictionary">
              <li class="dictionary__item">
                <span class="dictionary__key">
                  Получатель
                </span>
                <span class="dictionary__value">
                  {{ order.name }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key">
                  Адрес доставки
                </span>
                <span class="dictionary__value">
                  {{ order.address }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key">
                  Телефон
                </span>
                <span class="dictionary__value">
                  {{ order.phone }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key">
                  Email
                </span>
                <span class="dictionary__value">
                  {{ order.email }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key">
                  Способ оплаты
                </span>
                <span class="dictionary__value">
                  картой при получении
                </span>
              </li>
            </ul>
          </div>

          <div class="cart__block">
            <ul class="cart__orders">
              <li class="cart__order" v-for="item in products" :key="item.product.id">
                <h3>
                  {{ item.product.title }}
                  <span v-if="item.quantity > 1">({{ item.quantity }} шт)</span>
                </h3>
                <b>{{ item.product.price * item.quantity | numberFormat }} ₽</b>
                <span>Артикул: {{ item.product.id }}</span>
              </li>
            </ul>

            <div class="cart__total">
              <p>Доставка: <b>500 ₽</b></p>
              <p>Итого товаров: <b>{{ products.length }}</b> на сумму <b>{{ order.totalPrice | numberFormat }} ₽</b></p>
            </div>
          </div>
        </form>
      </section>
    </div>
  </main>
</template>

<script>
import PreloaderComponent from '@/components/PreloaderComponent.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      orderData: {},

      orderDataLoading: false,
      orderLoadFail: false,
    };
  },
  components: {
    PreloaderComponent,
  },
  filters: {
    numberFormat,
  },
  computed: {
    order() {
      return this.$store.state.orderInfo ? this.$store.state.orderInfo : {};
    },
    products() {
      return this.$store.state.orderInfo ? this.$store.state.orderInfo.basket.items : [];
    },
  },
  methods: {
    loadOrder() {
      if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
        return;
      }

      this.orderDataLoading = true;
      this.orderLoadFail = false;

      this.$store.dispatch('loadOrderInfo', this.$route.params.id)
        .catch(() => {
          this.orderLoadFail = true;
        })
        .finally(() => {
          this.orderDataLoading = false;
        });
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadOrder();
      },
      immediate: true,
    },
  },
};
</script>
