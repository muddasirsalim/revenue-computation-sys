<template>
    <div class="row mx-0 my-5 position-relative px-0">
        <div class="position-absolute" style="top: 0px; right: 0px; z-index: -100;">
            <img :src="bullets" alt="">
        </div>
        <h2 class="col s12 archivo-font text-center mb-5 mt-5">About Us</h2>
        <div class="row col s12 pt-5 mx-0">
            <div class="col s12 m12 l1 d-none d-md-block"></div>
            <div class="col m12 l4 pr-lg-5">
                <img :src="aboutUsImg" alt="" width="100%">
                <div class="col s12 m12 text-center mt-4">
                    <button class="btn btn-primary drop-shadow pl-5 pr-5 border-radius">More about us</button>
                </div>
            </div>
            <div class="col m12 l6 pl-0 pl-lg-5 mt-5 mt-lg-0">
                <p class="mb-5">At RCS we’re obsessed with gadgets and gizmos. We’re   the  folks standing in line on launch day waiting for the latest smartphone  or  gaming console. We love all things tech and we’re experts at what we do.</p>
                <p class="mb-5">RCS fixes electronic devices (it’s in our name after all). From the classic phone drop in the parking lot to the tablet in the toilet. We’ve seen it all. We understand how traumatic it is when you break your favorite devices and we want you to feel better the moment you walk in.</p>
                <p>We’re not overly sentimental, but we do what we do because we care about people and  their tech. That’s why RCS works,we put our customers above anything else. Of course,we love  fixing cracked screens and broken charge ports, but we get our satisfaction from helping out folks who lost their connection to the outside world.</p>                        
            </div>
            <div class="col s12 m12 d-none d-lg-block l1"></div>
        </div>
    </div>
</template>


<script>

import bullets from '../../assets/svg/bullets.svg'
import aboutUsImg from '../../assets/images/aboutus_image.png'

export default {

    data() {
        return {
            bullets: bullets,
            aboutUsImg: aboutUsImg
        }
    }
}
</script>

<style>

</style>