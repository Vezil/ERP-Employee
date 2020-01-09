<template>
    <v-app class="grey">
        <div class="local_container">
            <h1>
                Welcome to ERP
                <div v-if="$store.state.isLoggedIn">
                    <b>{{$store.state.user.name}}!</b>
                </div>
            </h1>

            <div v-if="$store.state.isLoggedIn">
                <admin-home />
            </div>
        </div>
    </v-app>
</template>

<script>
import AdminHome from './AdminHome.vue';

export default {
    name: 'home',
    components: {
        AdminHome
    }
};
</script>
<style>
.local_container {
    margin-left: auto;
    margin: auto;
    text-align: center;
    color: rgb(8, 1, 1);
    padding: 50px;
}
.local_container h1 {
    padding: 80px;
}
</style>