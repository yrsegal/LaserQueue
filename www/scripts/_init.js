// initialize the things

window.console.log("This silly browser log is generally not used. Click the console button at the bottom of the page instead! If there are errors here, please raise an issue.");

setInterval(function() {
	if(typeof reconnectRate != "undefined" && (typeof socket == "undefined" || socket.readyState == socket.CLOSED)) {
		// initialize websockets if closed
		logText("LaserCutter software is up. Attempting connection to WebSockets host", host);
		socketSetup();
	}
}, reconnectRate);

// holds old and new JSON
// for comparison to minimize layout thrashing n stuff
var oldJsonData = "uninitialized";
var jsonData;

// initialize the modal by changing the title
$('.notify-modal-title').html("Notification");

// authentication modal
$('.authorize').click(function() {
	modalMessage('Authenticate', '
		<form class="login-form">
			<div class="form-group">
				<label for="password">Password</label>
				<input type="password" class="form-control" id="password" placeholder="Password">
			</div>
			<button type="submit" class="btn btn-default">Sign in</button>
		</form>
	');

	$('.login-form').submit(function(event) {
		event.preventDefault();
		if($('#password').val() != '') {
			logText("Password entered. Attempting auth and switching to \"Logging in\" modal.");
			socket.send(JSON.stringify({
				"action": "auth",
				"args": [sha1($('#password').val())],
				"sid": SID
			}));
			modalMessage('Logging in', '
				<div class="progress logging-in">
	    			<div class="progress-bar active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="animation: login-loader 1s ease-out;width: 100%;"></div>
				</div>
			');
			setTimeout('auth()', 1000);
			
		}
	});
	
});

// footer
$.ajax({
	url: '/infotext.md',
	type: 'GET'
})
.done(function(request) {
	$('.credits-footer').before(
		marked(request)
	);
})
.fail(function() {
	console.log("Failed to get infotext.md");
});
