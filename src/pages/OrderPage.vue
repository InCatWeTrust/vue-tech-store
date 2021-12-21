<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="index.html" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="cart.html" :to="{name: 'cart'}">
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
        Корзина
      </h1>
      <span class="content__info">
        Товаров в заказе: {{ totalProductsAmount }}
      </span>
    </div>

    <section class="cart">
      <form
      class="cart__form form"
      action="#"
      method="POST"
      @submit.prevent="order"
      >
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText
            title="ФИО"
            placeholder="Введите ваше полное имя"
            v-model="formData.name"
            :error="formError.name"
            />

            <BaseFormText
            title="Адрес доставки"
            placeholder="Введите ваш адрес"
            v-model="formData.address"
            :error="formError.address"
            />

            <BaseFormText
            title="Телефон"
            placeholder="Введите ваш телефон"
            v-model="formData.phone"
            :error="formError.phone"
            type="tel"
            />

            <BaseFormText
            title="Email"
            placeholder="Введи ваш Email"
            v-model="formData.email"
            :error="formError.email"
            />

            <BaseFormTextarea
            title="Комментарии к заказу"
            placeholder="Ваши пожелания"
            v-model="formData.comment"
            :error="formError.comment"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <OrderCartBlock :form-loading="formLoading" :form-error-message="formErrorMessage" />
      </form>
    </section>
  </main>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import axios from 'axios';
import OrderCartBlock from '@/components/OrderCartBlock.vue';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import API_BASE_URL from '@/config';

export default {
  name: 'Order',
  components: {
    OrderCartBlock,
    BaseFormText,
    BaseFormTextarea,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      formLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      totalAmount: 'cartTotalAmount',
    }),

    totalProductsAmount() {
      return this.totalAmount;
    },
  },
  methods: {
    ...mapMutations({
      resetCart: 'resetCart',
      updateOrderInfo: 'updateOrderInfo',
    }),

    order() {
      this.formLoading = true;
      this.formError = {};
      this.formErrorMessage = '';

      (new Promise((resolve) => {
        setTimeout(resolve, 1000);
      }))
        .then(() => {
          axios.post(`${API_BASE_URL}/api/orders`, {
            ...this.formData,
          }, {
            params: {
              userAccessKey: this.$store.state.userAccessKey,
            },
          })
            .then((response) => {
              this.resetCart();
              this.updateOrderInfo(response.data);
              this.formData = {};
              this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
            })
            .catch((err) => {
              this.formError = err.response.data.error.request || {};
              this.formErrorMessage = err.response.data.error.message;
            })
            .finally(() => {
              this.formLoading = false;
            });
        });
    },
  },
};
</script>
