<template>
    <div class="container">
        <div class="row">
            <div class="row mx-0 px-4">
                <h2 class="col py-4 s12 font-weight-bold">Enter User Email</h2>
                <div class="col s12">
                    <div class="bg-light px-3 py-1 mb-2 mb-md-0">
                        <div class="input-field border-bottom-0">
                            <input @keyup="search()" @blur="hideResult()" id="email" type="text" class="validate my-0" v-model="email" autocomplete="off" placeholder="Start typing to see sugguestion">
                            <label for="email" class="pt-1"></label>
                        </div>
                    </div>
                    <div class="w-100">
                        <button @click="email = user.email, key = user.key" :key="i" v-for="(user, i) in filterSearch" class="btn btn-flat transparent border-bottom bd-radius-0 btn-block btn-large text-left">
                            <span v-html="highlight(user.email)"></span>
                        </button>
                    </div>
                </div>
                <div class="col s12 my-4"></div>
                <div class="col s12 text-right">
                    <div v-if="loading" class="progress" style="height:5px">
                        <div class="indeterminate"></div>
                    </div>                    
                    <button v-else @click="deleteUser()" :disabled="!email" class="btn btn-large btn-primary px-5">Delete User</button>    
                </div>                
            </div>
        </div>        
    </div>
</template>

<script>
export default {

    data() {
        return {
            users: [],
            filterSearch: [],
            loading: false,
            email: null,
            key: null
        }
    },

    methods: {
        hideResult() {
            setTimeout(() => {
                this.filterSearch = []
            
            }, 500);
        },
        highlight(str) {
            return str.split(this.email).join("<mark>"+this.email+"</mark>")
        },
        search() {
            let $this = this
            this.filterSearch = this.users.filter(function(el) {
                return el.email.toLowerCase().includes($this.email.toLowerCase())
            })

        },  

        deleteUser() {
            let ref = "users/" + this.key

            M.toast({ html: "Please Wait..." })


            if (! navigator.onLine) {
                M.toast({ html: "You are Offline!" })
                return
            }

            this.firebase_remove_one(ref, (res) => {
                M.toast({ html: "User Deleted Successfully" })
            },
            (err) => {
                M.toast({ html: err })
                console.log(err, 'my-error')
            })
        }
    },

    mounted() {
        
        this.firebase_get("users", (res) => {
            this.loading = false
            this.users = res

        })
    }

}
</script>

<style>

</style>