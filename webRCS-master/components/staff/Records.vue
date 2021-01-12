<template>
    <div class="row p-2">
        <div class="col m12 text-right px-5">
            <button @click="downloadCSVFile()" class="btn btn-success btn-large border-radius-0 transparent font-weight-bold px-4 waves-effect waves-light">
                <span class="d-flex align-items-center">
                    <span class="mdi mdi-file-settings mdi-24px px-2"></span>
                    <span>Generate Record</span>
                </span>
            </button>
        </div>
        <div class="col m12">
            <title-vue :title="title" description="Create a brand new toll booth, that will keep track of records" />            
        </div>
        <div class="col m12">
            <records-list />            
        </div>        
    </div>
</template>

<script>

import TitleVue from '../partials/Title.vue'
import CreateRecord from './CreateRecord'
import RecordsList from './RecordsList.vue'

export default {

    components: {
        TitleVue,
        CreateRecord,
        RecordsList,

    },
    data() {
        return {
            title: null,
            description: null,
            active: -1,
        }
    },
    watch: {
        active(n, o) {

            switch(n) {
                case 0:
                    this.title = "List of All Records"
                    break

                case 1:
                    this.title = "Create a Brand New TollBooth"
                    break

                case 2:
                    this.title = "Delete An Existing Tollbooth By Verifying TollBooth Id#"
                    break

                case 3:
                    this.title = "Update a tollbooth"
                    break
            }
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

        this.active = 0
    }
}
</script>

<style>

</style>