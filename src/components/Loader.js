import React, { Component } from 'react';
import loader from './../assets/img/loader.svg';
import _ from 'lodash';
const style = {
    loaderCss: {
        position: 'fixed',
        zIndex: 100000,
        color: '#FF6700',
        width: '100%',
        height: '100%',
        background: 'rgba(204, 204, 204, 0)'
    },
    positionLoader: {
        position: 'relative',
        width: 200,
        height: 200,
        textAlign: 'center',
        margin: 'auto',
        top: '45%'
    }
}

class Loader extends Component {
    render() {
        let text = 'loading';
        if(_.has(this.props,'text')&&!_.isUndefined(this.props.text)) {
            text = this.props.text;
        }
        return (
            <div className="loader" style={style.loaderCss}>
                <div style={style.positionLoader}>
                    <div><img src={loader} alt=""/></div>
                    <div>{text}</div>
                </div>
            </div>
        );
    }
}

export default Loader;