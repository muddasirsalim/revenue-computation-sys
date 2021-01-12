<template>
    <div class="px-4">
        <!-- <h1 class="archivo-font">Computations</h1> -->
        <div class="row mx-0 my-4">
            <div class="col s6 m4 p-2" v-for="(ana, i) in analytics" :key="i">
                <div class="shadow px-2 py-5 border-radius-5 animate__animated animate__zoomIn" :class="ana.color">
                    <h4 class="text-center text-white">{{ ana.name }}</h4>
                    <div class="divider mx-5 my-4"></div>
                    <h4 class="text-center text-super-light"> {{ ana.value }} </h4>
                </div>
            </div>
        </div>        
        <div class="mx-0 my-4 px-3 py-3 bg-white">
            <div class="row">
                <div class="col s12 transition">
                    <div class="divider"></div>
                    <h5 class="text-center pt-5 pb-4">Report Of Missing Analytics</h5>
                    <div class="shadow">
                        <!--       Chart.js Canvas Tag -->
                        <canvas id="multiLineChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="loading" class="progress" style="height:5px">
            <div class="indeterminate"></div>
        </div>         
    </div>
</template>

<script>
export default {

    components: {
    },

    data() {
        return {
            loading: true,
            analytics: [
                { name: "Estimated Revenue", value: "TB# 1607789960148", color: "light-green darken-1" },
                { name: "Total Revenue Made", value: "TB# 1607789960148", color: "blue darken-1" },
                { name: "Missing Revenue Amount", value: "TB# 1607789960148", color: "red darken-1" },
            ],
            total_revenue: 0,
            missing_revenue: 0            
        }
    },
    methods: {
    },

    mounted() {

        this.computationChart((data) => {

            this.loading = false
    
            this.analytics[0].value = data.estimated 
            this.analytics[1].value = data.total
            this.analytics[2].value = data.missing

        })
    }
}
</script>

<style>

body{
  /* background-color: #666; */
}

#multiLineChart{
  background-color: wheat;
  border-radius: 6px;
}


</style>