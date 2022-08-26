import React, { Component, Fragment } from 'react';
import styles from '../../styles/main.module.css';
import Navbarx from '../nav';
import Link from 'next/link';
import logo from '../../public/logouniq.png';
import Head from 'next/head';
import { Modal } from 'react-bootstrap-v5';
import Service from '../api/Service';
import { getCookie, setCookies, removeCookies } from 'cookies-next';
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
            tabindex: '1',
            txt_date: new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + (new Date().getDate())).slice(-2),
            min_date: new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + (new Date().getDate() - 1)).slice(-2),
            max_date: new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + (new Date().getDate())).slice(-2),
            typemenu: '',
            showpopupType3: false,
            txtsickallday_id: '',
            txtsickallday_date: '',
            txtsickallday_fristtime: '',
            txtsickallday_lasttime: '',
            txtsickallday_item: '',
            showpopupType1: false,
            showpopupeditType1: false,
            keypopupType1: '',
            txtworktime_date: new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + (new Date().getDate())).slice(-2),
            txtworktime_fristtime: '',
            txtworktime_lasttime: '',
            txtworktime_project: '',
            txtworktime_projectlabel: '',
            txtworktime_department: '',
            txtworktime_departmentlabel: '',
            txtworktime_activity: '',
            txtworktime_activitylabel: '',
            txtworktime_comment: '',
            txtworktime_item: [],
            optionproject: [],
            optiondepartment: [],
            optionactivity: [],
            txtworktime_status: '',
            txtworktimeleave_date: new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + (new Date().getDate())).slice(-2),
            txtworktimeleave_fristtime: '',
            txtworktimeleave_lasttime: '',
            txtworktimeleave_sfristtime: '',
            txtworktimeleave_elasttime: '',
            txtworktimeleave_project: '',
            txtworktimeleave_projectlabel: '',
            txtworktimeleave_department: '',
            txtworktimeleave_departmentlabel: '',
            txtworktimeleave_activity: '',
            txtworktimeleave_activitylabel: '',
            txtworktimeleave_comment: '',
            txtworktimeleave_item: [],
            showpopupType2: false,
            txtworktimeleave_status: '',
            showpopupeditType2: false,
            keypopupeditType2: '',
            showpopupselecttype: false,
        }
    }
    componentDidMount() {
        // window.onbeforeunload = function () { return false; }
        if (getCookie('token')) {
            this.getuserinfo();
            if (localStorage.getItem('typeTimesheet')) {
                this.setState({
                    typemenu: localStorage.getItem('typeTimesheet')
                })
                try {
                    this.getMonthTimeSheetNormal();
                    this.getMonthTimeSheetNormalLeave();
                    this.getMonthLeave();
                    this.projectmastermonth();
                } catch (error) {
                    
                }
            } else {
                this.showpopupselecttype(true);
            }
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
        });
    }


    projectmastermonth = async () => {
        await new Service().projectmastermonth(getCookie('token')).then(res => {
            if (res.data) {
                this.setState({
                    optionproject: res.data,
                });
            } else {
                this.setState({
                    optionproject: [],
                });
            }
        });
    }
    departmentrmonth = async (par_projectcode) => {
        await new Service().departmentrmonth(getCookie('token'), par_projectcode).then(res => {
            if (res.data) {
                this.setState({
                    optiondepartment: res.data,
                });
            } else {
                this.setState({
                    optiondepartment: [],
                });
            }
        });
    }
    activitymonth = async (par_projectcode, par_activity) => {
        await new Service().activitymonth(getCookie('token'), par_projectcode, par_activity).then(res => {
            if (res.data) {
                this.setState({
                    optionactivity: res.data,
                });
            } else {
                this.setState({
                    optionactivity: [],
                });
            }
        });
    }
    // OPTION WORKTIME
    changeProjectworktime = (e) => {
        this.setState({
            txtworktime_project: e.value,
            txtworktime_projectlabel: e.label,
            txtworktime_department: '',
            txtworktime_departmentlabel: '',
            txtworktime_activity: '',
            txtworktime_activitylabel: ''
        });
        this.departmentrmonth(e.value);
    }
    changeDepworktime = (e) => {
        this.setState({
            txtworktime_department: e.value,
            txtworktime_departmentlabel: e.label,
            txtworktime_activity: '',
            txtworktime_activitylabel: ''
        });
        this.activitymonth(this.state.txtworktime_project, e.value);
    }
    changeActivityworktime = (e) => {
        this.setState({
            txtworktime_activity: e.value,
            txtworktime_activitylabel: e.label,
        });
    }
    // OPTION WORKTIMELEAVE
    changeProjectworktimeleave = (e) => {
        this.setState({
            txtworktimeleave_project: e.value,
            txtworktimeleave_projectlabel: e.label,
            txtworktimeleave_department: '',
            txtworktimeleave_departmentlabel: '',
            txtworktimeleave_activity: '',
            txtworktimeleave_activitylabel: ''
        });
        this.departmentrmonth(e.value);
    }
    changeDepworktimeleave = (e) => {
        this.setState({
            txtworktimeleave_department: e.value,
            txtworktimeleave_departmentlabel: e.label,
            txtworktimeleave_activity: '',
            txtworktimeleave_activitylabel: ''
        });
        this.activitymonth(this.state.txtworktimeleave_project.value, e.value);
    }
    changeActivityworktimeleave = (e) => {
        this.setState({
            txtworktimeleave_activity: e.value,
            txtworktimeleave_activitylabel: e.label,
        });
    }


    // การลาทั้งวัน
    getMonthLeave = async () => {
        await new Service().getMonthLeave(getCookie('token')).then(res => {
            // console.log(JSON.stringify(res.data))
            this.setState({
                txtsickallday_item: res.data,
                leave_id: '',
                txtsickallday_date: res.data.leave_day,
                txtsickallday_fristtime: res.data.leave_fristtime,
                txtsickallday_lasttime: res.data.leave_lasttime
            });
        });
    }
    addSickallday = (event) => {
        let arr = {
            leave_id: this.state.txtsickallday_id,
            leave_day: this.state.txtsickallday_date,
            leave_fristtime: this.state.txtsickallday_fristtime,
            leave_lasttime: this.state.txtsickallday_lasttime,
            leave_typesave: ''
        }
        this.setState({txtsickallday_item: arr});
        this.showpopupType3(false, this.state.txtsickallday_id);
        event.preventDefault();
    }
    setTypetimesheet = (e) => {
        this.setState({ typemenu: e });
        localStorage.setItem('typeTimesheet', e);
        this.showpopupselecttype(false);
        if(e==='1'){
            this.getMonthTimeSheetNormal();
        }else if(e==='2'){
            this.getMonthTimeSheetNormalLeave();
        }else if(e==='3'){
            this.getMonthLeave();
        }
    }
    showpopupselecttype = (e) => {
        this.setState({
            showpopupselecttype: e,
        })
    }
    logOut = () => {
        removeCookies('token', { path: '/', domain: '' }); //report.tvothai.com
        localStorage.clear();
        window.location.assign('/');
    }
    showpopupType3 = (e, id) => {
        this.setState({ 
            showpopupType3: e,
            txtsickallday_id: id
        });
    }
    saveSickleave = () => {
        if (this.state.txtsickallday_date && this.state.txtsickallday_fristtime && this.state.txtsickallday_lasttime) {
            new Service().addMonthLeave(getCookie('token'), this.state.txtsickallday_date, this.state.txtsickallday_fristtime, this.state.txtsickallday_lasttime).then(res => {
                if (res.data.status === '1') {
                    this.getMonthLeave();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            });
        } else {

        }
    }
    submitSickleave = () => {
        if (this.state.txtsickallday_date && this.state.txtsickallday_fristtime && this.state.txtsickallday_lasttime) {
            new Service().addMonthLeaveSubmit(getCookie('token'), this.state.txtsickallday_date, this.state.txtsickallday_fristtime, this.state.txtsickallday_lasttime).then(res => {
                if (res.data.status === '1') {
                    this.getMonthLeave();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            });
        } else {

        }
        
    }

    // ทำงานปกติ
    showpopupType1 = (e) => {
        this.setState({ 
            showpopupType1: e,
            txtworktime_fristtime: '',
            txtworktime_lasttime: '',
            txtworktime_project: '',
            txtworktime_projectlabel: '',
            txtworktime_department: '',
            txtworktime_departmentlabel: '',
            txtworktime_activity: '',
            txtworktime_activitylabel: '',
            txtworktime_comment: '',
        });
    }
    showpopupeditType1 = (e, key) => {
        let { txtworktime_item } = this.state;
        this.setState({ 
            showpopupeditType1: e,
            keypopupType1: key,
            txtworktime_fristtime: txtworktime_item[key].worktime_fristtime,
            txtworktime_lasttime: txtworktime_item[key].worktime_lasttime,
            txtworktime_project: txtworktime_item[key].worktime_projectvalue,
            txtworktime_projectlabel: txtworktime_item[key].worktime_projectlabel,
            txtworktime_department: txtworktime_item[key].worktime_departmentvalue,
            txtworktime_departmentlabel: txtworktime_item[key].worktime_departmentlabel,
            txtworktime_activity: txtworktime_item[key].worktime_activityvalue,
            txtworktime_activitylabel: txtworktime_item[key].worktime_activitylabel,
            txtworktime_comment: txtworktime_item[key].worktime_comment,
        });
        this.departmentrmonth(txtworktime_item[key].worktime_projectvalue);
        this.activitymonth(txtworktime_item[key].worktime_projectvalue, txtworktime_item[key].worktime_departmentvalue);
    }
    addWorktime = (event) => {
        let { txtworktime_item } = this.state;
        if(txtworktime_item){
            let arr = {
                TimeSheetManday_Header: '',
                worktime_fristtime: this.state.txtworktime_fristtime,
                worktime_lasttime: this.state.txtworktime_lasttime,
                worktime_projectvalue: this.state.txtworktime_project,
                worktime_projectlabel: this.state.txtworktime_projectlabel,
                worktime_departmentvalue: this.state.txtworktime_department,
                worktime_departmentlabel: this.state.txtworktime_departmentlabel,
                worktime_activityvalue: this.state.txtworktime_activity,
                worktime_activitylabel: this.state.txtworktime_activitylabel,
                worktime_comment: this.state.txtworktime_comment,
                worktime_sum: this.state.txtworktime_fristtime <= this.state.txtworktime_lasttime ? (parseFloat(this.state.txtworktime_lasttime) - parseFloat(this.state.txtworktime_fristtime)) : ((parseFloat(this.state.txtworktime_lasttime) + 24) - parseFloat(this.state.txtworktime_fristtime))
            }
            txtworktime_item.push(arr);
            this.setState({txtworktime_item});
            this.showpopupType1(false)
        }else{
            let arr = [{
                TimeSheetManday_Header: '',
                worktime_fristtime: this.state.txtworktime_fristtime,
                worktime_lasttime: this.state.txtworktime_lasttime,
                worktime_projectvalue: this.state.txtworktime_project,
                worktime_projectlabel: this.state.txtworktime_projectlabel,
                worktime_departmentvalue: this.state.txtworktime_department,
                worktime_departmentlabel: this.state.txtworktime_departmentlabel,
                worktime_activityvalue: this.state.txtworktime_activity,
                worktime_activitylabel: this.state.txtworktime_activitylabel,
                worktime_comment: this.state.txtworktime_comment,
                worktime_sum: this.state.txtworktime_fristtime <= this.state.txtworktime_lasttime ? (parseFloat(this.state.txtworktime_lasttime) - parseFloat(this.state.txtworktime_fristtime)) : ((parseFloat(this.state.txtworktime_lasttime) + 24) - parseFloat(this.state.txtworktime_fristtime))
            }]
            this.setState({txtworktime_item: arr});
            this.showpopupType1(false)
        }
        event.preventDefault();
    }
    editWorktime = (event) => {
        let { txtworktime_item, keypopupType1 } = this.state;
        try {
            txtworktime_item[keypopupType1].worktime_fristtime = this.state.txtworktime_fristtime;
            txtworktime_item[keypopupType1].worktime_lasttime = this.state.txtworktime_lasttime;
            txtworktime_item[keypopupType1].worktime_projectvalue = this.state.txtworktime_project;
            txtworktime_item[keypopupType1].worktime_departmentvalue = this.state.txtworktime_department;
            txtworktime_item[keypopupType1].worktime_activityvalue = this.state.txtworktime_activity;
            txtworktime_item[keypopupType1].worktime_projectlabel = this.state.txtworktime_projectlabel;
            txtworktime_item[keypopupType1].worktime_departmentlabel = this.state.txtworktime_departmentlabel;
            txtworktime_item[keypopupType1].worktime_activitylabel = this.state.txtworktime_activitylabel;
            txtworktime_item[keypopupType1].worktime_comment = this.state.txtworktime_comment;
            txtworktime_item[keypopupType1].worktime_sum = this.state.txtworktime_fristtime <= this.state.txtworktime_lasttime ? (parseFloat(this.state.txtworktime_lasttime) - parseFloat(this.state.txtworktime_fristtime)) : ((parseFloat(this.state.txtworktime_lasttime) + 24) - parseFloat(this.state.txtworktime_fristtime))
            this.setState({txtworktime_item});
            this.showpopupeditType1(false, keypopupType1);
        } catch (error) {
            
        }
        event.preventDefault();
    }
    removeType1 = (key) => {
        let { txtworktime_item } = this.state;
        Swal.fire({
            title: 'คุณต้องการลบรายการนี้ออกหรือไม่ ?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                txtworktime_item.splice(key, 1)
                this.setState({ txtworktime_item });
            }
        })
    }
    saveType1 = () => {
        new Service().addMonthTimeSheetSave(getCookie('token'), this.state.txtworktime_date,  this.state.txtworktime_item).then(res => {
            // console.log(JSON.stringify(res.data))
            if (res.data.status === '1') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
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
    }
    submitType1 = () => {
        if(this.state.txtworktime_item){
            let sumx = 0;
            for(let x=0;x<this.state.txtworktime_item.length;x++){
                sumx += this.state.txtworktime_item[x].worktime_sum;
            }
            if(sumx >= 9){
                new Service().addMonthTimeSheetSubmit(getCookie('token'), this.state.txtworktime_date,  this.state.txtworktime_item).then(res => {
                    if (res.data.status === '1') {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: res.data.message,
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.getMonthTimeSheetNormal();
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
            }else{
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'จำนวนชั่วโมงไม่ครบ',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }
    getMonthTimeSheetNormal = async () => {
        await new Service().getMonthTimeSheetNormal(getCookie('token')).then(res => {
            this.setState({
                txtworktime_status: res.data.H_status,
                txtworktime_item: res.data.H_body
            });
        });
    }

    // ลาบางช่วงเวลา
    addWorkLeavetime = (event) => {
        let { txtworktimeleave_item } = this.state;
        if(txtworktimeleave_item){
            let arr = {
                worktimeleave_date: this.state.txtworktimeleave_date,
                worktimeleave_fristtime: this.state.txtworktimeleave_fristtime,
                worktimeleave_lasttime: this.state.txtworktimeleave_lasttime,
                worktimeleave_sfristtime: this.state.txtworktimeleave_sfristtime,
                worktimeleave_elasttime: this.state.txtworktimeleave_elasttime,
                worktimeleave_project: this.state.txtworktimeleave_project,
                worktimeleave_department: this.state.txtworktimeleave_department,
                worktimeleave_activity: this.state.txtworktimeleave_activity,
                worktimeleave_projectlabel: this.state.txtworktimeleave_projectlabel,
                worktimeleave_departmentlabel: this.state.txtworktimeleave_departmentlabel,
                worktimeleave_activitylabel: this.state.txtworktimeleave_activitylabel,
                worktimeleave_comment: this.state.txtworktimeleave_comment,
                worktimeleave_sumL: this.state.txtworktimeleave_fristtime <= this.state.txtworktimeleave_lasttime ? (parseFloat(this.state.txtworktimeleave_lasttime) - parseFloat(this.state.txtworktimeleave_fristtime)) : ((parseFloat(this.state.txtworktimeleave_lasttime) + 24) - parseFloat(this.state.txtworktimeleave_fristtime)),
                worktimeleave_sumN: this.state.txtworktimeleave_sfristtime <= this.state.txtworktimeleave_elasttime ? (parseFloat(this.state.txtworktimeleave_elasttime) - parseFloat(this.state.txtworktimeleave_sfristtime)) : ((parseFloat(this.state.txtworktimeleave_elasttime) + 24) - parseFloat(this.state.txtworktimeleave_sfristtime))
            }
            txtworktimeleave_item.push(arr);
            this.setState({txtworktimeleave_item});
            this.showpopupType2(false)
        }else{
            let arr = [{
                worktimeleave_date: this.state.txtworktimeleave_date,
                worktimeleave_fristtime: this.state.txtworktimeleave_fristtime,
                worktimeleave_lasttime: this.state.txtworktimeleave_lasttime,
                worktimeleave_sfristtime: this.state.txtworktimeleave_sfristtime,
                worktimeleave_elasttime: this.state.txtworktimeleave_elasttime,
                worktimeleave_project: this.state.txtworktimeleave_project,
                worktimeleave_department: this.state.txtworktimeleave_department,
                worktimeleave_activity: this.state.txtworktimeleave_activity,
                worktimeleave_projectlabel: this.state.txtworktimeleave_projectlabel,
                worktimeleave_departmentlabel: this.state.txtworktimeleave_departmentlabel,
                worktimeleave_activitylabel: this.state.txtworktimeleave_activitylabel,
                worktimeleave_comment: this.state.txtworktimeleave_comment,
                worktimeleave_sumL: this.state.txtworktimeleave_fristtime <= this.state.txtworktimeleave_lasttime ? (parseFloat(this.state.txtworktimeleave_lasttime) - parseFloat(this.state.txtworktimeleave_fristtime)) : ((parseFloat(this.state.txtworktimeleave_lasttime) + 24) - parseFloat(this.state.txtworktimeleave_fristtime)),
                worktimeleave_sumN: this.state.txtworktimeleave_sfristtime <= this.state.txtworktimeleave_elasttime ? (parseFloat(this.state.txtworktimeleave_elasttime) - parseFloat(this.state.txtworktimeleave_sfristtime)) : ((parseFloat(this.state.txtworktimeleave_elasttime) + 24) - parseFloat(this.state.txtworktimeleave_sfristtime))
            }]
            this.setState({txtworktimeleave_item: arr});
            this.showpopupType2(false)
        }
        event.preventDefault();
    }
    showpopupType2 = (e) => {
        this.setState({
            showpopupType2: e,
            txtworktimeleave_fristtime: '',
            txtworktimeleave_lasttime: '',
            txtworktimeleave_sfristtime: '',
            txtworktimeleave_elasttime: '',
            txtworktimeleave_project: '',
            txtworktimeleave_department: '',
            txtworktimeleave_activity: '',
            txtworktimeleave_projectlabel: '',
            txtworktimeleave_departmentlabel: '',
            txtworktimeleave_activitylabel: '',
            txtworktimeleave_comment: '',
        });
    }
    removeType2 = (key) => {
        let { txtworktimeleave_item } = this.state;
        Swal.fire({
            title: 'คุณต้องการลบรายการนี้ออกหรือไม่ ?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                txtworktimeleave_item.splice(key, 1)
                this.setState({ txtworktimeleave_item });
            }
        })
    }
    showpopupeditType2 = (e, key) => {
        let { txtworktimeleave_item } = this.state;
        this.setState({ 
            showpopupeditType2: e,
            keypopupeditType2: key,
            txtworktimeleave_date: txtworktimeleave_item[key].worktimeleave_date,
            txtworktimeleave_fristtime: txtworktimeleave_item[key].worktimeleave_fristtime,
            txtworktimeleave_lasttime: txtworktimeleave_item[key].worktimeleave_lasttime,
            txtworktimeleave_sfristtime: txtworktimeleave_item[key].worktimeleave_sfristtime,
            txtworktimeleave_elasttime: txtworktimeleave_item[key].worktimeleave_elasttime,
            txtworktimeleave_project: txtworktimeleave_item[key].worktimeleave_project,
            txtworktimeleave_department: txtworktimeleave_item[key].worktimeleave_department,
            txtworktimeleave_activity: txtworktimeleave_item[key].worktimeleave_activity,
            txtworktimeleave_projectlabel: txtworktimeleave_item[key].worktimeleave_projectlabel,
            txtworktimeleave_departmentlabel: txtworktimeleave_item[key].worktimeleave_departmentlabel,
            txtworktimeleave_activitylabel: txtworktimeleave_item[key].worktimeleave_activitylabel,
            txtworktimeleave_comment: txtworktimeleave_item[key].worktimeleave_comment,
        });
        this.departmentrmonth(txtworktimeleave_item[key].worktimeleave_project);
        this.activitymonth(txtworktimeleave_item[key].worktimeleave_project, txtworktimeleave_item[key].worktimeleave_department);
    }
    editWorkLeavetime = (event) => {
        let { txtworktimeleave_item, keypopupeditType2 } = this.state;
        try {
            txtworktimeleave_item[keypopupeditType2].worktimeleave_date = this.state.txtworktimeleave_date;
            txtworktimeleave_item[keypopupeditType2].worktimeleave_fristtime = this.state.txtworktimeleave_fristtime,
            txtworktimeleave_item[keypopupeditType2].worktimeleave_lasttime = this.state.txtworktimeleave_lasttime,
            txtworktimeleave_item[keypopupeditType2].worktimeleave_sfristtime = this.state.txtworktimeleave_sfristtime;
            txtworktimeleave_item[keypopupeditType2].worktimeleave_elasttime = this.state.txtworktimeleave_elasttime;
            txtworktimeleave_item[keypopupeditType2].worktimeleave_project = this.state.txtworktimeleave_project;
            txtworktimeleave_item[keypopupeditType2].worktimeleave_department = this.state.txtworktimeleave_department;
            txtworktimeleave_item[keypopupeditType2].worktimeleave_activity = this.state.txtworktimeleave_activity;
            txtworktimeleave_item[keypopupeditType2].worktimeleave_projectlabel = this.state.txtworktimeleave_projectlabel;
            txtworktimeleave_item[keypopupeditType2].worktimeleave_departmentlabel = this.state.txtworktimeleave_departmentlabel;
            txtworktimeleave_item[keypopupeditType2].worktimeleave_activitylabel = this.state.txtworktimeleave_activitylabel;
            txtworktimeleave_item[keypopupeditType2].worktimeleave_comment = this.state.txtworktimeleave_comment;
            txtworktimeleave_item[keypopupeditType2].worktimeleave_sumL = this.state.txtworktimeleave_fristtime <= this.state.txtworktimeleave_lasttime ? (parseFloat(this.state.txtworktimeleave_lasttime) - parseFloat(this.state.txtworktimeleave_fristtime)) : ((parseFloat(this.state.txtworktimeleave_lasttime) + 24) - parseFloat(this.state.txtworktimeleave_fristtime)),
            txtworktimeleave_item[keypopupeditType2].worktimeleave_sumN = this.state.txtworktimeleave_sfristtime <= this.state.txtworktimeleave_elasttime ? (parseFloat(this.state.txtworktimeleave_elasttime) - parseFloat(this.state.txtworktimeleave_sfristtime)) : ((parseFloat(this.state.txtworktimeleave_elasttime) + 24) - parseFloat(this.state.txtworktimeleave_sfristtime))
            this.setState({txtworktimeleave_item});
            this.showpopupeditType2(false, keypopupeditType2);
        } catch (error) {
            
        }
        event.preventDefault();
    }
    saveType2 = () => {
        new Service().addMonthTimeSheetLeaveSave(getCookie('token'), this.state.txtworktimeleave_date,  this.state.txtworktimeleave_item).then(res => {
            // console.log(JSON.stringify(res.data))
            if (res.data.status === '1') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
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
    }
    submitType2 = () => {
        if(this.state.txtworktimeleave_item){
            let sumL = 0;
            let sumN = 0;
            for(let x=0;x<this.state.txtworktimeleave_item.length;x++){
                sumL += parseFloat(this.state.txtworktimeleave_item[x].worktimeleave_sumL);
                sumN += parseFloat(this.state.txtworktimeleave_item[x].worktimeleave_sumN);
            }
            let sum = sumL+sumN;
            if(sum >= 9){
                new Service().addMonthTimeSheetLeaveSubmit(getCookie('token'), this.state.txtworktimeleave_date,  this.state.txtworktimeleave_item).then(res => {
                    if (res.data.status === '1') {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: res.data.message,
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.getMonthTimeSheetNormalLeave();
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
            }else{
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'จำนวนชั่วโมงไม่ครบ',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }
    getMonthTimeSheetNormalLeave = async () => {
        await new Service().getMonthTimeSheetNormalLeave(getCookie('token')).then(res => {
            // console.log(JSON.stringify(res.data))
            this.setState({
                txtworktimeleave_status: res.data.H_status,
                txtworktimeleave_item: res.data.H_body
            });
        });
    }

    // window.onbeforeunload = function () {return false;}
    render() {
        let sumtime = this.state.txtsickallday_fristtime <= this.state.txtsickallday_lasttime ? (parseFloat(this.state.txtsickallday_lasttime) - parseFloat(this.state.txtsickallday_fristtime)) : ((parseFloat(this.state.txtsickallday_lasttime) + 24) - parseFloat(this.state.txtsickallday_fristtime))
        // console.log(this.state.txtworktimeleave_status)
        return (
            <>
                <Head>
                    <title>TIMESHEET รายเดือน</title>
                    <link rel="icon" type="image/png" href="../logo.png" />
                    <meta name="viewport" content="width=device-width, height=device-height, target-densitydpi=device-dpi, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"></meta>
                </Head>

                {/* ลาทั้งวัน */}
                <Modal
                    show={this.state.showpopupType3}
                    backdrop="static"
                    keyboard={false}
                    StrictMode={true}
                    onHide={() => this.showpopupType3(false, this.state.txtsickallday_id)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <div><strong>รายละเอียดการลา</strong></div>
                    </Modal.Header>
                    <form onSubmit={this.addSickallday} style={{ display: 'contents' }} autoComplete="on">
                        <Modal.Body>
                            <div className={styles.row} style={{ fontSize: 15 }}>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>วันที่*</label>
                                        <input type="date" className="form-control" value={this.state.txtsickallday_date} disabled={true} readOnly={true} onChange={(e) => this.setState({ txtsickallday_date: e.target.value })} />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ marginTop: 9 }}>
                                        ช่วงที่ลา*
                                        <div className={styles.row}>
                                            <div className="col-sm-6 col-md-6 col-lg-6" style={{ width: '50%' }}>
                                                <label>เวลาเริ่ม</label>
                                                <input type="time" required={true} value={this.state.txtsickallday_fristtime} onChange={(e) => this.setState({ txtsickallday_fristtime: e.target.value })} className="form-control" style={{ width: '97%' }} />
                                            </div>
                                            <div className="col-sm-6 col-md-6 col-lg-6" style={{ width: '50%' }}>
                                                <label>สิ้นสุด</label>
                                                <input type="time" required={true} value={this.state.txtsickallday_lasttime} onChange={(e) => this.setState({ txtsickallday_lasttime: e.target.value })} className="form-control" style={{ width: '97%' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ marginTop: 9 }}>
                                        <div>เวลารวม {sumtime}</div>
                                    </div>
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
                                    <button type="button" variant="primary" className="btn btn-light" style={{ width: '100%' }} onClick={() => this.showpopupType3(false, this.state.txtsickallday_id)}>ยกเลิก</button>
                                </div>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                            </div>
                        </div>
                    </form>
                </Modal>

                {/* ทำงานปกติ */}
                <Modal
                    show={this.state.showpopupType1}
                    backdrop="static"
                    keyboard={false}
                    StrictMode={true}
                    onHide={() => this.showpopupType1(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <div><strong>เวลาปฎิบัติงาน</strong></div>
                    </Modal.Header>
                    <form onSubmit={this.addWorktime} style={{ display: 'contents' }} autoComplete="on">
                        <Modal.Body>
                            <div className={styles.row} style={{ fontSize: 15 }}>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>วันที่*</label>
                                        <input type="date" className="form-control" value={this.state.txtworktime_date} disabled={true} readOnly={true} onChange={(e) => this.setState({ txtworktime_date: e.target.value })} />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ marginTop: 9 }}>
                                        เวลาทำงาน*
                                        <div className={styles.row}>
                                            <div className="col-sm-6 col-md-6 col-lg-6" style={{ width: '50%' }}>
                                                <label>เวลาเริ่ม</label>
                                                <input type="time" required={true} value={this.state.txtworktime_fristtime} onChange={(e) => this.setState({ txtworktime_fristtime: e.target.value })} className="form-control" style={{ width: '97%' }} />
                                            </div>
                                            <div className="col-sm-6 col-md-6 col-lg-6" style={{ width: '50%' }}>
                                                <label>สิ้นสุด</label>
                                                <input type="time" required={true} min={this.state.txtworktime_fristtime} value={this.state.txtworktime_lasttime} onChange={(e) => this.setState({ txtworktime_lasttime: e.target.value })} className="form-control" style={{ width: '97%' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>โครงการ* {this.state.txtworktime_project}</label>
                                        <Select
                                            options={this.state.optionproject}
                                            value={this.state.optionproject.filter(option => option.value === this.state.txtworktime_project )}
                                            onChange={(e) => this.changeProjectworktime(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>แผนก*</label>
                                        <Select
                                            options={this.state.optiondepartment}
                                            value={this.state.optiondepartment.filter(option => option.value === this.state.txtworktime_department )}
                                            onChange={(e) => this.changeDepworktime(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>กิจกรรม*</label>
                                        <Select
                                            options={this.state.optionactivity}
                                            value={this.state.optionactivity.filter(option => option.value === this.state.txtworktime_activity )}
                                            onChange={(e) => this.changeActivityworktime(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>หมายเหตุ</label>
                                        <input type="text" className="form-control"  value={this.state.txtworktime_comment} onChange={(e) => this.setState({ txtworktime_comment: e.target.value })}/>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '0.75rem', borderTop: '1px solid #dee2e6', borderBottomRightRadius: 'calc(0.3rem - 1px)', borderBottomLeftRadius: 'calc(0.3rem - 1px)' }}>
                            <div className={styles.row} style={{ width: '100%' }}>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                                <div className="col-sm-12 col-md-4 col-lg-4" style={{ marginBottom: 10 }}>
                                    {
                                        this.state.txtworktime_project && this.state.txtworktime_department && this.state.txtworktime_activity ?
                                        <button type="submit" variant="primary" className="btn btn-danger" style={{ width: '100%' }}>ตกลง</button>
                                        :
                                        <button type="button" disabled={true} variant="primary" className="btn btn-danger" style={{ width: '100%' }}>ตกลง</button>
                                    }
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4">
                                    <button type="button" variant="primary" className="btn btn-light" style={{ width: '100%' }} onClick={() => this.showpopupType1(false)}>ยกเลิก</button>
                                </div>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                            </div>
                        </div>
                    </form>
                </Modal>
                {/* แก้ไข ทำงานปกติ */}
                <Modal
                    show={this.state.showpopupeditType1}
                    backdrop="static"
                    keyboard={false}
                    StrictMode={true}
                    onHide={() => this.showpopupeditType1(false, this.state.keypopupType1)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <div><strong>เวลาปฎิบัติงาน</strong></div>
                    </Modal.Header>
                    <form onSubmit={this.editWorktime} style={{ display: 'contents' }} autoComplete="on">
                        <Modal.Body>
                            <div className={styles.row} style={{ fontSize: 15 }}>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>วันที่*</label>
                                        <input type="date" className="form-control" value={this.state.txtworktime_date} disabled={true} readOnly={true} onChange={(e) => this.setState({ txtworktime_date: e.target.value })} />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ marginTop: 9 }}>
                                        เวลาทำงาน*
                                        <div className={styles.row}>
                                            <div className="col-sm-6 col-md-6 col-lg-6" style={{ width: '50%' }}>
                                                <label>เวลาเริ่ม</label>
                                                <input type="time" required={true} value={this.state.txtworktime_fristtime} onChange={(e) => this.setState({ txtworktime_fristtime: e.target.value })} className="form-control" style={{ width: '97%' }} />
                                            </div>
                                            <div className="col-sm-6 col-md-6 col-lg-6" style={{ width: '50%' }}>
                                                <label>สิ้นสุด</label>
                                                <input type="time" required={true} min={this.state.txtworktime_fristtime} value={this.state.txtworktime_lasttime} onChange={(e) => this.setState({ txtworktime_lasttime: e.target.value })} className="form-control" style={{ width: '97%' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>โครงการ*</label>
                                        <Select
                                            options={this.state.optionproject}
                                            value={this.state.optionproject.filter(option => option.value === this.state.txtworktime_project )}
                                            onChange={(e) => this.changeProjectworktime(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>แผนก*</label>
                                        <Select
                                            options={this.state.optiondepartment}
                                            value={this.state.optiondepartment.filter(option => option.value === this.state.txtworktime_department )}
                                            onChange={(e) => this.changeDepworktime(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>กิจกรรม*</label>
                                        <Select
                                            options={this.state.optionactivity}
                                            value={this.state.optionactivity.filter(option => option.value === this.state.txtworktime_activity )}
                                            onChange={(e) => this.changeActivityworktime(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>หมายเหตุ</label>
                                        <input type="text" className="form-control"  value={this.state.txtworktime_comment} onChange={(e) => this.setState({ txtworktime_comment: e.target.value })}/>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '0.75rem', borderTop: '1px solid #dee2e6', borderBottomRightRadius: 'calc(0.3rem - 1px)', borderBottomLeftRadius: 'calc(0.3rem - 1px)' }}>
                            <div className={styles.row} style={{ width: '100%' }}>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                                <div className="col-sm-12 col-md-4 col-lg-4" style={{ marginBottom: 10 }}>
                                    {
                                        this.state.txtworktime_project && this.state.txtworktime_department && this.state.txtworktime_activity ?
                                            <button type="submit" variant="primary" className="btn btn-danger" style={{ width: '100%' }}>ตกลง</button>
                                            :
                                            <button type="button" disabled={true} variant="primary" className="btn btn-danger" style={{ width: '100%' }}>ตกลง</button>
                                    }
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4">
                                    <button type="button" variant="primary" className="btn btn-light" style={{ width: '100%' }} onClick={() => this.showpopupeditType1(false, this.state.keypopupType1)}>ยกเลิก</button>
                                </div>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                            </div>
                        </div>
                    </form>
                </Modal>

                {/* ลาบางช่วงเวลา */}
                <Modal
                    show={this.state.showpopupType2}
                    backdrop="static"
                    keyboard={false}
                    StrictMode={true}
                    onHide={() => this.showpopupType2(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <div><strong>เวลาปฎิบัติงาน</strong></div>
                    </Modal.Header>
                    <form onSubmit={this.addWorkLeavetime} style={{ display: 'contents' }} autoComplete="on">
                        <Modal.Body>
                            <div className={styles.row} style={{ fontSize: 15 }}>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>วันที่*</label>
                                        <input type="date" className="form-control" value={this.state.txtworktimeleave_date} disabled={true} readOnly={true} onChange={(e) => this.setState({ txtworktimeleave_date: e.target.value })} />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ marginTop: 9 }}>
                                        ช่วงเวลาที่ลา
                                        <div className={styles.row}>
                                            <div className="col-sm-6 col-md-6 col-lg-6" style={{ width: '50%' }}>
                                                <label>เริ่ม</label>
                                                <input type="time" value={this.state.txtworktimeleave_fristtime} onChange={(e) => this.setState({ txtworktimeleave_fristtime: e.target.value })} className="form-control" style={{ width: '97%' }} />
                                            </div>
                                            <div className="col-sm-6 col-md-6 col-lg-6" style={{ width: '50%' }}>
                                                <label>สิ้นสุด</label>
                                                <input type="time" required={this.state.txtworktimeleave_fristtime ? true : false} min={this.state.txtworktimeleave_fristtime} value={this.state.txtworktimeleave_lasttime} onChange={(e) => this.setState({ txtworktimeleave_lasttime: e.target.value })} className="form-control" style={{ width: '97%' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ marginTop: 9 }}>
                                        เวลาทำงาน
                                        <div className={styles.row}>
                                            <div className="col-sm-6 col-md-6 col-lg-6" style={{ width: '50%' }}>
                                                <label>เวลาเริ่ม</label>
                                                <input type="time" value={this.state.txtworktimeleave_sfristtime} onChange={(e) => this.setState({ txtworktimeleave_sfristtime: e.target.value })} className="form-control" style={{ width: '97%' }} />
                                            </div>
                                            <div className="col-sm-6 col-md-6 col-lg-6" style={{ width: '50%' }}>
                                                <label>สิ้นสุด</label>
                                                <input type="time" required={this.state.txtworktimeleave_sfristtime ? true : false} min={this.state.txtworktimeleave_sfristtime} value={this.state.txtworktimeleave_elasttime} onChange={(e) => this.setState({ txtworktimeleave_elasttime: e.target.value })} className="form-control" style={{ width: '97%' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>โครงการ*</label>
                                        <Select
                                            options={this.state.optionproject}
                                            value={this.state.optionproject.filter(option => option.value === this.state.txtworktimeleave_project )}
                                            onChange={(e) => this.changeProjectworktimeleave(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>แผนก*</label>
                                        <Select
                                            options={this.state.optiondepartment}
                                            value={this.state.optiondepartment.filter(option => option.value === this.state.txtworktimeleave_department )}
                                            onChange={(e) => this.changeDepworktimeleave(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>กิจกรรม*</label>
                                        <Select
                                            options={this.state.optionactivity}
                                            value={this.state.optionactivity.filter(option => option.value === this.state.txtworktimeleave_activity )}
                                            onChange={(e) => this.changeActivityworktimeleave(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>หมายเหตุ</label>
                                        <input type="text" className="form-control"  value={this.state.txtworktimeleave_comment} onChange={(e) => this.setState({ txtworktimeleave_comment: e.target.value })}/>
                                    </div>
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
                                    <button type="button" variant="primary" className="btn btn-light" style={{ width: '100%' }} onClick={() => this.showpopupType2(false)}>ยกเลิก</button>
                                </div>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                            </div>
                        </div>
                    </form>
                </Modal>
                {/* แก้ไข ลาบางช่วงเวลา */}
                <Modal
                    show={this.state.showpopupeditType2}
                    backdrop="static"
                    keyboard={false}
                    StrictMode={true}
                    onHide={() => this.showpopupeditType2(false, this.state.keypopupeditType2)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <div><strong>เวลาปฎิบัติงาน</strong></div>
                    </Modal.Header>
                    <form onSubmit={this.editWorkLeavetime} style={{ display: 'contents' }} autoComplete="on">
                        <Modal.Body>
                            <div className={styles.row} style={{ fontSize: 15 }}>
                                <div className={styles.row} style={{ marginBottom: 10 }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>วันที่*</label>
                                        <input type="date" className="form-control" value={this.state.txtworktimeleave_date} disabled={true} readOnly={true} onChange={(e) => this.setState({ txtworktimeleave_date: e.target.value })} />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ marginTop: 9 }}>
                                        ช่วงเวลาที่ลา
                                        <div className={styles.row}>
                                            <div className="col-sm-6 col-md-6 col-lg-6" style={{ width: '50%' }}>
                                                <label>เริ่ม</label>
                                                <input type="time" value={this.state.txtworktimeleave_fristtime} onChange={(e) => this.setState({ txtworktimeleave_fristtime: e.target.value })} className="form-control" style={{ width: '97%' }} />
                                            </div>
                                            <div className="col-sm-6 col-md-6 col-lg-6" style={{ width: '50%' }}>
                                                <label>สิ้นสุด</label>
                                                <input type="time" required={this.state.txtworktimeleave_fristtime ? true : false} min={this.state.txtworktimeleave_fristtime} value={this.state.txtworktimeleave_lasttime} onChange={(e) => this.setState({ txtworktimeleave_lasttime: e.target.value })} className="form-control" style={{ width: '97%' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ marginTop: 9 }}>
                                        เวลาทำงาน
                                        <div className={styles.row}>
                                            <div className="col-sm-6 col-md-6 col-lg-6" style={{ width: '50%' }}>
                                                <label>เวลาเริ่ม</label>
                                                <input type="time" value={this.state.txtworktimeleave_sfristtime} onChange={(e) => this.setState({ txtworktimeleave_sfristtime: e.target.value })} className="form-control" style={{ width: '97%' }} />
                                            </div>
                                            <div className="col-sm-6 col-md-6 col-lg-6" style={{ width: '50%' }}>
                                                <label>สิ้นสุด</label>
                                                <input type="time" required={this.state.txtworktimeleave_sfristtime ? true : false} min={this.state.txtworktimeleave_sfristtime} value={this.state.txtworktimeleave_elasttime} onChange={(e) => this.setState({ txtworktimeleave_elasttime: e.target.value })} className="form-control" style={{ width: '97%' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>โครงการ*</label>
                                        <Select
                                            options={this.state.optionproject}
                                            value={this.state.optionproject.filter(option => option.value === this.state.txtworktimeleave_project )}
                                            onChange={(e) => this.changeProjectworktimeleave(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>แผนก*</label>
                                        <Select
                                            options={this.state.optiondepartment}
                                            value={this.state.optiondepartment.filter(option => option.value === this.state.txtworktimeleave_department )}
                                            onChange={(e) => this.changeDepworktimeleave(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>กิจกรรม*</label>
                                        <Select
                                            options={this.state.optionactivity}
                                            value={this.state.optionactivity.filter(option => option.value === this.state.txtworktimeleave_activity )}
                                            onChange={(e) => this.changeActivityworktimeleave(e)}
                                            styles={stylesselect}
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>หมายเหตุ</label>
                                        <input type="text" className="form-control"  value={this.state.txtworktimeleave_comment} onChange={(e) => this.setState({ txtworktimeleave_comment: e.target.value })}/>
                                    </div>
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
                                    <button type="button" variant="primary" className="btn btn-light" style={{ width: '100%' }} onClick={() => this.showpopupeditType2(false, this.state.keypopupeditType2)}>ยกเลิก</button>
                                </div>
                                <div className="col-sm-12 col-md-2 col-lg-2"></div>
                            </div>
                        </div>
                    </form>
                </Modal>

                {/* ประเภท */}
                <Modal
                    show={this.state.showpopupselecttype}
                    backdrop="static"
                    keyboard={false}
                    StrictMode={true}
                    onHide={() => this.showpopupselecttype(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <div><strong>เลือกประเภท</strong></div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={styles.row} style={{ fontSize: 15 }}>
                            <div className={styles.row} style={{ marginBottom: 10 }}>
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                    <button type="button" className="btn btn-outline-dark" style={{ width: '100%' }} onClick={() => this.setTypetimesheet('1')}>มาทำงานทั้งวัน</button>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-12" style={{ marginTop: 10 }}>
                                    <button type="button" className="btn btn-outline-dark" style={{ width: '100%' }} onClick={() => this.setTypetimesheet('2')}>ลาป่วยบางช่วงเวลา</button>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-12" style={{ marginTop: 10 }}>
                                    <button type="button" className="btn btn-outline-dark" style={{ width: '100%' }} onClick={() => this.setTypetimesheet('3')}>ลาทั้งวัน</button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>


                {/* Header */}
                <div className="container" style={{ backgroundColor: '#8e1e23', paddingBottom: 31 }}>
                    {/* Menu Tabs */}
                    <div style={{ textAlign: 'center', fontSize: 20, marginBottom: 15, color: 'white', paddingTop: 20, display: 'flex', flex: 1, flexDirection: 'row' }}>
                        <div style={{ width: '50%', textAlign: 'left', fontSize: 20, marginTop: -5 }}>
                            <div style={{ fontSize: 20 }}>TIMESHEET</div>
                            <div>สำหรับรายเดือน</div>
                        </div>
                        <div style={{ width: '50%', textAlign: 'right' }}>
                            <span onClick={() => this.logOut()}>{this.state.EmployeeCode} {this.state.EmployeeDisplayName}</span>
                            <div>{this.state.typemenu === '1' ? 'ประเภทมาทำงานทั้งวัน' : this.state.typemenu === '2' ? 'ประเภทลาบางช่วงเวลา' : this.state.typemenu === '3' ? 'ประเภทลาทั้งวัน' : 'กรุณาเลือกประเภท'}</div>
                        </div>
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
                                {
                                    this.state.typemenu === '1' ? // ทำงานปกติ
                                        <>
                                            <div className="col-sm-12 col-md-12 col-lg-12" style={{ marginTop: 0 }}>
                                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', width: '100%' }}>
                                                    <div style={{ width: '33.333333333333333%', textAlign: 'right' }}>
                                                        <button onClick={() => this.showpopupselecttype(true)} style={{width: '95%', backgroundColor: '#8c1e21', color: 'white'}} type="button" className="btn"><i className="fa-solid fa-arrow-rotate-right"></i> เปลี่ยน</button>
                                                    </div>
                                                    <div style={{ width: '33.333333333333333%', textAlign: 'right' }}>
                                                        {
                                                            this.state.txtworktime_status !== '2' && this.state.txtworktime_item && this.state.txtworktimeleave_status !== '2' && this.state.txtsickallday_item.leave_typesave !=='2' ?
                                                            <button type="button" style={{width: '95%', backgroundColor: '#8c1e21', color: 'white'}} className="btn" onClick={() => this.saveType1()}><i className="fa-solid fa-floppy-disk"></i> SAVE</button>
                                                            :
                                                            <button type="button" style={{width: '95%', backgroundColor: '#8c1e21', color: 'white', opacity: 0.2 }} disabled={true} className="btn"><i className="fa-solid fa-floppy-disk"></i> SAVE</button>
                                                        }
                                                    </div>
                                                    <div style={{ width: '33.333333333333333%', textAlign: 'right' }}>
                                                        {
                                                            this.state.txtworktime_status === '1' && this.state.txtworktime_item && this.state.txtworktimeleave_status !== '2' && this.state.txtsickallday_item.leave_typesave !=='2' ?
                                                            <button type="button" style={{width: '95%', backgroundColor: 'blue', color: 'white'}} className="btn" onClick={() => this.submitType1()}><i className="fa-solid fa-paper-plane"></i> SEND</button>
                                                            :
                                                            <button type="button" style={{width: '95%', backgroundColor: 'blue', color: 'white', opacity: 0.2 }} disabled={true} className="btn" ><i className="fa-solid fa-paper-plane"></i> SEND</button>
                                                        }
                                                    </div>
                                                    <div style={{ width: '33.333333333333333%', textAlign: 'right' }}>
                                                        {
                                                            this.state.txtworktime_status !== '2' && this.state.txtworktimeleave_status !== '2' && this.state.txtsickallday_item.leave_typesave !=='2' ?
                                                                <button type="button" style={{ width: '95%', backgroundColor: '#8c1e21', color: 'white' }} className="btn" onClick={() => this.showpopupType1(true)}><i className="fa-solid fa-calendar-plus"></i> เพิ่ม</button>
                                                                :
                                                                <button type="button" style={{ width: '95%', backgroundColor: '#8c1e21', color: 'white', opacity: 0.2 }} disabled={true} className="btn"><i className="fa-solid fa-calendar-plus"></i> เพิ่ม</button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-lg-12" style={{ marginTop: 10 }}>
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>เริ่ม</th>
                                                            <th>สิ้นสุด</th>
                                                            <th>รายละเอียด</th>
                                                            <th>แก้ไข</th>
                                                            <th>ลบ</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.txtworktime_item ?
                                                                this.state.txtworktime_item.map((item, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{item.worktime_fristtime}</td>
                                                                            <td>{item.worktime_lasttime}</td>
                                                                            <td>
                                                                                <div style={{ fontSize: 11 }}>โครงการ : 
                                                                                    {item.worktime_projectlabel}
                                                                                </div>
                                                                                <div style={{ fontSize: 11 }}>แผนก : 
                                                                                    {item.worktime_departmentlabel}
                                                                                </div>
                                                                                <div style={{ fontSize: 11 }}>กิจกรรม : 
                                                                                    {item.worktime_activitylabel}
                                                                                </div>
                                                                                <div style={{ fontSize: 11 }}>หมายเหตุ : {item.worktime_comment}</div>
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    this.state.txtworktime_status !== '2' && this.state.txtworktimeleave_status !== '2' && this.state.txtsickallday_item.leave_typesave !=='2' ?
                                                                                    <button onClick={() => this.showpopupeditType1(true, index)} type="button" className="btn" style={{ backgroundColor: '#bd2027', color: 'white' }}><i className="fa-solid fa-pen-to-square"></i></button>
                                                                                    :
                                                                                    <></>
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    this.state.txtworktime_status !== '2' && this.state.txtworktimeleave_status !== '2' && this.state.txtsickallday_item.leave_typesave !=='2' ?
                                                                                        <button onClick={() => this.removeType1(index)} type="button" className="btn" style={{ backgroundColor: '#bd2027', color: 'white' }}><i className="fa-solid fa-trash"></i></button>
                                                                                        :
                                                                                        <></>
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }) :
                                                                <tr><td colSpan={5}>-</td></tr>
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                        :
                                        <></>
                                }
                                {
                                    this.state.typemenu === '2' ? // ลาบางช่วงเวลา
                                        <>
                                            <div className="col-sm-12 col-md-12 col-lg-12" style={{ marginTop: 0 }}>
                                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', width: '100%' }}>
                                                    <div style={{ width: '33.333333333333333%', textAlign: 'right' }}>
                                                        <button onClick={() => this.showpopupselecttype(true)} style={{width: '95%', backgroundColor: '#8c1e21', color: 'white'}} type="button" className="btn"><i className="fa-solid fa-arrow-rotate-right"></i> เปลี่ยน</button>
                                                    </div>
                                                    <div style={{ width: '33.333333333333333%', textAlign: 'right' }}>
                                                        {
                                                            this.state.txtworktimeleave_status !== '2' && this.state.txtworktimeleave_item  && this.state.txtworktime_status !== '2' && this.state.txtsickallday_item.leave_typesave !=='2' ?
                                                            <button type="button" style={{width: '95%', backgroundColor: '#8c1e21', color: 'white'}} className="btn" onClick={() => this.saveType2()}><i className="fa-solid fa-floppy-disk"></i> SAVE</button>
                                                            :
                                                            <button type="button" style={{width: '95%', backgroundColor: '#8c1e21', color: 'white', opacity: 0.2 }} disabled={true} className="btn"><i className="fa-solid fa-floppy-disk"></i> SAVE</button>
                                                        }
                                                    </div>
                                                    <div style={{ width: '33.333333333333333%', textAlign: 'right' }}>
                                                        {
                                                            this.state.txtworktimeleave_status === '1' && this.state.txtworktimeleave_item && this.state.txtworktime_status !== '2' && this.state.txtsickallday_item.leave_typesave !=='2' ?
                                                            <button type="button" style={{width: '95%', backgroundColor: 'blue', color: 'white'}} className="btn" onClick={() => this.submitType2()}><i className="fa-solid fa-paper-plane"></i> SEND</button>
                                                            :
                                                            <button type="button" style={{width: '95%', backgroundColor: 'blue', color: 'white', opacity: 0.2 }} disabled={true} className="btn" ><i className="fa-solid fa-paper-plane"></i> SEND</button>
                                                        }
                                                    </div>
                                                    <div style={{ width: '33.333333333333333%', textAlign: 'right' }}>
                                                        {
                                                            this.state.txtworktimeleave_status !== '2'&& this.state.txtworktime_status !== '2' && this.state.txtsickallday_item.leave_typesave !=='2' ?
                                                                <button type="button" style={{ width: '95%', backgroundColor: '#8c1e21', color: 'white' }} className="btn" onClick={() => this.showpopupType2(true)}><i className="fa-solid fa-calendar-plus"></i> เพิ่ม</button>
                                                                :
                                                                <button type="button" style={{ width: '95%', backgroundColor: '#8c1e21', color: 'white', opacity: 0.2 }} disabled={true} className="btn"><i className="fa-solid fa-calendar-plus"></i> เพิ่ม</button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-lg-12" style={{ marginTop: 10 }}>
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>เริ่ม</th>
                                                            <th>สิ้นสุด</th>
                                                            <th>รายละเอียด</th>
                                                            <th>แก้ไข</th>
                                                            <th>ลบ</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                            this.state.txtworktimeleave_item ?
                                                                this.state.txtworktimeleave_item.map((item, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>
                                                                                <div style={{fontSize: 13}}>{item.worktimeleave_fristtime ? 'ลา '+item.worktimeleave_fristtime : ''}</div>
                                                                                <div style={{fontSize: 13}}>{item.worktimeleave_sfristtime ? 'ทำงาน '+item.worktimeleave_sfristtime : ''}</div>
                                                                            </td>
                                                                            <td>
                                                                                <div>{item.worktimeleave_lasttime}</div>
                                                                                <div>{item.worktimeleave_elasttime}</div>
                                                                            </td>
                                                                            <td>
                                                                                <div style={{ fontSize: 11 }}>โครงการ : {item.worktimeleave_projectlabel}</div>
                                                                                <div style={{ fontSize: 11 }}>แผนก : {item.worktimeleave_departmentlabel}</div>
                                                                                <div style={{ fontSize: 11 }}>กิจกรรม : {item.worktimeleave_activitylabel}</div>
                                                                                <div style={{ fontSize: 11 }}>หมายเหตุ : {item.worktimeleave_comment}</div>
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    this.state.txtworktimeleave_status !== '2' && this.state.txtworktime_status !== '2' && this.state.txtsickallday_item.leave_typesave !=='2' ?
                                                                                    <button onClick={() => this.showpopupeditType2(true, index)} type="button" className="btn" style={{ backgroundColor: '#bd2027', color: 'white' }}><i className="fa-solid fa-pen-to-square"></i></button>
                                                                                    :
                                                                                    <></>
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    this.state.txtworktimeleave_status !== '2' && this.state.txtworktime_status !== '2' && this.state.txtsickallday_item.leave_typesave !=='2' ?
                                                                                        <button onClick={() => this.removeType2(index)} type="button" className="btn" style={{ backgroundColor: '#bd2027', color: 'white' }}><i className="fa-solid fa-trash"></i></button>
                                                                                        :
                                                                                        <></>
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }) :
                                                                <tr><td colSpan={5}>-</td></tr>
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                        :
                                        <></>
                                }
                                {
                                    this.state.typemenu === '3' ? // ลาทั้งวัน
                                        <div className="col-sm-12 col-md-12 col-lg-12" style={{ marginTop: 0 }}>
                                            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', width: '100%' }}>
                                                <div style={{ width: '33.333333333333333%', textAlign: 'right' }}>
                                                    <span>
                                                        <button onClick={() => this.showpopupselecttype(true)} type="button" className="btn" style={{ width: '95%', backgroundColor: '#8c1e21', color: 'white' }}><i className="fa-solid fa-arrow-rotate-right"></i> เปลี่ยน</button>
                                                    </span>
                                                </div>
                                                <div style={{ width: '33.333333333333333%', textAlign: 'right' }}>
                                                    {
                                                        this.state.txtsickallday_item.leave_typesave !== '2' && this.state.txtworktime_status !== '2' && this.state.txtworktimeleave_status !== '2' ?
                                                            <span>
                                                                <button onClick={() => this.saveSickleave()} type="button" className="btn" style={{ width: '95%', backgroundColor: '#8c1e21', color: 'white' }}><i className="fa-solid fa-floppy-disk"></i> SAVE</button>
                                                            </span>
                                                            :
                                                            <span>
                                                                <button type="button" className="btn" style={{ width: '95%', backgroundColor: '#8c1e21', color: 'white', opacity: 0.2 }} disabled={true}><i className="fa-solid fa-floppy-disk"></i> SAVE</button>
                                                            </span>
                                                    }
                                                </div>
                                                <div style={{ width: '33.333333333333333%', textAlign: 'right' }}>
                                                    {
                                                        this.state.txtsickallday_item.leave_typesave !== '2' && this.state.txtworktime_status !== '2' && this.state.txtworktimeleave_status !== '2' ?
                                                            <span>
                                                                <button onClick={() => this.submitSickleave()} type="button" className="btn " style={{ width: '95%', backgroundColor: 'blue', color: 'white' }}><i className="fa-solid fa-floppy-disk"></i> SUBMIT</button>
                                                            </span>
                                                            :
                                                            <span>
                                                                <button type="button" className="btn " style={{ width: '95%', backgroundColor: 'blue', color: 'white', opacity: 0.2}} disabled={true}><i className="fa-solid fa-floppy-disk"></i> SUBMIT</button>
                                                            </span>
                                                    }
                                                </div>
                                            </div>
                                            <div className={styles.row}>
                                                <div className="col-sm-12 col-md-12 col-lg-12" style={{ marginTop: 10 }}>
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th style={{textAlign: 'left'}}>เริ่ม</th>
                                                                <th style={{textAlign: 'left'}}>สิ้นสุด</th>
                                                                <th style={{textAlign: 'center'}}>จำนวนชั่วโมง</th>
                                                                <th style={{textAlign: 'left'}}>สถานะ</th>
                                                                <th style={{textAlign: 'center'}}>แก้ไข</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                this.state.txtsickallday_item ?
                                                                    <tr>
                                                                        <td>{this.state.txtsickallday_item.leave_fristtime}</td>
                                                                        <td>{this.state.txtsickallday_item.leave_lasttime}</td>
                                                                        <td style={{textAlign: 'center'}}>
                                                                            <div style={{ fontSize: 11 }}>{sumtime}</div>
                                                                        </td>
                                                                        <td style={{textAlign: 'left'}}>
                                                                            <div style={{ fontSize: 11 }}>
                                                                                {
                                                                                    this.state.txtsickallday_item.leave_typesave === '1' ? 'บันทึกแล้ว' : this.state.txtsickallday_item.leave_typesave === '2' ? 'ส่งข้อมูลแล้ว' : ''
                                                                                }
                                                                            </div>
                                                                        </td>
                                                                        <td style={{textAlign: 'center'}}>
                                                                            {
                                                                                this.state.txtsickallday_item.leave_typesave !== '2' && this.state.txtworktime_status !== '2' && this.state.txtworktimeleave_status !== '2' ?
                                                                                <button type="button" onClick={() => this.showpopupType3(true, this.state.txtsickallday_item.leave_id)} className="btn" style={{ backgroundColor: '#bd2027', color: 'white' }}><i className="fa-solid fa-pen-to-square"></i></button>
                                                                                :
                                                                                <></>
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                    : <></>
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <></>
                                }
                            </div>
                        </div>
                        :
                        <div className="container" style={{ marginTop: 20 }}>
                            <div className={styles.row}>
                                <div className="col-sm-12 col-md-12 col-lg-12">รายการส่งข้อมูล</div>

                            </div>
                        </div>
                }



                <br /><br /><br />
            </>
        );
    }
}
