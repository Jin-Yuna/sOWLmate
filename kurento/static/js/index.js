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
var registerState = null;
var loaded = false

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

///////
let cnt = 0;
const $videoInput = document.getElementById('videoInput');
const $videoOutput = document.getElementById('videoOutput');
const $canvas = document.getElementById('canvas');
// 비디오 이미지 캡쳐
function capture() {
	console.log("start capture() function : 캡쳐를 시작합니다.");
	var context = $canvas.getContext('2d');
	cnt += 1;
	switch (cnt) {
		case 1:
			context.drawImage($videoOutput, 30, 30, 250, 200);
			context.drawImage($videoInput, 280, 30, 250, 200);
			break;
		case 2:
			context.drawImage($videoOutput, 30, 260, 250, 200);
			context.drawImage($videoInput, 280, 260, 250, 200);
			break;
		case 3:
			context.drawImage($videoOutput, 30, 490, 250, 200);
			context.drawImage($videoInput, 280, 490, 250, 200);
			break;
		case 4:
			context.drawImage($videoOutput, 30, 720, 250, 200);
			context.drawImage($videoInput, 280, 720, 250, 200);
			document.querySelector('#btn-capture').innerHTML = '저장하기';
			break;
		default:
			console.log("save");
			saveImage();
			$canvas.getContext('2d').clearRect(0, 0, 560, 950);
			cnt = 0;
			break;
	}
	console.log("end capture() function : 캡쳐를 끝냅니다.");
}
//* 캡쳐한 이미지 노출 함수
function saveImage() {
	let $image = $canvas.toDataURL('image/png');
	var w = window.open('about:blank', 'image from canvas');
	w.document.write("<img src='" + $image + "' alt='from canvas'/>");
}
//* 초기 이벤트 바인딩
function initialize() {
	document.querySelector('#btn-capture').innerHTML = '찰칵~!';
	document.querySelector('#btn-capture').addEventListener('click', capture);
	console.log("캡쳐할 준비를 시작합니다. 미리보기 창 띄우면 될 듯?");
}
//////////////////////////////////////////////////////////DEEPAR

window.process = {
    env: {
        DEEPAR_KEY: 'DEEPAR_KEY'
    }
}

// create canvas on which DeepAR will render
// var outputVideo = document.getElementById("videoOuput");


// effect click 시 (For LocalUser)
var effectList = []
var slotList = []
let slots = 0;

// effect click 시 (For RemoteUser)
var effectListForRemote = []
var slotListForRemote = []
let slotsForRemote = 0;
var removeFilter = '';


function initDeepAR() {
	const deepArCanvas = document.createElement('canvas');
	const sourceVideo = document.createElement('video');
	const inputVideo = document.getElementById("videoInput");

	// input video 받는 과정 (사용자 비디오)
	const initVideoSource = () => {
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 240 }
                }
            })
                .then(function (stream) {
                    sourceVideo.srcObject = stream
                    // sourceVideo.muted = true

                    setTimeout(function() {
                        sourceVideo.play();
                    }, 50);
                }).catch();

            deepAR.setVideoElement(sourceVideo)
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

	var deepAR = DeepAR({
        licenseKey: '67e4f08a6b406e41d7134bc8d3ae59aa441276b8806bdfcaf2cefb8af478b662fca544b1a3bed97c',
		canvasWidth: 640,
		canvasHeight: 480,
		canvas: deepArCanvas,
		numberOfFaces: 2, // how many faces we want to track min 1, max 4
		onInitialize: function () { 
			if (effectList.length === 0) {
				var effect = 'lion'
				effectList.push('lion')
				slotList.push(({slot:`slot${slots}`, effect: effect}))
				deepAR.switchEffect(0, `slot${slots}`, `./effects/${effect}`, function () {
				// effect loaded
				})
			}
			deepAR.startVideo(true);
			// 캔버스가 아니라 비디오로 보이게
			windowVisibilityHandler(deepAR);
			initVideoSource()
		} 
    });

	deepAR.onVideoStarted = function() {
		inputVideo.srcObject = deepArCanvas.captureStream()
		inputVideo.play()
		webRtcPeer.peerConnection.addStream(inputVideo)
		// streamVideo.muted = false
		// webRtcPeer.peerConnection.addStream(deepArCanvas.captureStream())
		// streamVideo.play()
	}

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

	const effects = document.querySelectorAll(".effects > div");

	effects.forEach(el => {
	el.onclick = (e) => {
		const nodes = [...e.target.parentElement.children];
		const index = nodes.indexOf(e.target);
		const effect = nodes[index].getAttributeNode('value')
		if (effect.value === '') {
			removeAllFilter()
		}
		else if (effectList.includes(effect.value)) {
			console.log('removeFilter(effect.value)')
			const Effectindex = effectList.indexOf(effect.value);
			effectList.splice(Effectindex, 1);
			removeFilter(effect.value)
		} 
		else {
			console.log('addFilter(effect.value)')
			effectList.push(effect.value)
			addFilter(effect.value)
		}

	}});

	function addFilter(effect) {
		if (effect != '') {
			slots++;
			// sendMessage({
			// 	id : 'filter',
			// 	from : users[0],
			// 	to: users[1],
			// 	effect: effect
			// });
			slotList.push(({slot:`slot${slots}`, effect: effect}))
			console.log(slotList)
			deepAR.switchEffect(0, `slot${slots}`, `./effects/${effect}`, function () {
			// effect loaded
			})
		}
	}

	function removeFilter(effect) {
		let slotNum
		for (let slot of slotList) {
			console.log(slot)
			if (slot.effect === effect) {
				slotNum = slot.slot
				slotList.splice(slotList.indexOf(slot), 1)
				break
			}	
		}
		if (effect != '') {
			// sendMessage({
			// 	id : 'filterRemove',
			// 	from : users[0],
			// 	to: users[1],
			// 	effect: effect
			// });
			deepAR.clearEffect(slotNum);
		}

	}	

	function removeAllFilter() {
		for (let slot of slotList) {
			deepAR.clearEffect(slot.slot)
		}
		// sendMessage({
		// 	id : 'filterRemoveAll',
		// 	from : users[0],
		// 	to: users[1],
		// });
		effectList = []
		slotList = []
		slots = 0;
	}

	deepAR.downloadFaceTrackingModel('models/models-68-extreme.bin');

}

// remoteUser
// function initDeepAR() {
// 	const deepArCanvas = document.createElement('canvas');
// 	const initVideoSource = () => {
// 		if(navigator.mediaDevices.getUserMedia) {
// 			navigator.mediaDevices.getUserMedia({
// 				video: {
// 					width: { ideal: 640 },
// 					height: { ideal: 480 }
// 				}
// 			})
// 				.then(function (stream) {
// 					sourceVideo.srcObject = stream
// 					sourceVideo2.srcObject = stream
// 					// sourceVideo.muted = true

// 					setTimeout(function() {
// 						sourceVideo.play()
						
// 					}, 50);
// 				}).catch();

// 			deepAR.setVideoElement(sourceVideo)
// 		}
// 	}

// 	// Initialize the DeepAR object
// 	const deepAR = DeepAR({
// 		licenseKey: deepAR_license_key,
// 		canvasWidth: 640,
// 		canvasHeight: 480,
// 		canvas: deepArCanvas,
// 		numberOfFaces: 1, // how many faces we want to track min 1, max 4
// 		onInitialize: function () {
// 		console.log('시작')
// 		// start video immediately after the initalization, mirror = true
// 		deepAR.startVideo(true)
// 		windowVisibilityHandler(deepAR)
// 		initVideoSource()
// 		}
// 	});

// 	// download the face tracking model
// 	deepAR.downloadFaceTrackingModel('models/models-68-extreme.bin');

// 	deepAR.onVideoStarted = function() {
// 		inputVideo.srcObject = deepArCanvas.captureStream()
// 		inputVideo.play()

// 		// const canvasForRemote = document.createElement('canvas')
// 		// startCapture()

// 		// const canvas_video = document.getElementById('videoInput')

// 		// canvasForRemote.width = 640
// 		// canvasForRemote.height = 480

// 		// canvas_video.srcObject = canvasForRemote.captureStream()

// 		// async function startCapture() {
// 		// 	try {
// 		// 	  captureStream = await navigator.mediaDevices.getDisplayMedia({
// 		// 		video: true,
// 		// 		audio: true,
// 		// 	  })
// 		// 	  console.log(captureStream.getVideoTracks()[0].getSettings())
// 		// 	  screen.srcObject = captureStream
// 		// 	} catch (err) {
// 		// 	  console.error('Error: ' + err)
// 		// 	}
// 		// 	return captureStream
// 		//   }

// 		// webRtcPeer.peerConnection.addStream(canvas_video.srcObject)
		
// 	};

// 	// deepAR.onVideoStarted = function() {
// 	// 	streamVideo.srcObject = deepArCanvas.captureStream()
// 	// 	// streamVideo.muted = false
// 	// 	webRtcPeer.peerConnection.addStream(deepArCanvas.captureStream())
// 	// 	streamVideo.play()
// 	// };

// 	const windowVisibilityHandler = (deepAR) => {
// 		const hiddenStatusPropName = getHiddenStatusType()
// 		const isEventListenerAvailable = document.addEventListener !== undefined
// 		const isPageHiddenAPIAvailable = hiddenStatusPropName !== undefined
	
// 		if (!isEventListenerAvailable || !isPageHiddenAPIAvailable) {
// 			console.error("Warning: Page Visibility API not supported")
// 		} else {
// 			document.addEventListener(
// 				getVisibilityChangeHandlerName(),
// 				onVisibilityChange,
// 				false
// 			)
// 		}
	
// 		function getHiddenStatusType() {
// 			if (document.hidden !== undefined) { // Opera 12.10 and Firefox 18 and later support
// 				return "hidden"
// 			} else if (document.msHidden !== undefined) {
// 				return "msHidden"
// 			} else if (document.webkitHidden !== undefined) {
// 				return "webkitHidden"
// 			}
// 		}
	
// 		function getVisibilityChangeHandlerName() {
// 			// Opera 12.10 and Firefox 18 and later support
// 			if (document.visibilityState !== undefined) { 
// 				return "visibilitychange"
// 			} else if (document.msVisibilityState !== undefined) {
// 				return "msvisibilitychange"
// 			} else if (document.webkitVisibilityState !== undefined) {
// 				return "webkitvisibilitychange"
// 			}
// 		}
	
// 		function onVisibilityChange() {
// 			if (document[hiddenStatusPropName]) {
// 				deepAR.stopVideo()
// 			} else {
// 				deepAR.startVideo()
// 			}
// 		}
// 	}

// 	sourceVideo.addEventListener('play', function () {
// 		if (this.paused && this.ended) {
// 			deepAR.stopVideo()
// 		}
// 	}, 0)

// 	sourceVideo.addEventListener('loadedmetadata', function() {
// 		deepAR.canvasWidth = sourceVideo.videoWidth
// 		deepAR.canvasHeight = sourceVideo.videoHeight
// 	})

	

// 	const effects = document.querySelectorAll(".effects > div");

// 	effects.forEach(el => {
// 	el.onclick = (e) => {
// 		const nodes = [...e.target.parentElement.children];
// 		const index = nodes.indexOf(e.target);
// 		const effect = nodes[index].getAttributeNode('value')
// 		if (effect.value === '') {
// 			removeAllFilter()
// 		}
// 		else if (effectList.includes(effect.value)) {
// 			console.log('removeFilter(effect.value)')
// 			const Effectindex = effectList.indexOf(effect.value);
// 			effectList.splice(Effectindex, 1);
// 			removeFilter(effect.value)
// 		} 
// 		else {
// 			console.log('addFilter(effect.value)')
// 			effectList.push(effect.value)
// 			addFilter(effect.value)
// 		}

// 	}});

// 	function addFilter(effect) {
// 		if (effect != '') {
// 			slots++;
// 			// sendMessage({
// 			// 	id : 'filter',
// 			// 	from : users[0],
// 			// 	to: users[1],
// 			// 	effect: effect
// 			// });
// 			slotList.push(({slot:`slot${slots}`, effect: effect}))
// 			console.log(slotList)
// 			deepAR.switchEffect(0, `slot${slots}`, `./effects/${effect}`, function () {
// 			// effect loaded
// 			})
// 		}
// 	}

// 	function removeFilter(effect) {
// 		let slotNum
// 		for (let slot of slotList) {
// 			console.log(slot)
// 			if (slot.effect === effect) {
// 				slotNum = slot.slot
// 				slotList.splice(slotList.indexOf(slot), 1)
// 				break
// 			}	
// 		}
// 		if (effect != '') {
// 			// sendMessage({
// 			// 	id : 'filterRemove',
// 			// 	from : users[0],
// 			// 	to: users[1],
// 			// 	effect: effect
// 			// });
// 			deepAR.clearEffect(slotNum);
// 		}

// 	}	

// 	function removeAllFilter() {
// 		for (let slot of slotList) {
// 			deepAR.clearEffect(slot.slot)
// 		}
// 		// sendMessage({
// 		// 	id : 'filterRemoveAll',
// 		// 	from : users[0],
// 		// 	to: users[1],
// 		// });
// 		effectList = []
// 		slotList = []
// 		slots = 0;
// 	}
// }

// local User
// function initDeepARForRemote() {
// 	const deepArCanvas = document.createElement('canvas');
// 	// const initVideoSource = () => {
// 	// 	if(navigator.mediaDevices.getUserMedia) {
// 	// 		navigator.mediaDevices.getUserMedia({
// 	// 			video: {
// 	// 				width: { ideal: 640 },
// 	// 				height: { ideal: 480 }
// 	// 			}
// 	// 		})
// 	// 			.then(function (stream) {
// 	// 				sourceVideo.srcObject = stream
// 	// 				// sourceVideo.muted = true

// 	// 				setTimeout(function() {
// 	// 					sourceVideo.play()
// 	// 				}, 50);
// 	// 			}).catch();

			
// 	// 	}
// 	// }

// 	// Initialize the DeepAR object
// 	const deepAR = DeepAR({
// 		licenseKey: deepAR_license_key,
// 		canvasWidth: 640,
// 		canvasHeight: 480,
// 		canvas: deepArCanvas,
// 		numberOfFaces: 1, // how many faces we want to track min 1, max 4
// 		onInitialize: function () {
// 			console.log('시작')
// 			deepAR.setVideoElement(sourceVideo2)
// 			// start video immediately after the initalization, mirror = true
// 			// deepAR.startVideo()
// 			windowVisibilityHandler(deepAR)
// 		}
// 	});

// 	// deepAR.onVideoStarted = function() {
// 	// 	webRtcPeer.peerConnection.addStream(deepArCanvas.captureStream())
// 	// 	inputVideo.play()
// 	// };
// 	deepAR.onVideoStarted = function() {
// 		console.log('상대방 얼굴을 보여라 얍')
// 		var outputVideo = document.getElementById('outputVideo')
// 		outputVideo.srcObject = deepArCanvas.captureStream()
// 		// streamVideo.muted = false
// 		webRtcPeer.peerConnection.addStream(deepArCanvas.captureStream())
// 		outputVideo.play()
// 	};

// 	const windowVisibilityHandler = (deepAR) => {
// 		const hiddenStatusPropName = getHiddenStatusType()
// 		const isEventListenerAvailable = document.addEventListener !== undefined
// 		const isPageHiddenAPIAvailable = hiddenStatusPropName !== undefined
	
// 		if (!isEventListenerAvailable || !isPageHiddenAPIAvailable) {
// 			console.error("Warning: Page Visibility API not supported")
// 		} else {
// 			document.addEventListener(
// 				getVisibilityChangeHandlerName(),
// 				onVisibilityChange,
// 				false
// 			)
// 		}
	
// 		function getHiddenStatusType() {
// 			if (document.hidden !== undefined) { // Opera 12.10 and Firefox 18 and later support
// 				return "hidden"
// 			} else if (document.msHidden !== undefined) {
// 				return "msHidden"
// 			} else if (document.webkitHidden !== undefined) {
// 				return "webkitHidden"
// 			}
// 		}
	
// 		function getVisibilityChangeHandlerName() {
// 			// Opera 12.10 and Firefox 18 and later support
// 			if (document.visibilityState !== undefined) { 
// 				return "visibilitychange"
// 			} else if (document.msVisibilityState !== undefined) {
// 				return "msvisibilitychange"
// 			} else if (document.webkitVisibilityState !== undefined) {
// 				return "webkitvisibilitychange"
// 			}
// 		}
	
// 		function onVisibilityChange() {
// 			if (document[hiddenStatusPropName]) {
// 				deepAR.stopVideo()
// 			} else {
// 				deepAR.startVideo()
// 			}
// 		}
// 	}

// 	sourceVideo.addEventListener('play', function () {
// 		if (this.paused && this.ended) {
// 			deepAR.stopVideo()
// 		}
// 	}, 0)

// 	sourceVideo.addEventListener('loadedmetadata', function() {
// 		deepAR.canvasWidth = sourceVideo.videoWidth
// 		deepAR.canvasHeight = sourceVideo.videoHeight
// 	})

// 	// download the face tracking model
// 	deepAR.downloadFaceTrackingModel('models/models-68-extreme.bin');

// 	const effects = document.querySelectorAll(".effects > div");

// 	effects.forEach(el => {
// 	el.onclick = (e) => {
// 		const nodes = [...e.target.parentElement.children];
// 		const index = nodes.indexOf(e.target);
// 		const effect = nodes[index].getAttributeNode('value')
// 		if (effect.value === '') {
// 			removeAllFilter()
// 		}
// 		else if (effectList.includes(effect.value)) {
// 			console.log('removeFilter(effect.value)')
// 			const Effectindex = effectList.indexOf(effect.value);
// 			effectList.splice(Effectindex, 1);
// 			removeFilter(effect.value)
// 		} 
// 		else {
// 			console.log('addFilter(effect.value)')
// 			effectList.push(effect.value)
// 			addFilter(effect.value)
// 		}

// 	}});

// 	function addFilter(effect) {
// 		if (effect != '') {
// 			slots++;
// 			// sendMessage({
// 			// 	id : 'filter',
// 			// 	from : users[0],
// 			// 	to: users[1],
// 			// 	effect: effect
// 			// });
// 			slotList.push(({slot:`slot${slots}`, effect: effect}))
// 			console.log(slotList)
// 			deepAR.switchEffect(0, `slot${slots}`, `./effects/${effect}`, function () {
// 			// effect loaded
// 			})
// 		}
// 	}

// 	function removeFilter(effect) {
// 		let slotNum
// 		for (let slot of slotList) {
// 			console.log(slot)
// 			if (slot.effect === effect) {
// 				slotNum = slot.slot
// 				slotList.splice(slotList.indexOf(slot), 1)
// 				break
// 			}	
// 		}
// 		if (effect != '') {
// 			// sendMessage({
// 			// 	id : 'filterRemove',
// 			// 	from : users[0],
// 			// 	to: users[1],
// 			// 	effect: effect
// 			// });
// 			deepAR.clearEffect(slotNum);
// 		}

// 	}	

// 	function removeAllFilter() {
// 		for (let slot of slotList) {
// 			deepAR.clearEffect(slot.slot)
// 		}
// 		// sendMessage({
// 		// 	id : 'filterRemoveAll',
// 		// 	from : users[0],
// 		// 	to: users[1],
// 		// });
// 		effectList = []
// 		slotList = []
// 		slots = 0;
// 	}
// }

// var streamVideoForRemote = document.getElementById("videoOutput");
// var play = false;
// const deeparCanvas = document.createElement('canvas');
// var sourceVideoForRemote = document.createElement('video');

// RemoteUser
// function initDeepARForRemote() {

// 		// const initVideoSource = () => {
// 	// 	deepAR.setVideoElement(streamVideoForRemote)
// 	// 	if(navigator.mediaDevices.getUserMedia) {
// 	// 		navigator.mediaDevices.getUserMedia({
// 	// 			video: {
// 	// 				width: { ideal: 640 },
// 	// 				height: { ideal: 480 }
// 	// 			}
// 	// 		})
// 	// 			.then(function (stream) {
// 	// 				streamVideoForRemote.srcObject = stream
// 	// 				// streamVideoForRemote.muted = true

// 	// 				setTimeout(function() {
// 	// 					streamVideoForRemote.play()
// 	// 				}, 50);
// 	// 			}).catch();

// 	// 		deepAR.setVideoElement(streamVideoForRemote)
// 	// 	}
// 	// }

// 	// Initialize the DeepAR object
// 	const deepAR = DeepAR({
// 		licenseKey: deepAR_license_key,
// 		canvasWidth: 640,
// 		canvasHeight: 480,
// 		canvas: deeparCanvas,
// 		numberOfFaces: 1, // how many faces we want to track min 1, max 4
// 		onInitialize: function () {
// 		console.log('시작')
// 		// start video immediately after the initalization, mirror = true
// 		// deepAR.startVideo()
// 		windowVisibilityHandler(deepAR)
// 		// initVideoSource()
// 		deepAR.setVideoElement(streamVideo)
// 		}
// 	});

// 	deepAR.onVideoStarted = function() {
// 		sourceVideoForRemote.srcObject = deeparCanvas.captureStream()
// 		sourceVideoForRemote.muted = true
// 		streamVideoForRemote = sourceVideoForRemote
// 		streamVideoForRemote.play()
// 		play = true;
// 	};

// 	const windowVisibilityHandler = (deepAR) => {
// 		const hiddenStatusPropName = getHiddenStatusType()
// 		const isEventListenerAvailable = document.addEventListener !== undefined
// 		const isPageHiddenAPIAvailable = hiddenStatusPropName !== undefined
	
// 		if (!isEventListenerAvailable || !isPageHiddenAPIAvailable) {
// 			console.error("Warning: Page Visibility API not supported")
// 		} else {
// 			document.addEventListener(
// 				getVisibilityChangeHandlerName(),
// 				onVisibilityChange,
// 				false
// 			)
// 		}
	
// 		function getHiddenStatusType() {
// 			if (document.hidden !== undefined) { // Opera 12.10 and Firefox 18 and later support
// 				return "hidden"
// 			} else if (document.msHidden !== undefined) {
// 				return "msHidden"
// 			} else if (document.webkitHidden !== undefined) {
// 				return "webkitHidden"
// 			}
// 		}
	
// 		function getVisibilityChangeHandlerName() {
// 			// Opera 12.10 and Firefox 18 and later support
// 			if (document.visibilityState !== undefined) { 
// 				return "visibilitychange"
// 			} else if (document.msVisibilityState !== undefined) {
// 				return "msvisibilitychange"
// 			} else if (document.webkitVisibilityState !== undefined) {
// 				return "webkitvisibilitychange"
// 			}
// 		}
	
// 		function onVisibilityChange() {
// 			if (document[hiddenStatusPropName]) {
// 				deepAR.stopVideo()
// 			} else {
// 				deepAR.startVideo()
// 			}
// 		}

// 	streamVideoForRemote.addEventListener('play', function () {
// 		if (this.paused && this.ended) {
// 			deepAR.stopVideo()
// 		}
// 	}, 0)

// 	// download the face tracking model
// 	deepAR.downloadFaceTrackingModel('models/models-68-extreme.bin');

// 	} 
// 	function addFilterForRemote() {
// 		slotsForRemote++;
// 		const effect = effectListForRemote[effectListForRemote.length - 1]
// 		slotListForRemote.push(({slot:`slot${slotsForRemote}`, effect: effect}))
// 		deepAR.switchEffect(0, `slot${slotsForRemote}`, `./effects/${effect}`, function () {
// 		// effect loaded
// 		});
// 	}

// 	function removeFilterForRemote() {
// 		let slotNum
// 		for (let slot of slotListForRemote) {
// 			console.log(slot)
// 			if (slot.effect === removeFilter) {
// 				slotNum = slot.slot
// 				slotListForRemote.splice(slotListForRemote.indexOf(slot), 1)
// 				break
// 			}
// 		}
// 			deepAR.clearEffect(slotNum);
// 			removeFilter = '';
// 	}	

// 	function removeAllFilter() {
// 		for (let slot of slotListForRemote) {
// 			deepAR.clearEffect(slot.slot)
// 		}
// 		effectListForRemote = []
// 		slotListForRemote = []
// 		slotsForRemote = 0;
// 	}


// 	return {
// 		addFilterForRemote_Obj : addFilterForRemote(),
// 		removeFilterForRemote_Obj : removeFilterForRemote(),
// 		removeAllFilter_Obj : removeAllFilter()
// 	}

// }

///////////////////////////////////////////////////////////

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

	waitForSocketConnection(ws, function(){
		register();
	});

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

// var moduleOut = initDeepARForRemote();
var chatView = document.getElementById('chatView');
var chatForm = document.getElementById('chatForm');
var messageList = []

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
	// case 'filter':
	// 	var filtereffect = parsedMessage.effect
	// 	if (filtereffect != '') {
	// 		console.log(`filter message : ${parsedMessage.id} ${parsedMessage.from} ${parsedMessage.effect}`);
	// 		effectListForRemote.push(filtereffect)
	// 		initDeepARForRemote().addFilterForRemote_Obj;
	// 	}
	// 	break;
	// case 'filterRemove':
	// 	removeFilter = parsedMessage.effect
	// 	if (removeFilter != '') {
	// 		console.log(`filter message : ${parsedMessage.id} ${parsedMessage.from} ${parsedMessage.effect}`);
	// 		initDeepARForRemote().removeFilterForRemote_Obj ;
	// 	}
	// 	break;
	// case 'filterRemoveAll':
	// 	initDeepARForRemote().removeAllFilter_Obj ;
	// 	break;
	case 'translate':
			console.log(`translate message : ${parsedMessage.id} ${parsedMessage.from} ${parsedMessage.text}`);
			document.getElementById("videoSubtitles").innerHTML = parsedMessage.text;
		break;
	// text message
	// when we receive a message from the other peer, display it on the screen 
	case 'receive':
		var msgLine = $('<div class="msgLine">');
		var msgBox = $('<div class="msgBox">');
		var nameLine = $('<div class="nameLine">');
		var nameBox = $('<div class="nameBox">');
		var msgTranslate = $('<p class="msgTranslate">');
		messageList.push(parsedMessage.content)
		
		nameBox.append(parsedMessage.from);
		msgBox.append(parsedMessage.content);
		var msgtranslate = translateText(parsedMessage.content);
		console.log(msgtranslate)
		msgTranslate.append(msgtranslate);
		nameBox.css('display', 'inline-block');
		msgBox.css('display', 'inline-block');
		msgTranslate.css('display', 'none');

		nameLine.append(nameBox);
		msgBox.append(msgTranslate);
		msgLine.append(msgBox);
		$('#chatView').append(nameLine);
		$('#chatView').append(msgLine);

		chatView.scrollTop = chatView.scrollHeight;
		break;
	default:
		console.error('Unrecognized message', parsedMessage);
		break;
	}
}

document.getElementById('noncheck').addEventListener('click', function() {
	$('#noncheck').css('display', 'none')
	$('#checked').css('display', 'inline-block')
	let elements = document.querySelectorAll('.msgTranslate')
	// for (let ele of elements) {
	// 	ele.style.display = inline-block
	// }

});


function translateText(message) {
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
		  'text': message
		}],
		responseType: 'json'
	  }).then(function(response){
		var translationResult = response.data;
		//console.log(JSON.stringify(response.data, null, 4));
		return translationResult[0].translations[0].text
	  })
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

	showSpinner(videoInput, videoOutput);

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

	initDeepAR();
	// initDeepARForRemote();
	var usernameBox = $('<div class="usernameBox">');
	var chat = $('#chatView');
	chatLine = $('<div id="username">');
	chatLine.append(`\n[알림] ${message.from} 님이 입장하셨습니다.\n`);
	chatLine.css('display', 'inline-block');
	usernameBox.css('text-align', 'center');
	usernameBox.append(chatLine);
	chat.append(usernameBox);
	chatView.scrollTop = chatView.scrollHeight
}

function register() {
		sendMessage({
			id : 'register',
			name : users[0]
		});
		$('#username_send').val(users[0]);
		var header = $('.chat__header__greetings');
		header.append(`${users[0]} 님 반가워요😀`)
}

function call() {
	setCallState(PROCESSING_CALL);
	showSpinner(videoInput, videoOutput);

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

	initDeepAR();
	// initDeepARForRemote();
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
