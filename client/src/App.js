import React from 'react';
import './App.css';
import { store } from "./api/store";
import { Provider } from "react-redux";
import ProjectView from './views/project';
import './tailwind.output.css';

function App() {
  return (
    <>
      <header className="bg-gray-900 text-white flex items-center h-12 w-full">
          <div className="container mx-auto">
              <a className="navbar-brand" href="/">Timelogger</a>
          </div>
      </header>
      
      <main>
          <div className="container mx-auto">                      
            <Provider store={store}>
                <ProjectView />
            </Provider>
          </div>
      </main>
  </>
  );
}

export default App;
