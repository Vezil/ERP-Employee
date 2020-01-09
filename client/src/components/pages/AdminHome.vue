<template>
    <v-app class="grey">
        <div class="container">
            <v-data-table :headers="headers" :items="employees" class="elevation-1" dark>
                <template v-slot:top>
                    <v-toolbar flat dark>
                        <v-toolbar-title>Your Employees</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark class="mb-2" v-on="on">New Employee</v-btn>
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
                                                    v-model="editedItem.name"
                                                    label="Name"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    v-model="editedItem.surname"
                                                    label="Surname"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    v-model="editedItem.birthdate"
                                                    label="Birthdate"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    v-model="editedItem.email"
                                                    label="Email"
                                                ></v-text-field>
                                            </v-col>
                                            <!-- <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    v-model="editedItem.contract"
                                                    label="Contract"
                                                ></v-text-field>
                                            </v-col>-->
                                        </v-row>
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
    name: 'adminhome',
    components: {
        // HelloWorld
    },
    data() {
        return {
            employees: [],
            dialog: false,
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
                { text: 'Contract', value: 'contract', sortable: false },
                { text: 'Days Left', value: 'daysoff', sortable: false },
                { text: 'Actions', value: 'action', sortable: false }
            ],
            editedIndex: -1,
            editedItem: {
                name: '',
                surname: '',
                birthdate: '',
                email: ''
                // contract: '',
                // daysoff: ''
            },
            defaultItem: {
                name: '',
                surname: '',
                birthdate: '',
                email: ''
                // contract: '',
                // daysoff: ''
            }
        };
    },
    async mounted() {
        this.employees = (await AdminServices.getAllEmployees()).data;
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
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
                this.employees.splice(index, 1);
        },

        close() {
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
                    this.editedItem
                );
            } else {
                this.employees.push(this.editedItem);
            }
            this.close();
        }
    }
};
</script>
<style>
/* .local_container {
    margin-left: auto;
    margin: auto;
    text-align: center;
    color: rgb(8, 1, 1);
} */
</style>
