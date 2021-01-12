<template>
    <div class="container">
        <div class="row">
            <div class="row mx-0 px-4">
                <h2 class="col py-4 s12 font-weight-bold">TollBooth Details</h2>
                <div class="col s12 m6">
                    <div class="bg-light px-3 py-1 mb-2 mb-md-0">
                        <div class="input-field border-bottom-0">
                            <input id="tollbooth-id" type="text" class="validate my-0" v-model="id" disabled>
                            <label for="tollbooth-id" class="pt-1"></label>
                        </div>
                    </div>
                </div>
                <div class="col s12 m6">
                    <div class="bg-light px-3 py-1">
                        <div class="input-field border-bottom-0">
                            <input id="name" type="text" class="validate my-0" v-model="name">
                            <label for="name" class="pt-1">TollBooth Name</label>
                        </div>
                    </div>
                </div>
                <div class="col s12 my-2"></div>

                <div class="col s12">
                    <div class="bg-light px-3 py-1 mb-2 mb-md-0">
                        <div class="input-field border-bottom-0">
                            <input id="location" type="text" class="validate my-0" v-model="location">
                            <label for="location" class="pt-1">Location</label>
                        </div>
                    </div>
                </div>
                <div class="col s12 my-4"></div>
                <div class="col s12 text-right">
                    <div v-if="loading" class="progress" style="height:5px">
                        <div class="indeterminate"></div>
                    </div>                    
                    <button v-else @click="create()" :disabled="!id || !name || !location" class="btn btn-large btn-primary px-5">Create</button>    
                </div>                
            </div>
        </div>        
    </div>
</template>

<script>
export default {

    data() {
        return {
            loading: false,
            id: null, name: null, location: null
        }
    },

    methods: {
        create() {
            let ref = "tollbooth",
                obj = {
                    id: this.id,
                    name: this.name,
                    location: this.location,
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString()
                }

            if (! navigator.onLine) {
                M.toast({ html: "You are Offline!" })
                return
            }

            this.loading = true
            this.firebase_push_db({ ref, obj }, (res) => {

                console.log(res, 'my-response.')
                this.loading = false
                M.toast({ html: "TollBooth Created Successfully!" })
            },
            (err) => {
                M.toast({ html: err })
                console.log(err, 'my-error')
            })
        }
    },

    mounted() {
        this.id = "TB# " + Date.now().toString() + ""
    }

}
</script>

<style>

</style>