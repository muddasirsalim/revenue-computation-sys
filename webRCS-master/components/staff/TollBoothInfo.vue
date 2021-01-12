<template>
    <div class="container">
        <div class="row">
            <div class="row mx-0 px-4">
                <h2 class="col pt-4 s12 mb-0 pb-0">Your TollBooth Details</h2>
                <p class="col pb-4 pt-2 text-super-light s12">
                    <span class="mdi mdi-information-outline"></span>
                    This TollBooth is assigned to you on <span class="font-weight-bold text-black">{{ tollbooth.date }}</span>
                    at <span class="font-weight-bold text-success"> {{ tollbooth.time }}</span>
                </p>
                <div class="col s12 m6">
                    <div class="bg-light px-3 py-1">
                        <div class="input-field border-bottom-0">
                            <input id="id" type="text" class="validate my-0" v-model="tollbooth.id" placeholder="TollBooth #ID" disabled>
                        </div>
                    </div>
                </div>
                <div class="col s12 m6">
                    <div class="bg-light px-3 py-1">
                        <div class="input-field border-bottom-0">
                            <input id="name" type="text" class="validate my-0" v-model="tollbooth.name" placeholder="TollBooth Name" disabled>
                        </div>
                    </div>
                </div>
                <div class="col s12 my-2"></div>

                <div class="col s12">
                    <div class="bg-light px-3 py-1 mb-2 mb-md-0">
                        <div class="input-field border-bottom-0">
                            <input id="location" type="text" class="validate my-0" v-model="tollbooth.location" placeholder="Location" disabled>
                        </div>
                    </div>
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
            tollbooth: {},
        }
    },

    methods: {
    },

    mounted() {
        
        let user = this.getCookie("rcs-localstorage")

        if (user) {

            this.firebase_get_one("users/" + user.key, (res) => {
                
                this.tollbooth = res.toll
                console.log(res, 'res')
            })

        }                
    }

}
</script>

<style>

</style>