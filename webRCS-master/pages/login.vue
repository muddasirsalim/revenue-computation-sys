<template>
    <div class="container px-5">
        <br>
        <div class="row px-4 my-5 py-5">
            <div class="col l8 push-l2 shadow py-4" style="border-radius:50px;padding:50px; 20px;">
                <br>
                <div class="w-100"> <button @click="$router.push('/?identify=true')" class="btn mdi mdi-chevron-left mdi-24px  p-0 btn-flat transparent waves-effect waves-light"></button></div>
                <h1 class="display-4 py-4 text-center archivo-font"><span class="text-primary archivo-font">W</span>ELCOME</h1>
                <div class="divider"></div>
                <div class="row px-5 py-2 pt-5">
                    <div class="col s12 bg-light z-depth-1">
                        <div class="input-field border-bottom-0">
                            <input id="username" type="text" class="validate my-0" v-model="username">
                            <label class="pt-1" for="username">{{ user_type == "staff" ? 'Email' : 'Username' }}</label>
                        </div>
                    </div>
                </div>
                <div class="row px-5 py-2">
                    <div class="col s12 bg-light z-depth-1">
                        <div class="input-field border-bottom-0">
                            <input id="password" type="password" class="validate my-0" v-model="password">
                            <label class="pt-1"  for="password">Enter your Password</label>
                        </div>
                    </div>
                </div>
                <div class="row px-5 py-2">
                    <div class="col s12 px-0">
                        <div v-if="loading" class="progress" style="height:5px">
                            <div class="indeterminate"></div>
                        </div>                    
                        <div v-else>
                            <button
                                @click="login()" class="btn btn-block btn-large btn-primary waves-effect waves-light">Sign in</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <br>

    </div>
        
</template>

<script>

import * as queryString from 'query-string';
const axios = require('axios')

export default {
    data() {
        return {
            username: null,
            password: null,
            username_: "admin", password_: "admin",
            loading: false,
            user_type: null
            
        }
    },
    methods: {
        loginAsStaff() {

            this.firebase_get("users", (users) => {

                let findOne = users.filter(el => el.email == this.username && el.password == this.password)

                if (findOne.length > 0) {

                    M.toast({ html: "Login Successfully" })
                    this.setCookie("rcs-localstorage", findOne[0], 14)                    

                    setTimeout(() => {
                        location.href = "/staff"               
                    }, 1000);



                }

                else {
                    M.toast({ html: "Incorrect Credentials" })

                }


                this.loading = false
            })
        },

        login() {
            
            this.loading = true
            if (this.user_type == "staff") {

                this.loginAsStaff()
                return
            }
            
            if (this.username == this.username_ && this.password == this.password_) {

                M.toast({ html: "Logged In Successfully"})

                this.setCookie("rcs-localstorage", {
                    username: this.username,
                    password: this.password
                })
                
                this.loading = false

                setTimeout(() => {
                    location.href = "/dashboard"
                }, 500);

            } else {
                M.toast({ html: "Incorrect Credentials"})
                this.loading = false

            }


        }
    },

    mounted() {     
        
        let { user } = queryString.parse(window.location.search)

        this.user_type = user

    }
}
</script>

<style>

</style>