export const hasKeys = (received, expectedKeys) => {
  const receivedKeys = Object.keys(received);
  expectedKeys.forEach((key) => {
    if (!receivedKeys.includes(key)) {
      throw Error(`there is no ${key}`);
    }
  });
}
