import React, { Component } from 'react';
import styles from '../../styles/main.module.css';
import Navbarx from '../nav';
import Link from 'next/link';
import { Modal } from 'react-bootstrap-v5';


export default class BI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            listmenu: [],
            popupinput: false,
        }
    }
    componentDidMount() {
        this.setState({
            listmenu: [
                {
                    id: '1',
                    title: 'TIME SHEET REPORT',
                    linkx: '#',
                    iconx: ''
                },
            ]
        })
    }
    showpopupinput = (e) => {
        this.setState({popupinput: e})
    }

    render() {
        return (
            <>
                {/* <Navbarx /> */}
                {/* <hr style={{ height: 5, backgroundColor: '#8c1e21' }} /> */}
                <div className={styles.row} style={{}}>

                    <Modal
                        show={this.state.popupinput}
                        backdrop="static"
                        keyboard={false}
                        StrictMode={true}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header>
                            <Modal.Title>เพิ่มข้อมูลพนักงาน</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className={styles.row}>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <label>รหัสพนักงาน</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12" style={{marginBottom: 10}}>
                                    <label>ชื่อ นามสกุล</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className={styles.row} style={{marginBottom: 10}}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">ช่วงแรก</div>
                                    <div style={{width: '50%', float: 'left'}}>
                                        <label>เริ่มงาน</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div style={{width: '50%', float: 'right'}}>
                                        <label>ออกงาน</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className={styles.row} style={{marginBottom: 10}}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">ช่วงหลัง</div>
                                    <div style={{width: '50%', float: 'left'}}>
                                        <label>เริ่มงาน</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div style={{width: '50%', float: 'right'}}>
                                        <label>ออกงาน</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">OT</div>
                                    <div style={{width: '50%', float: 'left'}}>
                                        <label>เริ่มงาน</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div style={{width: '50%', float: 'right'}}>
                                        <label>ออกงาน</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                
                               
                            </div>
                        </Modal.Body>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '0.75rem', borderTop: '1px solid #dee2e6', borderBottomRightRadius: 'calc(0.3rem - 1px)', borderBottomLeftRadius: 'calc(0.3rem - 1px)' }}>
                            <div className={styles.row} style={{ width: '100%' }}>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                                <div className="col-sm-12 col-md-4 col-lg-4" style={{marginBottom: 10}}>
                                    <button variant="primary" className="btn btn-success" style={{ width: '100%' }} >บันทึกข้อมูล</button>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4">
                                    <button variant="primary" className="btn btn-danger" style={{ width: '100%' }} onClick={() => this.showpopupinput(!this.state.popupinput)}>ยกเลิก</button>
                                </div>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                            </div>

                        </div>
                    </Modal>

                    <div className={styles.row} style={{textAlign: 'center'}}>
                        <nav className="slidemenu">
                            <input type="radio" name="slideItem" id="slide-item-1" className="slide-toggle" defaultChecked/>
                            <label htmlFor="slide-item-1"><span style={{fontWeight: 'bold', fontSize: 25}}>TIMESHEET</span></label>
                            <input type="radio" name="slideItem" id="slide-item-2" className="slide-toggle" />
                            <label htmlFor="slide-item-2"><span style={{fontWeight: 'bold', fontSize: 25}}>PROGRESS</span></label>
                            <div className="clear"></div>
                            <div className="slider"><div className="bar"></div></div>
                        </nav>
                    </div>
                    <div className={styles.row} style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 10 }}>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div style={{fontWeight: 'bold', fontSize: 18}}>Report Information</div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <label style={{fontSize: 15}}>Employee : 5700001 นายนุกูล กิมพันธ์</label>
                        </div>
                    </div>
                    <div className={styles.row} style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div style={{fontWeight: 'bold'}}>Daily Timesheet Report</div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <label>Date</label>
                            <input type="date" className="form-control" style={{ width: '97%' }} />
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <label>Project Name</label>
                            <input type="text" className="form-control" style={{ width: '97%' }} />
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <label>Zone Code</label>
                            <input type="text" className="form-control" style={{ width: '97%' }} />
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <label>Zone Name</label>
                            <input type="text" className="form-control" style={{ width: '97%' }} />
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <label>กิจกรรม</label>
                            <input type="text" className="form-control" style={{ width: '97%' }} />
                        </div>
                    </div>

                    <div className={styles.row} style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div style={{ width: '50%', float: 'left', fontSize: 18 }}>ข้อมูลพนักงานรายวัน</div>
                            <div style={{ width: '50%', float: 'right', textAlign: 'right' }}>
                                <i className="fa-solid fa-circle-plus" style={{ fontSize: 30, color: 'gray' }} onClick={() => this.showpopupinput(true)}></i>
                            </div>
                        </div>
                        <table className="table table-striped" style={{ fontSize: 12 }}>
                            <thead>
                                <tr>
                                    <th>รหัส</th>
                                    <th colSpan={6}>ชื่อสกุล</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* // */}
                                <tr style={{borderBottomStyle: 'hidden' }}>
                                    <td>1904</td>
                                    <td colSpan={5}>KYAW LIN AUNG</td>
                                    <td>
                                        <i className="fa-solid fa-square-check" style={{fontSize: 20}}></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td style={{textAlign: 'center'}}>
                                        <div>ช่วงแรก</div>
                                        <div>9:00-12:00</div>
                                    </td>
                                    <td style={{textAlign: 'center'}}>
                                        <div>ช่วงหลัง</div>
                                        <div>14:30-17:00</div>
                                    </td>
                                    <td style={{textAlign: 'center'}}>
                                        <div>OT</div>
                                        <div>19:00-20:30</div>
                                    </td>
                                </tr>
                                {/* // */}
                                <tr style={{borderBottomStyle: 'hidden' }}>
                                    <td>1921</td>
                                    <td colSpan={6}>ZIN KO OO</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td style={{textAlign: 'center'}}>
                                        <div>ช่วงแรก</div>
                                        <div>9:00-12:00</div>
                                    </td>
                                    <td style={{textAlign: 'center'}}>
                                        <div>ช่วงหลัง</div>
                                        <div>14:30-17:00</div>
                                    </td>
                                    <td style={{textAlign: 'center'}}>
                                        <div>OT</div>
                                        <div>19:00-20:30</div>
                                    </td>
                                </tr>
                                {/* // */}

                            </tbody>
                        </table>
                    </div>

                    <div className={styles.row} style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                        <div className="col-lg-3 col-md-3 col-sm-12"></div>
                        <div className="col-lg-3 col-md-3 col-sm-12" style={{marginBottom: 10,}}>
                            <button type="button" className="btn btn-success" style={{ width: '95%' }}>SAVE</button>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <button type="button" className="btn btn-danger" style={{ width: '95%' }}>RESET</button>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12"></div>
                    </div>


                </div>
                <br /><br /><br />
            </>
        );
    }
}
