<template>
    <!-- <v-card> -->
    <!-- <v-toolbar color="blue darken-4" dark>

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
            <router-link v-if="$store.state.isLoggedIn" to="Contracts">
                <v-btn color="blue darken-3" class="mx-2">
                    Contracts
                    <v-icon>add</v-icon>
                </v-btn>
            </router-link>
            <router-link v-if="$store.state.isLoggedIn" to="Holidays">
                <v-btn color="blue darken-3" class="mx-2">
                    Contracts
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
    </v-toolbar>-->
    <!-- </v-card> -->
    <div>
        <v-navigation-drawer v-model="drawer" app color="teal darken-3" dark>
            <v-list dense>
                <router-link to="/">
                    <v-list-item class="menu_el">
                        <v-list-item-action>
                            <v-icon>dashboard</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Dashboard</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link v-if="!$store.state.isLoggedIn" to="Login">
                    <v-list-item class="menu_el">
                        <v-list-item-action>
                            <v-icon>account_box</v-icon>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title>Login</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link v-if="$store.state.isLoggedIn" to="Contracts">
                    <v-list-item class="menu_el">
                        <v-list-item-action>
                            <i class="material-icons">contacts</i>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title>Contracts</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link v-if="$store.state.isLoggedIn" to="Holidays">
                    <v-list-item class="menu_el">
                        <v-list-item-action>
                            <i class="material-icons">work_off</i>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title>Holidays</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>

                <v-list-item
                    class="menu_el"
                    v-if="$store.state.isLoggedIn"
                    color="blue darken-3"
                    @click="logout"
                >
                    <v-list-item-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <!-- https://material.io/resources/icons/?icon=contacts&style=baseline -->
        <v-app-bar app color="teal darken-2" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>ERP EMPLOYEE</v-toolbar-title>
        </v-app-bar>
    </div>
</template>
<script>
export default {
    name: 'Navbar',
    data() {
        return {
            drawer: null
        };
    },
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
<style>
.menu_el {
    padding: 30px !important;
    text-decoration: none !important;
}
.menu_el:hover {
    cursor: pointer;
    background-color: rgb(1, 39, 33);
}
</style>
