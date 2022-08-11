var ws = new WebSocket('wss://' + location.host + '/one2one');
// var ws = new WebSocket('wss://localhost:8443/one2one');
var videoInput;
var videoOutput;
var webRtcPeer;

var users = [];

var registerName = null;
const NOT_REGISTERED = 0;
const REGISTERING = 1;
const REGISTERED = 2;
var registerState = null

function setRegisterState(nextState) {
	switch (nextState) {
	case NOT_REGISTERED:
		$('#register').attr('disabled', false);
		$('#call').attr('disabled', true);
		$('#terminate').attr('disabled', true);
		break;
	case REGISTERING:
		$('#register').attr('disabled', true);
		break;
	case REGISTERED:
		$('#register').attr('disabled', true);
		setCallState(NO_CALL);
		break;
	default:
		return;
	}
	registerState = nextState;
}

const NO_CALL = 0;
const PROCESSING_CALL = 1;
const IN_CALL = 2;
var callState = null

function setCallState(nextState) {
	switch (nextState) {
	case NO_CALL:
		$('#call').attr('disabled', false);
		$('#terminate').attr('disabled', true);
		break;
	case PROCESSING_CALL:
		$('#call').attr('disabled', true);
		$('#terminate').attr('disabled', true);
		break;
	case IN_CALL:
		$('#call').attr('disabled', true);
		$('#terminate').attr('disabled', false);
		break;
	default:
		return;
	}
	callState = nextState;
}


/////////////////////////////////////////////////////DEEPAR

window.process = {
    env: {
        DEEPAR_KEY: 'DEEPAR_KEY'
    }
}
const deepAR_license_key = process.env.DEEPAR_KEY

// create canvas on which DeepAR will render
const sourceVideo = document.createElement('video')
const deeparCanvas = document.createElement('canvas')
const streamVideo = document.querySelector("#videoInput");

function initDeepAR() {
	const initVideoSource = () => {
		if(navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({
				video: {
					width: { ideal: 640 },
					height: { ideal: 480 }
				}
			})
				.then(function (stream) {
					sourceVideo.srcObject = stream
					sourceVideo.muted = true

					setTimeout(function() {
						sourceVideo.play()
					}, 50);
				}).catch();

			deepAR.setVideoElement(sourceVideo)
		}
	}

	// Initialize the DeepAR object
	const deepAR = DeepAR({
		licenseKey: deepAR_license_key,
		canvasWidth: 640,
		canvasHeight: 480,
		canvas: deeparCanvas,
		numberOfFaces: 1, // how many faces we want to track min 1, max 4
		onInitialize: function () {
		console.log('시작')
		// start video immediately after the initalization, mirror = true
		deepAR.startVideo()
		windowVisibilityHandler(deepAR)

		initVideoSource()
		}
	});

	deepAR.onVideoStarted = function() {
		streamVideo.srcObject = deeparCanvas.captureStream()
		streamVideo.muted = true
		streamVideo.play()
	};

	const windowVisibilityHandler = (deepAR) => {
		const hiddenStatusPropName = getHiddenStatusType()
		const isEventListenerAvailable = document.addEventListener !== undefined
		const isPageHiddenAPIAvailable = hiddenStatusPropName !== undefined
	
		if (!isEventListenerAvailable || !isPageHiddenAPIAvailable) {
			console.error("Warning: Page Visibility API not supported")
		} else {
			document.addEventListener(
				getVisibilityChangeHandlerName(),
				onVisibilityChange,
				false
			)
		}
	
		function getHiddenStatusType() {
			if (document.hidden !== undefined) { // Opera 12.10 and Firefox 18 and later support
				return "hidden"
			} else if (document.msHidden !== undefined) {
				return "msHidden"
			} else if (document.webkitHidden !== undefined) {
				return "webkitHidden"
			}
		}
	
		function getVisibilityChangeHandlerName() {
			// Opera 12.10 and Firefox 18 and later support
			if (document.visibilityState !== undefined) { 
				return "visibilitychange"
			} else if (document.msVisibilityState !== undefined) {
				return "msvisibilitychange"
			} else if (document.webkitVisibilityState !== undefined) {
				return "webkitvisibilitychange"
			}
		}
	
		function onVisibilityChange() {
			if (document[hiddenStatusPropName]) {
				deepAR.stopVideo()
			} else {
				deepAR.startVideo()
			}
		}
	}

	sourceVideo.addEventListener('play', function () {
		if (this.paused && this.ended) {
			deepAR.stopVideo()
		}
	}, 0)

	sourceVideo.addEventListener('loadedmetadata', function() {
		deepAR.canvasWidth = sourceVideo.videoWidth
		deepAR.canvasHeight = sourceVideo.videoHeight
	})

	// download the face tracking model
	deepAR.downloadFaceTrackingModel('models/models-68-extreme.bin');

	function switchARFilter(effect) {
		console.log("switchARFilter");
		console.log(effect)
		sendMessage({
			id : 'filter',
			from : users[0],
			to: users[1],
			effect: effect
		});
		deepAR.switchEffect(0, `slot${slots}`, `./effects/${effect}`, function () {
		// effect loaded
		});
	}

	const effectSelect = document.getElementById('effects');
	const pills = document.getElementsByClassName('pills')[0];
	let slots = 0;

	effectSelect.addEventListener('change', addFilter);
	  
	function addPill(name, value) {
		let pill = document.createElement('div');
		pill.classList.add('pill');
		pill.innerText = name;
		pill.id = `slot${slots}`;
		pill.addEventListener('click', removeFilter);
		pills.appendChild(pill);
	}
	  
	function addFilter() {
		const name = effectSelect.selectedOptions[0].innerHTML;
		const value = effectSelect.value;
		
		if (value !== 0) {
			switchARFilter(value);
			addPill(name, value);
			slots++;
			effectSelect.value = '';
		}
	}
	function removeFilter(ev) {
		const pill = ev.target;
		const slot = ev.target.id;
		
		deepAR.clearEffect(slot);
		pills.removeChild(pill);
	}	
}

/////////////////////////////////////////////////////////////



function waitForSocketConnection(socket, callback){
	setTimeout(
			function () {
					if (socket.readyState === 1) {
							console.log("Connection is made")
							if (callback != null){
									callback();
							}
					} else {
							console.log("wait for connection...")
							waitForSocketConnection(socket, callback);
					}
			}, 5);
}


window.onload = function() {
	// console = new Console();
	setRegisterState(NOT_REGISTERED);
	var drag = new Draggabilly(document.getElementById('videoSmall'));
	videoInput = document.getElementById('videoInput');
	videoOutput = document.getElementById('videoOutput');

	// only register https://localhost:8443/?from=user1&to=
	// register&call https://localhost:8443/?from=user2&to=user1
	location.href.split("?")[1].split("&").forEach(element => {
		users.push(element.split("=")[1]);
	});
	console.log(users);

	//console.log(location.host);

	waitForSocketConnection(ws, function(){
		register();
	});

	// ws.onopen = () => {
	// 	register();
	// }
	// register();

	if (users[1] != '') {
		call();
	}

	document.getElementById('terminate').addEventListener('click', function() {
		stop();
	});
}

window.onbeforeunload = function() {
	ws.close();
}

ws.onmessage = function(message) {
	var parsedMessage = JSON.parse(message.data);
	console.info('Received message: ' + message.data);

	switch (parsedMessage.id) {
	case 'registerResponse':
		resgisterResponse(parsedMessage);
		break;
	case 'callResponse':
		callResponse(parsedMessage);
		break;
	case 'incomingCall':
		incomingCall(parsedMessage);
		break;
	case 'startCommunication':
		startCommunication(parsedMessage);
		break;
	case 'stopCommunication':
		console.info("Communication ended by remote peer");
		stop(true);
		break;
	case 'iceCandidate':
		webRtcPeer.addIceCandidate(parsedMessage.candidate)
			break;
	case 'filter':
			console.log("from server.js to index.js by filter message");
			console.log(parsedMessage.id + parsedMessage.from + parsedMessage.effect);
			break;
	default:
		console.error('Unrecognized message', parsedMessage);
	}
}

function resgisterResponse(message) {
	if (message.response == 'accepted') {
		setRegisterState(REGISTERED);
	} else {
		setRegisterState(NOT_REGISTERED);
		var errorMessage = message.message ? message.message
				: 'Unknown reason for register rejection.';
		console.log(errorMessage);
		alert('Error registering user. See console for further information.');
	}
}

function callResponse(message) {
	if (message.response != 'accepted') {
		console.info('Call not accepted by peer. Closing call');
		var errorMessage = message.message ? message.message
				: 'Unknown reason for call rejection.';
		console.log(errorMessage);
		stop(true);
	} else {
		setCallState(IN_CALL);
		webRtcPeer.processAnswer(message.sdpAnswer);
	}
}

function startCommunication(message) {
	setCallState(IN_CALL);
	webRtcPeer.processAnswer(message.sdpAnswer);
}

function incomingCall(message) {
	// If bussy just reject without disturbing user
	if (callState != NO_CALL) {
		var response = {
			id : 'incomingCallResponse',
			from : message.from,
			callResponse : 'reject',
			message : 'bussy'

		};
		return sendMessage(response);
	}

	setCallState(PROCESSING_CALL);

	users[1] = message.from;
	// console.log(`users[1] : ${users[1]}`);

	// if (confirm('방에 누군가 입장합니다.')) {
	showSpinner(videoInput, videoOutput);

	// start DeepAR
	initDeepAR();

	var options = {
		localVideo : videoInput,
		remoteVideo : videoOutput,
		onicecandidate : onIceCandidate
	}

		webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options,
				function(error) {
					if (error) {
						console.error(error);
						setCallState(NO_CALL);
					}

					this.generateOffer(function(error, offerSdp) {
						if (error) {
							console.error(error);
							setCallState(NO_CALL);
						}
						var response = {
							id : 'incomingCallResponse',
							from : message.from,
							callResponse : 'accept',
							sdpOffer : offerSdp
						};
						sendMessage(response);
					});
				});
} 
// 	else {
// 		var response = {
// 			id : 'incomingCallResponse',
// 			from : message.from,
// 			callResponse : 'reject',
// 			message : 'user declined'
// 		};
// 		sendMessage(response);
// 		stop(true);
// 	}
// }

function register() {
		sendMessage({
			id : 'register',
			name : users[0]
		});
}

function call() {
	setCallState(PROCESSING_CALL);
	showSpinner(videoInput, videoOutput);

	// start DeepAR
	initDeepAR();

	var options = {
		localVideo : videoInput,
		remoteVideo : videoOutput,
		onicecandidate : onIceCandidate
	}

	webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options, function(
			error) {
		if (error) {
			console.error(error);
			setCallState(NO_CALL);
		}

		this.generateOffer(function(error, offerSdp) {
			if (error) {
				console.error(error);
				setCallState(NO_CALL);
			}
			var message = {
				id : 'call',
				from : users[0],
				to : users[1],
				sdpOffer : offerSdp
			};
			sendMessage(message);
		});
	});
}

function stop(message) {
	setCallState(NO_CALL);
	if (webRtcPeer) {
		webRtcPeer.dispose();
		webRtcPeer = null;

		if (!message) {
			var message = {
				id : 'stop'
			}
			sendMessage(message);
		}
	}
	hideSpinner(videoInput, videoOutput);
	location.replace("https://i7b308.p.ssafy.io")
}

function sendMessage(message) {
	var jsonMessage = JSON.stringify(message);
	console.log('Sending message: ' + jsonMessage);
	ws.send(jsonMessage);
}

function onIceCandidate(candidate) {
	console.log('Local candidate' + JSON.stringify(candidate));

	var message = {
		id : 'onIceCandidate',
		candidate : candidate
	}
	sendMessage(message);
}

function showSpinner() {
	for (var i = 0; i < arguments.length; i++) {
		arguments[i].poster = './img/transparent-1px.png';
		arguments[i].style.background = 'center transparent url("./img/spinner.gif") no-repeat';
	}
}

function hideSpinner() {
	for (var i = 0; i < arguments.length; i++) {
		arguments[i].src = '';
		arguments[i].poster = './img/webrtc.png';
		arguments[i].style.background = '';
	}
}

/**
 * Lightbox utility (to display media pipeline image in a modal dialog)
 */
$(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
	event.preventDefault();
	$(this).ekkoLightbox();
});
