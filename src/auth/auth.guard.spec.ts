import { AuthGuard } from './auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import AuthService from './auth.service';
import { DeepPartial } from 'typeorm';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    guard = new AuthGuard(createMock<AuthService>());
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true if authorization header is present', () => {
    const context = createMock<ExecutionContext>({
      getType: () => 'graphql',
      getArgs: () =>
        [
          {},
          {},
          { req: { headers: { authorization: 'Baerer token' } } },
          {},
        ] as DeepPartial<any>,
    });
    expect(guard.canActivate(context)).toBeTruthy();
  });

  it('should return false if no authorization header is present', () => {
    const context = createMock<ExecutionContext>({
      getType: () => 'graphql',
      getArgs: () =>
        [
          {},
          {},
          { req: { headers: { authorization: null } } },
          {},
        ] as DeepPartial<any>,
    });
    expect(guard.canActivate(context)).toBeFalsy();
  });
});
