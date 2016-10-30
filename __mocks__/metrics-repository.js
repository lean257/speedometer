jest.mock('../server/repositories/metrics-repository', () =>
  Object.assign({}, {
    lastResponseDurationOfUris() {
      return new Promise((resolve) => {
        resolve([]);
      });
    },
  })
);
