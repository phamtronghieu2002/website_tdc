const app = {
    data: {
        currTab: 1,
        products: [],
        category: [],
        orders: [],
        theme: [],
        infor: [],
        image: [],
        service: [],
        new: [],
        recruitments: [],
        config: [],
    },
    handleEvent: function () {
        menuBtn.onclick = (e) => {
            sideBar.style.display = 'flex';
            sideBar.classList.add('animate__fadeInLeft');
            sideBar.classList.remove('animate__fadeOutLeft');
            opacityMenu.style.display = 'block';
            opacityMenu.classList.add('animate__fadeIn');
            opacityMenu.classList.remove('animate__fadeOut');
            closeMenuIcon.style.display = 'flex';
        };
        closeMenuIcon.onclick = (e) => {
            sideBar.classList.remove('animate__fadeInLeft');
            sideBar.classList.add('animate__fadeOutLeft');
            opacityMenu.classList.remove('animate__fadeIn');
            opacityMenu.classList.add('animate__fadeOut');
            closeMenuIcon.style.display = 'none';
            setTimeout(() => {
                opacityMenu.style.display = 'none';
            }, 300);
        };
        opacityMenu.onclick = (e) => {
            closeMenuIcon.click();
        };
        reloadBtn.onclick = (e) => {
            // console.log(app.data.currTab);
            app.handleTab('', app.data.currTab);
        };
        closeOpacityBtn.onclick = (e) => {
            tools.displayOpacity('hidden');
        };
        logoutBtn.onclick = (e) => {
            tools.displayOpacity('show', 'Đăng xuất khỏi hệ thống?');
            tools.confirm(() => {
                localStorage.removeItem('admin_token');
                window.location = LOGIN_PAGE;
            });
        };
        mainOption.forEach((option, index) => {
            option.onclick = (e) => {
                e.stopPropagation();

                app.data.currTab = index;
                app.handleTab(option);
                multiOption.forEach((multiOp) => {
                    const isActive = multiOp.querySelector('.active');
                    if (isActive) {
                        return;
                    }
                    multiOp.classList.remove('active');
                    multiOp.children[1].classList.remove('show');
                });
            };
        });
        multiOption.forEach((multiOp) => {
            multiOp.onclick = (e) => {
                if (multiOp.className.includes('active')) {
                    multiOp.children[1].classList.remove('show');
                    multiOp.classList.remove('active');
                    return;
                }
                // mainOption.forEach((op) => {
                //     op.classList.remove('active');
                // });
                // multiOption.forEach((e) => e.classList.remove(active));
                multiOp.classList.add('active');
                multiOp.children[1].classList.add('show');
            };
        });
    },
    handleTab: function (option_, index = null) {
        if (closeMenuIcon.style.display === 'flex') {
            closeMenuIcon.click();
        }
        // console.log(closeMenuIcon.style.display);
        mainOption.forEach((op) => op.classList.remove('active'));
        const option = index !== null ? mainOption[index] : option_;
        const tab = option.getAttribute('tab') || option;
        headerLeft.children[0].innerHTML = option.children[0].children[1].innerHTML;
        if (option.parentElement.parentElement.className.includes('multi-option')) {
            headerLeft.children[0].innerHTML = `<span>${option.parentElement.parentElement.children[0].children[1].innerHTML} / <span>${option.children[0].children[1].innerHTML}</span>`;
        }
        option.classList.add('active');
        mainContent.innerHTML = components.loader();
        switch (tab) {
            
            case 'dashboard': {
                // console.log(tab);

                break;
            }
            case 'solutions-page': {
                render.solutionPage();
                break;
            }
            case 'agency-page': {
                render.agencyPage();
                break;
            }
            case 'registerSolutions-page':{
                render.customerRegisterSolutions();
                break;
            }
            case 'products': {
                render.productsPage();
                break;
            }
            case 'add-products': {
                render.addProductsPage();
                break;
            }
            case 'orders': {
                render.ordersPage();
                break;
            }
            case 'header-page': {
                render.headerPage();
                break;
            }
            case 'footer-page': {
                render.footerPage();
                break;
            }
            case 'home-page': {
                render.homePage();
                break;
            }
            case 'products-page': {
                render.wordProductsPage();
                break;
            }
            case 'service-page': {
                render.servicePage();
                break;
            }
            case 'news-page': {
                render.newsPage();
                break;
            }

            case 'contact': {
                render.contactPage();
                break;
            }
            case 'openning-event': {
                render.oppenningEvent();
                break;
            }
            case 'recruitment-page': {
                render.recruitmentPage();
                break;
            }
            case 'advertisement-page': {
                render.advertisementPage();
                break;
            }
            case 'policys-page': {
                render.policysPage();
                break;
            }
            case 'infor-page': {
                render.inforPage();
                break;
            }
            case 'theme-page': {
                render.themePage();
                break;
            }
            case 'cv-recruitment-page': {
                render.cvRecruitmentPage();
                break;
            }
            case 'config-manange': {
                render.configPage();
                break;
            }
            case 'seo-infor-page': {
                render.seoConfigPage();
                break;
            }
            case 'image-manange': {
                render.imageManange();
                break;
            }
            case 'acc-manage': {
                render.accManagePage();
                break;
            }
            case 'manager': {
                render.managerPage();
                break;
            }
            case 'log-out': {
                break;
            }
        }
    },
    config: {
        imageTab: function () {
            return tools.config.imageWrapperUI();
        },
        UI: function (permission_id) {
            $_('.sidebar-content-top').innerHTML = components.mainUI(permission_id);
            tools.reDefiniteVar();
            app.config.imageTab();
        },
    },
    start: function () {
        mainContent.innerHTML = components.loader();
        tools.checkLogin().then((feedback) => {
            app.config.UI(feedback.permission_id);

            tools.getData(PRODUCT_API).then((products) => {
                tools.getData(CATEGORY_API).then((categoty) => {
                    app.data.products = products;
                    app.data.category = categoty;

                    this.handleTab('', this.data.currTab);
                    this.handleEvent();
                });
            });
        });
    },
};
app.start();
