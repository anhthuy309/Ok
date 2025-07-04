module.exports.config = {
  name: "resend",
  version: "2.0.0",
  hasPermssion: 1,
  credits: "1.2.13",
  description: "Xem lại tin nhắn bị gỡ",
  commandCategory: "Công cụ",
  usages: "resend [on/off]",
  cooldowns: 0,
  dependencies: {
      "request": "",
      "fs-extra": "",
      "axios": ""
  }
}, module.exports.handleEvent = async function ({
  event: e,
  api: a,
  client: t,
  Users: s
}) {
  const n = global.nodemodule.request,
      o = global.nodemodule.axios,
      {
          writeFileSync: d,
          createReadStream: r
      } = global.nodemodule["fs-extra"];
  let {
      messageID: g,
      senderID: l,
      threadID: i,
      body: u
  } = e;
  global.logMessage || (global.logMessage = new Map), global.data.botID || (global.data.botID = global.data.botID);
  const c = global.data.threadData.get(i) || {};
  if ((void 0 === c.resend || 1 != c.resend) && l != global.data.botID && ("message_unsend" != e.type && global.logMessage.set(g, {
          msgBody: u,
          attachment: e.attachments
      }), void 0 !== c.resend && 1 == c.resend | "message_unsend" == e.type)) {
      var m = global.logMessage.get(g);
      if (!m) return;
      let e = await s.getNameUser(l);
      if (null == m.attachment[0]) return a.sendMessage(`[⚜️]→ Bạn ${e} đã gỡ 1 tin nhắn\n[⚜️]→ Nội dung: ${m.msgBody}`, i); {
          let t = 0,
              s = {
                  body: `[⚜️]→ Bạn ${e} vừa gỡ ${m.attachment.length} tệp đính kèm.${""!=m.msgBody?`\n\n[⚜️]→ Nội dung: ${m.msgBody}`:""}`,
                  attachment: [],
                  mentions: {
                      tag: e,
                      id: l
                  }
              };
          for (var h of m.attachment) {
              t += 1;
              var f = (await n.get(h.url)).uri.pathname,
                  b = f.substring(f.lastIndexOf(".") + 1),
                  p = __dirname + `/cache/${t}.${b}`,
                  x = (await o.get(h.url, {
                      responseType: "arraybuffer"
                  })).data;
              d(p, Buffer.from(x, "utf-8")), s.attachment.push(r(p))
          }
          a.sendMessage(s, i)
      }
  }
}, module.exports.languages = {
  vi: {
      on: "[⚜️]→ Bật",
      off: "[⚜️]→ Tắt",
      successText: "resend thành công"
  },
  en: {
      on: "on",
      off: "off",
      successText: "resend success!"
  }
}, module.exports.run = async function ({
  api: e,
  event: a,
  Threads: t,
  getText: s
}) {
  const {
      threadID: n,
      messageID: o
  } = a;
  let d = (await t.getData(n)).data;
  return void 0 === d.resend || 0 == d.resend ? d.resend = !0 : d.resend = !1, await t.setData(n, {
      data: d
  }), global.data.threadData.set(n, d), e.sendMessage(`${1==d.resend?s("off"):s("on")} ${s("successText")}`, n, o)
};