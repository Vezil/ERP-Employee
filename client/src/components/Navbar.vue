<template>
  <v-card>
    <v-toolbar color="blue darken-4" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>ERP</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/"><v-btn color="blue darken-3" class="mx-2">Home</v-btn></router-link>
      <router-link to="NewEmployee"><v-btn color="blue darken-3" class="mx-2">Add Employee</v-btn></router-link>
      <router-link to="NewContract"><v-btn color="blue darken-3" class="mx-2">Add Contract</v-btn></router-link>
      <v-btn color="blue darken-3" class="mx-2">Logout</v-btn>
    </v-toolbar>
  </v-card>
</template>
<script>
export default {
  name: 'Navbar',
}
</script>
