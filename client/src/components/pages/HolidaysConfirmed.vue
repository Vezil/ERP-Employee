<template>
    <v-app class="grey page">
        <div class="container">
            <v-data-table
                :headers="headers"
                :items="holidaysUser"
                :sort-by="['id']"
                :sort-desc="['id']"
                class="elevation-1 table"
                dark
            >
                <template v-slot:item.start_date="{ item }"
                    >{{ item.start_date | formatDate }}
                </template>

                <template v-slot:item.finish_date="{ item }"
                    >{{ item.finish_date | formatDate }}
                </template>

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
import HolidaysForUserServices from '../../services/HolidaysForUserService';
import { store } from '../../store';
export default {
    name: 'HolidaysConfirmed',
    data() {
        return {
            holidaysUser: [],
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
        this.holidaysUser = await HolidaysForUserServices.getHolidaysByEmployeeId(
            this.$store.state.id
        );

        this.holidaysUser = this.holidaysUser.data;
    }
};
</script>
