import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  try {
    const x = join(__dirname, "files");
    const y = join(__dirname, "files_copy");

    try {
      await fs.access(x);
    } catch (err) {
      throw new Error("FS operation failed");
    }

    try {
      await fs.access(y);
      throw new Error("FS operation failed");
    } catch (err) {}

    await fs.mkdir(y);

    const z = await fs.readdir(x);

    for (const w of z) {
      const v = join(x, w);
      const u = join(y, w);

      const t = await fs.stat(v);
      if (t.isDirectory()) {
        await copyDirectory(v, u);
      } else {
        await fs.copyFile(v, u);
      }
    }

    console.log("Files copied successfully!");
  } catch (err) {
    console.error(err.message);
  }
};

const copyDirectory = async (x, y) => {
  try {
    await fs.mkdir(y, { recursive: true });
    const z = await fs.readdir(x);
    for (const w of z) {
      const v = join(x, w);
      const u = join(y, w);
      const t = await fs.stat(v);

      if (t.isDirectory()) {
        await copyDirectory(v, u);
      } else {
        await fs.copyFile(v, u);
      }
    }
  } catch (err) {
    console.error("Error copying directory:", err.message);
  }
};

await copy();
