import { ApplicationError } from '@/protocols';

export function notFoundError(resourse: string): ApplicationError {
  return {
    name: 'NotFoundError',
    message: `${resourse}No result for this search!`,
  };
}
