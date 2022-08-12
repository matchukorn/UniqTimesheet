import React, { Component } from 'react';
import styles from '../../styles/main.module.css';
import Navbarx from '../nav';
import Link from 'next/link';


export default class BI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            listmenu: []
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

    render() {
        return (
            <>
                <Navbarx />
                <hr style={{ height: 5, backgroundColor: '#8c1e21' }} />
                <div className={styles.row} style={{}}>
                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ textAlign: 'center', fontSize: 25, marginBottom: 20 }}>
                        <div style={{ fontWeight: 'bold' }}>BI REPORT</div>
                        <div>Unique Engineering and Construction</div>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12' role="alert" style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                        <div className="alert alert-dark" role="alert">
                            <Link href='/main'>หน้าแรก</Link>
                        </div>
                    </div>
                    <div className={styles.row} style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                        {
                            this.state.listmenu ?
                                this.state.listmenu.map((item, index) => {
                                    return (
                                        <div className="col-lg-2 col-md-2 col-sm-12" key={index} style={{ marginBottom: 15 }}>
                                            <div className={styles.boxmenu + ' card'} style={{ width: '98%', border: '5px solid #8c1e21' }}>
                                                <Link href={item.linkx}>
                                                <div className="card-body">
                                                    <center>
                                                        <div><i className="fa-solid fa-chart-pie" style={{ fontSize: 35 }}></i></div>
                                                        <div className="card-title">{item.title}</div>
                                                    </center>
                                                </div>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }) : <div></div>
                        }
                    </div>
                </div>
            </>
        );
    }
}
