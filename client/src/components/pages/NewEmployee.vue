<template>
  <v-app class="grey">
    <v-layout column>
     <v-flex xs6>
      <div class="container white elevation-3 form">
      <br>
        <h2>Add New Employee</h2><br><br>
        <v-text-field type="text" name="name" v-model="name" placeholder="Name" outlined solo-inverted></v-text-field><br>
        <v-text-field type="text" name="surname" v-model="surname" placeholder="Surname" outlined solo-inverted></v-text-field><br/>
        <v-text-field type="email" name="email" v-model="email" placeholder="Email" outlined solo-inverted></v-text-field><br>
        <v-text-field type="text" onfocus="(this.type='date')" name="birthdate" v-model="birthdate" placeholder="Date of birth" value="2018-07-22" outlined solo-inverted></v-text-field><br>
        <br>
        <div class="error" v-html="error"></div>
        <br>
        <v-btn class="cyan" @click="create">Add</v-btn>
      </div>
    </v-flex>
   </v-layout>
  </v-app>
</template>

<script>
import AuthenticationService from '../../services/AuthenticationService'
export default {
  name: 'NewEmployee',
  data() {
    return{
      name:'',
      surname:'',
      birthdate:'',
      email:'',
      password:'12345qwert',
      error: ''
    }
  },
  methods:{
    async create() {
      try {
        const response = await AuthenticationService.create({
            name:this.name,        
            surname:this.surname,        
            email:this.email,        
            birthdate:this.birthdate,
            password:'12345qwert'       
          })
          
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.employee)
          this.$router.push({
           name: 'home'
          })
          
       } catch (error){
        this.error = error.response.data.error
        console.log(error)
       }
       
    }
  }
}
</script>

<style>
.form{
margin-top:2%;  
text-align: center;
padding:20px;
background-color: aqua;
max-width: 1100px;
}
</style>