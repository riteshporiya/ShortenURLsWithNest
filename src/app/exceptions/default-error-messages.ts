import { ErrorCode } from './error-codes';

export const defaultErrorMessages = {
  [ErrorCode.WRONG_CREDENTIALS]: {
    message: 'Wrong credentials',
    statusCode: 401,
  },
  [ErrorCode.LINK_EXPIRED]: {
    message: 'Link Expired',
    statusCode: 400,
  },
  [ErrorCode.FORBIDDEN]: {
    message: 'Forbidden',
    statusCode: 403,
  },
  [ErrorCode.INTERNAL_SERVER_ERROR]: {
    message: 'Internal server error',
    statusCode: 500,
  },
  [ErrorCode.TOO_MANY_REQUESTS]: {
    message: 'Too many requests, please try again later.',
    statusCode: 429,
  },
  [ErrorCode.REQUEST_TIMEOUT]: {
    message: 'Request timeout',
    statusCode: 408,
  },
};
