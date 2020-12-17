<template>
  <div>
    <h2 class="subtitle">A te titkos kódod a következő:</h2>
<div class="box">
  <h1 class="title" style="color: red"><strong>{{key}}</strong></h1>
</div>
    <h2 class="subtitle">Kérjük jegyezd meg a kódod, ugyanis ennek ismeretében tudsz bejelentkezni, illetve később a csomagokat átvenni!</h2>
    <div>
      <b-button @click="backToLogin">Vissza a bejelentkezéshez</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Key",
  data: function (){
    return {
      key:""
    }
  },
  methods: {
    backToLogin(){
      this.$router.push("/login");
    }
  },
  mounted() {
    this.key = window.sessionStorage.getItem("key")
  }
}
</script>

<style scoped>

</style>