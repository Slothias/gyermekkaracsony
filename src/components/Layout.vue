<template>
  <div class="hero is-fullheight is-light">
    <div class="hero-body">
      <div class="container has-text-centered">
        <router-view></router-view>
      </div>
    </div>
    <footer class="has-text-centered p-2">
      <h1>
        <strong>Probléma esetén hívja a +36 20 886 1802 telefonszámot!</strong>
      </h1>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Layout",
  computed: {
    isLoggedIn: function (){
      return this.$store.getters.isLoggedIn;
    }
  },
}
</script>

<style scoped>

</style>