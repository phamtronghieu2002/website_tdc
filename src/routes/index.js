const authRouter = require("./auth");
const apiRouter = require("./api");
const productRouter = require("./products");
const orderRouter = require("./orders");
const pageInterfaceRouter = require("./pageInterface");

const homePageRouter = require("./page/home");
const introducePageRouter = require("./page/introduce");
const productPageRouter = require("./page/product");
const servicePageRouter = require("./page/service");
const newsPageRouter = require("./page/news");
const recrPageRouter = require("./page/recr");
const contactPageRouter = require("./page/contact");
const cartPageRouter = require("./page/cart");
const adminPageRouter = require("./page/admin");
const orderPageRouter = require("./page/order");
const searchPageRouter = require("./page/search");
const policysPageRouter = require("./page/policys");
const docsPageRouter = require("./page/docs");
const eventPageRouter = require("./page/event");
const solutionsPageRouter = require("./page/solutions");
function route(app) {


  app.use("/auth", authRouter);
  app.use("/api", apiRouter);
  app.use("/appapi", apiRouter);
  app.use("/product", productRouter);
  app.use("/order", orderRouter);
  app.use("/pageinterface", pageInterfaceRouter);


  app.use("/gioi-thieu", introducePageRouter);
  //   app.use("/san-pham", productPageRouter);
  //   app.use("/dich-vu", servicePageRouter);
  app.use("/tin-tuc", newsPageRouter);
  app.use("/tuyen-dung", recrPageRouter);
  app.use("/lien-he", contactPageRouter);
  app.use( solutionsPageRouter);
  //   app.use("/gio-hang", cartPageRouter);
  app.use("/thanh-toan", orderPageRouter);
  app.use("/admin", adminPageRouter);
  app.use("/tim-kiem", searchPageRouter);
  app.use("/chinh-sach", policysPageRouter);
  app.use("/tai-lieu", docsPageRouter);
  app.use("/su-kien", eventPageRouter);
  app.use("/", homePageRouter);
  app.use("/trang-chu", homePageRouter);
  app.use("/:slug", productPageRouter);
}

module.exports = route;
