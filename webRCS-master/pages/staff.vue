<template>
    <div>
        <!-- The Modal -->
        <div class="modal fade" id="complaint-submitted-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header border-0">
                        <button type="button" class="close text-success mdi mdi-close-circle" data-dismiss="modal"></button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body border-none">
                        <h5 class="d-block text-center text-success font-weight-bold">Complaint Submitted Successfully</h5>
                    </div>

                </div>
            </div>
        </div>

        <!-- The Modal -->
        <div class="modal fade" id="logout-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    
                    <!-- Modal body -->
                    <div class="modal-body border-none">
                        <h5 class="d-block text-center text-success font-weight-bold my-5">Are you sure you want to Logout?</h5>
                        <div class="w-100 text-center mb-4">
                            <button @click="cancelLogout()" class="btn px-4 border-radius bg-light shadow text-success mx-2 font-weight-bold">Cancel</button>
                            <button @click="logoutUser()" class="btn px-4 waves-effect waves-light  border-radius z-depth-2 btn-success mx-2">Logout</button>
                        </div>                        
                    </div>

                </div>
            </div>
        </div>
        <vechile-record-modal v-if="modal == 'VECHILE_RECORDS'" />
        


        <div class="row mt-4 position-relative">
            <!-- <div class="col s12" v-if="!showSideNav">
                <a @click="showSideNav = true" class="btn-floating btn-large waves-effect waves-light position-absolute btn-flat bg-success" style="left 0px; top:0px;"><i class="mdi mdi-chevron-right"></i></a>                
            </div> -->
            
            <div :class="showSideNav ? 's12 m4 l3' : 'd-none'" class="col bg-success py-4 px-0 shadow position-relative" style="min-height: 700px;  max-height:100%">
                <!-- <a @click="showSideNav = false" class="btn-floating btn-large waves-effect waves-light position-absolute btn-flat bg-success" style="right:-25px; top:0px;"><i class="mdi mdi-chevron-left"></i></a>                 -->
                <div 
                    :class="[tab == link.value ? 'white' : '', (i+1) < navLinks.length ? 'border-bottom-white' : '']" 
                    :data-toggle="link.value == 'LOGOUT' ? 'modal' : ''" :data-target="link.value == 'LOGOUT' ? '#logout-modal' : ''"

                    class="py-3 pl-4" v-for="(link, i) in navLinks" :key="i">
                    <button 
                        @click="tab = link.value"
                        :class="[tab == link.value ? 'text-success font-weight-bold' : 'text-white']"
                        class="btn btn-block transparent text-left btn-flat waves-effect waves-light">
                        <span v-if="tab == link.value" class="mdi mdi-arrow-right-thick mr-2 animate__animated animate__zoomIn"></span>
                        {{ link.name }}
                    </button>
                </div>
                
            </div>

            <div class="col s12 m8 l9">                
                <staff-home @switchTabTo="tab = $event" v-if="tab == 'DASHBOARD'" />
                <records class="animate__animated animate__zoomIn" v-else-if="tab == 'RECORDS'" />
                <edit-profile class="animate__animated animate__fadeInUp" v-else-if="tab == 'EDIT_PROFILE'" />
                <toll-booth-info class="animate__animated animate__fadeInUp" v-else-if="tab == 'TOLL_BOOTH_INFORMATION'" />
                <computations v-else-if="tab == 'COMPUTATIONS'" />
                <complaints v-else-if="tab == 'COMPLAINTS'" />
                
                
            </div>            
        </div>

    </div>
</template>

<script>

import profilePhoto from '../assets/images/user_icon.png'
import Home from '../components/staff/Home.vue'
import Records from '../components/staff/Records.vue';
import EditProfile from '../components/staff/EditProfile.vue';
import TollBoothInfo from '../components/staff/TollBoothInfo.vue';
import Computations from '../components/staff/Computations.vue';
import Complaints from '../components/staff/Complaints.vue';

export default {
    components: {
        "staff-home": Home,
        Records,
        EditProfile,
        TollBoothInfo,
        Computations,
        Complaints
    },
        data() {
        return {
            showSideNav: true,
            modal: null,
            tab: {},
            profilePhoto: profilePhoto,
            navLinks: [],
        }
    },
    watch: {
        tab(n, o) {
        }
    },
    methods: {

        cancelLogout() {
            $("div").click()
        },

        logoutUser() {

            this.setCookie("rcs-localstorage", {}, 14)

            setTimeout(() => {
                location.href = "/"
            }, 500);
        }
    },
    mounted() {


        let navLinks = [
            { name: "Dashboard", value: "DASHBOARD", view: "TABULAR", },
            { name: "Records", value: "RECORDS", view: "FORM" },
            { name: "Computations", value: "COMPUTATIONS", view: "FORM", },
            { name: "Complaints", value: "COMPLAINTS", view: "FORM", },
            { name: "Edit Profile", value: "EDIT_PROFILE", view: "FORM", },
            { name: "Toll Booth Information", value: "TOLL_BOOTH_INFORMATION", view: "FORM", },
        ]
    

        this.navLinks = navLinks
        this.tab = "DASHBOARD"

        this.navLinks.push({
            name: "Logout",
            value: "LOGOUT"
        })
        


        // SETTING UP DATA...

    }
}
</script>

<style>
.modal {
    background-color: transparent !important;
    box-shadow: none !important;
}
</style>