import { promises as fs } from "fs";

// accessing the images
let getAccessToFiles = (path: string): boolean => {
    try {
        fs.access(path)
        return true;
    } catch (err) {
        return false;
    }
}

let getFilesName = (
  imageToResize: string,
  width: number | null,
  height: number | null
): string => {
  let filename = imageToResize;
  if (width) {
    filename += `width${width}`;
  }
  if (height) {
    filename += `height${height}`;
    }
    
    return `${filename}.jpg`
};


export { getAccessToFiles, getFilesName };

