export class UploadImageResponseDto {
  message: string;
  imageUrl: string;

  constructor(data: Partial<UploadImageResponseDto>) {
      Object.assign(this, data);
    }
}