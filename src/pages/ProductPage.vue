<template>
<div style="position: relative;">
  <PreloaderComponent v-if="productLoading" />
  <div v-if="productLoadingFailed" style="padding: 250px 0;">
    Loading failed, please try again later
    <button @click.prevent="loadProduct">Refresh</button>
  </div>
  <main class="content container" v-if="productData">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
          width="570"
          height="570"
          :src="product.image.file.url"
          :alt="product.title"
          >
        </div>
        <!-- <ul class="pics__list">
          <li class="pics__item" v-for="image in product.images" :key="image">
            <a href="" class="pics__link pics__link--current">
              <img
              width="98"
              height="98"
              :src="image"
              :alt="product.title"
              >
            </a>
          </li>
        </ul> -->
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item" v-for="color in product.colors" :key="color.id">
                  <label class="colors__label">
                    <input
                    class="colors__radio sr-only"
                    type="radio"
                    name="color-item"
                    :value="color.id"
                    v-model="currentColorId"
                    >
                    <span class="colors__value" :style="`background-color: ${color.code}`">
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <!-- <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="128" checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset> -->

            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар" @click.prevent="decrement">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model.number="productAmount">

                <button type="button" aria-label="Добавить один товар" @click.prevent="increment">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button
              class="button button--primery"
              type="submit"
              :disabled="productPushing"
              style="position: relative;"
              >
                <PreloaderComponent :preloader-size="40" :background-color="'#9eff00'" v-if="productPushing" />
                В корзину
              </button>

              <div style="grid-column: 2; color: #9eff00;" v-if="productAdded">
                Товар успешно добавлен в корзину
              </div>
              <div style="grid-column: 2; color: #ff8b80;" v-if="productAddFail">
                Произошла ошибка при добавлении товара в корзину
              </div>

            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои
            велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS
            синхронизируется с датчиками по ANT+, объединяя полученную с них информацию.
            Данные отображаются на дисплее, а также сохраняются на смартфоне.
            При этом на мобильное устройство можно установить как фирменное приложение,
            так и различные приложения сторонних разработчиков. Велокомпьютер точно
            отслеживает местоположение, принимая сигнал с целого комплекса спутников.
            Эта информация позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный.
            Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм.
            что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика.
            На обращенной к пользователю стороне расположен дисплей диагональю 56 мм.
            На дисплей выводятся координаты и скорость, а также полученная со смартфона
            и синхронизированных датчиков информация: интенсивность, скорость вращения
            педалей, пульс и т.д. (датчики не входят в комплект поставки).
            Корпус велокомпьютера имеет степень защиты от влаги IPX7.
            Это означает, что устройство не боится пыли, а также выдерживает
            кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';
import numberFormat from '@/helpers/numberFormat';
import API_BASE_URL from '@/config';
import PreloaderComponent from '@/components/PreloaderComponent.vue';

export default {
  components: {
    PreloaderComponent,
  },
  data() {
    return {
      productAmount: 1,
      currentColorId: 0,
      productData: null,

      productLoading: false,
      productLoadingFailed: false,

      productAdded: false,
      productPushing: false,
      productAddFail: false,
    };
  },
  filters: {
    numberFormat,
  },
  methods: {
    ...mapActions({
      addProductToCart: 'addProductToCart',
    }),

    addToCart() {
      this.productAdded = false;
      this.productPushing = true;
      this.productAddFail = false;

      this.addProductToCart({ productId: this.product.id, amount: this.productAmount })
        .then((res) => {
          if (res === 200) {
            this.productAdded = true;
            this.productAddFail = false;
          }
        })
        .catch(() => {
          this.productAddFail = true;
          this.productAdded = false;
        })
        .finally(() => {
          this.productPushing = false;
        });
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;

      axios.get(`${API_BASE_URL}/api/products/${+this.$route.params.id}`)
        .then((res) => {
          this.productData = res.data;
          this.currentColorId = res.data.colors[0].id;
        })
        .catch(() => {
          this.productLoadingFailed = true;
          this.$router.push({ name: 'notFound' });
        })
        .finally(() => { this.productLoading = false; });
    },
    increment() {
      if (this.productAmount > 0) {
        this.productAmount += 1;
      } else {
        this.productAmount = 1;
      }
    },
    decrement() {
      if (this.productAmount !== 1) {
        if (this.productAmount <= 0) {
          this.productAmount = 1;
        } else {
          this.productAmount -= 1;
        }
      }
    },
  },
  computed: {
    product() {
      return this.productData;
    },
    category() {
      return this.productData.category;
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>
