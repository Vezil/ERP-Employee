<template>
  <v-app class="grey">
    <v-layout column>
     <v-flex xs6>
      <div class="container white elevation-3 form">
      <br>
        <h2>Login</h2><br><br>
        <v-text-field type="text" name="name" v-model="name" placeholder="Name" outlined solo-inverted></v-text-field><br>
        <v-text-field type="text" name="surname" v-model="surname" placeholder="Surname" outlined solo-inverted></v-text-field><br/>
        <v-text-field type="password" name="password" v-model="password" placeholder="Password" outlined solo-inverted></v-text-field><br>
        <br>
        <div class="error" v-html="error"></div>
        <br>
        <v-btn class="cyan" @click="create">Login</v-btn>
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
      password:'',
      error: ''
    }
  },
  methods:{
    async login() {
      try {
        const response = await AuthenticationService.login({
            name:this.name,        
            surname:this.surname,        
            password:this.password       
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
}
</style>