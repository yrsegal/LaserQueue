// a function to set up WebSockets

function socketSetup() { // god help me

	// wait until host has a real value
	while (host == 'undefined') {}
	socket = new WebSocket(host);

	// when websockets connects
	socket.onopen = function handleSocketOpen() {
		// print to log and consoles
		onDeauth();
		logText('WebSockets connection opened successfully');

		$('#notify-modal').modal('hide');
	};

	// when websockets message
	socket.onmessage = function handleNewMessage(msg) {

		// loads JSON data
		jsonData = JSON.parse(msg.data);

		// if data is new
		if (JSON.stringify(jsonData) !== JSON.stringify(oldJsonData)) {

			// deep copy jsonData to oldJsonData
			oldJsonData = $.extend({}, jsonData);

			// log the new data
			logText('new JSON received: ' + JSON.stringify(jsonData));

			// if being told to render table
			if(jsonData.action == 'display') {

				// reinitialize full list of cuts
				allCuts = [];
				// for each priority in list
				$(jsonData.queue).each(function loopThroughCuts(index, el) {

					// for each cut in priority
					$(el).each(function loopThroughCut(arrayIndex, arrayEl) {
						// at this point nothing is human-readable
						// make material human-readable
						displayEl = $.extend({}, arrayEl); // deepcopy
						displayEl.material = materials[arrayEl.material];
						displayEl.priority = priorities[arrayEl.priority];
						var timetotal = arrayEl.esttime;
						var hours = Math.floor(timetotal / 60);
						timetotal -= hours * 60;
						var minutes = Math.floor(timetotal);
						timetotal -= minutes;
						var seconds = +(timetotal * 60).toFixed(2);

						var output = String(hours ? hours + 'h' : '') + (minutes && hours ? ' ' : '');
						output += String(minutes ? minutes + 'm' : '') + (seconds && minutes ? ' ' : '');
						output += String(seconds ? seconds + 's' : '');

						displayEl.esttime = output;
						// add to full list of cuts
						allCuts = allCuts.concat(displayEl);
					});

				});
				
				// render allCuts into table
				$('.cutting-table-template').render(allCuts, renderDirectives);
				populateActions();
			} else if (jsonData.action == 'authed' && config.admin_mode_enabled && !authed) {
				onAuth();
			} else if (jsonData.action == 'authfailed' && config.admin_mode_enabled && !authed) {
				onFailedauth();
			} else if (jsonData.action == 'deauthed' && config.admin_mode_enabled && authed) {
				onDeauth();
			} else if(jsonData.action == 'rickroll' && config.easter_eggs) {
				rickRoll();
			} else if(jsonData.action == 'refresh' && config.allow_force_refresh) {
				window.location.reload();
			}
		}
	};
	// when websockets error
	socket.onerror = function handleWebSocketsError(error) {
		// go tell a nerd
		modalMessage('Error 4', 'Could not connect to socket at ' + host + '. Maybe the backend is not running? This page will try to reconnect every few seconds. <br><br> <button class="btn btn-default btn-pink btn-retry">Retry</button>');

		// set up retry button
		$('.btn-retry').click(function reloadWithRandom() {
			window.location = window.location.origin + '?foo=' + Math.floor(Math.random() * 11000);
		});
	};
}
