

const render = {
  customerRegisterSolutions() {
    axios.get("/api/getCustomersRegister").then(res => {
      const data = res.data.data
      mainContent.innerHTML = components.registerCustomerSolutionPage(data);
     
      $('#customer_register_table').DataTable();
      const checkStatus = $('.check_status')
      checkStatus.on('change', function() {
        const isChecked = $(this).is(':checked')
         try {
          tools.displayOpacity("show", `xác nhận đã tư vấn cho khách này?`);
          tools.confirm(() => {
       
            
            axios.put(`/api/updateCustomersRegister`,{
              id: $(this).attr('data-id'),
              isCheck: isChecked
            }).then((feedback) => {
              if (feedback.data.status === 1) {
                tools.displayOpacity("hidden");
                showToast(
                  "Thành công",
                  "success",
                  "Đã cập nhật",
                  toast_duration
                );
             
              } else {
                tools.displayOpacity("hidden");
                showToast(
                  `Có lỗi`,
                  "error",
                  `Mã lỗi: <b> UPDx0${feedback.data.status}</b>`,
                  toast_duration
                );
              }
            });
          });
         } catch (error) {
          
         }
      })
    }).catch(error => console.log(error))



  },
  solutionPage() {
    axios.get('/api/all-solutions').then((res) => {
      dataSolutions = res.data;

      mainContent.innerHTML = components.solutionPage.mainPage(dataSolutions);
      handleEvent.handleSolutionMainPage();
    });

  },
  solutionPageAddUI() {
    mainContent.innerHTML = components.solutionPage.addSolutionPage();
    handleEvent.handleSolutionAddPage();

  },
  agencyPage() {
    mainContent.innerHTML = components.agencyPage();
    handleEvent.handleAgentPage();
  },
  homePage: function () {
    tools.getData(HOME_CONTENT_API).then((homeView) => {
      // console.log(homeView);
      const contentView = homeView.find((view) => view.name === "mainContent");
      const commentView = homeView.find((view) => view.name === "comments");
      mainContent.innerHTML = components.homePage(
        contentView.content,
        commentView.content
      );
      tinymce.EditorManager.editors = [];

      tinymce.remove("#edit-text-home");
      tinymce.remove("#edit-text-home-comment");

      tools.config.tinymceInit("#edit-text-home", "600");

      // tinymce.init({
      //     selector: '#edit-text-home',
      //     height: '600',
      // });
      tinymce.init({
        selector: "#edit-text-home-comment",
        height: "400",

        // plugins: 'add_image help',
        // toolbar: 'add_image | help',
      });
      // tinymce.DOM.setHTML('#edit-text-home', '<p>Hello</p>');

      document.querySelector(".content-home-page-save-btn").onclick = (e) => {
        tools.displayOpacity("show", "Xác nhận sửa giao diện?");
        tools.confirm(() => {
          var myContent = tinymce.get("edit-text-home").getContent();
          const body = {
            view: "home",
            name: "mainContent",
            content: myContent,
          };
          tools.postData(UPDATE_VIEW_API, body).then((feedback) => {
            if (feedback.data.status === 1) {
              showToast(
                "Đã lưu",
                "success",
                "Lưu thành công giao diện",
                toast_duration
              );
              closeOpacityBtn.click();
            } else {
              showToast("Có lỗi", "error", "Có lỗi khi lưu", toast_duration);
              closeOpacityBtn.click();
            }
          });
        });
      };
      document.querySelector(".content-home-comment-page-save-btn").onclick = (
        e
      ) => {
        tools.displayOpacity("show", "Xác nhận sửa giao diện?");
        tools.confirm(() => {
          var myContent = tinymce.get("edit-text-home-comment").getContent();
          const body = {
            view: "home",
            name: "comments",
            content: myContent,
          };
          tools.postData(UPDATE_VIEW_API, body).then((feedback) => {
            if (feedback.data.status === 1) {
              showToast(
                "Đã lưu",
                "success",
                "Lưu thành công giao diện",
                toast_duration
              );
              closeOpacityBtn.click();
            } else {
              showToast("Có lỗi", "error", "Có lỗi khi lưu", toast_duration);
              closeOpacityBtn.click();
            }
          });
        });
      };
    });
  },
  wordProductsPage: async function () {
    return tools.getData(PRODUCT_API).then((products) => {
      tools.getData(CATEGORY_API).then((categoty) => {
        app.data.products = products;
        app.data.category = categoty;
        const productData = [...products].filter(
          (product) => Number(product.deleted) === 1
        );
        // console.log(productData);
        mainContent.innerHTML = components.wordProductsPage(
          productData,
          categoty
        );
        handleEvent.wordProductPage(productData, categoty);
      });
    });
  },
  servicePage: function () {
    tools.getData(SERVICE_CONTENT_API).then((data) => {
      // console.log(data);
      const serviceData = [...data];
      app.data.sevice = serviceData;
      mainContent.innerHTML = components.servicePage(serviceData);
      handleEvent.servicePage(serviceData);
    });
  },
  newsPage: function () {
    tools.getData(NEWS_API).then((data) => {
      // console.log(data);
      const newsData = [...data];
      app.data.new = newsData;
      mainContent.innerHTML = components.newsPage(newsData);
      handleEvent.newsPage(newsData);
    });
  },
  oppenningEvent: function () {
    tools.getDataAPI(GET_EVENT_API).then((data) => {
      const evData = [...data?.data?.data.reverse()];
      app.data.evData = evData;
      mainContent.innerHTML = components.evPage(evData);
      // handleEvent.newsPage(newsData);
    });
  },

  contactPage: function () {
    tools.getDataAPI(CONTACTS_API).then((data) => {
      const contactsData = [...data?.data?.data.reverse()];
      app.data.contacts = contactsData;

      mainContent.innerHTML = components.contactsPage(contactsData);
      handleEvent.contactsPage(contactsData);
    });
  },
  recruitmentPage: function () {
    tools.getData(RECRUITMENTS_API).then((data) => {
      // console.log(data);
      const recruitmentsData = [...data];
      app.data.recruitments = recruitmentsData;
      mainContent.innerHTML = components.recruitmentsPage(recruitmentsData);
      handleEvent.recruitmentsPage(recruitmentsData);
    });
  },
  policysPage: function () {
    tools.getData(POLICYS_API).then((data) => {
      const policysData = [...data];
      app.data.policys = policysData;
      mainContent.innerHTML = components.policysPage(policysData);
      handleEvent.policysPage(policysData);
    });
  },
  productsPage: async function () {
    return tools.getData(PRODUCT_API).then((products) => {
      tools.getData(CATEGORY_API).then((categoty) => {
        app.data.products = products;
        app.data.category = categoty;
        const productData = [...products].filter(
          (product) => Number(product.deleted) === 1
        );
        // console.log(productData);
        mainContent.innerHTML = components.productsPage(productData, categoty);
        handleEvent.productPage(productData, categoty);
      });
    });
  },

  addProductsPage: function () {
    tools.getData(PRODUCT_API).then((products) => {
      tools.getData(CATEGORY_API).then((categoty) => {
        app.data.products = products;
        app.data.category = categoty;
        mainContent.innerHTML = components.addProductPage(categoty);
        tinymce.remove("#add-product-description-all");
        tools.config.tinymceInit("#add-product-description-all", "600");
        tinymce.remove("#add-product-description");
        tools.config.tinymceInit("#add-product-description", "400");
        // tinymce.init({
        //     selector: '#add-product-description-all',
        //     editor_css: '../css/style.css',
        //     height: '600',
        //     flexGrow: '1',
        // });
        handleEvent.addProductPage(products, categoty);
      });
    });
  },
  ordersPage: function () {
    tools.getDataAPI(ODERS_API).then((orders) => {
      const ordersData = orders.data.data.reverse();
      app.data.orders = ordersData;
      mainContent.innerHTML = components.orderPage(
        tools.handleTabTable(ordersData, 0),
        ordersData
      );
      handleEvent.orderPage(ordersData);
    });
  },

  configPage: function () {
    tools.getDataAPI(CONFIG_API).then((configs) => {
      const configData = configs.data.data[0];
      app.data.config = configData;

      mainContent.innerHTML = components.configPage(configData);
      handleEvent.configPage(configData);
    });
  },
  seoConfigPage: function () {
    tools.getDataAPI(INFOR_PAGE_API).then((configs) => {
      const seoConfigData = configs.data[0];
      // app.data.config = configData;
      // console.log(seoConfigData);

      mainContent.innerHTML = components.seoPage(seoConfigData);
      handleEvent.seoPage(seoConfigData);
    });
  },
  advertisementPage: function () {
    tools.getData(ADVERTISEMENT_API).then((fb) => {
      const advertisementData = fb[0];
      // console.log(advertisementData);
      mainContent.innerHTML = components.advertisementPage(advertisementData);
      handleEvent.advertisementPage(advertisementData);
    });
  },
  inforPage: function () {
    tools.getData(INFOR_PAGE_API).then((infors) => {
      const inforData = infors[0];
      app.data.infor = inforData;

      // console.log(inforData);

      mainContent.innerHTML = components.inforPage(inforData);
      // console.log(themeData);
      handleEvent.inforPage(inforData);
    });
  },
  managerPage: function () {
    tools.getDataAPI(DOMAIN_API).then((fb) => {
      const domainData = fb.data.data;

      // console.log(domainData);
      mainContent.innerHTML = components.managerPage([...domainData]);
      handleEvent.managerPage([...domainData]);
    });
  },
  accManagePage: function () {
    tools.getDataAPI(ACOUNT_API).then((fb) => {
      const accountsData = fb.data.data;

      mainContent.innerHTML = components.accManagePage([...accountsData]);
      handleEvent.accManagePage([...accountsData]);
    });
  },
  cvRecruitmentPage: function () {
    tools.getDataAPI(CV_API).then((cvFb) => {
      const cvData = cvFb.data.data;

      console.log(cvData);

      mainContent.innerHTML = components.cvRecruitmentsPage(cvData);
      handleEvent.cvRecruitmentsPage(cvData);
    });
  },
  themePage: function () {
    tools.getData(DISP_LAYPAGE_API).then((themes) => {
      const themeData = themes[0];
      app.data.theme = themeData;

      mainContent.innerHTML = components.themePage(themeData);
      // console.log(themeData);
      handleEvent.themePage(themeData);
    });
  },
  imageManange: function () {
    tools.getDataAPI(IMAGES_API).then((feedback) => {
      app.data.image = [...feedback.data.data];
      mainContent.innerHTML = components.imageManangePage(app.data.image);
      handleEvent.imageManangePage(app.data.image);
    });
  },
  headerPage: function () {
    mainContent.innerHTML = components.headerPage();
  },
  footerPage: function () {
    mainContent.innerHTML = components.footerPage();
  },
};
