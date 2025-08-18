import { Controller, Param, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from './pipes/file-validation.pipe';
import { UploadImageResponseDto } from './dto/upload-image-response.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { memoryStorage } from 'multer';

@ApiTags('files')
@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('file',{  storage: memoryStorage(), 
      limits: { fileSize: 200 * 1024 },
    }),
  )
  @ApiOperation({ summary: 'Subir imagen a Cloudinary y actualizar imgUrl del producto' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
      required: ['file'],
    },
  })
  @ApiResponse({ status: 201, description: 'Imagen actualizada', type: UploadImageResponseDto})
  @ApiResponse({status: 400, description: 'Carga fallida'})
  async uploadImage(
    @Param('id', ParseUUIDPipe) productId: string,
    @UploadedFile(FileValidationPipe) file: Express.Multer.File,
  ): Promise<UploadImageResponseDto> {
    return this.fileUploadService.uploadImage(file, productId);
 }
}
