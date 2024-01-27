document.addEventListener('DOMContentLoaded', () => {
	const dateElement = document.querySelector('.clock__date-value');

	const timeHourElement = document.querySelector('.clock__time__hour');
	const timeMinElement = document.querySelector('.clock__time__min');
	const timeSecElement = document.querySelector('.clock__time__sec');

	const stopwatchHourElement = document.querySelector('.stopwatch__time__hour');
	const stopwatchMinElement = document.querySelector('.stopwatch__time__min');
	const stopwatchSecElement = document.querySelector('.stopwatch__time__sec');
	const stopwatchMillisecElement = document.querySelector('.stopwatch__time__milisec');

	const startStopwatchButton = document.querySelector('.stopwatch__btn__start');
	const stopStopwatchButton = document.querySelector('.stopwatch__btn__stop');
	const loopStopwatchButton = document.querySelector('.stopwatch__btn__loop');
	const resetStopwatchButton = document.querySelector('.stopwatch__btn__reset');

	const loopDisplayStopwatchElement = document.querySelector('.stopwatch__loop-display');

	const timerDisplayMinElement = document.querySelector('.timer__display__min');

	const timerCountMinElement = document.querySelector('.timer__count-display__min');
	const timerCountSecElement = document.querySelector('.timer__count-display__sec');

	const plusTimerButton = document.querySelector('.timer__btn__plus');
	const minusTimerButton = document.querySelector('.timer__btn__minus');
	const startTimerButton = document.querySelector('.timer__btn__start');
	const stopTimerButton = document.querySelector('.timer__btn__stop');
	const resetTimerButton = document.querySelector('.timer__btn__reset');

	const stopwatch = {
		timerInterval: null,
		loopTimes: [],
		stopwatchTime: {
			hour: 0,
			min: 0,
			sec: 0,
			millisec: 0,
		},
		currentStopwatchTime: 0,
		stopPoints: [],
		maxStopPoints: 10,
	};

	startClock();

	startStopwatchButton.addEventListener('click', startStopwatch);
	stopStopwatchButton.addEventListener('click', stopStopwatch);
	loopStopwatchButton.addEventListener('click', loopStopwatch);
	resetStopwatchButton.addEventListener('click', resetStopwatch);

	plusTimerButton.addEventListener('click', increaseTimer);
	minusTimerButton.addEventListener('click', decreaseTimer);
	startTimerButton.addEventListener('click', startTimer);
	stopTimerButton.addEventListener('click', stopTimer);
	resetTimerButton.addEventListener('click', resetTimer);

	/* clock */
	function updateClock() {
		const currentDate = new Date();

		dateElement.textContent = currentDate.toLocaleDateString();
		timeHourElement.textContent = padZero(currentDate.getHours());
		timeMinElement.textContent = padZero(currentDate.getMinutes());
		timeSecElement.textContent = padZero(currentDate.getSeconds());
	}

	function startClock() {
		updateClock();
		setInterval(updateClock, 1000);
	}

	function padZero(value, length = 2) {
		return value.toString().padStart(length, '0');
	}

	/* stopwatch */
	function startStopwatch() {
		stopStopwatch();
		stopwatch.timerInterval = setInterval(updateStopwatch, 10);
	}

	function stopStopwatch() {
		clearInterval(stopwatch.timerInterval);
		updateStopPoints();
	}

	function loopStopwatch() {
		stopwatch.currentStopwatchTime = getCurrentStopwatchTime();

		const { loopTimes, maxStopPoints, currentStopwatchTime } = stopwatch;

		if (loopTimes.length >= maxStopPoints) {
			loopTimes.shift();
		}

		loopTimes.push(currentStopwatchTime);

		displayLoopTimes();
	}

	function resetStopwatch() {
		resetStopwatchTimeDisplay();
		clearStopwatchData();
		displayLoopTimes();
	}

	function updateStopwatch() {
		stopwatch.stopwatchTime.millisec++;
		updateStopwatchDisplay();
	}

	function updateStopwatchDisplay() {
		const time = convertMillisecToTime(stopwatch.stopwatchTime.millisec);

		updateStopwatchElements(time);
	}

	function updateStopwatchElements(time) {
		const { hour, min, sec, millisec } = time;

		stopwatchHourElement.textContent = padZero(hour);
		stopwatchMinElement.textContent = padZero(min);
		stopwatchSecElement.textContent = padZero(sec);
		stopwatchMillisecElement.textContent = padZero(millisec, 3);
	}

	function convertMillisecToTime(millisec) {
		const hour = Math.floor(millisec / (3600 * 1000));
		const min = Math.floor((millisec % (3600 * 1000)) / (60 * 1000));
		const sec = Math.floor((millisec % (60 * 1000)) / 1000);
		const millisecRemainder = millisec % 1000;

		return {
			hour: hour,
			min: min,
			sec: sec,
			millisec: millisecRemainder
		};
	};

	function getCurrentStopwatchTime() {
		return convertMillisecToTime(stopwatch.stopwatchTime.millisec);
	}

	function displayLoopTimes() {
		loopDisplayStopwatchElement.innerHTML = stopwatch.loopTimes.map(formatTime).join('');
	}

	function clearStopwatchData() {
		clearInterval(stopwatch.timerInterval);
		stopwatch.loopTimes = [];
	}

	function resetStopwatchTimeDisplay() {
		stopwatchHourElement.textContent = '00';
		stopwatchMinElement.textContent = '00';
		stopwatchSecElement.textContent = '00';
		stopwatchMillisecElement.textContent = '000';
	};

	function formatTime(time) {
		const { hour, min, sec, millisec } = time;

		return `<div class="stopwatch__time">
                <span class="stopwatch__time__hour">${padZero(hour)}</span>
                <span>:</span>
                <span class="stopwatch__time__min">${padZero(min)}</span>
                <span>:</span>
                <span class="stopwatch__time__sec">${padZero(sec)}</span>
                <span>:</span>
                <span class="stopwatch__time__count">${padZero(millisec, 3)}</span>
            </div>`;
	}

	function updateStopPoints() {
		const { stopPoints, maxStopPoints, stopwatchTime } = stopwatch;

		if (stopPoints.length >= maxStopPoints) {
			stopPoints.shift();
		}

		stopPoints.push(stopwatchTime);
	};
});
