<template>
    <div class="px-4">
        <div class="row mx-0 my-4">
            <div class="col s6 m4 p-2" v-for="(ana, i) in analytics" :key="i">
                <div class="shadow px-2 py-5 border-radius-5 animate__animated animate__zoomIn" :class="ana.color">
                    <h5 class="text-center">{{ ana.name }}</h5>
                    <div class="divider mx-5 my-4"></div>
                    <h4 class="text-center text-super-light" v-html="ana.value"></h4>
                </div>
            </div>
        </div>        
        <div class="mx-0 my-4 px-3 py-3 bg-white">
            <div class="row">
                <div class="col l9 m12 s12 transition">
                    <div class="shadow">
                        <!--       Chart.js Canvas Tag -->
                        <canvas id="multiLineChart"></canvas>
                    </div>
                </div>
                <div class="col l3 m12 s12 transition">
                    <h5>Active Toll Booths</h5>
                    <div class="row mx-0" style="max-height:500px;overflow-y:auto">
                        <div class="col s12 p-2" v-for="(tollbooth, i) in tollbooths" :key="i">
                            <div class="shadow px-3 py-4 bg-white border-radius-5">
                                <p class="mb-1">
                                    {{ tollbooth.name }}                                    
                                </p>
                                <p class=" border-bottom pb-4 text-sm">
                                    <span class="mdi mdi-map-marker text-primary"></span> {{ tollbooth.location }}                                    
                                </p>
                                
                                <h5 class="text-primary text-center "> {{tollbooth.id}} </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <vechile-record :table="dataTableOfVechileRecords()" title="Recently Detected Vechiles" @Details="$emit('details')" />

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
                { name: "Estimated Revenue", value: "TB# 1607789960148", color: "light-green darken-1" },
                { name: "Total Tax Collected", value: "TB# 1607789960148", color: "blue darken-1" },
                { name: "Missing Revenue Amount", value: "TB# 1607789960148", color: "red darken-1" },
                { name: "Total Vechiles", value: "0", color: "text-black" },
                { name: "Pending Complaints", value: "TB# 1607789960148", color: "text-black" },
                { name: "Total Toll Booths", value: "TB# 1607789960148", color: "text-black" },

            ],       
            
            loading: true,
            tollbooths: []            
        }
    },
    methods: {
    },

    mounted() {

        
        M.toast({ html: "Fetching Tollbooth..." })

        this.firebase_get("tollbooth", (res) => {
            this.loading = false
            this.tollbooths = res
            this.analytics[5].value = "Total: " + res.length

        })

        this.firebase_get("complaints", (complaints) => {

            this.analytics[4].value =  "Total: <mark>" + complaints.filter(el => el.complaint_type != "resolved").length + "</mark>"
        })

        this.firebase_get("records", (records) => {
            
            console.log(records, 'records')
            let cars = records.filter(record => record.vechile_type == "car").length,
                truck = records.filter(record => record.vechile_type == "truck").length,
                other = records.filter(record => record.vechile_type != "truck" && record.vechile_type != "car").length

            this.analytics[3].value = `
                
                <span class="text-primary">Cars: </span> ${cars}, 
                <span class="text-success">Trucks: </span> ${truck}, 
                <span class="text-danger">Other: </span> ${other}
            `
        })
        this.computationChart((data) => {

            this.loading = false

            this.analytics[0].value = data.estimated 
            this.analytics[1].value = data.total
            this.analytics[2].value = data.missing            

        })

        // this.createCrossChart({
        //     labels: ["January", "February", "March", "April", "May"],
        //     datasets: [{
        //         label: "Series A",
        //         data: [10, 30, 20, 40, 10],
        //         borderColor: "rgba(0,0,255,0.8)",
        //         backgroundColor: "rgba(0,0,255,0.5)"
        //     }, {
        //         label: "Series B",
        //         data: [25, 40, 10, 40, 30],
        //         borderColor: "rgba(255,0,0,0.8)",
        //         backgroundColor: "rgba(255,0,0,0.5)"
        //     }]
        // }, true)


        
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