import {createRoot} from 'react-dom/client';
import {MainView} from './components/main-view/main-view';
import './index.scss';
import Container from 'react-bootstrap/Container';

const App = () => {
   return (
      <Container style={{border: '1px solid red'}}>
        <MainView />
      </Container>
    );
};

// Finds the root of your app
const container = document.querySelector('#root');
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);