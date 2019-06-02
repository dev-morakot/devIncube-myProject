import React, { Component } from 'react';
import Lang from './components/Lang/Lang';

export default {
    items: [
        {
            name: <Lang name="Menu Product" />,
            url: '/admin/products',
            icon: 'icon-layers'
        },
        {
            name: <Lang name="Menu Partner" />,
            url: '/admin/partners',
            icon: 'icon-people'
        },
        {
            name: <Lang name="Menu Purchase Order" />,
            url: '/admin/purchaseOrder',
            icon: 'icon-list'
        }
    ]
};