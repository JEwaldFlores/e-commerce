import { Controller, Param, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from './pipes/file-validation.pipe';
import { UploadImageResponseDto } from './dto/upload-image-response.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id', ParseUUIDPipe) productId: string,
    @UploadedFile(FileValidationPipe) file: Express.Multer.File,
  ): Promise<UploadImageResponseDto> {
    return this.fileUploadService.uploadImage(file, productId);
 }
}
