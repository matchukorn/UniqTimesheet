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
import { BothBordeds, Submit, Cancel } from "../../constant";


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
            max_date: new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + (new Date().getDate())).slice(-2),
            optionprojectname: [],
            txt_projectnamevalue: '',
            optionzone: [],
            txt_zonevalue: '',
            optionactivity: [],
            txt_activityvalue: '',
            optionlocation: [],
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
            pop_progresskm: '',
            pop_progressunit: '',
            pop_progressvolumn: '',
            item_employee: [],
            activitycode: '',
            checkitemall: false,
            popupeditprogress: false,
            idItemprogress: '',
            addotinput: false,
            addotinputedit: false,
            popupotBeforestart: '',
            popupotBeforeend: '',
            leavesick: '0',
            txt_sickstart: '',
            txt_sickend: '',
            trunONto: false,
        }
        this.confrimchangtime = this.confrimchangtime.bind(this);
        this.createEmployee = this.createEmployee.bind(this);
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
            txt_activityvalue: '',
            activitycode: e.activity,
            checkitemall: false
        });
        this.zonename(e.value);
    }
    changeZone = (e) => {
        this.setState({
            txt_zonevalue: e,
            txt_activityvalue: '',
            activitycode: '',
            txt_locationvalue: '',
            checkitemall: false
        });
        this.projectactivity(this.state.txt_projectnamevalue.value, e.value, this.state.txt_projectnamevalue.activity);
    }
    changeActivity = (e) => {
        this.setState({
            txt_activityvalue: e,
            checkitemall: false
        });
        this.employeesubactivity(e.ProjectActivityCode, e.ProjectSubActivityCode);
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
                leavesick: item_employee[index].leavesick,
                txt_sickstart: item_employee[index].sickstart,
                txt_sickend: item_employee[index].sickend,
                popupotBeforestart: item_employee[index].befotstart,
                popupotBeforeend: item_employee[index].befotend,
                pop_befstart: item_employee[index].befstart,
                pop_befend: item_employee[index].befend,
                pop_aftstart: item_employee[index].atfstart,
                pop_aftend: item_employee[index].atfend,
                pop_otstart: item_employee[index].otstart,
                pop_otend: item_employee[index].otend,
                addotinputedit: item_employee[index].befotstart || item_employee[index].befotend ? true : false,
                trunONto: item_employee[index].pop_otstart || item_employee[index].pop_otend ? true : false,
            });
        } catch (e) {

        }
    }
    showpopupprogress = (e) => {
        this.setState({
            popupprogress: e,
            pop_progressdetail: '',
            pop_progresskm: '',
            pop_progressvolumn: '',
            pop_progressunit: ''
        })
    }
    showpopupeditprogress = (e, key) => {
        let { itemprogress } = this.state;
        try {
            this.setState({
                popupeditprogress: e,
                idItemprogress: key,
                pop_progressdetail: itemprogress[key].detail,
                pop_progresskm: itemprogress[key].km,
                pop_progressvolumn: itemprogress[key].volumn,
                pop_progressunit: itemprogress[key].unit,
            })
        } catch (error) {

        }
    }
    showpopupcreateemployee = (value) => {
        this.setState({
            popupcreateemployee: value,
            pop_empcode: '',
            pop_fullname: '',
            leavesick: '0',
            txt_sickstart: '',
            txt_sickend: '',
            popupotBeforestart: '',
            popupotBeforeend: '',
            pop_befstart: '',
            pop_befend: '',
            pop_aftstart: '',
            pop_aftend: '',
            pop_otstart: '',
            pop_otend: '',
        });
    }


    // changvalue
    confrimchangtime = (event) => {
        let { item_employee, keyitememp } = this.state;
        item_employee[keyitememp].leavesick = this.state.leavesick;
        item_employee[keyitememp].sickstart = this.state.txt_sickstart;
        item_employee[keyitememp].sickend = this.state.txt_sickend;
        item_employee[keyitememp].befotstart = this.state.popupotBeforestart;
        item_employee[keyitememp].befotend = this.state.popupotBeforeend;
        item_employee[keyitememp].befstart = this.state.pop_befstart;
        item_employee[keyitememp].befend = this.state.pop_befend;
        item_employee[keyitememp].atfstart = this.state.pop_aftstart;
        item_employee[keyitememp].atfend = this.state.pop_aftend;
        item_employee[keyitememp].otstart = this.state.pop_otstart;
        item_employee[keyitememp].otend = this.state.pop_otend;
        item_employee[keyitememp].useredit = '1';
        this.setState({ item_employee });
        this.showpopupinput(false, keyitememp, '', '');
        event.preventDefault();
    }
    createItemprogress = () => {
        let { itemprogress } = this.state;
        let arr = {
            detail: this.state.pop_progressdetail,
            km: this.state.pop_progresskm,
            volumn: this.state.pop_progressvolumn,
            unit: this.state.pop_progressunit,
        }
        itemprogress.push(arr);
        this.setState({ itemprogress })
        this.showpopupprogress(false);
    }
    editItemprogress = (key) => {
        let { itemprogress } = this.state;
        itemprogress[key].detail = this.state.pop_progressdetail;
        itemprogress[key].km = this.state.pop_progresskm;
        itemprogress[key].volumn = this.state.pop_progressvolumn;
        itemprogress[key].unit = this.state.pop_progressunit;
        this.setState({ itemprogress })
        this.showpopupeditprogress(false, key);
    }

    createEmployee = (event) => {
        let { item_employee } = this.state;
        if (item_employee) {
            if (this.state.pop_empcode && this.state.pop_fullname) {
                let arr = {
                    empcode: this.state.pop_empcode.value,
                    empname: this.state.pop_fullname,
                    emptype: 'D',
                    leavesick: this.state.leavesick,
                    sickstart: this.state.txt_sickstart,
                    sickend: this.state.txt_sickend,
                    befotstart: this.state.popupotBeforestart,
                    befotend: this.state.popupotBeforeend,
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
                    emptype: 'D',
                    leavesick: this.state.leavesick,
                    sickstart: this.state.txt_sickstart,
                    sickend: this.state.txt_sickend,
                    befotstart: this.state.popupotBeforestart,
                    befotend: this.state.popupotBeforeend,
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
        event.preventDefault();
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
    removeProgress = (key) => {
        let { itemprogress } = this.state;
        Swal.fire({
            title: 'คุณต้องการลบงานนี้ออกหรือไม่ ?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                itemprogress.splice(key, 1)
                this.setState({ itemprogress });
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
    trunApplyfrist = () => {
        let { item_employee } = this.state;
        try {
            this.setState({
                popupotBeforestart: item_employee[0].befotstart,
                popupotBeforeend: item_employee[0].befotend,
                pop_befstart: item_employee[0].befstart,
                pop_befend: item_employee[0].befend,
                pop_aftstart: item_employee[0].atfstart,
                pop_aftend: item_employee[0].atfend,
                pop_otstart: item_employee[0].otstart,
                pop_otend: item_employee[0].otend,
            });
        } catch (error) {
        }
    }

    btn_confrim = () => {
        if (getCookie('token')) {
            if (
                this.state.EmployeeCode && this.state.txt_date && this.state.txt_projectnamevalue.value &&
                this.state.txt_zonevalue.value && this.state.txt_projectnamevalue.activity && this.state.txt_activityvalue.JobCode &&
                this.state.txt_activityvalue.ProjectActivityCode && this.state.txt_activityvalue.CostCenterCode && this.state.txt_activityvalue.JobTarget && this.state.txt_activityvalue.JobUnit &&
                this.state.txt_actual && this.state.item_employee.length > 0
            ) {
                Swal.fire({
                    title: 'การรายงานเท็จถือเป็นความผิดวินัยอย่างร้ายแรง และมีบทลงโทษสูงสุดตามกฎระเบียบของบริษัท',
                    text: "",
                    icon: 'warning',
                    showCloseButton: true,
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'ยอมรับ',
                    cancelButtonColor: 'red',
                    cancelButtonText: 'ยกเลิก'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // console.log(JSON.stringify(this.state.item_employee));
                        //////////
                        new Service().savetimesheet(
                            getCookie('token'),
                            this.state.txt_activityvalue.ProjectSubLocationCode, // H
                            this.state.EmployeeCode, // H
                            this.state.txt_date, // H
                            this.state.txt_projectnamevalue.value, // H
                            this.state.txt_zonevalue.value, // H
                            this.state.txt_projectnamevalue.activity, // H
                            this.state.txt_activityvalue.JobCode, // H
                            this.state.txt_activityvalue.ProjectActivityCode,// H
                            this.state.txt_activityvalue.CostCenterCode, // H
                            this.state.txt_activityvalue.JobTarget, // H
                            this.state.txt_activityvalue.JobUnit, // H
                            this.state.txt_actual, // H
                            this.state.txt_activityvalue.JobUnit, // H
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
        } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Cookie หมดอายุ กรุณาลงชื่อเข้าใช้งานใหม่',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    trunOnot = (e) => {
        this.setState({
            addotinput: e,
            popupotBeforestart: '',
            popupotBeforeend: '',
        })
    }
    trunOnotedit = (e) => {
        this.setState({
            addotinputedit: e,
            popupotBeforestart: '',
            popupotBeforeend: '',
        })
    }
    trunOnTOOT = (e) => {
        this.setState({
            trunONto: e,
            pop_otstart: '',
            pop_otend: '',
        })
    }
    leavesick = (value) => {
        let { leavesick } = this.state;
        if (value === leavesick) {
            this.setState({
                leavesick: '0',
            });
        } else {
            this.setState({
                leavesick: value,
            });
        }
    }
    // window.onbeforeunload = function () {return false;}
    render() {
        let checkitememp = this.state.item_employee ? this.state.item_employee.filter((item) => {
            return item.befstart || item.befend || item.atfstart || item.atfend
        }) : []
        let rowitemprogress = 1;
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

                    {/* Item Employee Edit */}
                    <Modal
                        show={this.state.popupinput}
                        backdrop="static"
                        keyboard={false}
                        StrictMode={true}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header>
                            <div><strong>กำหนดเวลาทำงาน</strong></div>
                            <div><strong>{this.state.keyempname}</strong></div>
                        </Modal.Header>
                        <form onSubmit={this.confrimchangtime} style={{ display: 'contents' }} autoComplete="on">
                            <Modal.Body>
                                <div className={styles.row} style={{ fontSize: 15 }}>
                                    <div className={styles.row} style={{ marginBottom: 10 }}>
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <span onClick={() => this.trunOnotedit(!this.state.addotinputedit)}>
                                                <i className={this.state.addotinputedit ? 'fa-solid fa-square-check squareboxcheck' : 'fa-solid fa-square squareboxuncheck'}></i> <strong>โอที</strong> (ก่อนเริ่ม)
                                            </span>
                                        </div>
                                        {
                                            this.state.addotinputedit ?
                                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                                    <div style={{ width: '50%', float: 'left' }}>
                                                        <label>เริ่ม</label>
                                                        <input type="time" placeholder='06:00' required={this.state.popupotBeforeend ? true : false} className="form-control" style={{ width: '97%' }} value={this.state.popupotBeforestart} onChange={(e) => this.setState({ popupotBeforestart: e.target.value })} />
                                                    </div>
                                                    <div style={{ width: '50%', float: 'right' }}>
                                                        <label>สิ้นสุด</label>
                                                        <input type="time" placeholder='08:00' required={this.state.popupotBeforestart ? true : false} className="form-control" value={this.state.popupotBeforeend} onChange={(e) => this.setState({ popupotBeforeend: e.target.value })} />
                                                    </div>
                                                </div>
                                                :
                                                <></>
                                        }
                                    </div>
                                    <div className={styles.row} style={{ marginBottom: 10 }}>
                                        <div className="col-lg-12 col-md-12 col-sm-12"><strong>ช่วงแรก</strong></div>
                                        <div style={{ width: '50%', float: 'left' }}>
                                            <label>เริ่ม</label>
                                            <input type="time" placeholder='08:00' required={this.state.pop_befend ? true : false} className="form-control" style={{ width: '97%' }} value={this.state.pop_befstart} onChange={(e) => this.setState({ pop_befstart: e.target.value })} />
                                        </div>
                                        <div style={{ width: '50%', float: 'right' }}>
                                            <label>สิ้นสุด</label>
                                            <input type="time" required={this.state.pop_befstart ? true : false} placeholder='12:00' className="form-control" value={this.state.pop_befend} onChange={(e) => this.setState({ pop_befend: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className={styles.row} style={{ marginBottom: 10 }}>
                                        <div className="col-lg-12 col-md-12 col-sm-12"><strong>ช่วงหลัง</strong></div>
                                        <div style={{ width: '50%', float: 'left' }}>
                                            <label>เริ่ม</label>
                                            <input type="time" placeholder='13:00' required={this.state.pop_aftend ? true : false} className="form-control" style={{ width: '97%' }} value={this.state.pop_aftstart} onChange={(e) => this.setState({ pop_aftstart: e.target.value })} />
                                        </div>
                                        <div style={{ width: '50%', float: 'right' }}>
                                            <label>สิ้นสุด</label>
                                            <input type="time" required={this.state.pop_aftstart ? true : false} placeholder='17:00' className="form-control" value={this.state.pop_aftend} onChange={(e) => this.setState({ pop_aftend: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className={styles.row} style={{ marginBottom: 10 }}>
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <span onClick={() => this.trunOnTOOT(!this.state.trunONto)}>
                                                <i className={this.state.trunONto ? 'fa-solid fa-square-check squareboxcheck' : 'fa-solid fa-square squareboxuncheck'}></i> <strong>โอที</strong> (หลังเลิกงาน)
                                            </span>
                                        </div>
                                        {
                                            this.state.trunONto ?
                                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                                    <div style={{ width: '50%', float: 'left' }}>
                                                        <label>เริ่ม</label>
                                                        <input type="time" placeholder='20:00' min={this.state.pop_aftend ? this.state.pop_aftend : ''} required={this.state.pop_otend ? true : false} className="form-control" style={{ width: '97%' }} value={this.state.pop_otstart} onChange={(e) => this.setState({ pop_otstart: e.target.value })} />
                                                    </div>
                                                    <div style={{ width: '50%', float: 'right' }}>
                                                        <label>สิ้นสุด</label>
                                                        <input type="time" placeholder='22:00' className="form-control" required={this.state.pop_otstart ? true : false} value={this.state.pop_otend} onChange={(e) => this.setState({ pop_otend: e.target.value })} />
                                                    </div>
                                                </div>
                                                :
                                                <></>
                                        }
                                    </div>
                                    <div className={styles.row} style={{ marginTop: 15 }}>
                                        <div className="col-lg-6 col-md-6 col-sm-6" style={{ width: '50%' }}>
                                            <span onClick={() => this.leavesick('1')}>
                                                <i className={this.state.leavesick === '1' ? 'fa-solid fa-square-check squareboxcheck' : 'fa-solid fa-square squareboxuncheck'}></i> ลาป่วย
                                            </span>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6" style={{ width: '50%' }}>
                                            <span onClick={() => this.leavesick('2')}>
                                                <i className={this.state.leavesick === '2' ? 'fa-solid fa-square-check squareboxcheck' : 'fa-solid fa-square squareboxuncheck'}></i> ลาไม่รับค่าจ้าง
                                            </span>
                                        </div>
                                        {
                                            this.state.leavesick !== '0' ?
                                                <>
                                                    <div className="col-lg-6 col-md-6 col-sm-6" style={{ width: '50%' }}>
                                                        <input style={{ width: '97%' }} type="time" required={this.state.txt_sickend ? true : false} value={this.state.txt_sickstart} className="form-control" onChange={(e) => this.setState({ txt_sickstart: e.target.value })} />
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6" style={{ width: '50%' }}>
                                                        <input style={{ width: '97%' }} required={this.state.txt_sickstart ? true : false} type="time" value={this.state.txt_sickend} className="form-control" onChange={(e) => this.setState({ txt_sickend: e.target.value })} />
                                                    </div>
                                                </> : <></>
                                        }
                                    </div>
                                </div>
                            </Modal.Body>
                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '0.75rem', borderTop: '1px solid #dee2e6', borderBottomRightRadius: 'calc(0.3rem - 1px)', borderBottomLeftRadius: 'calc(0.3rem - 1px)' }}>
                                <div className={styles.row} style={{ width: '100%' }}>
                                    <div className="col-sm-12 col-md-2 col-lg-2"></div>
                                    <div className="col-sm-12 col-md-4 col-lg-4" style={{ marginBottom: 10 }}>
                                        <button type="submit" variant="primary" className="btn btn-danger" style={{ width: '100%' }}>บันทึกเวลา</button>
                                    </div>
                                    <div className="col-sm-12 col-md-4 col-lg-4">
                                        <button variant="primary" className="btn btn-light" style={{ width: '100%' }} onClick={() => this.showpopupinput(false, this.state.keyitememp, '', '')}>ยกเลิก</button>
                                    </div>
                                    <div className="col-sm-12 col-md-2 col-lg-2"></div>
                                </div>
                            </div>
                        </form>
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
                            <div><strong>เพิ่มรายละเอียดงาน</strong></div>
                        </Modal.Header>
                        <Modal.Body>
                            <div className={styles.row} style={{ fontSize: 15 }}>
                                <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginBottom: 10 }}>
                                    <label>รายละเอียด</label>
                                    <input type="text" className="form-control" value={this.state.pop_progressdetail} onChange={(e) => this.setState({ pop_progressdetail: e.target.value })} />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginBottom: 10 }}>
                                    <label>กม.</label>
                                    <input type="text" className="form-control" value={this.state.pop_progresskm} onChange={(e) => this.setState({ pop_progresskm: e.target.value })} />
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
                                            <button type="button" variant="primary" className="btn btn-danger" style={{ width: '100%' }} onClick={() => this.createItemprogress()}>สร้างรายละเอียดงาน</button>
                                            :
                                            <button type="button" variant="primary" className="btn btn-danger" disabled={true} style={{ width: '100%' }} >สร้างรายละเอียดงาน</button>
                                    }

                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4">
                                    <button type="button" variant="primary" className="btn btn-light" style={{ width: '100%' }} onClick={() => this.showpopupprogress(!this.state.popupprogress)}>ยกเลิก</button>
                                </div>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                            </div>

                        </div>
                    </Modal>
                    {/* Edit Progress */}
                    <Modal
                        show={this.state.popupeditprogress}
                        backdrop="static"
                        keyboard={false}
                        StrictMode={true}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header>
                            <div><strong>แก้ไขรายละเอียดงาน</strong></div>
                        </Modal.Header>
                        <Modal.Body>
                            <div className={styles.row} style={{ fontSize: 15 }}>
                                <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginBottom: 10 }}>
                                    <label>รายละเอียด</label>
                                    <input type="text" className="form-control" value={this.state.pop_progressdetail} onChange={(e) => this.setState({ pop_progressdetail: e.target.value })} />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginBottom: 10 }}>
                                    <label>กม.</label>
                                    <input type="text" className="form-control" value={this.state.pop_progresskm} onChange={(e) => this.setState({ pop_progresskm: e.target.value })} />
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
                                            <button type="button" variant="primary" className="btn btn-danger" style={{ width: '100%' }} onClick={() => this.editItemprogress(this.state.idItemprogress)}>บันทึกการแก้ไข</button>
                                            :
                                            <button type="button" variant="primary" className="btn btn-danger" disabled={true} style={{ width: '100%' }} >บันทึกการแก้ไข</button>
                                    }

                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4">
                                    <button type="button" variant="primary" className="btn btn-light" style={{ width: '100%' }} onClick={() => this.showpopupeditprogress(false, this.state.idItemprogress)}>ยกเลิก</button>
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
                            <div><strong>กำหนดเวลาทำงาน</strong></div>
                        </Modal.Header>
                        <form onSubmit={this.createEmployee} autoComplete="on">
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
                                    </div>
                                    <div className={styles.row} style={{ marginBottom: 10 }}>
                                        <div className="col-lg-6 col-md-6 col-sm-6" style={{ width: '50%' }}>
                                            <span onClick={() => this.trunOnot(!this.state.addotinput)}>
                                                <i className={this.state.addotinput ? 'fa-solid fa-square-check squareboxcheck' : 'fa-solid fa-square squareboxuncheck'}></i> <strong>โอที</strong> (ก่อนเริ่ม)
                                            </span>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6" style={{ width: '50%' }}>
                                            <span onClick={() => this.trunApplyfrist()}>
                                                <i className="squareboxcheck fa-solid fa-calendar-plus"></i> <strong>ใช้เวลาเหมือนคนแรก</strong>
                                            </span>
                                        </div>
                                        {
                                            this.state.addotinput ?
                                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                                    <div style={{ width: '50%', float: 'left' }}>
                                                        <label>เริ่ม</label>
                                                        <input type="time" placeholder='06:00' required={this.state.popupotBeforeend ? true : false} className="form-control" style={{ width: '97%' }} value={this.state.popupotBeforestart} onChange={(e) => this.setState({ popupotBeforestart: e.target.value })} />
                                                    </div>
                                                    <div style={{ width: '50%', float: 'right' }}>
                                                        <label>สิ้นสุด</label>
                                                        <input type="time" placeholder='08:00' required={this.state.popupotBeforestart ? true : false} className="form-control" value={this.state.popupotBeforeend} onChange={(e) => this.setState({ popupotBeforeend: e.target.value })} />
                                                    </div>
                                                </div>
                                                :
                                                <></>
                                        }
                                    </div>

                                    <div className={styles.row} style={{ marginBottom: 10 }}>
                                        <div className="col-lg-12 col-md-12 col-sm-12"><strong>ช่วงแรก</strong></div>
                                        <div style={{ width: '50%', float: 'left' }}>
                                            <label>เริ่ม</label>
                                            <input type="time" placeholder='09:00' required={this.state.pop_befend ? true : false} className="form-control" style={{ width: '97%' }} value={this.state.pop_befstart} onChange={(e) => this.setState({ pop_befstart: e.target.value })} />
                                        </div>
                                        <div style={{ width: '50%', float: 'right' }}>
                                            <label>สิ้นสุด</label>
                                            <input type="time" placeholder='12:00' required={this.state.pop_befstart ? true : false} className="form-control" value={this.state.pop_befend} onChange={(e) => this.setState({ pop_befend: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className={styles.row} style={{ marginBottom: 10 }}>
                                        <div className="col-lg-12 col-md-12 col-sm-12"><strong>ช่วงหลัง</strong></div>
                                        <div style={{ width: '50%', float: 'left' }}>
                                            <label>เริ่ม</label>
                                            <input type="time" placeholder='13:00' required={this.state.pop_aftend ? true : false} className="form-control" style={{ width: '97%' }} value={this.state.pop_aftstart} onChange={(e) => this.setState({ pop_aftstart: e.target.value })} />
                                        </div>
                                        <div style={{ width: '50%', float: 'right' }}>
                                            <label>สิ้นสุด</label>
                                            <input type="time" placeholder='17:00' required={this.state.pop_aftstart ? true : false} className="form-control" value={this.state.pop_aftend} onChange={(e) => this.setState({ pop_aftend: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className={styles.row} style={{ marginBottom: 10 }}>
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <span onClick={() => this.trunOnTOOT(!this.state.trunONto)}>
                                                <i className={this.state.trunONto ? 'fa-solid fa-square-check squareboxcheck' : 'fa-solid fa-square squareboxuncheck'}></i> <strong>โอที</strong> (หลังเลิกงาน)
                                            </span>
                                        </div>
                                        {
                                            this.state.trunONto ?
                                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                                    <div style={{ width: '50%', float: 'left' }}>
                                                        <label>เริ่ม</label>
                                                        <input type="time" placeholder='20:00' required={this.state.pop_otend ? true : false} className="form-control" style={{ width: '97%' }} value={this.state.pop_otstart} onChange={(e) => this.setState({ pop_otstart: e.target.value })} />
                                                    </div>
                                                    <div style={{ width: '50%', float: 'right' }}>
                                                        <label>สิ้นสุด</label>
                                                        <input type="time" placeholder='22:00' required={this.state.pop_otstart ? true : false} className="form-control" value={this.state.pop_otend} onChange={(e) => this.setState({ pop_otend: e.target.value })} />
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
                                        <button type="submit" variant="primary" className="btn btn-danger" style={{ width: '100%' }}>บันทึกเวลา</button>
                                    </div>
                                    <div className="col-sm-12 col-md-4 col-lg-4">
                                        <button variant="primary" className="btn btn-light" style={{ width: '100%' }} onClick={() => this.showpopupcreateemployee(false)}>ยกเลิก</button>
                                    </div>
                                    <div className="col-sm-12 col-md-2 col-lg-2"></div>
                                </div>
                            </div>
                        </form>
                    </Modal>
                    {/* End */}


                    {/* Header */}
                    <div className="page-header">
                        <div className="title-page">
                            <div>
                                <Image src={logo} width={45} height={50} alt="logo"></Image>
                            </div>
                            {/* <div>
                                <h2>บันทึกการทำงาน</h2>
                            </div> */}
                        </div>
                    </div>

                    <Container fluid={true}>

                        {/* Menu Tabs */}
                        <Nav tabs >
                            <NavItem >
                                <input type="radio" name="slideItem" id="slide-item-1" className="slide-toggle" defaultChecked={this.state.tabindex === '1' ? true : false} />
                                <NavLink className={this.state.tabindex === '1' ? 'active' : ''} onClick={() => this.setState({ tabindex: '1' })}><i className="fa fa-calendar-alt"></i>TIMESHEET</NavLink>
                            </NavItem>
                            <NavItem>
                                <input type="radio" name="slideItem" id="slide-item-2" className="slide-toggle" defaultChecked={this.state.tabindex === '2' ? true : false} />
                                <NavLink className={this.state.tabindex === '2' ? 'active' : ''} onClick={() => this.setState({ tabindex: '2' })}><i className="fa fa-clipboard"></i>ผลงาน</NavLink>
                            </NavItem>
                        </Nav>

                        {
                            this.state.tabindex === '1' ?
                                <>

                                    <Row>
                                        <Col sm="12" xl="12">
                                            <Row>
                                                <Col sm="12">
                                                    <Card>
                                                        <CardHeader>
                                                            <h5>รหัสพนักงาน : {this.state.EmployeeCode}</h5>
                                                            <h5>ชื่อ - สกุล : <Label> {this.state.EmployeeDisplayName}</Label></h5>
                                                        </CardHeader>
                                                        <CardBody className="e-form">
                                                            <Form className="theme-form">
                                                                <FormGroup>
                                                                    <Label className="col-form-label pt-0 pb-0" >วันที่ <span className="text-danger">*</span></Label>
                                                                    <Input className="form-control" type="date" min={this.state.min_date} max={this.state.max_date} value={this.state.txt_date} onChange={(e) => this.setState({ txt_date: e.target.value })} />
                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <Label className="col-form-label pt-0 pb-0" >โครงการ <span className="text-danger">*</span></Label>
                                                                    <Select
                                                                        options={this.state.optionprojectname}
                                                                        value={this.state.txt_projectnamevalue}
                                                                        onChange={(e) => this.changeProjectname(e)}
                                                                        styles={stylesselect}
                                                                    />
                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <Label className="col-form-label pt-0 pb-0" >ช่วง <span className="text-danger">*</span></Label>
                                                                    <Select
                                                                        options={this.state.optionzone}
                                                                        value={this.state.txt_zonevalue}
                                                                        onChange={(e) => this.changeZone(e)}
                                                                        styles={stylesselect}
                                                                    />
                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <Label className="col-form-label pt-0 pb-0" >กิจกรรม <span className="text-danger">*</span></Label>
                                                                    <Select
                                                                        options={this.state.optionactivity}
                                                                        value={this.state.txt_activityvalue}
                                                                        onChange={(e) => this.changeActivity(e)}
                                                                        styles={stylesselect}
                                                                    />
                                                                </FormGroup>
                                                                <FormGroup className="mt-3">
                                                                    <h6 >ข้อมูลพนักงานรายวัน <span className="text-danger">*</span></h6>

                                                                    {
                                                                        this.state.txt_projectnamevalue.value && this.state.txt_zonevalue.value && this.state.txt_activityvalue.value ?
                                                                            this.state.item_employee ?
                                                                                <>
                                                                                    {
                                                                                        this.state.checkitemall ?
                                                                                            <div onClick={() => this.applyAll()}>
                                                                                                <i className={'squareboxcheck fa-solid fa-square-check'}></i> ใช้เวลาด้วยกันทั้งหมด
                                                                                            </div>
                                                                                            :
                                                                                            <div onClick={() => this.applyAll()}>
                                                                                                <i className={'squareboxuncheck fa-solid fa-square'}></i> ใช้เวลาด้วยกันทั้งหมด
                                                                                            </div>
                                                                                    }
                                                                                </>
                                                                                : <></>
                                                                            : <></>
                                                                    }
                                                                    <div className="table-responsive">
                                                                        <Table bordered>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th scope="col" style={{ fontSize: 12 }}>รหัส</th>
                                                                                    <th scope="col" style={{ fontSize: 12 }}>ชื่อสกุล</th>
                                                                                    <th scope="col" style={{ fontSize: 12 }}></th>
                                                                                    {/* <th scope="col" style={{ fontSize: 12 }}></th> */}
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>

                                                                                {/* // */}
                                                                                {
                                                                                    this.state.txt_projectnamevalue.value && this.state.txt_zonevalue.value && this.state.txt_activityvalue.value ?
                                                                                        this.state.item_employee ?
                                                                                            this.state.item_employee.map((item, index) => {
                                                                                                return (
                                                                                                    <>
                                                                                                        <tr key={index} style={{ borderBottomStyle: 'hidden' }}>
                                                                                                            <td style={{ fontSize: 12 }}><p>{item.empcode}</p></td>
                                                                                                            <td >
                                                                                                                <a onClick={() => this.showpopupinput(true, index, item.empcode, item.empname)}>{item.empname}</a>
                                                                                                                <div className={styles.row} style={{ fontSize: 9 }}>
                                                                                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                                                                                        <div><p style={{ fontSize: 9 }}>โอที(ก่อน) {item.befotstart}-{item.befotend}</p></div>
                                                                                                                        <div><p style={{ fontSize: 9 }}>ช่วงแรก {item.befstart}-{item.befend}</p></div>
                                                                                                                        <div><p style={{ fontSize: 9 }}>ช่วงหลัง {item.atfstart}-{item.atfend}</p></div>
                                                                                                                        <div><p style={{ fontSize: 9 }}>โอที(หลัง) {item.otstart}-{item.otend}</p></div>
                                                                                                                        <div><p style={{ fontSize: 9 }}>{item.leavesick === '1' ? 'ลาป่วย' : item.leavesick === '2' ? 'ลาไม่รับค่าจ้าง' : ''} {item.sickstart ? item.sickstart : ''} {item.sickend ? item.sickend : ''}</p></div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </td>
                                                                                                            <td style={{ textAlign: 'center' }}>
                                                                                                                <i className="fa-solid fa-trash" style={{ fontSize: 14, color: 'red', cursor: 'pointer' }} onClick={() => this.removeEmployee(index)}></i>
                                                                                                            </td>
                                                                                                            {/* <td style={{ textAlign: 'center' }}>
                                                                                                                <i className="fa-solid fa-trash" style={{ fontSize: 14, color: 'red', cursor: 'pointer' }}></i>
                                                                                                            </td> */}
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
                                                                                <tr>
                                                                                    <td colSpan="3" align="center" >
                                                                                        {
                                                                                            this.state.txt_projectnamevalue.value && this.state.txt_zonevalue.value && this.state.txt_activityvalue.value ?
                                                                                                <Button className="btn-pill btn-air-primary" outline color="primary" size="sm" onClick={() => this.showpopupcreateemployee(true)}><i className="fa fa-plus"></i> เพิ่มพนักงานรายวัน </Button> : <><Label >ไม่พบรายชื่อ</Label></>
                                                                                        }

                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </Table>
                                                                    </div>
                                                                </FormGroup>

                                                            </Form>
                                                        </CardBody>
                                                        <CardFooter align="right">
                                                            <Button color="danger" className="col-sm-12" onClick={() => this.setState({ tabindex: '2' })} >ถัดไป</Button>
                                                        </CardFooter>
                                                    </Card>

                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </>
                                :
                                this.state.tabindex === '2' ?
                                    <>
                                        <Row>
                                            <Col sm="12" xl="12">
                                                <Row>
                                                    <Col sm="12">
                                                        <Card>
                                                            <CardBody className="e-form">
                                                                <Form className="theme-form">
                                                                    <FormGroup>
                                                                        <Label className="col-form-label pt-0 pb-0" >เป้าหมาย <span className="text-danger">*</span></Label>
                                                                        <Input className="form-control" type="text" value={this.state.txt_activityvalue.JobTarget ? this.state.txt_activityvalue.JobTarget + ' ' + this.state.txt_activityvalue.JobUnit : ''} disabled={true} />
                                                                    </FormGroup>
                                                                    <FormGroup>
                                                                        <Label className="col-form-label pt-0 pb-0" >ทำได้จริง <span className="text-danger">*</span></Label><br></br>
                                                                        <Input className="form-control d-inline " type="text" value={this.state.txt_actual} onChange={(e) => this.setState({ txt_actual: e.target.value.replace(/[^0-9]/g, '') })} style={{ width: '60%' }} /> <Label className="ml-2">{this.state.txt_activityvalue.JobUnit}</Label>
                                                                    </FormGroup>
                                                                    <FormGroup className="mt-3">
                                                                        <h6  >รายละเอียดงาน/อื่นๆ </h6>
                                                                        <div className="table-responsive">
                                                                            <Table bordered style={{ fontSize: 11 }}>
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th style={{ fontSize: 12 }}>ลำดับ</th>
                                                                                        <th style={{ fontSize: 12 }}>รายละเอียด</th>
                                                                                        <th style={{ fontSize: 12 }}>กม.</th>
                                                                                        <th style={{ fontSize: 12 }}>ปริมาณ</th>
                                                                                        <th style={{ fontSize: 12 }}>หน่วย</th>
                                                                                        <th style={{ fontSize: 12 }}></th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>

                                                                                    {/* // */}
                                                                                    {
                                                                                        this.state.itemprogress ?
                                                                                            this.state.itemprogress.map((item, index) => {
                                                                                                return (
                                                                                                    <tr style={{ borderBottomStyle: 'hidden' }} key={index}>
                                                                                                        <td style={{ fontSize: 12, textAlign: 'center' }}>{rowitemprogress++}</td>
                                                                                                        <td style={{ fontSize: 12 }} onClick={() => this.showpopupeditprogress(true, index)}>{item.detail}</td>
                                                                                                        <td style={{ fontSize: 12 }}>{item.km}</td>
                                                                                                        <td style={{ fontSize: 12 }}>{item.volumn}</td>
                                                                                                        <td style={{ fontSize: 12 }}>{item.unit}</td>
                                                                                                        <td style={{ textAlign: 'center' }}>
                                                                                                            <i className="fa-solid fa-trash" style={{ fontSize: 14, color: 'red', cursor: 'pointer' }} onClick={() => this.removeProgress(index)}></i>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                )
                                                                                            })
                                                                                            :
                                                                                            <tr>
                                                                                                <td colSpan={6}>-</td>
                                                                                            </tr>
                                                                                    }
                                                                                    {/* // */}

                                                                                    <tr>
                                                                                        <td colSpan="6" align="center" >
                                                                                            {
                                                                                                this.state.txt_projectnamevalue.value && this.state.txt_zonevalue.value && this.state.txt_activityvalue.value ?
                                                                                                    <Button className="btn-pill btn-air-primary" outline color="primary" size="sm" onClick={() => this.showpopupprogress(true)} ><i className="fa fa-plus"></i> เพิ่มรายละเอียด </Button> : <><Label >ไม่พบข้อมูล</Label></>
                                                                                            }

                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </Table>
                                                                        </div>
                                                                    </FormGroup>
                                                                </Form>
                                                            </CardBody>
                                                            <CardFooter align="right">
                                                                {
                                                                    this.state.EmployeeCode && this.state.txt_date && this.state.txt_projectnamevalue.value &&
                                                                        this.state.txt_zonevalue.value && this.state.txt_projectnamevalue.activity && this.state.txt_activityvalue.JobCode &&
                                                                        this.state.txt_activityvalue.ProjectActivityCode && this.state.txt_activityvalue.CostCenterCode && this.state.txt_activityvalue.JobTarget &&
                                                                        this.state.txt_activityvalue.JobUnit && this.state.txt_actual && this.state.item_employee ?
                                                                        checkitememp[0] ?
                                                                            <Button color="danger" className="col-sm-12" onClick={() => this.btn_confrim()} >ส่งข้อมูล</Button>
                                                                            :
                                                                            <Button color="light" className="col-sm-12" disabled={true}>ส่งข้อมูล (กรอกเวลาให้ครบ)</Button>
                                                                        :
                                                                        <Button color="danger" className="col-sm-12" disabled={true}>ส่งข้อมูล (กรอกข้อมูลให้ครบ)</Button>
                                                                }
                                                            </CardFooter>
                                                        </Card>

                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </>
                                    :
                                    <></>
                        }
                    </Container>
                </div>
                <br /><br /><br />
            </>
        );
    }
}
