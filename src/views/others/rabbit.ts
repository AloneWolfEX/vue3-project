// 兔子类 - 一对
class Rabbit {
	age: number = 0 // 年龄月数

	constructor(age?: number) { // 设置默认月龄
		if (age) {
			this.age = age
		}
	}

	update() { // 每月更新月龄
		this.age += 1
	}
}

// 计算兔子对数 month: 月数, adultAge: 到达成年月数
export function calculate(month: number, adultAge: number) {
	const rabbitArray = [new Rabbit(1)] // 初始化默认月龄1
	// 月份循环
	for (let i = 2; i <= month; i++) {
		// 兔子对数循环, 从第二月开始月龄+1
		rabbitArray.forEach(rabbit => {
			rabbit.update()
			if (rabbit.age >= adultAge) {
				rabbitArray.push(new Rabbit())
			}
		})
	}

	return rabbitArray
}
