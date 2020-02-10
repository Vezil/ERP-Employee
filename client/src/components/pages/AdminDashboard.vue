<template>
    <v-app class="grey page">
        <div class="container">
            <v-data-table
                :headers="headers"
                :items="employees"
                :sort-by="['id']"
                :sort-desc="['id']"
                @click:row="profile"
                class="elevation-1 table"
                dark
            >
                <template v-slot:item.birthdate="{ item }"
                    >{{ item.birthdate }}
                </template>

                <template v-slot:top>
                    <v-toolbar flat dark>
                        <v-toolbar-title class="table_title"
                            >Your Employees</v-toolbar-title
                        >
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="isDialogOpen" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    color="primary"
                                    dark
                                    class="mb-2 newEmployeeButton"
                                    v-on="on"
                                >
                                    New Employee
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
                                                    name="name"
                                                    v-model="editedItem.name"
                                                    label="Name"
                                                    required
                                                    :rules="[required]"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    type="text"
                                                    name="surname"
                                                    v-model="editedItem.surname"
                                                    label="Surname"
                                                    required
                                                    :rules="[required]"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <template>
                                                    <v-menu
                                                        ref="dateMenuPicker"
                                                        v-model="dateMenuPicker"
                                                        :close-on-content-click="
                                                            false
                                                        "
                                                        transition="scale-transition"
                                                        offset-y
                                                        min-width="290px"
                                                        dark
                                                    >
                                                        <template
                                                            v-slot:activator="{
                                                                on
                                                            }"
                                                        >
                                                            <v-text-field
                                                                v-model="
                                                                    editedItem.birthdate
                                                                "
                                                                label="Birthdate"
                                                                prepend-icon="event"
                                                                readonly
                                                                v-on="on"
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                            ref="picker"
                                                            v-model="
                                                                editedItem.birthdate
                                                            "
                                                            min="1900-01-01"
                                                            max="2019-12-31"
                                                            @change="saveDate"
                                                        ></v-date-picker>
                                                    </v-menu>
                                                </template>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    type="email"
                                                    name="email"
                                                    v-model="editedItem.email"
                                                    label="Email"
                                                    required
                                                    :rules="[required]"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                v-if="editedIndex < 0"
                                                cols="12"
                                                sm="6"
                                                md="4"
                                            >
                                                <v-text-field
                                                    type="password"
                                                    name="password"
                                                    v-model="
                                                        editedItem.password
                                                    "
                                                    label="Password"
                                                    required
                                                    :rules="[required]"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                v-else
                                                cols="12"
                                                sm="6"
                                                md="4"
                                            >
                                                <v-text-field
                                                    type="password"
                                                    name="password"
                                                    v-model="
                                                        editedItem.password
                                                    "
                                                    label="Password (not required)"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <div class="error" v-if="error">
                                            <div>{{ error }}</div>
                                        </div>
                                        <div
                                            class="error"
                                            v-for="(item,
                                            index) in errorsFromServer"
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
                                        class="save"
                                        >Save</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="isDialogProfileOpen" width="500">
                            <v-card>
                                <v-card-title
                                    class="headline grey lighten-2"
                                    primary-title
                                >
                                    <h2
                                        >{{ profileItem.name }}
                                        {{ profileItem.surname }}</h2
                                    >
                                </v-card-title>

                                <v-card-text class="profileInner">
                                    <div class="data">
                                        <div
                                            ><b>Email:</b>
                                            {{ profileItem.email }}</div
                                        >
                                        <div>
                                            Date of Birth:
                                            {{ profileItem.birthdate }}
                                        </div>
                                        <div
                                            >Days off (left):
                                            {{ profileItem.days_left }}</div
                                        >
                                    </div>
                                    <div
                                        class="data"
                                        v-for="oneContract in contractsEmployee"
                                        :key="oneContract.id"
                                    >
                                        <div>
                                            <b>Contract</b> for
                                            {{ oneContract.contract }}
                                            months</div
                                        >
                                        <div
                                            >Start date of this contract:
                                            {{ oneContract.start_date }}</div
                                        >
                                        <div
                                            >Finish date of this contract:
                                            {{ oneContract.finish_date }}</div
                                        >
                                    </div>
                                </v-card-text>

                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="primary"
                                        text
                                        @click="isDialogProfileOpen = false"
                                    >
                                        OK
                                    </v-btn>
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
import config from '../../config';

import EmployeesServices from '../../services/EmployeesService';
import ContractsServices from '../../services/ContractsService';

export default {
    name: 'admindashboard',
    data() {
        return {
            employees: [],
            contractsEmployee: [],
            isDialogOpen: false,
            isDialogProfileOpen: false,
            newPass: false,
            areAll: true,
            dateMenuPicker: false,

            headers: [
                {
                    text: 'Name',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                { text: 'Surname', value: 'surname', sortable: false },
                { text: 'Date of birth', value: 'birthdate', sortable: false },
                { text: 'Email', value: 'email', sortable: false },
                {
                    text: 'Days Off (left)',
                    value: 'days_left',
                    sortable: false
                },
                { text: 'Actions', value: 'action', sortable: false }
            ],
            editedIndex: -1,
            editedItem: {
                name: '',
                surname: '',
                birthdate: '',
                email: '',
                days_left: 0
            },
            profileItem: {
                name: '',
                surname: '',
                birthdate: '',
                email: '',
                days_left: 0,
                contracts: []
            },
            error: null,
            errorsFromServer: null,

            required: value => !!value || 'Required.'
        };
    },

    async mounted() {
        this.fetchEmployees();
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Employee' : 'Edit Employee';
        }
    },

    watch: {
        isDialogOpen(val) {
            val || this.close();
        },
        dateMenuPicker(val) {
            val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'));
        }
    },

    methods: {
        async fetchEmployees() {
            this.employees = (await EmployeesServices.getEmployees()).data;
        },

        editItem(item) {
            this.editedIndex = this.employees.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.editedItem.birthdate = moment(item.birthdate).format(
                config.defaultDateFormat
            );
            this.isDialogOpen = true;
        },

        deleteItem(item) {
            const index = this.employees.indexOf(item);

            this.editedIndex = 2;

            confirm('Are you sure you want to delete this employee?') &&
                this.employees.splice(index, 1) &&
                this.deleteEmployee(item);

            this.fetchEmployees();
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
                this.updateEmployee(this.editedItem);
            } else {
                this.createEmployee(this.editedItem);
            }
        },
        saveDate(date) {
            this.$refs.dateMenuPicker.save(date);
        },

        async profile(user) {
            if (this.editedIndex > 1) {
                this.isDialogProfileOpen = false;
            } else {
                this.isDialogProfileOpen = true;
            }

            this.profileItem.id = user.id;
            this.profileItem.email = user.email;
            this.profileItem.name = user.name;
            this.profileItem.surname = user.surname;
            this.profileItem.birthdate = user.birthdate;
            this.profileItem.days_left = user.days_left;

            try {
                this.contractsEmployee = await ContractsServices.getContractsEmployee(
                    user.id
                );
                this.contractsEmployee = this.contractsEmployee.data;
                this.profileItem.contracts = this.contractsEmployee;
            } catch (err) {
                console.error(err);
            }

            if (this.editedIndex === 2) {
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                }, 300);
            }
        },

        async createEmployee(employee) {
            this.areAll = true;
            this.errorsFromServer = null;
            employee.days_left = 0;

            Object.keys(employee).forEach(value => {
                if (employee[value] === '' || employee[value] === undefined) {
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
                await EmployeesServices.create(employee);
            } catch (err) {
                this.errorsFromServer = err.response.data.errors;
                console.error(err);
            }

            if (!this.error && !this.errorsFromServer) {
                this.close();
            }

            this.fetchEmployees();
        },

        async updateEmployee(employee) {
            this.areAll = true;
            this.errorsFromServer = null;
            employee.days_left = 0;

            Object.keys(employee).forEach(value => {
                if (employee[value] === '' || employee[value] === undefined) {
                    this.areAll = false;
                }
            });

            if (!this.areAll) {
                this.error = 'All fields are required !';
                return;
            }

            if (this.areAll) {
                this.error = null;
            }

            try {
                await EmployeesServices.updateEmployee(employee);
            } catch (err) {
                this.errorsFromServer = err.response.data.errors;
                console.error(err);
            }

            if (!this.error && !this.errorsFromServer) {
                this.close();
            }

            this.fetchEmployees();
        },

        async deleteEmployee(employee) {
            try {
                await EmployeesServices.deleteEmployee(employee);
            } catch (err) {
                console.error(err);
            }
            this.fetchEmployees();
        }
    }
};
</script>
<style>
.error {
    padding: 12px;
    color: black;
}
.profileInner {
    margin-bottom: 10px;
    margin-top: 50px;
}
.data {
    border: 4px dashed rgb(54, 80, 54);
    border-top: 0px;
    font-size: 20px;
    padding: 20px;
}
.data:first-child {
    border-top: 4px dashed rgb(54, 80, 54);
}
.table:hover {
    cursor: pointer;
}
</style>
