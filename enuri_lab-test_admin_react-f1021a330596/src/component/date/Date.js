/* eslint-disable */

import DatePicker from "react-datepicker";
import moment from 'moment';
import { ko } from "date-fns/esm/locale"
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";
import {Styles} from '../../css/Styles';

export const StartDate = ({formData, setFormData}) => {
    const [firstDate, setFirstDate] = useState(new Date());
    const firstWeekDate = moment(firstDate).format('YYYYMMDD');
    const firstMonthDate = moment(firstDate).format('YYYYMMDD');

    useEffect(() => {
        setFormData(prevState => {
            return {
                ...prevState,
                startDate: (formData.prd === 'week' ? firstWeekDate : firstMonthDate)
            }
        })
    },[firstDate])

    return (
      <>
        <DatePicker 
            dateFormat="yyyy년 MM월" 
            locale={ko} 
            style={Styles.dateStyle} 
            selected={firstDate} 
            onChange={(date) => setFirstDate(date)} 
            selectsStart
            showMonthYearPicker
        />
      </>
      );
  };

  export const OverStartDate = ({overData, setOverData}) => {
    const [firstDate, setFirstDate] = useState(new Date());
    const firstOver = moment(firstDate).format('YYYYMM');

    useEffect(() => {
      setOverData(prevState => {
          return {
              ...prevState,
              startDate: firstOver
          }
      })
  }, [firstDate])

    return (
      <>
        <DatePicker 
            dateFormat="yyyy년 MM월" 
            locale={ko} 
            style={Styles.dateStyle} 
            selected={firstDate} 
            onChange={(date) => setFirstDate(date)} 
            selectsStart
            showMonthYearPicker
        />
      </>
      );
  };

export const OverEndDate = ({ overData, setOverData}) => {
    const [endDate, setEndDate] = useState(new Date());
    const lastDate = new Date(moment(endDate).format('YYYY'), moment(endDate).format('MM'), 0);
    const endOver = moment(lastDate).format('YYYYMM');
    
    useEffect(() => {
      setOverData(prevState => {
            return {
              ...prevState,
              endDate: endOver
            }
          })
    }, [endDate])
    
      return (
          <>
            <DatePicker 
                dateFormat="yyyy년 MM월" 
                locale={ko} 
                style={Styles.dateStyle} 
                selected={endDate} 
                onChange={(date) => setEndDate(date)}
                selectsEnd 
                showMonthYearPicker
                />
        </>
        );
    };


    export const EndDate = ({formData, setFormData}) => {
      const [endDate, setEndDate] = useState(new Date());
      const lastDate = new Date(moment(endDate).format('YYYY'), moment(endDate).format('MM'), 0);
      const endWeekDate = moment(lastDate).format('YYYYMMDD');
      const endMonthDate = moment(lastDate).format('YYYYMMDD');
      
      useEffect(() => {
          setFormData(prevState => {
              return {
                ...prevState,
                endDate: (formData.prd === 'week' ? endWeekDate : endMonthDate)
              }
            })
      }, [endDate])
        return (
            <>
              <DatePicker 
                  dateFormat="yyyy년 MM월" 
                  locale={ko} 
                  style={Styles.dateStyle} 
                  selected={endDate} 
                  onChange={(date) => setEndDate(date)}
                  selectsEnd 
                  showMonthYearPicker
                  />
          </>
          );
      };