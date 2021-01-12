<template>
    <div class="row mx-0 my-5 py-5">
        <div class="col s12 m12 px-0">
            <div class="row mx-0 px-4">
                <div class="col m1 s12"></div>
                <div class="col m2 px-0 position-relative my-4 my-md-0" v-for="(s, i) in steps" :key="i">
                    <div class="w-100 position-absolute border-top-2 px-0 mx-0" style="top: 25%;"></div>
                    <div class="text-center position-relative" style="z-index: 100;">
                        <div class="text-center">
                            <div class="text-center px-0 mx-0">
                                <div class="d-inline-block px-3 bg-white">
                                    <div class="round-btn bg-white d-inline-block p-1" :class="step == i ? 'border-primary' : 'border-light'">
                                        <button @click="step = i" class="btn rounded waves-effect waves-light " :class="step == i ? 'btn-primary mdi mdi-check-bold mdi-24px' : 'transparent'"></button>
                                    </div>                     
                                </div>
                            </div>
                            <p class="text-center mt-2 px-0">{{ i + 1}}. {{ s}}</p>
                        </div>
                    </div>
                </div>
                <div class="col m1 s12"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        step: {
            default: 0
        }
    },
    data() {
        return {
            steps: ["Create TollBooth", "Assign User", "Analyze Tolls", "Find Corrupt Tolls", "Get Aware"],            
        }
    }
}
</script>

<style>

</style>