<template>
    <v-app class="grey page">
        <v-layout column>
            <v-flex xs6>
                <div
                    class="container elevation-3 form"
                    v-on:keyup.enter="changePassword"
                >
                    <br />
                    <h2>Change your password</h2>
                    <br />
                    <br />
                    <v-text-field
                        type="password"
                        name="oldPassword"
                        placeholder="Old password"
                        outlined
                        v-model="oldPassword"
                        solo-inverted
                        :rules="passwordRules"
                    ></v-text-field>
                    <br />
                    <v-text-field
                        type="password"
                        name="newPassword"
                        placeholder="New password"
                        outlined
                        v-model="newPassword"
                        solo-inverted
                        :rules="passwordRules"
                    ></v-text-field>
                    <br />
                    <v-text-field
                        type="password"
                        name="newPasswordRepeat"
                        placeholder="Repeat new password"
                        outlined
                        v-model="newPasswordRepeat"
                        solo-inverted
                        :rules="passwordRules"
                    ></v-text-field>
                    <br />
                    <br />
                    <div
                        class="error"
                        v-for="(item, index) in errorsFromServer"
                        :key="index"
                    >
                        <div>{{ item }}</div>
                    </div>
                    <div class="success" v-if="succes">
                        <v-alert type="success">
                            Password has changed correctly
                        </v-alert>
                    </div>
                    <br />
                    <v-btn class="orange darken-3" @click="changePassword"
                        >Change</v-btn
                    >
                </div>
            </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
import ChangePasswordService from '../../services/ChangePasswordService';

export default {
    name: 'ChangePassword',

    data() {
        return {
            errorsFromServer: null,
            succes: null,
            passwordRules: [v => v.length > 7 || 'Minimum 8 characters'],
            oldPassword: '',
            newPassword: '',
            newPasswordRepeat: ''
        };
    },
    methods: {
        async changePassword() {
            const request = {
                oldPassword: this.oldPassword,
                newPassword: this.newPassword,
                newPasswordRepeat: this.newPasswordRepeat
            };

            try {
                await ChangePasswordService.changePassword(request);
                this.errorsFromServer = null;
                this.succes = true;
            } catch (err) {
                this.succes = null;
                this.errorsFromServer = err.response.data;
                console.error(err);
            }
        }
    }
};
</script>

<style scoped>
.form {
    max-width: 900px;
    margin-top: 4%;
    text-align: center;
    padding: 20px;
    background-color: rgb(62, 122, 87);
    color: black;
}
</style>
