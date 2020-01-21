<template>
    <v-app class="grey page">
        <div class="container">
            <v-data-table
                :headers="headers"
                :items="holidays_user"
                class="elevation-1 table"
                dark
            >
                <template v-slot:top>
                    <v-toolbar flat dark>
                        <v-toolbar-title class="table_title"
                            >Your Holidays</v-toolbar-title
                        >
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                </template>
            </v-data-table>
        </div>
    </v-app>
</template>

<script>
import { METHODS } from 'http';
import HolidaysForUserServices from '../../services/HolidaysForUserService';
import { store } from '../../store';
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
        this.holidays_user = await HolidaysForUserServices.getHolidaysByEmployeeId(
            this.$store.state.id
        );
        this.holidays_user = this.holidays_user.data;

        this.holidays_user = this.holidays_user.map(item => {
            item.start_date = item.start_date.slice(0, 10);
            item.finish_date = item.finish_date.slice(0, 10);
            return item;
        });
    }
};
</script>
<style scoped></style>
