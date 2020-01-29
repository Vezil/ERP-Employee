<template>
    <div>
        <v-navigation-drawer v-model="drawer" app color="teal darken-3" dark>
            <v-list dense>
                <router-link to="/">
                    <v-list-item class="menu_el">
                        <v-list-item-action>
                            <v-icon>dashboard</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="tile"
                                >Dashboard</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link
                    v-if="
                        !$store.state.isLoggedInAsUser &&
                            !$store.state.isLoggedInAsAdmin
                    "
                    to="Login"
                >
                    <v-list-item class="menu_el">
                        <v-list-item-action>
                            <v-icon>account_box</v-icon>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title class="tile"
                                >Login</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link
                    v-if="$store.state.isLoggedInAsAdmin"
                    to="Contracts"
                >
                    <v-list-item class="menu_el">
                        <v-list-item-action>
                            <i class="material-icons">contacts</i>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title class="tile"
                                >Contracts</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link
                    v-if="$store.state.isLoggedInAsAdmin"
                    to="Holidays"
                >
                    <v-list-item class="menu_el">
                        <v-list-item-action>
                            <i class="material-icons">work_off</i>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title class="tile"
                                >Holidays</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link
                    v-if="$store.state.isLoggedInAsUser"
                    to="HolidaysRequests"
                >
                    <v-list-item class="menu_el">
                        <v-list-item-action>
                            <i class="material-icons">help</i>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title class="tile"
                                >HolidaysRequests</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link
                    v-if="$store.state.isLoggedInAsUser"
                    to="HolidaysConfirmed"
                >
                    <v-list-item class="menu_el">
                        <v-list-item-action>
                            <i class="material-icons">done_outline</i>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title class="tile"
                                >HolidaysConfirmed</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link
                    v-if="
                        $store.state.isLoggedInAsUser ||
                            $store.state.isLoggedInAsAdmin
                    "
                    to="ChangePassword"
                >
                    <v-list-item class="menu_el">
                        <v-list-item-action>
                            <i class="material-icons">
                                edit
                            </i>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title class="tile"
                                >ChangePassword</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link
                    v-if="
                        $store.state.isLoggedInAsUser ||
                            $store.state.isLoggedInAsAdmin
                    "
                    to="Logout"
                >
                    <v-list-item class="menu_el">
                        <v-list-item-action>
                            <v-icon>exit_to_app</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="tile"
                                >Logout</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
            </v-list>
        </v-navigation-drawer>
        <!-- https://material.io/resources/icons/?icon=contacts&style=baseline -->
        <v-app-bar app color="teal darken-2" dark>
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
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
    }
};
</script>
<style>
.menu_el {
    padding: 20px !important;
}
.menu_el:hover {
    cursor: pointer;
    background-color: rgb(1, 39, 33);
}
.tile {
    font-size: 1rem !important;
}
.v-application a {
    text-decoration: none !important;
}
</style>
