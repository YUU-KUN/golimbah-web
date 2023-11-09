<template>
    <button class="w-full bg-primary rounded py-4 text-center text-white text-24 font-semibold">{{ text }}</button>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        }
    }
}
</script>

<style></style>