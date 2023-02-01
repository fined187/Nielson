/* eslint-disable */
import '../../App.css';
import React, { useEffect, useState, Suspense, lazy } from "react";
import {sendFormPrice, sendFormMathcing} from "../../api/sendForm";
import * as cateCall from "../../api/cateCall";
import * as shopCall from "../../api/shopCall";
import { Table, Form, Row, Button, Col } from 'react-bootstrap';
import '../../style.css';
import '../../Styles';
import { Autocomplete, Checkbox, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import "react-datepicker/dist/react-datepicker.css";
import { majorMallList_ori } from "../../constants";
import {Styles, RequiredText, Space} from '../../css/Styles';
import Loading from '../Loading';
import { StartDate, EndDate } from '../date/Date';
import { downloadBulk, downloadMatching, downloadPriceGet, downloadPriceSend, downloadRocket, downloadSendCheck } from '../../utils/Download';

const Modal = lazy(() => import('../modal/Modal'));
const DataSearchResult = lazy(() => import('../result/DataSearchResult'));

export const DataSearch = (props) => {

  //  조회 결과 담기
  const [jsonList, setJsonList] = useState(null);

  //  카테고리 관련
  const [lCateShow, setLcateShow] = useState(false);
  const [mCateShow, setMcateShow] = useState(false);
  const [sCateShow, setScateShow] = useState(false);

  const [lCate, setLcate] = useState(null);
  const [mCate, setMcate] = useState({
    cateList: null
  });

  const [mCateList, setMcateList] = useState(null);
  const [sCate, setScate] = useState({
    cateList: null
  });

  const [sCateList, setScateList] = useState(null);
  
  const [cateOption, setCateOption] = useState('LCATE');

  //  삭제 이벤트 전 초기 대, 중 카테고리를 담아놓은 상태
  const [prevLcate, setPrevLcate] = useState({
    cateList: null
  });
  const [prevMcate, setPrevMcate] = useState({
    cateList: null
  });

  const [qcCate, setQCcate] = useState(null);
  const [qcCateShow, setQCCateShow] = useState(false);

  //  카테고리 박스 아이콘 변수 선언
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  //  키워드 값 받기
  const [keywords, setKeywords] = useState({
    keywords: [
      {
        in: "",
        out: "",
      }
    ],
    
    Brands: [
      {
        brand: "",
        maker: "",
      }
    ],
  });

  let keywordIn = [];
  let keywordNot = [];
  keywordIn =  keywords.keywords.map(keyword => keyword.in);
  keywordNot = keywords.keywords.map(keyword => keyword.out);

  let brand = [];
  //let maker = [''];
  brand = keywords.Brands.map(brand => brand.brand);
  //maker = keywords.Brands.map(brand => brand.maker);

  useEffect(() => {
    setFormData(prevState => {
      return {
        ...prevState,
        keyword_in: keywordIn,
        keyword_not: keywordNot,
        brandList: brand
      }
    });
  }, [keywords]);
  
  // 카테고리란의 대카/중카/소카/미카/닐슨카테별 조회 선택 이벤트 로직
  const handleCateOption = (e) => {
    const { value } = e.target;
    setCateOption(e.target.value);
  }

  //  대카테고리 api call 함수 호출
  let lcateObject = [];
  let qcCateObject = [];
  const handleCate = async (e) => {
    if (e.target.value === 'selfCate') {
      lcateObject = await cateCall.callCate();
      setLcate([{ ENR_LCATE_NAME: '00카테', ENR_LCATE_CODE: '00' }, ...lcateObject]);
      setLcateShow(true);
      setQCCateShow(false);
    } else if (e.target.value === 'sendCate') {
      qcCateObject = await cateCall.callQCcate();
      setQCcate([{ENR_CATE_SBST: '전체카테', NS_CATE_NO: '999'}, ...qcCateObject]);
      setLcateShow(false);
      setQCCateShow(true);
    } else {
      setFormData(prevState => {
        return {
          ...prevState,
          cateList: null
        }
      });
      setLcateShow(false);
      setQCCateShow(false);
      setMcate({
        cateList: null
      });
      setMcateShow(false);
      setQCCateShow(false);
      setScate({
        cateList: null
      });
      setScateShow(false);
      setQCCateShow(false);
    }
  }
   
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
      setFormData(prevState => {
        return {
          ...prevState,
          cateList: listLCate
        }
      });
      }
    }
    
  let listQcCate = [];
  const handleQcSelection = (_e, selectedOpts) => {
    listQcCate = selectedOpts.map((selectedOpt) => selectedOpt.NS_CATE_NO);
    setFormData(prevState => {
      return {
        ...prevState,
        cateList: listQcCate
      }
    });
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

    setFormData(prevState => {
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

  useEffect(() => {
   if(sCate.cateList !== null) {
     handleScate();
   }
  }, [sCate.cateList]);

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

    setFormData(prevState => {
      return {
        ...prevState,
        cateList: [...uniqueArr]
      }
    });
  }
  
  //  쇼핑몰란 주요몰 마우스 오버 이벤트
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  }
  const handleMouseOut = () => {
    setIsHovering(false);
  }
 // majormall 마우스오버 로직
  let majorMallList = [];
  majorMallList = majorMallList_ori.map((i) => {
    return(
      i.value
    )})

  //  쇼핑몰 List api call 함수 호출
  const [shopList, setShopList] = useState([]);
  const [shopListShow, setShopListShow] = useState(true);

  let shopListObject = [];
  let shopListCode = [];

  const shopCodeChange = (_e, selectedShopCodes) => {
    shopListCode = selectedShopCodes.map((selectedCode) => selectedCode.SMTD_SHOP_CODE)
    setFormData(prevState => {
      return {
        ...prevState, 
        shopcodeList: shopListCode
      }
    });
  }

  //  Modal창 오픈 
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    if(formData.type === 'priceCheck') {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  };

  // Modal창 close
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prevState => {
      return {
        ...prevState,
        [name]: value,
      }
    });
  }

  // model_no
  let modelArrNo = [];
  const [modelNoArr, setModelNoArr] = useState(null);
  
  const handleModelNo = (e) => {
    if(e.target.value === null) {
      setModelNoArr(null);
    } else {
      setModelNoArr(e.target.value.split(","));
    }
  }

  let ModelIntArr = [];
  (modelNoArr === null ? null : ModelIntArr = modelNoArr.map((item) => {
      return parseInt(item);
    }));


  //  goods_code
  let goodsArrNo = [];
  const [goodsCode, setGoodsCode] = useState(null);

  const handleGoodsNo = (e) => {
    if(e.target.value === null) {
      setGoodsCode(null);
    } else {
      setGoodsCode(e.target.value.split(","));
    }
  }

  let GoodsIntArr = [];
  (goodsCode === null ? null : GoodsIntArr = goodsCode.map((item) => {
    return parseInt(item);
  }))
  
  //  Loading 불러오기
  const [loading, setLoading] = useState(false);

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
    setLoading(true)
    try {
      e.preventDefault();
      let result;
      if (formData.type === "priceCheck") {
        result = await sendFormPrice(formData);
      } else {
        result = await sendFormMathcing(formData);
      }
      setJsonList(result);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      alert('잘못된 요청입니다.');
      setLoading(false);
      // 처리
    }
  }
  
  const [formData, setFormData] = useState({
      userInfo: localStorage.getItem('userInfo'),
      type: 'priceCheck',
      dataType: 'getData',
      cateType: 'allCate',
      cateList: null,
      searchType: null,
      shopType: 'allShop',
      shopcodeList: null,
      startDate: null,
      endDate: null,
      keyword_in: keywordIn,
      keyword_not: keywordNot,
      modelList: null,
      brandList: brand,
      keywordList: [
        {"maker":"한국존슨","brand":"에프킬라"},
        {"maker":"한국존슨","brand":"오프"},
        {"maker":"헨켈","brand":"홈키파"}
      ],
      prd: null,
      goodsCodeList: null
    });
  
    useEffect(() => {
      setFormData(prevState => {
        return {
          ...prevState,
          modelList: ModelIntArr
        }
      })
    }, [modelNoArr]);


    useEffect(() => {
      setFormData(prevState => {
        return {
          ...prevState,
          goodsCodeList: GoodsIntArr
        }
      })
    }, [goodsCode]);

    
    // 다운로드 api 호출
    const handleDown = async() => {
      if (formData.type === 'matching') {
        await downloadMatching();
      } else if (formData.type === 'priceCheck' && formData.dataType === 'getData') {
        await downloadPriceGet();
      } else if (formData.type === 'sendCheck') {
        await downloadSendCheck();
      } else if (formData.type === 'rocket') {
        await downloadRocket();
      } else if (formData.type === 'bulk') {
        await downloadBulk();
      } else {
        await downloadPriceSend();
      }
    }
    
  const inKeywords = "포함: " + keywords.keywords.map(keyword => keyword.in).join(",");
  const outKeywords = " 제외: " + keywords.keywords.map(keyword => keyword.out).join(",");
  const inBrands = " 브랜드: " + keywords.Brands.map(brand => brand.brand).join(","); 
  

  //  type에 따라 비활성화
  const [cateDis, setCateDis] = useState(false);
  const [keyDis, setKeyDis] = useState(false);
  const [modelNoDis, setModelNoDis] = useState(false);
  const [codeDis, setCodeDis] = useState(true);
  const [gubun, setGubun] = useState(false);

  const disableControl = () => {
    if (formData.type === 'priceCheck') {
      setCateDis(true);
      setKeyDis(true);
      setModelNoDis(false);
      setCodeDis(true);
      setGubun(false);
    } else if (formData.type === 'matching') {
      setCateDis(false);
      setKeyDis(false);
      setModelNoDis(true);
      setCodeDis(true);
      setGubun(true);
    } else if (formData.type === 'rocket') {
      setCateDis(false);
      setKeyDis(false);
      setModelNoDis(false);
      setCodeDis(true);
      setGubun(false);
    } else if (formData.type === 'bulk') {
      setCateDis(false);
      setKeyDis(false);
      setModelNoDis(false);
      setCodeDis(true);
      setGubun(false);
    } else if (formData.type === 'sendCheck') {
      setCateDis(true);
      setKeyDis(false);
      setModelNoDis(false);
      setCodeDis(false);
      setGubun(false);
    } else {
      setCateDis(false);
      setKeyDis(false);
      setModelNoDis(false);
      setCodeDis(false);
      setGubun(false);
    }
  }
  
  useEffect(() => {
    disableControl();
    if(formData.type === 'matching') {
      setFormData(prevState => {
        return {
          ...prevState,
          dataType: null,
          cateType: 'allCate'
        }
      })
    } else if (formData.type === 'priceCheck' || formData.type === 'sendCheck') {
      setFormData(prevState => {
        return {
          ...prevState,
          dataType: 'getData',
          cateType: null
        }
      })
    } else {
      setFormData(prevState => {
        return {
          ...prevState,
          dataType: 'getData',
          cateType: 'allCate'
        }
      })
    }
  },[formData.type]);

  return (
    <>
      <Form>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>문의 유형</td>
              <td>
                <Form.Check type="radio" className='form-check-inline'>
                  <Form.Check.Input id='priceCheck' name='type' value="priceCheck" type='radio' style={Styles.formItem} checked={formData.type === 'priceCheck'} isValid onChange={(e) => {handleChange(e); disableControl();}}/>
                  <Form.Check.Label style={Styles.formLabel}>가격</Form.Check.Label>
                </Form.Check>
                &nbsp;&nbsp;
                <Form.Check type="radio" className="form-check-inline">
                  <Form.Check.Input id='matching' name="type" value="matching" type="radio" style={Styles.formItem} isValid checked={formData.type === 'matching'} onChange={(e) => {handleChange(e); disableControl();}}/>
                  <Form.Check.Label style={Styles.formLabel}>매칭/미매칭</Form.Check.Label>
                </Form.Check>
                &nbsp;&nbsp;
                <Form.Check type="radio" className="form-check-inline">
                  <Form.Check.Input id='rocket' name="type" value="rocket" type="radio" style={Styles.formItem} isValid checked={formData.type === 'rocket'} onChange={(e) => {handleChange(e); disableControl();}}/>
                  <Form.Check.Label style={Styles.formLabel}>로켓/비로켓</Form.Check.Label>
                </Form.Check>
                &nbsp;&nbsp;
                <Form.Check type="radio" className="form-check-inline">
                  <Form.Check.Input id='sendCheck' name="type" value="sendCheck" type="radio" style={Styles.formItem}  isValid checked={formData.type === 'sendCheck'} onChange={(e) => {handleChange(e); disableControl();}}/>
                  <Form.Check.Label style={Styles.formLabel}>입수여부</Form.Check.Label>
                </Form.Check>
                &nbsp;&nbsp;
                <Form.Check type="radio" className="form-check-inline">
                  <Form.Check.Input id='bulk' name="type" value="bulk" type="radio" style={Styles.formItem}  isValid checked={formData.type === 'bulk'} onChange={(e) => {handleChange(e); disableControl();}}/>
                  <Form.Check.Label style={Styles.formLabel}>대량구매</Form.Check.Label>
                </Form.Check>
              </td>
            </tr>
            <tr>
            <td>구분</td>
            <td>
              <Form.Check type="radio" className="form-check-inline">
                <Form.Check.Input name="dataType" disabled={gubun} value="getData" id="dataType" type="radio" style={Styles.formItem} checked={formData.dataType === "getData"} isValid onChange={handleChange}/>
                <Form.Check.Label style={Styles.formLabel}>수집</Form.Check.Label>
              </Form.Check>
              &nbsp;&nbsp;
              <Form.Check type="radio" className="form-check-inline">
                <Form.Check.Input name="dataType" disabled={gubun} type="radio" value="sendData" id="dataType" checked={formData.dataType === "sendData"} style={Styles.formItem} isValid onChange={handleChange}/>
                <Form.Check.Label style={Styles.formLabel}>납품</Form.Check.Label>
              </Form.Check>
            </td>
            </tr>
            <tr>
              <td>카테고리</td>
              <td>
                <Form.Check type="radio" className="form-check-inline" name="cate-type">
                  <Form.Check.Input name="cateType" disabled={cateDis} type="radio" value='allCate' id='cateType' checked={formData.cateType === "allCate"} style={Styles.formItem} isValid onChange={(e) => {handleChange(e); handleCate(e);}}/>
                  <Form.Check.Label style={Styles.formLabel}>전체</Form.Check.Label>
                </Form.Check>
                &nbsp;&nbsp;
                <Form.Check type="radio" className="form-check-inline" name="cateType">
                  <Form.Check.Input name="cateType" disabled={cateDis} type="radio" value='enrCate' id='cateType' checked={formData.cateType === 'enrCate'} style={Styles.formItem} isValid onChange={(e) => {handleChange(e); handleCate(e);}} />
                  <Form.Check.Label style={Styles.formLabel}>강화</Form.Check.Label>
                </Form.Check>
                &nbsp;&nbsp;
                <Form.Check type="radio" className="form-check-inline" name="cateType">
                  <Form.Check.Input name="cateType" disabled={cateDis} type="radio" value='sendCate' id='cateType' checked={formData.cateType === 'sendCate'} style={Styles.formItem} isValid onChange={(e) => {handleChange(e); handleCate(e);}}/>
                  <Form.Check.Label style={Styles.formLabel}>닐슨전송기준</Form.Check.Label>
                </Form.Check>
                &nbsp;&nbsp;
                <Form.Check type="radio" className="form-check-inline" name="cate-type">
                  <Form.Check.Input name="cateType" disabled={cateDis} type="radio" value='selfCate' id='cateType' checked={formData.cateType === "selfCate"} style={Styles.formItem} isValid onChange={(e) => {handleChange(e); handleCate(e);}}/>
                  <Form.Check.Label style={{width: "100px", color: "black"}}>직접 선택</Form.Check.Label>
                </Form.Check>
                {
                  lCateShow ? 
                    (
                      <Autocomplete 
                        style={{width:"300px", left:"100px"}}
                        disableCloseOnSelect
                        multiple={true}
                        options={lCate}
                        getOptionLabel={(option) => option.ENR_LCATE_CODE + " : " + option.ENR_LCATE_NAME}
                        isOptionEqualToValue={(option, value) => option.ENR_LCATE_CODE === value.ENR_LCATE_CODE}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label='대카테고리'
                          />
                        )}
                        onChange={handleCateSelection}
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
                {
                  qcCateShow ?
                  (
                  <Autocomplete 
                    style={{width: "300px"}}
                    disableCloseOnSelect
                    multiple={true}
                    options={qcCate}
                    getOptionLabel={(option) => option.NS_CATE_NO + " : " + option.ENR_CATE_SBST}
                    isOptionEqualToValue={(option, value) => option.NS_CATE_NO === value.NS_CATE_NO}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='닐슨전송카테고리'
                      />
                    )}
                    onChange={handleQcSelection}
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
                  <Form.Check.Input name="shopType" type="radio" value='allShop' id='allShop' checked={formData.shopType === 'allShop'} style={Styles.formItem} isValid onChange={(e) => {handleShop(e); handleChange(e)}} />
                  <Form.Check.Label style={Styles.formLabel}>전체</Form.Check.Label>
                </Form.Check>
                &nbsp;&nbsp;
                <Form.Check type="radio" className="form-check-inline"  data-hover={majorMallList}>
                  <span className='hovertext' data-hover={majorMallList}>
                    <Form.Check.Input name="shopType" type="radio" value='mainShop' id='mainShop' checked={formData.shopType === 'mainShop'} isValid onChange={(e) => {handleShop(e); handleChange(e)}} />
                    <Form.Check.Label style={Styles.formLabel} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>주요몰</Form.Check.Label>
                  </span>
                </Form.Check>
                &nbsp;&nbsp;
                <Form.Check type="radio" id='shopType' className="form-check-inline">
                  <Form.Check.Input name="shopType" type="radio" value='selfShop' id='selfShop' style={Styles.formItem} checked={formData.shopType === 'selfShop'} isValid onChange={(e) => {handleShop(e); handleChange(e)}}/>
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
                    style={{ width: 400, marginLeft : 26, marginTop : -20}}
                    renderInput={(params) => (
                      <TextField {...params} label="직접 선택" placeholder="쇼핑몰명" />
                    )}
                    />
                </Form.Check>
              </td>
            </tr>
            <tr>
              <td>기간</td>
              <td>
                <div style={Styles.dateStyle}>
                  <StartDate formData={formData} setFormData={setFormData} />
                </div>
                <div style={Styles.dateStyle}>
                  <EndDate formData={formData} setFormData={setFormData} />
                </div>
              </td>
            </tr>
            <tr>
              <td>키워드</td>
              <td>
                <Form.Check style={Styles.inputForm_sc}>
                  <React.Fragment>
                    <Form.Control type='text' value={inKeywords+outKeywords+inBrands} onClick={openModal} style={{ width: 500 }} readOnly/>
                  </React.Fragment>
                </Form.Check>
                {
                  Space({px: 10})}{(formData.type === 'matching' || formData.type === 'rocket') ?  
                  <small style={RequiredText.smallText}>필수입력값 입니다.</small> 
                  : 
                  (formData.type === 'sendCheck') ?
                    <small style={RequiredText.smallText}>키워드, 모델번호, 상품코드 중 최소 한 가지는 필수입력값 입니다.</small>
                    :
                    null 
                }
              </td>
            </tr>
            <tr>
              <td>모델번호</td>
              <td>
                <Form.Check style={Styles.inputForm_sc} >
                  <Form.Control type="text" onChange={(e) => {handleModelNo(e)}} style={{width: 500}} placeholder="모델번호를 입력하세요" disabled={modelNoDis} />
                </Form.Check>
                {
                  Space({px: 10})}{(formData.type === 'priceCheck' || formData.type === 'bulk') ? 
                    <small style={RequiredText.smallText}>필수입력값 입니다.</small> 
                    : 
                    (formData.type === 'sendCheck') ?
                    <small style={RequiredText.smallText}>키워드, 모델번호, 상품코드 중 최소 한 가지는 필수입력값 입니다.</small>
                    :
                    null 
                }
              </td>
            </tr>
            <tr>
              <td>상품코드</td>
              <td>
                <Form.Check style={Styles.inputForm_sc} >
                  <Form.Control type="text" onChange={(e) => {handleGoodsNo(e)}} style={{width: 500}} placeholder="상품코드를 입력하세요" disabled={codeDis} />
                </Form.Check>
                {
                  Space({px: 10})}{(formData.type === 'sendCheck') ? 
                  <small style={RequiredText.smallText}>키워드, 모델번호, 상품코드 중 최소 한 가지는 필수입력값 입니다.</small>
                  :
                  null
                }
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
     <Suspense fallback={<div><Loading /></div>}>
      <Modal open={modalOpen} close={closeModal} header='키워드 입력' keywords={keywords} setKeywords={setKeywords} />
      <DataSearchResult jsonList={jsonList} setJsonList={setJsonList} loading={loading} setLoading={setLoading} formData={formData} setFormData={setFormData} />
     </Suspense>
      <div>
        {loading === true ? 
        <Loading /> : null}
      </div>
    </> 
  );
}

export default React.memo(DataSearch);