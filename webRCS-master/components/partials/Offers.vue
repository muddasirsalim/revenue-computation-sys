<template>
    <div class="row mx-0 my-5 position-relative px-0">
        <div class="position-absolute" style="top: 0px; left: 0px; z-index: -100;">
            <img :src="bullets" alt="">
        </div>
        <h2 class="col s12 archivo-font text-center mb-5 mt-5">What can we offer you?</h2>
        <div class="row m-0 px-0 px-md-4 justify-content-center position-relative">
            <div class="col s12 m12 l4 p-4 bg-white" v-for="(offer, i) in offers" :key="i">
                <a 
                    @click="selectable ? active = offer : ''" 
                    :href="!selectable ? '/2/select-device?type=' + offer.value : 'javascript:void(0)'" 
                    class="text-decoration-none">
                    <div class="card-shadow mx-auto text-center p-5 transition" 
                        :class="!selectable ? 'hov-primary' : active == offer ? 'active-primary' : ''"
                        @mouseover="!selectable ? offer.img = offer.img1 : ''" 
                        @mouseleave="!selectable ? offer.img = offer.img2 : ''">
                        <img :src="selectable ? active == offer ? offer.img1 : offer.img2 : offer.img" alt="" class="transition">
                        <h4 class="font-weight-bold text-center mt-5 pt-5 border-top w-75 mx-auto transition text-black">{{ offer.title }}</h4>
                    </div>    
                </a>
            </div>                
        </div>
        <div class="col-md-12 text-center text-md-right p-5">
            <a v-if="backBtn" href="/" class="btn px-4 border-radius mx-2 btn-flat transparent"><span class="mdi mdi-arrow-left mx-2"></span> Back</a>

            <a :href="next + (selectable ? '?type=' + (active.value || 'CELL_PHONE') : '' )" class="btn btn-primary pl-5 pr-5 pt-2 pb-2 drop-shadow border-radius">Next</a>
        </div>
    </div>
</template>

<script>

import bullets from '../../assets/svg/bullets.svg'
import smartphone1 from '../../assets/svg/smartphone-1.svg'
import smartphone2 from '../../assets/svg/smartphone-2.svg'
import tablet1 from '../../assets/svg/tablet-1.svg'
import tablet2 from '../../assets/svg/tablet-2.svg'
import computer1 from '../../assets/svg/computer-1.svg'
import computer2 from '../../assets/svg/computer-2.svg'

export default {
    props: {
        backBtn: {
            default: false
        },
        selectable: {
            default: false
        },
        next: {
            default: '/1/device-setup'
        }
    },
    data () {
        return {
            active: {},
            bullets: bullets,
            offers: [
                { title: "Cell Phone", value: "CELL_PHONE",  img: smartphone2, img1: smartphone1, img2: smartphone2 },
                { title: "Tablet", value: "TABLET",  img: tablet2, img1: tablet1, img2: tablet2 },
                { title: "Computer", value: "COMPUTER",  img: computer2, img1: computer1, img2: computer2 },
            ],            
        }
    }
}
</script>

<style>

</style>