import express, { Express, Request, Response } from 'express';
import { sendNewEmail } from './queues/emailQueues';
import sharp from 'sharp'

const app: Express = express();
const port = 3000
app.use(express.json())

async function getMetadata() {
    try {
        const metadata = await sharp("sammy.png").metadata();
        console.log(metadata);
    } catch (error) {
        console.log(`An error occurred during processing: ${error}`);
    }
}
getMetadata()

async function resizeImage() {
    try {
        await sharp("sammy.png")
            .resize({
                width: 150,
                height: 97
            })
            .toFormat("jpeg", { mozjpeg: true })
            .toFile("sammy-resized-compressed.jpeg");
    } catch (error) {
        console.log(error);
    }
}

// resizeImage();
async function cropImage() {
    try {
        await sharp("sammy.png")
            .extract({ width: 500, height: 330, left: 120, top: 70 })
            .toFile("sammy-cropped.png");
    } catch (error) {
        console.log(error);
    }
}

// cropImage();
async function compositeImages() {
    try {
        await sharp("underwater.png")
            .composite([
                {
                    input: "sammy-transparent.png",
                    top: 50,
                    left: 50,
                },
            ])
            .toFile("sammy-underwater.png");
    } catch (error) {
        console.log(error);
    }
}

// compositeImages()

async function addTextOnImage(text: string, backgroundPic: string) {
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
        const image = await sharp(`${backgroundPic}.png`)
            .composite([
                {
                    input: svgBuffer,
                    top: 0,
                    left: 0,
                },
            ])
            .toFile(`${text}-composite.png`);
    } catch (error) {
        console.log(error);
    }
}

//add the text in the argument to the picture

// addTextOnImage('swimming!!', `sammy-underwater`);


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});