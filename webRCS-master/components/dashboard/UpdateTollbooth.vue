<template>
    <div class="container">
        <div class="row">
            <div class="row mx-0 px-4">
                <h2 class="col py-4 s12 font-weight-bold">TollBooth Details</h2>
                <div class="col s12 m6">
                    <div class="bg-light px-3 py-1 mb-2 mb-md-0">
                        <div class="input-field border-bottom-0">
                            <input @change="selectToll($event)" type="text" id="tollbooth-id" class="autocomplete" v-model="id" autocomplete="off">
                            <label for="tollbooth-id">Tollbooth #ID</label>                            
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
                    <button v-else @click="update()" :disabled="!id || !name || !location" class="btn btn-large btn-primary px-5">Update</button>    
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
            id: null, name: null, location: null, key: null,
            tollbooths: []
        }
    },

    methods: {
        selectToll(e) {
            this.id = e.target.value

            let data = this.tollbooths.filter(el => el.id == this.id)[0]

            if (data) {
                this.name = data.name;
                this.location = data.location
                this.key = data.key
            }

            
        },
        update() {
            let ref = "tollbooth/" + this.key,
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
            this.firebase_update({ ref, obj }, (res) => {

                this.loading = false
                M.toast({ html: "TollBooth Updated Successfully!" })
            },
            (err) => {
                M.toast({ html: err })
                console.log(err, 'my-error')
            })
        }
    },

    mounted() {
        
        this.firebase_get("tollbooth", (res) => {
            this.loading = false
            this.tollbooths = res
            
            let tolls = {}
            for (let i=0; i< this.tollbooths.length; i++) {
                tolls[this.tollbooths[i].id] = null
            }

            $(document).ready(function() {
                $('input.autocomplete').autocomplete({
                data: tolls
                });
            });

        })

        
        
    }

}
</script>

<style>

</style>