import React from 'react';
import DefaultLayout from './containers/DefaultLayout';


// Admin
const DashboardAdmin = React.lazy(() => import('./views/Admin/Dashboard/Dashboard'));
const Products = React.lazy(() => import('./views/Admin/Product/Products'));
const ProductAdd = React.lazy(() => import('./views/Admin/Product/ProductAdd'));
const ProductDetail = React.lazy(() => import('./views/Admin/Product/ProductDetail'));
const ProductEdit = React.lazy(() => import('./views/Admin/Product/ProductEdit'));

const PurchaseOrder = React.lazy(() => import('./views/Admin/PurchaseOrder/PurchaseOrder'));
const PurchaseOrderAdd = React.lazy(() => import("./views/Admin/PurchaseOrder/PurchaseOrderAdd"));
const PurchaseOrderDetail = React.lazy(() => import("./views/Admin/PurchaseOrder/PurchaseOrderDetail"));
const PurchaseOrderEdit = React.lazy(() => import("./views/Admin/PurchaseOrder/PurchaseOrderEdit"));

const Partners = React.lazy(() => import("./views/Admin/Partner/Partners"));
const PartnerAdd = React.lazy(() => import("./views/Admin/Partner/PartnerAdd"));
const PartnerEdit = React.lazy(() => import("./views/Admin/Partner/PartnerEdit"));
const PartnerDetail = React.lazy(() => import("./views/Admin/Partner/PartnerDetail"));

const routes = [
    { path: '/', exact: true, name: 'Home', component: DefaultLayout },
    { path: '/dashboard', exact: true, name: 'Dashboard', component: DashboardAdmin},
    { path: '/admin/purchaseOrder', exact: true, name: 'Purchase Order', component: PurchaseOrder},
    { path: '/admin/purchaseOrder/add', exact: true, name: 'Create Purchase Order', component: PurchaseOrderAdd},
    { path: '/admin/purchaseOrder/:id', exact: true, name: 'Purchase Order Detail', component: PurchaseOrderDetail},
    { path: '/admin/purchaseOrder/edit/:id', exact: true, name: 'Edit Purchase Order', component: PurchaseOrderEdit},

    { path: '/admin/products', exact: true, name: 'Products', component: Products},
    { path: '/admin/products/add', exact: true, name: 'Create Product', component: ProductAdd},
    { path: '/admin/products/:id', exact: true, name: 'Product Detail', component: ProductDetail},
    { path: '/admin/products/edit/:id', exact: true, name: 'Edit Product', component: ProductEdit},

    { path: '/admin/partners', exact: true, name: 'Partners', component: Partners},
    { path: '/admin/partners/add', exact: true, name: 'Create Partner', component: PartnerAdd},
    { path: '/admin/partners/:id', exact: true, name: 'Partner Detail', component: PartnerDetail},
    { path: '/admin/partners/edit/:id', exact: true, name: 'Edit Partner', component: PartnerEdit},
];

export default routes;