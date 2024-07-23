const chatPlugin = { create: function ({ ui, data, dev }) { const uiBottom = ui?.bottom || 0; const uiRight = ui?.right || 0; const dataToken = data?.token || ''; const dataDomain = data?.domain || ''; const dataProvider = data?.provider || ''; const dataNcName = data?.ncName || ''; if (!dataToken) { return console.error( `Error: Can't find user token for chat : Chat Plugin | You must set token for chat in method chatPlugin.create({data: {token: '<YOUR_TOKEN>' }}) or set 'dev' to 'guest'`, ); } if (!dataDomain) { return console.error( `Error: Can't find user for chat : Chat Plugin | You must set token for chat in method chatPlugin.create({data: {domain: '<YOUR_DOMAIN>' }})`, ); } if (!dataProvider) { return console.error( `Error: Can't find provider for chat : Chat Plugin | You must set token for chat in method chatPlugin.create({data: {provider: '<YOUR_PROVIDER>' }})`, ); } if (!dataNcName) { return console.error( `Error: Can't find ncName for chat : Chat Plugin | You must set token for chat in method chatPlugin.create({data: {dataNcName: '<YOUR_NCNAME>' }})`, ); } const isHave = document.getElementById('chat-msg-plugin___'); if (isHave) { isHave?.remove(); } const iframewrapperC___ = document.createElement('div'); iframewrapperC___.id = 'chat-msg-plugin___'; iframewrapperC___.style.cssText = `opacity: 1; visibility: visible;z-index: 2147483639;position: fixed;bottom: ${uiBottom};width: 60px;height: 60px;max-width: 100%;max-height: calc(100% - 10px);min-height: 0px;min-width: 0px;background-color: transparent;border: 0px;overflow: hidden;right: ${uiRight};transition: all 0.3s ease !important;display: block;z-index: 999;overflow: hidden;`; iframewrapperC___.innerHTML = `<iframe id="chat-msg-plugin-frame___" style="width: 0px;height: 0px;min-height: 0px;min-width: 0px;margin: 0px;padding: 0px;background-image: none;background-position: 0% 0%;background-size: initial;background-attachment: scroll;background-origin: initial;background-clip: initial;background-color: rgba(0, 0, 0, 0);border-width: 0px;float: none;color-scheme: normal;position: absolute;transition: all 0.3s ease !important;display: block;bottom: 50px;right: 0px;"scrolling="no" src="${dataProvider}/plugin/message/?token=${dataToken}&ncname=${dataNcName}&domain=${dataDomain}&v=${Math.floor( Math.random() * 1000000, )}"></iframe><div id="open-chat-msg-plugin___" onMouseOver="this.style.transform='scale(1.1)';" onMouseOut="this.style.transform='scale(1)';" style=" background-color: #ffffff; border-radius: 50%; cursor: pointer; background-position: center; background-repeat: no-repeat; background-size: cover; position: absolute; z-index: 999999999; height: 50px; width: 50px; bottom: 5px; right: 5px; transition: all 0.3s ease !important; background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-9Q0HbIRaLfEaEfsc-VrhnNMrAxvFddth6Q&usqp=CAU);"></div>`; document.body.appendChild(iframewrapperC___); const iframeWrapper___ = document.getElementById('chat-msg-plugin___'); const iframe___ = document.getElementById('chat-msg-plugin-frame___'); const openBtn___ = document?.getElementById('open-chat-msg-plugin___'); var is_open_plugin___ = false; function closeChatBox___() { if (iframeWrapper___) { is_open_plugin___ = false; setTimeout(() => { iframeWrapper___.style.height = '60px'; iframeWrapper___.style.width = '60px'; iframe___.style.height = 0; iframe___.style.width = 0; iframe___.style.opacity = 0; setTimeout(() => { iframe___.style.transform = 'scale(1)'; }, 300); }, 300); iframe___.style.transform = 'scale(1.02)'; } } function openChatBox___() { if (iframeWrapper___) { is_open_plugin___ = true; iframeWrapper___.style.height = '740px'; iframeWrapper___.style.width = '420px'; iframe___.style.height = '100%'; iframe___.style.width = '100%'; iframe___.style.opacity = 1; iframe___.style.transform = 'scale(1.02)'; setTimeout(() => { iframe___.style.transform = 'scale(1)'; }, 300); } } function toggleChatBox___() { if (is_open_plugin___) { closeChatBox___(); } else { openChatBox___(); } } window.addEventListener('message', (message) => { const data = JSON?.parse(message?.data); if (data?.type == 'close-chat-plugin') { closeChatBox___(); } }); if (openBtn___) { openBtn___.onclick = () => { toggleChatBox___(); }; } return { close: closeChatBox___, open: openChatBox___, destroy: function () { if (iframewrapperC___) { iframewrapperC___?.remove(); } }, toggle: toggleChatBox___, }; },};