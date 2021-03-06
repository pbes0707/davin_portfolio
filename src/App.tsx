import {ThemeProvider} from "styled-components";
import {Provider} from 'react-redux';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import store from "./redux/store";

import Container from "./Container";
import Home from "./pages/HomePage";
import ProjectList from "./pages/ProjectList";
// import NotFound from "./pages/NotFoundPage";


function App() {
  return (
    <ThemeProvider theme={{}}>
      <Provider store={store}>
        <BrowserRouter>
          <Container>
              <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/magazine'} element={<ProjectList />} />
                <Route path={'/brand'} element={<ProjectList />} />
                <Route path={'/film'} element={<ProjectList />} />
                <Route path={'/magazine/:id'} element={<ProjectList />} />
                <Route path={'/brand/:id'} element={<ProjectList />} />
                <Route path={'/film/:id'} element={<ProjectList />} />
                {/* <Route path={'*'} element={<NotFound/>}/> */}
              </Routes>
            </Container>
          </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
