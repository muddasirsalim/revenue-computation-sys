<template>
    <div class="container">
        <div class="row">
            <div class="row mx-0 px-4">
                <h2 class="col pt-4 s12 mb-0 pb-0">Submit your complaint to your Admin</h2>
                <p class="col pb-4 pt-2 text-super-light s12">
                    <span class="mdi mdi-information-outline"></span>
                    Once Your complaint is submitted, Admin will review your complaint and will notice you.
                </p>
                <div class="col s12">
                    <div class="bg-light px-3 py-1">
                        <div class="input-field border-bottom-0">
                            <input id="id" type="text" class="validate my-0" v-model="user.toll.id" placeholder="TollBooth #ID" disabled>
                        </div>
                    </div>
                </div>
                <div class="col s12 my-2"></div>
                <div class="col s12">
                    <div class="bg-light px-3 py-1">
                        <div class="input-field border-bottom-0">
                            <textarea id="textarea1" class="materialize-textarea" v-model="complaint_details"></textarea>
                            <label for="textarea1">Enter Details</label>                            
                        </div>
                    </div>
                </div>
                <div class="col s12 my-2"></div>
                <div class="col s12 text-right">
                    <div v-if="loading" class="progress" style="height:5px">
                        <div class="indeterminate"></div>
                    </div>                    
                    <button v-else @click="submit_complaint()" class="btn btn-large btn-success px-5">Submit Complaint</button>    
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
            complaint_details: null,
            user: {
                toll: {}
            }
        }
    },

    methods: {
        submit_complaint() {

            if (!this.user.key) {
                M.toast({ html: "User is not Authenticated"} )
            }

            let { day, month, year} = this.dateV2()
            let time = this.getTime()
            let date = day + "th " + month + ", " + year

            let ref = "complaints",
                obj = {

                    user_key: this.user.key,
                    toll_key: this.user.toll.key,
                    toll_id: this.user.toll.id,
                    email: this.user.email,
                    username: this.user.username,
                    date: date,
                    time: time,
                    complaint_details: this.complaint_details,
                    complaint_type: "ordinary",
                    hide_details: true
                }
                
            if (! navigator.onLine) {
                M.toast({ html: "You are Offline!" })
                return
            }

            this.loading = true

            this.firebase_push_db({ ref, obj }, (res) => {

                console.log(res, 'my-response.')
                this.loading = false
                M.toast({ html: "Complaint Added Successfully!" })
            },
            (err) => {
                M.toast({ html: err })
                console.log(err, 'my-error')
            })                

        }
    },

    mounted() {
        
        this.user = this.getCookie("rcs-localstorage")

        console.log(this.user, 'user')
    }

}
</script>

<style>

</style>