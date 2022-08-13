import React, { Component } from 'react';
import styles from '../../styles/main.module.css';
import Navbarx from '../nav';
import Link from 'next/link';
import Head from 'next/head';
import { Modal } from 'react-bootstrap-v5';
import Service from '../api/Service';
import { getCookie, setCookies } from 'cookies-next';
import Select from 'react-select';
import Swal from 'sweetalert2';

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
            optionempname: [],
            popupcreateemployee: false,
            EmployeeCode: '',
            EmployeeDisplayName: '',
            EmplolyeeTypeCode: '',
            popupinput: false,
            popupprogress: false,
            tabindex: '1',
            txt_date: new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + (new Date().getDate())).slice(-2),
            min_date: new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + (new Date().getDate() - 1)).slice(-2),
            optionprojectname: [],
            txt_projectnamevalue: '',
            txt_projectlabel: '',
            optionzone: [],
            txt_zonevalue: '',
            txt_zonelabel: '',
            optionactivity: [],
            txt_activityvalue: '',
            txt_activitycode: '',
            txt_activitylabel: '',
            optionlocation: [],
            txt_locationvalue: '',
            txt_locationlabel: '',
            txt_goal: '',
            txt_actual: '',
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
            jobtargetvalue: '',
            jobtargetlabel: '',
            activitycode: '',
            CostCenterCode: '',
            JobCode: '',
        }
    }
    componentDidMount() {
        window.onbeforeunload = function () { return false; }
        if (getCookie('token')) {
            this.getuserinfo();
            this.listmasteremployee();
        } else {
            window.location.href = "/"
        }
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
    projectmaster = async () => {
        await new Service().projectmaster(getCookie('token')).then(res => {
            if (res.data) {
                this.setState({
                    optionprojectname: res.data,
                });
            } else {
                this.setState({
                    optionprojectname: [],
                });
            }
        });
    }
    zonename = async (parject_code) => {
        await new Service().zonename(getCookie('token'), parject_code).then(res => {
            if (res.data) {
                this.setState({
                    optionzone: res.data,
                    txt_zonevalue: '',
                    txt_zonelabel: ''
                });
            } else {
                this.setState({
                    optionzone: [],
                    txt_zonevalue: '',
                    txt_zonelabel: ''
                });
            }
        });
    }
    projectactivity = async (parject_code) => {
        await new Service().projectactivity(getCookie('token'), parject_code).then(res => {
            if (res.data) {
                this.setState({
                    optionactivity: res.data,
                    txt_activityvalue: '',
                    txt_activitycode: '',
                    txt_activitylabel: '',
                });
            } else {
                this.setState({
                    optionactivity: '',
                    txt_activityvalue: '',
                    txt_activitycode: '',
                    txt_activitylabel: '',
                });
            }
        });
    }
    projectsublocation = async (par_projectcode, par_location) => {
        await new Service().projectsublocation(getCookie('token'), par_projectcode, par_location).then(res => {
            if (res.data) {
                this.setState({
                    optionlocation: res.data,
                    txt_locationvalue: '',
                    txt_locationlabel: ''
                });
            } else {
                this.setState({
                    optionlocation: '',
                    txt_locationvalue: '',
                    txt_locationlabel: ''
                });
            }
        });
    }
    employeesubactivity = async (ProjectActivity, ProjectSubActivityCode) => {
        await new Service().employeesubactivity(getCookie('token'), ProjectActivity, ProjectSubActivityCode, this.state.EmployeeCode, 'D').then(res => {
            if (res.data) {
                this.setState({
                    item_employee: res.data,
                });
            } else {
                this.setState({
                    item_employee: '',
                });
            }
        });
    }
    masterjobid = async (ProjectCode, ProjectActivityCode, ProjectSubActivityCode, ProjectLocationCode, ProjectSubLocationCode) => {
        await new Service().masterjobid(getCookie('token'), ProjectCode, ProjectActivityCode, ProjectSubActivityCode, ProjectLocationCode, ProjectSubLocationCode).then(res => {
            if (res.data) {
                this.setState({
                    JobCode: res.data.JobCode,
                    CostCenterCode: res.data.CostCenterCode,
                    jobtargetvalue: res.data.JobTarget,
                    jobtargetlabel: res.data.JobUnit,
                });
            } else {
                this.setState({
                    JobCode: '',
                    CostCenterCode: '',
                    jobtargetvalue: '',
                    jobtargetlabel: '',
                });
            }
        });
    }
    listmasteremployee = async () => {
        await new Service().listmasteremployee(getCookie('token')).then(res => {
            if (res.data) {
                this.setState({
                    optionempname: res.data,
                });
            } else {
                this.setState({
                    optionempname: []
                });
            }
        });
    }

    changeProjectname = (e) => {
        this.setState({
            txt_projectnamevalue: e,
            txt_projectlabel: e.label,
            txt_zonevalue: '',
            txt_zonelabel: '',
            txt_activityvalue: '',
            txt_activitycode: '',
            txt_activitylabel: '',
            activitycode: '',
            txt_locationvalue: '',
            txt_locationlabel: '',
            jobtargetvalue: '',
            jobtargetlabel: '',
        });
        this.zonename(e.value);
        this.projectactivity(e.value);
    }
    changeZone = (e) => {
        this.setState({
            txt_zonevalue: e,
            txt_zonelabel: e.label,
            txt_activityvalue: '',
            txt_activitycode: '',
            txt_activitylabel: '',
            activitycode: '',
            txt_locationvalue: '',
            txt_locationlabel: '',
            jobtargetvalue: '',
            jobtargetlabel: '',
        });
        this.projectsublocation(this.state.txt_projectnamevalue.value, e.value);
    }
    changeActivity = (e) => {
        this.setState({
            txt_activityvalue: e,
            txt_activitycode: e.acode,
            txt_activitylabel: e.label,
            activitycode: e.code,
            txt_locationvalue: '',
            txt_locationlabel: '',
            jobtargetvalue: '',
            jobtargetlabel: '',
        });
        this.employeesubactivity(e.acode, e.code);
    }
    changeLocation = (e) => {
        this.setState({
            txt_locationvalue: e,
            txt_locationlabel: e.label
        });
        this.masterjobid(this.state.txt_projectnamevalue.value, this.state.txt_activitycode, this.state.activitycode, this.state.txt_zonevalue.value, e.code);
    }
    changeempname = (e) => {
        this.setState({
            pop_empcode: e,
            pop_fullname: e.name,
        });
    }
    showpopupinput = (e, index, empcode, empname) => {
        let { item_employee } = this.state;
        try {
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
        } catch (e) {

        }
    }
    showpopupprogress = (e) => {
        this.setState({
            popupprogress: e,
            pop_progressdetail: '',
            pop_progressvolumn: '',
            pop_progressunit: ''
        })
    }
    showpopupcreateemployee = (value) => {
        this.setState({
            popupcreateemployee: value,
            pop_empcode: '',
            pop_fullname: '',
            pop_befstart: '',
            pop_befend: '',
            pop_aftstart: '',
            pop_aftend: '',
            pop_otstart: '',
            pop_otend: '',
        });
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
        this.setState({ item_employee });
        this.showpopupinput(false, index, '', '');
    }
    createItemprogress = () => {
        let { itemprogress } = this.state;
        let arr = {
            detail: this.state.pop_progressdetail,
            volumn: this.state.pop_progressvolumn,
            unit: this.state.pop_progressunit,
        }
        itemprogress.push(arr);
        this.setState({ itemprogress })
        this.showpopupprogress(false);
    }
    createEmployee = () => {
        let { item_employee } = this.state;
        if (item_employee) {
            if (this.state.pop_empcode && this.state.pop_fullname) {
                let arr = {
                    empcode: this.state.pop_empcode.value,
                    empname: this.state.pop_fullname,
                    emptype: 'D',
                    befstart: this.state.pop_befstart,
                    befend: this.state.pop_befend,
                    atfstart: this.state.pop_aftstart,
                    atfend: this.state.pop_aftend,
                    otstart: this.state.pop_otstart,
                    otend: this.state.pop_otend,
                    useredit: '0',
                }
                item_employee.push(arr);
                this.setState({ item_employee });
                this.showpopupcreateemployee(false);
            }
        } else {
            if (this.state.pop_empcode && this.state.pop_fullname) {
                let arr = [{
                    empcode: this.state.pop_empcode.value,
                    empname: this.state.pop_fullname,
                    empname: 'D',
                    befstart: this.state.pop_befstart,
                    befend: this.state.pop_befend,
                    atfstart: this.state.pop_aftstart,
                    atfend: this.state.pop_aftend,
                    otstart: this.state.pop_otstart,
                    otend: this.state.pop_otend,
                    useredit: '0',
                }]
                this.setState({ item_employee: arr });
                this.showpopupcreateemployee(false);
            }
        }
    }
    removeEmployee = (key) => {
        let { item_employee } = this.state;
        Swal.fire({
            title: 'คุณต้องการลบรายชื่อนี้ออกหรือไม่ ?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                item_employee.splice(key, 1)
                this.setState({ item_employee });
            }
        })
    }
    applyAll = () => {
        let { item_employee } = this.state;
        try {
            if (item_employee[0].befstart && item_employee[0].befend) {
                for (let x = 0; x < item_employee.length; x++) {
                    if (item_employee[x].useredit === '0') {
                        item_employee[x].befstart = item_employee[0].befstart;
                        item_employee[x].befend = item_employee[0].befend;
                        item_employee[x].atfstart = item_employee[0].atfstart;
                        item_employee[x].atfend = item_employee[0].atfend;
                        item_employee[x].otstart = item_employee[0].otstart;
                        item_employee[x].otend = item_employee[0].otend;
                    } else {
                    }
                }
                this.setState({ item_employee });
            } else {
            }
        } catch (error) {

        }
    }

    btn_confrim = () => {
        if (
            this.state.EmployeeCode && this.state.txt_date && this.state.txt_projectnamevalue.value &&
            this.state.txt_zonevalue.value && this.state.txt_projectnamevalue.activity && this.state.JobCode &&
            this.state.txt_activityvalue.code && this.state.CostCenterCode && this.state.jobtargetvalue && this.state.jobtargetlabel &&
            this.state.txt_actual && this.state.jobtargetlabel && this.state.item_employee.length > 0
        ) {
            Swal.fire({
                title: 'การรายงานเท็จถือเป็นความผิดวินัยอย่างร้ายแรง และมีบทลงโทษสูงสุดตามกฎระเบียบของบริษัท',
                text: "",
                icon: 'warning',
                showCloseButton: true,
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ยอมรับ'
            }).then((result) => {
                if (result.isConfirmed) {
                    //////////
                    new Service().savetimesheet(
                        getCookie('token'),
                        this.state.EmployeeCode, // H
                        this.state.txt_date, // H
                        this.state.txt_projectnamevalue.value, // H
                        this.state.txt_zonevalue.value, // H
                        this.state.txt_projectnamevalue.activity, // H
                        this.state.JobCode, // H
                        this.state.txt_activityvalue.code,// H
                        this.state.CostCenterCode, // H
                        this.state.jobtargetvalue, // H
                        this.state.jobtargetlabel, // H
                        this.state.txt_actual, // H
                        this.state.jobtargetlabel, // H
                        this.state.item_employee,
                        this.state.itemprogress
                    ).then(res => {
                        if (res.data.status === '1') {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: res.data.message,
                                showConfirmButton: false,
                                timer: 1500
                            })
                            window.location.href = '/timesheet'
                        } else {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: res.data.message,
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    })
                    ////////
                }
            })
        } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'กรุณากรอกข้อมูลให้ครบ',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    // window.onbeforeunload = function () {return false;}
    render() {
        let checkitememp = this.state.item_employee.filter((item) => {
            return item.empcode === '' || item.empname === '' || item.befstart === '' || item.befend === '' || item.atfstart === '' || item.atfend === ''
        })
        return (
            <>
                <Head>
                    <title>TIMESHEET</title>
                    <link rel="icon" type="image/png" href="../logo.png" />
                    <meta name="viewport" content="width=device-width, height=device-height, target-densitydpi=device-dpi, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"></meta>
                </Head>
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
                            <div style={{ fontSize: 10 }}>{this.state.keyempname}</div>
                        </Modal.Header>
                        <Modal.Body>
                            <div className={styles.row} style={{ fontSize: 15 }}>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">ช่วงแรก</div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>เริ่มงาน</label>
                                        <input type="time" placeholder='09:00' className="form-control" style={{ width: '97%' }} value={this.state.pop_befstart} onChange={(e) => this.setState({ pop_befstart: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>ออกงาน</label>
                                        <input type="time" placeholder='12:00' className="form-control" value={this.state.pop_befend} onChange={(e) => this.setState({ pop_befend: e.target.value })} />
                                    </div>
                                </div>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">ช่วงหลัง</div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>เริ่มงาน</label>
                                        <input type="time" placeholder='13:00' className="form-control" style={{ width: '97%' }} value={this.state.pop_aftstart} onChange={(e) => this.setState({ pop_aftstart: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>ออกงาน</label>
                                        <input type="time" placeholder='17:00' className="form-control" value={this.state.pop_aftend} onChange={(e) => this.setState({ pop_aftend: e.target.value })} />
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">OT</div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>เริ่มงาน</label>
                                        <input type="time" placeholder='20:00' className="form-control" style={{ width: '97%' }} value={this.state.pop_otstart} onChange={(e) => this.setState({ pop_otstart: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>ออกงาน</label>
                                        <input type="time" placeholder='22:00' className="form-control" value={this.state.pop_otend} onChange={(e) => this.setState({ pop_otend: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '0.75rem', borderTop: '1px solid #dee2e6', borderBottomRightRadius: 'calc(0.3rem - 1px)', borderBottomLeftRadius: 'calc(0.3rem - 1px)' }}>
                            <div className={styles.row} style={{ width: '100%' }}>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                                <div className="col-sm-12 col-md-4 col-lg-4" style={{ marginBottom: 10 }}>
                                    {
                                        this.state.pop_befstart && this.state.pop_befend && this.state.pop_aftstart && this.state.pop_aftend ?
                                            <button type="button" variant="primary" className="btn btn-success" style={{ width: '100%' }} onClick={() => this.confrimchangtime(this.state.keyitememp)}>บันทึกข้อมูล</button>
                                            :
                                            <button type="button" variant="primary" className="btn btn-success" style={{ width: '100%' }} disabled={true}>บันทึกข้อมูล</button>
                                    }
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
                            <div className={styles.row} style={{ fontSize: 15 }}>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <label>รายละเอียด</label>
                                    <input type="text" className="form-control" value={this.state.pop_progressdetail} onChange={(e) => this.setState({ pop_progressdetail: e.target.value })} />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginBottom: 10 }}>
                                    <label>ปริมาณ</label>
                                    <input type="text" className="form-control" value={this.state.pop_progressvolumn} onChange={(e) => this.setState({ pop_progressvolumn: e.target.value.replace(/[^0-9]/g, '') })} />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginBottom: 10 }}>
                                    <label>หน่วย</label>
                                    <input type="text" className="form-control" value={this.state.pop_progressunit} onChange={(e) => this.setState({ pop_progressunit: e.target.value })} />
                                </div>
                            </div>
                        </Modal.Body>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '0.75rem', borderTop: '1px solid #dee2e6', borderBottomRightRadius: 'calc(0.3rem - 1px)', borderBottomLeftRadius: 'calc(0.3rem - 1px)' }}>
                            <div className={styles.row} style={{ width: '100%' }}>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                                <div className="col-sm-12 col-md-4 col-lg-4" style={{ marginBottom: 10 }}>
                                    {
                                        this.state.pop_progressdetail && this.state.pop_progressvolumn && this.state.pop_progressunit ?
                                            <button type="button" variant="primary" className="btn btn-success" style={{ width: '100%' }} onClick={() => this.createItemprogress()}>สร้างรายละเอียดงาน</button>
                                            :
                                            <button type="button" variant="primary" className="btn btn-success" disabled={true} style={{ width: '100%' }} >สร้างรายละเอียดงาน</button>
                                    }

                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4">
                                    <button type="button" variant="primary" className="btn btn-danger" style={{ width: '100%' }} onClick={() => this.showpopupprogress(!this.state.popupprogress)}>ยกเลิก</button>
                                </div>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                            </div>

                        </div>
                    </Modal>
                    {/* Item Employee */}
                    <Modal
                        show={this.state.popupcreateemployee}
                        backdrop="static"
                        keyboard={false}
                        StrictMode={true}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header>
                            <div>กำหนดเวลาทำงาน</div>
                        </Modal.Header>
                        <Modal.Body>
                            <div className={styles.row} style={{ fontSize: 15 }}>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>พนักงาน</label>
                                        <Select
                                            options={this.state.optionempname}
                                            value={this.state.pop_empcode}
                                            onChange={(e) => this.changeempname(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                </div>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">ช่วงแรก</div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>เริ่มงาน</label>
                                        <input type="time" placeholder='09:00' className="form-control" style={{ width: '97%' }} value={this.state.pop_befstart} onChange={(e) => this.setState({ pop_befstart: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>ออกงาน</label>
                                        <input type="time" placeholder='12:00' className="form-control" value={this.state.pop_befend} onChange={(e) => this.setState({ pop_befend: e.target.value })} />
                                    </div>
                                </div>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">ช่วงหลัง</div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>เริ่มงาน</label>
                                        <input type="time" placeholder='13:00' className="form-control" style={{ width: '97%' }} value={this.state.pop_aftstart} onChange={(e) => this.setState({ pop_aftstart: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>ออกงาน</label>
                                        <input type="time" placeholder='17:00' className="form-control" value={this.state.pop_aftend} onChange={(e) => this.setState({ pop_aftend: e.target.value })} />
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">OT</div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>เริ่มงาน</label>
                                        <input type="time" placeholder='20:00' className="form-control" style={{ width: '97%' }} value={this.state.pop_otstart} onChange={(e) => this.setState({ pop_otstart: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>ออกงาน</label>
                                        <input type="time" placeholder='22:00' className="form-control" value={this.state.pop_otend} onChange={(e) => this.setState({ pop_otend: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '0.75rem', borderTop: '1px solid #dee2e6', borderBottomRightRadius: 'calc(0.3rem - 1px)', borderBottomLeftRadius: 'calc(0.3rem - 1px)' }}>
                            <div className={styles.row} style={{ width: '100%' }}>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                                <div className="col-sm-12 col-md-4 col-lg-4" style={{ marginBottom: 10 }}>
                                    <button type="button" variant="primary" className="btn btn-success" style={{ width: '100%' }} onClick={() => this.createEmployee()}>บันทึกข้อมูล</button>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4">
                                    <button variant="primary" className="btn btn-danger" style={{ width: '100%' }} onClick={() => this.showpopupcreateemployee(false)}>ยกเลิก</button>
                                </div>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                            </div>

                        </div>
                    </Modal>
                    {/* End */}

                    <div className={styles.row+' '+styles.boxres} style={{ textAlign: 'center' }}>
                        <nav className="slidemenu">
                            {
                                this.state.tabindex === '1' ?
                                    <>
                                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: 35, marginBottom: 20, }}>
                                            <div style={{ width: '50%', marginLeft: 40, marginRight: 30 }}>
                                                <span style={{ fontWeight: 'bold', fontSize: 25 }} className="slider1">TIMESHEET</span>
                                            </div>
                                            <div style={{ width: '50%' }}>
                                                <span className="slider2" style={{ fontWeight: 'bold', fontSize: 25 }} onClick={() => this.setState({ tabindex: '2' })}>PROGRESS</span>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    this.state.tabindex === '2' ?
                                        <>
                                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: 35, marginBottom: 20, }}>
                                                <div style={{ width: '50%', marginLeft: 40, marginRight: 30 }}>
                                                    <span style={{ fontWeight: 'bold', fontSize: 25 }} className="slider2" onClick={() => this.setState({ tabindex: '1' })}>TIMESHEET</span>
                                                </div>
                                                <div style={{ width: '50%' }}>
                                                    <span className="slider1" style={{ fontWeight: 'bold', fontSize: 25 }}>PROGRESS</span>
                                                </div>
                                            </div>
                                        </>
                                        : <></>
                            }
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
                                        <div style={{ fontWeight: 'bold' }}><span style={{ fontWeight: 'bold' }}>Daily Timesheet Report (1)</span></div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12">
                                        <label>*Date</label>
                                        <input type="date" min={this.state.min_date} value={this.state.txt_date} onChange={(e) => this.setState({ txt_date: e.target.value })} className="form-control" style={{ width: '97%', fontSize: 13 }} />
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12" style={{ marginTop: 5 }}>
                                        <label>*Project Name</label>
                                        <Select
                                            options={this.state.optionprojectname}
                                            value={this.state.txt_projectnamevalue}
                                            onChange={(e) => this.changeProjectname(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12" style={{ marginTop: 5 }}>
                                        <label>*ช่วง</label>
                                        <Select
                                            options={this.state.optionzone}
                                            value={this.state.txt_zonevalue}
                                            onChange={(e) => this.changeZone(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12" style={{ marginTop: 5 }}>
                                        <label>*กิจกรรม</label>
                                        <Select
                                            options={this.state.optionactivity}
                                            value={this.state.txt_activityvalue}
                                            onChange={(e) => this.changeActivity(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12" style={{ marginTop: 5 }}>
                                        <label>*พื้นที่งาน</label>
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
                                        <div style={{ width: '50%', float: 'left' }}><span style={{ fontWeight: 'bold' }}>ข้อมูลพนักงานรายวัน*</span></div>
                                        <div style={{ width: '50%', float: 'right', textAlign: 'right' }}>
                                            {
                                                this.state.txt_projectnamevalue.value && this.state.txt_zonevalue.value && this.state.txt_activityvalue.value && this.state.txt_locationvalue.value ?
                                                    this.state.item_employee ?
                                                        <i className="fa-solid fa-square-check" onClick={() => this.applyAll()} style={{ fontSize: 28, marginRight: 20, cursor: 'pointer', color: 'gray' }}></i> : <></>
                                                    : <></>
                                            }
                                            {
                                                this.state.txt_projectnamevalue.value && this.state.txt_zonevalue.value && this.state.txt_activityvalue.value && this.state.txt_locationvalue.value ?
                                                    <i className="fa-solid fa-circle-plus" style={{ fontSize: 30, color: 'gray', cursor: 'pointer' }} onClick={() => this.showpopupcreateemployee(true)}></i> : <></>
                                            }
                                        </div>
                                    </div>
                                    <table className="table" style={{ fontSize: 12, lineHeight: 1, width: '100%' }}>
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
                                                                        <td colSpan={5}>
                                                                            <span style={{ fontSize: 18 }} onClick={() => this.showpopupinput(true, index, item.empcode, item.empname)}>{item.empname}</span>
                                                                            <div className={styles.row}>
                                                                                <div className="col-lg-4 col-md-4 col-sm-4" style={{ paddingRight: 7 }}>
                                                                                    <div>ช่วงแรก</div>
                                                                                    <div>{item.befstart}-{item.befend}</div>
                                                                                </div>
                                                                                <div className="col-lg-4 col-md-4 col-sm-4" style={{ paddingRight: 7 }}>
                                                                                    <div>ช่วงหลัง</div>
                                                                                    <div>{item.atfstart}-{item.atfend}</div>
                                                                                </div>
                                                                                <div className="col-lg-4 col-md-4 col-sm-4">
                                                                                    <div>OT</div>
                                                                                    <div>{item.otstart}-{item.otend}</div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <i className="fa-solid fa-trash" style={{ fontSize: 20, color: 'red', cursor: 'pointer' }} onClick={() => this.removeEmployee(index)}></i>
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        })
                                                        :
                                                        <tr>
                                                            <td colSpan={7} style={{ textAlign: 'center' }}>ไม่พบรายชื่อ</td>
                                                        </tr>
                                                    : <></>
                                            }
                                            {/* // */}
                                        </tbody>
                                    </table>
                                </div>
                                <div className={styles.row} style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                                    <div className="col-lg-4 col-md-4 col-sm-4"></div>
                                    <div className="col-lg-4 col-md-4 col-sm-12" style={{ marginBottom: 10, }}>
                                        <label htmlFor="slide-item-2" className="btn btn-outline-success" style={{ width: '100%' }} onClick={() => this.setState({ tabindex: '2' })}>
                                            ถัดไป
                                        </label>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4"></div>
                                </div>
                            </>
                            :
                            this.state.tabindex === '2' ?
                                <>
                                    <div className={styles.row} style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20, fontSize: 15 }}>
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div style={{ fontWeight: 'bold' }}><span style={{ fontWeight: 'bold' }}>Daily Timesheet Report (2)</span></div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-12" style={{ marginTop: 5 }}>
                                            <label>เป้าหมาย</label>
                                            <input type="text" value={this.state.jobtargetvalue + ' ' + this.state.jobtargetlabel} disabled={true} className="form-control" style={{ width: '97%' }} />
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-8" style={{ marginTop: 5 }}>
                                            <label>ทำได้จริง</label>
                                            <div>
                                                <input type="text" className={styles.inpuboxs} value={this.state.txt_actual} onChange={(e) => this.setState({ txt_actual: e.target.value.replace(/[^0-9]/g, '') })} /> {this.state.jobtargetlabel}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.row} style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div style={{ width: '50%', float: 'left' }}><span style={{ fontWeight: 'bold' }}>รายละเอียดงาน/อื่นๆ</span></div>
                                            <div style={{ width: '50%', float: 'right', textAlign: 'right' }}>
                                                <i className="fa-solid fa-circle-plus" style={{ fontSize: 30, color: 'gray' }} onClick={() => this.showpopupprogress(true)}></i>
                                            </div>
                                        </div>
                                        <table className="table table-striped" style={{ fontSize: 12 }}>
                                            <thead>
                                                <tr>
                                                    <th>ลำดับ</th>
                                                    <th colSpan={3}>รายละเอียด</th>
                                                    <th>ปริมาณ</th>
                                                    <th>หน่วย</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* // */}
                                                {
                                                    this.state.itemprogress ?
                                                        this.state.itemprogress.map((item, index) => {
                                                            return (
                                                                <tr style={{ borderBottomStyle: 'hidden' }} key={index}>
                                                                    <td>1</td>
                                                                    <td colSpan={3}>{item.detail}</td>
                                                                    <td>{item.volumn}</td>
                                                                    <td>{item.unit}</td>
                                                                </tr>
                                                            )
                                                        })
                                                        :
                                                        <tr>
                                                            <td colSpan={6}>-</td>
                                                        </tr>
                                                }
                                                {/* // */}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className={styles.row} style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                                        <div className="col-lg-3 col-md-3 col-sm-12"></div>
                                        <div className="col-lg-3 col-md-3 col-sm-12" style={{ marginBottom: 10, }}>
                                            {
                                                this.state.EmployeeCode && this.state.txt_date && this.state.txt_projectnamevalue.value &&
                                                    this.state.txt_zonevalue.value && this.state.txt_projectnamevalue.activity && this.state.JobCode &&
                                                    this.state.txt_activityvalue.code && this.state.CostCenterCode && this.state.jobtargetvalue && this.state.jobtargetlabel &&
                                                    this.state.txt_actual && this.state.jobtargetlabel && this.state.item_employee ?
                                                    checkitememp[0] ?
                                                        <button type="button" className="btn btn-outline-success" style={{ width: '100%' }} disabled={true}>ส่งข้อมูล (กรอกเวลาให้ครบ)</button>
                                                        :
                                                        <button type="button" className="btn btn-outline-success" style={{ width: '100%' }} onClick={() => this.btn_confrim()}>ส่งข้อมูล</button>
                                                    :
                                                    <button type="button" className="btn btn-outline-success" style={{ width: '100%' }} disabled={true}>ส่งข้อมูล (กรอกข้อมูลให้ครบ)</button>
                                            }

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
