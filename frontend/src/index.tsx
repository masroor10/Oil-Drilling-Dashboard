import { styled } from '@mui/material';
import { MaterialDesignContent, SnackbarProvider } from 'notistack';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './application/store';
import './index.scss';
import AppThemeProvider from './ui/theme';

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-info': {
    backgroundColor: 'white',
    alignItems: 'center',
    color: 'black',
    '& svg': {
      color: '#05A6F0'
    }
  }
}));

const container = document.getElementById('root') ?? document.createElement('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppThemeProvider>
        <SnackbarProvider Components={{ info: StyledMaterialDesignContent }}>
          <App />
        </SnackbarProvider>
      </AppThemeProvider>
    </BrowserRouter>
  </Provider>
);

