/* eslint-disable */

import { useEffect, useRef, useState } from "react";
import {CSSTransition} from 'react-transition-group';
import { Link } from "react-router-dom";
import '../style.css';

export const TabContainer = (props) => {
  const { onTabChange, children } = props;
  const [onOff, setOnOff] = useState(false);
  const [active, setActive] = useState('active1');
  const [localId, setLocalId] = useState('');

  const nodeRef = useRef(null);

  const randomId = () => {
    let randomNum = Math.floor(Math.random() * 100);
    return randomNum.toString();
  }

  const userLocalId = () => {
    localStorage.setItem('userInfo', randomId());
    setLocalId(localStorage.getItem('userInfo'));
    return setLocalId;
  }

  const onClickTab = (tabIndex) => {
    setOnOff(!onOff);
    onTabChange(tabIndex);
  }

  useEffect(() => {
   userLocalId(); 
  },[localStorage.getItem("userInfo") === null]);

  return (
    <>
      <div>
        <div className="container mt-1 ml-1">
          <ul className="list" variant="tabs" defaultactivekey="0" >
              <li className={"tab-button " + (active === 'active1' ? 'orange' : null)} onClick={() => {onClickTab(0); setActive('active1'); userLocalId();}}>전체 현황 조회</li>
            <li className={"tab-button " + (active === 'active2' ? 'orange' : null)} onClick={() => {onClickTab(1); setActive('active2'); userLocalId();}}>데이터 조회</li>
            <li className={"tab-button " + (active === 'active3' ? 'orange' : null)} onClick={() => {onClickTab(2); setActive('active3'); userLocalId();}}>모니터링</li>
          </ul>      
        </div>
        <CSSTransition in={onOff} classNames="show" timeout={500} nodeRef={nodeRef}>
          {children}
        </CSSTransition>
      </div>
    </>
  );
}
