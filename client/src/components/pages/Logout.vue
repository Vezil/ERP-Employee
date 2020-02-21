<template>
    <v-app class="page"></v-app>
</template>
<script>
export default {
    name: 'logout',
    mounted() {
        this.logout();
    },
    methods: {
        logout() {
            this.$store.dispatch('unsetStorage');

            this.$router.push({
                name: 'login'
            });
        }
    }
};
</script>
