<template>
    <v-app class="grey">
        <div class="container">
            <v-data-table :headers="headers" :items="contracts" class="elevation-1" dark>
                <template v-slot:top>
                    <v-toolbar flat dark>
                        <v-toolbar-title>Contracts</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark class="mb-2" v-on="on">
                                    New Contract
                                    <v-icon>add</v-icon>
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-select v-bind:items="employee"></v-select>
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
                    text: 'Start date of contrant',
                    value: 'start_date',
                    sortable: false
                },
                {
                    text: 'Finish date of contrant',
                    value: 'finish_date',
                    sortable: false
                },
                { text: 'Actions', value: 'action', sortable: false }
            ],
            editedIndex: -1,
            editedItem: {
                // name: '',
                // surname: '',
                // email: '',
                contract: '',
                start_date: '',
                finish_date: ''
            },

            newContract: {
                // name: '',
                // surname: '',
                // email: '',
                contract: '',
                start_date: '',
                finish_date: '',
                employeeId: ''
            },

            required: value => !!value || 'Required.',
            error: null
        };
    },
    async mounted() {
        this.contracts = (await AdminServices.getAllContracts()).data;
        this.employees = (await AdminServices.getAllEmployees()).data;

        this.contracts.forEach(contract => {
            this.getThisEmployee(contract, contract.employeeId);
        });

        let i = 0;
        this.employees.forEach(one => {
            this.employee[i] =
                '' + one.name + ' ' + one.surname + '  |  ' + one.email + '';
            i++;
        });

        console.log(this.employee);
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
                const person = await AdminServices.getOneEmployee(id);
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
                    this.editedItem
                    // this.updateContract(this.editedItem)
                );
            } else {
                this.contracts.push(this.editedItem);
                this.createContract(this.editedItem);
            }
            if (!this.error) {
                this.close();
            }
        },
        async createContract(contract) {
            try {
                await AdminServices.addContract(contract);
            } catch (err) {
                console.error(err);
            }
        }
    }
};
</script>
<style scoped>
</style>
