export function throttle(fn, delay) {
	let startTime = Date.now()

	return function () {
		const nowTime = Date.now()
		if (nowTime - startTime >= delay) {
			startTime = nowTime
			return fn.apply(this, arguments)
		}
	}
}
