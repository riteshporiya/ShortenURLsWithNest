import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UrlReqDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @Transform(({ value }) => value.trim())
  url: string;
}
