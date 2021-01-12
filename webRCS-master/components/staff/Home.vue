<template>
    <div class="px-4">
        <h1 class="archivo-font">Home</h1>
        <div class="row mx-0 my-4">
            <div class="col l6 m6 s6 p-2 animate__animated animate__zoomIn" v-for="(ana, i) in analytics" :key="i">
                <div class="shadow px-2 py-5 bg-white border-radius-5">
                    <h5 class="text-center">{{ ana.name }}</h5>
                    <a @click="$emit('switchTabTo', ana.tab)" href="#" class="text-success btn btn-block btn-flat transparent text-center font-weight-bold"> {{ ana.value }} </a>
                </div>
            </div>
        </div>        


    </div>
</template>

<script>
import Table from '../partials/Table.vue';
export default {

    components: {
        "vechile-record": Table,
    },

    data() {
        return {
            analytics: [
                { name: "Manage Complaints", value: "Complaints", tab: "COMPLAINTS" },
                { name: "View Records", value: "Records", tab: "RECORDS" },
                { name: "Access TollBooth Information", value: "TollBooth", tab: "TOLL_BOOTH_INFORMATION" },
                { name: "Perform Computations", value: "Computations", tab: "COMPUTATIONS" },
            ]            
        }
    },
    methods: {
    },

    mounted() {


        
    }
}
</script>

<style>

</style>