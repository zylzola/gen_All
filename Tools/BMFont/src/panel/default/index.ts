import { dialog } from "@electron/remote";
import { readFileSync, writeFileSync } from "fs-extra";
import { join } from "path";
import Vue from "vue/dist/vue";
const component = Vue.extend({
  template: readFileSync(
    join(__dirname, "../../../static/template/vue/app.html"),
    "utf-8"
  ),
  data() {
    return {
      filePath: "",
      imageList: new Array(),
      updateImageList: new Array(),
      canvasWidth: 256,
      canvasHeight: 256,
      fontInfo: "",
      fontSize: 20,
      fontName: "",
      fontCanvas: HTMLCanvasElement.prototype,
    };
  },
  mounted() {
    this.fontCanvas = this.$refs.fontCanvas as HTMLCanvasElement;
  },
  methods: {
    dragEnter(e: any) {
      e.stopPropagation();
      e.preventDefault();
    },
    dragOver(e: any) {
      e.stopPropagation();
      e.preventDefault();
    },
    onDrop(e: any) {
      this.removeAll();
      this.canvasWidth = 256;
      this.canvasHeight = 256;
      e.stopPropagation();
      e.preventDefault();
      let dt = e.dataTransfer;
      let files = dt.files;
      this.showImgData(files);
    },
    showImgData(files: any) {
      let self = this;
      if (files.length) {
        let successCount = 0;
        for (var i = 0; i < files.length; i++) {
          let file = files[i];
          if (!/^image\//.test(file.type)) continue;
          let fileReader = new FileReader();
          fileReader.onload = (function () {
            return function (e: any) {
              if (self.updateImageList.indexOf(e.target.result) !== -1) return;
              var img = new Image();
              img.src = e.target.result;
              img.onload = () => {
                let fileName = file.name.split(".")[0];
                self.imageList.push({
                  img: e.target.result,
                  char: fileName.substr(fileName.length - 1, 1),
                  width: img.width,
                  height: img.height,
                  x: 0,
                  y: 0,
                });
                self.updateImageList.push(e.target.result);
                self.updateCanvas(null, (maxX: number, maxY: number) => {
                  successCount++;
                  if (successCount >= files.length) {
                    self.canvasWidth = maxX + 2;
                    self.canvasHeight = maxY;
                    setTimeout(() => {
                      self.updateCanvas(null, () => {});
                    }, 10);
                  }
                });
              };
            };
          })();
          fileReader.readAsDataURL(file);
        }
      }
    },
    updateCanvas(data: any, func: Function) {
      if (!this.imageList.length) return;
      let that = this;
      let height = 0;
      let space = 2;
      let x = space;
      let y = space;
      let maxX = x;
      let maxY = y;
      this.imageList.forEach((img) => {
        if (img.height > height) height = img.height;
      });
      height = Math.ceil(height);
      this.fontSize = height;
      let content = this.fontCanvas?.getContext("2d");
      content?.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.imageList.forEach((img2) => {
        let img = new Image();
        img.src = img2.img;
        if (x + img2.width + space > that.canvasWidth) {
          y += height + space;
          if (y + height + space > that.canvasHeight) {
            that.canvasWidth += x + img2.width + space;
            that.canvasHeight += y;
          }
          x = space;
        }
        content?.drawImage(img, x, y);
        img2.x = x;
        img2.y = y;
        x += img2.width + space;
        if (maxX < x) {
          maxX = x;
        }
        if (maxY < y + height + space) {
          maxY = y + height + space;
        }
      });
      func && func(maxX, maxY);
    },
    loadFileData() {
      let str = `info size=${this.fontSize} unicode=1 stretchH=100 smooth=1 aa=1 padding=0,0,0,0 spacing=1,1 outline=0
common lineHeight=${this.fontSize} base=23 scaleW=${this.canvasWidth} scaleH=${this.canvasHeight} pages=1 packed=0
page id=0 file="${this.fontName}.png"
chars count=${this.imageList.length}`;
      this.imageList.forEach((img) => {
        str += `char id=${this.caseConvertEasy(img.char).charCodeAt(0)} x=${
          img.x
        } y=${img.y} width=${img.width} height=${
          img.height
        } xoffset=0 yoffset=0 xadvance=${img.width} \n`;
      });
      this.fontInfo = str;
    },
    caseConvertEasy(str: any) {
      return str
        .split("")
        .map((s: any) => {
          if (s.charCodeAt() <= 90) {
            return s.toUpperCase();
          }
          return s.toLowerCase();
        })
        .join("");
    },
    removeAll() {
      this.imageList = [];
      this.updateImageList = [];
      this.updateCanvas(null, () => {});
    },
    save() {
      this.selectFolder(() => {
        this.loadFileData();
        this.savePng();
        this.saveFnt();
      });
    },
    selectFolder(func: any) {
      let self = this;
      //   Editor.Scene.callSceneScript(
      //     "bitmapfont",
      //     "getCocosVersion",
      //     function (err: any, version: any) {
      // let result = self.compareVersion(version, "2.4.5");
      //       Editor.log("版本号： ", version, "结果", result);
      //       if (result >= 0) {
      //大于等于2.4.5版本
      console.log("dialog::", dialog);
      dialog
        .showSaveDialog({ properties: ["createDirectory"] })
        .then((result) => {
          let fontPath = result.filePath;
          console.log("保存路径： ", fontPath);
          self.selectSuccess(fontPath, func);
        })
        .catch((err) => {
          console.log(err);
        });
      //   } else {
      //     let fontPath = dialog.showSaveDialog({
      //       properties: ["createDirectory"],
      //     });
      //     // Editor.Log("保存路径： ", fontPath);
      //     self.selectSuccess(fontPath, func);
      //   }
      // }
      //   );
    },
    compareVersion(v1: any, v2: any): any {
      let vers1 = v1.split(".");
      let vers2 = v2.split(".");
      const len = Math.max(v1.length, v2.length);
      while (vers1.length < len) {
        vers1.push("0");
      }
      while (vers2.length < len) {
        vers2.push("0");
      }
      for (let i = 0; i < len; i++) {
        const num1 = parseInt(vers1[i]);
        const num2 = parseInt(vers2[i]);
        if (num1 > num2) {
          return 1;
        } else if (num1 < num2) {
          return -1;
        }
      }
      return 0;
    },
    selectSuccess(fontPath: any, func: Function) {
      if (fontPath) {
        var agent = navigator.userAgent.toLowerCase();
        let fontArr = [];
        var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
        /**32或者64位 windoiws系统 */
        let isWindows =
          agent.indexOf("win32") >= 0 ||
          agent.indexOf("wow32") >= 0 ||
          agent.indexOf("win64") >= 0 ||
          agent.indexOf("wow64") >= 0;
        if (isWindows) {
          fontArr = fontPath.split("\\");
        }
        if (isMac) {
          fontArr = fontPath.split("/");
        }
        this.fontName = fontArr[fontArr.length - 1];
        console.log("fontName::", this.fontName);
        this.filePath = fontPath.replace("\\" + this.fontName, "");
        if (this.filePath) {
          console.log("选择完成，保存中");
          func();
        }
      }
    },
    saveFnt() {
      console.log("保存fnt");
      writeFileSync(
        this.filePath.replace(/\\/g, "/") + "/" + this.fontName + ".fnt",
        this.fontInfo
      );
      console.log("保存fnt成功");
    },
    savePng() {
      console.log("保存png", this.fontCanvas);
      let src = this.fontCanvas.toDataURL("image/png");
      console.log("src::", src);
      let data = src.replace(/^data:image\/\w+;base64,/, "");
      let buffer = new window.Buffer(data, "base64");
      console.log(src, data, buffer);
      writeFileSync(
        this.filePath.replace(/\\/g, "/") + "/" + this.fontName + ".png",
        buffer
      );
      console.log("保存png成功");
    },
  },
});
const panelDataMap = new WeakMap() as WeakMap<
  object,
  InstanceType<typeof component>
>;
/**
 * @zh 如果希望兼容 3.3 之前的版本可以使用下方的代码
 * @en You can add the code below if you want compatibility with versions prior to 3.3
 */
// Editor.Panel.define = Editor.Panel.define || function(options: any) { return options }
module.exports = Editor.Panel.define({
  listeners: {
    show() {
      console.log("show");
    },
    hide() {
      console.log("hide");
    },
  },
  template: readFileSync(
    join(__dirname, "../../../static/template/default/index.html"),
    "utf-8"
  ),
  style: readFileSync(
    join(__dirname, "../../../static/style/default/index.css"),
    "utf-8"
  ),
  $: {
    app: "#app",
    // text: '#text',
  },
  methods: {
    hello() {
      // if (this.$.text) {
      //     this.$.text.innerHTML = 'hello';
      //     console.log('[cocos-panel-html.default]: hello');
      // }
    },
  },
  ready() {
    // if (this.$.text) {
    //     this.$.text.innerHTML = 'Hello Cocos.';
    // }
    if (this.$.app) {
      const vm = new component();
      panelDataMap.set(this, vm);
      vm.$mount(this.$.app);
    }
  },
  beforeClose() {},
  close() {
    const vm = panelDataMap.get(this);
    if (vm) {
      vm.$destroy();
    }
  },
});
