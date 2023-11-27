import * as Fs from 'fs';
import { remote } from 'electron';

interface ImageInfo {
    img: string;
    char: string;
    width: number;
    height: number;
    x: number;
    y: number;
}

class BitmapFontPanel {
    private fontCanvas: HTMLCanvasElement;
    private plugin: any;

    constructor() {
        this.fontCanvas = document.querySelector("#fontCanvas") as HTMLCanvasElement;
        this.initVue();
    }

    private initVue() {
        this.plugin = new window.Vue({
            el: '#app',
            data() {
                return {
                    filePath: "",
                    imageList: [] as ImageInfo[],
                    updateImageList: [] as string[],
                    canvasWidth: 256,
                    canvasHeight: 256,
                    fontInfo: '',
                };
            },
            methods: {
                dragEnter(e: DragEvent) {
                    e.stopPropagation();
                    e.preventDefault();
                },
                // 其他方法...
                // 注意: 方法中的 'this' 上下文在 TypeScript 中可能需要特别处理
            }
        });
    }
}

// Cocos Creator 面板扩展
Editor.Panel.extend({
    style: Fs.readFileSync(Editor.url('packages://bitmapfont/panel/index.css', 'utf8')),
    template: Fs.readFileSync(Editor.url('packages://bitmapfont/panel/index.html', 'utf8')),

    ready() {
        new BitmapFontPanel();
    },
});
