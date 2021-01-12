<template>
    <div>
        <nav class="transparent z-depth-0">
            <div class="nav-wrapper">
                <a :href="user.username ? 'javascript:void(0)' : '/'" class="brand-logo text-center text-black">
                    <h2 class="archivo-font mb-0 text-center" :class="user.username != 'admin' ? 'text-success' : 'text-primary'">Revenue</h2>
                    <h6 class="text-center">Computation System</h6>
                </a>
                <a href="#" data-target="mobile-demo" class="sidenav-trigger black-text"><i class="mdi mdi-menu"></i></a>
                <ul class="right hide-on-med-and-down">
                    <li v-for="(link, i) in links" :key="i">
                        <a v-if="!user.username"  href="" class="black-text">{{link.name}}</a>
                    </li>
                    <li>
                        <div v-if="user.username" class="d-flex align-items-center mb-4 px-2">
                            <div>
                                <img class="bg-white" :src="profilePhoto" alt="" width="60px">
                            </div>
                            <div class="px-2">
                                <button href='#' 
                                    data-target='appbar-dropdown' 
                                    class="mb-0 btn btn-flat transparent font-weight-bold dropdown-trigger mr-4">Mr. {{ user.username }}</button>
                                <!-- Dropdown Structure -->
                                <ul id='appbar-dropdown' class='dropdown-content'>
                                    <li><a 
                                    :href="user.username == 'admin' ? '/dashboard' : '/staff'">Dashboard</a></li>                                    
                                    <li><a 
                                    data-toggle="modal" data-target="#logout-modal"
                                    href="javascript:void(0)">Logout</a></li>
                                </ul>                                
                            </div>
                        </div>                        
                        <nuxt-link v-else to="/login" class="waves-effect waves-light text-white btn bg-primary px-5 d-none">Login</nuxt-link>
                    </li>
                </ul>
            </div>
        </nav>

        <ul class="sidenav" id="mobile-demo">
            <li v-for="(link, i) in links" :key="i">
                <a href="" class="black-text">{{link.name}}</a>
            </li>
        </ul>      
    </div>
</template>

<script>

import profilePhoto from '../../assets/images/user_icon.png'
import logo from "@/assets/svg/logo-dark.svg"
export default {

    head () {
        return {
        }
    },

    data () {
        return {
            profilePhoto: profilePhoto,
            user: {},
            logo: logo,
            links: [
                { name: "About us" },
                { name: "Contact us" },
            ]
        }
    },

    methods: {

    },

    mounted () {

        $(document).ready(function(){
        $('.dropdown-trigger').dropdown({ constrainWidth: false });
            $('.sidenav').sidenav();
        });     
        
        if (this.getCookie("rcs-localstorage")) {
            this.user = this.getCookie("rcs-localstorage")
        }
        


        if (this.user.key) {

            this.firebase_get_one("users/" + this.user.key, (res) => {

                this.user = res
            })

        }


    }
}
</script>

<style>
a:hover {
    text-decoration: none !important;
}
nav.transparent * {
    color: rgba(0,0,0,1);
}
</style>