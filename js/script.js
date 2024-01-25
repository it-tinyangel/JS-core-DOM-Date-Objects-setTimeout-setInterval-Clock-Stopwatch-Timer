document.addEventListener('DOMContentLoaded', () => {
	// elements of date
	const dateElement = document.querySelector('.clock__date-value');

	// elements of clock
	const timeHourElement = document.querySelector('.clock__time__hour');
	const timeMinElement = document.querySelector('.clock__time__min');
	const timeSecElement = document.querySelector('.clock__time__sec');

	// elements of stopwatch
	const stopwatchHourElement = document.querySelector('.stopwatch__time__hour');
	const stopwatchMinElement = document.querySelector('.stopwatch__time__min');
	const stopwatchSecElement = document.querySelector('.stopwatch__time__sec');
	const stopwatchMillisecElement = document.querySelector('.stopwatch__time__milisec');

	const startStopwatchButton = document.querySelector('.stopwatch__btn__start');
	const stopStopwatchButton = document.querySelector('.stopwatch__btn__stop');
	const loopStopwatchButton = document.querySelector('.stopwatch__btn__loop');
	const resetStopwatchButton = document.querySelector('.stopwatch__btn__reset');

	const loopDisplayStopwatchElement = document.querySelector('.stopwatch__loop-display');

	// elements of timer
	const timerDisplayMinElement = document.querySelector('.timer__display__min');

	const timerCountMinElement = document.querySelector('.timer__count-display__min');
	const timerCountSecElement = document.querySelector('.timer__count-display__sec');

	const plusTimerButton = document.querySelector('.timer__btn__plus');
	const minusTimerButton = document.querySelector('.timer__btn__minus');
	const startTimerButton = document.querySelector('.timer__btn__start');
	const stopTimerButton = document.querySelector('.timer__btn__stop');
	const resetTimerButton = document.querySelector('.timer__btn__reset');

	/* variables for stopwatch */
	let stopwatchInterval;
	let startTime;
	let loopTimes = [];
	let stopwatchTime = {
		hour: 0,
		min: 0,
		sec: 0,
		millisec: 0
	};

	// variables for timer 
	let timerInterval;
	let timerMinutes = 0;
	let timerSeconds = 0;
	let timerRunning = false;
	let isPaused = false;

	currentClock();

	startStopwatchButton.addEventListener('click', startStopwatch);
	stopStopwatchButton.addEventListener('click', stopStopwatch);
	loopStopwatchButton.addEventListener('click', loopStopwatch);
	resetStopwatchButton.addEventListener('click', resetStopwatch);

	plusTimerButton.addEventListener('click', increaseTimer);
	minusTimerButton.addEventListener('click', decreaseTimer);
	startTimerButton.addEventListener('click', startTimer);
	stopTimerButton.addEventListener('click', stopTimer);
	resetTimerButton.addEventListener('click', resetTimer);

	function currentClock() {
		const currentDate = new Date();

		dateElement.textContent = currentDate.toLocaleDateString();
		timeHourElement.textContent = ('0' + currentDate.getHours()).slice(-2);
		timeMinElement.textContent = ('0' + currentDate.getMinutes()).slice(-2);
		timeSecElement.textContent = ('0' + currentDate.getSeconds()).slice(-2);

		setInterval(currentClock, 1000);
	}

	/* stopwatch */
	function startStopwatch() {
		startTime = new Date().getTime();
		stopwatchInterval = setInterval(updateStopwatch, 10);
	}

	function stopStopwatch() {
		clearInterval(stopwatchInterval);
	}

	function loopStopwatch() {
		const currentStopwatchTime = getCurrentStopwatchTime();

		loopTimes.push(currentStopwatchTime);
		displayLoopTimes();
	}

	function resetStopwatch() {
		clearInterval(stopwatchInterval);

		stopwatchHourElement.innerText = '00';
		stopwatchMinElement.innerText = '00';
		stopwatchSecElement.innerText = '00';
		stopwatchMillisecElement.innerText = '000';

		loopTimes = [];
		stopwatchTime = {
			hour: 0,
			min: 0,
			sec: 0,
			millisec: 0
		};

		displayLoopTimes();
	}

	function updateStopwatch() {
		stopwatchTime.millisec += 10; 

		if (stopwatchTime.millisec >= 1000) {
			stopwatchTime.millisec = 0;
			stopwatchTime.sec += 1;
		}

		if (stopwatchTime.sec >= 60) {
			stopwatchTime.sec = 0;
			stopwatchTime.min += 1;
		}

		if (stopwatchTime.min >= 60) {
			stopwatchTime.min = 0;
			stopwatchTime.hour += 1;
		}

		stopwatchHourElement.textContent = ('0' + stopwatchTime.hour).slice(-2);
		stopwatchMinElement.textContent = ('0' + stopwatchTime.min).slice(-2);
		stopwatchSecElement.textContent = ('0' + stopwatchTime.sec).slice(-2);
		stopwatchMillisecElement.textContent = ('00' + stopwatchTime.millisec).slice(-3);
	}

	function getCurrentStopwatchTime() {
		return (
			('0' + stopwatchTime.hour).slice(-2) + ':' +
			('0' + stopwatchTime.min).slice(-2) + ':' +
			('0' + stopwatchTime.sec).slice(-2) + ':' +
			('00' + stopwatchTime.millisec).slice(-3)
		);
	}

	function displayLoopTimes() {
		loopDisplayStopwatchElement.innerHTML = '';

		loopTimes.forEach((loopTime) => {
			const loopItem = document.createElement('div');

			loopItem.innerText = loopTime;
			loopDisplayStopwatchElement.appendChild(loopItem);
		});
	}

	/* timer */
	function increaseTimer() {
		if (!isPaused && !timerRunning || timerMinutes >= 0) {
			timerMinutes += 1;
			updateTimerDisplay();
		}
	}

	function decreaseTimer() {
		if (!isPaused && !timerRunning || timerMinutes > 0) {
			timerMinutes -= 1;
			updateTimerDisplay();
		}
	}

	function startTimer() {
		if (!timerRunning) {
			if (isPaused) {
				timerInterval = setInterval(updateTimer, 1000);
			} else {
				timerInterval = setInterval(updateTimer, 1000);
				isPaused = false;
			}
			timerRunning = true;
		}
	}

	function stopTimer() {
		if (timerRunning) {
			clearInterval(timerInterval);
			timerRunning = false;
			isPaused = true;
		}
	}

	function resetTimer() {
		clearInterval(timerInterval);
		timerMinutes = 0;
		timerSeconds = 0;
		isPaused = false;

		updateTimerDisplay();
		updateTimerStart();
	}

	function updateTimerDisplay() {
		timerDisplayMinElement.textContent = ('0' + timerMinutes).slice(-2);
	}

	function updateTimerStart() {
		timerCountMinElement.textContent = ('0' + timerMinutes).slice(-2);
		timerCountSecElement.textContent = ('0' + timerSeconds).slice(-2);

		if (!timerRunning) {
			startTimer();
		}
	}

	function updateTimer() {
		if (timerMinutes === 0 && timerSeconds === 0) {
			stopTimer();
			startTimer();
		} else if (timerSeconds === 0) {
			timerSeconds = 59;
			timerMinutes -= 1;
		} else {
			timerSeconds -= 1;
		}

		updateTimerStart();
	}
});
