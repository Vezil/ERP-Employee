<template>
    <v-app class="grey page">
        <div class="container">
            <v-data-table
                :headers="headers"
                :items="holidays_user"
                class="elevation-1 table"
                dark
            >
                <template v-slot:item.start_date="{ item }"
                    >{{ item.start_date | formatDate }}
                </template>

                <template v-slot:item.finish_date="{ item }"
                    >{{ item.finish_date | formatDate }}
                </template>
                <template v-slot:item.days_taken="{ item }"
                    >{{ item.days_taken }}
                </template>

                <template v-slot:top>
                    <v-toolbar flat dark>
                        <v-toolbar-title class="table_title"
                            >Your requests for holidays
                        </v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="isDialogOpen" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    color="primary"
                                    dark
                                    class="mb-2"
                                    v-on="on"
                                >
                                    New Request
                                    <v-icon>add</v-icon>
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{
                                        formTitle
                                    }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    type="text"
                                                    onfocus="(this.type='date')"
                                                    v-model="
                                                        editedItem.start_date
                                                    "
                                                    :value="
                                                        editedItem.start_date
                                                            | formatDate
                                                    "
                                                    label="Start Day"
                                                    required
                                                    :rules="[required]"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    type="text"
                                                    onfocus="(this.type='date')"
                                                    v-model="
                                                        editedItem.finish_date
                                                    "
                                                    label="Finish Day"
                                                    required
                                                    :rules="[required]"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <div class="error" v-if="error">{{
                                            error
                                        }}</div>
                                        <div
                                            class="error"
                                            v-for="(item,
                                            index) in errors_from_server"
                                            :key="index"
                                        >
                                            <div>{{ item.message }}</div>
                                        </div>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="close"
                                        >Cancel</v-btn
                                    >
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="save"
                                        >Save</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)"
                        >edit</v-icon
                    >
                    <v-icon small @click="deleteItem(item)">delete</v-icon>
                </template>
            </v-data-table>
        </div>
    </v-app>
</template>

<script>
import moment from 'moment';
import EmployeesServices from '../../services/EmployeesService';
import HolidaysForUserServices from '../../services/HolidaysForUserService';
import { store } from '../../store';

export default {
    name: 'holidaysrequests',
    data() {
        return {
            holidays_user: [],
            isDialogOpen: false,
            newPass: false,
            days_left: null,
            areAll: true,
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
                },

                { text: 'Actions', value: 'action', sortable: false }
            ],
            editedIndex: -1,
            editedItem: {
                days_taken: '',
                days_taken_old: '',
                start_date: '',
                finish_date: '',
                confirmed: 0,
                user_id: this.$store.state.id
            },
            error: null,
            errors_from_server: null,

            required: value => !!value || 'Required.',
            error: null
        };
    },

    beforeCreate() {
        if (
            this.$store.isLoggedInAsUser === null ||
            this.$store.isLoggedInAsUser === undefined ||
            this.$store.token === null ||
            this.$store.token === undefined
        ) {
            this.$router.push({
                name: 'dashboard'
            });
        }
    },

    async mounted() {
        this.fetchHolidays();
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New request' : 'Edit request';
        }
    },

    watch: {
        isDialogOpen(val) {
            val || this.close();
        }
    },

    methods: {
        async fetchHolidays() {
            this.holidays_user = await HolidaysForUserServices.getEmployeeRequests(
                this.$store.state.id
            );

            this.holidays_user = this.holidays_user.data;
        },

        editItem(item) {
            this.editedIndex = this.holidays_user.indexOf(item);
            this.editedItem = Object.assign({}, item);

            this.editedItem.start_date = moment(item.start_date).format(
                'DD.MM.YYYY'
            );
            this.editedItem.finish_date = moment(item.finish_date).format(
                'DD.MM.YYYY'
            );

            this.isDialogOpen = true;
        },

        deleteItem(item) {
            const index = this.holidays_user.indexOf(item);
            this.editedIndex = this.holidays_user.indexOf(item);
            this.editedItem = Object.assign({}, item);

            confirm('Are you sure you want to delete this contract?') &&
                this.holidays_user.splice(index, 1) &&
                this.deleteHolidaysRequest(item);
        },

        close() {
            this.error = null;
            this.isDialogOpen = false;

            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            }, 300);
        },

        save() {
            if (this.editedIndex > -1) {
                this.updateHolidaysRequest(this.editedItem);
            } else {
                this.addHolidaysRequest(this.editedItem);
            }
        },

        async addHolidaysRequest(holidays) {
            delete holidays.days_taken_old;
            delete holidays.days_taken;

            this.areAll = true;
            this.errors_from_server = null;

            Object.keys(holidays).forEach(value => {
                if (holidays[value] === '' || holidays[value] === undefined) {
                    this.areAll = false;
                }
            });

            if (this.areAll === false) {
                this.error = 'All fields are required !';

                return;
            }
            if (this.areAll) {
                this.error = null;
            }
            try {
                await HolidaysForUserServices.addHolidaysEmployee(holidays);
            } catch (err) {
                this.errors_from_server = err.response.data.errors;

                console.error(err);
            }

            if (!this.error && !this.errors_from_server) {
                this.close();
            }

            this.fetchHolidays();
        },

        async updateHolidaysRequest(holidays) {
            this.areAll = true;
            this.errors_from_server = null;

            Object.keys(holidays).forEach(value => {
                if (holidays[value] === '' || holidays[value] === undefined) {
                    this.areAll = false;
                }
            });

            if (this.areAll === false) {
                this.error = 'All fields are required !';

                return;
            }
            if (this.areAll) {
                this.error = null;
            }
            try {
                await HolidaysForUserServices.editHolidaysEmployee(holidays);
            } catch (err) {
                this.errors_from_server = err.response.data.errors;

                console.error(err);
            }

            if (!this.error && !this.errors_from_server) {
                this.close();
            }

            this.fetchHolidays();
        },
        async deleteHolidaysRequest(holidays) {
            try {
                delete holidays.days_taken_old;

                await HolidaysForUserServices.deleteHolidaysEmployee(holidays);
            } catch (err) {
                console.error(err);
            }

            this.fetchHolidays();
        }
    }
};
</script>
