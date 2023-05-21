import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryConfigService {
  constructor() {
    v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  }

  async uploadImage(file, folderName: string) {
    return new Promise((resolve, reject) => {
      const streamify = new Readable();
      streamify._read = () => {
        streamify.push(file.buffer);
        streamify.push(null);
      };
      const uploadOptions = {
        folder: `fns/${folderName}`,
      };
      streamify.pipe(
        v2.uploader.upload_stream(uploadOptions, (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        })
      );
    });
  }
}
