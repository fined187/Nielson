/* eslint-disable */

export const Brand = ({keywords, setKeywords}) => {

    //  행 추가 이벤트
    const addTableRows = () => {
        const newRow = {
            brand: '',
            maker: ''
        }
        setKeywords(prevState => {
            return {
                ...prevState,
                Brands: [
                    ...prevState.Brands,
                    newRow
                ]
            }
        })
    }

     //  행 삭제 이벤트
     const handleDeleteRow = (e) => {
        const { id } = e.target;
        const rowIdx = parseInt(id);
        const filteredKeywords = keywords.Brands.filter((_, idx) => idx !== rowIdx);

        setKeywords(prevState => {
            return {
                ...prevState,
                Brands: filteredKeywords
            }
        })
    }

    //  행 입력 이벤트
    const handleChange = (e) => {
        const {id, name, value} = e.target;
        const rowIdx = parseInt(id);

        const updatedKeywords = keywords.Brands.map((brand, idx) => {
            if (idx === rowIdx) {
                return {
                    ...brand,
                    [name] : value,
                }
            }
            return brand;
        });
        setKeywords(prevState => {
            return {
                ...prevState,
                Brands: updatedKeywords
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
                                    <th>브랜드</th>
                                    <th>제조사</th>
                                    <th><button type='button' className='btn btn-outline-success' onClick={addTableRows} >+</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    keywords.Brands.map((Brands, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <td>
                                                    <input id={idx} name='brand' type='text' value={Brands.brand} onChange={handleChange} className='form-control' />
                                                </td>
                                                <td>
                                                    <input id={idx} name='maker' type='text' value={Brands.maker} onChange={handleChange} className='form-control' />
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
