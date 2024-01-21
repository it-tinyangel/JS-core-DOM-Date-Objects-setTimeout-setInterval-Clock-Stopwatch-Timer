function showDate() {
	const dateOfDisplaying = document.querySelector('.clock__date');

	// Getting current time and date
	let date = new Date();
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	day = day < 10 ? '0' + day : day;
	month = month < 10 ? '0' + month : month;

	let currentDate = `${day}.${month}.${year}`;

	// Displaying the date
	dateOfDisplaying.innerHTML = currentDate;
}

function showTime() {
	const hoursOfDisplaying = document.querySelector('.clock__time__hour');
	const minutesOfDisplaying = document.querySelector('.clock__time__min');
	const secondsOfDisplaying = document.querySelector('.clock__time__sec');

	// Getting current time and date
	let time = new Date();
	let hours = time.getHours();
	let minutes = time.getMinutes();
	let seconds = time.getSeconds();

	hours = hours < 10 ? '0' + hours : hours;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;

	// Displaying the time
	hoursOfDisplaying.innerHTML = hours;
	minutesOfDisplaying.innerHTML = minutes;
	secondsOfDisplaying.innerHTML = seconds;

	setInterval(showTime, 1000);
}

window.onload = showDate();

window.onload = showTime();
