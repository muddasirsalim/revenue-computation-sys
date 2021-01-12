<template>
  <div>
    <div class="py-2 pl-4 pr-2">
      <div class="py-4 px-2 shadow round-bottom-left  px-md-4 tranasition">
        <default-header />
        <div class="row mt-5">
          <div class="col s12 m6 push-m1 p-2">
            <h3 class="archivo-font mt-5 mt-md-0 text-center text-md-left text-md">
                Toll
                <span class="position-relative">
                    <!-- <img :src="textRect" class="position-absolute d-none d-lg-block" style="bottom: 0px;"> -->
                    <span class="text-primary text-md archivo-font font-10 position-relative " style="z-index: 10;">Collection</span>
                </span> 
                made easier,
                <p class="position-relative d-inline-block p-0 m-0 ">
                    <!-- <img :src="textRect" class="position-absolute d-none d-lg-block" alt="" style="bottom: 0px;"> -->
                    <span class="text-primary archivo-font text-md font-10 position-relative " style="z-index: 10;">efficient,</span>
                </p> 
                secured
            </h3>    
            <p class="my-5">With the revenue computation system, the primary concern is towards minimizing human interaction with the toll tax collection and letting the computer vision-based system doing its work. The system identifies the vehicle’s type, applies the tax amount, and creates a log of that vehicle. </p>        
            <button id="login-btn"  data-toggle="modal" data-target="#prompt-modal" class="btn btn-primary shadow px-5 btn-large"> <span class="mdi mdi-lock mr-2"></span> Login</button>
          </div>
          <div data-aos="fade-up" class="col s12 m5 d-none d-sm-block push-m1 text-center p-2">
            <img :src="toolBooth" alt="" style="width: 500px;">            
          </div>
        </div>
      </div>
    </div>
    <nuxt />

    <default-footer />

    <!-- The Modal -->
    <div class="modal fade" id="prompt-modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <div class="w-100 text-right">
                  <button class="close btn mdi mdi-close btn-flat transparent"  data-dismiss="modal" aria-label="Close"></button>
                </div>
                <!-- Modal body -->
                <div class="modal-body border-none">
                    <h3 class="d-block text-center font-weight-bold py-4">Please Select You Identity</h3>
                    <div class="w-100 text-center mb-5">
                      <br>
                      <a href="/login?user=admin" class="btn-primary shadow px-5 py-4 mx-2"><span class="mdi mdi-lock"></span> I am Admin</a>
                      <a href="/login?user=staff" class="btn-success shadow px-5 py-4 mx-2"><span class="mdi mdi-account-outline"></span> I am Staff</a>
                    </div>
                </div>

            </div>
        </div>
    </div>        
  </div>

  
</template>

<script>

import default_header from '@/components/partials/Appbar.vue'
import textRect from '../assets/svg/text-rect.svg'
import toolBooth from '../assets/images/tool-booth.jpg'
import AppFooter from '../components/partials/AppFooter.vue'
import * as queryString from 'query-string';

export default {
  components: {
    "default-header": default_header,
    "default-footer": AppFooter
  },
  data() {
    return {
      textRect: textRect,
      toolBooth: toolBooth
    }
  },
  mounted() {
    AOS.init();    
    
      let { identify } = queryString.parse(window.location.search)

      if (identify) {

          $("#login-btn").click()

      }

  }
}
</script>

<style>
</style>
