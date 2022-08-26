import React, { Component, Fragment } from 'react';
import styles from '../../styles/main.module.css';
import Navbarx from '../nav';
import Link from 'next/link';
import logo from '../../public/logouniq.png';
import Head from 'next/head';
import { Modal } from 'react-bootstrap-v5';
import Service from '../api/Service';
import { getCookie, setCookies } from 'cookies-next';
import Select from 'react-select';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Form, FormGroup, Label, Input, Button, Nav, NavItem, NavLink, Table } from 'reactstrap'


const stylesselect = {
    control: base => ({
        ...base,
        width: '100%'
    }),
    menu: base => ({
        ...base,
        zIndex: 111
    })
};
export default class Timesheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyitememp: '',
            keyempname: '',
            keyempcode: '',
            EmployeeCode: '',
            EmployeeDisplayName: '',
            EmplolyeeTypeCode: '',
            optionempname: [],
            pop_empcode: '',
            tabindex: '1',
            txt_date: new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + (new Date().getDate())).slice(-2),
            min_date: new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + (new Date().getDate() - 1)).slice(-2),
            max_date: new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + (new Date().getDate())).slice(-2),
            item_employee: [],
            showpopupselecttype: false,
            showpopupselectsickallday: false,
            trunOncheckboxOTbegin: false,
            optionprojectname: [],
            txt_projectnamevalue: '',
            optionzone: [],
            txt_zonevalue: '',
            optionactivity: [],
            txt_activityvalue: '',
            txt_sickallday: '',
            typemenu: '',
            showpopupsicksometime: false,
            trunSicksomtimeFristOT: false,
            txtsicksometime_fristtime: '',
            txtsicksometime_lasttime: '',
            txtsicksometime_fristot: '',
            txtsicksometime_lastot: '',
            txtsicksometime_project: '',
            txtsicksometime_zone: '',
            txtsicksometime_activity: '',
            trunSicksomtimeLastOT: false,
            txtsicksometime_fristbeforenomal: '',
            txtsicksometime_lastbeforenomal: '',
            txtsicksometime_fristbeforeprojectnomal: '',
            txtsicksometime_fristbeforezone: '',
            txtsicksometime_fristbeforeactivity: '',
            txtsicksometime_fristafternomal: '',
            txtsicksometime_lastafternomal: '',
            txtsicksometime_fristafterprojectnomal: '',
            txtsicksometime_fristafterzone: '',
            txtsicksometime_fristafteractivity: '',
            txtsicksometime_fristlastot: '',
            txtsicksometime_fristlastendot: '',
            txtsicksometime_fristlastproject: '',
            txtsicksometime_fristlastzone: '',
            txtsicksometime_fristlasactivity: '',
            showpopupnormal: false,
            trunNormalFristOT: false,
            trunNormalLastOT: false,
            txtnormal_fristot: '',
            txtnormal_lastot: '',
            txtnormal_project: '',
            txtnormal_zone: '',
            txtnormal_activity: '',
            txtnormal_fristbeforenomal: '',
            txtnormal_lastbeforenomal: '',
            txtnormal_fristbeforeprojectnomal: '',
            txtnormal_fristbeforezone: '',
            txtnormal_fristbeforeactivity: '',
            txtnormal_fristafternomal: '',
            txtnormal_lastafternomal: '',
            txtnormal_fristafterprojectnomal: '',
            txtnormal_fristafterzone: '',
            txtnormal_fristafteractivity: '',
            txtnormal_fristlastot: '',
            txtnormal_fristlastendot: '',
            txtnormal_fristlastproject: '',
            txtnormal_fristlastzone: '',
            txtnormal_fristlasactivity: '',
            detailhistory: [
                {
                    row: '1',
                    date: '23/08/2022',
                    projectname: 'โครงการรถไฟรางคู่ สัญญา 2',
                    activity: 'งาน Bottom Ballast นอกย่าน ท่าแค'
                },
                {
                    row: '2',
                    date: '22/08/2022',
                    projectname: 'โครงการรถไฟรางคู่ สัญญา 2',
                    activity: 'งาน Bottom Ballast นอกย่าน ท่าแค'
                },
                {
                    row: '3',
                    date: '21/08/2022',
                    projectname: 'โครงการรถไฟรางคู่ สัญญา 2',
                    activity: 'งาน Bottom Ballast นอกย่าน ท่าแค'
                },
            ],
            showpopuphistory: false,
            keyhistory: '',
            checkitemall: false,
            showpopupcreateemployee: false,
            trunCreateFristOT: false,
            trunCreateLastOT: false,
            txtcreate_fristot: '',
            txtcreate_lastot: '',
            txtcreate_project: '',
            txtcreate_zone: '',
            txtcreate_activity: '',
            txtcreate_fristbeforenomal: '',
            txtcreate_lastbeforenomal: '',
            txtcreate_fristbeforeprojectnomal: '',
            txtcreate_fristbeforezone: '',
            txtcreate_fristbeforeactivity: '',
            txtcreate_fristafternomal: '',
            txtcreate_lastafternomal: '',
            txtcreate_fristafterprojectnomal: '',
            txtcreate_fristafterzone: '',
            txtcreate_fristafteractivity: '',
            txtcreate_fristlastot: '',
            txtcreate_fristlastendot: '',
            txtcreate_fristlastproject: '',
            txtcreate_fristlastzone: '',
            txtcreate_fristlasactivity: '',
        }
        this.addSickallday = this.addSickallday.bind(this);
    }
    componentDidMount() {
        // window.onbeforeunload = function () { return false; }
        if (getCookie('token')) {
            this.getuserinfo();
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
            this.listEmployee();
        });
    }
    // VERSION2
    listEmployee = async () => {
        await new Service().listEmployee(getCookie('token')).then(res => {
            // console.log(JSON.stringify(res.data))
            if (res.data) {
                this.setState({
                    item_employee: res.data,
                });
            } else {
                this.setState({
                    item_employee: [],
                });
            }
        });
    }
    // PROJECTNAME
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
                });
            } else {
                this.setState({
                    optionzone: [],
                    txt_zonevalue: '',
                });
            }
        });
    }
    projectactivity = async (par_projectcode, project_location, project_activity) => {
        await new Service().projectactivity(getCookie('token'), par_projectcode, project_location, project_activity).then(res => {
            if (res.data) {
                this.setState({
                    optionactivity: res.data,
                });
            } else {
                this.setState({
                    optionactivity: '',
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


    // POPUP
    showpopupselecttype = (e, key, code, name) => {
        this.setState({
            showpopupselecttype: e,
            keyitememp: key,
            keyempcode: code,
            keyempname: name
        })
    }
    showpopupselectsickallday = (e, key, type) => {
        this.setState({
            showpopupselectsickallday: e,
            typemenu: type
        })
        this.showpopupselecttype(false, this.state.keyitememp, this.state.keyempcode, this.state.keyempname);
        this.projectmaster();
    }
    showpopupsicksometime = (e, key, type) => {
        this.setState({
            showpopupsicksometime: e,
            typemenu: type
        })
        this.showpopupselecttype(false, this.state.keyitememp, this.state.keyempcode, this.state.keyempname);
    }
    showpopupnormal = (e, key, type) => {
        this.setState({
            showpopupnormal: e,
            typemenu: type
        })
        this.showpopupselecttype(false, this.state.keyitememp, this.state.keyempcode, this.state.keyempname);
    }
    showpopuphistory = (e, key) => {
        this.setState({
            showpopuphistory: e,
        })
    }
    showpopupcreateemployee = (e) => {
        this.setState({
            showpopupcreateemployee: e,
        })
        this.listmasteremployee();
    }

    // Component
    trunSicksomtimeFristOT = (e) => {
        this.setState({
            trunSicksomtimeFristOT: e,
            txtsicksometime_fristot: '',
            txtsicksometime_lastot: '',
            txtsicksometime_project: '',
            txtsicksometime_zone: '',
            txtsicksometime_activity: '',
        });
    }
    trunSicksomtimeLastOT = (e) => {
        this.setState({
            trunSicksomtimeLastOT: e,
            txtsicksometime_fristlastot: '',
            txtsicksometime_fristlastendot: '',
            txtsicksometime_fristlastproject: '',
            txtsicksometime_fristlastzone: '',
            txtsicksometime_fristlasactivity: '',
        });
    }
    trunNormalFristOT = (e) => {
        this.setState({
            trunNormalFristOT: e,
            txtnormal_fristot: '',
            txtnormal_lastot: '',
            txtnormal_project: '',
            txtnormal_zone: '',
            txtnormal_activity: '',
        });
    }
    trunNormalLastOT = (e) => {
        this.setState({
            trunNormalLastOT: e,
            txtnormal_fristlastot: '',
            txtnormal_fristlastendot: '',
            txtnormal_fristlastproject: '',
            txtnormal_fristlastzone: '',
            txtnormal_fristlasactivity: '',
        });
    }
    trunCreateFristOT = (e) => {
        this.setState({
            trunCreateFristOT: e,
            txtcreate_fristot: '',
            txtcreate_lastot: '',
            txtcreate_project: '',
            txtcreate_zone: '',
            txtcreate_activity: '',
        });
    }
    trunCreateLastOT = (e) => {
        this.setState({
            trunCreateLastOT: e,
            txtcreate_fristlastot: '',
            txtcreate_fristlastendot: '',
            txtcreate_fristlastproject: '',
            txtcreate_fristlastzone: '',
            txtcreate_fristlasactivity: '',
        });
    }

    // ADD ITEM
    addSickallday = (event) => {
        this.showpopupselectsickallday(false, this.state.keyitememp, this.state.typemenu)
        event.preventDefault();
    }
    addSicksomtime = (event) => {
        this.showpopupsicksometime(false, this.state.keyitememp, this.state.typemenu)
        event.preventDefault();
    }
    addNormal = (event) => {
        this.showpopupnormal(false, this.state.keyitememp, this.state.typemenu)
        event.preventDefault();
    }
    addCreate = (event) => {
        this.showpopupcreateemployee(false);
        event.preventDefault();
    }

    // Remove
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
            this.setState({ checkitemall: true });
            for (let x = 0; x < item_employee.length; x++) {
                if (item_employee[x].useredit === '0') {
                    item_employee[x].befotstart = item_employee[0].befotstart;
                    item_employee[x].befotend = item_employee[0].befotend;
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
        } catch (error) {
        }
    }


    // OnChang
    changeProjectname = (e) => {
        this.setState({
            txt_projectnamevalue: e,
            txt_zonevalue: '',
            txt_activityvalue: ''
        });
        this.zonename(e.value);
    }
    changeZone = async (e) => {
        this.setState({
            txt_zonevalue: e,
            txt_activityvalue: ''
        });
        this.projectactivity(this.state.txt_projectnamevalue.value, e.value, this.state.txt_projectnamevalue.activity);
    }
    changeActivity = (e) => {
        this.setState({
            txt_activityvalue: e,
        });
    }
    changeempname = (e) => {
        this.setState({
            pop_empcode: e,
        });
    }


    // window.onbeforeunload = function () {return false;}
    render() {
        return (
            <>
                <Head>
                    <title>TIMESHEET</title>
                    <link rel="icon" type="image/png" href="../logo.png" />
                    <meta name="viewport" content="width=device-width, height=device-height, target-densitydpi=device-dpi, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"></meta>
                </Head>
                {/* <Navbarx /> */}
                {/* <hr style={{ height: 5, backgroundColor: '#8c1e21' }} /> */}


                {/* Type */}
                <Modal
                    show={this.state.showpopupselecttype}
                    backdrop="static"
                    keyboard={false}
                    StrictMode={true}
                    onHide={() => this.showpopupselecttype(false, this.state.keyitememp, this.state.keyempcode, this.state.keyempname)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <div><strong>เลือกประเภท</strong></div>
                        <div><strong>{this.state.keyempname}</strong></div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={styles.row} style={{ fontSize: 15 }}>
                            <div className={styles.row} style={{ marginBottom: 10 }}>
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                    <button type="button" className="btn btn-outline-dark" style={{ width: '100%' }} onClick={() => this.showpopupnormal(true, this.state.keyitememp, 'NORMAL')}>มาทำงาน</button>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-12" style={{ marginTop: 10 }}>
                                    <button type="button" className="btn btn-outline-dark" style={{ width: '100%' }} onClick={() => this.showpopupsicksometime(true, this.state.keyitememp, 'SICKSOMETIME')}>ลาป่วยบางช่วงเวลา</button>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-12" style={{ marginTop: 10 }}>
                                    <button type="button" className="btn btn-outline-dark" style={{ width: '100%' }} onClick={() => this.showpopupsicksometime(true, this.state.keyitememp, 'SICKSOMETIMENOMONEY')}>ลาไม่รับค่าจ้างบางช่วงเวลา</button>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-12" style={{ marginTop: 10 }}>
                                    <button type="button" className="btn btn-outline-dark" style={{ width: '100%' }} onClick={() => this.showpopupselectsickallday(true, this.state.keyitememp, 'SICKALLDAY')}>ลาป่วยทั้งวัน</button>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-12" style={{ marginTop: 10 }}>
                                    <button type="button" className="btn btn-outline-dark" style={{ width: '100%' }} onClick={() => this.showpopupselectsickallday(true, this.state.keyitememp, 'SICKALLMONEY')}>ลาไม่รับค่าจ้างทั้งวัน</button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                {/* ลาป่วยทั้งวัน / ลาไม่รับค่าจ้างทั้งวัน */}
                <Modal
                    show={this.state.showpopupselectsickallday}
                    backdrop="static"
                    keyboard={false}
                    StrictMode={true}
                    onHide={() => this.showpopupselectsickallday(false, this.state.keyitememp, this.state.typemenu)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <div><strong>รายละเอียดการลา</strong></div>
                        <div><strong>{this.state.keyempname}</strong></div>
                    </Modal.Header>
                    <form onSubmit={this.addSickallday} style={{ display: 'contents' }} autoComplete="on">
                        <Modal.Body>
                            <div className={styles.row} style={{ fontSize: 15 }}>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>โครงการ</label>
                                        <Select
                                            options={this.state.optionprojectname}
                                            value={this.state.txt_projectnamevalue}
                                            onChange={(e) => this.changeProjectname(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>สถานที่</label>
                                        <Select
                                            options={this.state.optionzone}
                                            value={this.state.txt_zonevalue}
                                            onChange={(e) => this.changeZone(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>กิจกรรม</label>
                                        <Select
                                            options={this.state.optionactivity}
                                            value={this.state.txt_activityvalue}
                                            onChange={(e) => this.changeActivity(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>หมายเหตุ*</label>
                                        <textarea className="form-control" required={true} row={4} value={this.state.txt_sickallday} onChange={(e) => this.setState({ txt_sickallday: e.target.value })}></textarea>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '0.75rem', borderTop: '1px solid #dee2e6', borderBottomRightRadius: 'calc(0.3rem - 1px)', borderBottomLeftRadius: 'calc(0.3rem - 1px)' }}>
                            <div className={styles.row} style={{ width: '100%' }}>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                                <div className="col-sm-12 col-md-4 col-lg-4" style={{ marginBottom: 10 }}>
                                    {
                                        this.state.txt_projectnamevalue && this.state.txt_zonevalue && this.state.txt_activityvalue && this.state.txt_sickallday ?
                                            <button type="submit" variant="primary" className="btn btn-danger" style={{ width: '100%' }}>ตกลง</button>
                                            :
                                            <button type="button" variant="primary" className="btn btn-danger" style={{ width: '100%' }} disabled={true}>ตกลง (กรอกข้อมูลให้ครบ)</button>
                                    }

                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4">
                                    <button variant="primary" className="btn btn-light" style={{ width: '100%' }} onClick={() => this.showpopupselectsickallday(false, this.state.keyitememp, this.state.typemenu)}>ยกเลิก</button>
                                </div>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                            </div>
                        </div>
                    </form>
                </Modal>

                {/* ลาป่วยบางช่วงเวลา / ลาไม่รับค่าจ้างบางช่วงเวลา */}
                <Modal
                    show={this.state.showpopupsicksometime}
                    backdrop="static"
                    keyboard={false}
                    StrictMode={true}
                    onHide={() => this.showpopupsicksometime(false, this.state.keyitememp, this.state.typemenu)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <div><strong>รายละเอียด {this.state.typemenu}</strong></div>
                        <div><strong>{this.state.keyempname}</strong></div>
                    </Modal.Header>
                    <form onSubmit={this.addSicksomtime} style={{ display: 'contents' }} autoComplete="on">
                        <Modal.Body>
                            <div className={styles.row} style={{ fontSize: 15 }}>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12"><strong>ช่วงเวลาการลา</strong></div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>เริ่ม</label>
                                        <input type="time" placeholder='08:00' className="form-control" style={{ width: '97%' }} value={this.state.txtsicksometime_fristtime} onChange={(e) => this.setState({ txtsicksometime_fristtime: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>สิ้นสุด</label>
                                        <input type="time" required={this.state.txtsicksometime_fristtime ? true : false} placeholder='12:00' className="form-control" value={this.state.txtsicksometime_lasttime} onChange={(e) => this.setState({ txtsicksometime_lasttime: e.target.value })} />
                                    </div>
                                </div>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <span onClick={() => this.trunSicksomtimeFristOT(!this.state.trunSicksomtimeFristOT)}>
                                            <i className={this.state.trunSicksomtimeFristOT ? 'fa-solid fa-square-check squareboxcheck' : 'fa-solid fa-square squareboxuncheck'}></i> <strong>โอที</strong> (ก่อนเริ่มงาน)
                                        </span>
                                    </div>
                                    {
                                        this.state.trunSicksomtimeFristOT ?
                                            <>
                                                <div className={styles.row} style={{ marginBottom: 15 }}>
                                                    <div style={{ width: '50%', float: 'left' }}>
                                                        <label>เริ่ม</label>
                                                        <input type="time" placeholder='06:00' className="form-control" style={{ width: '97%' }} value={this.state.txtsicksometime_fristot} onChange={(e) => this.setState({ txtsicksometime_fristot: e.target.value })} />
                                                    </div>
                                                    <div style={{ width: '50%', float: 'right' }}>
                                                        <label>สิ้นสุด</label>
                                                        <input type="time" placeholder='08:00' required={this.state.txtsicksometime_fristot ? true : false} className="form-control" value={this.state.txtsicksometime_lastot} onChange={(e) => this.setState({ txtsicksometime_lastot: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className={styles.row}>
                                                    <div style={{ width: '50%', float: 'left' }}>
                                                        <label>โครงการ</label>
                                                        <input type="text" className="form-control" style={{ width: '97%' }} value={this.state.txtsicksometime_project} onChange={(e) => this.setState({ txtsicksometime_project: e.target.value })} />
                                                    </div>
                                                    <div style={{ width: '50%', float: 'right' }}>
                                                        <label>สถานที่</label>
                                                        <input type="text" className="form-control" value={this.state.txtsicksometime_zone} onChange={(e) => this.setState({ txtsicksometime_zone: e.target.value })} />
                                                    </div>
                                                    <div style={{ width: '100%' }}>
                                                        <label>กิจกรรม</label>
                                                        <input type="text" className="form-control" value={this.state.txtsicksometime_activity} onChange={(e) => this.setState({ txtsicksometime_activity: e.target.value })} />
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <></>
                                    }
                                </div>
                                <div style={{ border: '1px solid', height: 2, width: '100%', marginBottom: 5 }}></div>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12"><strong>ช่วงแรก</strong></div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>เริ่ม</label>
                                        <input type="time" placeholder='08:00' className="form-control" style={{ width: '97%' }} value={this.state.txtsicksometime_fristbeforenomal} onChange={(e) => this.setState({ txtsicksometime_fristbeforenomal: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>สิ้นสุด</label>
                                        <input type="time" required={this.state.txtsicksometime_fristbeforenomal ? true : false} placeholder='12:00' className="form-control" value={this.state.txtsicksometime_lastbeforenomal} onChange={(e) => this.setState({ txtsicksometime_lastbeforenomal: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>โครงการ</label>
                                        <input type="text" className="form-control" style={{ width: '97%' }} value={this.state.txtsicksometime_fristbeforeprojectnomal} onChange={(e) => this.setState({ txtsicksometime_fristbeforeprojectnomal: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>สถานที่</label>
                                        <input type="text" className="form-control" value={this.state.txtsicksometime_fristbeforezone} onChange={(e) => this.setState({ txtsicksometime_fristbeforezone: e.target.value })} />
                                    </div>
                                    <div style={{ width: '100%' }}>
                                        <label>กิจกรรม</label>
                                        <input type="text" className="form-control" value={this.state.txtsicksometime_fristbeforeactivity} onChange={(e) => this.setState({ txtsicksometime_fristbeforeactivity: e.target.value })} />
                                    </div>
                                </div>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12"><strong>ช่วงหลัง</strong></div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>เริ่ม</label>
                                        <input type="time" placeholder='13:00' className="form-control" style={{ width: '97%' }} value={this.state.txtsicksometime_fristafternomal} onChange={(e) => this.setState({ txtsicksometime_fristafternomal: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>สิ้นสุด</label>
                                        <input type="time" required={this.state.txtsicksometime_fristafternomal ? true : false} placeholder='17:00' className="form-control" value={this.state.txtsicksometime_lastafternomal} onChange={(e) => this.setState({ txtsicksometime_lastafternomal: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>โครงการ</label>
                                        <input type="text" className="form-control" style={{ width: '97%' }} value={this.state.txtsicksometime_fristafterprojectnomal} onChange={(e) => this.setState({ txtsicksometime_fristafterprojectnomal: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>สถานที่</label>
                                        <input type="text" className="form-control" value={this.state.txtsicksometime_fristafterzone} onChange={(e) => this.setState({ txtsicksometime_fristafterzone: e.target.value })} />
                                    </div>
                                    <div style={{ width: '100%' }}>
                                        <label>กิจกรรม</label>
                                        <input type="text" className="form-control" value={this.state.txtsicksometime_fristafteractivity} onChange={(e) => this.setState({ txtsicksometime_fristafteractivity: e.target.value })} />
                                    </div>
                                </div>
                                <div style={{ border: '1px solid', height: 2, width: '100%', marginBottom: 5 }}></div>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <span onClick={() => this.trunSicksomtimeLastOT(!this.state.trunSicksomtimeLastOT)}>
                                            <i className={this.state.trunSicksomtimeLastOT ? 'fa-solid fa-square-check squareboxcheck' : 'fa-solid fa-square squareboxuncheck'}></i> <strong>โอที</strong> (หลังเลิกงาน)
                                        </span>
                                    </div>
                                    {
                                        this.state.trunSicksomtimeLastOT ?
                                            <div className={styles.row} style={{ marginBottom: 10 }}>
                                                <div style={{ width: '50%', float: 'left' }}>
                                                    <label>เริ่ม</label>
                                                    <input type="time" placeholder='20:00' className="form-control" style={{ width: '97%' }} value={this.state.txtsicksometime_fristlastot} onChange={(e) => this.setState({ txtsicksometime_fristlastot: e.target.value })} />
                                                </div>
                                                <div style={{ width: '50%', float: 'right' }}>
                                                    <label>สิ้นสุด</label>
                                                    <input type="time" placeholder='22:00' className="form-control" required={this.state.txtsicksometime_fristlastot ? true : false} value={this.state.txtsicksometime_fristlastendot} onChange={(e) => this.setState({ txtsicksometime_fristlastendot: e.target.value })} />
                                                </div>
                                                <div style={{ width: '50%', float: 'left' }}>
                                                    <label>โครงการ</label>
                                                    <input type="text" className="form-control" style={{ width: '97%' }} value={this.state.txtsicksometime_fristlastproject} onChange={(e) => this.setState({ txtsicksometime_fristlastproject: e.target.value })} />
                                                </div>
                                                <div style={{ width: '50%', float: 'right' }}>
                                                    <label>สถานที่</label>
                                                    <input type="text" className="form-control" value={this.state.txtsicksometime_fristlastzone} onChange={(e) => this.setState({ txtsicksometime_fristlastzone: e.target.value })} />
                                                </div>
                                                <div style={{ width: '100%' }}>
                                                    <label>กิจกรรม</label>
                                                    <input type="text" className="form-control" value={this.state.txtsicksometime_fristlasactivity} onChange={(e) => this.setState({ txtsicksometime_fristlasactivity: e.target.value })} />
                                                </div>
                                            </div>
                                            :
                                            <></>
                                    }
                                </div>
                            </div>
                        </Modal.Body>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '0.75rem', borderTop: '1px solid #dee2e6', borderBottomRightRadius: 'calc(0.3rem - 1px)', borderBottomLeftRadius: 'calc(0.3rem - 1px)' }}>
                            <div className={styles.row} style={{ width: '100%' }}>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                                <div className="col-sm-12 col-md-4 col-lg-4" style={{ marginBottom: 10 }}>
                                    <button type="submit" variant="primary" className="btn btn-danger" style={{ width: '100%' }}>ตกลง</button>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4">
                                    <button variant="primary" className="btn btn-light" style={{ width: '100%' }} onClick={() => this.showpopupsicksometime(false, this.state.keyitememp, this.state.typemenu)}>ยกเลิก</button>
                                </div>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                            </div>
                        </div>
                    </form>
                </Modal>

                {/* มาทำงาน */}
                <Modal
                    show={this.state.showpopupnormal}
                    backdrop="static"
                    keyboard={false}
                    StrictMode={true}
                    onHide={() => this.showpopupnormal(false, this.state.keyitememp, this.state.typemenu)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <div><strong>รายละเอียด {this.state.typemenu}</strong></div>
                        <div><strong>{this.state.keyempname}</strong></div>
                    </Modal.Header>
                    <form onSubmit={this.addNormal} style={{ display: 'contents' }} autoComplete="on">
                        <Modal.Body>
                            <div className={styles.row} style={{ fontSize: 15 }}>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <span onClick={() => this.trunNormalFristOT(!this.state.trunNormalFristOT)}>
                                            <i className={this.state.trunNormalFristOT ? 'fa-solid fa-square-check squareboxcheck' : 'fa-solid fa-square squareboxuncheck'}></i> <strong>โอที</strong> (ก่อนเริ่มงาน)
                                        </span>
                                    </div>
                                    {
                                        this.state.trunNormalFristOT ?
                                            <>
                                                <div className={styles.row} style={{ marginBottom: 15 }}>
                                                    <div style={{ width: '50%', float: 'left' }}>
                                                        <label>เริ่ม</label>
                                                        <input type="time" placeholder='06:00' className="form-control" style={{ width: '97%' }} value={this.state.txtnormal_fristot} onChange={(e) => this.setState({ txtnormal_fristot: e.target.value })} />
                                                    </div>
                                                    <div style={{ width: '50%', float: 'right' }}>
                                                        <label>สิ้นสุด</label>
                                                        <input type="time" placeholder='08:00' required={this.state.txtnormal_fristot ? true : false} className="form-control" value={this.state.txtnormal_lastot} onChange={(e) => this.setState({ txtnormal_lastot: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className={styles.row}>
                                                    <div style={{ width: '50%', float: 'left' }}>
                                                        <label>โครงการ</label>
                                                        <input type="text" className="form-control" style={{ width: '97%' }} value={this.state.txtnormal_project} onChange={(e) => this.setState({ txtnormal_project: e.target.value })} />
                                                    </div>
                                                    <div style={{ width: '50%', float: 'right' }}>
                                                        <label>สถานที่</label>
                                                        <input type="text" className="form-control" value={this.state.txtnormal_zone} onChange={(e) => this.setState({ txtnormal_zone: e.target.value })} />
                                                    </div>
                                                    <div style={{ width: '100%' }}>
                                                        <label>กิจกรรม</label>
                                                        <input type="text" className="form-control" value={this.state.txtnormal_activity} onChange={(e) => this.setState({ txtnormal_activity: e.target.value })} />
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <></>
                                    }
                                </div>
                                <div style={{ border: '1px solid', height: 2, width: '100%', marginBottom: 5 }}></div>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12"><strong>ช่วงแรก</strong></div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>เริ่ม</label>
                                        <input type="time" placeholder='08:00' className="form-control" style={{ width: '97%' }} value={this.state.txtnormal_fristbeforenomal} onChange={(e) => this.setState({ txtnormal_fristbeforenomal: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>สิ้นสุด</label>
                                        <input type="time" required={this.state.txtnormal_fristbeforenomal ? true : false} placeholder='12:00' className="form-control" value={this.state.txtnormal_lastbeforenomal} onChange={(e) => this.setState({ txtnormal_lastbeforenomal: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>โครงการ</label>
                                        <input type="text" className="form-control" style={{ width: '97%' }} value={this.state.txtnormal_fristbeforeprojectnomal} onChange={(e) => this.setState({ txtnormal_fristbeforeprojectnomal: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>สถานที่</label>
                                        <input type="text" className="form-control" value={this.state.txtnormal_fristbeforezone} onChange={(e) => this.setState({ txtnormal_fristbeforezone: e.target.value })} />
                                    </div>
                                    <div style={{ width: '100%' }}>
                                        <label>กิจกรรม</label>
                                        <input type="text" className="form-control" value={this.state.txtnormal_fristbeforeactivity} onChange={(e) => this.setState({ txtnormal_fristbeforeactivity: e.target.value })} />
                                    </div>
                                </div>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12"><strong>ช่วงหลัง</strong></div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>เริ่ม</label>
                                        <input type="time" placeholder='13:00' className="form-control" style={{ width: '97%' }} value={this.state.txtnormal_fristafternomal} onChange={(e) => this.setState({ txtnormal_fristafternomal: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>สิ้นสุด</label>
                                        <input type="time" required={this.state.txtnormal_fristafternomal ? true : false} placeholder='17:00' className="form-control" value={this.state.txtnormal_lastafternomal} onChange={(e) => this.setState({ txtnormal_lastafternomal: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>โครงการ</label>
                                        <input type="text" className="form-control" style={{ width: '97%' }} value={this.state.txtnormal_fristafterprojectnomal} onChange={(e) => this.setState({ txtnormal_fristafterprojectnomal: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>สถานที่</label>
                                        <input type="text" className="form-control" value={this.state.txtnormal_fristafterzone} onChange={(e) => this.setState({ txtnormal_fristafterzone: e.target.value })} />
                                    </div>
                                    <div style={{ width: '100%' }}>
                                        <label>กิจกรรม</label>
                                        <input type="text" className="form-control" value={this.state.txtnormal_fristafteractivity} onChange={(e) => this.setState({ txtnormal_fristafteractivity: e.target.value })} />
                                    </div>
                                </div>
                                <div style={{ border: '1px solid', height: 2, width: '100%', marginBottom: 5 }}></div>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <span onClick={() => this.trunNormalLastOT(!this.state.trunNormalLastOT)}>
                                            <i className={this.state.trunNormalLastOT ? 'fa-solid fa-square-check squareboxcheck' : 'fa-solid fa-square squareboxuncheck'}></i> <strong>โอที</strong> (หลังเลิกงาน)
                                        </span>
                                    </div>
                                    {
                                        this.state.trunNormalLastOT ?
                                            <div className={styles.row} style={{ marginBottom: 10 }}>
                                                <div style={{ width: '50%', float: 'left' }}>
                                                    <label>เริ่ม</label>
                                                    <input type="time" placeholder='20:00' className="form-control" style={{ width: '97%' }} value={this.state.txtnormal_fristlastot} onChange={(e) => this.setState({ txtnormal_fristlastot: e.target.value })} />
                                                </div>
                                                <div style={{ width: '50%', float: 'right' }}>
                                                    <label>สิ้นสุด</label>
                                                    <input type="time" placeholder='22:00' className="form-control" required={this.state.txtnormal_fristlastot ? true : false} value={this.state.txtnormal_fristlastendot} onChange={(e) => this.setState({ txtnormal_fristlastendot: e.target.value })} />
                                                </div>
                                                <div style={{ width: '50%', float: 'left' }}>
                                                    <label>โครงการ</label>
                                                    <input type="text" className="form-control" style={{ width: '97%' }} value={this.state.txtnormal_fristlastproject} onChange={(e) => this.setState({ txtnormal_fristlastproject: e.target.value })} />
                                                </div>
                                                <div style={{ width: '50%', float: 'right' }}>
                                                    <label>สถานที่</label>
                                                    <input type="text" className="form-control" value={this.state.txtnormal_fristlastzone} onChange={(e) => this.setState({ txtnormal_fristlastzone: e.target.value })} />
                                                </div>
                                                <div style={{ width: '100%' }}>
                                                    <label>กิจกรรม</label>
                                                    <input type="text" className="form-control" value={this.state.txtnormal_fristlasactivity} onChange={(e) => this.setState({ txtnormal_fristlasactivity: e.target.value })} />
                                                </div>
                                            </div>
                                            :
                                            <></>
                                    }
                                </div>
                            </div>
                        </Modal.Body>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '0.75rem', borderTop: '1px solid #dee2e6', borderBottomRightRadius: 'calc(0.3rem - 1px)', borderBottomLeftRadius: 'calc(0.3rem - 1px)' }}>
                            <div className={styles.row} style={{ width: '100%' }}>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                                <div className="col-sm-12 col-md-4 col-lg-4" style={{ marginBottom: 10 }}>
                                    <button type="submit" variant="primary" className="btn btn-danger" style={{ width: '100%' }}>ตกลง</button>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4">
                                    <button variant="primary" className="btn btn-light" style={{ width: '100%' }} onClick={() => this.showpopupnormal(false, this.state.keyitememp, this.state.typemenu)}>ยกเลิก</button>
                                </div>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                            </div>
                        </div>
                    </form>
                </Modal>

                {/* ประวัติข้อมูลย้อนหลัง */}
                <Modal
                    show={this.state.showpopuphistory}
                    backdrop="static"
                    keyboard={false}
                    StrictMode={true}
                    onHide={() => this.showpopuphistory(false, this.state.keyhistory)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <div><strong>รายกาย้อนหลัง</strong></div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={styles.row} style={{ fontSize: 15 }}>
                            <div className={styles.row} style={{ marginBottom: 10 }}>
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>รหัสพนักงาน</th>
                                                <th>ชื่อสกุล</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1904</td>
                                                <td>
                                                    <div>KYAW LIN AUNG จอ ลิน อ่อง</div>
                                                    <div>โอที(ก่อน)</div>
                                                    <div>ช่วงแรก</div>
                                                    <div>ช่วงหลัง</div>
                                                    <div>โอที(หลัง)</div>
                                                    <div>การลา</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>1921</td>
                                                <td>
                                                    <div>ZIN KO OO ซิน โก อู</div>
                                                    <div>โอที(ก่อน)</div>
                                                    <div>ช่วงแรก</div>
                                                    <div>ช่วงหลัง</div>
                                                    <div>โอที(หลัง)</div>
                                                    <div>การลา</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                {/* มาทำงาน */}
                <Modal
                    show={this.state.showpopupcreateemployee}
                    backdrop="static"
                    keyboard={false}
                    StrictMode={true}
                    onHide={() => this.showpopupcreateemployee(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <div><strong>รายละเอียด</strong></div>
                    </Modal.Header>
                    <form onSubmit={this.addCreate} style={{ display: 'contents' }} autoComplete="on">
                        <Modal.Body>
                            <div className={styles.row} style={{ fontSize: 15 }}>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label><strong>พนักงาน</strong></label>
                                        <Select
                                            options={this.state.optionempname}
                                            value={this.state.pop_empcode}
                                            onChange={(e) => this.changeempname(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{marginTop: 10,}}>
                                        <span onClick={() => this.trunCreateFristOT(!this.state.trunCreateFristOT)}>
                                            <i className={this.state.trunCreateFristOT ? 'fa-solid fa-square-check squareboxcheck' : 'fa-solid fa-square squareboxuncheck'}></i> <strong>โอที</strong> (ก่อนเริ่มงาน)
                                        </span>
                                    </div>
                                    {
                                        this.state.trunCreateFristOT ?
                                            <>
                                                <div className={styles.row} style={{ marginBottom: 15 }}>
                                                    <div style={{ width: '50%', float: 'left' }}>
                                                        <label>เริ่ม</label>
                                                        <input type="time" placeholder='06:00' className="form-control" style={{ width: '97%' }} value={this.state.txtcreate_fristot} onChange={(e) => this.setState({ txtcreate_fristot: e.target.value })} />
                                                    </div>
                                                    <div style={{ width: '50%', float: 'right' }}>
                                                        <label>สิ้นสุด</label>
                                                        <input type="time" placeholder='08:00' required={this.state.txtcreate_fristot ? true : false} className="form-control" value={this.state.txtcreate_lastot} onChange={(e) => this.setState({ txtcreate_lastot: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className={styles.row}>
                                                    <div style={{ width: '50%', float: 'left' }}>
                                                        <label>โครงการ</label>
                                                        <input type="text" className="form-control" style={{ width: '97%' }} value={this.state.txtcreate_project} onChange={(e) => this.setState({ txtcreate_project: e.target.value })} />
                                                    </div>
                                                    <div style={{ width: '50%', float: 'right' }}>
                                                        <label>สถานที่</label>
                                                        <input type="text" className="form-control" value={this.state.txtcreate_zone} onChange={(e) => this.setState({ txtcreate_zone: e.target.value })} />
                                                    </div>
                                                    <div style={{ width: '100%' }}>
                                                        <label>กิจกรรม</label>
                                                        <input type="text" className="form-control" value={this.state.txtcreate_activity} onChange={(e) => this.setState({ txtcreate_activity: e.target.value })} />
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <></>
                                    }
                                </div>
                                <div style={{ border: '1px solid', height: 2, width: '100%', marginBottom: 5 }}></div>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12"><strong>ช่วงแรก</strong></div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>เริ่ม</label>
                                        <input type="time" placeholder='08:00' className="form-control" style={{ width: '97%' }} value={this.state.txtcreate_fristbeforenomal} onChange={(e) => this.setState({ txtcreate_fristbeforenomal: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>สิ้นสุด</label>
                                        <input type="time" required={this.state.txtcreate_fristbeforenomal ? true : false} placeholder='12:00' className="form-control" value={this.state.txtcreate_lastbeforenomal} onChange={(e) => this.setState({ txtcreate_lastbeforenomal: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>โครงการ</label>
                                        <input type="text" className="form-control" style={{ width: '97%' }} value={this.state.txtcreate_fristbeforeprojectnomal} onChange={(e) => this.setState({ txtcreate_fristbeforeprojectnomal: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>สถานที่</label>
                                        <input type="text" className="form-control" value={this.state.txtcreate_fristbeforezone} onChange={(e) => this.setState({ txtcreate_fristbeforezone: e.target.value })} />
                                    </div>
                                    <div style={{ width: '100%' }}>
                                        <label>กิจกรรม</label>
                                        <input type="text" className="form-control" value={this.state.txtcreate_fristbeforeactivity} onChange={(e) => this.setState({ txtcreate_fristbeforeactivity: e.target.value })} />
                                    </div>
                                </div>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12"><strong>ช่วงหลัง</strong></div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>เริ่ม</label>
                                        <input type="time" placeholder='13:00' className="form-control" style={{ width: '97%' }} value={this.state.txtcreate_fristafternomal} onChange={(e) => this.setState({ txtcreate_fristafternomal: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>สิ้นสุด</label>
                                        <input type="time" required={this.state.txtcreate_fristafternomal ? true : false} placeholder='17:00' className="form-control" value={this.state.txtcreate_lastafternomal} onChange={(e) => this.setState({ txtcreate_lastafternomal: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <label>โครงการ</label>
                                        <input type="text" className="form-control" style={{ width: '97%' }} value={this.state.txtcreate_fristafterprojectnomal} onChange={(e) => this.setState({ txtcreate_fristafterprojectnomal: e.target.value })} />
                                    </div>
                                    <div style={{ width: '50%', float: 'right' }}>
                                        <label>สถานที่</label>
                                        <input type="text" className="form-control" value={this.state.txtcreate_fristafterzone} onChange={(e) => this.setState({ txtcreate_fristafterzone: e.target.value })} />
                                    </div>
                                    <div style={{ width: '100%' }}>
                                        <label>กิจกรรม</label>
                                        <input type="text" className="form-control" value={this.state.txtcreate_fristafteractivity} onChange={(e) => this.setState({ txtcreate_fristafteractivity: e.target.value })} />
                                    </div>
                                </div>
                                <div style={{ border: '1px solid', height: 2, width: '100%', marginBottom: 5 }}></div>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <span onClick={() => this.trunCreateLastOT(!this.state.trunCreateLastOT)}>
                                            <i className={this.state.trunCreateLastOT ? 'fa-solid fa-square-check squareboxcheck' : 'fa-solid fa-square squareboxuncheck'}></i> <strong>โอที</strong> (หลังเลิกงาน)
                                        </span>
                                    </div>
                                    {
                                        this.state.trunCreateLastOT ?
                                            <div className={styles.row} style={{ marginBottom: 10 }}>
                                                <div style={{ width: '50%', float: 'left' }}>
                                                    <label>เริ่ม</label>
                                                    <input type="time" placeholder='20:00' className="form-control" style={{ width: '97%' }} value={this.state.txtcreate_fristlastot} onChange={(e) => this.setState({ txtcreate_fristlastot: e.target.value })} />
                                                </div>
                                                <div style={{ width: '50%', float: 'right' }}>
                                                    <label>สิ้นสุด</label>
                                                    <input type="time" placeholder='22:00' className="form-control" required={this.state.txtcreate_fristlastot ? true : false} value={this.state.txtcreate_fristlastendot} onChange={(e) => this.setState({ txtcreate_fristlastendot: e.target.value })} />
                                                </div>
                                                <div style={{ width: '50%', float: 'left' }}>
                                                    <label>โครงการ</label>
                                                    <input type="text" className="form-control" style={{ width: '97%' }} value={this.state.txtcreate_fristlastproject} onChange={(e) => this.setState({ txtcreate_fristlastproject: e.target.value })} />
                                                </div>
                                                <div style={{ width: '50%', float: 'right' }}>
                                                    <label>สถานที่</label>
                                                    <input type="text" className="form-control" value={this.state.txtcreate_fristlastzone} onChange={(e) => this.setState({ txtcreate_fristlastzone: e.target.value })} />
                                                </div>
                                                <div style={{ width: '100%' }}>
                                                    <label>กิจกรรม</label>
                                                    <input type="text" className="form-control" value={this.state.txtcreate_fristlasactivity} onChange={(e) => this.setState({ txtcreate_fristlasactivity: e.target.value })} />
                                                </div>
                                            </div>
                                            :
                                            <></>
                                    }
                                </div>
                            </div>
                        </Modal.Body>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '0.75rem', borderTop: '1px solid #dee2e6', borderBottomRightRadius: 'calc(0.3rem - 1px)', borderBottomLeftRadius: 'calc(0.3rem - 1px)' }}>
                            <div className={styles.row} style={{ width: '100%' }}>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                                <div className="col-sm-12 col-md-4 col-lg-4" style={{ marginBottom: 10 }}>
                                    <button type="submit" variant="primary" className="btn btn-danger" style={{ width: '100%' }}>ตกลง</button>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4">
                                    <button variant="primary" className="btn btn-light" style={{ width: '100%' }} onClick={() => this.showpopupcreateemployee(false)}>ยกเลิก</button>
                                </div>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                            </div>
                        </div>
                    </form>
                </Modal>



                {/* Header */}
                <div className="container" style={{ backgroundColor: '#8e1e23', paddingBottom: 31 }}>
                    {/* Menu Tabs */}
                    <div style={{ textAlign: 'center', fontSize: 20, marginBottom: 15, color: 'white', paddingTop: 20, display: 'flex', flex: 1, flexDirection: 'row' }}>
                        <div style={{ width: '50%', textAlign: 'left', fontSize: 20, marginTop: -5 }}>TIMESHEET</div>
                        <div style={{ width: '50%', textAlign: 'right' }}>{this.state.EmployeeCode} {this.state.EmployeeDisplayName}</div>
                    </div>
                    {
                        this.state.tabindex === '1' ?
                            <div onClick={() => this.setState({ tabindex: '1' })} style={{ backgroundColor: 'white', height: 45, width: '50%', position: 'absolute', marginTop: -4, borderRadius: 11, textAlign: 'center', paddingTop: 5, marginLeft: 0, fontWeight: 'bold' }}>ลงเวลาปฎิบัติงาน</div>
                            :
                            <div onClick={() => this.setState({ tabindex: '1' })} style={{ height: 45, width: '50%', position: 'absolute', marginTop: -4, borderRadius: 11, textAlign: 'center', paddingTop: 5, marginLeft: 0, color: 'white', fontWeight: 'bold' }}>ลงเวลาปฎิบัติงาน</div>

                    }
                    {
                        this.state.tabindex === '2' ?
                            <div onClick={() => this.setState({ tabindex: '2' })} style={{ backgroundColor: 'white', height: 45, width: '50%', position: 'absolute', marginTop: -4, borderRadius: 11, textAlign: 'center', paddingTop: 5, marginLeft: '44.5%', fontWeight: 'bold' }}>ประวัติรายการ</div>
                            :
                            <div onClick={() => this.setState({ tabindex: '2' })} style={{ height: 45, width: '50%', position: 'absolute', marginTop: -4, borderRadius: 11, textAlign: 'center', paddingTop: 5, marginLeft: '44.5%', color: 'white', fontWeight: 'bold' }}>ประวัติรายการ</div>
                    }
                </div>
                {
                    this.state.tabindex === '1' ?
                        <div className="container" style={{ marginTop: 20 }}>
                            <div className={styles.row}>
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                    <label>วันที่ <span className="text-danger">*</span></label>
                                    <input className="form-control" type="date" min={this.state.min_date} max={this.state.max_date} value={this.state.txt_date} onChange={(e) => this.setState({ txt_date: e.target.value })} />
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-12" style={{ marginTop: 10 }}>
                                    <div style={{display: 'flex', flex: 1, flexDirection: 'row', width: '100%' }}>
                                        <div style={{width: '50%', fontSize: 18}}>รายชื่อพนักงานรายวัน</div>
                                        <div style={{width: '50%', textAlign: 'right'}}>
                                            <span onClick={(e) => this.showpopupcreateemployee(true)}>
                                                <i className="fa-solid fa-calendar-plus"></i> เพิ่มพนักงาน
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            this.state.item_employee ?
                                                <>
                                                    {
                                                        this.state.checkitemall ? 
                                                            <div onClick={() => this.applyAll()}>
                                                                <i className={'squareboxcheck fa-solid fa-arrows-spin'}></i> ใช้เวลาด้วยกันทั้งหมด
                                                            </div>
                                                            :
                                                            <div onClick={() => this.applyAll()}>
                                                                <i className={'squareboxuncheck fa-solid fa-square'}></i> ใช้เวลาด้วยกันทั้งหมด
                                                            </div>
                                                    }
                                                </>
                                                : <></>
                                        }
                                    </div>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>รหัส</th>
                                                <th>ชื่อสกุล</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.item_employee ?
                                                    this.state.item_employee.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{item.EmployeeCode}</td>
                                                                <td>
                                                                    <div>{item.EmployeeName}</div>
                                                                    <div>โอที(ก่อน)</div>
                                                                    <div>ช่วงแรก</div>
                                                                    <div>ช่วงหลัง</div>
                                                                    <div>โอที(หลัง)</div>
                                                                    <div>การลา</div>
                                                                </td>
                                                                <td><i onClick={() => this.showpopupselecttype(true, index, item.EmployeeCode, item.EmployeeName)} className="fa-solid fa-file-circle-plus" style={{ fontSize: 20, color: '#8e1e23', cursor: 'pointer' }}></i></td>
                                                                <td><i onClick={() => this.removeEmployee(index)} className="fa-solid fa-trash" style={{ fontSize: 20, color: '#8e1e23', cursor: 'pointer' }}></i></td>
                                                            </tr>
                                                        )
                                                    }) : <></>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className={styles.row} style={{marginTop: 20}}>
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                    <button type="button" className="btn btn-outline-success" style={{width: '100%'}}>ส่งข้อมูล</button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="container" style={{ marginTop: 20 }}>
                            <div className={styles.row}>
                                <div className="col-sm-12 col-md-12 col-lg-12">รายการส่งข้อมูล</div>
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>วันที่</th>
                                                <th>โครงการ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.detailhistory ?
                                                    this.state.detailhistory.map((item, index) => {
                                                        return (
                                                            <tr key={index} onClick={() => this.showpopuphistory(true, index)}>
                                                                <td>{item.date}</td>
                                                                <td>
                                                                    <div>{item.projectname}</div>
                                                                    <div>{item.activity}</div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    <tr><td colSpan={2} style={{ textAlign: 'center' }}>ไม่พบข้อมูลย้อนหลัง</td></tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                }







                <br /><br /><br />
            </>
        );
    }
}
