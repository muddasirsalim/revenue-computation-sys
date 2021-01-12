<template>
    <!-- The Modal -->
    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog"  id="details-modal" aria-hidden="true">
        <div class="modal-dialog  modal-lg position-relative" style="z-index:100000">
            <div class="modal-content">
                

                    <!-- Modal Header -->
                    <div class="modal-header border-0">
                        <button type="button" class="close text-primary mdi mdi-close-circle" data-dismiss="modal"></button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body border-none px-0 px-md-4">
                        <div class="row">
                            <h4 class="col s12 border-bottom pb-4 font-weight-bold">Order Details</h4>
                        </div>
                        <div class="row px-0">
                            <div class="col s12 m12 l8 px-0 px-md-2">
                                <h6 class="font-weight-bold d-flex align-items-center justify-content-between">
                                    <span class="text-super-light">Order Id:</span>
                                    <span class="text-black font-weight-bold">SAMLX231</span>
                                </h6>
                                <h6 class="font-weight-bold d-flex align-items-center justify-content-between">
                                    <span class="text-super-light">Order Id:</span>
                                    <span class="text-black font-weight-bold">Mail-in</span>
                                </h6>
                                <h6 class="font-weight-bold d-flex align-items-center justify-content-between">
                                    <span class="text-super-light">Order Date and Time:</span>
                                    <span class="text-black font-weight-bold">17-10-2020, 08:00 AM</span>
                                </h6>
                                <h6 class="font-weight-bold d-flex align-items-center justify-content-between">
                                    <span class="text-super-light">Order Id:</span>
                                    <span class="text-black font-weight-bold">SAMLX231</span>
                                </h6>
                                <h6 class="font-weight-bold">Order Description:</h6>
                            </div>
                            <div class="col s12 m12 l4 px-0 px-md-2">
                                <img :src="photoImg" class="w-100 materialboxed" alt="">
                            </div>
                            <div class="col s12 my-4 px-0 px-md-2">
                                <textarea class="w-100" style="min-height:100px" name="" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div class="col s12 px-0 px-md-2">
                                <h6 class="font-weight-bold d-flex align-items-center justify-content-between">
                                    <span class="text-super-light">Order Id:</span>
                                    <span class="text-black font-weight-bold">SAMLX231</span>
                                </h6>
                                <h6 class="font-weight-bold d-flex align-items-center justify-content-between">
                                    <span class="text-super-light">Order Id:</span>
                                    <span class="text-black font-weight-bold">Mail-in</span>
                                </h6>
                                <h6 class="font-weight-bold d-flex align-items-center justify-content-between">
                                    <span class="text-super-light">Order Date and Time:</span>
                                    <span class="text-black font-weight-bold">17-10-2020, 08:00 AM</span>
                                </h6>
                                <h6 class="font-weight-bold d-flex align-items-center justify-content-between">
                                    <span class="text-super-light">Order Id:</span>
                                    <span class="text-black font-weight-bold">SAMLX231</span>
                                </h6>
                            </div>                            
                        </div>
                    </div>

            </div>
        </div>
    </div>
</template>

<script>
import photoImg from '../../../assets/images/mobile_image.png'
export default {
    data() {

        return {
            photoImg: photoImg
        }
    },
    mounted() {
        $(document).ready(function(){
            $('.materialboxed').materialbox();
        });        
    }
}
</script>

<style>

</style>