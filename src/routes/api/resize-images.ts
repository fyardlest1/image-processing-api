import express, { Request, Response, Router } from "express";
import path from "path";
import sharp from "sharp";
import multer from "multer"
import { getFilesName } from "../../utils/utilities";
const resizeImages: Router = Router();
const app = express();

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValidType = FILE_TYPE_MAP[file.mimetype];
    let uploadErr = new Error('the image type is invalid');
    if (isValidType) {
      uploadErr = null;
    }
    cb(uploadErr, "public/uploads");
  },
  filename: function (req, file, cb) {    
    const fileName = file.originalname.replace(' ', '-');
    const extention = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extention}`);
  },
});

const uploadImage = multer({ storage: storage });

// access the images
// const importImages = path.resolve(__dirname, "images");
//localhost:5000/api/v1/resizeimages?filename=e-commerce-sales&width=200&height=200

// allowing our application to parse json input
http: app.use(express.json());

resizeImages.get("/", uploadImage.single('image'), async (req: Request, res: Response) => {
  const file = req.file
  if (!file) {
    res.status(400).send('There is no file in the request')
  }

  const fileName = req.file.filename
  if (!fileName) {
    res.status(400).send("The filename does not exist");
  }

  const basePath: string = `${req.protocol}://${req.get('host')}/public/uploads`
  
  const resizeImage = async (
    imageName: string,
    width: number | null,
    height: number | null
  ): Promise<string> => {
    const resizedImageName: string = getFilesName(imageName, width, height);
    try {
      await sharp(`${fileName}${imageName}.jpg`)
        .resize(width, height)
        .jpeg()
        .toFile(`${fileName}${basePath}`);      
    } catch (err) {
      res.status(400).json({ error: err});
    }      
    return resizedImageName;
    };
    
    return res.send(resizeImage)
});

export default resizeImages;
