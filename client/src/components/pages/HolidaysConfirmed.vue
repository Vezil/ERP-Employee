<template>
    <v-app class="grey">
        <div class="container">This is your holidays :</div>
        <br />
        <ul v-for="holiday_user in holidays_user" :key="holiday_user.id">
            <li>{{holiday_user.days_taken}} days ({{holiday_user.start_date}} - {{holiday_user.finish_date }})</li>
        </ul>
    </v-app>
</template>

<script>
import { METHODS } from 'http';
import EmployeeServices from '../../services/EmployeeService';

export default {
    name: 'HolidaysConfirmed',
    data() {
        return {
            holidays_user: []
        };
    },
    async mounted() {
        this.holidays_user = await EmployeeServices.getHolidaysByEmployeeId(
            '6'
        );
        this.holidays_user = this.holidays_user.data;

        this.holidays_user = this.holidays_user.map(item => {
            item.start_date = item.start_date.slice(0, 10);
            item.finish_date = item.finish_date.slice(0, 10);
            return item;
        });

        console.log(this.holidays_user);
    }
};
</script>
<style scoped>
</style>
