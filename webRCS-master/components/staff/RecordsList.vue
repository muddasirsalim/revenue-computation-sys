<template>
    <div class="px-4 position-relative">
         
        <div class="w-100 text-right py-2 px-0">
            <button @click="create_record = !create_record, updateRecordList()" 
            :class="create_record ? 'btn-success shadow px-5' : 'text-success'"
            class="btn btn-large btn-flat waves-effect waves-light transition transparent font-weight-bold">
                <span class="d-flex align-items-center">
                    <span  class="mdi mdi-plus px-2 mdi-24px transition"></span>
                    <span class="transition">Add Record</span>
                </span>
            </button>
        </div>
        <create-record @record_added="create_record = false, updateRecordList()" v-if="create_record" class="animate__animated animate__fadeInUp animate__faster" />
        <div v-else>
            <div v-if="loading" class="progress" style="height:5px">
                <div class="indeterminate"></div>
            </div>            
            <div v-else class="mx-0 my-4 shadow px-3 py-3 bg-white" style="overflow-x: auto; max-height: 500px">
                <table id="record-table" class="table table-responsive-md w-100 striped animate__animated animate__zoomIn animate__faster" style="overflow: auto;">
                    <thead>
                        <tr>
                            <th class="font-weight-bold border-0 py-4">#</th>
                            <th class="font-weight-bold border-0 py-4">Vechile Plate</th>
                            <th class="font-weight-bold border-0 py-4">Vechile Tax</th>
                            <th class="font-weight-bold border-0 py-4">Amount Collected</th>
                            <th class="font-weight-bold border-0 py-4 text-center">Time Of Record</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(record, i) in records" :key="i">
                            <td class="py-4">{{ i + 1 }}.</td>
                            <td class="py-4">{{ record.vechile_plate }}</td>                        
                            <td class="py-4">{{ record.vechile_tax }}</td>                        
                            <td class="py-4"><span class="mdi mdi-cash-check text-success"></span> {{ record.amount_collected }}</td>   
                            <td class="py-4 text-center">
                                <span class="text-center mb-0 text-success font-weight-bold">{{ record.time }} Hr    &#x95; <span class="text-black">{{ record.date }}</span></span>
                            </td>               
                            <!-- <td class="text-right">
                                <button @click="remove(record, i)" class="btn text-success mdi mdi-delete btn-flat waves-light waves-effect transparent"></button>
                            </td>   -->
                        </tr>
                    </tbody>
                </table>           
            </div>

        </div>

    </div>
</template>

<script>
import CreateRecord from './CreateRecord.vue'
export default {
  components: { CreateRecord },

    data() {
        return {
            loading: true,
            records: [],
            create_record: false,
            user: {},
        }
    },
    methods: {
        remove(record, i) {
            let ref = "records/" + record.key

            M.toast({ html: "Please Wait..." })


            if (! navigator.onLine) {
                M.toast({ html: "You are Offline!" })
                return
            }

            this.firebase_remove_one(ref, (res) => {
                M.toast({ html: "Record Deleted Successfully" })
                
            },
            (err) => {
                M.toast({ html: err })
                console.log(err, 'my-error')
            })

            this.records.splice(i, 1)
        },
        updateRecordList() {
            this.loading = true
            this.firebase_get("records", (res) => {
                this.loading = false
                this.records = res.reverse().filter(el => el.toll_id == this.user.toll.id)

            })

        }
    },
    mounted() {

        this.user = this.getCookie("rcs-localstorage")
        
        M.toast({ html: "Fetching Records..." })

        this.updateRecordList()




    }
}
</script>

<style>

</style>