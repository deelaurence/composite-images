"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
function getMetadata() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const metadata = yield (0, sharp_1.default)("sammy.png").metadata();
            console.log(metadata);
        }
        catch (error) {
            console.log(`An error occurred during processing: ${error}`);
        }
    });
}
getMetadata();
function resizeImage() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, sharp_1.default)("sammy.png")
                .resize({
                width: 150,
                height: 97
            })
                .toFormat("jpeg", { mozjpeg: true })
                .toFile("sammy-resized-compressed.jpeg");
        }
        catch (error) {
            console.log(error);
        }
    });
}
// resizeImage();
function cropImage() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, sharp_1.default)("sammy.png")
                .extract({ width: 500, height: 330, left: 120, top: 70 })
                .toFile("sammy-cropped.png");
        }
        catch (error) {
            console.log(error);
        }
    });
}
// cropImage();
function compositeImages() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, sharp_1.default)("underwater.png")
                .composite([
                {
                    input: "sammy-transparent.png",
                    top: 50,
                    left: 50,
                },
            ])
                .toFile("sammy-underwater.png");
        }
        catch (error) {
            console.log(error);
        }
    });
}
// compositeImages()
function addTextOnImage(text, backgroundPic) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const width = 750;
            const height = 483;
            const svgImage = `
    <svg width="${width}" height="${height}">
      <style>
      .title { fill: #001;font-family:monospace; font-size: 70px; font-weight: bold;}
      </style>
      <text x="50%" y="50%" text-anchor="middle" class="title">${text}</text>
    </svg>
    `;
            const svgBuffer = Buffer.from(svgImage);
            const image = yield (0, sharp_1.default)(`${backgroundPic}.png`)
                .composite([
                {
                    input: svgBuffer,
                    top: 0,
                    left: 0,
                },
            ])
                .toFile(`${text}-composite.png`);
        }
        catch (error) {
            console.log(error);
        }
    });
}
//add the text in the argument to the picture
// addTextOnImage('swimming!!', `sammy-underwater`);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
