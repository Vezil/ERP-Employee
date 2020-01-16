<template>
    <v-app class="grey">
        <div class="container">
            <v-data-table :headers="headers" :items="holidays_user" class="elevation-1" dark>
                <template v-slot:top>
                    <v-toolbar flat dark>
                        <v-toolbar-title>Your requests for holidays</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark class="mb-2" v-on="on">
                                    New Request
                                    <v-icon>add</v-icon>
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
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
import EmployeeServices from '../../services/EmployeeService';
import AdminServices from '../../services/AdminService';
export default {
    name: 'holidaysrequests',
    data() {
        return {
            holidays_user: [],
            dialog: false,
            newPass: false,
            days_left: null,
            error_validation: null,
            headers: [
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

                { text: 'Actions', value: 'action', sortable: false }
            ],
            editedIndex: -1,
            editedItem: {
                days_taken: '',
                days_taken_old: '',
                start_date: '',
                finish_date: '',
                confirmed: 0,
                employeeId: 6
            },

            required: value => !!value || 'Required.',
            error: null
        };
    },
    async mounted() {
        this.holidays_user = await EmployeeServices.getEmployeeRequests(6);
        this.holidays_user = this.holidays_user.data;

        this.holidays_user = this.holidays_user.map(item => {
            item.start_date = item.start_date.slice(0, 10);
            item.finish_date = item.finish_date.slice(0, 10);

            return item;
        });
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New request' : 'Edit request';
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

                    this.addHolidaysRequest(this.editedItem);
                    this.holidays_user.push(this.editedItem);
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
                        "YOU DON'T HAVE " +
                        days_taken +
                        ' FREE DAYS, ONLY ' +
                        this.days_left;
                    console.error(this.error_validation);
                }
            } catch (err) {
                console.error(err);
            }
        },

        async addHolidaysRequest(holidays) {
            try {
                delete holidays.days_taken_old;
                await EmployeeServices.addHolidaysForEmployee(holidays);
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
