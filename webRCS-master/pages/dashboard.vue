<template>
    <div>
        <ul id="slide-out" class="sidenav">
            <li><div class="user-view">
            <div class="background">
                <img src="">
            </div>
            <a href="#user"><img class="circle" src=""></a>
            <a href="#name"><span class="white-text name">John Doe</span></a>
            <a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>
            </div></li>
            <li><a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a></li>
            <li><a href="#!">Second Link</a></li>
            <li><div class="divider"></div></li>
            <li><a class="subheader">Subheader</a></li>
            <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
        </ul>
        <!-- The Modal -->
        <div class="modal fade" id="complaint-submitted-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header border-0">
                        <button type="button" class="close text-primary mdi mdi-close-circle" data-dismiss="modal"></button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body border-none">
                        <h5 class="d-block text-center text-primary font-weight-bold">Complaint Submitted Successfully</h5>
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
                        <h5 class="d-block text-center text-primary font-weight-bold my-5">Are you sure you want to Logout?</h5>
                        <div class="w-100 text-center mb-4">
                            <button @click="cancelLogout()" class="btn px-4 border-radius bg-light shadow text-primary mx-2 font-weight-bold">Cancel</button>
                            <button @click="logoutUser()" class="btn px-4 waves-effect waves-light  border-radius z-depth-2 btn-primary mx-2">Logout</button>
                        </div>                        
                    </div>

                </div>
            </div>
        </div>
        <vechile-record-modal v-if="modal == 'VECHILE_RECORDS'" />
        


        <div class="row mt-4 position-relative">
            <!-- <div class="col s12" v-if="!showSideNav">
                <a @click="showSideNav = true" class="btn-floating btn-large waves-effect waves-light position-absolute btn-flat bg-primary" style="left 0px; top:0px;"><i class="mdi mdi-chevron-right"></i></a>                
            </div> -->
            
            <div :class="showSideNav ? 's12 m4 l3' : 'd-none'" class="col bg-primary py-4 px-0 shadow position-relative" style="min-height: 700px;  max-height:100%">
                <!-- <a @click="showSideNav = false" class="btn-floating btn-large waves-effect waves-light position-absolute btn-flat bg-primary" style="right:-25px; top:0px;"><i class="mdi mdi-chevron-left"></i></a>                 -->
                <div 
                    :class="[tab.value == link.value ? 'white' : '', (i+1) < navLinks.length ? 'border-bottom-white' : '']" 
                    :data-toggle="link.value == 'LOGOUT' ? 'modal' : ''" :data-target="link.value == 'LOGOUT' ? '#logout-modal' : ''"

                    class="py-3 pl-4" v-for="(link, i) in navLinks" :key="i">
                    <button 
                        @click="link.value != 'LOGOUT' ? tab = link : null"
                        :class="[tab.value == link.value ? 'text-primary font-weight-bold' : 'text-white']"
                        class="btn btn-block transparent text-left btn-flat waves-effect waves-light">
                        <span v-if="tab == link" class="mdi mdi-arrow-right-thick mr-2 animate__animated animate__zoomIn"></span>
                        {{ link.name }}
                    </button>
                </div>
                
            </div>

            <div class="col s12 m8 l9">                
                <dashboard-home @details="modal='VECHILE_RECORDS'" v-if="tab.value == 'DASHBOARD'" />
                <tollbooth v-else-if="tab.value == 'TOOL_BOOTH'" />
                <user v-else-if="tab.value == 'CREATE_USER'" />
                <manage-complaints v-else-if="tab.value == 'MANAGE_COMPLAINTS'" />
                
            </div>            
        </div>

    </div>
</template>

<script>

import profilePhoto from '../assets/images/user_icon.png'
import User from '../components/dashboard/User.vue';
import Home from '../components/dashboard/Home.vue'
import VechileRecordModal from '../components/dashboard/modals/VechileRecord';
import Tollbooth from '../components/dashboard/Tollbooth.vue';
import ManageComplaints from '../components/dashboard/ManageComplaints';

export default {
    components: {
        "dashboard-home": Home,
        "vechile-record-modal": VechileRecordModal,
        Tollbooth,
        User,
        ManageComplaints,
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
            { name: "Tool Booth", value: "TOOL_BOOTH", view: "FORM" },
            { name: "Manage Complaints", value: "MANAGE_COMPLAINTS", view: "FORM", },
            { name: "Create A User", value: "CREATE_USER", view: "FORM", },

        ]
    

        this.navLinks = navLinks
        this.tab = this.navLinks[0]

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