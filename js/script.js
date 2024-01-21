document.addEventListener('DOMContentLoaded', () => {
	const dateDisplaying = document.querySelector('span.clock__date');

	const hoursDisplaying = document.querySelector('.clock__time__hour');
	const minutesDisplaying = document.querySelector('.clock__time__min');
	const secondsDisplaying = document.querySelector('.clock__time__sec');

	const stopwatchHours = document.querySelector('.stopwatch__time__hour');
	const stopwatchMinutes = document.querySelector('.stopwatch__time__min');
	const stopwatchSeconds = document.querySelector('.stopwatch__time__sec');
	const stopwatchMiliseconds = document.querySelector('.stopwatch__time__milisec');

	const startButton = document.querySelector('.stopwatch__btn__start');
	const stopButton = document.querySelector('.stopwatch__btn__stop');
	const loopButton = document.querySelector('.stopwatch__btn__loop');
	const resetButton = document.querySelector('.stopwatch__btn__reset');

	const loopDisplay = document.querySelector('.stopwatch__loop-display');

	let stopwatch = {
		timerInterval: null,
		startTime: 0,
		elapsedTime: 0,
		stopPoints: [],
		maxStopPoints: 5,
	};

	showDate();

	showTime();

	startButton.addEventListener('click', startStopwatch);
	stopButton.addEventListener('click', stopStopwatch);
	loopButton.addEventListener('click', displayLastTimeStopwatch);
	resetButton.addEventListener('click', resetStopwatch);

	function showDate() {
		let date = new Date();
		let day = date.getDate();
		let month = date.getMonth() + 1;
		let year = date.getFullYear();

		let currentDate = `${padZero(day)}.${padZero(month)}.${padZero(year)}`;

		dateDisplaying.innerHTML = currentDate;
	}

	function showTime() {
		let time = new Date();
		let hours = time.getHours();
		let minutes = time.getMinutes();
		let seconds = time.getSeconds();

		hoursDisplaying.innerHTML = padZero(hours);
		minutesDisplaying.innerHTML = padZero(minutes);
		secondsDisplaying.innerHTML = padZero(seconds);

		setInterval(showTime, 1000);
	}

	function startStopwatch() {
		if (!stopwatch.timerInterval) {
			stopwatch.startTime = new Date().getTime() - stopwatch.elapsedTime;
			updateStopwatch();
		}
	}

	function stopStopwatch() {
		if (stopwatch.timerInterval) {
			const stopTime = new Date().getTime();

			if (stopwatch.stopPoints.length >= stopwatch.maxStopPoints) {
				stopwatch.stopPoints.shift();
			}

			stopwatch.stopPoints.push(stopTime);

			clearInterval(stopwatch.timerInterval);
			stopwatch.timerInterval = null;
		}
	}

	function displayLastTimeStopwatch() {
		const lastStopTime = stopwatch.stopPoints[stopwatch.stopPoints.length - 1];

		if (lastStopTime) {
			const elapsedHours = Math.floor(stopwatch.elapsedTime / (3600 * 1000));
			const elapsedMinutes = Math.floor((stopwatch.elapsedTime % (3600 * 1000)) / (60 * 1000));
			const elapsedSeconds = Math.floor((stopwatch.elapsedTime % (60 * 1000)) / 1000);
			const elapsedMilliseconds = stopwatch.elapsedTime % 1000;

			const displayText = `
				<div class="stopwatch__time">
					<span class="stopwatch__time__hour">${padZero(elapsedHours)}</span>
					<span>:</span>
					<span class="stopwatch__time__min">${padZero(elapsedMinutes)}</span>
					<span>:</span>
					<span class="stopwatch__time__sec">${padZero(elapsedSeconds)}</span>
					<span>:</span>
					<span class="stopwatch__time__count">${padZero(elapsedMilliseconds, 3)}</span>
				</div>
			`;

			loopDisplay.innerHTML += displayText;
		}
	}

	function resetStopwatch() {
		loopDisplay.innerHTML = '';

		clearStopwatchData();
		updateTime();
	}

	function clearStopwatchData() {
		clearInterval(stopwatch.timerInterval);
		stopwatch.timerInterval = null;
		stopwatch.startTime = new Date().getTime();
		stopwatch.elapsedTime = 0;
		stopwatch.stopPoints = [];
	}

	function updateStopwatch() {
		stopwatch.timerInterval = setTimeout(updateStopwatch, 10);
		updateTime();
	}

	function updateTime() {
		const currentTime = new Date().getTime();
		stopwatch.elapsedTime = currentTime - stopwatch.startTime;

		const hours = Math.floor(stopwatch.elapsedTime / (3600 * 1000));
		const minutes = Math.floor((stopwatch.elapsedTime % (3600 * 1000)) / (60 * 1000));
		const seconds = Math.floor((stopwatch.elapsedTime % (60 * 1000)) / 1000);
		const milliseconds = stopwatch.elapsedTime % 1000;

		stopwatchHours.innerText = padZero(hours);
		stopwatchMinutes.innerText = padZero(minutes);
		stopwatchSeconds.innerText = padZero(seconds);
		stopwatchMiliseconds.innerText = padZero(milliseconds, 3);
	}

	function padZero(value, length = 2) {
		return value.toString().padStart(length, '0');
	}
});
