<template>
    <v-card>
        <v-toolbar color="blue darken-4" dark>
            <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
            <v-toolbar-title>
                ERP &nbsp;
                <v-icon>work</v-icon>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link to="/">
                <v-btn color="blue darken-3" class="mx-2">
                    Home
                    <v-icon>home</v-icon>
                </v-btn>
            </router-link>
            <router-link v-if="$store.state.isLoggedIn" to="NewEmployee">
                <v-btn color="blue darken-3" class="mx-2">
                    Add Employee
                    <v-icon>add</v-icon>
                </v-btn>
            </router-link>
            <router-link v-if="$store.state.isLoggedIn" to="NewContract">
                <v-btn color="blue darken-3" class="mx-2">
                    Add Contract
                    <v-icon>add</v-icon>
                </v-btn>
            </router-link>
            <router-link v-if="!$store.state.isLoggedIn" to="Login">
                <v-btn color="blue darken-3" class="mx-2">Login</v-btn>
            </router-link>
            <v-btn
                v-if="$store.state.isLoggedIn"
                color="blue darken-3"
                class="mx-2"
                @click="logout"
            >Logout</v-btn>
        </v-toolbar>
    </v-card>
</template>
<script>
export default {
    name: 'Navbar',

    methods: {
        logout() {
            this.$store.dispatch('setToken', null);
            this.$store.dispatch('setUser', null);

            this.$router.push({
                name: 'home'
            });
        }
    }
};
</script>
