import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],

    userAccessKey: null,

    cartProductsData: [],
  },
  mutations: {
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((product) => product.productId === productId);
      let productAmount = amount;

      if (productAmount <= 0 || typeof productAmount !== 'number') {
        productAmount = 1;
      }

      if (item) {
        item.amount = productAmount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((product) => product.productId !== productId);
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: +item.product.id,
        amount: +item.quantity,
      }));
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find((prod) => prod.product.id === item.productId);

        return {
          ...item,
          product,
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (
        (item.product.price * item.amount) + acc
      ), 0);
    },
  },
  actions: {
    loadCart(context) {
      return axios.get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((res) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('UAK', res.data.user.accessKey);
            context.commit('updateUserAccessKey', res.data.user.accessKey);
          }

          context.commit('updateCartProductsData', res.data.items);
          context.commit('syncCartProducts');
        });
    },
    addProductToCart(context, { productId, amount }) {
      return axios.post(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((res) => {
          context.commit('updateCartProductsData', res.data.items);
          context.commit('syncCartProducts');
          return res.status;
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      clearTimeout(this.updateTimer);

      context.commit('updateCartProductAmount', { productId, amount });

      return (new Promise((resolve) => {
        this.updateTimer = setTimeout(resolve, 300);
      }))
        .then(() => {
          if (amount < 1) {
            return false;
          }

          return axios.put(`${API_BASE_URL}/api/baskets/products`, {
            productId,
            quantity: amount,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
            .then((res) => {
              context.commit('updateCartProductsData', res.data.items);
              return res.status;
            })
            .catch(() => {
              context.commit('syncCartProducts');
            });
        });
    },
    deleteCartProduct(context, productId) {
      clearTimeout(this.updateTimer);

      context.commit('deleteCartProduct', productId);

      return (new Promise((resolve) => {
        this.updateTimer = setTimeout(resolve, 2000);
      }))
        .then(() => {
          return axios.delete(`${API_BASE_URL}/api/baskets/products`, {
            data: {
              productId,
            },
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
            .then((res) => {
              context.commit('updateCartProductsData', res.data.items);
              return res.status;
            })
            .catch(() => {
              context.commit('syncCartProducts');
              return new Error(500).message;
            });
        });
    },
  },
});
