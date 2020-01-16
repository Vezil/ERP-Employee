<template>
    <v-app class="grey page">
        <div class="container">
            <v-data-table :headers="headers" :items="holidays" class="elevation-1 table" dark>
                <template v-slot:top>
                    <v-toolbar flat dark>
                        <v-toolbar-title class="table_title">Holidays</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark class="mb-2" v-on="on">
                                    New Holidays
                                    <v-icon>add</v-icon>
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
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
                                                    v-model="editedItem.start_date"
                                                    label="Start Day"
                                                    required
                                                    :rules="[required]"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    type="text"
                                                    onfocus="(this.type='date')"
                                                    v-model="editedItem.finish_date"
                                                    label="Finish Day"
                                                    required
                                                    :rules="[required]"
                                                ></v-text-field>
                                                <v-text-field
                                                    type="confirmed"
                                                    v-model="editedItem.confirmed"
                                                    label="confirmed"
                                                    required
                                                    :rules="[required]"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <div class="error" v-if="error">{{error}}</div>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
                    <v-icon small @click="deleteItem(item)">delete</v-icon>
                </template>
            </v-data-table>
        </div>
    </v-app>
</template>

<script>
import { METHODS } from 'http';
import AdminServices from '../../services/AdminService';
export default {
    name: 'Holidays',
    data() {
        return {
            holidays: [],
            employees: [],
            employee: [],
            dialog: false,
            newPass: false,
            days_left: null,
            error_validation: null,
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
                employeeId: ''
            },

            newContract: {
                days_taken: '',
                start_date: '',
                finish_date: '',
                confirmed: 1,
                employeeId: ''
            },

            required: value => !!value || 'Required.',
            error: null
        };
    },
    async mounted() {
        this.holidays = (await AdminServices.getHolidays()).data;
        this.employees = (await AdminServices.getAllEmployees()).data;

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
            this.employee[i] =
                // '' + one.name + ' ' + one.surname + '  |  ' +
                one.email;
            i++;
        });
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Holidays' : 'Edit Holidays';
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        }
    },
    methods: {
        editItem(item) {
            this.editedIndex = this.holidays.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
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
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            }, 300);
        },

        save() {
            if (this.editedIndex > -1) {
                this.SumDaysTaken(
                    this.editedItem.start_date,
                    this.editedItem.finish_date
                );
                this.updateDaysLeft(
                    this.editedItem.days_taken,
                    this.editedItem.employeeId,
                    'editing'
                );
                Object.assign(
                    this.holidays[this.editedIndex],
                    this.editedItem,

                    this.updateHolidays(this.editedItem)
                );
            } else {
                this.employees.forEach(employee => {
                    if (this.editedItem.email == employee.email) {
                        this.editedItem.employeeId = employee.id;
                    }
                });

                this.SumDaysTaken(
                    this.editedItem.start_date,
                    this.editedItem.finish_date
                );
                this.updateDaysLeft(
                    this.editedItem.days_taken,
                    this.editedItem.employeeId,
                    'adding'
                );

                if (this.error_validation == null) {
                    console.log(this.editedItem);

                    this.createHolidays(this.editedItem);
                    this.holidays.push(this.editedItem);
                }
            }
            if (!this.error) {
                this.close();
            }
        },
        SumDaysTaken(start_date, finish_date) {
            let sum = Date.parse(finish_date) - Date.parse(start_date);
            sum /= 100000;
            sum /= 864;
            this.editedItem.days_taken_old = this.editedItem.days_taken;
            this.editedItem.days_taken = sum;
        },
        async updateDaysLeft(days_taken, id, option) {
            try {
                const thisPerson = await AdminServices.getOneEmployee(id);
                this.days_left = thisPerson.data.days_left;
                var new_days;
                if (option === 'deleting') {
                    new_days = thisPerson.data.days_left + parseInt(days_taken);
                } else if (option === 'adding') {
                    new_days = thisPerson.data.days_left - parseInt(days_taken);
                } else if (option === 'editing') {
                    let cashe_days =
                        thisPerson.data.days_left +
                        parseInt(this.editedItem.days_taken_old);
                    new_days = cashe_days - parseInt(days_taken);
                } else {
                    console.log('error');
                }
                console.log(new_days);

                if (new_days >= 0) {
                    this.days_left = new_days;
                    const update = {
                        id: id,
                        days_left: new_days
                    };
                    try {
                        await AdminServices.updateEmployee(update);
                    } catch (err) {
                        console.error(err);
                    }
                } else {
                    this.error_validation =
                        "THIS EMPLOYEE DON'T HAVE " +
                        days_taken +
                        ' FREE DAYS, ONLY ' +
                        this.days_left;
                    console.error(this.error_validation);
                }
            } catch (err) {
                console.error(err);
            }
        },

        async createHolidays(holidays) {
            try {
                await AdminServices.addHolidays(holidays);
            } catch (err) {
                console.error(err);
            }
        },

        async updateHolidays(holidays) {
            const areAll = Object.keys(holidays).every(key => !!holidays[key]);
            if (!areAll) {
                this.error = 'All fields are required !';
                return;
            }
            if (areAll) {
                this.error = null;
            }
            try {
                await AdminServices.updateHolidays(holidays);
            } catch (err) {
                console.error(err);
            }
        },
        async deleteHolidays(holidays) {
            try {
                this.SumDaysTaken(
                    this.editedItem.start_date,
                    this.editedItem.finish_date
                );
                this.updateDaysLeft(
                    this.editedItem.days_taken,
                    this.editedItem.employeeId,
                    'deleting'
                );
                await AdminServices.deleteHolidays(holidays);
            } catch (err) {
                console.error(err);
            }
        }
    }
};
</script>
<style scoped>
</style>
