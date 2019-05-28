import { combineReducers } from 'redux';
import UploadReducer from './UploadReducer';
import AuthReducer from './AuthReducer';
import ProductReducer from './ProductReducer';
import PartnerReducer from './PartnerReducer';
import LoaderReducer from './LoaderReducer';

const rootReducers = combineReducers({
    auth: AuthReducer,
    loader: LoaderReducer,
    uploads: UploadReducer,
    products: ProductReducer,
    partners: PartnerReducer
});

export default rootReducers;