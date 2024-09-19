/* Start fuzzy match algo */





void async function llmUI(){
    
    
    
   
async function fetchText(){
    return await(await fetch(...arguments)).text();
}

async function zfetchText(){
    try{return await fetchText(...arguments);}catch(e){return e.message;}
}

async function fetchArrayBuffer(){
    return await(await fetch(...arguments)).arrayBuffer();
}

async function zfetchArrayBuffer(){
    try{return await fetchArrayBuffer(...arguments);}catch(e){return e.message;}
}

async function sendMessage(sessionUsername, content,pre){
    return decode(await fetchArrayBuffer(`${pre}?${encodeURIComponent(content.trim())}`)).trim();
}

async function streamMessage(sessionUsername, content,pre){
    return await fetchStream(`${pre}?${encodeURIComponent(content.trim())}`);
} 
    
    
    const typoCdn = 'https://cdn.jsdelivr.net/npm/typo-js@1.2.4/';
    eval?.((await zfetchText(`${typoCdn}typo.min.js`)).replace('var Type','globalThis.Typo'));
    const [aff,dic] = await Promise.all([zfetchText(`${typoCdn}dictionaries/en_US/en_US.aff`),
                                         zfetchText(`${typoCdn}dictionaries/en_US/en_US.dic`)]);
    const dictionary = new Typo("en_US",aff,dic);
    console.log('asdf',dictionary.check(''));
globalThis. objDoProp = function (obj, prop, def, enm, mut) {
  return Object.defineProperty(obj, prop, {
    value: def,
    writable: mut,
    enumerable: enm,
    configurable: mut
  });
};
globalThis. objDefProp=(obj, prop, def) => objDoProp (obj, prop, def, false, true);
globalThis. objDefEnum=(obj, prop, def) => objDoProp (obj, prop, def, true, true);
objDefProp(String.prototype,"rm",function rm(re){
  return this.replace(re,'');
});
objDefProp(Array.prototype,"joinWords",function joinWords(re){
  return this.join(' ');
});
objDefProp(String.prototype,"splitWords",function splitWords(re){
  return this.split(' ');
});

globalThis. lcs = function lcs(seq1, seq2) {
  let arr1 = [...seq1??[]];
  let arr2 = [...seq2??[]];
  if (arr2.length > arr1.length) {
    [arr1, arr2] = [arr2, arr1];
  }
  const dp = Array(arr1.length + 1).fill(0).map(() => Array(arr2.length + 1).fill(0));
  const dp_length = dp.length;
  for (let i = 1; i !== dp_length; i++) {
    const dpi_length = dp[i].length;
    for (let x = 1; x !== dp_length; x++) {
      if (arr1[i - 1] === arr2[x - 1]) {
        dp[i][x] = dp[i - 1][x - 1] + 1
      } else {
        dp[i][x] = Math.max(dp[i][x - 1], dp[i - 1][x])
      }
    }
  }
  return dp[arr1.length][arr2.length]
};
globalThis. wordMatch = function wordMatch(str1, str2) {
  return lcs(str1, str2) >= Math.floor(0.8 * Math.max(str1?.length ?? 0, str2?.length ?? 0));
}
globalThis. lcws2 = function lcws2(seq1, seq2) {
  let arr1 = seq1.replace(/[^a-zA-Z ]/g, ' ').toLowerCase().splitWords();
  let arr2 = seq2.replace(/[^a-zA-Z ]/g, ' ').toLowerCase().splitWords();
  if (arr2.length > arr1.length) {
    [arr1, arr2] = [arr2, arr1];
  }
  const dp = Array(arr1.length + 1).fill(0).map(() => Array(arr2.length + 1).fill(0));
  const dp_length = dp.length;
  for (let i = 1; i !== dp_length; i++) {
    const dpi_length = dp[i].length;
    for (let x = 1; x !== dp_length; x++) {
      if (wordMatch(arr1[i - 1], arr2[x - 1])) {
        dp[i][x] = dp[i - 1][x - 1] + 1
      } else {
        dp[i][x] = Math.max(dp[i][x - 1], dp[i - 1][x])
      }
    }
  }
  return dp[arr1.length][arr2.length]
};
globalThis. phraseMatch = function phraseMatch(str1, str2) {
  return lcws2(str1, str2) >= Math.floor(0.8 * Math.max(str1?.splitWords?.()?.length ?? 0, str2?.splitWords?.()?.length ?? 0));
}

/* end fuzzy match algo */



globalThis.DOMInteractive = (fn) => {
  fn ??= () => { };
  if ((globalThis.document?.readyState == 'complete') || (globalThis.document?.readyState == 'interactive')) {
    return fn();
  }
  return new Promise((resolve) => {
    (globalThis.document || globalThis).addEventListener("DOMContentLoaded", () => {
      try { resolve(fn()); } catch (e) { resolve(e); }
    });
  });
}




globalThis. htmlcodes=[
    "&quot;",
    "&amp;",
    "&lt;",
    "&gt;",
    "&nbsp;",
    "&iexcl;",
    "&cent;",
    "&pound;",
    "&curren;",
    "&yen;",
    "&brvbar;",
    "&sect;",
    "&uml;",
    "&copy;",
    "&ordf;",
    "&laquo;",
    "&not;",
    "&shy;",
    "&reg;",
    "&macr;",
    "&deg;",
    "&plusmn;",
    "&acute;",
    "&micro;",
    "&para;",
    "&middot;",
    "&cedil;",
    "&ordm;",
    "&raquo;",
    "&iquest;",
    "&times;",
    "&szlig;",
    "&agrave;",
    "&aacute;",
    "&acirc;",
    "&atilde;",
    "&auml;",
    "&aring;",
    "&aelig;",
    "&ccedil;",
    "&egrave;",
    "&eacute;",
    "&ecirc;",
    "&euml;",
    "&igrave;",
    "&iacute;",
    "&icirc;",
    "&iuml;",
    "&eth;",
    "&ntilde;",
    "&ograve;",
    "&oacute;",
    "&ocirc;",
    "&otilde;",
    "&ouml;",
    "&divide;",
    "&oslash;",
    "&ugrave;",
    "&uacute;",
    "&ucirc;",
    "&uuml;",
    "&yacute;",
    "&thorn;",
    "&yuml;",
    "&euro;"
];

globalThis.lcws=(text1, text2)=>{/*longest common word subsequence*/
    text1 = text1.toLowerCase().replace(/[^a-z ]/g, ' ').replaceAll('  ', ' ').replaceAll('  ', ' ').split(' ');
    text2 = text2.toLowerCase().replace(/[^a-z ]/g, ' ').replaceAll('  ', ' ').replaceAll('  ', ' ').split(' ');

    const dp = Array(text1.length + 1).fill(0).map(Þ => Array(text2.length + 1).fill(0));
    const dp_length = dp.length;
    for (let i = 1; i < dp_length; i++) {

      for (let j = 1; j < dp[i].length; j++) {
        /* If the words match, look diagonally to get the max subsequence before this letter and add one*/
        if (text1[i - 1] == text2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1
        } else {
          /* If there is no match, set the cell to the previous current longest subsequence*/
          dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j])
        }
      }
    }
    return dp[text1.length][text2.length]
  }

globalThis.isSimilarPhrase=(text1, text2)=> {
    text1 = text1.toLowerCase().replace(/[^a-z ]/g, ' ').replaceAll('  ', ' ').replaceAll('  ', ' ');
    text2 = text2.toLowerCase().replace(/[^a-z ]/g, ' ').replaceAll('  ', ' ').replaceAll('  ', ' ');

    let numerator = lcws(text1, text2);

    let ratio1 = numerator / text1.split(' ').length;

    let ratio2 = numerator / text2.split(' ').length;

    if (Math.max(ratio1, ratio2) >= 0.8) {

      return true;

    } else {

      return false;

    }


  }

globalThis.removeRedundant=(passage,delim='.')=> {

    let isSentenceModified = false;
    for (let pass = 0; pass < 2; pass++) {
      let mpassage = passage;
      let pass_regex = /[?!¿¡]/g;
      if (pass) { pass_regex = /[?!¿¡.,:;]/g; }
      mpassage = mpassage.replace(pass_regex, '.')
        .replaceAll('..', '.')
        .replaceAll('..', '.')
        .replaceAll('  ', ' ')
        .replaceAll('  ', ' ');
     // console.log(mpassage);
      let mpass_list = mpassage.split(delim);
    //  console.log(mpass_list);
      const mpass_list_length = mpass_list.length;
      for (let i = 0; i < mpass_list_length; i++) {
        try {
          if ((mpass_list[i].length > 1) && (mpass_list[i].split(' ').length > 3)) {
            for (let x = 0; x < mpass_list_length; x++) {
              try {
                if ((i != x) && (mpass_list[x].length > 1) && (mpass_list[x].split(' ').length > 3)) {
                  if (isSimilarPhrase(mpass_list[i], mpass_list[x])) {
                    if (mpass_list[i].length < mpass_list[x].length) {

                      mpass_list[i] = '';
                      isSentenceModified = true;
                      break;

                    } else {

                      mpass_list[x] = '';
                      isSentenceModified = true;
                      continue;

                    }
                  }
                }
              } catch (e) { continue; }
            }
          }
        } catch (e) { continue; }
      }
      for (let i = 0; i < mpass_list_length; i++) {
          //console.log(phraseMatch(mpass_list[i],'As an inquiring USAA Member, I am curious'));
            if(phraseMatch(mpass_list[i],'As an inquiring USAA Member, I am curious')>.8){
                mpass_list[i] = '';
                isSentenceModified = true;
            }
      }
      console.log(isSentenceModified);
      if (isSentenceModified) {
        passage = mpass_list.join(delim)
          .replaceAll('..', '.')
          .replaceAll('..', '.')
          .replaceAll('  ', ' ')
          .replaceAll('  ', ' ')
          .replaceAll(',.', '.')
          .replaceAll('.,', '.');
      }
    }
    passage = passage.split('').filter(x=>x.codePointAt()<1000).join('').replaceAll('US AA','USAA').replaceAll('USAA EF','USAAEF');
    return fixSpacing(passage);
  }

function fixSpacing(txt){
    let words = txt.replaceAll('  ',' ').split(' ');
    for(let i = 0;i<words.length;i++){try{
        if(!dictionary.check(words[i].replace(/^a-zA-Z/g,''))){
            if(dictionary.check(`${words[i]}${words[i+1]??''}`.replace(/^a-zA-Z/g,''))){
                words[i] = `${words[i]}${words[i+1]??''}`;
                console.log(words[i]);
                words[i+1] = '';
                words = words.join(' ').replaceAll('  ',' ').split(' ');
                i--;
            }else if(dictionary.check(`${words[i-1]??''}${words[i]??''}`.replace(/^a-zA-Z/g,''))){
                words[i] = `${words[i-1]??''}${words[i]??''}`;
                console.log(words[i]);
                words[i-1] = '';
                words = words.join(' ').replaceAll('  ',' ').split(' ');
                i--;
            }else if(dictionary.check(`${words[i-1]??''}${words[i]??''}${words[i+1]??''}`.replace(/^a-zA-Z/g,''))){
                words[i] = `${words[i-1]??''}${words[i]??''}${words[i+1]??''}`;
                console.log(words[i]);
                words[i-1] = '';
                words[i+1] = '';
                words = words.join(' ').replaceAll('  ',' ').split(' ');
                i-=2;
            }
        }
    }catch(e){console.log(e);continue;}}
    return words.join(' ');
}

function createMessage(role, content,chat){
    let messagesEl = document.querySelector(`${chat} .chat-content`);
    let messageEl = document.createElement('div');
    messageEl.classList.add('message');
    messageEl.classList.add(role);
    let contentEl = document.createElement('div');
    contentEl.classList.add('content');
    contentEl.innerText = content;
    messageEl.appendChild(contentEl);
    messagesEl.appendChild(messageEl);
    return {
      messages: messagesEl,
      content: contentEl
    };
  };


async function talkButton(chat,modelurl='/talk'){
    await DOMInteractive();
    let textarea = document.querySelector(`${chat } textarea`);
    let form = document.querySelector(`${chat} form`);
    let talk = async (e) => {
      e?.preventDefault?.();
      if (!form.hasAttribute('disabled')) {
        let content = textarea.value;
        content = content.trim();
        if (content) {
          form.setAttribute('disabled', '');
          textarea.value = '';
          let userEls = createMessage('user', content,chat);
          let assistantEls = createMessage('assistant', '',chat);
          let chunkEl = document.createElement('span');
          chunkEl.classList.add('chunk');
          assistantEls.messages.scrollTop = assistantEls.messages.scrollHeight;
              const stream = await streamMessage('username',content,modelurl);
              const reader = zgetReader(stream);
              let result = await zread(reader);
              let pumpBuffer = '';
              let pumpDone=false;
              let doPump = setInterval(function pump() {
                if (pumpBuffer.length > 0) {
                  if(!/[a-z]/.test(pumpBuffer)){
                      pumpBuffer=pumpBuffer.trim();
                  }
                  let message = pumpBuffer
                                  .replace(/ [^a-zA-Z0-9] /g,x=>x.trim())
                                  .trim()
                                  .replace(/�/g,'')
                                  .replace(/↵/g,'\n')
                                  .replace(/[\.\,?!]/g,x=>`${x} `)
                                  .replace(/< ? \/?br>/g,'\n')
                                  .replace(/\|/g,'\n')
                                  .replace(/<[^>]+>/g,'');
                  if(message.includes('[/INST]')){message=message.split('[/INST]')[1].split('</s>')[0];}
                  if(message.includes('/INST]')){message=message.split('/INST]')[1].split('</s>')[0];}
                  if(message.includes('[INST]')){message=message.split('[INST]')[0];}
                  message=removeRedundant(message.trim());
                  message=removeRedundant(message.trim(),'\n').replace(/^\./,'').trim();
                  message=[...new Set(message.split('\n'))].join('\n');
                  message=[...new Set(message.split('.'))].join('.')
                      .replace(/ +/g,' ')
                      .replace(/E *S *N *O *P *S *E *R *_ *I *D *([0-9] *)*/,'')
                      .replace(/A *s *a *n *i *n *q *u *i *r *i *n *g *U *S *A *A *M *e *m *b *e *r *. *I *a *m *c *u *r *i *o *u *s *./i,'')
                      .replace(/A *s *a *U *S *A *A *M *e *m *b *e *r *./i,'')
                      .replace(/\[[^\]]*\]/g,'')
                      .replace(/\. ./g,x=>x.toUpperCase())
                      .replace(/(Who|What|When|Where|Why|How) [^\.]*\./g,x=>x.replace('.','?'))
                      .replace(/\. Org([^a-zA-Z])/g,'.org$1')
                      .replace(/\. Com([^a-zA-Z])/g,'.com$1')
                      .replaceAll('ttps.//','ttps://')
                      .replace(/www\. /gi,'www.')
                      .trim();
                  htmlcodes.forEach(x=>{
                      let h=document.createElement('span');
                      h.innerHTML=x;
                      h=h.innerText;
                      message=message.replaceAll(x,h).replaceAll(x.slice(0,-1),h);
                  })
                  if (chunkEl.textContent != message) {
                    chunkEl.textContent = message;
                    assistantEls.messages.scrollTop = assistantEls.messages.scrollHeight;
                  }
                }
                if(pumpDone){endPump();}
              }, 100);
              function endPump(){clearInterval(doPump);}
              assistantEls.content.appendChild(chunkEl);
              form.removeAttribute('disabled');
              while (!result.done) {
                let decoded = zdecode(result.value);
                if(decoded.includes('[FULLTEXT]')){
                    pumpBuffer = decoded;
                }else{
                    pumpBuffer += decoded;
                }  
                result = await zread(reader);
              }
            pumpDone=true;
        }
      }
    };
    form.addEventListener('submit',talk);
    textarea.onkeydown = function(e){
       if(e.keyCode == 13){
         return talk();
       }
    };
}

talkButton('[chat1]');
talkButton('[chat2]','http://172.18.65.104:31782/llama');
async function fetchStream() {
  return (await fetch(...arguments)).body;
}

async function zfetchStream() {
  try { return await fetchStream(...arguments); } catch (e) { return new Response(e.message).body; }
}
globalThis.decoder = new TextDecoder();
globalThis.decode = function() { return decoder.decode(...arguments); }
globalThis.decoder.zdecode = function(raw) {
  try {
    return globalThis.decoder.decode(raw);
  } catch (e) {
    return e.message;
  }
}
globalThis.zdecoder = function() {
  if (!globalThis.decoder) {
    globalThis.decoder = new TextDecoder();
    globalThis.decode = function() { return decoder.decode(...arguments); }
    globalThis.decoder.zdecode = function(raw) {
      try {
        return globalThis.decoder.decode(raw);
      } catch (e) {
        return e.message;
      }
    }
  }
  return globalThis.decoder;
}
globalThis.zdecode = function() { return decoder.zdecode(...arguments); }

globalThis.zgetReader = function(stream) {
  if (!stream) {
    return;
  }
  let r = Object.create(null);
  r.reader = stream.getReader();
  r.almostDone = false;
  return r;
}

globalThis.zread = async function(reader) {
  if (reader.almostDone) {
    try {
      reader.reader.releaseLock();
    } catch (e) { }
    return {
      value: undefined,
      done: true
    };
  }
  try {
    let rtrn = await reader.reader.read();
    if (rtrn.done) {
      try {
        reader.reader.releaseLock();
      } catch (e) { }
    }
    return rtrn;
  } catch (e) {
    reader.almostDone = true;
    return {
      value: e.message,
      done: false
    };
  }
};


}?.();
