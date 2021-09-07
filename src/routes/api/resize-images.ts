import express, { Request, Response, Router } from "express";
import path from "path";
import sharp from "sharp";
import { getAccessToFiles, getFilesName } from "../../utils/utilities";
const resizeImages: Router = Router();
const app = express();

// access the images
const importImages = path.resolve(__dirname, "images");
// add the output file
const exportImages = path.resolve(__dirname, "uploads");

// allowing our application to parse json input
app.use(express.json());

resizeImages.get("/", (req: Request, res: Response) => {
  const resizeImage = async (
    imageName: string,
    width: number | null,
    height: number | null
  ): Promise<string> => {
    const resizedImageName = getFilesName(imageName, width, height);
    try {
      await sharp(`${importImages}${imageName}.jpg`)
        .resize(width, height)
        .jpeg()
        .toFile(`${importImages}${resizedImageName}`);      
    } catch (err) {
      res.status(400).json({ error: err});
    }      
    return resizedImageName;
    };
    
    return res.send(resizeImage)
});

export default resizeImages;
