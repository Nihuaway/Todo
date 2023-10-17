export const dateToNearFormat = (milliseconds) => {
	const seconds = parseInt(milliseconds / 1000)
	if (seconds < 10) {
		return 'Только что'
	}
	else if (seconds < 60) {
		return parseInt(seconds) + ' секунд назад'
	}
	else if (seconds < 3600) {
		const minutes = parseInt(seconds / 60)
		if (minutes === 1) return minutes + ' минуту назад'
		else if (minutes < 5) return minutes + ' минуты назад'
		else return minutes + ' минут назад'
	}
	else if (seconds < 86400) {
		const hours = parseInt(seconds / 3600)
		if (hours === 1) return hours + ' час назад'
		else if (hours < 5) return hours + ' часа назад'
		else return hours + ' часов назад'
	}
	else if (seconds < 604800) {
		const days = parseInt(seconds / 3600 / 24)
		if (days === 1) return days + ' день назад'
		else if (days < 5) return days + ' дня назад'
		else return days + ' дней назад'
	}
	else if (seconds < 2419200) {
		const weeks = parseInt(seconds / 3600 / 24 / 7)
		if (weeks === 1) return weeks + ' неделю назад'
		else if (weeks < 5) return howeeksurs + ' недели назад'
		else return weeks + ' недель назад'
	}
	else if (seconds < 29030400) {
		const months = parseInt(seconds / 3600 / 24 / 7 / 4)
		if (months === 1) return months + ' месяц назад'
		else if (months < 5) return months + ' месяца назад'
		else return months + ' месяцев назад'
	}

	return 'Давно'
}	