<template>
  <div class="box">
    <h1 class="title">Gyermekkarácsony 2020</h1>
    <h2 class="subtitle">Admin</h2>
    <b-table
        :data="data"
        detailed
        detail-key="userName"
        striped
        hoverable
        mobile-cards>

      <b-table-column field="secretKey" centered label="Titkos kód" v-slot="props">
        {{ props.row.secretKey }}
      </b-table-column>

      <b-table-column field="userName" centered label="Név" v-slot="props">
        {{ props.row.userName }}
      </b-table-column>

      <b-table-column field="email" centered label="Email" v-slot="props">
        {{ props.row.email }}
      </b-table-column>

      <b-table-column field="phoneNumber" centered label="Telefonszám" v-slot="props">
        {{ props.row.phoneNumber }}
      </b-table-column>

      <b-table-column field="timestamp" centered label="Időpont" v-slot="props">
        {{ new Date(props.row.timestamp).toLocaleString() }}
      </b-table-column>

      <template slot="detail" slot-scope="props">
        <div class="content">
              <div class="columns" v-for="item in props.row.presents" :key="item.childName">
                <div class="column">
                  <strong>{{item.childName}}</strong>
                </div>
                <div class="column">
                  <strong> {{ageGroupToString(item.ageGroup)}}</strong>
                </div>
              </div>
            </div>
      </template>

      <template slot="footer">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <b-button icon-right="plus" @click="showModal=true">Hozzáadás</b-button>
            </div>
          </div>
        </div>
      </template>

    </b-table>

    <b-modal
        v-model="showModal"
        :destroy-on-hide="false">
      <template>
        <div class="box">

          <b-field label="Szülő">
            <b-select placeholder="Válasszon" v-model="param.currentId" requried>
              <option
                  v-for="item in Object.keys(data)"
                  :key="item"
                  :value="(Object.values(data)[item]).id">
                {{ Object.values(data)[item].userName}}
              </option>
            </b-select>
          </b-field>

          <b-field label="Gyermek neve">
            <b-input class="input-text-center" v-model="param.childName" required/>
          </b-field>

          <b-field label="Korcsoport">
            <b-select placeholder="Válasszon" v-model="param.ageGroup" requried>
              <option
                  v-for="item in Object.keys(stock)"
                  :value="item"
                  :key="item"
                  :disabled="isOutOfStock(item)">
                {{ getOptionString(item) }}
              </option>
            </b-select>
          </b-field>
          <b-button icon-right="save" :disabled="notSave" @click="book">Mentés</b-button>
        </div>
      </template>
    </b-modal>

  </div>
</template>

<script>
export default {
  name: "Admin",
  data: function () {
    return {
      data: [],
      stock:{
        "B3": 0,
        "B6": 0,
        "B8": 0,
        "B11": 0,
        "G3": 0,
        "G6": 0,
        "G8": 0,
        "G11": 0
      },
      param: {
        currentParent: "",
        currentId:"",
        childName: "",
        ageGroup: "",
        email:"",
        phoneNumber:""
      },
      showModal:false

    }
  },
  computed:{
    notSave: function (){
      return this.isOutOfStock(this.param.ageGroup)
          || this.param.childName.length === 0
          || this.param.currentId === ""
    }
  },
  methods:{
    isOutOfStock(item){
      if(item.length===0){
        return true
      }
      let value = Object.values(this.stock)[Object.keys(this.stock).indexOf(item)];
      return value === 0
    },
    getOptionString(item){
      let message = this.ageGroupToString(item)
      let value = Object.values(this.stock)[Object.keys(this.stock).indexOf(item)];
      if(value === 0){
        value = "elfogyott"
      }
      else
        value=value+" db van hátra"

      return message.concat(" (").concat(value).concat(")");
    },
    updateStore:function(){
      this.$store.dispatch("presentApi",{type:"collect"}).then((response)=> {
        this.stock = response;
      })
    },
    book:function() {
      let presents=[]
      presents.push(
          {
            childName: this.param.childName,
            ageGroup:this.param.ageGroup
          }
      )
      this.$store.dispatch("presentApi",{
        type:"bookAdmin",
        data:{
          id:this.param.currentId,
          presents:presents
        }
      }).then(()=>{
          this.showModal = false
          this.refresh()}
      )

    },
  refresh(){
      let param = {
        type:"admin"
      }
    this.$store.dispatch("presentApi",param).then((data)=>{
      this.data = data;
      this.updateStore();
    })
  },
    ageGroupToString(ageGroup){
      switch (ageGroup){
        case "B3":
          return "3-5 éves fiú"
        case "G3":
          return "3-5 éves lány"
        case "B6":
          return "6-7 éves fiú"
        case "G6":
          return "6-7 éves lány"
        case "B8":
          return "8-10 éves fiú"
        case "G8":
          return "8-10 éves lány"
        case "B11":
          return "11-12 éves fiú"
        case "G11":
          return "11-12 éves lány"
      }
    },
  },
  mounted() {
      this.refresh();
  }
}
</script>

<style>
.input-text-center input {
  text-align: center;
}
</style>