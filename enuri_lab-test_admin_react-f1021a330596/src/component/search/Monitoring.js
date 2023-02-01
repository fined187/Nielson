/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Form, Table, Button } from "react-bootstrap";
import {Styles, Span} from '../../css/Styles';
import { Autocomplete, Checkbox, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import * as cateCall from "../../api/cateCall";
import * as shopCall from "../../api/shopCall";
import { majorMallList_ori } from "../../constants";
import Loading from '../Loading';
import { StartDate, EndDate } from '../date/Date';

export const Monitoring = () => {

	//	조회 결과
	const [jsonList, setJsonList] = useState(null);

	/* 카테고리 관련 */
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

	//  카테고리 박스 아이콘 변수 선언
	const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
	const checkedIcon = <CheckBoxIcon fontSize="small" />;

	//	대카테고리 api call 함수 호출
	let lcateObject = [];
	const handleCate = async(e) => {
		if(e.target.value === 'selfCate') {
			lcateObject = await cateCall.callCate();
			setLcate([{ ENR_LCATE_NAME: '00카테', ENR_LCATE_CODE: '00' }, ...lcateObject]);
			setLcateShow(true);
		} else {
			setFormData(prevState => {
				return {
					...prevState,
					cateList:null
				}
			});
			setLcateShow(false);
			setMcate({
				cateList: null
			});
			setMcateShow(false);
      setScate({
        cateList: null
      });
      setScateShow(false);
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
			});
		} else {
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

	//	중카테고리 api call 함수 호출
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

	//	소카테고리 api call 함수 호출
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

  //  소카테고리 선택  
	let listScate = [];
  let listScateSub = [];
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

	const handleShop = async (e) => {
    if(e.target.value === 'selfShop') {
      shopListObject = await shopCall.callShop();
      setShopList(shopListObject);
      setShopListShow(false);
    } else {
      setShopListShow(true);
    }
  }

	const [formData, setFormData] = useState({
		searchType: 'search',
		monitorType: 'miss',
		cateType: 'allCate',
		cateList: null,
		shopType: 'allShop',
		shopList: null,
		startDate: null,
		endDate: null,
		userInfo: localStorage.getItem('userInfo')
	});

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData(prevState => {
			return {
				...prevState,
				[name]: value
			}
		});
	}

	return (
		<>
			<Form>
				<Table striped bordered hover>
					<tbody>
						<tr>
							<td colSpan="2" style={Styles.tdText}>데이터 조회 조건</td>
							<td>
								<Form.Check type="radio" className='form-check-inline'>
									<Form.Check.Input id="search" name="searchType" value="search" type="radio" style={Styles.formItem} isValid checked={formData.searchType === 'search'} onChange={handleChange}/>
									<Form.Check.Label style={Styles.formLabel}>검수할 데이터</Form.Check.Label>
								</Form.Check>
								&nbsp;&nbsp;
								<Form.Check type="radio" className='form-check-inline'>
									<Form.Check.Input id="result" name="searchType" value="result" type="radio" style={Styles.formItem} isValid checked={formData.searchType === 'result'} onChange={handleChange}/>
									<Form.Check.Label style={Styles.formLabel}>검수 처리결과</Form.Check.Label>
								</Form.Check>
							</td>
						</tr>
						<tr>
							<td rowSpan="3" style={Styles.tdText2}>모니터링 유형</td>
						</tr>
						<tr>
							<td>수동 검수</td>
							<td>
								<Form.Check type="radio" className='form-check-inline'>
									<Form.Check.Input id="miss" name="monitorType" value="miss" type="radio" style={Styles.formItem} isValid checked={formData.monitorType === 'miss'} onChange={handleChange}/>
									<Form.Check.Label style={Styles.formLabel}>오매칭</Form.Check.Label>
								</Form.Check>
								&nbsp;&nbsp;
								<Form.Check type="radio" className='form-check-inline'>
									<Form.Check.Input id="code" name="monitorType" value="code" type="radio" style={Styles.formItem} isValid checked={formData.monitorType === 'code'} onChange={handleChange}/>
									<Form.Check.Label style={Styles.formLabel}>코드 재사용</Form.Check.Label>
								</Form.Check>
								&nbsp;&nbsp;
								<Form.Check type="radio" className='form-check-inline'>
									<Form.Check.Input id="highPrice" name="monitorType" value="highPrice" type="radio" style={Styles.formItem} isValid checked={formData.monitorType === 'highPrice'} onChange={handleChange}/>
									<Form.Check.Label style={Styles.formLabel}>보정가 높음</Form.Check.Label>
								</Form.Check>
								&nbsp;&nbsp;
								<Form.Check type="radio" className='form-check-inline'>
									<Form.Check.Input id="cosmetic" name="monitorType" value="cosmetic" type="radio" style={Styles.formItem} isValid checked={formData.monitorType === 'cosmetic'} onChange={handleChange}/>
									<Form.Check.Label style={Styles.formLabel}>화장품 보정</Form.Check.Label>
								</Form.Check>
								&nbsp;&nbsp;
								<Form.Check type="radio" className='form-check-inline'>
									<Form.Check.Input id="experience" name="monitorType" value="experience" type="radio" style={Styles.formItem} isValid checked={formData.monitorType === 'experience'} onChange={handleChange}/>
									<Form.Check.Label style={Styles.formLabel}>체험단</Form.Check.Label>
								</Form.Check>
								&nbsp;&nbsp;
								<Form.Check type="radio" className='form-check-inline'>
									<Form.Check.Input id="none" name="monitorType" value="none" type="radio" style={Styles.formItem} isValid checked={formData.monitorType === 'none'} onChange={handleChange}/>
									<Form.Check.Label style={Styles.formLabel}>유사불명</Form.Check.Label>
								</Form.Check>
								&nbsp;&nbsp;
								<Form.Check type="radio" className='form-check-inline'>
									<Form.Check.Input id="lowprice" name="monitorType" value="lowprice" type="radio" style={Styles.formItem} isValid checked={formData.monitorType === 'lowprice'} onChange={handleChange}/>
									<Form.Check.Label style={Styles.formLabel}>6개월 최저가</Form.Check.Label>
								</Form.Check>
								&nbsp;&nbsp;
								<Form.Check type="radio" className='form-check-inline'>
									<Form.Check.Input id="option" name="monitorType" value="option" type="radio" style={Styles.formItem} isValid checked={formData.monitorType === 'option'} onChange={handleChange}/>
									<Form.Check.Label style={Styles.formLabel}>옵션 단종</Form.Check.Label>
								</Form.Check>
							</td>
						</tr>
						<tr>
							<td>자동 검수</td>
							<td>
								<Form.Check type="radio" className='form-check-inline'>
									<Form.Check.Input id="bulk" name="monitorType" value="bulk" type="radio" style={Styles.formItem} isValid checked={formData.monitorType === 'bulk'} onChange={handleChange}/>
									<Form.Check.Label style={Styles.formLabel}>대량구매 전체</Form.Check.Label>
								</Form.Check>
								&nbsp;&nbsp;
								<Form.Check type="radio" className='form-check-inline'>
									<Form.Check.Input id="bulkNaver" name="monitorType" value="bulkNaver" type="radio" style={Styles.formItem} isValid checked={formData.monitorType === 'bulkNaver'} onChange={handleChange}/>
									<Form.Check.Label style={Styles.formLabel}>대량구매 네이버</Form.Check.Label>
								</Form.Check>
								&nbsp;&nbsp;
								<Form.Check type="radio" className='form-check-inline'>
									<Form.Check.Input id="hundred" name="monitorType" value="hundred" type="radio" style={Styles.formItem} isValid checked={formData.monitorType === 'hundred'} onChange={handleChange}/>
									<Form.Check.Label style={Styles.formLabel}>100원딜</Form.Check.Label>
								</Form.Check>
							</td>
						</tr>
						<tr>
							<td colSpan="2" style={Styles.tdText}>카테고리</td>
							<td>
                <Form.Check type="radio" className="form-check-inline" name="cate-type">
                  <Form.Check.Input name="cateType" type="radio" value='allCate' id='cateType' checked={formData.cateType === "allCate"} style={Styles.formItem} isValid onChange={(e) => {handleChange(e); handleCate(e);}}/>
                  <Form.Check.Label style={Styles.formLabel}>전체</Form.Check.Label>
                </Form.Check>
                &nbsp;&nbsp;
                <Form.Check type="radio" className="form-check-inline" name="cateType">
                  <Form.Check.Input name="cateType" type="radio" value='enrCate' id='cateType' checked={formData.cateType === 'enrCate'} style={Styles.formItem} isValid onChange={(e) => {handleChange(e); handleCate(e);}} />
                  <Form.Check.Label style={Styles.formLabel}>강화</Form.Check.Label>
                </Form.Check>
                &nbsp;&nbsp;
                <Form.Check type="radio" className="form-check-inline" name="cateType">
                  <Form.Check.Input name="cateType" type="radio" value='sendCate' id='cateType' checked={formData.cateType === 'sendCate'} style={Styles.formItem} isValid onChange={(e) => {handleChange(e); handleCate(e);}}/>
                  <Form.Check.Label style={Styles.formLabel}>닐슨전송기준</Form.Check.Label>
                </Form.Check>
                &nbsp;&nbsp;
                <Form.Check type="radio" className="form-check-inline" name="cate-type">
                  <Form.Check.Input name="cateType" type="radio" value='selfCate' id='cateType' checked={formData.cateType === "selfCate"} style={Styles.formItem} isValid onChange={(e) => {handleChange(e); handleCate(e);}}/>
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
							</td>
						</tr>
						<tr>
							<td colSpan="2" style={Styles.tdText2}>쇼핑몰</td>
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
							<td colSpan="2" style={Styles.tdText}>기간</td>
							<td>
							<div style={Styles.dateStyle}>
                  <StartDate formData={formData} setFormData={setFormData} />
                </div>
                <div style={Styles.dateStyle}>
                  <EndDate formData={formData} setFormData={setFormData} />
                </div>
							</td>
						</tr>
					</tbody>
				</Table>
			</Form>
			<Form>
				<Button variant='success' style={Styles.monitorSubmit}>검색</Button>
			</Form>
			<Form style={{marginTop: '1%'}}>
				&nbsp;
				<Button variant='outline-success' style={Styles.downBtn}>다운로드</Button><Span />
				<Form.Check.Input type="file" id="fileUpload" style={Styles.fileUpload}/> 
				&nbsp;
				<Button variant='outline-success'style={Styles.proccessBtn}>처리결과 등록</Button>
				&nbsp;
			</Form>
		</>
	)
}

export default React.memo(Monitoring);