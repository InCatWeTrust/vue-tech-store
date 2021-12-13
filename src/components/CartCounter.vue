<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click.prevent="decrement">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="amount">

    <button type="button" aria-label="Добавить один товар" @click.prevent="increment">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import eventBus from '@/eventBus';

export default {
  name: 'Counter',
  props: [
    'itemAmount',
    'id',
  ],
  methods: {
    ...mapActions([
      'updateCartProductAmount',
    ]),

    increment() {
      this.updateCartProductAmount({ productId: this.id, amount: this.itemAmount + 1 })
        .finally(() => {
          this.updatingItemAmount(false);
        });
      this.updatingItemAmount(true);
    },
    decrement() {
      if (this.itemAmount !== 1) {
        this.updateCartProductAmount({ productId: this.id, amount: this.itemAmount - 1 })
          .finally(() => {
            this.updatingItemAmount(false);
          });
        this.updatingItemAmount(true);
      }
    },
    updatingItemAmount(isUpdating) {
      eventBus.$emit('updatingItemAmount', isUpdating);
    },
  },
  computed: {
    amount: {
      get() {
        return this.itemAmount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', { productId: this.id, amount: value })
          .finally(() => {
            this.updatingItemAmount(false);
          });
        this.updatingItemAmount(true);
      },
    },
  },
};
</script>
