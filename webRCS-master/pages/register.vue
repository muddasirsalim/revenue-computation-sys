<template>
    <div class="container">
        <div class="row shadow px-4 my-5 py-5">
            <h2 class="col s12 m6 push-m3 archivo-font text-center pt-4 pb-5">
                Hello, <span class="text-primary archivo-font">Join</span> FixthatDevice for Free and Create your Account
            </h2>

            <div class="col s12 my-3"></div>
            <div class="col s6 m4 push-m2">
                <p class="text-center">
                <label>
                    <input name="user-type" type="radio" checked v-model="userType" value="customer"  />
                    <span>Customer</span>
                </label>
                </p>
            </div>
            <div class="col s6 m4 push-m2">
                <p class="text-center">
                <label>
                    <input name="user-type" type="radio" v-model="userType" value="store_owner" />
                    <span>Store Owner</span>
                </label>
                </p>            
            </div>
            <div class="col s12 my-3"></div>

            <div class="row">
                <div class="col s12 m4 push-m2 bg-light mr-2 mb-2 position-relative">
                    <div class="input-field border-bottom-0">
                        <input @keyup="validateName(fname)" id="fname" type="text" class="validate my-0" v-model="fname.model">
                        <label for="fname" class="pt-1">{{ fname.label }} <strong v-if="fname.error" class="text-danger font-weight-bold transition">({{ fname.error }})</strong></label>
                    </div>
                </div>
                <div class="col s12 m4 push-m2 bg-light">
                    <div class="input-field border-bottom-0">
                        <input @keyup="validateName(lname)" id="lname" type="text" class="validate my-0" v-model="lname.model">
                        <label for="lname" class="pt-1">{{ lname.label }} <strong v-if="lname.error" class="text-danger font-weight-bold transition">({{ lname.error }})</strong></label>
                    </div>
                </div>
            </div>
            <div class="row mt-0 mt-md-4">
                <div class="col s12 m8 push-m2 bg-light ml-0">
                    <div class="input-field border-bottom-0">
                        <input @keyup="validatePhoneNumber(cell)" id="cell" type="number" class="validate my-0" v-model="cell.model">
                        <label for="cell" class="pt-1">{{cell.label}} <strong v-if="cell.error" class="text-danger font-weight-bold transition">({{ cell.error }})</strong></label>
                    </div>
                </div>
                <div class="col s12 m8 push-m2 bg-light ml-0 my-4">
                    <div class="input-field border-bottom-0">
                        <input @keyup="validateEmail(email)" id="email" type="email" class="validate my-0" v-model="email.model">
                        <label for="email" class="pt-1">{{ email.label }} <strong v-if="email.error" class="text-danger font-weight-bold transition">({{ email.error }})</strong></label>
                    </div>
                </div>
                <div class="col s12 m4 push-m2 bg-light mr-2 mb-2">
                    <div class="input-field border-bottom-0">
                        <input @blur="confirmPassword(password, confirmedPassword)" id="password" type="password" class="validate my-0" v-model="password.model">
                        <label for="password" class="pt-1">{{ password.label }} <strong v-if="password.error" class="text-danger font-weight-bold transition">({{ password.error }})</strong></label>
                    </div>
                </div>
                <div class="col s12 m4 push-m2 bg-light">
                    <div class="input-field border-bottom-0">
                        <input @blur="confirmPassword(password, confirmedPassword)" id="confirm-password" type="password" class="validate my-0" v-model="confirmedPassword.model" required>
                        <label for="confirm-password" class="pt-1">{{ confirmedPassword.label }}</label>
                    </div>
                </div>                
            </div>
            <div class="row">
                <p class="col s12 m7 push-m2 px-0">
                    <label>
                        <input type="checkbox" class="filled-in" />
                        <span>Keep me signed in until I signed out</span>
                    </label>
                </p>      
                <p class="col s12 m3 text-right text-primary text-sm">Forget Password?</p>          
            </div>
            <div class="row">
                <div class="col s12 m8 push-m2">
                    <div v-if="loading" class="progress" style="height:5px">
                        <div class="indeterminate"></div>
                    </div>                    
                    <div v-else>
                        <button 
                        :disabled="!fname.model || !lname.model || !cell.model || !email.model || !password.model || !confirmedPassword.model"
                        @click="signup()" class="btn btn-block btn-primary waves-effect waves-light">Sign up</button>
                        <p class="w-100 my-4 text-center">Or</p>
                        <button class="btn btn-block red text-white waves-effect waves-light">
                            <span class="mdi mdi-google mx-2"></span>
                            <span>Sign in with Google</span>
                        </button>
                        <button class="btn btn-block indigo darken-1 btn-primary waves-effect waves-light px-0">
                            <span class="mdi mdi-facebook mx-2"></span>
                            <span>Sign in with Facebook</span>                        
                        </button>
                        <div class="divider my-5"></div>
                        <p class="w-100 my-4 text-center">Already have an account? <nuxt-link to="/login" class="text-primary wave-effect waves-light">Sign in!</nuxt-link></p>
                    </div>
                </div>
            </div>
        </div>

    </div>
        
</template>

<script>
import googleLogo from '../assets/svg/google-register.svg'
import facebookLogo from '../assets/svg/facebook-register.svg'

const axios = require('axios')

export default {
    data() {
        return {
            googleLogo: googleLogo,
            facebookLogo: facebookLogo,

            loading: false,

            userType: "customer", 
            email: { model: "kamrankpk1998@gmail.com", label: "Email", error: "" },
            password: { model: "12345", label: "Password", error: ""  },
            confirmedPassword: { model: "12345", label: "Confirm Password" },
            cell: { model: "12345678910", label: "Cell Number", error: "" },
            fname: { model: "Kamran", label: "First Name", error: "" },
            lname: { model: "Khan", label: "Last Name", error: "" }
        }
    },
    methods: {
        signup() {
            
            if (!this.email.error && !this.password.error && !this.cell.error && !this.fname.error && !this.lname.error) {

                this.loading = true
                let data = {
                    email: this.email.model,
                    password: this.password.model,
                    first_name: this.fname.model,
                    last_name: this.lname.model,
                    cell_number: this.cell.model,
                    user_type: this.userType,
                    login_type: "normal"

                }

                axios.post("https://fixthatdevice-backend.herokuapp.com/user/signup_user", data)
                .then(res => {
                    this.loading = false

                    if(!res.data.status) {
                        M.toast({html: res.data.message})

                    } else {
                        M.toast({ html: res.data.message })

                        this.setCookie('fixthatdevice-localstorage', res.data.data , 14)

                        setTimeout(() => {
                            this.$router.push('/login')
                        }, 500);

                    }

                })                
                .catch(err => {
                    console.log(err.response)
                    this.loading = false
                })

            }

        }
    },
    mounted() {

        console.log(this.getCookie('fixthatdevice-localstorage'))

    }
}
</script>

<style>

</style>