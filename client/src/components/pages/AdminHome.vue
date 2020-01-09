<template>
    <v-app class="grey">
        <div class="local_container">
            <div v-for="employee in employees" :key="employees.email">{{employee.email}}</div>
        </div>
    </v-app>
</template>

<script>
import AdminServices from '../../services/AdminService';

export default {
    name: 'home',
    components: {
        // HelloWorld
    },
    data() {
        return {
            employees: null
        };
    },
    async mounted() {
        this.employees = await AdminServices.getAllEmployees();
    }
};
</script>
<style>
.local_container {
    margin-left: auto;
    margin: auto;
    text-align: center;
    color: rgb(8, 1, 1);
}
</style>
