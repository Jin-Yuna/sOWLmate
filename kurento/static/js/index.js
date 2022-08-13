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

///////////////////////////////////////////////////음성 번역

var sharedMessages = [];
      var listening = {
        value:false
      };
      var draft = "";

      const sr = new webkitSpeechRecognition();
      sr.lang = "ko-KR";
      const sr2 = new webkitSpeechRecognition();
      sr2.lang = "ko-KR";
      sr2.continuous = true;
      sr2.interimResults = true;

      const ask = function(prompt) {return awaiter(void 0, void 0, Promise, function(){
        return generator(this, function(a){
            switch(a.label){
                case 0:
                    a.trys.push([0, , 2, 3]);
                    currentPrompt.value = prompt;
                    return [4, new Promise(function (resolve, reject){
                        sr.onresult = function(event){
                            var text = Array.from(event.results)
                                .map(function(alts){return alts[0].transcript;})
                                .join("");
                            resolve(text);
                        };
                        sr.onerror = function(e) {
                            reject(new Error("Unable to recognize text: " + e.error));
                        };
                        sr.start();
                    })];
                case 1: return [2, a.sent()];
                case 2: 
                    currentPrompt.value = "";
                    return [7];
                case 3: return [2];
            }
        });
    }); };

    const startListen = function() {
      console.log("startListen");
      listening.value = true;
      sr2.onresult = function(event) {
          var finalTranscript = "";
          var interimTranscript = "";
          for(var i=event.resultIndex; i<event.results.length; i++){
              if(event.results[i].isFinal){
                  finalTranscript += event.results[i][0].transcript;
              } else {
                  interimTranscript += event.results[i][0].transcript;
              }
          }
          draft.value = interimTranscript;
          // console.log(draft);
          if(finalTranscript) {
              sharedMessages.push([
                  {
                      text: finalTranscript,
                  },
              ]);
              //console.log(sharedMessages);
              console.log(sharedMessages[sharedMessages.length-1][0].text);
              axios({
                baseURL: "https://api.cognitive.microsofttranslator.com/",
                url: '/translate',
                method: 'post',
                headers: {
                  'Ocp-Apim-Subscription-Key': "b1c87c3a98964443ba16fbb4db3e572b",
                  'Ocp-Apim-Subscription-Region': "koreacentral",
                  'Content-type': 'application/json',
                  'X-ClientTraceId': uuidv4().toString()
                },
                params: {
                  'api-version': '3.0',
                  'from': 'ko',
                  'to': 'en'
                },
                data: [{
                  'text': sharedMessages[sharedMessages.length-1][0].text
                }],
                responseType: 'json'
              }).then(function(response){
                var translationResult = response.data;
                document.getElementById("videoSubtitles").innerHTML = translationResult[0].translations[0].text;
                console.log(JSON.stringify(response.data, null, 4));
              })
            }
      };
      sr2.onerror = function() {
        console.log("onerror");
        try {
          if(listening.value===true) {
            sr2.start();
          }
        } catch {
          console.log("말을 더 이상 안하실 예정이면 번역 기능을 꺼주세요~!");
        }
        //listening.value = false;
      };
      sr2.onend = function() {
        console.log("onend");
        if(listening.value===true) {
          sr2.start();
        }
        //listening.value = false;
      };
      sr2.start();
      return [2];
    };
    
    var stopListen = function () {
        console.log("stopListen");
        listening.value = false;
        sr2.stop();
    };


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
const streamVideo = document.getElementById("videoOutput");
const remoteVideo = document.getElementById("videoInput");

function initDeepAR() {
	const initVideoSource = () => {
		if(navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({
				video: {
					width: { ideal: 640 },
					height: { ideal: 480 }
				},
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
		streamVideo.srcObject = deeparCanvas.captureStream(25)
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


	// effect click 시
	var effectList = []
	var slotList = []
	let slots = 0;

	const effects = document.querySelectorAll(".effects > div");

	effects.forEach(el => {
	el.onclick = (e) => {
		const nodes = [...e.target.parentElement.children];
		const index = nodes.indexOf(e.target);
		const effect = nodes[index].getAttributeNode('value')
		if (effect.value === 'Filter Off') {
			removeAllFilter()
		}
		if (effectList.includes[effect.value]) {
			const Effectindex = array.indexOf(effect.value);
			if (Effectindex > -1) {
			effectList.splice(Effectindex, 1);
			addFilter(effect.value)
		} else {
			effectList.push(effect.value)
			removeFilter(effect.value)
		}
	}
	}});

	function addFilter(effect) {
		const value = effect;
		if (value !== 0) {
			switchARFilter(value);
			slots++;
		}
		sendMessage({
			id : 'filter',
			from : users[0],
			to: users[1],
			effect: effect
		});
		slotList.push({effect:slots})
		deepAR.switchEffect(0, `slot${slots}`, `./effects/${effect}`, function () {
		// effect loaded
		});
	}

	function removeFilter(effect) {
		const value = effect;
		const slot = slotList[value];
		if (value !== 0) {
			removeFilter(value);
		}
		sendMessage({
			id : 'filterRemove',
			from : users[0],
			to: users[1],
			effect: effect
		});
		deepAR.clearEffect(slot);
	}	

	function removeAllFilter() {
		for (effet of effectList) {
			deepAR.clearEffect(slotList[effect])
		}
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
		case 'filterRemove':
			console.log("from server.js to index.js by filter message");
			console.log(parsedMessage.id + parsedMessage.from + parsedMessage.effect);
			break;
		// text message
		// when we receive a message from the other peer, display it on the screen 
		case 'receive':
			var msgLine = $('<div class="msgLine">');
			var msgBox = $('<div class="msgBox">');
			var nameLine = $('<div class="nameLine">');
			var nameBox = $('<div class="nameBox">');
			
			nameBox.append(parsedMessage.from);
			msgBox.append(parsedMessage.content);
			nameBox.css('display', 'inline-block');
			msgBox.css('display', 'inline-block');
			
			nameLine.append(nameBox);
			msgLine.append(msgBox);
			$('#chatView').append(nameLine);
			$('#chatView').append(msgLine);

			chatView.scrollTop = chatView.scrollHeight;
		default:
			console.error('Unrecognized message', parsedMessage);
	}
}


ws.onerror = function (err) { 
	console.log("Got error", err); 
 };

var chatView = document.getElementById('chatView');
var chatForm = document.getElementById('chatForm');
   
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
	var usernameBox = $('<div class="usernameBox">');
	var chat = $('#chatView');
	chatLine = $('<div id="username">');
	chatLine.append(`\n[알림] ${message.from} 님이 채팅창에 입장하였습니다.\n`);
	chatLine.css('display', 'inline-block');
	usernameBox.css('text-align', 'center');
	usernameBox.append(chatLine);
	chat.append(usernameBox);
	chatView.scrollTop = chatView.scrollHeight
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
	$('#username_send').val(users[0]);
	var header = $('.chat__header__greetings');
	header.append(`${users[0]} 님의 채팅창`)
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
			console.log(message)
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

//****** 
//UI selectors block 
//****** 

// 메세지 전송 시 처리
chatForm.addEventListener('submit', function(event) {
	var msg = $('#msg');
	
	if (msg.val() == '') {
		return;
	} else {
	// 내 메세지 표시
	var msgLine = $('<div class="msgLine">');
	var msgBox = $('<div class="me">');

	msgBox.append(msg.val());
	msgBox.css('display', 'inline-block');

	msgLine.css('text-align', 'right');
	msgLine.append(msgBox);

	$('#chatView').append(msgLine);

	var message = {
		id : 'textChat',
		to : users[1],
		from : users[0],
		context : msg.val()
	}

	sendMessage(message);

	msg.val('');
	chatView.scrollTop = chatView.scrollHeight;
	}
  });

       
 
/**
 * Lightbox utility (to display media pipeline image in a modal dialog)
 */
$(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
	event.preventDefault();
	$(this).ekkoLightbox();
});

