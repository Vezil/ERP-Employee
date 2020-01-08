<template>
  <v-app class="grey">
    <v-layout column>
     <v-flex xs6>
      <div class="container white elevation-3 form">
      <br>
        <h2>Add New Employee</h2><br><br>
        <v-text-field type="text" name="name" v-model="name" placeholder="Name" outlined solo-inverted></v-text-field><br>
        <v-text-field type="text" name="surname" v-model="surname" placeholder="Surname" outlined solo-inverted></v-text-field><br/>
        <v-text-field type="date" name="birthdate" v-model="birthdate" placeholder="Date of birth" value="2018-07-22" outlined solo-inverted></v-text-field><br>
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
            birthdate:this.birthdate,
            password:'12345qwert'       
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