// import * as Y from "yjs";

var sharedMessages;

function setup() {
    const messages = ref(sharedMessages.toJSON());
    const listening = ref(false);
    const draft = ref("");
    const sr = new webkitSpeechRecognition();
    sr.lang - lang;
    const sr2 = new webkitSpeechRecognition();
    sr2.lang = lang;
    sr2.continuous = true;
    sr2.interimResults = true;

    let lastMessageCreatedAt;
    sharedMessages.observe(function() {
        var a, b;
        messages.value = sharedMessages.toJSON();
  
        const lastMessage = messages.value[messages.value.length - 1];
        if (lastMessage) {
          if (lastMessageCreatedAt !== lastMessage.createdAt) {
            lastMessageCreatedAt = lastMessage.createdAt;
            (b=(a=window).handleNewMessage) === null || b === void 0 ? void 0 : b.call(a, lastMessage);
          }
        }
      });

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

      const send = function() {return awaiter(void 0, void 0, void 0, function() {
        return generator(this, function(a) {
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
                if(finalTranscript) {
                    sharedMessages.push([
                        {
                            text: finalTranscript,
                        },
                    ]);
                }
            };
            sr2.onerror = function() {
                listening.value = false;
            };
            sr2.onend = function() {
                listening.value = false;
            };
            sr2.start();
            return [2];
        });
      }); };
      
      var stop = function() {
        sr2.stop();
        listening.value = false;
      };

      var locales = computed(function() {
        return langs
            .flatMap(function(a){
                var l = a[0], lo = a.slice(1);
                return lo;
            }).sort(function(a, b) {return (a[0] < b[0]? -1:1);});
      });

      return {
        draft: draft,
        listening: listening,
        currentPrompt: currentPrompt,
        send: send,
        stop: stop,
        messages: messages,
        langIsSet: langIsSet,
        langs: langs,
        locales: locales,
      };
}
