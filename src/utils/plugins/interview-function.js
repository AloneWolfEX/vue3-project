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

// 累加 1-100 求和
function sum(n) {
	if (n === 1) {
		return 1
	}
	return sum(n - 1) + n
}

function sum2 (result, start) {
	result += start
	start++
	if (start > 100) {
		return result
	}
	return sum2(result, start)
}

/**
 * 计算数组指定元素个数求和为目标值的索引下标
 * @param {*} array 原数组
 * @param {*} target 目标值
 * @param {*} n 元素个数
 */
function handleArray(array, target, n) {
	const tempArray = []
	const result = []

	function handler(num, targetNum) {
		if (targetNum === 0 && tempArray.length === n) {
			result.push([...tempArray])
			return
		}

		for(let i = num, len = array.length; i < len; i++) {
			if (targetNum < array[i]) {
				break
			}

			tempArray.push(array[i])
			handler(i + 1, targetNum - array[i])
			tempArray.pop()
		}
	}

	handler(0, target)

	return result[0]
}

class Rabbit {
	age = 0

	constructor(age) {
		if (age) {
			this.age = age
		}
	}

	update() {
		this.age += 1
	}
}

function handleRabbit(month, targetAge) {
	const array = [new Rabbit(1)]

	for(let i = 2; i < month + 1; i++) {
		array.forEach((item, index, rabArray) => {
			item.update()
			if (item.age >= targetAge) {
				rabArray.push(new Rabbit())
			}
		})
	}

	return array
}
/*
// 1.数组中找出n个数求和等于目标值target的数组下标数组
const nums = [3,2,4,5,7] // 源数组
const target = 10 // 目标值
const n = 3 // 元素个数
const result = getArray(nums, target, n)
console.log(result) */

/*
// 2.promise yield生成器顺序执行异步函数(不使用 async/await)
const ajaxList = [
    new Promise((resolve, reject) => {
        console.log(1)
        setTimeout(() => {
            resolve(true)
        }, 1000)
    }),
    new Promise((resolve, reject) => {
        console.log(2)
        setTimeout(() => {
            resolve(true)
        }, 1000)
    }),
    new Promise((resolve, reject) => {
        console.log(3)
        setTimeout(() => {
            resolve(true)
        }, 1000)
    }),
]
const fn = function* (ajaxList) {
    const promiseList = []
    for (const ajax of ajaxList) {
        const promise = yield ajax
        promiseList.push(promise)
    }

    return Promise.resolve(promiseList)
}
startPromise(fn(ajaxList)).then(data => {
    console.log(data) // [true, true, true]
})
*/
