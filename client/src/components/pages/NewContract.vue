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
                        v-model="start"
                        placeholder="Date of start contract"
                        outlined
                        solo-inverted
                    ></v-text-field>
                    <br />
                    <v-text-field
                        type="number"
                        name="duration"
                        v-model="duration"
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
                        v-model="vacation"
                        placeholder="Vacation days"
                        outlined
                        solo-inverted
                        min="0"
                        max="26"
                    ></v-text-field>
                    <br />
                    <br />
                    <div class="error" v-html="error"></div>
                    <br />
                    <v-btn class="cyan">Add</v-btn>
                </div>
            </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
export default {
    name: 'NewContract',
    data() {
        return {
            email: '',
            start: '',
            duration: '',
            vacation: '',
            error: ''
        };
    }
};
</script>
<style scoped>
</style>
