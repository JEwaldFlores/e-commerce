import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { CloudinaryProvider } from '../config/cloudinary';
import { FileUploadRepository } from './file-upload.repository';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [FileUploadController],
  providers: [FileUploadService, FileUploadRepository ,CloudinaryProvider],
})
export class FileUploadModule {}
