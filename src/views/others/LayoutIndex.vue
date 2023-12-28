<script setup lang="ts">
import { onMounted } from 'vue'
import { calculate } from '@/utils/rabbit'

onMounted(() => {
	// 3.一对兔子生一对兔子
	// 第24个月, 5个月成熟
	// console.log(calculate(24, 5).length) // 431
	// 第10个月, 4个月成熟
	console.log(calculate(10, 4).length) // 14
})
</script>

<template>
    <section class="page-container">
        <div class="header-module">Header</div>
        <div class="main-module">
            <div class="main-col left">
                <i class="icon icon1">1</i>
                <i class="icon icon2">2</i>
            </div>
            <div class="main-col right"></div>
        </div>
        <div class="footer-module">Footer</div>
    </section>
</template>

<style lang="scss" scoped>
.page-container {
    display: flex;
    flex-direction: column;
    width: 400px;
    min-height: 400px;
    .header-module {
        flex: 0 0 60px;
        background-color: #e4e4e4;
    }

    .main-module {
        flex: 1;
        display: grid;
        grid-template-columns: 2fr 1fr;
        background-color: rgb(255, 250, 100);
        .main-col {
            &.left {
                position: relative;
                background-color: #f3d5d5;
                .icon {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    background-color: rgb(188, 193, 236);
                }
                .icon1 {
                    top: 100px;
                    left: 30px;
                }
                .icon2 {
                    top: 130px;
                    left: 60px;
                }
            }
            &.right {
                background-color: #d9eff7;
            }
        }
    }

    .footer-module {
        flex: 0 0 60px;
        background-color: #a0a0a0;
    }
}
</style>
../../utils/rabbit
