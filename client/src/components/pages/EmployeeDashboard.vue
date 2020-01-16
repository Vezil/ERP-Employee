<template>
    <v-app class="grey">
        <div class="container">
            <h1
                v-if="$store.state.user.days_left>0"
            >You still have {{$store.state.user.days_left}} days off !</h1>
            <h1 v-else>You don't have more days off !</h1>
        </div>
    </v-app>
</template>

<script>
export default {
    name: 'employeedashboard',
    components: {
        // HelloWorld
    },
    data() {
        return {};
    }
};
</script>
<style>
.error {
    padding: 12px;
    color: black;
}
</style>
