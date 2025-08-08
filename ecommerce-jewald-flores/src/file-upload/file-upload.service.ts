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
        // 1. Verifica si el producto existe (NotFoundException si no)
        const product = await this.productsService.getProduct(productId);
      
        if (!product) {
          throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
        }

        // 2. Sube la imagen a Cloudinary
        const { secure_url } = await this.fileUploadRepository.uploadImage(file);

        // 3. Actualiza el campo imgUrl del producto
        await this.productsService.updateProduct(productId, { imgUrl: secure_url, });

            // 4. Devuelve una respuesta estructurada
            return new UploadImageResponseDto({
            message: 'Imagen actualizada exitosamente',
            imageUrl: secure_url,
       });
  }
}

