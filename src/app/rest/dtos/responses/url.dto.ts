import { ApiResponseProperty } from '@nestjs/swagger';

export class UrlResDto {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  shortUrlKey: string;
}

export class RedirectResponseDto {
  @ApiResponseProperty()
  url: string;
}
