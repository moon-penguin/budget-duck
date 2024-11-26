import * as fs from 'node:fs/promises';
import * as path from 'node:path';

export class ConvenientFileSysOps {
  static async readFile(filePath: string) {
    return await fs.readFile(filePath, { encoding: 'utf-8' });
  }

  static async isDirectory(dirPath: string) {
    const stats = await fs.stat(dirPath);
    return stats.isDirectory();
  }

  static joinPath(...paths: string[]) {
    return path.join(...paths);
  }

  static async traverseDirectory(
    dirPath: string,
    callback: (dirContentPath: string) => void
  ) {
    const dirContents = await fs.readdir(dirPath);

    await Promise.allSettled(
      dirContents.map(async (dirContent) => {
        callback(dirContent);
      })
    );
  }
}
