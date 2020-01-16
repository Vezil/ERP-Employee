<template>
    <v-app class="grey page">
        <div class="local_container">
            <h1>
                Welcome to ERP
                <div v-if="$store.state.isLoggedIn">
                    <b>{{$store.state.user.name}}!</b>
                </div>
            </h1>
            <div>
                <admin-dashboard v-if="$store.state.isLoggedInAsAdmin" />
                <employee-dashboard v-if="$store.state.isLoggedIn" />
                <!-- <a -->
                <!-- href="https://www.freepik.com/free-photos-vectors/background" -->
                <!-- >Background photo created by dashu83 - www.freepik.com</a> -->
            </div>
        </div>
    </v-app>
</template>

<script>
import AdminDashboard from './AdminDashboard.vue';
import EmployeeDashboard from './EmployeeDashboard.vue';

export default {
    name: 'dashboard',
    components: {
        AdminDashboard,
        EmployeeDashboard
    }
};
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Arvo|Pacifico&display=swap');

.local_container {
    text-align: center;
    color: white;
    padding: 10px;
}
.local_container h1 {
    padding: 10px;
}
.table {
    margin: 10% !important;
    letter-spacing: 1px;
}
.table_title {
    font-size: 30px;
    color: rgb(84, 199, 245);
}

h1 {
    font-family: 'Arvo', serif !important;
    font-size: 60px;
    margin-top: 7%;
}
</style>