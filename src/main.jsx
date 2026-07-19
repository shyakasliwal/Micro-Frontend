import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { startMockServer } from './mocks/browser';
import MusicLibrary from './MusicLibrary';

async function bootstrap() {
  await startMockServer();

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <MusicLibrary role="admin" />
    </StrictMode>,
  );
}

bootstrap();
