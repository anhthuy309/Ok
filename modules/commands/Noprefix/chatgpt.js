/*
* Author: SINGU-💌💌
* Notice: Vui Lòng Không Chỉnh Sửa Tên Tác Giả
*/

let axios = require('axios');

let suffix = '?'; // tương tự prefix nhưng có suffix cuối văn bản mới chạy noprefix.
let getToken = tex=>tex.split(/"/).find($=>/^eyJ/.test($));
let getContent = tex=>tex.split(/data\: /).filter($=>/^\{"i/.test($)).map($=>$ = JSON.parse($.replace(/\n\n$/, ''))).map($=>$.choices[0].delta.content || '').join('');
let ask = (o, b, uri = encodeURI(b))=>axios.get(`https://gptgo.ai/?q=${uri}&hl=vi&hlgpt=default#gsc.tab=0&gsc.q=${uri}&gsc.page=1`).then(res=>axios.get(`https://gptgo.ai/action_ai_gpt.php?token=${getToken(res.data)}`).then(res=>o.api.sendMessage(getContent(res.data), o.event.threadID, o.event.messageID))).catch(console.log);

this.run = o=>ask(o, o.event.args.slice(1).join(' '));
this.handleEvent = (o, b = o.event.body, suffixRegEx = RegExp(`\\${suffix}$`))=>suffixRegEx.test(b)?ask(o, b.replace(suffixRegEx, '')): '';
this.config = {
    name: 'gpt',
    version: '1.1.1',
    hasPermssion: 0,
    credits: 'SINGU-💌💌',
    description: 'gptgo.ai',
    commandCategory: 'Tiện ích',
    usages: '[]',
    cooldowns: 3
};