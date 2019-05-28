import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import _ from 'lodash';
export default function Lang(props) {
    if(_.isObject(props.name)) {
        return props.name;
    } else {
        return <Trans>{props.name}</Trans>
    }
}