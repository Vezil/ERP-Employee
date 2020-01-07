<template>
  <v-card>
    <v-toolbar color="blue darken-4" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>ERP</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-3" class="mx-2">Home</v-btn>
      <v-btn color="blue darken-3" class="mx-2">Add Employee</v-btn>
      <v-btn color="blue darken-3" class="mx-2">Add Contract</v-btn>
      <v-btn color="blue darken-3" class="mx-2">Logout</v-btn>
    </v-toolbar>
  </v-card>
</template>
<script>
export default {
  name: 'Navbar',
}
</script>
