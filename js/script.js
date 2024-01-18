function showDate() {
	// Getting current time and date
	let date = new Date();
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	day = day < 10 ? '0' + day : day;
	month = month < 10 ? '0' + month : month;

	let currentDate =
		day + "." + month + "." + year;

	// Displaying the date
	document.querySelector('.clock__date').innerHTML = currentDate;
}

function showTime() {
	// Getting current time and date
	let time = new Date();
	let hour = time.getHours();
	let min = time.getMinutes();
	let sec = time.getSeconds();

	hour = hour < 10 ? '0' + hour : hour;
	min = min < 10 ? '0' + min : min;
	sec = sec < 10 ? '0' + sec : sec;

	// Displaying the time
	document.querySelector(".clock__time__hour").innerHTML = hour + ':';
	document.querySelector(".clock__time__min").innerHTML = min + ':';
	document.querySelector(".clock__time__sec").innerHTML = sec;

	setInterval(showTime, 1000);
}

showDate();
showTime();