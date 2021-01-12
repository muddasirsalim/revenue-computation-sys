<template>
    <div class="row mx-0">
        <div class="col s12 my-5">
            <h1 class="archivo-font text-center">{{ title }}</h1>
            <h4 class="text-center font-weight-light text-light my-3">{{ description }}</h4>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            required: false,
            default: "Choose your Cellphone"
        },
        description: {
            required: false,
            default: "Choose your Cellphone"
        }
    }
}
</script>

<style>

</style>