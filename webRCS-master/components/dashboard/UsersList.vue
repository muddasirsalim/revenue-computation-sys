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
                        <th class="font-weight-bold border-0 py-4">TollBooth ID</th>
                        <th class="font-weight-bold border-0 py-4">Name</th>
                        <th class="font-weight-bold border-0 py-4">NIC</th>
                        <th class="font-weight-bold border-0 py-4 text-center">Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, i) in users" :key="i">
                        <td class="py-4">{{ i + 1 }}.</td>
                        <td class="py-4">
                            <p class="mb-0 font-weight-bold">{{ user.toll.id }}</p>
                            <p class="mb-0 text-sm text-super-light">{{ user.toll.name }}</p>
                            <p class="text-sm text-primary font-weight-bold">{{ user.toll.location }}</p>
                        </td>                        
                        <td class="py-4">
                            <p class="mb-0 font-weight-bold">{{ user.username }}</p>
                            <p class="text-sm mb-0 text-super-light">{{ user.email }}</p>
                            <p class="text-sm text-super-light">Password: <mark><u class="text-primary font-weight-bold">{{ user.password }}</u></mark></p>
                        </td>        
                        <td class="py-4">{{ user.nic }}</td>      
                        <td class="py-4">
                            <p class="text-center mb-0 text-sm text-primary font-weight-bold">{{ user.time }}</p>    
                            <p class="text-center">{{ user.date }}</p>
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
            users: []
        }
    },
    methods: {
    },
    mounted() {
        
        M.toast({ html: "Fetching Users..." })

        this.firebase_get("users", (res) => {
            this.loading = false
            this.users = res

        })

    }
}
</script>

<style>

</style>