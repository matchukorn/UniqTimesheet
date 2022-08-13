import React, { Component } from 'react';
import styles from '../styles/login.module.css';
import logo from '../public/logouniq.png';
import Image from 'next/image';
import { getCookie, setCookies } from 'cookies-next';
import Swal from 'sweetalert2'
import Service from './api/Service';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      s_heigth: 0,
    }
    this.submitLogin = this.submitLogin.bind(this);
    this.username = React.createRef();
  }
  componentDidMount() {
    this.setState({ s_heigth: window.innerHeight });
    if (getCookie('token')) {
      window.location.href = "/timesheet"
    } else {
      
    }
  }

  submitLogin = (event) => {
    let user = this.username.current.value;
    try {
      if (user) {
        // window.location.href = '/main';
        new Service().gettoken(user).then(res => {
          if(res.data.status==='1'){
            setCookies('token', res.data.token, { path: '/', domain: '', maxAge: 4 * 60 * 60 });
            window.location.href = "/timesheet";
          }else{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'ไม่พบรหัสพนักงาน',
              showConfirmButton: false,
              timer: 1500
            })
          }
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'กรุณากรอกรหัสพนักงาน',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (error) {
    }
    event.preventDefault();
  }




  render() {
    return (
      <div className={styles.row} style={{ backgroundColor: '', height: this.state.s_heigth }}>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className={styles.row} style={{ marginTop: 100 }}>
            <div className="col-lg-4 col-md-4 col-sm-12"></div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="card" style={{ border: '0px solid' }}>
                <div className="card-body">
                  <form onSubmit={this.submitLogin} style={{ display: 'contents' }} autoComplete="on">
                    <div className={styles.row}>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <center>
                          <Image src={logo} alt="logo" width={120} height={150}/>
                        </center>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12"><br /></div>
                      <div className="col-lg-6 col-md-6 col-sm-12" style={{ textAlign: 'left', fontSize: 25 }}>Sign In</div>
                      <div className="col-lg-12 col-md-12 col-sm-12" style={{ marginTop: 15 }}>
                        <input type="text" className="form-control" name="username" ref={this.username} placeholder="รหัสพนักงาน" autoFocus={true} />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12" style={{ marginTop: 15 }}>
                        <button type="submit" className="btn btn-success" style={{ width: '100%', backgroundColor: '#8c1e21' }}>Sign In</button>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12" style={{ marginTop: 25, textAlign: 'center' }}>
                        <div style={{ fontSize: 11 }}>บริษัท ยูนิค เอ็นจิเนียริ่ง แอนด์ คอนสตรัคชั่น จํากัด (มหาชน)</div>
                        <div style={{ fontSize: 11 }}>version 1.0</div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12"></div>
          </div>

        </div>
      </div>
    );
  }
}
