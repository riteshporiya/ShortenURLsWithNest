import { Url } from 'src/app/url/entities';
import { UrlReqDto } from '../dtos/requests';
import { UrlResDto } from '../dtos/responses';

export class UrlMapper {
  static toEntity(urlDto: UrlReqDto): Url {
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // Add 1 day in milliseconds
    const url = new Url();
    url.originalUrl = urlDto.url;
    url.expiresAt = new Date(expiresAt);

    return url;
  }

  static toResponseDto(urlEntity: Url): UrlResDto {
    return {
      id: urlEntity.id,
      shortUrlKey: urlEntity.shortKey,
    };
  }
}
