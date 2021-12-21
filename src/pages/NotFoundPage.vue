<template>
  <div
  class="page-not-found"
  style="padding: 300px 50px; text-align: center; font-size: 70px; color: #3eaf7c; text-shadow: 3px 3px #767676;"
  >
    Страница не найдена
    <router-link
      :to="{ name: 'main' }"
      style="display: block; font-size: 30px; text-shadow: none;"
    >
      Перейти в каталог ->
    </router-link>
  </div>
</template>

<script>
export default {

};
</script>
