/* eslint-disable */
import { Table, Form, Row, Button, Col } from 'react-bootstrap';
import {Styles, Space} from '../../css/Styles';
import React, { useEffect, useState } from "react";
import * as cateCall from "../../api/cateCall";
import * as shopCall from "../../api/shopCall";
import { Autocomplete, Checkbox, fabClasses, TextField } from '@mui/material';
import { cateOptions } from "../../constants";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import OverviewResult from '../result/OverviewResult';
import { OverStartDate, OverEndDate } from '../date/Date';
import {sendFormOverview} from "../../api/sendForm";
import Loading from '../Loading';
import {downloadOverview} from "../../utils/Download"

export const Overview = (props) => {  

  //  조회 결과 담기
  const [jsonList, setJsonList] = useState(null);
  const [loading, setLoading] = useState(false);

  //  카테고리 관련
  const [lCateShow, setLcateShow] = useState(false);
  const [cateOption, setCateOption] = useState('LCATE');
  const [lCate, setLcate] = useState(null);
  const [mCate, setMcate] = useState({
    cateList: null
  });
  const [mCateList, setMcateList] = useState(null);
  const [mCateShow, setMcateShow] = useState(false);
  const [sCate, setScate] = useState({
    cateList: null
  });
  const [sCateList, setScateList] = useState(null);
  const [sCateShow, setScateShow] = useState(false);

  //  삭제 이벤트 전 초기 대, 중 카테고리를 담아놓은 상태
  const [prevLcate, setPrevLcate] = useState({
    cateList: null
  });
  const [prevMcate, setPrevMcate] = useState({
    cateList: null
  });
    
  //  쇼핑몰 관련
  const [shopList, setShopList] = useState([]);
  const [shopListShow, setShopListShow] = useState(true);

  // disabled
  const [disable, setDisable] = useState(false);

  //  카테고리 박스 아이콘 변수 선언
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;


  //  대카테고리 api call 함수 호출
  let lcateObject = [];
  const handleCate = async (e) => {
    if (e.target.value === 'SELF') {
      lcateObject = await cateCall.callCate();
      setLcate([{ ENR_LCATE_NAME: '00카테', ENR_LCATE_CODE: '00' }, ...lcateObject])
      setLcateShow(true);
    } else {
      setLcateShow(false);
      setMcate({
        cateList:null
      })
      setMcateShow(false);
      setScate({
        cateList: null
      })
      setScateShow(false);
    }
  }

  //  선택한 대카테고리 담는 로직
  let listLCate = [];
  const handleCateSelection = (_e, selectedOpts) => {
    listLCate = selectedOpts.map((selectedOpt) => selectedOpt.ENR_LCATE_CODE);
    if(!listLCate === true) {
      setMcate(prevState => {
        return {
          ...prevState,
          cateList: null
        }
      }
    );} else {
      setMcate(prevState => {
        return {
          ...prevState,
          cateList: listLCate
        }
      });

      setPrevLcate(prevState => {
        return {
          ...prevState,
          cateList: listLCate
        }
      });

      setOverData(prevState => {
        return {
          ...prevState,
          cateList: listLCate
        }
      });
      }
    }  

  //  중카테고리 api call 함수 호출
  let mcateObject = [];
  const handleMcate = async() => {
    mcateObject = await cateCall.callMcate(mCate);
    setMcateList([{ ENR_MCATE_NAME: '00카테', ENR_MCATE_CODE: '00' }, ...mcateObject]);
    setMcateShow(true);
  }

  useEffect(() => {
    if(mCate.cateList !== null) {
      handleMcate();    
    }
  },[mCate.cateList]);
  
  let checkResult = [];
  let listMCate = [];
  let listMCateSub = [];
  const handleMCateSelection = (_e, selectedOpts) => {
    listMCate = selectedOpts.map((selectedOpt) => selectedOpt.ENR_MCATE_CODE);
    listMCateSub = selectedOpts.map((selectedOpt) => selectedOpt.ENR_MCATE_CODE.substring(0, 2));
    setScate(prevState => {
      return {
        ...prevState,
        cateList: listMCate
      }
    });

    checkResult = [...prevLcate.cateList, ...listMCate];

    for(let i = 0; i <= listMCateSub.length; ++i) {
      checkResult = checkResult.filter(val => val !== listMCateSub[i]);
    }

    let set = new Set(checkResult);

    let uniqueArr = [...set];

    setPrevMcate(prevState => {
      return {
        ...prevState,
        cateList: checkResult
      }
    });

    setOverData(prevState => {
      return {
        ...prevState,
        cateList: [...uniqueArr]
      }
    });
  }

  //  소카테고리 api call 함수 호출
  let scateObject = [];
  const handleScate = async() => {
    scateObject = await cateCall.callScate(sCate);
    setScateList([{ ENR_SCATE_NAME: '00카테', ENR_SCATE_CODE: '00' }, ...scateObject]);
    setScateShow(true);
  }
  
  useEffect(() => {
    if(sCate.cateList !== null) {
      handleScate();
    }
  },[sCate.cateList]);

  let listScate = [];
  let listScateSub = [];
  //  소카테고리 선택
  const handleScateSelection = (_e, selectedOpts) => {
    listScate = selectedOpts.map((selectedOpt) => selectedOpt.ENR_SCATE_CODE);
    listScateSub = selectedOpts.map((selectedOpt) => selectedOpt.ENR_SCATE_CODE.substring(0, 4));

    checkResult = [...prevMcate.cateList, ...listScate];

    for(let i = 0; i <= listScateSub.length; ++i) {
      checkResult = checkResult.filter(val => val !== listScateSub[i]);
    }

    let set = new Set(checkResult);

    let uniqueArr = [...set];

    setOverData(prevState => {
      return {
        ...prevState,
        cateList: [...uniqueArr]
      }
    });
  }

  
  // ATBBXEYCpvnqM76QkVwZbWGxQz8N2576D346
  //  쇼핑몰 List api call 함수 호출
  let shopListObject = [];
  let shopListCode = [];

  const shopCodeChange = (_e, selectedShopCodes) => {
    shopListCode = selectedShopCodes.map((selectedCode) => selectedCode.SMTD_SHOP_CODE)
    setOverData(prevState => {
      return {
        ...prevState, 
        shopcodeList: shopListCode
      }
    });
  }
  const handleChange = (e) => {
    const {name, value} = e.target;
    setOverData(prevState => {
      return {
        ...prevState,
        [name]: value,
      }
    });
  }

  //  카테고리별 group by 바꿔주는 로직
  const handleCateOption = (e) => {
    const {value} = e.target;
    setCateOption(e.target.value);
  }
  
  useEffect(() => {
    if(searchTypeCheck === true) {
      setOverData(prevState => {
        return {
          ...prevState,
          searchType: cateOption
        }
      });
    }
  },[cateOption]);

  const handleShop = async (e) => {
    if(e.target.value === 'selfShop') {
      shopListObject = await shopCall.callShop();
      setShopList(shopListObject);
      setShopListShow(false);
    } else {
      setShopListShow(true);
    }
  }

  //  검색 api 호출
  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      let result;
      result = await sendFormOverview(overData);
      setJsonList(result);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      alert('잘못된 요청입니다.');
      setLoading(false);
      // 처리
    }
  }

  const [overData, setOverData] = useState({
    userInfo: localStorage.getItem('userInfo'),
    dataType: 'getData',
    cateType: 'ALL',
    cateList: null,
    searchType: null,
    shopType: 'allShop',
    shopcodeList: null,
    type: "AMT",
    startDate: null,
    endDate: null,
    searchByShop: null
  });

  useEffect(() => {
    localStorage.setItem("startDate", overData.startDate);
  }, [overData.startDate]);

  useEffect(() => {
    localStorage.setItem("endDate", overData.endDate);
  }, [overData.endDate]);

  useEffect(() => {
    localStorage.setItem("type", overData.type);
  }, [overData.type]);

  useEffect(() => {
    (overData.dataType === 'getData' ? setDisable(true) : setDisable(false));
  },[overData.dataType]);


  // TODO: 다운로드 api 호출
  const handleDown = async() => {
    await downloadOverview();
  }

  const [searchTypeCheck, setSearchTypeCheck] = useState(false);
  const handleCheck = (e) => {
    const checkbox = document.getElementById('searchType');
    const is_checked = checkbox.checked;
    setSearchTypeCheck(is_checked);
 }

 useEffect(() => {
  if (searchTypeCheck === true) {
    setOverData(prevState => {
      return {
        ...prevState,
        searchType: cateOption
      }
    });
  } else {
    setOverData(prevState => {
      return {
        ...prevState,
        searchType: null
      }
    });
  }
 },[searchTypeCheck]);

 const [searchShop, setSearchShop] = useState(false);
 const handleShopCheck = (e) => {
  const checkbox = document.getElementById('shopType');
    const is_checked = checkbox.checked;
    setSearchShop(is_checked);
 }

 useEffect(() => {
  setOverData(prevState => {
    return {
      ...prevState,
      searchByShop: searchShop
    }
  });
 },[searchShop]);

    return (
      <>
        <Form>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>구분</td>
                <td>
                  <Form.Check type="radio" className="form-check-inline">
                    <Form.Check.Input name="dataType" value='getData' type="radio" style={Styles.formItem} checked={overData.dataType === 'getData'} isValid onChange={handleChange} />
                    <Form.Check.Label style={Styles.formLabel}>수집</Form.Check.Label>
                  </Form.Check>
                  &nbsp;&nbsp;
                  <Form.Check type="radio" className="form-check-inline">
                    <Form.Check.Input name="dataType" value='sendData' type="radio" checked={overData.dataType === 'sendData'} style={Styles.formItem} isValid onChange={handleChange} />
                    <Form.Check.Label style={Styles.formLabel}>납품</Form.Check.Label>
                  </Form.Check>
                </td>
              </tr>
              <tr>
                <td>카테고리</td>
                <td>
                  <Form.Check type="radio" className="form-check-inline">
                    <Form.Check.Input name="cateType" value="ALL" type="radio" style={Styles.formItem} checked={overData.cateType === 'ALL'} isValid onChange={(e) => {handleChange(e); handleCate(e);handleCheck(e)}} />
                    <Form.Check.Label style={Styles.formLabel}>전체</Form.Check.Label>
                  </Form.Check>
                  &nbsp;&nbsp;
                  <Form.Check type="radio" className="form-check-inline">
                    <Form.Check.Input name="cateType" value="ENR" type="radio" style={Styles.formItem} checked={overData.cateType === 'ENR'} isValid onChange={(e) => {handleChange(e); handleCate(e);handleCheck(e)}} />
                    <Form.Check.Label style={Styles.formLabel}>강화</Form.Check.Label>
                  </Form.Check>
                  &nbsp;&nbsp;
                  <Form.Check type="radio" className="form-check-inline">
                    <Form.Check.Input name="cateType" value="SEND" type="radio" style={Styles.formItem} checked={overData.cateType === 'SEND'} isValid onChange={(e) => {handleChange(e); handleCate(e);handleCheck(e)}} />
                    <Form.Check.Label style={Styles.formLabel}>닐슨전송기준</Form.Check.Label>
                  </Form.Check>
                  &nbsp;&nbsp;
                  <Form.Check type="checkbox" className="form-check-inline" name="searchType">
                    <Form.Check.Input id='searchType' type="checkbox" name='cateType' value='cate' style={Styles.formItem} isValid onClick={handleCheck} />
                  </Form.Check>
                    <Form.Select 
                      className='form-check-inline'
                      onChange={(e) => { handleChange(e); handleCateOption(e);}} 
                      name='searchType'
                      value={cateOption} 
                      id='searchType' 
                      style={Styles.selectStyle}
                      checked={overData.searchType === 'searchType'}
                      >
                      {
                      cateOptions.map(cateOption => (
                        <option key={cateOption.key} value={cateOption.key}>{cateOption.value}</option>
                      ))
                      }
                    </Form.Select >
                  &nbsp;&nbsp;
                  <Form.Check type="radio" className="form-check-inline">
                    <Form.Check.Input name="cateType" value="SELF" type="radio" style={Styles.formItem} isValid onChange={(e) => {handleChange(e); handleCate(e);}}/>
                    <Form.Check.Label style={Styles.formLabel}>직접선택</Form.Check.Label>
                  </Form.Check>
                  {
                      lCateShow === true ? 
                      (
                        <Autocomplete 
                        style={{width:"300px"}}
                        disableCloseOnSelect
                        multiple={true}
                        options={lCate}
                        onChange={handleCateSelection}
                        getOptionLabel={(option) => option.ENR_LCATE_CODE + " : " + option.ENR_LCATE_NAME}
                        isOptionEqualToValue={(option, value) => option.ENR_LCATE_CODE === value.ENR_LCATE_CODE}
                        renderInput={(params) => (
                        <TextField
                          {...params}
                          label='대카테고리'
                        />
                        )}
                        />
                      )
                      :
                      null
                    }
                    {
                    mCateShow ?
                    (
                      <Autocomplete 
                        style={{width: "300px"}}
                        disableCloseOnSelect
                        multiple={true}
                        options={mCateList}
                        getOptionLabel={(option) => option.ENR_MCATE_CODE + " : " + option.ENR_MCATE_NAME}
                        isOptionEqualToValue={(option, value) => option.ENR_MCATE_CODE === value.ENR_MCATE_CODE}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label='중카테고리'
                          />
                      )}
                      onChange={handleMCateSelection}
                    />
                    )
                    :
                    null
                  }
                  {
                  sCateShow ?
                   (
                    <Autocomplete 
                      style={{width: "300px"}}
                      disableCloseOnSelect
                      multiple={true}
                      options={sCateList}
                      getOptionLabel={(option) => option.ENR_SCATE_CODE + " : " + option.ENR_SCATE_NAME}
                      isOptionEqualToValue={(option, value) => option.ENR_SCATE_CODE === value.ENR_SCATE_CODE}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label='소카테고리'
                        />
                    )}
                    onChange={handleScateSelection}
                  />
                  )
                  :
                  null
                  }
                </td>
              </tr>
              <tr>
                <td>쇼핑몰</td>
                <td>
                  <Form.Check type="radio" className="form-check-inline">
                    <Form.Check.Input name="shopType" value="allShop" type="radio" style={Styles.formItem} checked={overData.shopType === 'allShop'} isValid onChange={(e) => {handleShop(e); handleChange(e);}}/>
                    <Form.Check.Label style={Styles.formLabel}>전체</Form.Check.Label>
                  </Form.Check>
                  &nbsp;&nbsp;
                  <Form.Check type="radio" className="form-check-inline">
                    <Form.Check.Input name="shopType" value="mainShop" type="radio" style={Styles.formItem} checked={overData.shopType === 'mainShop'} isValid onChange={(e) => {handleShop(e); handleChange(e);}}/>
                    <Form.Check.Label style={Styles.formLabel}>주요몰</Form.Check.Label>
                  </Form.Check>
                  &nbsp;&nbsp;
                  <Form.Check type="check" className="form-check-inline" name='searchType'>
                    <Form.Check.Input id='shopType' name="shopType" value="smtd" type="checkbox" style={Styles.formItem} onChange={handleShopCheck} isValid />
                    <Form.Check.Label style={Styles.formLabel}>쇼핑몰별</Form.Check.Label>
                  </Form.Check>
                  &nbsp;&nbsp;
                  <Form.Check type="radio" className="form-check-inline">
                    <Form.Check.Input name="shopType" value="selfShop" type="radio" checked={overData.shopType === 'selfShop'} isValid onChange={(e) => {handleShop(e); handleChange(e)}}/>
                    <Autocomplete 
                        multiple
                        id="checkboxes-tags-demo"
                        options={shopList}
                        disableCloseOnSelect
                        disabled={shopListShow}
                        onChange={shopCodeChange}
                        getOptionLabel={(option) => option.SMTD_SHOP_CODE + " : " + option.SMTD_SHOP_NAME}
                        isOptionEqualToValue={(option, value) => option.SMTD_SHOP_CODE === value.SMTD_SHOP_CODE}
                        renderOption={(props, option, {selected}) => (
                          <li {...props}>
                            <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{marginRight : 8 }}
                            checked={selected}
                            name='shopCodeList'
                            value={shopList}
                            />
                          {option.SMTD_SHOP_CODE + " : " + option.SMTD_SHOP_NAME}
                        </li>
                        )}
                        style={{ width: 400, marginLeft : "8%", marginTop : -20}}
                        renderInput={(params) => (
                          <TextField {...params} label="직접 선택" placeholder="쇼핑몰명" />
                        )}
                        />
                  </Form.Check>
                </td>
              </tr>
              <tr>
                <td>유형</td>
                <td>
                  <Form.Check type="radio" className="form-check-inline">
                    <Form.Check.Input name="type" value="AMT" type="radio" style={Styles.formItem} checked={overData.type === 'AMT'}  isValid onChange={handleChange}/>
                    <Form.Check.Label style={Styles.formLabel}>AMT(매출)</Form.Check.Label>
                  </Form.Check>
                  &nbsp;&nbsp;
                  <Form.Check type="radio" className="form-check-inline">
                    <Form.Check.Input name="type" value="CNT" type="radio" style={Styles.formItem} checked={overData.type === 'CNT'} isValid onChange={handleChange}/>
                    <Form.Check.Label style={Styles.formLabel}>CNT(구매건수)</Form.Check.Label>
                  </Form.Check>
                  &nbsp;&nbsp;
                  <Form.Check type="radio" className="form-check-inline">
                    <Form.Check.Input name="type" value="QNTY" type="radio" style={Styles.formItem} checked={overData.type === 'QNTY'}  isValid onChange={handleChange}/>
                    <Form.Check.Label style={Styles.formLabel}>QNTY(구매갯수)</Form.Check.Label>
                  </Form.Check>
                  &nbsp;&nbsp;
                  <Form.Check type="radio" className="form-check-inline">
                    <Form.Check.Input name="type" value="USER_CNT" type="radio" style={Styles.formItem} disabled={disable} checked={overData.type === 'USER_CNT'} isValid onChange={handleChange} />
                    <Form.Check.Label style={Styles.formLabel}>구매자수</Form.Check.Label>
                  </Form.Check>
                </td>
              </tr>
              <tr>
                <td>기간</td>
                <td>
                  <div style={Styles.dateStyle}>
                    <OverStartDate overData={overData} setOverData={setOverData} />
                  </div>
                  <div style={Styles.dateStyle}>
                    <OverEndDate overData={overData} setOverData={setOverData} />
                  </div>
                  <Form.Check type="radio" className="form-check-inline">
                    <Form.Check.Input name="prd" value="week" type="radio" style={Styles.formItem} isValid onChange={handleChange}/>
                    <Form.Check.Label style={Styles.formLabel}>주간</Form.Check.Label>
                  </Form.Check>
                  &nbsp;&nbsp;
                  <Form.Check type="radio" className="form-check-inline">
                    <Form.Check.Input name="prd" value="month" type="radio" style={Styles.formItem} isValid onChange={handleChange}/>
                    <Form.Check.Label style={Styles.formLabel}>월간</Form.Check.Label>
                  </Form.Check>
                </td>
              </tr>
          </tbody>
        </Table>
      </Form>
      <Form>
        <Row>
            <Button variant='success' style={Styles.submitButton} as={Col} md='4' onClick={handleSubmit}>
                검색
            </Button>
        </Row>
      </Form>        
      <Form>
        <Row>
          <Button variant='outline-success' style={Styles.submitButton2} as={Col} md="4" onClick={handleDown}>
            다운로드
          </Button>
        </Row>
     </Form>
     <OverviewResult overData={overData} jsonList={jsonList} />
     <div>
        {loading === true ? 
        <Loading /> : null}
    </div>
    </>
  )
}

export default React.memo(Overview);