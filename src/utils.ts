import sharp from "sharp";
import path from "path";
import fs from "fs";

const rootDir = path.join(__dirname, "..");
const cacheDir = rootDir + "/images/cache/";

if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(path.join(rootDir, "/images/cache"));
}

export function cleanOldCache(except: string): number {
  const files = fs.readdirSync(cacheDir);
  files.sort(function(a, b) {
    return (
      fs.statSync(cacheDir + b).birthtimeMs -
      fs.statSync(cacheDir + a).birthtimeMs
    );
  });
  const toRemove = files.slice(9, files.length);
  for (const file of toRemove) {
    if (except !== file) {
      fs.rmSync(path.join(cacheDir, file));
    }
  }
  return fs.readdirSync(cacheDir).length;
}

export async function resizeImage(
  filename: string,
  width: number,
  height: number
): Promise<string> {
  const cachedImg = getCachedPath(filename, width, height);

  cleanOldCache(
    /*this pramater for except this path from removing for this request*/

    path.basename(cachedImg)
  );
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(cachedImg)) {
      return sharp(rootDir + "/images/" + filename + ".jpg")
        .resize(width, height)
        .toFile(cachedImg)
        .then(() => resolve(cachedImg))
        .catch(err => reject(err.message));
    } else {
      console.log("cached");
    }
    resolve(cachedImg);
  });
}

function getCachedPath(
  filename: string,
  width: number,
  height: number
): string {
  return path.join(cacheDir, filename + "." + width + "-" + height + ".jpg");
}
