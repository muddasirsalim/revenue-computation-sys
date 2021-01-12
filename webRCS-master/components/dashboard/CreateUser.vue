<template>
    <div class="container">
        <div class="row">
            <div class="row mx-0 px-4">
                <h2 class="col py-4 s12 font-weight-bold">User Details</h2>
                <div class="col s12">
                    <div class="bg-light px-3 py-1 mb-2 mb-md-0">
                        <div class="input-field border-bottom-0">
                            <select @change="selectTollbooth($event)">
                                <option value="" disabled selected>Choose your Tollbooth</option>
                                <option v-for="(tollbooth, i) in tollbooths" :key="i" :value="tollbooth.id"  v-text="tollbooth.id + ' - ' + tollbooth.name"></option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col s12 my-2"></div>
                <div class="col s12 m6">
                    <div class="bg-light px-3 py-1">
                        <div class="input-field border-bottom-0">
                            <input id="username" type="text" class="validate my-0" v-model="username">
                            <label for="username" class="pt-1">Username</label>
                        </div>
                    </div>
                </div>
                <div class="col s12 m6">
                    <div class="bg-light px-3 py-1">
                        <div class="input-field border-bottom-0">
                            <input id="email" type="text" class="validate my-0" v-model="email">
                            <label for="email" class="pt-1">Email</label>
                        </div>
                    </div>
                </div>
                <div class="col s12 my-2"></div>

                <div class="col s12">
                    <div class="bg-light px-3 py-1 mb-2 mb-md-0">
                        <div class="input-field border-bottom-0">
                            <input id="password" type="password" class="validate my-0" v-model="password">
                            <label for="password" class="pt-1">Password</label>
                        </div>
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
                    <button v-else @click="create()" :disabled="!username || !email || !password || !nic || !toll" class="btn btn-large btn-primary px-5">Create User</button>    
                </div>                
            </div>
        </div>        
    </div>
</template>

<script>
export default {

    data() {
        return {
            loading: false,
            users: [],
            id: null, username: null, email: null, password: null, nic: null, toll: null,
            tollbooths: []
        }
    },

    methods: {
        selectTollbooth(e) {
            
            this.id = e.target.value

            let data = this.tollbooths.filter(el => el.id == this.id)[0]

            if (data) {
                this.toll = data
            }

        },
        create() {
            
            if (!this.validateEmail(this.email)) {

                M.toast({ html: "Email Is Invalid"})
                return
            } 

            if (!this.validateName(this.username)) {
                M.toast({ html: "Digits Are not Allowded"})
                return

            }

            if (this.password.length < 4) {
                M.toast({ html: "Password length should be greater than 4."})
                return

            }

            if (this.nic.match( /\d+/g ).join('').length !== 13) {
                M.toast({ html: "User NIC is invalid"})
                M.toast({ html: "NIC should be 13 Digits long"})
                return

            }

            let ref = "users",
                obj = {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    nic: this.nic,
                    toll: this.toll,
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString(),
                }
            
            let user = this.users.filter(el => el.email == this.email)[0]

            if (user) {
                M.toast({ html: "The Email is Already registered!" })
                return
            }

            if (! navigator.onLine) {
                M.toast({ html: "You are Offline!" })
                return
            }

            this.loading = true
            this.firebase_push_db({ ref, obj }, (res) => {

                this.loading = false
                M.toast({ html: "User Created Successfully!" })
                
                this.firebase_get("users", (res) => {
                    this.users = res
                })


            },
            (err) => {
                M.toast({ html: err })
                console.log(err, 'my-error')
            })
        }
    },

    mounted() {
        this.firebase_get("tollbooth", (res) => {
            this.loading = false
            this.tollbooths = res       

            $(document).ready( () => {
                $('select').formSelect();

            });
        })        

        this.firebase_get("users", (res) => {
            this.users = res
        })

        
        
    }

}
</script>

<style>

</style>