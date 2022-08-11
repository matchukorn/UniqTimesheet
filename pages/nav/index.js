import React, { Component } from 'react';
import  { getCookie, removeCookies } from 'cookies-next';
import styles from '../../styles/main.module.css';
import Image from 'next/image';
// import logo from '../../public/logo.png';


export default class Navbarx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '5700001',
            name: 'นายนุกูล กิมพันธ์',
        }
    }
    componentDidMount() {
    }
    logout = () => {
        removeCookies('email', { path: '/', domain: '' }); //
        window.location.href = "/";
    }

    render() {
        return (
            <div className={styles.row}>
                <div className={styles.bantopl} style={{marginTop: 10}}>
                    {/* <Image src={logo} width="50" height="50" alt="logo"/> */}
                    <div className={styles.titleheader} style={{width: '63%', marginTop: -52, marginLeft: 58}}>บริษัท ยูนิค เอ็นจิเนียริ่ง แอนด์ คอนสตรัคชั่น จํากัด (มหาชน)</div>
                    <div className={styles.titleheader} style={{width: '74%', marginTop: 0, marginLeft: 58}}>Unique Engineering and Construction Public Company Limited.</div>
                </div>
                <div className={styles.bantopr}>
                    <div>{this.state.email} {this.state.name}</div>
                    <div className={styles.logout} onClick={() => this.logout()} style={{cursor: 'pointer', fontWeight: 'bold', marginTop: 5}}>LOGOUT</div>
                </div>
            </div>
        );
    }
}

