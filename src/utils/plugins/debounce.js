export function debounce(fn, delay, immediate = false) {
	let timer = null

	return function () {
		if (timer) {
			clearTimeout(timer)
			timer = null
		}

		if (!timer && immediate) {
			fn.apply(this, arguments)
			timer = setTimeout(() => {
				timer = null
			}, delay)
		} else {
			timer = setTimeout(() => {
				fn.apply(this, arguments)
			}, delay);
		}
	}
}
