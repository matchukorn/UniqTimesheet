import React, { Component } from 'react';
import styles from '../../styles/main.module.css';
import Navbarx from '../nav';
import Link from 'next/link';
import { Modal } from 'react-bootstrap-v5';
import Service from '../api/Service';
import { getCookie, setCookies } from 'cookies-next';
import Select from 'react-select';

const stylesselect = {
    control: base => ({
        ...base,
        fontSize: 12,
        width: '97%'
    }),
    menu: base => ({
        ...base,
        fontSize: 12,
        zIndex: 111
    })
};
export default class BI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EmployeeCode: '',
            EmployeeDisplayName: '',
            EmplolyeeTypeCode: '',
            popupinput: false,
            popupprogress: false,
            tabindex: '1',
            txt_date: new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + (new Date().getDate())).slice(-2),
            optionprojectname: [
                {
                    value: 'P001',
                    label: 'P001 โครงการรถไฟรางคู่ สัญญา 2'
                },
                {
                    value: 'P002',
                    label: 'P002 โครงการทางพิเศษพระราม 3-สัญญาที่ 1'
                }
            ],
            txt_projectnamevalue: '',
            txt_projectlabel: '',
            optionzone: [
                {
                    value: '01A01',
                    label: '01A01 ท่าแค'
                },
                {
                    value: '01A02',
                    label: '01A02 ท่าแค-โคกกะเทียม'
                }
            ],
            txt_zonevalue: '',
            txt_zonelabel: '',
            optionactivity: [
                {
                    value: '001',
                    label: '001 งาน Bottom Ballast'
                },
                {
                    value: '002',
                    label: '002 งานวางหมอน'
                }
            ],
            txt_activityvalue: '',
            txt_activitylabel: '',
            optionlocation: [
                {
                    value: '01A0101',
                    label: '01A0101 นอกย่าน'
                },
                {
                    value: '01A0302',
                    label: '01A0302 ในย่าน'
                }
            ],
            txt_locationvalue: '',
            txt_locationlabel: '',
            txt_goal: '',
            txt_actual: ''
        }
    }
    componentDidMount() {
        this.getuserinfo();
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
    gettoken = async (emp_code) => {
        await new Service().gettoken(emp_code).then(res => {
            console.log(JSON.stringify(res.data));
        });
    }
    getuserinfo = async () => {
        await new Service().getuserinfo(getCookie('token')).then(res => {
            this.setState({
                EmployeeCode: res.data.EmployeeCode,
                EmployeeDisplayName: res.data.EmployeeDisplayName,
                EmplolyeeTypeCode: res.data.EmplolyeeTypeCode,
            });
        });
    }
    changeProjectname = (e) => {
        this.setState({
            txt_projectnamevalue: e,
            txt_projectlabel: e.label
        });
    }
    changeZone = (e) => {
        this.setState({
            txt_zonevalue: e,
            txt_zonelabel: e.label
        });
    }
    changeActivity = (e) => {
        this.setState({
            txt_activityvalue: e,
            txt_activitylabel: e.label
        });
    }
    changeLocation = (e) => {
        this.setState({
            txt_locationvalue: e,
            txt_locationlabel: e.label
        });
    }
    showpopupinput = (e) => {
        this.setState({ popupinput: e })
    }
    showpopupprogress = (e) => {
        this.setState({ popupprogress: e })
    }

    render() {
        return (
            <>
                {/* <Navbarx /> */}
                {/* <hr style={{ height: 5, backgroundColor: '#8c1e21' }} /> */}
                <div className={styles.row} style={{}}>

                    {/* Item Employee */}
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
                            <div className={styles.row} style={{fontSize: 15}}>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <label>รหัสพนักงาน</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginBottom: 10 }}>
                                    <label>ชื่อ นามสกุล</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">ช่วงแรก</div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>เริ่มงาน</label>
                                        <input type="text" placeholder='09:00' className="form-control" style={{width: '97%'}}/>
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>ออกงาน</label>
                                        <input type="text" placeholder='12:00' className="form-control" />
                                    </div>
                                </div>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">ช่วงหลัง</div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>เริ่มงาน</label>
                                        <input type="text" placeholder='13:00' className="form-control" style={{width: '97%'}}/>
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>ออกงาน</label>
                                        <input type="text" placeholder='17:00' className="form-control" />
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">OT</div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>เริ่มงาน</label>
                                        <input type="text" placeholder='20:00' className="form-control" style={{width: '97%'}}/>
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>ออกงาน</label>
                                        <input type="text" placeholder='22:00' className="form-control" />
                                    </div>
                                </div>


                            </div>
                        </Modal.Body>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '0.75rem', borderTop: '1px solid #dee2e6', borderBottomRightRadius: 'calc(0.3rem - 1px)', borderBottomLeftRadius: 'calc(0.3rem - 1px)' }}>
                            <div className={styles.row} style={{ width: '100%' }}>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                                <div className="col-sm-12 col-md-4 col-lg-4" style={{ marginBottom: 10 }}>
                                    <button variant="primary" className="btn btn-success" style={{ width: '100%' }} >บันทึกข้อมูล</button>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4">
                                    <button variant="primary" className="btn btn-danger" style={{ width: '100%' }} onClick={() => this.showpopupinput(!this.state.popupinput)}>ยกเลิก</button>
                                </div>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                            </div>

                        </div>
                    </Modal>
                    {/* Item Progress */}
                    <Modal
                        show={this.state.popupprogress}
                        backdrop="static"
                        keyboard={false}
                        StrictMode={true}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header>
                            <Modal.Title>เพิ่มรายละเอียดงาน</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className={styles.row} style={{fontSize: 15}}>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <label>รายละเอียด</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginBottom: 10 }}>
                                    <label>หน่วย</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginBottom: 10 }}>
                                    <label>ปริมาณ</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                        </Modal.Body>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '0.75rem', borderTop: '1px solid #dee2e6', borderBottomRightRadius: 'calc(0.3rem - 1px)', borderBottomLeftRadius: 'calc(0.3rem - 1px)' }}>
                            <div className={styles.row} style={{ width: '100%' }}>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                                <div className="col-sm-12 col-md-4 col-lg-4" style={{ marginBottom: 10 }}>
                                    <button variant="primary" className="btn btn-success" style={{ width: '100%' }} >บันทึกข้อมูล</button>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4">
                                    <button variant="primary" className="btn btn-danger" style={{ width: '100%' }} onClick={() => this.showpopupprogress(!this.state.popupprogress)}>ยกเลิก</button>
                                </div>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                            </div>

                        </div>
                    </Modal>
                    {/* End */}

                    <div className={styles.row} style={{ textAlign: 'center' }}>
                        <nav className="slidemenu">
                            <input type="radio" name="slideItem" id="slide-item-1" className="slide-toggle" defaultChecked />
                            <label htmlFor="slide-item-1"><span style={{ fontWeight: 'bold', fontSize: 25 }} onClick={() => this.setState({ tabindex: '1' })}>TIMESHEET</span></label>
                            <input type="radio" name="slideItem" id="slide-item-2" className="slide-toggle" />
                            <label htmlFor="slide-item-2"><span style={{ fontWeight: 'bold', fontSize: 25 }} onClick={() => this.setState({ tabindex: '2' })}>PROGRESS</span></label>
                            <div className="clear"></div>
                            <div className="slider"><div className="bar"></div></div>
                        </nav>
                    </div>
                    <div className={styles.row} style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 10 }}>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div style={{ fontWeight: 'bold', fontSize: 18 }}>Report Information</div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <label style={{ fontSize: 15 }}>Employee : {this.state.EmployeeCode} {this.state.EmployeeDisplayName}</label>
                        </div>
                    </div>

                    {
                        this.state.tabindex === '1' ?
                            <>
                                <div className={styles.row} style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div style={{ fontWeight: 'bold' }}>Daily Timesheet Report (1)</div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12">
                                        <label>Date</label>
                                        <input type="date" value={this.state.txt_date} className="form-control" style={{ width: '97%' }} />
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12">
                                        <label>Project Name</label>
                                        <Select
                                            options={this.state.optionprojectname}
                                            value={this.state.txt_projectnamevalue}
                                            onChange={(e) => this.changeProjectname(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12">
                                        <label>ช่วง</label>
                                        <Select
                                            options={this.state.optionzone}
                                            value={this.state.txt_zonevalue}
                                            onChange={(e) => this.changeZone(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12">
                                        <label>กิจกรรม</label>
                                        <Select
                                            options={this.state.optionactivity}
                                            value={this.state.txt_activityvalue}
                                            onChange={(e) => this.changeActivity(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-12">
                                        <label>พื้นที่งาน</label>
                                        <Select
                                            options={this.state.optionlocation}
                                            value={this.state.txt_locationvalue}
                                            onChange={(e) => this.changeLocation(e)}
                                            styles={stylesselect}
                                        />
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
                                            <tr style={{ borderBottomStyle: 'hidden' }}>
                                                <td>1904</td>
                                                <td colSpan={5}>KYAW LIN AUNG</td>
                                                <td>
                                                    <i className="fa-solid fa-square-check" style={{ fontSize: 20 }}></i>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <div>ช่วงแรก</div>
                                                    <div>9:00-12:00</div>
                                                </td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <div>ช่วงหลัง</div>
                                                    <div>14:30-17:00</div>
                                                </td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <div>OT</div>
                                                    <div>19:00-20:30</div>
                                                </td>
                                            </tr>
                                            {/* // */}
                                            <tr style={{ borderBottomStyle: 'hidden' }}>
                                                <td>1921</td>
                                                <td colSpan={6}>ZIN KO OO</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <div>ช่วงแรก</div>
                                                    <div>9:00-12:00</div>
                                                </td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <div>ช่วงหลัง</div>
                                                    <div>14:30-17:00</div>
                                                </td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <div>OT</div>
                                                    <div>19:00-20:30</div>
                                                </td>
                                            </tr>
                                            {/* // */}

                                        </tbody>
                                    </table>
                                </div>
                            </>
                            :
                        this.state.tabindex === '2' ?
                            <>
                                <div className={styles.row} style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div style={{ fontWeight: 'bold' }}>Daily Timesheet Report (2)</div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12">
                                        <label>เป้าหมาย</label>
                                        <input type="text" value={this.state.txt_goal} onChange={(e) => this.setState({txt_goal: e.target.value})} className="form-control" style={{ width: '97%' }} />
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12">
                                        <label>ทำได้จริง</label>
                                        <input type="text" value={this.state.txt_actual} onChange={(e) => this.setState({txt_actual: e.target.value})} className="form-control" style={{ width: '97%' }} />
                                    </div>
                                </div>
                                <div className={styles.row} style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div style={{ width: '50%', float: 'left', fontSize: 18 }}>รายละเอียดงาน/อื่นๆ</div>
                                        <div style={{ width: '50%', float: 'right', textAlign: 'right' }}>
                                            <i className="fa-solid fa-circle-plus" style={{ fontSize: 30, color: 'gray' }} onClick={() => this.showpopupprogress(true)}></i>
                                        </div>
                                    </div>
                                    <table className="table table-striped" style={{ fontSize: 12 }}>
                                        <thead>
                                            <tr>
                                                <th>ลำดับ</th>
                                                <th colSpan={3}>รายละเอียด</th>
                                                <th>หน่วย</th>
                                                <th>ปริมาณ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* // */}
                                            <tr style={{ borderBottomStyle: 'hidden' }}>
                                                <td>1</td>
                                                <td colSpan={3}>KYAW LIN AUNG รายละเอียดงาน กกกกก</td>
                                                <td>mete</td>
                                                <td>200</td>
                                            </tr>
                                            
                                            {/* // */}

                                        </tbody>
                                    </table>
                                </div>
                            </>
                            :
                        <></>
                    }









                    {/* 
                    <div className={styles.row} style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                        <div className="col-lg-3 col-md-3 col-sm-12"></div>
                        <div className="col-lg-3 col-md-3 col-sm-12" style={{marginBottom: 10,}}>
                            <button type="button" className="btn btn-success" style={{ width: '95%' }}>SAVE</button>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <button type="button" className="btn btn-danger" style={{ width: '95%' }}>RESET</button>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12"></div>
                    </div> */}


                </div>
                <br /><br /><br />
            </>
        );
    }
}
