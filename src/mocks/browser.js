import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

let startPromise;

export async function startMockServer() {
  if (!startPromise) {
    const options = { onUnhandledRequest: 'bypass' };

    if (import.meta.env.PROD) {
      options.serviceWorker = {
        url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
      };
    }

    startPromise = worker.start(options).catch((error) => {
      startPromise = undefined;
      throw error;
    });
  }

  return startPromise;
}
