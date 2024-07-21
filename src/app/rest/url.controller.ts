import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { UrlService } from '../url/url.service';
import { UrlReqDto } from './dtos/requests';
import { UrlMapper } from './mappers';
import { RateLimit } from '../rate-limiter/decorator/rate-limit.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RedirectResponseDto, UrlResDto } from './dtos/responses';

@ApiTags('URL')
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @ApiResponse({
    status: 201,
    description: 'The url has been successfully added.',
    type: UrlResDto,
  })
  @Post()
  async shortenUrl(@Body() createUrlDto: UrlReqDto): Promise<UrlResDto> {
    const url = UrlMapper.toEntity(createUrlDto);
    const urlEntity = await this.urlService.create(url);
    return UrlMapper.toResponseDto(urlEntity);
  }

  @ApiResponse({
    status: 200,
    description: 'The company has been successfully retrieved.',
    type: RedirectResponseDto,
  })
  @Get(':shortKey')
  @RateLimit(10, 1 * 60 * 1000) // 100 requests per minute
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
