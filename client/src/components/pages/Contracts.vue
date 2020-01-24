<template>
    <v-app class="grey page">
        <div class="container">
            <v-data-table
                :headers="headers"
                :items="contracts"
                class="elevation-1 table"
                dark
            >
                <template v-slot:item.name="{ item }"
                    >{{ item.employee.name }}
                </template>

                <template v-slot:item.surname="{ item }"
                    >{{ item.employee.surname }}
                </template>

                <template v-slot:item.email="{ item }"
                    >{{ item.employee.email }}
                </template>

                <template v-slot:item.start_date="{ item }"
                    >{{ item.start_date | formatDate }}
                </template>

                <template v-slot:item.finish_date="{ item }"
                    >{{ item.finish_date | formatDate }}
                </template>

                <template v-slot:top>
                    <v-toolbar flat dark>
                        <v-toolbar-title class="table_title"
                            >Contracts</v-toolbar-title
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
                                                    type="number"
                                                    name="contract"
                                                    v-model="
                                                        editedItem.contract_length
                                                    "
                                                    label="Contract (1/3/6/12)"
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
                                                    :value="
                                                        editedItem.finish_date
                                                            | formatDate
                                                    "
                                                    label="Finish Day"
                                                    required
                                                    :rules="[required]"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    type="number"
                                                    v-model="
                                                        editedItem.holidays_per_year
                                                    "
                                                    label="Holidays (20/26)"
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
import EmployeesServices from '../../services/EmployeesService';
import ContractsServices from '../../services/ContractsService';

export default {
    name: 'Contracts',
    data() {
        return {
            contracts: [],
            employees: [],
            employee: [],
            isDialogOpen: false,
            newPass: false,
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
                    text: 'Contract for (months)',
                    value: 'contract_length',
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
                contract_length: '',
                start_date: '',
                finish_date: '',
                user_id: '',
                holidays_per_year: ''
            },
            error: null,
            errors_from_server: null,
            required: value => !!value || 'Required.'
        };
    },
    mounted() {
        this.fetchContracts();
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Contract' : 'Edit Contract';
        }
    },

    watch: {
        isDialogOpen(val) {
            val || this.close();
        }
    },
    methods: {
        async fetchContracts() {
            this.contracts = (await ContractsServices.getAllContracts()).data;
            this.employees = (await EmployeesServices.getAllEmployees()).data;

            let i = 0;
            this.employees.forEach(one => {
                this.employee[i] = one.email;
                i++;
            });
        },

        editItem(item) {
            this.editedIndex = this.contracts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.isDialogOpen = true;
        },

        deleteItem(item) {
            const index = this.contracts.indexOf(item);
            confirm('Are you sure you want to delete this contract?') &&
                this.contracts.splice(index, 1) &&
                this.deleteContract(item);
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
                this.updateContract(this.editedItem);
            } else {
                this.employees.forEach(employee => {
                    if (this.editedItem.email === employee.email) {
                        this.editedItem.user_id = employee.id;
                        this.editedItem.name = employee.name;
                        this.editedItem.surname = employee.surname;
                    }
                });
                this.createContract(this.editedItem);
            }
        },

        async createContract(contract) {
            this.areAll = true;
            this.errors_from_server = null;

            Object.keys(contract).forEach(value => {
                if (contract[value] == '' || contract[value] == undefined) {
                    console.log(contract);
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
                delete contract.email;
                delete contract.name;
                delete contract.surname;

                await ContractsServices.addContract(contract);
            } catch (err) {
                this.errors_from_server = err.response.data.errors;
                console.error(err);
            }

            if (!this.error && !this.errors_from_server) {
                this.close();
            }
            this.fetchContracts();
        },

        async updateContract(contract) {
            this.areAll = true;
            this.errors_from_server = null;

            Object.keys(contract).forEach(value => {
                if (contract[value] == '' || contract[value] == undefined) {
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
                delete contract.email;
                delete contract.name;
                delete contract.surname;

                await ContractsServices.updateContract(contract);
            } catch (err) {
                this.errors_from_server = err.response.data.errors;
                console.error(err);
            }
            if (!this.error && !this.errors_from_server) {
                this.close();
            }

            this.fetchContracts();
        },
        async deleteContract(contract) {
            try {
                await ContractsServices.deleteContract(contract);
            } catch (err) {
                console.error(err);
            }

            this.fetchContracts();
        }
    }
};
</script>
