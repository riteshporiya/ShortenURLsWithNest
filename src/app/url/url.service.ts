import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import * as crypto from 'crypto';
import { DATA_SOURCE } from '../db/constants';
import { URL_REPOSITORY } from './constants';
import { Url } from './entities';
import { CustomExceptionFactory } from '../exceptions/custom-exception.factory';
import { ErrorCode } from '../exceptions/error-codes';

@Injectable()
export class UrlService {
  constructor(
    @Inject(URL_REPOSITORY)
    readonly urlRepository: Repository<Url>,
    @Inject(DATA_SOURCE) private readonly dataSource: DataSource,
  ) {}

  async create(urlBody: Url): Promise<Url> {
    const shortKey = await this.generateShortKey(urlBody.originalUrl);
    const url = this.urlRepository.create({
      originalUrl: urlBody.originalUrl,
      shortKey,
      expiresAt: urlBody.expiresAt,
    });

    return this.urlRepository.save(url);
  }

  async getOriginalUrl(shortKey: string): Promise<string | null> {
    const url = await this.urlRepository.findOne({
      where: { shortKey },
    });

    if (!url) {
      return null;
    }

    if (url.expiresAt && url.expiresAt < new Date()) {
      // await this.urlRepository.remove(url);
      throw CustomExceptionFactory.create(ErrorCode.LINK_EXPIRED);
    }

    url.clicks += 1;
    await this.urlRepository.save(url);

    return url.originalUrl;
  }

  private async generateShortKey(originalUrl: string): Promise<string> {
    const existingUrl = await this.urlRepository.findOne({
      where: { originalUrl },
    });
    if (existingUrl) {
      return existingUrl.shortKey;
    }
    let shortKey: string;
    let exists: boolean;

    do {
      shortKey = crypto.randomBytes(4).toString('hex');
      exists = !!(await this.urlRepository.findOne({ where: { shortKey } }));
    } while (exists);

    return shortKey;
  }
}
