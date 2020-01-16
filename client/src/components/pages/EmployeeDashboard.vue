<template>
    <v-app class="grey page">
        <div class="container">
            <h1 v-if="$store.state.user.days_left>0">
                You still have
                <b>{{$store.state.user.days_left}}</b> days off !
            </h1>
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
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Arvo|Bangers|Pacifico&display=swap');
.error {
    padding: 12px;
    color: black;
}
b {
    font-family: 'Bangers', cursive;
}
.page {
    margin: auto;
    color: white;
}
</style>
