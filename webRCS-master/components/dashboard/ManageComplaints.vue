<template>
    <div>
        <div class="row p-4">
            <div class="col m6 px-3 py-5">
                <div v-if="!loading">
                    <h2 class="mb-5 text-center">
                        <span class="mdi mdi-read mdi-48px text-success"></span> <br>
                        Resolved Complaints</h2>
                        <div class="divider mb-5"></div>
                    <div v-for="(complaint, i) in resolved_complaints" :key="i" class="animate__animated animate__fadeInUp">
                        <div class="alert alert-dismissible fade show transition" :class="'alert-' + convertToAlert(complaint.complaint_type)" role="alert">
                            {{ complaint.toll_id }}
                            <div class="close p-1 d-flex align-items-center">
                                <button @click="complaint.hide_details = !complaint.hide_details" class="btn btn-flat transparent mdi mdi-information-variant p-0 mdi-24px mx-2"></button>
                                <button @click="deleteComplaint(complaint, i, resolved_complaints)" type="button" class="btn mdi mdi-close btn-flat transparent" data-dismiss="alert" aria-label="Close"></button>                            
                            </div>
                            <div v-if="!complaint.hide_details" class="animate__animated animate__zoomIn">
                                <hr>
                                <p v-html="convertToHTML(complaint.complaint_details)"></p>
                                <p class="w-100 text-super-light my-4"> <span class="mdi mdi-clock mr-2"></span> {{complaint.time}} | {{ complaint.date }}</p>
                            </div>
                        </div>            

                    </div>
                </div>
            </div>
            <div class="col m6 px-3 border-left py-5">
                <div v-if="!loading">
                    <h2 class="mb-5 text-center">
                        <span class="mdi mdi-emoticon-poop mdi-48px  brown-text lighten-1 mdi-spin"></span> <br>
                        Still Active</h2>
                        <div class="divider mb-5"></div>
                        <div class="w-100 text-right">
                            <button @click="complaintLoading = true, getComplaints()" 
                            class="btn btn-flat transparent text-primary my-2 hov"><span :class="complaintLoading ? 'mdi-spin' : ''"  class="mdi mdi-refresh text-primary"></span> Refresh List</button>
                        </div>
                    <div v-for="(complaint, i) in complaints" :key="i" class="animate__animated animate__fadeInUp">
                        <div class="alert alert-dismissible fade show transition" :class="'alert-' + convertToAlert(complaint.complaint_type)" role="alert">
                            {{ complaint.toll_id }}
                            <div class="close p-1 d-flex align-items-center">
                                <p class="d-inline mb-0 pb-0" style="transform:translateY(3px)">
                                <label class="mt-1">
                                    <input @click="complaint.complaint_type = 'resolved', makeItResolved(complaint, i)" type="checkbox" :disabled="complaint.complaint_type == 'resolved'" />
                                    <span></span>
                                </label>
                                </p>                    
                                <button @click="complaint.hide_details = !complaint.hide_details" class="btn btn-flat transparent mdi mdi-information-variant p-0 mdi-24px mx-2"></button>
                                <button @click="deleteComplaint(complaint, i, complaints)" type="button" class="btn mdi mdi-close btn-flat transparent" data-dismiss="alert" aria-label="Close">
                                </button>                            
                            </div>
                            <div v-if="!complaint.hide_details" class="animate__animated animate__zoomIn">
                                <hr>
                                <p v-html="convertToHTML(complaint.complaint_details)"></p>
                                <p class="w-100 text-super-light my-4"> <span class="mdi mdi-clock mr-2"></span> {{complaint.time}} | {{ complaint.date }}</p>
                            </div>
                        </div>            

                    </div>
                </div>
                <div v-else class="progress" style="height:5px">
                    <div class="indeterminate"></div>
                </div>                
            </div>
        </div>
    </div>

</template>

<script>

import TitleVue from '../partials/Title.vue'
import CreateTollbooth from '../dashboard/CreateTollbooth.vue'
import TollboothList from './TollboothList.vue'
import DeleteTollbooth from './DeleteTollbooth.vue'
import UpdateTollbooth from './UpdateTollbooth.vue'

export default {

    components: {
        TitleVue,
        CreateTollbooth,
        TollboothList,
        DeleteTollbooth,
        UpdateTollbooth,

    },
    data() {
        return {
            complaints: [],
            resolved_complaints: [],
            crud: ["Resolved", "Still Active"],
            loading: true,
            complaintLoading: false
        }
    },
    watch: {
    },    
    methods: {
        deleteComplaint(complaint, i, complaints) {
            let ref = "complaints/" + complaint.key

            M.toast({ html: "Please Wait..." })


            if (! navigator.onLine) {
                M.toast({ html: "You are Offline!" })
                return
            }

            this.firebase_remove_one(ref, (res) => {
                M.toast({ html: "Complaint removed Successfully" })       
                // complaints.splice(i, 1)
            },
            (err) => {
                M.toast({ html: err })
                console.log(err, 'my-error')
            })
        },
        makeItResolved(complaint, i) {
            
            let ref = "complaints/" + complaint.key            

            if (! navigator.onLine) {
                M.toast({ html: "You are Offline!" })
                return
            }

            complaint.hide_details = true

            this.firebase_update({ ref, obj:complaint }, (res) => {

                M.toast({ html: "Complaint is resolved!" })

                this.resolved_complaints.push(complaint)                
                this.complaints.splice(i, 1)
            },
            (err) => {
                M.toast({ html: err })
                console.log(err, 'my-error')
            })
            
        },
        convertToHTML(text) {
            console.log(text, 'my-text')
            return text
        },

        convertToAlert(complaint) {

            switch(complaint) {

                case "ordinary":
                    return "info"
                    break
                case "corrupt":
                    return "danger"
                    break
                case "resolved":
                    return "success"
                    break
            }
        },

        getComplaints() {
            this.firebase_get("complaints", (complaints) => {

                this.complaints =  complaints.filter(el => el.complaint_type != "resolved")
                this.resolved_complaints = complaints.filter(el => el.complaint_type == "resolved")
                this.loading = false

                this.complaintLoading ? M.toast({ html: "List Updated" }) : null

                this.complaintLoading = false

            })

        }
    },

    mounted() {

        this.getComplaints()
    }
}
</script>

<style>
b {
    font-weight: 1000;
}
</style>