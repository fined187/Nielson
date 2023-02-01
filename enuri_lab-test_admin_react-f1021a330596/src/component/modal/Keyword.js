/* eslint-disable */

export const Keyword = ({keywords, setKeywords}) => {

    //  행 추가 이벤트
    const handleNewRow = () => {
        const newRow = {
            in: '',
            out: ''
        }
        setKeywords(prevState => {
            return {
                ...prevState,
                keywords: [
                    ...prevState.keywords,
                    newRow
                ]
            }
        })
    }

    //  행 삭제 이벤트
    const handleDeleteRow = (e) => {
        const { id } = e.target;
        const rowIdx = parseInt(id);
        const filteredKeywords = keywords.keywords.filter((_, idx) => idx !== rowIdx);

        setKeywords(prevState => {
            return {
                ...prevState,
                keywords: filteredKeywords
            }
        })
    }

        const handleInputChange = (e) => {
        const { id, name, value } = e.target;
        const rowIdx = parseInt(id);
        
        const updatedKeywords = keywords.keywords.map((keyword, idx) => {
            if (idx === rowIdx) {
                return {
                    ...keyword,
                    [name]: value,
                }
            }
            return keyword;
        });

        setKeywords(prevState => {
            return {
                ...prevState,
                keywords: updatedKeywords
            }
        })

    }
    return (
        <>
            <div className='container'>
                <div className='row'>
                <div className='col-sm-8'>
                    <table className='table'>
                        <thead>
                            <tr>
                            <th>키워드</th>
                            <th>제외</th>
                            <th><button type='button' className='btn btn-outline-success' onClick={handleNewRow} >+</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                keywords.keywords.map((keyword, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td>
                                                <input id={idx} name="in" type='text' value={keyword.in} onChange={handleInputChange}  className="form-control" />
                                            </td>
                                            <td>
                                                <input type='text' id={idx} name="out"  value={keyword.out} onChange={handleInputChange} className="form-control" />
                                            </td>
                                            <td>
                                                <button type='button' id={idx} className='btn btn-outline-success' onClick={handleDeleteRow} >-</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className='col-sm-4'></div>
                </div>
            </div>
          </>
      )
}


