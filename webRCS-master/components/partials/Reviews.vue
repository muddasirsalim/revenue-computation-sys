<template>
    <div class="row mx-0 my-5 position-relative px-4 bg-light py-5">
        <h2 class="s12 archivo-font text-center mb-5 mt-5 px-0">Our Customers</h2>
        <div class="row m-0 justify-content-center px-0 position-relative">
            <div data-aos="fade-up" class="col l4 m6 s12 p-0 p-md-4 my-4" v-for="(customer, i) in customers.slice(0, 6)" :key="i">
                <div class="mx-auto bg-white shadow text-center p-5">
                    <div class="row">
                        <div class="col m2 s12 px-1">
                            <p class="mdi mdi-format-quote-open text-center d-inline-block mdi-36px bg-primary round-top-left text-white py-0 px-2 m-0"></p>
                        </div>
                        <div class="col m10 pl-md-5 pl-0 pt-4 pt-md-0">
                            <h5 class="font-weight-bold">{{ customer.name }}</h5>
                            <p class="text-super-light mb-0">{{ customer.state }}</p>
                            <div>
                                <button :key="j" v-for="(star, j) in 5" :class="customer.rating > j ? 'text-warning' : 'text-super-light'" class="mdi mdi-star btn p-0 pr-1 btn-flat transparent"></button>
                            </div>
                        </div>
                        <div class="col s12 mt-5">
                            <p  data-position="bottom" :data-tooltip="customer.description" class="small tooltipped">{{ customer.description.substr(0, 100) }}</p>
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
            customers: [
                { name: "Esther Howard", state: "Napverille", rating: 4, description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."},
                { name: "Esther Howard", state: "Napverille", rating: 4, description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velitt minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Veli officia consequat duis enim velit mollit."},
                { name: "Esther Howard", state: "Napverille", rating: 4, description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."},
                { name: "Esther Howard", state: "Napverille", rating: 4, description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."},
                { name: "Esther Howard", state: "Napverille", rating: 4, description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."},
                { name: "Esther Howard", state: "Napverille", rating: 4, description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."},
                { name: "Esther Howard", state: "Napverille", rating: 4, description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."},
                { name: "Esther Howard", state: "Napverille", rating: 4, description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."},
                { name: "Esther Howard", state: "Napverille", rating: 4, description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."},
            ]
        }            
    },    
    mounted() {
        $(document).ready(function(){
            $('.tooltipped').tooltip();
        });        
    }
}
</script>

<style>

</style>