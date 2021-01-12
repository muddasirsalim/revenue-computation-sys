<template>
    <div class="row p-2">
        <div class="col m10 mt-4">
            <title-vue :title="title" description="Create a brand new toll booth, that will keep track of records" />            
            <div v-if="active == 1" class="col m12">
                <create-user />            
            </div>
            <div v-else-if="active == 0" class="col m12">
                <users-list />            
            </div>
            <div v-else-if="active == 2" class="col m12">
                <delete-user />            
            </div>
            <div v-else-if="active == 3" class="col m12">
                <update-user />            
            </div>

        </div>
        <div class="col m2 mt-0 mt-md-5 border-left py-5">
            <button @click="active=i" v-for="(btn, i) in crud" :key="i" 
                :class="[i == active ? 'text-primary z-depth-1 shadow text-white text-lg bg-light flow-text font-weight-bold' : '',]" 
                class="btn btn-large btn-block w-100 border-radius-0 btn-flat transparent col m3">{{btn}}</button>
        </div>

    </div>
</template>

<script>

import TitleVue from '../partials/Title.vue'
import CreateUser from './CreateUser.vue'
import UsersList from './UsersList.vue'
import UpdateUser from './UpdateUser.vue'
import DeleteUser from './DeleteUser.vue'

export default {

    components: {
        TitleVue,
        CreateUser,
        UsersList,
        UpdateUser,
        DeleteUser,

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
                    this.title = "Manage your users"
                    break

                case 1:
                    this.title = "Create a Brand New User"
                    break

                case 2:
                    this.title = "Delete An Existing User"
                    break

                case 3:
                    this.title = "Update a User"
                    break
            }
        }
    },    

    mounted() {

        this.active = 1
    }
}
</script>

<style>

</style>