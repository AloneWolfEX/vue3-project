<script setup lang="ts">
import 'vue-cropper/dist/index.css'
import { VueCropper }  from "vue-cropper";

</script>

<template>
    <section class="img-cropper">
        <h1>图片裁剪 vue-cropper</h1>
        <div class="cropper-container">
            <!-- <vueCropper
                ref="cropper"
                :img="option.img"
                :outputSize="option.size"
                :outputType="option.outputType"
            ></vueCropper> -->
        </div>
    </section>
</template>

<style lang="scss" scoped>
</style>
