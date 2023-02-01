/* eslint-disable */

import { useState } from "react";
import { Nav } from 'react-bootstrap';
import {CSSTransition} from 'react-transition-group';
import DataSearch from "./search/DataSearch";
import Monitoring from "./search/Monitoring";
import { Overview } from "./search/Overview";

const TabContenter = (props) => {
  if(props.clickedTab === 0) {
    return (
      <div className="tab-content show">
        <Overview />
      </div>
    )
  } else if(props.clickedTab === 1) {
    return (
      <div className="tab-content show">
        <DataSearch />
      </div>
    )
  } else {
    <div className="tab-content show">
      <Monitoring />
    </div>
  }
}

export const TabContainer = (props) => {
  const [onOff, setOnOff] = useState(false);
  const [clickedTab, setClickedTab] = useState(0);

  return (
    <>
      <div className="App">
        <Nav className='tab-button' variant="tabs" defaultActiveKey="0">
          <Nav.Item>
            <Nav.Link className="tab-button" href="/" eventKey="0" onClick={()=>{setOnOff(false); setClickedTab(0);}}>전체 현황 조회</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="tab-button" eventKey="1" onClick={ ()=>{setOnOff(false); setClickedTab(1); }}>데이터 조회</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="tab-button" eventKey="2" onClick={ ()=>{setOnOff(false); setClickedTab(2); }}>모니터링</Nav.Link>
          </Nav.Item>
        </Nav>      
        <CSSTransition in={onOff} classNames="show" timeout={500}>
          <TabContenter clickedTab = {clickedTab} setOnOff = {setOnOff} />
        </CSSTransition>
      </div>
    </>
  );
}