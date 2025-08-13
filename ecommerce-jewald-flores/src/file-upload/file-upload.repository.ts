import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse, v2 as cloudinary } from 'cloudinary';
import toStream = require('buffer-to-stream');

/**
 * FileUploadRepository
 * Encapsula la lógica de subida de archivos a Cloudinary usando streams
 */
@Injectable()
export class FileUploadRepository {

  /**
   * Sube una imagen a Cloudinary desde un buffer
   * @param file Archivo recibido desde Multer (en memoria)
   * @returns UploadApiResponse con datos como secure_url
   */
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

      toStream(file.buffer).pipe(uploadStream); 
    });
  }
}