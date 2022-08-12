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
            keyitememp: '',
            keyempname: '',
            keyempcode: '',
            EmployeeCode: '',
            EmployeeDisplayName: '',
            EmplolyeeTypeCode: '',
            popupinput: false,
            popupprogress: false,
            tabindex: '1',
            txt_date: new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + (new Date().getDate())).slice(-2),
            optionprojectname: [],
            txt_projectnamevalue: '',
            txt_projectlabel: '',
            optionzone: [],
            txt_zonevalue: '',
            txt_zonelabel: '',
            optionactivity: [],
            txt_activityvalue: '',
            txt_activitylabel: '',
            optionlocation: [],
            txt_locationvalue: '',
            txt_locationlabel: '',
            txt_goal: '',
            txt_actual: '',
            itememployee: [],
            pop_empcode: '',
            pop_fullname: '',
            pop_befstart: '',
            pop_befend: '',
            pop_aftstart: '',
            pop_aftend: '',
            pop_otstart: '',
            pop_otend: '',
            itemprogress: [],
            pop_progressdetail: '',
            pop_progressunit: '',
            pop_progressvolumn: '',
            item_employee: [],

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
            // console.log(JSON.stringify(res.data));
        });
    }
    getuserinfo = async () => {
        await new Service().getuserinfo(getCookie('token')).then(res => {
            this.setState({
                EmployeeCode: res.data.EmployeeCode,
                EmployeeDisplayName: res.data.EmployeeDisplayName,
                EmplolyeeTypeCode: res.data.EmplolyeeTypeCode,
            });
            this.projectmaster(res.data.EmployeeCode);
        });
    }
    projectmaster = async() => {
        await new Service().projectmaster(getCookie('token')).then(res => {
            this.setState({
                optionprojectname: res.data,
            });
        });
    }
    zonename = async(parject_code) => {
        await new Service().zonename(getCookie('token'), parject_code).then(res => {
            this.setState({
                optionzone: res.data,
                txt_zonevalue: '',
                txt_zonelabel: ''
            });
        });
    }
    projectactivity = async(parject_code) => {
        await new Service().projectactivity(getCookie('token'), parject_code).then(res => {
            this.setState({
                optionactivity: res.data,
                txt_activityvalue: '',
                txt_activitylabel: ''
            });
        });
    }
    projectsublocation = async (par_projectcode, par_location) => {
        await new Service().projectsublocation(getCookie('token'), par_projectcode, par_location).then(res => {
            this.setState({
                optionlocation: res.data,
                txt_locationvalue: '',
                txt_locationlabel: ''
            });
        });
    }
    employeesubactivity = async(ProjectActivity, ProjectSubActivityCode) => {
        await new Service().employeesubactivity(getCookie('token'), ProjectActivity, ProjectSubActivityCode, this.state.EmployeeCode, 'D').then(res => {
            this.setState({
                item_employee: res.data,
            });
        });
    }

    changeProjectname = (e) => {
        this.setState({
            txt_projectnamevalue: e,
            txt_projectlabel: e.label
        });
        this.zonename(e.value);
        this.projectactivity(e.value);
    }
    changeZone = (e) => {
        this.setState({
            txt_zonevalue: e,
            txt_zonelabel: e.label
        });
        this.projectsublocation(this.state.txt_projectnamevalue.value, e.value);
    }
    changeActivity = (e) => {
        this.setState({
            txt_activityvalue: e,
            txt_activitylabel: e.label
        });
        this.employeesubactivity(e.value,e.code);
    }
    changeLocation = (e) => {
        this.setState({
            txt_locationvalue: e,
            txt_locationlabel: e.label
        });
    }
    showpopupinput = (e, index, empcode, empname) => {
        let { item_employee } = this.state;
        try{
            this.setState({ 
                popupinput: e, 
                keyitememp: index,
                keyempname: empname,
                keyempcode: empcode,
                pop_befstart: item_employee[index].befstart,
                pop_befend: item_employee[index].befend,
                pop_aftstart: item_employee[index].atfstart,
                pop_aftend: item_employee[index].atfend,
                pop_otstart: item_employee[index].otstart,
                pop_otend: item_employee[index].otend,
            });
        }catch(e){

        }
    }
    showpopupprogress = (e) => {
        this.setState({ popupprogress: e })
    }

    // changvalue
    confrimchangtime = (index) => {
        let { item_employee } = this.state;
        item_employee[index].befstart = this.state.pop_befstart;
        item_employee[index].befend = this.state.pop_befend;
        item_employee[index].atfstart = this.state.pop_aftstart;
        item_employee[index].atfend = this.state.pop_aftend;
        item_employee[index].otstart = this.state.pop_otstart;
        item_employee[index].otend = this.state.pop_otend;
        item_employee[index].useredit = '1';
        this.setState({item_employee});
        this.showpopupinput(false, index, '', '');
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
                            <div>กำหนดเวลาทำงาน</div>
                            <div style={{fontSize: 10}}>{this.state.keyempname}</div>
                        </Modal.Header>
                        <Modal.Body>
                            <div className={styles.row} style={{fontSize: 15}}>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">ช่วงแรก</div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>เริ่มงาน</label>
                                        <input type="text" placeholder='09:00' className="form-control" style={{width: '97%'}} value={this.state.pop_befstart} onChange={(e) => this.setState({pop_befstart: e.target.value})}/>
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>ออกงาน</label>
                                        <input type="text" placeholder='12:00' className="form-control" value={this.state.pop_befend} onChange={(e) => this.setState({pop_befend: e.target.value})}/>
                                    </div>
                                </div>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">ช่วงหลัง</div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>เริ่มงาน</label>
                                        <input type="text" placeholder='13:00' className="form-control" style={{width: '97%'}} value={this.state.pop_aftstart} onChange={(e) => this.setState({pop_aftstart: e.target.value})}/>
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>ออกงาน</label>
                                        <input type="text" placeholder='17:00' className="form-control" value={this.state.pop_aftend} onChange={(e) => this.setState({pop_aftend: e.target.value})}/>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">OT</div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>เริ่มงาน</label>
                                        <input type="text" placeholder='20:00' className="form-control" style={{width: '97%'}} value={this.state.pop_otstart} onChange={(e) => this.setState({pop_otstart: e.target.value})}/>
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>ออกงาน</label>
                                        <input type="text" placeholder='22:00' className="form-control" value={this.state.pop_otend} onChange={(e) => this.setState({pop_otend: e.target.value})}/>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '0.75rem', borderTop: '1px solid #dee2e6', borderBottomRightRadius: 'calc(0.3rem - 1px)', borderBottomLeftRadius: 'calc(0.3rem - 1px)' }}>
                            <div className={styles.row} style={{ width: '100%' }}>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                                <div className="col-sm-12 col-md-4 col-lg-4" style={{ marginBottom: 10 }}>
                                    <button type="button" variant="primary" className="btn btn-success" style={{ width: '100%' }} onClick={() => this.confrimchangtime(this.state.keyitememp)}>บันทึกข้อมูล</button>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4">
                                    <button variant="primary" className="btn btn-danger" style={{ width: '100%' }} onClick={() => this.showpopupinput(false, this.state.keyitememp, '', '')}>ยกเลิก</button>
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
                                    <input type="text" className="form-control" value={this.state.pop_progressdetail} onChange={(e) => this.setState({pop_progressdetail: e.target.value})}/>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginBottom: 10 }}>
                                    <label>หน่วย</label>
                                    <input type="text" className="form-control" value={this.state.pop_progressunit} onChange={(e) => this.setState({pop_progressunit: e.target.value})}/>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginBottom: 10 }}>
                                    <label>ปริมาณ</label>
                                    <input type="text" className="form-control" value={this.state.pop_progressvolumn} onChange={(e) => this.setState({pop_progressvolumn: e.target.value})}/>
                                </div>
                            </div>
                        </Modal.Body>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '0.75rem', borderTop: '1px solid #dee2e6', borderBottomRightRadius: 'calc(0.3rem - 1px)', borderBottomLeftRadius: 'calc(0.3rem - 1px)' }}>
                            <div className={styles.row} style={{ width: '100%' }}>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                                <div className="col-sm-12 col-md-4 col-lg-4" style={{ marginBottom: 10 }}>
                                    <button type="button" variant="primary" className="btn btn-success" style={{ width: '100%' }} >บันทึกข้อมูล</button>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4">
                                    <button type="button" variant="primary" className="btn btn-danger" style={{ width: '100%' }} onClick={() => this.showpopupprogress(!this.state.popupprogress)}>ยกเลิก</button>
                                </div>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                            </div>

                        </div>
                    </Modal>
                    {/* End */}

                    <div className={styles.row} style={{ textAlign: 'center' }}>
                        <nav className="slidemenu">
                            <input type="radio" name="slideItem" id="slide-item-1" className="slide-toggle" defaultChecked={this.state.tabindex==='1' ? true : false} />
                            <label htmlFor="slide-item-1"><span style={{ fontWeight: 'bold', fontSize: 25 }} onClick={() => this.setState({ tabindex: '1' })}>TIMESHEET</span></label>
                            <input type="radio" name="slideItem" id="slide-item-2" className="slide-toggle" defaultChecked={this.state.tabindex==='2' ? true : false}/>
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
                                <div className={styles.row} style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20, fontSize: 15 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div style={{ fontWeight: 'bold' }}><span style={{fontWeight: 'bold'}}>Daily Timesheet Report (1)</span></div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12">
                                        <label>Date</label>
                                        <input type="date" value={this.state.txt_date} onChange={(e) => this.setState({txt_date: e.target.value})} className="form-control" style={{ width: '97%', fontSize: 13}} />
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12" style={{marginTop: 5}}>
                                        <label>Project Name</label>
                                        <Select
                                            options={this.state.optionprojectname}
                                            value={this.state.txt_projectnamevalue}
                                            onChange={(e) => this.changeProjectname(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12" style={{marginTop: 5}}>
                                        <label>ช่วง</label>
                                        <Select
                                            options={this.state.optionzone}
                                            value={this.state.txt_zonevalue}
                                            onChange={(e) => this.changeZone(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12" style={{marginTop: 5}}>
                                        <label>กิจกรรม</label>
                                        <Select
                                            options={this.state.optionactivity}
                                            value={this.state.txt_activityvalue}
                                            onChange={(e) => this.changeActivity(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12" style={{marginTop: 5}}>
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
                                        <div style={{ width: '50%', float: 'left'}}><span style={{fontWeight: 'bold'}}>ข้อมูลพนักงานรายวัน</span></div>
                                        <div style={{ width: '50%', float: 'right', textAlign: 'right' }}>
                                            {/* <i className="fa-solid fa-circle-plus" style={{ fontSize: 30, color: 'gray' }} onClick={() => this.showpopupinput(true)}></i> */}
                                        </div>
                                    </div>
                                    <table className="table" style={{ fontSize: 12 }}>
                                        <thead>
                                            <tr>
                                                <th>รหัส</th>
                                                <th colSpan={6}>ชื่อสกุล</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* // */}
                                            {
                                                this.state.txt_projectnamevalue.value && this.state.txt_zonevalue.value && this.state.txt_activityvalue.value && this.state.txt_locationvalue.value ?
                                                this.state.item_employee ?
                                                    this.state.item_employee.map((item, index) => {
                                                        return (
                                                            <>
                                                                <tr key={index} style={{ borderBottomStyle: 'hidden' }}>
                                                                    <td>{item.empcode}</td>
                                                                    <td colSpan={5}><span onClick={() => this.showpopupinput(true, index, item.empcode, item.empname)}>{item.empname}</span></td>
                                                                    <td>
                                                                        {
                                                                            index === 0 ?
                                                                            <i className="fa-solid fa-square-check" style={{ fontSize: 20 }}></i>
                                                                            : <></>
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td></td>
                                                                    <td style={{ textAlign: 'center' }}>
                                                                        <div>ช่วงแรก</div>
                                                                        <div>{item.befstart}-{item.befend}</div>
                                                                    </td>
                                                                    <td style={{ textAlign: 'center' }}>
                                                                        <div>ช่วงหลัง</div>
                                                                        <div>{item.atfstart}-{item.atfend}</div>
                                                                    </td>
                                                                    <td style={{ textAlign: 'center' }}>
                                                                        <div>OT</div>
                                                                        <div>{item.otstart}-{item.otend}</div>
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })
                                                    : 
                                                    <tr>
                                                        <td colSpan={7} style={{textAlign: 'center'}}>ไม่พบรายชื่อ</td>
                                                    </tr>
                                                    :<></>
                                            }
                                            {/* // */}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                            :
                        this.state.tabindex === '2' ?
                            <>
                                <div className={styles.row} style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20, fontSize: 15 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div style={{ fontWeight: 'bold'}}><span style={{fontWeight: 'bold'}}>Daily Timesheet Report (2)</span></div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12" style={{marginTop: 5}}>
                                        <label>เป้าหมาย</label>
                                        <input type="text" value={this.state.txt_goal} onChange={(e) => this.setState({txt_goal: e.target.value})} className="form-control" style={{ width: '97%' }} />
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12" style={{marginTop: 5}}>
                                        <label>ทำได้จริง</label>
                                        <input type="text" value={this.state.txt_actual} onChange={(e) => this.setState({txt_actual: e.target.value})} className="form-control" style={{ width: '97%' }} />
                                    </div>
                                </div>
                                <div className={styles.row} style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div style={{ width: '50%', float: 'left'}}><span style={{fontWeight: 'bold'}}>รายละเอียดงาน/อื่นๆ</span></div>
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
                                    <div className={styles.row} style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                                        <div className="col-lg-3 col-md-3 col-sm-12"></div>
                                        <div className="col-lg-3 col-md-3 col-sm-12" style={{ marginBottom: 10, }}>
                                            <button type="button" className="btn btn-outline-success" style={{ width: '100%' }}>SAVE</button>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-12">
                                            <button type="button" className="btn btn-outline-danger" style={{ width: '100%' }}>RESET</button>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-12"></div>
                                    </div>
                            </>
                            :
                        <></>
                    }
                </div>
                <br /><br /><br />
            </>
        );
    }
}