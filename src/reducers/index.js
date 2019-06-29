import { combineReducers } from 'redux';
import UploadReducer from './UploadReducer';
import AuthReducer from './AuthReducer';
import ProductReducer from './ProductReducer';
import PartnerReducer from './PartnerReducer';
import LoaderReducer from './LoaderReducer';
import PurchaseOrderReducer from './PurchaseOrderReducer';
import PurhcaseOrderLineReducer from './PurchaseOrderLineReducer';

const rootReducers = combineReducers({
    auth: AuthReducer,
    loader: LoaderReducer,
    uploads: UploadReducer,
    products: ProductReducer,
    partners: PartnerReducer,
    purchaseOrder: PurchaseOrderReducer,
    purchaseOrderLine: PurhcaseOrderLineReducer
});

export default rootReducers;