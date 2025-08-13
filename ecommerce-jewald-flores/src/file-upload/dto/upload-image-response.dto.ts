import { ApiProperty } from "@nestjs/swagger";

export class UploadImageResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty({ example: 'https://res.cloudinary.com/<cloud>/image/upload/abc123.jpg'})
  imageUrl: string;

  constructor(data: Partial<UploadImageResponseDto>) {
      Object.assign(this, data);
    }
}