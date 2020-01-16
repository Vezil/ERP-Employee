<template>
    <v-app class="grey page">
        <div class="container">
            <v-data-table :headers="headers" :items="employees" class="elevation-1 table" dark>
                <template v-slot:top>
                    <v-toolbar flat dark>
                        <v-toolbar-title class="table_title">Your Employees</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark class="mb-2" v-on="on">
                                    New Employee
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
                                                <v-text-field
                                                    type="text"
                                                    onfocus="(this.type='date')"
                                                    v-model="editedItem.birthdate"
                                                    label="Birthdate"
                                                    required
                                                    :rules="[required]"
                                                ></v-text-field>
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
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    type="password"
                                                    name="password"
                                                    v-model="editedItem.password"
                                                    label="Password"
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
import AdminServices from '../../services/AdminService';

export default {
    name: 'admindashboard',
    components: {
        // HelloWorld
    },
    data() {
        return {
            employees: [],
            holidays: [],
            dialog: false,
            newPass: false,
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
                email: ''
                // days_left: ''
            },
            defaultItem: {
                name: '',
                surname: '',
                birthdate: '',
                email: ''
                // days_left: ''
            },
            error: null,
            required: value => !!value || 'Required.'
        };
    },
    async mounted() {
        this.employees = (await AdminServices.getAllEmployees()).data;
        this.holidays = (await AdminServices.getHolidays()).data;

        this.employees.forEach(employee => {
            let newBirthdate = employee.birthdate;
            newBirthdate = newBirthdate.slice(0, 10);

            employee.birthdate = newBirthdate;
        });
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Employee' : 'Edit Employee';
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        }
    },

    methods: {
        editItem(item) {
            this.editedIndex = this.employees.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            const index = this.employees.indexOf(item);
            confirm('Are you sure you want to delete this employee?') &&
                this.employees.splice(index, 1) &&
                this.deleteEmployee(item);
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
                    this.employees[this.editedIndex],
                    this.editedItem,
                    this.updateEmployee(this.editedItem)
                );
            } else {
                this.employees.push(this.editedItem);
                this.createEmployee(this.editedItem);
            }
            if (!this.error) {
                this.close();
            }
        },
        async createEmployee(employee) {
            const areAll = Object.keys(employee).every(key => !!employee[key]);
            if (!areAll) {
                this.error = 'All fields are required !';
                return;
            }
            if (areAll) {
                this.error = null;
            }
            try {
                await AdminServices.addNewEmployee(employee);
            } catch (err) {
                console.error(err);
            }
        },
        async updateEmployee(employee) {
            const areAll = Object.keys(employee).every(key => !!employee[key]);
            if (!areAll) {
                this.error = 'All fields are required !';
                return;
            }
            if (areAll) {
                this.error = null;
            }
            try {
                const employeeClearUpdate = {
                    id: employee.id,
                    email: employee.email,
                    name: employee.name,
                    surname: employee.surname,
                    birthdate: employee.birthdate
                };
                await AdminServices.updateEmployee(employee);
            } catch (err) {
                console.error(err);
            }
        },
        async deleteEmployee(employee) {
            try {
                await AdminServices.deleteEmployee(employee);
            } catch (err) {
                console.error(err);
            }
        }
    }
};
</script>
<style>
.error {
    padding: 12px;
    color: black;
}
</style>
