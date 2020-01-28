<template>
    <v-app class="grey page">
        <div class="container">
            <h1 v-if="this.holidays_user.days_left > 0">
                You still have
                <b>{{ this.holidays_user.days_left }}</b> days off !
            </h1>
            <h1 v-else>You don't have more days off !</h1>
        </div>
    </v-app>
</template>

<script>
import { store } from '../../store';
import EmployeesServices from '../../services/EmployeesService';

export default {
    name: 'employeedashboard',

    data() {
        return { holidays_user: [] };
    },

    async mounted() {
        this.holidays_user = await EmployeesServices.getEmployeeById(
            this.$store.state.id
        );
        this.holidays_user = this.holidays_user.data;
    }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Arvo|Bangers|Pacifico&display=swap');
.error {
    padding: 12px;
    color: black;
}
b {
    font-family: 'Bangers', cursive;
}
.page {
    margin: auto;
    color: white;
}
</style>
