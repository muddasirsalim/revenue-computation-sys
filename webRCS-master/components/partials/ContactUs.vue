<template>
    <div class="row mx-0 my-5 position-relative px-0 bg-light">
        <div class="row col s12 mx-0 h-100"  data-aos="fade-up-up">
            <div class="col m12 l1 d-none d-lg-block"></div>
            <div class="col m12 l5 pl-5 mt-4 p-5">
                <div>
                    <h1 class="archivo-font mb-5">Get in touch</h1>
                    <!-- <p class="mb-5">Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt 
                        qui esse pariatur duis deserunt mollit dolore cillum minim 
                        tempor enim. Elit aute irure tempor cupidatat incididunt sint 
                        deserunt ut voluptate aute id deserunt nisi.</p> -->
                    <div class="col s12 mt-4">
                        <button class="btn btn-primary drop-shadow pl-5 pr-5 border-radius">Contact us</button>
                    </div>
                </div>
            </div>
            <div class="col m12 l5 position-relative p-0 align-self-center">
                <div class="d-flex align-items-center">
                    <img :src="contactUsImg" width="100%">
                </div>
                <div class="position-absolute w-100 h-100 d-flex align-items-center justify-content-center p-5" style="top:0px; left:0px;">
                    <div class="row align-items-center position-relative">
                        <div class="col s1 col-1 d-none d-lg-block"></div>
                        <div class="col l3 s4 m4 p-0 text-center">
                            <img :src="callIcon" alt="" class="w-100">
                        </div>
                        <div class="col s4 m4 l4 px-0 text-center">
                            <img :src="emailIcon" alt="" class="w-100" style="transform: scale(1.25);">
                        </div>
                        <div class="col l3 s4 m4 p-0 text-center">
                            <img :src="websiteIcon" alt="" class="w-100">
                        </div>
                        <div class="col s1 d-none d-lg-block"></div>
                    </div>
                </div>
            </div>
            <div class="col m12 s12 l1 d-none d-lg-block"></div>
        </div>
    </div>  
</template>

<script>

import contactUsImg from '../../assets/images/contactus_image.png'
import callIcon from '../../assets/images/call_icon.png'
import emailIcon from '../../assets/images/email_icon.png'
import websiteIcon from '../../assets/images/website_icon.png'

export default {
    data() {
        return {
            contactUsImg: contactUsImg,
            callIcon: callIcon,
            emailIcon: emailIcon,
            websiteIcon: websiteIcon
        }
    }
}
</script>

<style>

</style>