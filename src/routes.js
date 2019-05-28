import React from 'react';
import DefaultLayout from './containers/DefaultLayout';


// Admin
const DashboardAdmin = React.lazy(() => import('./views/Admin/Dashboard/Dashboard'));
const Products = React.lazy(() => import('./views/Admin/Product/Products'));


const routes = [
    { path: '/', exact: true, name: 'Home', component: DefaultLayout },
    { path: '/dashboard', exact: true, name: 'Dashboard', component: DashboardAdmin},
    { path: '/admin/products', exact: true, name: 'Products', component: Products}
];

export default routes;