<template>
    <div class="px-4">
        <h1 class="archivo-font">Order Details</h1>
        <div class="row mx-0 my-4">
            <div class="col l3 m6 s6 p-2" v-for="(ana, i) in analytics" :key="i">
                <div class="shadow px-2 py-4 bg-white border-radius-5">
                    <h5 class="text-center">{{ ana.name }}</h5>
                    <h1 class="text-primary text-center font-weight-bold"> {{ana.value}} </h1>
                </div>
            </div>
        </div>        
        <div class="mx-0 my-4 shadow px-3 py-3 bg-white" style="overflow-x: auto;">
            <h6 class="font-weight-bold py-3 px-2">Recent Details:</h6>
            <table class="table table-responsive-md w-100 striped" style="overflow: auto;" v-if="table.length > 0" >
                <thead>
                    <tr>
                        <th class="font-weight-bold border-0 py-4">#</th>
                        <th v-for="(row, col) in table[0]" :key="col" class="font-weight-bold border-0 py-4">{{ col }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, i) in table" :key="i">
                        <td class="py-4">{{ i+1 }}.</td>
                        <td v-for="(rowField, j) in row" :key="j" class="py-4">
                            <span class="text-sm" v-if="rowField.type == 'TEXT'">{{ rowField.name }}</span>
                            <button 
                            :data-toggle="'modal'" :data-target="'#' + rowField.name.toLowerCase() + '-modal'"
                            @click="$emit(rowField.name)" v-else-if="rowField.type == 'BUTTON'" class="btn btn-primary text-sm px-4">{{ rowField.name }}</button>
                            <span class="text-sm" v-else-if="rowField.type == 'STATUS'"> 
                                <span class="text-success" v-if="rowField.status == 'COMPLETED'">{{ rowField.name }}</span>
                                <span class="text-primary lighten-2" v-else-if="rowField.status == 'PENDING'">{{ rowField.name }}</span>
                                <span class="text-danger lighten-2" v-else-if="rowField.status == 'CANCELLED'">{{ rowField.name }}</span>
                            </span>
                            <span v-else-if="rowField.type == 'RATING'" class="d-flex">
                                <button class="btn mdi mdi-star px-0 transparent btn-flat" :key="i" :class="i < rowField.name ? 'text-warning' : 'text-super-light'" v-for="(star, i) in 5"></button>
                            </span>
                        </td>
                        
                    </tr>
                </tbody>
            </table>           
        </div>

    </div>
</template>

<script>
export default {

    data() {
        return {
            table: [],
            analytics: [
                { name: "Total Vechiles", value: "#100" },
                { name: "Total Tax Collected", value: "#40" },
                { name: "Pending Complaints", value: "#100" },
                { name: "Total Toll Booths", value: "#200" },
            ]            
        }
    },

    mounted() {

        let TABLE = [
            { 
                "Order Id": { 
                    name: "SAMXL3", type: "TEXT"
                }, 
                "Order Date": {
                    name: "16-11-2020", type: "TEXT"
                }, 
                "Order Status": {
                    name: "Completed", type: "STATUS", status: "COMPLETED"
                },
                "Payment": {
                    name: "43.00$", type: "TEXT"
                },
                "Order Details": {
                    name: "Details", type: "BUTTON"
                },
                "Complaint": {
                    name: "View", type: "BUTTON"
                },
                "Chat": {
                    name: "Chat", type: "BUTTON"
                },
                "Rating": {
                    name: 4, type: "RATING"
                },
            },

            { 
                "Order Id": { 
                    name: "SAMXL3", type: "TEXT"
                }, 
                "Order Date": {
                    name: "16-11-2020", type: "TEXT"
                }, 
                "Order Status": {
                    name: "Cancelled", type: "STATUS", status: "CANCELLED"
                },
                "Payment": {
                    name: "43.00$", type: "TEXT"
                },
                "Order Details": {
                    name: "Details", type: "BUTTON"
                },
                "Complaint": {
                    name: "View", type: "BUTTON"
                },
                "Chat": {
                    name: "Chat", type: "BUTTON"
                },
                "Rating": {
                    name: 3, type: "RATING"
                },
            },            
        ]
        
        this.table = TABLE
    }
}
</script>

<style>

</style>