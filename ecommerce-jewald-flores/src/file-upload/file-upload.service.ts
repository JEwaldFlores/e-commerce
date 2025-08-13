import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { ProductsService } from 'src/products/products.service';
import { UploadImageResponseDto } from './dto/upload-image-response.dto';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    private readonly productsService: ProductsService,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string): Promise<UploadImageResponseDto> {
       
        const product = await this.productsService.getProduct(productId);
      
        if (!product) {
          throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
        }

        const { secure_url } = await this.fileUploadRepository.uploadImage(file);

      
        await this.productsService.updateProduct(productId, { imgUrl: secure_url, });

            
            return new UploadImageResponseDto({
            message: 'Imagen actualizada exitosamente',
            imageUrl: secure_url,
       });
  }
}

