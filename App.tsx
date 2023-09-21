import { Groups } from '@screens/Groups';
import { ThemeProvider } from 'styled-components';

import themes from './src/themes';

export default function App() {
  return (
    <ThemeProvider theme={themes}>
      <Groups />
    </ThemeProvider>
  );
}
