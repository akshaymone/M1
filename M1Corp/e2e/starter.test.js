describe('M1Corp App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.text('M1Corp'))).toBeVisible();
    await expect(element(by.text('Community Building App'))).toBeVisible();
    await expect(element(by.text('Sign in with Google'))).toBeVisible();
  });
});
