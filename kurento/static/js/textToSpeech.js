const fs = require('fs');

// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

// 나중에 채팅 내용 여기로 불러와서 넣어주기!!!
const text = '부엉 부엉 우리팀 화이팅!';

// Construct the request
const request = {
  input: {text: text},
  // Select the language and SSML Voice Gender (optional)
  voice: {languageCode: 'ko_KR', ssmlGender: 'FEMALE', name: 'ko-KR-Wavenet-A'},
  // Select the type of audio encoding
  audioConfig: {audioEncoding: 'MP3'},
};

// Performs the Text-to-Speech request
client.synthesizeSpeech(request, (err, response) => {
  // console.log('응답!!!',response)
  if (err) {
    console.error('ERROR:', err);
    return;
  }
  // 파일이름을 유저이름으로 하면 ==> 새로 받은 결과로 덮어씌워진다
  // var ts_hms = Date.now().toString();
  var ts_hms = 'user1';
  fs.writeFile('./out/' + ts_hms+ '.mp3', response.audioContent, 'binary', err => {
    if (err) {
      console.error('ERROR:', err);
      return;
    }
    console.log(text);
  });
})