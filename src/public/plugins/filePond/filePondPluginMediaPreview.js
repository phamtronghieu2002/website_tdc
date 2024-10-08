/*!
 * FilePondPluginMediaPreview 1.0.11
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit undefined for details.
 */

/* eslint-disable */

!(function (e, i) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = i())
    : "function" == typeof define && define.amd
    ? define(i)
    : ((e =
        "undefined" != typeof globalThis
          ? globalThis
          : e || self).FilePondPluginMediaPreview = i());
})(this, function () {
  "use strict";
  const e = (e) => /^video/.test(e.type),
    i = (e) => /^audio/.test(e.type);
  class t {
    constructor(e, i) {
      (this.mediaEl = e),
        (this.audioElems = i),
        (this.onplayhead = !1),
        (this.duration = 0),
        (this.timelineWidth =
          this.audioElems.timeline.offsetWidth -
          this.audioElems.playhead.offsetWidth),
        (this.moveplayheadFn = this.moveplayhead.bind(this)),
        this.registerListeners();
    }
    registerListeners() {
      this.mediaEl.addEventListener(
        "timeupdate",
        this.timeUpdate.bind(this),
        !1
      ),
        this.mediaEl.addEventListener(
          "canplaythrough",
          () => (this.duration = this.mediaEl.duration),
          !1
        ),
        this.audioElems.timeline.addEventListener(
          "click",
          this.timelineClicked.bind(this),
          !1
        ),
        this.audioElems.button.addEventListener("click", this.play.bind(this)),
        this.audioElems.playhead.addEventListener(
          "mousedown",
          this.mouseDown.bind(this),
          !1
        ),
        window.addEventListener("mouseup", this.mouseUp.bind(this), !1);
    }
    play() {
      this.mediaEl.paused ? this.mediaEl.play() : this.mediaEl.pause(),
        this.audioElems.button.classList.toggle("play"),
        this.audioElems.button.classList.toggle("pause");
    }
    timeUpdate() {
      let e = (this.mediaEl.currentTime / this.duration) * 100;
      (this.audioElems.playhead.style.marginLeft = e + "%"),
        this.mediaEl.currentTime === this.duration &&
          (this.audioElems.button.classList.toggle("play"),
          this.audioElems.button.classList.toggle("pause"));
    }
    moveplayhead(e) {
      let i = e.clientX - this.getPosition(this.audioElems.timeline);
      i >= 0 &&
        i <= this.timelineWidth &&
        (this.audioElems.playhead.style.marginLeft = i + "px"),
        i < 0 && (this.audioElems.playhead.style.marginLeft = "0px"),
        i > this.timelineWidth &&
          (this.audioElems.playhead.style.marginLeft =
            this.timelineWidth - 4 + "px");
    }
    timelineClicked(e) {
      this.moveplayhead(e),
        (this.mediaEl.currentTime = this.duration * this.clickPercent(e));
    }
    mouseDown() {
      (this.onplayhead = !0),
        window.addEventListener("mousemove", this.moveplayheadFn, !0),
        this.mediaEl.removeEventListener(
          "timeupdate",
          this.timeUpdate.bind(this),
          !1
        );
    }
    mouseUp(e) {
      window.removeEventListener("mousemove", this.moveplayheadFn, !0),
        1 == this.onplayhead &&
          (this.moveplayhead(e),
          (this.mediaEl.currentTime = this.duration * this.clickPercent(e)),
          this.mediaEl.addEventListener(
            "timeupdate",
            this.timeUpdate.bind(this),
            !1
          )),
        (this.onplayhead = !1);
    }
    clickPercent(e) {
      return (
        (e.clientX - this.getPosition(this.audioElems.timeline)) /
        this.timelineWidth
      );
    }
    getPosition(e) {
      return e.getBoundingClientRect().left;
    }
  }
  const d = (d) =>
      d.utils.createView({
        name: "media-preview-wrapper",
        create: ({ root: a, props: s }) => {
          const n = ((d) =>
            d.utils.createView({
              name: "media-preview",
              tag: "div",
              ignoreRect: !0,
              create: ({ root: e, props: t }) => {
                const { id: d } = t,
                  a = e.query("GET_ITEM", { id: t.id });
                let s = i(a.file) ? "audio" : "video";
                if (
                  ((e.ref.media = document.createElement(s)),
                  e.ref.media.setAttribute("controls", !0),
                  e.element.appendChild(e.ref.media),
                  i(a.file))
                ) {
                  let i = document.createDocumentFragment();
                  (e.ref.audio = []),
                    (e.ref.audio.container = document.createElement("div")),
                    (e.ref.audio.button = document.createElement("span")),
                    (e.ref.audio.timeline = document.createElement("div")),
                    (e.ref.audio.playhead = document.createElement("div")),
                    (e.ref.audio.container.className = "audioplayer"),
                    (e.ref.audio.button.className = "playpausebtn play"),
                    (e.ref.audio.timeline.className = "timeline"),
                    (e.ref.audio.playhead.className = "playhead"),
                    e.ref.audio.timeline.appendChild(e.ref.audio.playhead),
                    e.ref.audio.container.appendChild(e.ref.audio.button),
                    e.ref.audio.container.appendChild(e.ref.audio.timeline),
                    i.appendChild(e.ref.audio.container),
                    e.element.appendChild(i);
                }
              },
              write: d.utils.createRoute({
                DID_MEDIA_PREVIEW_LOAD: ({ root: d, props: a }) => {
                  const { id: s } = a,
                    n = d.query("GET_ITEM", { id: a.id });
                  if (!n) return;
                  let o = window.URL || window.webkitURL,
                    l = new Blob([n.file], { type: n.file.type });
                  (d.ref.media.type = n.file.type),
                    (d.ref.media.src =
                      (n.file.mock && n.file.url) || o.createObjectURL(l)),
                    i(n.file) && new t(d.ref.media, d.ref.audio),
                    d.ref.media.addEventListener(
                      "loadeddata",
                      () => {
                        let i = 75;
                        if (e(n.file)) {
                          let e = d.ref.media.offsetWidth,
                            t = d.ref.media.videoWidth / e;
                          i = d.ref.media.videoHeight / t;
                        }
                        d.dispatch("DID_UPDATE_PANEL_HEIGHT", {
                          id: a.id,
                          height: i,
                        });
                      },
                      !1
                    );
                },
              }),
            }))(d);
          a.ref.media = a.appendChildView(a.createChildView(n, { id: s.id }));
        },
        write: d.utils.createRoute({
          DID_MEDIA_PREVIEW_CONTAINER_CREATE: ({ root: e, props: i }) => {
            const { id: t } = i;
            e.query("GET_ITEM", t) &&
              e.dispatch("DID_MEDIA_PREVIEW_LOAD", { id: t });
          },
        }),
      }),
    a = (t) => {
      const { addFilter: a, utils: s } = t,
        { Type: n, createRoute: o } = s,
        l = d(t);
      return (
        a("CREATE_VIEW", (t) => {
          const { is: d, view: a, query: s } = t;
          if (!d("file")) return;
          a.registerWriter(
            o(
              {
                DID_LOAD_ITEM: ({ root: t, props: d }) => {
                  const { id: n } = d,
                    o = s("GET_ITEM", n),
                    r = s("GET_ALLOW_VIDEO_PREVIEW"),
                    h = s("GET_ALLOW_AUDIO_PREVIEW");
                  o &&
                    !o.archived &&
                    ((e(o.file) && r) || (i(o.file) && h)) &&
                    ((t.ref.mediaPreview = a.appendChildView(
                      a.createChildView(l, { id: n })
                    )),
                    t.dispatch("DID_MEDIA_PREVIEW_CONTAINER_CREATE", {
                      id: n,
                    }));
                },
              },
              ({ root: t, props: d }) => {
                const { id: a } = d,
                  n = s("GET_ITEM", a),
                  o = t.query("GET_ALLOW_VIDEO_PREVIEW"),
                  l = t.query("GET_ALLOW_AUDIO_PREVIEW");
                n &&
                  ((e(n.file) && o) || (i(n.file) && l)) &&
                  t.rect.element.hidden;
              }
            )
          );
        }),
        {
          options: {
            allowVideoPreview: [!0, n.BOOLEAN],
            allowAudioPreview: [!0, n.BOOLEAN],
          },
        }
      );
    };
  return (
    "undefined" != typeof window &&
      void 0 !== window.document &&
      document.dispatchEvent(
        new CustomEvent("FilePond:pluginloaded", { detail: a })
      ),
    a
  );
});
