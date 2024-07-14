import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UrlReqDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @Transform(({ value }) => value.trim())
  url: string;
}
