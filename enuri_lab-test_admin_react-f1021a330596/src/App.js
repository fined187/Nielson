/* eslint-disable */

import './App.css';
import React, {useState, Suspense} from 'react';
import { TabContainer } from "./component/TabContainer"
import Loading from './component/Loading';

const Overview = React.lazy(() => import("./component/search/Overview"));
const DataSearch = React.lazy(() => import('./component/search/DataSearch'));
const Monitoring = React.lazy(() => import('./component/search/Monitoring'));

const renderTabContent = (idx) => {
  if(idx === 0) {
    return (
      <>
        <Suspense fallback={<div><Loading /></div>}>
          <div className="tab-content show">
            <Overview />
          </div>
        </Suspense>
      </>
    );
  }
  if (idx === 1) {
    return (
      <>
        <Suspense fallback={<div><Loading /></div>}>
        <div className="tab-content show">
          <DataSearch />
        </div>
        </Suspense>
      </>
    );
  }
  if (idx === 2) {
    return (
      <>
        <Suspense fallback={<div><Loading /></div>}>
        <div className="tab-content show">
          
        </div>
        </Suspense>
      </>
    );
  }
}

function App() {
  const [clickedTab, setClickedTab] = useState(0);
  
  return (
    <div className="App">
      <TabContainer onTabChange={setClickedTab}>
        {renderTabContent(clickedTab)}
      </TabContainer>
    </div>
  );
}

export default App;
