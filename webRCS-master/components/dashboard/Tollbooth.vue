<template>
    <div class="row p-2">
        <div class="col m12 border-top border-bottom">
            <button @click="active=i" v-for="(btn, i) in crud" :key="i" 
                :class="[i == active ? 'bg-primary z-depth-1 text-white' : 'btn-flat',]" 
                class="btn btn-large border-radius-0 transparent font-weight-bold col m3">{{btn}}</button>
        </div>
        <div class="col m12 mt-4">
            <title-vue :title="title" description="Create a brand new toll booth, that will keep track of records" />            
        </div>
        <div v-if="active == 1" class="col m12">
            <create-tollbooth />            
        </div>
        <div v-else-if="active == 0" class="col m12">
            <tollbooth-list />            
        </div>
        <div v-else-if="active == 2" class="col m12">
            <delete-tollbooth />            
        </div>
        <div v-else-if="active == 3" class="col m12">
            <update-tollbooth />            
        </div>
    </div>
</template>

<script>

import TitleVue from '../partials/Title.vue'
import CreateTollbooth from '../dashboard/CreateTollbooth.vue'
import TollboothList from './TollboothList.vue'
import DeleteTollbooth from './DeleteTollbooth.vue'
import UpdateTollbooth from './UpdateTollbooth.vue'

export default {

    components: {
        TitleVue,
        CreateTollbooth,
        TollboothList,
        DeleteTollbooth,
        UpdateTollbooth,

    },
    data() {
        return {
            title: null,
            description: null,
            active: -1,
            crud: ["Home", "Create", "Delete", "Update"]
        }
    },
    watch: {
        active(n, o) {

            switch(n) {
                case 0:
                    this.title = "List of All Toll Booths"
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

    mounted() {

        this.active = 0
    }
}
</script>

<style>

</style>