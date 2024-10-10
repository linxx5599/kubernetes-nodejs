import { HttpException, HttpStatus } from '@nestjs/common';
export function handleError(error: any) {
  throw new HttpException(
    error.body || error,
    error?.body?.code ?? HttpStatus.CONFLICT,
  );
}
