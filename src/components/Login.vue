<template>
    <div class="login container col-6">
        <div class="row justify-content-around">
            <div class="col-4">
                <form @submit.prevent="login(user);user = {};">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input class="form-control" type="email" id="email" v-model="user.email">
                        <label for="password">Password</label>
                        <input class="form-control" type="password" id="password" v-model="user.password">
                    </div>
                    <button class="btn btn-outline-dark" type="submit">Login</button>
                </form>
                <p>Not a user?
                    <em class="btn btn-link" @click="toggle">Register</em>
                </p>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                user: {}
            }
        },
        computed: {},
        methods: {
            login(user) {
                this.$store.dispatch('login', user)
            },
            toggle() {
                this.$router.push("register")
            }
        },
        components: {}
    }
</script>

<style>
    .login {
        background-color: #dadee3;
        border-radius: 15px 150px;
    }
</style>