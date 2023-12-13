<script setup lang="ts">
import { onMounted } from 'vue'
import { calculate } from './rabbit'

onMounted(() => {
	// 1.数组中找出n个数求和等于目标值target的数组下标数组
	// const nums = [3,2,4,5,7] // 源数组
	// const target = 10 // 目标值
	// const n = 3 // 元素个数
	// const result = getArray(nums, target, n)
	// console.log(result)

	// 2.promise yield生成器顺序执行异步函数(不使用 async/await)
	// const ajaxList = [
	//     new Promise((resolve, reject) => {
	//         console.log(1)
	//         setTimeout(() => {
	//             resolve(true)
	//         }, 1000)
	//     }),
	//     new Promise((resolve, reject) => {
	//         console.log(2)
	//         setTimeout(() => {
	//             resolve(true)
	//         }, 1000)
	//     }),
	//     new Promise((resolve, reject) => {
	//         console.log(3)
	//         setTimeout(() => {
	//             resolve(true)
	//         }, 1000)
	//     }),
	// ]
	// const fn = function* (ajaxList) {
	//     const promiseList = []
	//     for (const ajax of ajaxList) {
	//         const promise = yield ajax
	//         promiseList.push(promise)
	//     }

	//     return Promise.resolve(promiseList)
	// }
	// startPromise(fn(ajaxList)).then(data => {
	//     console.log(data) // [true, true, true]
	// })

	// 3.一对兔子生一对兔子
	// 第24个月, 5个月成熟
	// console.log(calculate(24, 5).length) // 431
	// 第10个月, 4个月成熟
	console.log(calculate(10, 4).length) // 14
})

// 计算数组中n个元素求和为target的下标数组
function getArray(nums: Array<number>, target: number, n: number) {
    const array: Array<number> = []
    const result: Array<Array<number>> = []

    const handler = (num: number, targetNum: number) => {
        // console.log(array)
        if (targetNum === 0 && array.length === n) {
            console.log(`output->yes`, array)
            result.push([...array]) // 避免array更新数据影响
            return
        }

        for (let i = num; i < nums.length; i++) {
            if (nums[i] > targetNum) {
                break
            }

            // console.log(`output->当前循环`, nums[i])
            array.push(i)
            handler(i + 1, targetNum - nums[i])
            // console.log(`output->当前循环结束`, nums[i])
            array.pop()
        }
    }

    handler(0, target)
    return result[0]
}

// 生成器方式使 promise 顺序执行
function startPromise(fn) {
    return new Promise((resolve, reject) => {
        const array = []
        function next(preResult) {
            if (preResult) {
                array.push(preResult)
            }

            const result = fn.next()

            if (result.done) {
                resolve(array)
            } else {
                result.value.then(curResult => {
                    next(curResult)
                })
            }
        }

        next()
    })
}
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
