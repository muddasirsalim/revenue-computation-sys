<template>
    <div class="px-4">
         
        <div v-if="loading" class="progress" style="height:5px">
            <div class="indeterminate"></div>
        </div>            
        <div v-else class="mx-0 my-4 shadow px-3 py-3 bg-white" style="overflow-x: auto;">
            <table class="table table-responsive-md w-100 striped" style="overflow: auto;">
                <thead>
                    <tr>
                        <th class="font-weight-bold border-0 py-4">#</th>
                        <th class="font-weight-bold border-0 py-4">ID</th>
                        <th class="font-weight-bold border-0 py-4">Name</th>
                        <th class="font-weight-bold border-0 py-4">Location</th>
                        <th class="font-weight-bold border-0 py-4 text-center">Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(tollbooth, i) in tollbooths" :key="i">
                        <td class="py-4">{{ i + 1 }}.</td>
                        <td class="py-4">{{ tollbooth.id }}</td>                        
                        <td class="py-4">{{ tollbooth.name }}</td>                        
                        <td class="py-4"><span class="mdi mdi-map-marker text-primary"></span> {{ tollbooth.location }}</td>   
                        <td class="py-4">
                            <p class="text-center mb-0 text-sm text-primary font-weight-bold">{{ tollbooth.time }}</p>    
                            <p class="text-center">{{ tollbooth.date }}</p>
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

        })

    }
}
</script>

<style>

</style>