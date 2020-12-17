<template>
<div>
          <h1 class="title">Gyermekkarácsony 2020</h1>
          <h2 class="subtitle">Bejelentkezés</h2>
          <b-field position="is-centered" label="Kód">
            <b-input
                class="input-text-center"
                v-model="secretKey"
                validation-message="Érvénytelen formátum!"
                pattern="[0-9]+"
            ></b-input>
          </b-field>
          <div class="has-text-centered">
            <b-button type="is-info" @keypress.enter="login" @click="login" :disabled="isEmptyOrNotValid" icon-right="sign-in-alt">Bejelentkezés
            </b-button>
          </div>
          <div class="hero-foot p-6">
            <b-button  @click="()=>this.$router.push('/register')" type="is-primary">Regisztráció</b-button>
          </div>
        </div>

</template>

<script>
export default {
  name: "Login",
  computed: {
    isEmptyOrNotValid: function () {
      return !this.isValid() || this.secretKey.length !== 4;
    }
  },
  methods: {
    isValid() {
      let exp = "^[0-9]+$";
      let REG = RegExp(exp);
      let x = REG.test(this.secretKey);
      return x;
    },
    login() {
      this.$store.dispatch("userApi", {
        type: "login",
        key: this.secretKey
      }).then(response => {
        window.sessionStorage.setItem("username", response.name);
        window.sessionStorage.setItem("admin", response.admin);
        window.sessionStorage.setItem("loggedIn", "true");
        window.sessionStorage.setItem("key",response.secretKey)
        window.sessionStorage.setItem("timestamp",response.timestamp)
        this.$store.commit("setUsername", response.name);
        this.$store.commit("setAdmin", response.admin);
        this.$store.commit("setLoggedIn", true);
        if(response.admin === true){
          console.log("ADMIN: "+response.admin)
          this.$router.push("/admin")
        }else {
          this.$router.push("/dashboard")
        }
      }).catch(() => {
        this.toast("Hiba lépett fel!", 'is-danger');
      });
    },
    toast(message, type) {
      this.$buefy.toast.open({
        message: message,
        type: type
      })
    },

  },
  data: function () {
    return {
      secretKey: ""
    }
  }
}
</script>
<style>
.input-text-center input {
  text-align: center;
}
</style>