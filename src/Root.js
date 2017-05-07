import React from 'react';
import './backgrounds.css';
import logo from './logo.svg';
import App from './App'
import './Root.css';

class Root extends React.Component {
    render() {
        return (
            <div>
                <div className="row my-header icon-bg-dark">
                    <div className="col-xs-12 col-md-1 col-lg-3 center-xs logo-section">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="col-xs-12 col-md-10 col-lg-6">
                        <div className="segment">
                        <div className="ms-font-su ms-fontColor-neutralLighter ">
                            Find Similar Bible Verses
                        </div>
                        <div className="ms-font-l ms-fontColor-neutralLight">
                            WITH NATURAL LANGUAGE TECHNIQUES.
                        </div>
                        </div>
                    </div>
                </div>
                <div className="row center-xs icon-bg">
                    <div className="col-xs-12 col-md-10 col-lg-6">
                        <App className="app"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Root;