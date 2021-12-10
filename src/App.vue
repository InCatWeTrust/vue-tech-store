<template>
  <div>
    <HeaderComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  components: {
    HeaderComponent,
    FooterComponent,
  },
  methods: {
    ...mapActions({
      loadCart: 'loadCart',
    }),
    ...mapMutations({
      updateKey: 'updateUserAccessKey',
    }),
  },
  created() {
    const userAccessKey = localStorage.getItem('UAK');
    if (userAccessKey) {
      this.updateKey(userAccessKey);
    }

    this.loadCart();
  },
};
</script>
