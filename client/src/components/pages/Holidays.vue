<template>
    <v-app class="grey page">
        <div class="container">
            <v-data-table
                :headers="headers"
                :items="holidays"
                class="elevation-1 table"
                dark
            >
                <template v-slot:top>
                    <v-toolbar flat dark>
                        <v-toolbar-title class="table_title"
                            >Holidays</v-toolbar-title
                        >
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
                                    New Holidays
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
                                        <v-select
                                            v-bind:items="employee"
                                            v-model="editedItem.email"
                                            required
                                            :rules="[required]"
                                        ></v-select>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    type="text"
                                                    onfocus="(this.type='date')"
                                                    v-model="
                                                        editedItem.start_date
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
                                                <v-text-field
                                                    type="confirmed"
                                                    v-model="
                                                        editedItem.confirmed
                                                    "
                                                    label="confirmed"
                                                    required
                                                    :rules="[required]"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <div class="error" v-if="error">{{
                                            error
                                        }}</div>
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
import { METHODS } from 'http';
import EmployeesServices from '../../services/EmployeesService';
import ContractsServices from '../../services/ContractsService';
import HolidaysServices from '../../services/HolidaysService';
export default {
    name: 'Holidays',
    data() {
        return {
            holidays: [],
            employees: [],
            employee: [],
            isDialogOpen: false,
            newPass: false,
            days_left: null,
            error_validation: null,
            areAll: true,
            headers: [
                {
                    text: 'Name',
                    value: 'name',
                    sortable: false
                },
                {
                    text: 'Surname',
                    value: 'surname',
                    sortable: false
                },
                {
                    text: 'Email',
                    value: 'email',
                    sortable: false
                },
                {
                    text: 'Days taken',
                    value: 'days_taken',
                    sortable: false
                },
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
                    text: 'Confirmed',
                    value: 'confirmed',
                    sortable: false
                },
                { text: 'Actions', value: 'action', sortable: false }
            ],
            editedIndex: -1,
            editedItem: {
                email: '',
                name: '',
                surname: '',
                days_taken: '',
                days_taken_old: '',
                start_date: '',
                finish_date: '',
                confirmed: 1,
                userId: ''
            },

            required: value => !!value || 'Required.',
            error: null
        };
    },
    async mounted() {
        this.fetchHolidays();
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Holidays' : 'Edit Holidays';
        }
    },

    watch: {
        isDialogOpen(val) {
            val || this.close();
        }
    },
    methods: {
        async fetchHolidays() {
            this.holidays = (await HolidaysServices.getHolidays()).data;
            this.employees = (await EmployeesServices.getAllEmployees()).data;

            for (const holiday of this.holidays) {
                holiday.name = holiday.employee.name;
                holiday.surname = holiday.employee.surname;
                holiday.email = holiday.employee.email;
            }

            this.holidays = this.holidays.map(item => {
                item.start_date = item.start_date.slice(0, 10);
                item.finish_date = item.finish_date.slice(0, 10);

                return item;
            });

            let i = 0;
            this.employees.forEach(one => {
                this.employee[i] = one.email;
                i++;
            });
        },
        editItem(item) {
            this.editedIndex = this.holidays.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.isDialogOpen = true;
        },

        deleteItem(item) {
            const index = this.holidays.indexOf(item);
            this.editedIndex = this.holidays.indexOf(item);
            this.editedItem = Object.assign({}, item);
            confirm('Are you sure you want to delete this contract?') &&
                this.holidays.splice(index, 1) &&
                this.deleteHolidays(item);
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
                this.updateHolidays(this.editedItem);
            } else {
                this.employees.forEach(employee => {
                    if (this.editedItem.email == employee.email) {
                        this.editedItem.userId = employee.id;
                        this.editedItem.name = employee.name;
                        this.editedItem.surname = employee.surname;
                    }
                });

                if (this.error_validation == null) {
                    this.createHolidays(this.editedItem);
                }
            }
            if (!this.error) {
                this.close();
            }
        },

        async createHolidays(holidays) {
            this.areAll = true;
            delete holidays.days_taken_old;

            delete holidays.days_taken;

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
                await HolidaysServices.addHolidays(holidays);
                this.fetchHolidays();
            } catch (err) {
                console.error(err);
            }
        },

        async updateHolidays(holidays) {
            delete holidays.days_taken;
            delete holidays.employee;
            delete holidays.name;
            delete holidays.surname;
            delete holidays.email;

            this.areAll = true;
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
                await HolidaysServices.updateHolidays(holidays);
                this.fetchHolidays();
            } catch (err) {
                console.error(err);
            }
        },
        async deleteHolidays(holidays) {
            try {
                delete holidays.days_taken;
                delete holidays.employee;
                delete holidays.name;
                delete holidays.surname;
                delete holidays.email;

                await HolidaysServices.deleteHolidays(holidays);

                this.fetchHolidays();
            } catch (err) {
                console.error(err);
            }
        }
    }
};
</script>
<style scoped></style>
