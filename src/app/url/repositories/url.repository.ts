import { Provider } from '@nestjs/common';
import { DATA_SOURCE } from 'src/app/db/constants';
import { DataSource } from 'typeorm';
import { URL_REPOSITORY } from '../constants';
import { Url } from '../entities';

export const urlRepositoryProvider: Provider = {
  provide: URL_REPOSITORY,
  inject: [DATA_SOURCE],
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Url),
};
