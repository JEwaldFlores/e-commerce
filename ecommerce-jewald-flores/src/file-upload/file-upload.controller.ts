import { Controller, Param, ParseUUIDPipe, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from './pipes/file-validation.pipe';
import { UploadImageResponseDto } from './dto/upload-image-response.dto';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id', ParseUUIDPipe) productId: string,
    @UploadedFile(FileValidationPipe) file: Express.Multer.File,
  ): Promise<UploadImageResponseDto> {
    return this.fileUploadService.uploadImage(file, productId);
 }
}
