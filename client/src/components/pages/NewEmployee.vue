<template>
  <v-app>
    <div class="container">
      <br>
        <h3>Add New Employee</h3><br><br>
        <input type="name" name="name" v-model="name" placeholder="Name"/><br>
        <input type="surname" name="surname" v-model="surname" placeholder="Surname"/><br/>
        <input type="birthdate" name="birthdate" v-model="birthdate" placeholder="Date of birth"/><br>
        <br>
        <button @click="create">Register</button>
    </div>
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
      birthdate:''
    }
  },
  methods:{
    async create() {
     const response = await AuthenticationService.create({
        name:this.name,        
        surname:this.surname,        
        birthdate:this.birthdate        
      })
      console.log(response.data)
    }
  }
}
</script>

<style>

</style>
