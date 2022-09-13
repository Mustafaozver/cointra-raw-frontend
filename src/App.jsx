import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MyPZTheme } from '@mypz/react-kit';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import './App.scss';

import MainLayout from './components/layouts/main/MainLayout';
import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/home/HomePage';
import AgenciesListPage from './pages/agencies/list/AgenciesListPage';
import CreateAgencyPage from './pages/agencies/create/CreateAgencyPage';
import UpdateAgencyPage from './pages/agencies/update/UpdateAgencyPage';
import AgentsListPage from './pages/agents/list/AgentsListPage';
import CreateAgentPage from './pages/agents/create/CreateAgentPage';
import UpdateAgentPage from './pages/agents/update/UpdateAgentPage';
import ImportTrackingsListPage from './pages/imports/list/ImportTrackingsListPage';
import PropertiesListPage from './pages/properties/list/PropertiesListPage';
import PropertiesUpdatePage from './pages/properties/update/PropertiesUpdatePage';
import PostsListPage from './pages/blogs/list/PostsListPage';
import CreatePostPage from './pages/blogs/create/CreatePostPage';
import UpdatePostPage from './pages/blogs/update/UpdatePostPage';

const App = () => (
  <div className="App">
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <BrowserRouter>
        <MyPZTheme>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/agencies" element={<AgenciesListPage />} />
              <Route path="/agencies/create" element={<CreateAgencyPage />} />
              <Route path="/agencies/update/:slug" element={<UpdateAgencyPage />} />
              <Route path="/agents" element={<AgentsListPage />} />
              <Route path="/agents/create" element={<CreateAgentPage />} />
              <Route path="/agents/update/:slug" element={<UpdateAgentPage />} />
              <Route path="/properties" element={<PropertiesListPage />} />
              <Route path="/properties/update/:slug" element={<PropertiesUpdatePage />} />
              <Route path="/imports" element={<ImportTrackingsListPage />} />
              <Route path="/blogs" element={<PostsListPage />} />
              <Route path="/blogs/posts/create" element={<CreatePostPage />} />
              <Route path="/blogs/posts/update/:slug" element={<UpdatePostPage />} />
            </Routes>
          </MainLayout>
        </MyPZTheme>
      </BrowserRouter>
    </MuiPickersUtilsProvider>
  </div>
);

export default App;
