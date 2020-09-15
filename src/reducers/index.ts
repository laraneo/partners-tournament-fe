import {
  combineReducers
} from 'redux';

import modalReducer from './modalReducer';
import snackBarReducer from './snackBarReducer';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import loginReducer from './loginReducer';
import bankReducer from './bankReducer';
import countryReducer from './countryReducer';
import sportReducer from './sportReducer';
import professionReducer from './professionReducer';
import personReducer from './personReducer';
import maritalStatusReducer from './maritalStatusReducer';
import statusPersonReducer from './statusPersonReducer';
import genderReducer from './genderReducer';
import roleReducer from './roleReducer';
import permissionReducer from './permissionReducer';
import userReducer from './userReducer';
import relationTypeReducer from './relationTypeReducer';
import paymentMethodReducer from './paymentMethodReducer';
import cardTypeReducer from './cardTypeReducer';
import secondModalReducer from './secondModalReducer';
import shareReducer from './shareReducer';
import cardPersonReducer from './cardPersonReducer';
import transactionTypeReducer from './transactionTypeReducer';
import shareMovementReducer from './shareMovementReducer';
import currencyReducer from './currencyReducer';
import shareTypeReducer from './shareTypeReducer';
import locationReducer from './locationReducer';
import accessControlReducer from './accessControlReducer';
import parameterReducer from './parameterReducer';
import lockerReducer from './lockerReducer';
import lockerLocationReducer from './lockerLocationReducer';
import recordReducer from './recordReducer';
import recordTypeReducer from './recordTypeReducer';
import departmentReducer from './departmentReducer';
import noteReducer from './noteReducer';
import bancoEmisorReducer from './bancoEmisorReducer';
import bancoReceptorReducer from './bancoReceptorReducer';
import reportePagosReducer from './reportePagosReducer';
import webServiceReducer from './webServiceReducer';
import menuReducer from './menuReducer';
import widgetReducer from './widgetReducer';
import menuItemReducer from './menuItemReducer';
import mainLoaderReducer from './mainLoaderReducer';
import tCategoryTypeReducer from './tCategoryTypeReducer';
import tCategoryReducer from './tCategoryReducer';
import tournamentReducer from './tournamentReducer';
import tRuleTypeReducer from './tRuleTypeReducer';
import tPaymentMethodReducer from './tPaymentMethodReducer';
import tCategoriesGroupReducer from './tCategoriesGroupReducer';
import groupReducer from './groupReducer';
import customModalReducer from './customModalReducer';
import menuItemIconReducer from './menuItemIconReducer';

const rootReducer = combineReducers({
  modalReducer,
  snackBarReducer,
  productReducer,
  categoryReducer,
  loginReducer,
  bankReducer,
  countryReducer,
  sportReducer,
  professionReducer,
  personReducer,
  maritalStatusReducer,
  statusPersonReducer,
  genderReducer,
  roleReducer,
  permissionReducer,
  userReducer,
  relationTypeReducer,
  paymentMethodReducer,
  cardTypeReducer,
  secondModalReducer,
  shareReducer,
  cardPersonReducer,
  transactionTypeReducer,
  shareMovementReducer,
  currencyReducer,
  shareTypeReducer,
  locationReducer,
  accessControlReducer,
  parameterReducer,
  lockerReducer,
  lockerLocationReducer,
  recordReducer,
  recordTypeReducer,
  departmentReducer,
  noteReducer,
  bancoEmisorReducer,
  bancoReceptorReducer,
  reportePagosReducer,
  webServiceReducer,
  menuReducer,
  widgetReducer,
  menuItemReducer,
  mainLoaderReducer,
  tCategoryTypeReducer,
  tCategoryReducer,
  tournamentReducer,
  tRuleTypeReducer,
  tPaymentMethodReducer,
  tCategoriesGroupReducer,
  groupReducer,
  customModalReducer,
  menuItemIconReducer
});

export default rootReducer;