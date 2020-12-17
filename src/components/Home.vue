<template>
  <div class="box">
    <h1 class="title">Gyermekkarácsony 2020</h1>
    <h2 class="subtitle">Ajándékok</h2>
    <h3>Üdvözlünk:  <strong>{{name}}</strong></h3>
    <h3>A te időpontod: {{getTimestamp()}} </h3>
    <h3>A csomagok átvehetők: 2336 Dunavarsány Eötvös utca 70.</h3>
    <b-table
        :data="data"
        striped
        hoverable
        :loading="isLoading"
        mobile-cards>

      <b-table-column field="childName" centered label="Gyermek neve" v-slot="props">
        <b-input class="input-text-center" v-if="isEditRow(props.row)" v-model="actionRow.childName"/>
        <span v-else>{{ props.row.childName }}</span>
      </b-table-column>

      <b-table-column field="ageGroup" centered label="Korosztály" v-slot="props">
        <b-field v-if="isEditRow(props.row)">
          <b-select placeholder="Válasszon" v-model="actionRow.ageGroup" requried>
            <option
                v-for="item in Object.keys(stock)"
                :value="item"
                :key="item"
                :disabled="isOutOfStock(item)">
              {{getOptionString(item)}}
            </option>
          </b-select>
        </b-field>
        <span v-else>
        {{ ageGroupToString(props.row.ageGroup) }}
          </span>
      </b-table-column>

      <b-table-column field="date" label="Rögzítés dátuma"  centered v-slot="props">
            {{ new Date(props.row.bookingTime).toLocaleString() }}
      </b-table-column>

      <b-table-column field="id" class="mybutton" v-slot="props">
        <b-button v-if="!isActionMode(props.row)" icon-right="edit" @click="makeActionRow(props.row,'edit')"/>
        <b-button v-else-if="isActionMode(props.row)" :disabled="isDisabled" icon-right="check" @click="action"/>

        <b-button v-if="!isActionMode(props.row)" icon-right="trash" @click="makeActionRow(props.row,'remove')"/>
        <b-button v-else-if=" isActionMode(props.row)" icon-right="times" @click="exitAction"/>
      </b-table-column>


      <template slot="footer">
       <div class="level">
         <div class="level-left">
           <div class="level-item">
             <b-button icon-right="plus" @click="showModal=true">Hozzáadás</b-button>
           </div>
         </div>
         <div class="level-left">
           <div class="level-item">
             <b-button @click="logout" class="p-3">Kijelentkezés</b-button>
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
       <b-field label="Gyermek neve">
         <b-input class="input-text-center" v-model="childName" required/>
       </b-field>

       <b-field label="Korcsoport">
         <b-select placeholder="Válasszon" v-model="ageGroup" requried>
           <option
               v-for="item in Object.keys(stock)"
               :value="item"
               :key="item"
               :disabled="isOutOfStock(item)">
              {{getOptionString(item)}}
           </option>
         </b-select>
       </b-field>
       <b-button icon-right="save" :disabled="notSave"  @click="book">Mentés</b-button>
     </div>
    </template>
  </b-modal>

  </div>
</template>

<script>
export default {
  name: "Home",
  data :function (){
    return {
      data : [],
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
      name :"",
      actionMode:false,
      actionType:"",
      childName:"",
      ageGroup:"",
      showModal:false,
      isLoading : false,
      actionRow : {
        childName:"",
        ageGroup:""
      },
      prevObject:{},
      param :{
        type:""
      }
    }
  },
  mounted() {
    this.name = window.sessionStorage.getItem("username")
    this.refresh();
  },
  computed:{
    isDisabled:function (){

      return (this.actionRow.childName.length === 0) &&  this.actionType==="edit";
    },

    notSave:function (){
      if(this.ageGroup.length === 0){
        return true;
      }
      return (this.childName.length === 0
          || this.isOutOfStock(this.ageGroup))
    },
  },
  methods:{
    getTimestamp:function (){
      let timestamp = window.sessionStorage.getItem("timestamp")
     if(timestamp !== "undefined") {
       let date = new Date(timestamp);
       date.setHours(date.getHours()+1);
       return date.toLocaleString()
     }
     else
       return "Nincs"

    },
    updateStore:function(){
      this.$store.dispatch("presentApi",{type:"collect"}).then((response)=> {
        this.stock = response;
      })
    },
    isEditRow:function (row){
      return this.isActionMode(row) && this.actionType === "edit";
    },
    isActionMode:function (row){
      return this.actionRow === row && this.actionMode;
    },
    makeActionRow: function (row, actionType){
      this.actionMode = true;
      this.actionType = actionType;
      this.actionRow = row;
      switch (actionType){
        case "edit":
          this.prevObject = {
            childName:this.actionRow.childName,
            ageGroup : this.actionRow.ageGroup
          }
          break
        case "remove":
          break
      }

    },
    exitAction: function (){

      switch (this.actionType){
        case "edit":
          this.actionRow.childName = this.prevObject.childName
          this.actionRow.ageGroup = this.prevObject.ageGroup
          break;
        case "remove":
          break;
      }
      console.log(this.actionRow)
      this.actionMode = false;
    },
    action: function (){
      switch (this.actionType){
        case "edit":
          this.update()
          break;
        case "remove":
          this.remove()
          break;
      }
      this.actionMode = false;
    },
    update:function (){
      let param = {
        type:"update",
        data:this.actionRow
      }
      this.$store.dispatch("presentApi",param).then((response) =>{
        this.data = response;
        this.refresh()
      })
    },
    remove:function (){
      console.log("remove")
      let param = {
        type:"remove",
        data:this.actionRow
      }
      this.$store.dispatch("presentApi",param).then(() => this.refresh())
    },
    book:function() {
      let presents=[]
      presents.push(
          {
            childName: this.childName,
            ageGroup:this.ageGroup
          }
      )
      this.$store.dispatch("presentApi",{
        type:"book",
        data:{
          secretKey:window.sessionStorage.getItem("key"),
          presents:presents
        }
      }).then(()=> {
        this.showModal = false
            this.refresh()
          }
      )

    },
    isOutOfStock(item){
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
    refresh(){
      let param = {
        type:"find",
        key:window.sessionStorage.getItem("key")
      }
      this.$store.dispatch("presentApi",param).then((data)=>{
        this.data = data;
        this.updateStore();

      })
    },
    logout:function (){
      window.sessionStorage.clear();
      this.$store.commit("setLoggedIn",false);
      this.$store.commit("setAdmin","");
      this.$store.commit("setUsername","");
      this.$router.push("/login")
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
  }
}
</script>

<style>
.input-text-center input {
  text-align: center;
}
</style>