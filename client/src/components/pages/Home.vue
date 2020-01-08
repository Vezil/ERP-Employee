<template>
  <v-app class="grey">
    <div class="local_container">
      <h1>Welcome to ERP <div v-if="$store.state.isLoggedIn"><b>{{$store.state.user.name +' '+ $store.state.user.surname}}!</b></div></h1>
    </div>
  </v-app>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld
  }
}
</script>
<style>
.local_container{
  margin-left:auto;
  margin:auto;
  text-align:center;
  color:rgb(8, 1, 1)
}
</style>