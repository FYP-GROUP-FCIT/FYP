import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryConfigService {
  constructor() {
    v2.config({
      cloud_name: process.env.CLOUD_NAME || 'dsnukqjun',
      api_key: process.env.API_KEY || '262926798515183',
      api_secret: process.env.API_SECRET || 'IaQ8SP4sVGXnxyxlddaLQS67wXM',
    });
  }

  async uploadImage(file, folderName: string) {
    //  console.log(object) file.mimetype.split('/')[1];
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
