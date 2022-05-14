import {ThemeProvider} from "styled-components";
import {Provider} from 'react-redux';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import store from "./redux/store";

import Container from "./Container";
import Home from "./pages/HomePage";
import Magazine from "./pages/Magazine";
import Brand from "./pages/Brand";
import Film from "./pages/Film";
// import NotFound from "./pages/NotFoundPage";


function App() {
  return (
    <ThemeProvider theme={{}}>
      <Provider store={store}>
        <BrowserRouter>
          <Container>
              <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/magazine'} element={<Magazine />} />
                <Route path={'/brand'} element={<Brand />} />
                <Route path={'/film'} element={<Film />} />
                {/* <Route path={'*'} element={<NotFound/>}/> */}
              </Routes>
            </Container>
          </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
