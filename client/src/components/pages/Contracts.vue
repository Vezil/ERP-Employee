<template>
    <v-app class="grey page">
        <div class="container">
            <v-data-table
                :headers="headers"
                :items="contracts"
                class="elevation-1 table"
                dark
            >
                <template v-slot:top>
                    <v-toolbar flat dark>
                        <v-toolbar-title class="table_title"
                            >Contracts</v-toolbar-title
                        >
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    color="primary"
                                    dark
                                    class="mb-2"
                                    v-on="on"
                                >
                                    New Contract
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
                                                    name="contract"
                                                    v-model="
                                                        editedItem.contract
                                                    "
                                                    label="Contract"
                                                    required
                                                    :rules="[required]"
                                                ></v-text-field>
                                            </v-col>
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
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                                v-if="editedIndex == -1"
                                            >
                                                <v-text-field
                                                    type="number"
                                                    v-model="holidays.days_left"
                                                    label="Holidays"
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

export default {
    name: 'Contracts',
    data() {
        return {
            contracts: [],
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
                    text: 'Contract for (months)',
                    value: 'contract',
                    sortable: false
                },
                {
                    text: 'Start date of the contract',
                    value: 'start_date',
                    sortable: false
                },
                {
                    text: 'Finish date of the contract',
                    value: 'finish_date',
                    sortable: false
                },
                { text: 'Actions', value: 'action', sortable: false }
            ],
            editedIndex: -1,
            editedItem: {
                email: '',
                contract: '',
                start_date: '',
                finish_date: '',
                employeeId: ''
            },

            newContract: {
                email: '',
                contract: '',
                start_date: '',
                finish_date: '',
                employeeId: ''
            },
            holidays: {
                days_left: '',
                id: ''
            },
            holidays_before: '',

            required: value => !!value || 'Required.',
            error: null
        };
    },
    async mounted() {
        this.contracts = (await ContractsServices.getAllContracts()).data;
        this.employees = (await EmployeesServices.getAllEmployees()).data;

        for (const contract of this.contracts) {
            contract.name = contract.employee.name;
            contract.surname = contract.employee.surname;
            contract.email = contract.employee.email;
        }

        this.contracts = this.contracts.map(item => {
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
            return this.editedIndex === -1 ? 'New Contract' : 'Edit Contract';
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        }
    },
    methods: {
        async getThisEmployee(contract, id) {
            try {
                const person = await EmployeeServices.getOneEmployee(id);
                (contract.name = person.data.name),
                    (contract.surname = person.data.surname),
                    (contract.email = person.data.email);
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

                this.getDaysLeftBeforeAndSum(this.holidays.id);
                this.createHolidays(this.holidays);
            }
            if (!this.error) {
                this.close();
            }
        },
        async getDaysLeftBeforeAndSum(id) {
            try {
                const thisPerson = await EmployeesServices.getOneEmployee(id);
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
                await ContractsServices.addContract(contract);
            } catch (err) {
                console.error(err);
            }
        },
        async createHolidays(holidays) {
            try {
                console.log(holidays.days_left);
                await EmployeesServices.updateEmployee(holidays);
                console.log(holidays.days_left);
                await EmployeesServices.updateEmployee(holidays);
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
                await ContractsServices.updateContract(contract);
            } catch (err) {
                console.error(err);
            }
        },
        async deleteContract(contract) {
            try {
                await ContractsServices.deleteContract(contract);
            } catch (err) {
                console.error(err);
            }
        }
    }
};
</script>
