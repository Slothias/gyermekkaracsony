<template>
  <div>
    <h1 class="title">Gyermekkarácsony 2020</h1>
    <h2 class="subtitle">Regisztráció</h2>
  <div class="box input-text-center">
    <b-field label="Név" >
      <b-input placeholder="Hagyom Ányos" v-model="name" required />
    </b-field>
    <b-field  label="Email" >
      <b-input placeholder="tudomanyos@dinamo.com" v-model="email" />
    </b-field>
    <b-field label="Mobilszám" >
      <b-input placeholder="36209998888" v-model="phoneNumber" />
    </b-field>
  </div>
    <div class=" p-6">
      <b-button :disabled="isValid" @click="register" type="is-primary">Regisztráció</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  computed:{
    isValid() {
      return !this.validEmail() || !this.validPhone() || this.name.length === 0;
    }
  },
  methods:{
    validEmail(){
      if(this.email.length===0){
        return false;
      }
      let pattern = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9]+.[A-Za-z]+$"
      let Reg = RegExp(pattern)
      return Reg.test(this.email);
    },
    validPhone(){
      if(this.phoneNumber.length!==11){
        return false;
      }
      let pattern = "^[0-9]+$"
      let Reg = RegExp(pattern)
      return Reg.test(this.phoneNumber);
    },
    toast(message, type) {
      this.$buefy.toast.open({
        message: message,
        type: type
      })
    },
    register(){
      let param = {
        type : "register",
        data: {
          name: this.name,
          email: this.email,
          phoneNumber:this.phoneNumber
        }

      }
      this.$store.dispatch("userApi",param).then((response)=>{
        window.sessionStorage.setItem("username", response.name);
        window.sessionStorage.setItem("admin", false);
        window.sessionStorage.setItem("loggedIn", "false");
        window.sessionStorage.setItem("key",response.secretKey)
        this.$store.commit("setUsername", response.name);
        this.$store.commit("setAdmin", response.admin);
        this.$store.commit("setLoggedIn", false);
        this.$router.push("/key");
      }).catch((reason) =>{
        console.log(reason)
        this.toast("Hiba történt","is-danger")
      }
      )
    }
  },
  data : function() {
    return {
      email:"",
      phoneNumber:"",
      name:""

    }
  }
}
</script>

<style>
.input-text-center input {
  text-align: center;
}
</style>