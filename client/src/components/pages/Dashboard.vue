<template>
    <v-app class="grey page">
        <div class="local_container">
            <h1>
                Welcome to ERP
                <div v-if="$store.state.isLoggedInAsUser">
                    <b>{{ $store.state.username }}!</b>
                </div>
            </h1>
            <div>
                <admin-dashboard v-if="$store.state.isLoggedInAsAdmin" />
                <employee-dashboard v-if="$store.state.isLoggedInAsUser" />
            </div>
        </div>
    </v-app>
</template>

<script>
import AdminDashboard from './AdminDashboard.vue';
import EmployeeDashboard from './EmployeeDashboard.vue';
import { store } from '../../store';
export default {
    name: 'dashboard',
    components: {
        AdminDashboard,
        EmployeeDashboard
    },
    data() {
        return {};
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
    margin: 2% !important;
    margin-top: 5% !important;
    letter-spacing: 1px;
    width: 96%;
    padding: 2%;
}
.table th,
td {
    font-size: 20px !important;
}
.table_title {
    font-size: 40px;
    color: rgb(84, 199, 245);
}

h1 {
    font-family: 'Arvo', serif !important;
    font-size: 70px;
    margin-top: 2%;
}
</style>
