import React from 'react';
import DefaultLayout from './containers/DefaultLayout';


// Admin
const DashboardAdmin = React.lazy(() => import('./views/Admin/Dashboard/Dashboard'));
const Products = React.lazy(() => import('./views/Admin/Product/Products'));
const PurchaseOrder = React.lazy(() => import('./views/Admin/PurchaseOrder/PurchaseOrder'));
const PurchaseOrderAdd = React.lazy(() => import("./views/Admin/PurchaseOrder/PurchaseOrderAdd"));


const routes = [
    { path: '/', exact: true, name: 'Home', component: DefaultLayout },
    { path: '/dashboard', exact: true, name: 'Dashboard', component: DashboardAdmin},
    { path: '/admin/products', exact: true, name: 'Products', component: Products},
    { path: '/admin/purchaseOrder', exact: true, name: 'Purchase Order', component: PurchaseOrder},
    { path: '/admin/purchaseOrder/add', exact: true, name: 'Create Purchase Order', component: PurchaseOrderAdd}
];

export default routes;