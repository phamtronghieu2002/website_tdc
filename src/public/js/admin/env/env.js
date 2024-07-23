// const DOMAIN = 'http://192.168.0.106';
// const DOMAIN = window.location.origin;
const DOMAIN = window.location.protocol + "//" + window.location.hostname+":4018";
const NODE_SERVER = DOMAIN + "";
const CLIENT = NODE_SERVER + "/admin";
const LOGIN_PAGE = NODE_SERVER + "/admin/login";

// main

// const DOMAIN = window.location.protocol + "//" + window.location.hostname;
// const NODE_SERVER = DOMAIN + "";
// const CLIENT = NODE_SERVER + "/admin";
// const LOGIN_PAGE = NODE_SERVER + "/admin/login";

// API
//GET API
const GET_EVENT_API = "/order/event/all";

const PRODUCT_API = NODE_SERVER + "/product/productsadmin";
const CATEGORY_API = NODE_SERVER + "/product/category";
const HOME_CONTENT_API = NODE_SERVER + "/pageInterface/content/home";
const DISP_LAYPAGE_API = NODE_SERVER + "/pageInterface/theme";
const INFOR_PAGE_API = NODE_SERVER + "/pageInterface/infor";
const SERVICE_CONTENT_API = NODE_SERVER + "/pageInterface/service";
const NEWS_API = NODE_SERVER + "/pageInterface/news";
const CONTACTS_API = NODE_SERVER + "/order/contact/all";
const RECRUITMENTS_API = NODE_SERVER + "/pageInterface/recr";
const ADVERTISEMENT_API = NODE_SERVER + "/pageInterface/advertisement";
const POLICYS_API = NODE_SERVER + "/pageInterface/policys"; //new 17/2

const CV_API = NODE_SERVER + "/pageinterface/recruitment/cv/all"; //new 22/11
const CONFIG_API = NODE_SERVER + "/auth/config"; //new 25/11

const ACOUNT_API = NODE_SERVER + "/api/account/all"; //new 25/11
const DOMAIN_API = NODE_SERVER + "/api/domain/all"; //new 25/11

//POST API
const UPDATE_VIEW_API = NODE_SERVER + "/api/update/view/content";
const UPDATE_PRODUCT_API = NODE_SERVER + "/product/update";
const ADD_PRODUCT_API = NODE_SERVER + "/product/add";
const ADD_CATEGORY_API = NODE_SERVER + "/product/category/add";
const ODERS_API = NODE_SERVER + "/order/all";
const IMAGES_API = NODE_SERVER + "/pageinterface/image/all";
const UPDATE_SERVICE_API = NODE_SERVER + "/api/update/service/content";
const ADD_SERVICE_API = NODE_SERVER + "/api/add/service/content";
const SORT_CATEGORY_API = NODE_SERVER + "/product/category/sort"; //new 14/11
const UPDATE_CATEGORY_API = NODE_SERVER + "/product/update/category"; //new 14/11

const UPDATE_NEWS_API = NODE_SERVER + "/api/update/news/content"; //new 15/11
const ADD_NEWS_API = NODE_SERVER + "/api/add/news/content"; //new 15/11

const UPDATE_RECRUITMENT_API = NODE_SERVER + "/api/update/recruitment/content"; //new 18/11
const ADD_RECRUITMENT_API = NODE_SERVER + "/api/add/recruitment/content"; //new 18/11

const ADD_POLICYS_API = NODE_SERVER + "/api/add/policys"; //new 18/11

const UPDATE_CONFIG_API = NODE_SERVER + "/auth/config/update"; //new 25/11

const UPDATE_ADVERTISEMENT_API =
  NODE_SERVER + "/pageInterface/advertisement/update"; //new 28/11

const UPDATE_POLICYS_API = NODE_SERVER + "/pageInterface/policys/update"; //new 17/2

const ODERS_FILTER_API = NODE_SERVER + "/order/filter";
const ODERS_UPDATE_API = NODE_SERVER + "/order/update";
const THEME_UPDATE_API = NODE_SERVER + "/pageInterface/theme/update";
const INFOR_UPDATE_API = NODE_SERVER + "/pageInterface/infor/update";
const SEO_UPDATE_API = NODE_SERVER + "/pageInterface/seo/update";
const UPLOAD_IMAGE_API = NODE_SERVER + "/pageInterface/image/upload";
const DELETE_IMAGE_API = NODE_SERVER + "/pageInterface/image/delete";

const CHANGE_PASS_API = NODE_SERVER + "/auth/change/pass";
const UPDATE_DOMAIN_API = NODE_SERVER + "/api/domain/update"; //new 7/12
const ADD_DOMAIN_API = NODE_SERVER + "/api/domain/add"; //new 7/12


const  ADD_AGENCYS_API = NODE_SERVER + "/api/add-agencys"; //new 7/12
