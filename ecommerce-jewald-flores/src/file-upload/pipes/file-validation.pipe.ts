import {
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  private readonly maxSizeInBytes = 200 * 1024; 
  private readonly allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  private readonly allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

  transform(file: Express.Multer.File): Express.Multer.File {
    
    if (!file) {
      throw new BadRequestException('Ningún archivo fue proporcionado');
    }

   
    const extension = extname(file.originalname).toLowerCase();
    if (!this.allowedExtensions.includes(extension)) {
      throw new BadRequestException(
        `Extensión de archivo no permitida. Solo se permiten: ${this.allowedExtensions.join(', ')}`,
      );
    }

    
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Tipo MIME no permitido. Solo se permiten: ${this.allowedMimeTypes.join(', ')}`,
      );
    }

    
    if (file.size > this.maxSizeInBytes) {
      throw new BadRequestException('El archivo excede el tamaño máximo de 200 KB');
    }

    return file;
  }
}