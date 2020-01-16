<template>
    <!-- <v-app class="grey page">
        <div class="container">This is your holidays :</div>
        <br />
        <ul v-for="holiday_user in holidays_user" :key="holiday_user.id">
            <li>{{holiday_user.days_taken}} days ({{holiday_user.start_date}} - {{holiday_user.finish_date }})</li>
        </ul>
    </v-app>-->
    <v-app class="grey page">
        <div class="container">
            <v-data-table :headers="headers" :items="holidays_user" class="elevation-1 table" dark>
                <template v-slot:top>
                    <v-toolbar flat dark>
                        <v-toolbar-title class="table_title">Your Holidays</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
            </v-data-table>
        </div>
    </v-app>
</template>

<script>
import { METHODS } from 'http';
import EmployeeServices from '../../services/EmployeeService';

export default {
    name: 'HolidaysConfirmed',
    data() {
        return {
            holidays_user: [],
            headers: [
                {
                    text: 'Start date of the Holidays',
                    value: 'start_date',
                    sortable: false
                },
                {
                    text: 'Finish date of the Holidays',
                    value: 'finish_date',
                    sortable: false
                },
                {
                    text: 'Days taken',
                    value: 'days_taken',
                    sortable: false
                }
            ]
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
