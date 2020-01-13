<template>
    <v-app class="grey">
        <v-layout column>
            <v-flex xs6>
                <div class="container white elevation-3 form">
                    <br />
                    <h2>Add New Contract</h2>
                    <br />
                    <br />
                    <v-text-field
                        type="email"
                        name="email"
                        v-model="email"
                        placeholder="Email of employee"
                        outlined
                        solo-inverted
                    ></v-text-field>
                    <br />
                    <v-text-field
                        type="text"
                        onfocus="(this.type='date')"
                        name="start"
                        v-model="newContract.start_date"
                        placeholder="Date of start contract"
                        outlined
                        solo-inverted
                    ></v-text-field>
                    <br />
                    <v-text-field
                        type="text"
                        onfocus="(this.type='date')"
                        name="finish"
                        v-model="newContract.finish_date"
                        placeholder="Date of finish contract"
                        outlined
                        solo-inverted
                    ></v-text-field>
                    <br />
                    <v-text-field
                        type="number"
                        name="duration"
                        v-model="newContract.contract"
                        placeholder="Duration of the contract (in month)"
                        outlined
                        solo-inverted
                        min="1"
                        max="12"
                    ></v-text-field>
                    <br />
                    <v-text-field
                        type="number"
                        name="vacation"
                        v-model="newHolidays.days_left"
                        placeholder="Vacation days"
                        outlined
                        solo-inverted
                        min="0"
                        max="26"
                    ></v-text-field>
                    <br />
                    <br />
                    <div class="error" v-if="error"></div>
                    <br />
                    <v-btn class="cyan" @click="getThisEmployee(email)">Add</v-btn>
                </div>
            </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
import { METHODS } from 'http';
import AdminServices from '../../services/AdminService';
export default {
    name: 'NewContract',
    data() {
        return {
            email: '',
            newContract: {
                contract: '',
                start_date: '',
                finish_date: '',
                employeeId: ''
            },
            newHolidays: {
                days_left: '',
                start_date: null,
                finish_date: null,
                employeeId: ''
            },

            error: null
        };
    },
    methods: {
        async getThisEmployee(email) {
            try {
                const emailFromResponse = await AdminServices.getOneEmployee(
                    email
                );
                const id = emailFromResponse.data.id;
                this.newContract.employeeId = id;
                this.newHolidays.employeeId = id;

                this.createContract(this.newContract);
                this.createHolidays(this.newHolidays);
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
                await AdminServices.addHolidays(holidays);
            } catch (err) {
                console.error(err);
            }
        }
    }
};
</script>
<style scoped>
</style>
