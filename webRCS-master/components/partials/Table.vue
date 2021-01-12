<template>
    <div class="px-4">
        <div class="col m12 text-right py-4 ">
            <button @click="downloadCSVFile()" class="btn btn-success btn-large border-radius-0 transparent font-weight-bold px-4 waves-effect waves-light">
                <span class="d-flex align-items-center">
                    <span class="mdi mdi-file-settings mdi-24px px-2"></span>
                    <span>Generate Record</span>
                </span>
            </button>
        </div>        
        <div class="mx-0 my-4 shadow px-3 py-3 bg-white" style="overflow-x: auto; max-height:1000px">
            <h6 class="font-weight-bold py-3 px-2">{{ title }}:</h6>
            <table id="record-table" class="table table-responsive-md w-100 striped" style="overflow: auto;" v-if="table.length > 0" >
                <thead>
                    <tr>
                        <th class="font-weight-bold border-0 py-4">#</th>
                        <th class="font-weight-bold border-0 py-4">Toll Id</th>
                        <th class="font-weight-bold border-0 py-4">Vechile Type</th>
                        <th class="font-weight-bold border-0 py-4">Vechile Tax</th>
                        <th class="font-weight-bold border-0 py-4">Licence Plate</th>
                        <th class="font-weight-bold border-0 py-4 text-center">Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(record, i) in records" :key="i">
                        <td class="py-4">{{ i+1 }}.</td>
                        <td class="py-4"> {{ record.toll_id }}</td>
                        <td class="py-4"> {{ record.vechile_type }}</td>
                        <td class="py-4"> {{ record.vechile_tax }}</td>
                        <td class="py-4"> {{ record.vechile_plate }}</td>
                        <td class="py-4 text-center"> {{ record.date }}</td>
                        
                    </tr>
                </tbody>
            </table>           
        </div>

    </div>
</template>

<script>
export default {
    props: {
        table: {
            required: true,
            default: []
        },
        title: {
            required: false,
            default: "Recent Details"
        }
    },
    data() {

        return {

            records: []
        }
    },
    
    methods: {

        downloadCSVFile() {

            let table = $("#record-table")[0]
            this.export_table_to_csv(table, "table.csv");
            
            // this.exportTableToCSV(table, "Test.csv")
        }

    },
    mounted() {

        this.firebase_get("records", (records) => {
            
            this.records = records
            console.log(records, 'records')
        })

    }
}
</script>

<style>

</style>