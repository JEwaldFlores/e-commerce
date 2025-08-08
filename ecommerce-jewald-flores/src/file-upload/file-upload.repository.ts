import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse, v2 as cloudinary } from 'cloudinary';
import toStream = require('buffer-to-stream');

//se maneja como promesa porque cloudinary no esta dentro del codigo se maneja como repositorio
@Injectable()
export class FileUploadRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error || !result) {
            return reject(
              new InternalServerErrorException(error?.message || 'Error uploading to Cloudinary'),
            );
          }
          return resolve(result);
        },
      );

      toStream(file.buffer).pipe(uploadStream); //hace la conversion 
    });
  }
}