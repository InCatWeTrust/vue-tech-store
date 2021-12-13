<template>
  <div style="position: relative;">
    <div
    style="text-align: center; margin-bottom: 10px; font-weight: 500"
    >
      В корзине пока нет ни одного товара
    </div>
    <router-link
    tag="button"
    :to="{name: 'main'}"
    class="order__to-catalog"
    >
      Перейти в каталог
    </router-link>
  </div>
</template>

<script>
export default {

};
</script>
