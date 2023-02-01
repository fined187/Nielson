/* eslint-disable */
import { useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import { Brand, BrandRow } from './Brand';
import { Keyword, KeywordRow } from './Keyword';

 const Modal = ({ open, close, header, keywords, setKeywords }) => {

    return (
        <div className={open ? 'openModal modal' : 'modal'}>
            {
                open ? (
                    <section>
                        <header>
                            {header}
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                        </header>
                        <main>
                        <Form>
                                <Brand keywords={keywords} setKeywords={setKeywords} />
                                <Keyword keywords={keywords} setKeywords={setKeywords} />
                        </Form>
                        </main>
                        <footer>
                            <button className="btn btn-success btn-lg" onClick={close} style={{marginLeft: '85%'}}> 적용 </button>
                        </footer>
                    </section>
                ) : null
            }
        </div>
    )
}

export default Modal;
