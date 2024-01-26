import { Wallet } from './wallet';

describe('Wallet', () => {
  it('should create an instance', () => {
    // @ts-ignore
    expect(new Wallet()).toBeTruthy();
  });
});
