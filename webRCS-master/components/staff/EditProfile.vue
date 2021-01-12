<template>
    <div class="container">
        <div class="row">
            <div class="row mx-0 px-4">
                <h2 class="col py-4 s12 font-weight-bold">Your Information</h2>

                <div class="col s12 m6">
                    <div class="bg-light px-3 py-1 mb-2 mb-md-0">
                        <div class="input-field border-bottom-0">
                            <input type="text" id="email" v-model="email" autocomplete="off" disabled>
                        </div>
                    </div>
                </div>
                <div class="col s12 m6">
                    <div class="bg-light px-3 py-1">
                        <div class="input-field border-bottom-0">
                            <input id="username" type="text" class="validate my-0" v-model="username">
                            <label for="username" class="pt-1">Username</label>
                        </div>
                    </div>
                </div>                
                <div class="col s12 my-2"></div>

                <div class="col s12">
                    <div class="bg-light px-3 py-1 mb-2 mb-md-0 d-flex align-items-center justify-content-between">
                        <div class="input-field border-bottom-0 w-100">
                            <input id="password" :type="view_password ? 'text' : 'password'" class="validate my-0 w-100 transition" v-model="password">
                            <label for="password" class="pt-1">Password</label>
                        </div>
                        <button @click="view_password = !view_password" :class="view_password ? 'btn-success' : 'transparent btn-flat'" class="btn waves-effect waves-light transition mdi mdi-eye "></button>
                    </div>
                </div>
                <div class="col s12 my-2"></div>

                <div class="col s12">
                    <div class="bg-light px-3 py-1 mb-2 mb-md-0">
                        <div class="input-field border-bottom-0">
                            <input id="nic" type="text" class="validate my-0" v-model="nic">
                            <label for="nic" class="pt-1">NIC</label>
                        </div>
                    </div>
                </div>
                <div class="col s12 my-4"></div>
                <div class="col s12 text-right">
                    <div v-if="loading" class="progress" style="height:5px">
                        <div class="indeterminate"></div>
                    </div>                    
                    <button v-else @click="update()" :disabled="!username || !email || !password || !nic || !toll" class="btn btn-large btn-success px-5">Update Profile</button>    
                </div>                
            </div>
        </div>        
    </div>
</template>

<script>
export default {

    data() {
        return {
            view_password: false,
            loading: false,
            ownEmail: null,
            id: null, username: null, email: null, password: null, nic: null, toll: {},
            key: null,
        }
    },

    methods: {
        update() {
            let ref = "users/" + this.key,
                obj = {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    nic: this.nic,
                    toll: this.toll,
                }
            

            if (! navigator.onLine) {
                M.toast({ html: "You are Offline!" })
                return
            }

            this.loading = true

            this.firebase_update({ ref, obj }, (res) => {

                this.loading = false
                M.toast({ html: "User Updated Successfully!" })
            },
            (err) => {
                M.toast({ html: err })
                console.log(err, 'my-error')
            })

        }
    },

    mounted() {

        let user = this.getCookie("rcs-localstorage")

        if (user) {

            this.firebase_get_one("users/" + user.key, (res) => {
                
                this.email = res.email
                this.username = res.username
                this.password = res.password
                this.nic = res.nic
                this.key = res.key
                this.toll = res.toll                 
            })

        }

    }

}
</script>

<style>

</style>