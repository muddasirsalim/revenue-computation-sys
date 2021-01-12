<template>
        <div class="row mx-0 my-5 position-relative px-0">
            <div class="position-absolute" style="top: 0px; right: 0px; z-index: -100;">
                <img :src="bullets" alt="">
            </div>
            <div class="row mx-0 mt-5">
                <div class="col l1 s12 d-none d-lg-block"></div>
                <div class="col m12 l10 bg-primary shadow pt-5 pb-5 position-relative">
                    <div class="position-relative" style="z-index: 10000;">
                        <p class="w-75 mx-auto text-white text-center">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
                            enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                        <div class="w-100 text-center">
                            <button class="btn pl-5 pr-5 bg-white text-primary mt-5 mb-5">Get started</button>
                        </div>                            
                    </div>
                </div>
                <div class="col s12 l1 d-none d-lg-block"></div>
            </div>
        </div>  
</template>

<script>

import bullets from '../../assets/svg/bullets.svg'

export default {
    data () {
        return {
            bullets: bullets,
        }
    }
}
</script>

<style>

</style>