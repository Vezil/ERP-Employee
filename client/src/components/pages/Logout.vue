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
            this.$store.dispatch('setToken', null);
            this.$store.dispatch('setUser', null);

            this.$router.push({
                name: 'dashboard'
            });
        }
    }
};
</script>