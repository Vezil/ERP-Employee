<template>
    <v-app class="grey">
        <v-layout column>
            <v-flex xs6>
                <div class="container white elevation-3 form">
                    <br />
                    <h2>Login</h2>
                    <br />
                    <br />
                    <v-text-field
                        type="email"
                        name="email"
                        v-model="email"
                        placeholder="Email"
                        outlined
                        solo-inverted
                    ></v-text-field>
                    <br />
                    <v-text-field
                        type="password"
                        name="password"
                        v-model="password"
                        placeholder="Password"
                        outlined
                        solo-inverted
                    ></v-text-field>
                    <br />
                    <br />
                    <div class="error" v-if="error"></div>
                    <br />
                    <v-btn class="cyan" @click="login">Login</v-btn>
                </div>
            </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
import AuthenticationService from '../../services/AuthenticationService';
export default {
    name: 'NewEmployee',
    data() {
        return {
            email: '',
            password: '',
            error: null
        };
    },
    methods: {
        async login() {
            try {
                const response = await AuthenticationService.login({
                    email: this.email,
                    password: this.password
                });
                this.$store.dispatch('setUser', response.data.employee);
                this.$store.dispatch('setToken', response.data.token);

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
    margin-top: 2%;
    text-align: center;
    padding: 20px;
    background-color: aqua;
}
</style>