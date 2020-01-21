<template>
    <v-app class="grey page">
        <v-layout column>
            <v-flex xs6>
                <div class="container elevation-3 form">
                    <br />
                    <h2>Login</h2>
                    <br />
                    <br />
                    <v-text-field
                        class="login"
                        type="email"
                        name="email"
                        v-model="email"
                        placeholder="Email"
                        outlined
                        solo-inverted
                        :rules="emailRules"
                    ></v-text-field>
                    <br />
                    <v-text-field
                        class="login"
                        type="password"
                        name="password"
                        v-model="password"
                        placeholder="Password"
                        outlined
                        solo-inverted
                        :rules="passwordRules"
                    ></v-text-field>
                    <br />
                    <br />
                    <div class="error" v-if="error">{{ this.error }}</div>
                    <br />
                    <v-btn class="cyan" @click="login">Login</v-btn>
                </div>
            </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
import AuthenticationService from '../../services/AuthenticationService';
import Axios from 'axios';
import { store } from '../../store';
export default {
    name: 'NewEmployee',
    data() {
        return {
            emailRules: [
                v => !!v || 'E-mail is required',
                v =>
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                        v
                    ) || 'E-mail must be valid'
            ],
            passwordRules: [v => v.length > 7 || 'Minimum 8 characters'],
            email: '',
            password: '',
            error: null
        };
    },
    methods: {
        async login() {
            try {
                const { data } = await AuthenticationService.login({
                    email: this.email,
                    password: this.password
                });

                this.$store.dispatch('setUser', data.employee);
                this.$store.dispatch('setToken', data.token);

                this.$router.push({
                    name: 'dashboard'
                });
            } catch (error) {
                this.error = error.response.data.error;
                console.error(error);
            }
        }
    }
};
</script>

<style>
.form {
    max-width: 900px;
    margin-top: 4%;
    text-align: center;
    padding: 20px;
    background-color: rgb(168, 203, 209);
    color: rgb(0, 0, 0);
}
</style>
