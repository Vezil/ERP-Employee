<template>
    <v-app class="grey page">
        <v-layout column>
            <v-flex xs6>
                <div
                    class="container elevation-3 form"
                    v-on:keyup.enter="login"
                >
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
                    />
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
                    />

                    <br />
                    <br />
                    <div class="error" v-if="error">{{ this.error }}</div>
                    <div
                        class="error"
                        v-for="(item, index) in errorsFromServer"
                        :key="index"
                    >
                        <div>{{ item.message }}</div>
                    </div>
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
    name: 'Login',
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
            error: null,
            errorsFromServer: null
        };
    },
    methods: {
        async login() {
            try {
                if (!this.password || !this.email) {
                    return;
                }

                const { data } = await AuthenticationService.login({
                    email: this.email,
                    password: this.password
                });

                this.$store.dispatch('setUser', data.user);
                this.$store.dispatch('setToken', data.token);
                this.$store.dispatch('setRole', data.user.Roles);

                this.$router.push({
                    name: 'dashboard'
                });
            } catch (error) {
                this.error = 'The server not responding please try again.';

                if (error.response.data.errors) {
                    this.error = '';
                    this.errorsFromServer = error.response.data.errors;
                } else {
                    this.error = error;
                    console.error(error);
                }
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
