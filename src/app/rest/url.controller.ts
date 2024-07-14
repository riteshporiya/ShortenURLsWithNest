import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { UrlService } from '../url/url.service';
import { UrlReqDto } from './dtos/requests';
import { UrlMapper } from './mappers';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async shortenUrl(@Body() createUrlDto: UrlReqDto) {
    const url = UrlMapper.toEntity(createUrlDto);
    const urlEntity = await this.urlService.create(url);
    return UrlMapper.toResponseDto(urlEntity);
  }

  @Get(':shortKey')
  @Redirect()
  async redirectToOriginalUrl(@Param('shortKey') shortKey: string) {
    const originalUrl = await this.urlService.getOriginalUrl(shortKey);
    if (originalUrl) {
      return { url: originalUrl };
    } else {
      return { url: '/' }; // Redirect to home page if short URL not found
    }
  }
}
