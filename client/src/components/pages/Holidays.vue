<template>
    <v-app class="grey">
        <div class="container">
            <v-data-table :headers="headers" :items="holidays" class="elevation-1" dark>
                <template v-slot:top>
                    <v-toolbar flat dark>
                        <v-toolbar-title>Holidays</v-toolbar-title>
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
                                                    name="contract"
                                                    v-model="editedItem.contract"
                                                    label="Contract"
                                                    required
                                                    :rules="[required]"
                                                ></v-text-field>
                                            </v-col>
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
                                            <v-col cols="12" sm="6" md="4" v-if="editedIndex == -1">
                                                <v-text-field
                                                    type="number"
                                                    v-model="holidays.days_left"
                                                    label="Holidays"
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
                    text: 'Start date of contract',
                    value: 'start_date',
                    sortable: false
                },
                {
                    text: 'Finish date of contract',
                    value: 'finish_date',
                    sortable: false
                },
                { text: 'Actions', value: 'action', sortable: false }
            ],
            editedIndex: -1,
            editedItem: {
                email: '',
                days_taken: '',
                start_date: '',
                finish_date: '',
                employeeId: ''
            },

            newContract: {
                email: '',
                days_taken: '',
                start_date: '',
                finish_date: '',
                employeeId: ''
            },

            required: value => !!value || 'Required.',
            error: null
        };
    },
    async mounted() {
        this.holidays = (await AdminServices.getHolidays()).data;
        this.employees = (await AdminServices.getAllEmployees()).data;
        console.log(this.holidays);
        this.holidays.forEach(holidaysEL => {
            this.getThisEmployee(holidaysEL, holidaysEL.employeeId);
        });

        this.holidays.forEach(holidaysEL => {
            let newStartDate = holidaysEL.start_date;
            newStartDate = newStartDate.slice(0, 10);
            holidaysEL.start_date = newStartDate;

            let newFinishDate = holidaysEL.finish_date;
            newFinishDate = newFinishDate.slice(0, 10);
            holidaysEL.finish_date = newFinishDate;
            let sum = Date.parse(newFinishDate) - Date.parse(newStartDate);
            sum /= 100000;
            sum /= 864;
            console.log(sum);
            // console.log(sum);
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
            return this.editedIndex === -1 ? 'New Contract' : 'Edit Contract';
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        }
    },
    methods: {
        async getThisEmployee(holidaysEL, id) {
            try {
                const person = await AdminServices.getOneEmployee(id);
                (holidaysEL.name = person.data.name),
                    (holidaysEL.surname = person.data.surname),
                    (holidaysEL.email = person.data.email);

                console.log(holidaysEL);
            } catch (err) {
                console.error(err);
            }
        },

        editItem(item) {
            this.editedIndex = this.contracts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            const index = this.contracts.indexOf(item);
            confirm('Are you sure you want to delete this contract?') &&
                this.contracts.splice(index, 1) &&
                this.deleteContract(item);
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
                Object.assign(
                    this.contracts[this.editedIndex],
                    this.editedItem,
                    this.updateContract(this.editedItem)
                );
            } else {
                this.employees.forEach(employee => {
                    if (this.editedItem.email == employee.email) {
                        this.editedItem.employeeId = employee.id;
                    }
                });

                this.contracts.push(this.editedItem);

                delete this.editedItem.email;
                this.createContract(this.editedItem);
                this.holidays.id = this.editedItem.employeeId;

                this.getDaysLeftBefore(this.holidays.id);
                this.createHolidays(this.holidays);
            }
            if (!this.error) {
                this.close();
            }
        },
        async getDaysLeftBefore(id) {
            try {
                const thisPerson = await AdminServices.getOneEmployee(id);
                this.holidays_before = thisPerson.data.days_left;
                this.holidays.days_left = parseInt(this.holidays.days_left);
                this.holidays_before = parseInt(this.holidays_before);
                this.holidays.days_left += this.holidays_before;
            } catch (err) {
                console.error(err);
            }
        },
        async createContract(contract) {
            try {
                await AdminServices.addContract(contract);
            } catch (err) {
                console.error(err);
            }
        },
        async createHolidays(holidays) {
            try {
                console.log(holidays.days_left);
                await AdminServices.updateEmployee(holidays);
                console.log(holidays.days_left);
                await AdminServices.updateEmployee(holidays);
            } catch (err) {
                console.error(err);
            }
        },
        async updateContract(contract) {
            const areAll = Object.keys(contract).every(key => !!contract[key]);
            if (!areAll) {
                this.error = 'All fields are required !';
                return;
            }
            if (areAll) {
                this.error = null;
            }
            try {
                await AdminServices.updateContract(contract);
            } catch (err) {
                console.error(err);
            }
        },
        async deleteContract(contract) {
            try {
                await AdminServices.deleteContract(contract);
            } catch (err) {
                console.error(err);
            }
        }
    }
};
</script>
<style scoped>
</style>
