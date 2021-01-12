<template>
    <div class="container py-5">
        <div class="row">
            <div class="row mx-0 px-4">
                <h2 class="col py-4 s12 font-weight-bold" v-if="record.Class">Record Details</h2>
                <div class="col s12 m7 border-right px-4">
                    <div class="col s12" v-if="record.Class">

                        <h6 class="py-2 d-flex align-items-center justify-content-between"><strong class="font-weight-bold pr-2">Vehicle Type: </strong> <span>
                            <input type="text" name="" v-model="record.Class" style="max-width:350px" class="text-center text-capitalize tooltipped" disabled data-position="bottom" :data-tooltip="record.Class">

                        </span></h6>
                        <h6 class="py-2 d-flex align-items-center justify-content-between"><strong class="font-weight-bold pr-2">Vehicle Plate: </strong> 
                            <input type="text" name="" v-model="record.plate" style="max-width:150px" class="text-center tooltipped" data-position="bottom" :data-tooltip="record.plate">
                        </h6>
                        <h6 class="py-2 d-flex align-items-center justify-content-between"><strong class="font-weight-bold pr-2">Vehicle Tax: </strong> <span> 
                            <input type="text" name="" v-model="record.tax" style="max-width:150px" class="text-center tooltipped" disabled data-position="bottom" :data-tooltip="record.tax">
                            </span></h6>
                        <h6 class="py-2 d-flex align-items-center justify-content-between"><strong class="font-weight-bold pr-2">Time Of Record: </strong> 
                            <span class="text-right">
                                <span class="text-success font-weight-bold"><span class="mdi mdi-clock"></span> {{ this.time_ }}: 00</span> <br>
                                <span class="font-weight-bold">{{ this.date_ }}</span>
                            </span>
                        </h6>
                    </div>
                    <h1 v-else class="text-center">
                        <span class="mdi mdi-shield-alert-outline text-danger mdi-48px"></span> <br>
                        <span class="small">No Detected Vechile Found</span>
                    </h1>

                </div>
                <div class="col s12 m5">
                    <h5 class="py-2 d-flex pb-5 align-items-center justify-content-between"><strong class="font-weight-bold pr-2 text-success">Collect Amount: </strong> <span>
                        <input type="text" name="" v-model="amount_collected" style="max-width:150px" class="text-center">
                         </span></h5>
                    <div class="divider mx-4"></div>
                    <div class="w-100 text-right py-5">
                        <div v-if="loading" class="progress" style="height:5px">
                            <div class="indeterminate"></div>
                        </div>                    
                        <button @click="create()" class="btn btn-success shadow btn-large px-5 waves-effect waves-light">
                            <span class=" d-flex align-items-center">
                                <span class="mdi mdi-cash-check px-2 mdi-24px"></span>
                                Collect
                            </span>
                        </button>
                    </div>
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
            date_: null, time_: null,
            vechile_type: "Toyota Corolla, 2002",
            vechile_plate: "IDF - 1213",
            vechile_tax: "Rs. 100 PKR",
            amount_collected: "Rs. 0 PKR",
            user: {},
            record: {},
            tax: {}
        }
    },

    methods: {
        submitComplaintFirst(obj) {

            let complaint_details = `

                There are some Corrupt Case Been detected in the Toll Booth <b><mark>${obj.toll_id}</mark></b> <br>
                The Vechile with the number plate <b><mark>${obj.vechile_plate}</mark></b> has tax of <b><mark>${obj.vechile_tax}</mark></b> <br>
                but the collected amount was <b><mark>${obj.amount_collected}</mark></b>. 
            `

            let { day, month, year} = this.dateV2()
            let time = this.getTime()
            let date = day + "th " + month + ", " + year

            let ref = "complaints",
                complaintObj = {

                    user_key: this.user.key,
                    toll_key: this.user.toll.key,
                    toll_id: this.user.toll.id,
                    email: this.user.email,
                    username: this.user.username,
                    date: date,
                    time: time,
                    complaint_details: complaint_details,
                    complaint_type: "corrupt",
                    hide_details: true
                }
                
            if (! navigator.onLine) {
                M.toast({ html: "You are Offline!" })
                return
            }
            
            this.firebase_push_db({ ref, obj: complaintObj }, (res) => {

                console.log(res, 'my-response.')
                M.toast({ html: "Complaint Added Successfully!" })

                this.createRecord(obj)
            },
            (err) => {
                M.toast({ html: err })
                console.log(err, 'my-error')
            })                 

        },
        createRecord(obj) {
            
            let ref = "records"

            if (! navigator.onLine) {
                M.toast({ html: "You are Offline!" })
                return
            }

            this.firebase_push_db({ ref, obj }, (res) => {

                console.log(res, 'my-response.')
                this.loading = false
                M.toast({ html: "Record Added Successfully!" })
                M.toast({ html: "Removing Record From Detected" })

                this.firebase_remove_one("detected/" + this.record.key, (response) => {
                    
                    M.toast({ html: "Record Removed" })                    
                    this.record = {}
                    this.amount_collected = null
                    this.getDetectedVechile()

                })                
                // this.$emit("record_added")
            },
            (err) => {
                M.toast({ html: err })
                console.log(err, 'my-error')
            })


        },
        create() {

            if (!this.user.toll.key || !this.user.toll.id) {

                M.toast({ html: "User do not have any Tollbooth" })
                return
            }

            if (!this.record.Class || !this.record.plate || !this.record.tax) {
                M.toast({ html: "No Detected Vechile Found" })
                return

            }

            this.loading = true

            let obj = {
                    vechile_type: this.record.Class,
                    vechile_plate: this.record.plate,
                    vechile_tax: this.record.tax,
                    amount_collected: this.amount_collected,
                    date: this.date_,
                    time: this.time_,
                    toll_id: this.user.toll.id,
                    toll_key: this.user.toll.key
                }

            let collected = parseInt(this.amount_collected.match( /\d+/g ).join('')),
                vechile_tax = parseInt(this.vechile_tax.match( /\d+/g ).join('')) 

            if (vechile_tax !== collected) {

                this.submitComplaintFirst(obj)

            } else {

                this.createRecord(obj)
            }


        },

        getDetectedVechile() {

            M.toast({ html: "Fetching Detected Vechile" })

            this.firebase_get("/detected", (response) => {

                if (response.length == 0) {

                    M.toast({ html: " No Detected Vechiles Found!" })

                    return
                } 

                this.record = response.shift()

                let tax = this.tax[this.record.Class]

                this.record["plate"] = "IDF - 2233"
                this.record["tax"] = `Rs. ${tax} PKR`
                this.amount_collected = `Rs. ${tax} PKR`

            })
        }
    },

    mounted() {

        let { day, month, year} = this.dateV2()
        this.time_ = this.getTime()
        this.date_ = day + "th " + month + ", " + year
        let user = this.getCookie("rcs-localstorage")

        this.tax = {

            truck: 200,
            car: 100
        }

        if (user) {

            this.firebase_get_one("users/" + user.key, (res) => {                
                this.user = res
            })

        }

        this.getDetectedVechile()

        $(document).ready(function(){
            $('.tooltipped').tooltip();
        });



    }

}
</script>

<style>

</style>