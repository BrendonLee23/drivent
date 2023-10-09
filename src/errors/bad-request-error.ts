import { ApplicationError } from '@/protocols';

export function badResquestError(): ApplicationError {
  return {
    name: 'BadResquest',
    message: 'Bad request error!',
  };
}
