<template>
    <div class="container">
        <div class="row">
            <div class="row mx-0 px-4">
                <h2 class="col py-4 s12 font-weight-bold">TollBooth ID #</h2>
                <div class="col s12">
                    <div class="bg-light px-3 py-1 mb-2 mb-md-0">
                        <div class="input-field border-bottom-0">
                            <input @keyup="search()" @blur="hideResult()" id="tollbooth-id" type="text" class="validate my-0" v-model="id" autocomplete="off">
                            <label for="tollbooth-id" class="pt-1"></label>
                        </div>
                    </div>
                    <div class="w-100">
                        <button @click="id = tollbooth.id, key = tollbooth.key" :key="i" v-for="(tollbooth, i) in filterSearch" class="btn btn-flat transparent border-bottom bd-radius-0 btn-block btn-large text-left">
                            <span v-html="highlight(tollbooth.id)"></span>
                        </button>
                    </div>
                </div>
                <div class="col s12 my-4"></div>
                <div class="col s12 text-right">
                    <div v-if="loading" class="progress" style="height:5px">
                        <div class="indeterminate"></div>
                    </div>                    
                    <button v-else @click="deleteTollbooth()" :disabled="!id || id.length != 17" class="btn btn-large btn-primary px-5">Delete</button>    
                </div>                
            </div>
        </div>        
    </div>
</template>

<script>
export default {

    data() {
        return {
            tollbooths: [],
            filterSearch: [],
            loading: false,
            id: null,
            key: null
        }
    },

    methods: {
        hideResult() {
            setTimeout(() => {
                this.filterSearch = []
            
            }, 500);
        },
        highlight(str) {
            return str.split(this.id).join("<mark>"+this.id+"</mark>")
        },
        search() {
            let $this = this
            this.filterSearch = this.tollbooths.filter(function(el) {
                return el.id.toLowerCase().includes($this.id.toLowerCase())
            })

        },  

        deleteTollbooth() {
            let ref = "tollbooth/" + this.key

            M.toast({ html: "Please Wait..." })


            if (! navigator.onLine) {
                M.toast({ html: "You are Offline!" })
                return
            }

            this.firebase_remove_one(ref, (res) => {
                M.toast({ html: "TollBooth Deleted Successfully" })
            },
            (err) => {
                M.toast({ html: err })
                console.log(err, 'my-error')
            })
        }
    },

    mounted() {
        this.id = "TB# "
        
        this.firebase_get("tollbooth", (res) => {
            this.loading = false
            this.tollbooths = res

        })
    }

}
</script>

<style>

</style>