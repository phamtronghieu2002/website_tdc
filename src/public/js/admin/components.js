{
    /* <button class="edit-text-home-save-btn button-circle" ><i class="fas fa-save"></i></button> */
}
const components = {
    registerCustomerSolutionPage(data) {
        function formatDateToYYYYMMDD(dateString) {
            // Tạo một đối tượng Date từ chuỗi ngày giờ
            const dateObj = new Date(dateString);
        
            // Lấy năm, tháng và ngày từ đối tượng Date
            const year = dateObj.getUTCFullYear();
            const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0'); // Thêm 1 vì tháng trong Date bắt đầu từ 0
            const day = dateObj.getUTCDate().toString().padStart(2, '0');
        
            // Định dạng lại thành chuỗi YYYY-MM-DD
            return `${year}-${month}-${day}`;
        }
        return `
    <div class="main-title-layout">
        <h3 class="orange main-title-text">Khách hàng quan tâm</h3>
     </div>

                        <table class="table" id="customer_register_table">
  <thead>
    <tr>
      <th scope="col">Họ tên</th>
      <th scope="col">Tỉnh thành</th>
      <th scope="col">Số điện thoại</th>
      <th scope="col">Lời nhắn</th>
      <th scope="col">Thời gian</th>
      <th scope="col">Đã tư vấn</th>
    </tr>
  </thead>
  <tbody>
          ${data.map(item => `
                   <tr>
      <th scope="row">${item.username}</th>
      <td>${item.province}</td>
      <td>${item.phonenumber}</td>
      <td>
       <textarea class="form-control">${item.message}</textarea>
      </td>
      <td>${formatDateToYYYYMMDD(item.createdAt)}</td>
      <td>
        <input data-id=${item.id} class="check_status"  type ="checkbox"  ${item.isCheck ?  "checked" :""}/>
      </td>
          
    </tr>
                `).join('')
            }  
 
  </tbody>
</table>

                
                `
    },
    solutionPage: {
        header({ action }) {
            return `
    <div class="main-title-layout">
                        <h3 class="orange main-title-text">Các giải pháp hiện có</h3>
                        <div class="main-title-right">
                       
                      ${action !== "add"
                    ? `
                           <button class="add-solutions-btn high-light-btn-border"><svg viewBox="0 0 32 32"><path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></path></svg> Thêm giải pháp mới</button> 
                           <button class="delete-solutions-btn high-light-btn-border">Xoá giải pháp</button>
                           <button class="update-solutions-btn high-light-btn-border">Lưu</button>
                          `
                    : `<button class="save-solutions-btn high-light-btn-border">Thêm</button> 
                             <button class="cancel-solutions-btn high-light-btn-border">Hủy</button>
                          `
                }
                      
                        </div>
         </div>
        `;
        },
        sideBarLeft(data) {
            console.log("data >> ", data);
            return `
          <div class="content-left">
                                ${data
                    ? data
                        .map((item) => {
                            return `
                                        <div class="solution-item news-item " solution-id="${item.id}">
                                            <div class="solution-name news-name">${item.name}</div>
                                            <div class="solution-priority news-infor">Độ ưu tiên: ${item.priority}</div>
                                        </div>`;
                        })
                        .join("")
                    : `<div class="news-item active"> Thêm giải pháp mới</div>`
                }
        </div>
    
        `;
        },
        contentRight(data) {
            return `
         <div class="content-right">
                          <div class="update-all-value">
                           <span class="update-all-value-title"><span class="orange">*</span> Tên giải pháp(tiếng việt) </span>
                            <input 
                             type="text"
                             value="${data ? data.name : ""}"
                             class="solution_input solution_name_input"
                             name="name-solution"
                             placeholder="Nhập Tên giải pháp(tiếng việt)" 
                            />
                          </div>
                            <div class="update-all-value">
                           <span class="update-all-value-title"><span class="orange">*</span> Tên giải pháp(tiếng anh) </span>
                            <input 
                             type="text"
                             value="${data ? data.name_en : ""}"
                             class="solution_input solution_name_en_input"
                             name="name-solution"
                             placeholder="Nhập Tên giải pháp(tiếng anh)" 
                            />
                          </div>
                            <div class="update-all-value">
                                  <span class="update-all-value-title"><span class="orange">*</span> Mô tả giải pháp(tiếng việt) </span>
                            <input
                            id="description"
                            type="text"
                            value="${data ? data.description : ""}"
                            class="solution_input " 
                            name="desc-solution"
                            placeholder="Nhập Mô tả giải pháp(tiếng việt)" />
                            </div>
                           <div class="update-all-value">
                                  <span class="update-all-value-title"><span class="orange">*</span> Mô tả giải pháp(tiếng anh) </span>
                            <input
                            id="description_en"
                            type="text"
                            value="${data ? data.description_en : ""}"
                            class="solution_input " 
                            name="desc-solution"
                            placeholder="Nhập Mô tả giải pháp(tiếng anh)" />
                            </div>

                               <div class="update-all-value">
            <span class="update-all-value-title"><span class="orange">*</span> Banner </span>
            <input
             type="text" 
             id="banner-image-input"
             data-name="img"
             class="news-image-input required-infor" style="display: none" 
             value="${data ? data.banner : ''}">
            <div class="set-image-item plus-image-item" style="background-image: url('/static/images/interface/${data ? data.banner : ''}');">
                <div class="plus-alt-wrapper news-img-item">
                    <div class="plus alt"></div>
                    <span>Chọn hình ảnh</span>
                </div>
            </div>

              <span class="update-all-value-title"><span class="orange">*</span> Ảnh GIF </span>
            <input 
            type="text" 
            id="thumbnail-image-input"
            data-name="img"
            class="news-image-input
            required-infor" style="display: none"
            value="${data ? data.thumbnail : ''}">
            <div class="set-image-item plus-image-item" style="background-image: url('/static/images/interface/${data ? data.thumbnail : ''}');">
                <div class="plus-alt-wrapper news-img-item">
                    <div class="plus alt"></div>
                    <span>Chọn hình ảnh</span>
                </div>
            </div>
        </div>
                            <div class="update-all-value">
                            <span class="update-all-value-title"><span class="orange">*</span> Ảnh/Video </span>

                   
                            <input type="file" id="fileInput" class="filepond" name="filepond" multiple data-allow-reorder="true" data-max-file-size="15000KB" data-max-files="20" />
                           
                         
                                        
                            </div>
                            <div class="update-all-value">
                                    <span class="update-all-value-title"><span class="orange">*</span> Độ ưu tiên </span>
                                    <select class="solutions_select">
                                 ${priorities
                    .map((priority) => {
                        return `
                         
                                <option value="${priority}" ${data?.priority === priority
                                ? "selected"
                                : ""
                            }>${priority}</option>
                           
                                      `;
                    })
                    .join("")}
                          </select>
                            </div>
     
                            <div class="update-all-value">
                                <span class="update-all-value-title"><span class="orange">*</span> Nội dung(tiếng việt) </span>

                                <textarea id="edit-content-solution">
                                    ${data ? data.content : ""}
                                     </textarea>
                                        
                            </div>
                              <div class="update-all-value">
                                <span class="update-all-value-title"><span class="orange">*</span> Nội dung(tiếng anh) </span>

                                <textarea id="edit-content-en-solution">
                                    ${data ? data.content_en : ""}
                                     </textarea>
                                        
                            </div>
                        <div class="update-all-value">
                            <span class="update-all-value-title"><span class="orange">*</span> Thông số kĩ thuật(tiếng việt)</span>

                        <textarea id="edit-technum-solution">
                            ${data ? data.technum : ""}
                            </textarea>
                        </div>

                            <div class="update-all-value">
                            <span class="update-all-value-title"><span class="orange">*</span> Thông số kĩ thuật(tiếng anh)</span>

                        <textarea id="edit-technum-en-solution">
                            ${data ? data.technum_en : ""}
                            </textarea>
                        </div>
                  
                  
                           
</div>       
                        
`;
        },
        mainPage(data) {
            return `
            <div class="wrapper-solution-page">
                        ${this.header({})}
                    <div class="row">
                        ${this.sideBarLeft(data)}
                        ${this.contentRight()}                     
                    </div>
                </div>
        `;
        },
        addSolutionPage() {
            return `
        <div class="wrapper-solution-page">
                    ${this.header({ action: "add" })}
                <div class="row">
                    ${this.sideBarLeft()}
                    ${this.contentRight()}                     
                </div>
            </div>
    `;
        },
    },
    agencyPage() {
        return `
                <div class="wrapper_agency_page">
                  <input
                              id="fileInput"
                              type="file"
                              class="filepond"
                              name="filepond"
                              multiple
                              data-allow-reorder="true"
                              data-max-file-size="500kb"
                              data-max-files="20"
                            />
                        <button class="save-img-btn btn-primary btn"><i class="fa-solid fa-floppy-disk"></i>Lưu</button>
                </div>
            `;
    },
    homePage: function (manContent, comments) {
        return `
        <div class='page-wrapper ${fadeInAnimate}'>
            <div class='page-editor-wrapper'>
                <div class='page-editor-title'> 
                    <h3>Nội dung trang</h3> 
                    <div class='page-editor-action'>
                        <button class='content-home-page-save-btn button'>Lưu<button>
                    </div>
                </div>
                
                <textarea id="edit-text-home">
                    ${manContent}
                </textarea>
            </div>

            <div class='page-editor-wrapper'>
                <div class='page-editor-title'> 
                    <h3>Comments</h3> 
                    <div class='page-editor-action'>
                        <button class='content-home-comment-page-save-btn button'>Lưu<button>
                    </div>
                </div>
            
                <textarea id="edit-text-home-comment">
                    ${comments}
                </textarea>
            </div>
            
        </div>
        `;
    },
    contentMail(data) {
        return `
    <html>
      <head>
        <style>
          .blog-sidebar-box-item {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(56, 56, 56, 0.2);
}
    .blog-item .img-box {
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    flex: 1.5;
}
    .blog-sidebar-box-item .content-box {
    margin: 0 0 0 30px;
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
    .blog-item .content-box {
    margin: 26px;
    display: inline-block;
    flex: 3;
}
    .blog-item .img-box img {
    width: 100%;
    transition: all 0.3s linear;
    /* border-radius: 10px; */
    object-fit: cover;
}
    .h-100 {
    height: 100% !important;
}
    .blog-item .content-box .btn-box {
    margin-top: 10px;
}
    .blog-item {
    cursor: pointer;
}

.blog-sidebar-box-item .content-box .title-box h3 {
    font-size: 20px;
    line-height: 30px;
}
    .blog-item .content-box .title-box h3 {
    font-size: 26px;
    line-height: 38px;
}
        </style>
      </head>
      <body>
        <div class="container">
         <a href="/tin-tuc/quan-ly-doi-xe,-tai-xe-theo-giam-sat-hanh-trinh-5g-gps-862284" class="blog-sidebar-box-item blog-item d-sm-flex wow fadeInUp" data-wow-delay="500ms" data-wow-duration="1500ms">
                    <div class="img-box">
                      <img alt="blog" loading="lazy" width="236" height="174" decoding="async" data-nimg="1" class="h-100" src="https://taixecongnghe.com/static/images/interface/image-1715056690731.jpg">
                    </div>
                    <div class="content-box">
                      <div class="meta-box">
                        <div class="meta-info d-flex">
                          <div class="icon">
                            <i class="flaticon-calendar"></i>
                          </div>
                          <span>07/05/2024</span>
                        </div>
                      </div>
                      <div class="title-box">
                        <h3>
                          Quản lý đội xe, tài xế theo Giám sát hành trình 5G GPS
                        </h3>
                      </div>
                      <div class="btn-box">
                        <div class="read-more"><span class="txt">Đọc
                            thêm</span><i class="flaticon-right-arrow"></i></div>
                      </div>
                    </div>
                  </a>
      
        </div>
      </body>
    </html>
  `
    },
    wordProductsPage: function (products, categories) {
        const filterArray = [];
        categories.forEach((category) => {
            const item = products.filter(
                (product) => product.category_id === category.id
            );
            filterArray.push({
                category_id: category.id,
                category_name: category.name,
                products: item,
            });
        });
        return `
        <div class='word-product-page-wrapper ${fadeInAnimate}'>
        <div class='page-editor-wrapper' style='display: none'>
            <div class='page-editor-title'> 
                <h3>UI</h3> 
                <div class='page-editor-action'>
                    <button class='content-home-page-save-btn button'>Lưu<button>
                </div>
            </div>
            
           
        </div>

        <div class='page-editor-wrapper'>
            <div class='page-editor-title'> 
                <h3>Sắp xếp</h3> 
                <div class='page-editor-action'>
                    <button class='sort-save-btn button'>Lưu<button>
                </div>
            </div>

            <div class='main-wordproducts-wrapper'>

            ${filterArray
                .map((filter, index) => {
                    return `
                <div class='category-item-wrapper ${ZoomInAnimate}' draggable="true" id='${filter.category_id}'>
                    <div class='category-item'>
                        <h3 class='category-name'>
                            ${filter.category_name}
                        </h3>
                        <span>Tổng cộng ${filter.products.length} sản phẩm</span>
                    </div>
                </div>
                `;
                })
                .join("")}    
            </div>
        </div>
        
    </div>
        `;
    },
    seoPage: function (seoData) {
        return `
        
        <div class='account-page-wrapper'>
        <div class='main-acc-content'>
            <div class='area-layout'>
                <div class='layout-title'>
                    <div class='layout-title-left'>
                        <h3>Tối ưu đường dẫn liên kết</h3>
                    </div>
                    <div class='layout-title-right'>
                    <div class='action-layout-wrapper'> <button class='save-seo-infor-btn high-light-btn'>Lưu</button></div>
                    </div>
                </div>
                <div class='area-layout-content'>
                    <div class='change-password-admin'>
                        
                        <div class="update-all-value">
                            <span class='update-all-value-title'><span class='orange'></span> Mô tả trang: </span>
                            <input type='text' id="news-title" data-name='description' class='news-title required-infor' placeholder="Nhập mô tả trang" value='${seoData.description}'/>
                        </div>

                        <div class="update-all-value">
                        <span class='update-all-value-title'><span class='orange'></span> Ảnh bìa </span>
                        <input  type='text' id="service-image-input" data-name='image_shortlink' class='service-image-input required-infor' style='display: none'value='${seoData.image_shortlink}' />
                        <div class='set-image-item plus-image-item' style='background-image: url("${seoData.image_shortlink}");'>
                            <div class='plus-alt-wrapper service-img-item'>
                                <div class="plus alt"></div>
                                <span>Chọn hình ảnh</span>
                            </div>
                        </div>
                    </div>

                        
                    </div>
                </div>
            </div>

            <div class='area-layout'>
                <div class='layout-title'>
                    <div class='layout-title-left'>
                        <h3>Nhúng mã vào trang web</h3>
                    </div>
                    <div class='layout-title-right'>
                    <div class='action-layout-wrapper'> <button class='save-script-infor-btn high-light-btn'>Lưu</button></div>
                    </div>
                </div>
                <div class='area-layout-content'>
                    <div class='change-password-admin'>
                        
                        <div class="update-all-value">
                            <span class='update-all-value-title'><span class='orange'></span> Mã Google Analytics: </span>
                            <input type='text' id="news-title" data-name='google_analytics' class='news-title required-infor-script' placeholder="Nhập mô tả trang" value='${seoData.google_analytics}'/>
                        </div>

                        <div class="update-all-value">
                            <span class='update-all-value-title'><span class='orange'></span> Mã Javascript </span>
                            <textarea type='text' id="news-title" data-name='js_code' class='news-title required-infor-script' placeholder="Nhập mô tả trang" >${seoData.js_code}</textarea>
                        </div>

                    </div>

                        
                    </div>
                </div>
            </div>

           
        </div>
        </div>
        
        `;
    },
    accManagePage: function (accountsData) {
        const adminAcc = accountsData.find((account) => account.permission_id == 1);
        return `
        
        <div class='account-page-wrapper'>
        <div class='main-acc-content'>
            <div class='area-layout'>
                <div class='layout-title'>
                    <div class='layout-title-left'>
                        <h3>Tài khoản Admin </h3>
                    </div>
                    <div class='layout-title-right'>
                        
                    </div>
                </div>
                <div class='area-layout-content'>
                    <div class='change-password-admin'>
                        <h4>Đổi mật khẩu</h4>
                        <div class="update-all-value">
                            <span class='update-all-value-title'><span class='orange'>*</span> Email: </span>
                            <input disabled type='text' id="news-title" data-name='email' class='news-title' placeholder="Nhập mật khẩu cũ" value='${adminAcc.email}'/>
                        </div>
                        <div class="update-all-value">
                            <span class='update-all-value-title'><span class='orange'>*</span> Mật khẩu cũ </span>
                            <input  type='password' id="news-title" data-name='oldpass' class='news-title required-infor' placeholder="Nhập mật khẩu cũ"/>
                        </div>
                        <div class="update-all-value">
                            <span class='update-all-value-title'><span class='orange'>*</span> Mật khẩu mới </span>
                            <input  type='password' id="news-title" data-name='newpass' class='news-title required-infor' placeholder="Nhập mật khẩu mới"/>
                        </div>
                        <div class="update-all-value">
                            <span class='update-all-value-title'><span class='orange'>*</span> Nhập lại mật khẩu mới </span>
                            <input  type='password' id="news-title" data-name='renewpass' class='news-title required-infor' placeholder="Nhập lại mật khẩu mới"/>
                        </div>
                        
                        <div class='action-layout-wrapper'> <button class='change-pass-btn high-light-btn'><i class="fas fa-key"></i> Đổi mật khẩu</button></div>
                    </div>
                </div>
            </div>

            <div class='area-layout' style='display: none;'>
                <div class='layout-title'>
                    <div class='layout-title-left'>
                        <h3>Tài khoản CTV</h3>
                    </div>
                    <div class='layout-title-right'>
                        
                    </div>
                </div>
                <div class='area-layout-content'>
                    
                </div>
            </div>
        </div>
        </div>
        
        `;
    },
    managerPage: function (domainData) {
        return `
        
        <div class='products-wrapper ${fadeInAnimate}'>
                <div class='domain-manager main-products'>
                    
                    <div class='main-product-layout product-layout'> 
                        <div class='main-table-action'>
                            <div class='option-action active'>Tất cả</div>
                            <div class='option-action'>Running</div>
                            <div class='option-action'>Disabled</div>
                            <div class='add-product-btn-wrapper'>
                                <button class='add-domain-btn high-light-btn'><svg viewBox="0 0 32 32"><path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></path></svg> Thêm domain khác</button>              
                            </div>
                        </div>                 
                        
                            <div class='category-wrapper'>    
                                <div class='products-area'>
                                <div class='table-wrapper'>
                                    <table>
                                    ${components.managerThreat()}  
                                        <tbody class='product-tbody'>
                                        ${domainData
                .map((domain, index) => {
                    // components.productCard(product);
                    return components.managerTr(
                        domain,
                        index
                    );
                })
                .join("")}  
                                        </tbody>    
                                    </table>
                                </div>          
                                </div>

                            </div>
                        
                    </div>
                </div>
            </div>
        
        `;
    },
    managerTable: function (domainData) {
        return `
        <div class='products-area'>
                                <div class='table-wrapper'>
                                    <table>
                                    ${components.managerThreat()}  
                                        <tbody class='product-tbody'>
                                        ${domainData
                .map((domain, index) => {
                    // components.productCard(product);
                    return components.managerTr(
                        domain,
                        index
                    );
                })
                .join("")}  
                                        </tbody>    
                                    </table>
                                </div>          
                                </div>
        `;
    },
    managerThreat: function () {
        return `
        <thead>                    
        <tr>
        <th class='stt-table th-product'>STT</th> 
        <th class='product-name-table th-product'>
        <div class='th-wrapper th-wrapper-name'>
                <span>Domain</span> 
                <div class='sort-icon'>
                    <i class="fas fa-sort-up"></i>
                    <i class="fas fa-sort-down"></i>
                </div> 
            </div>
        </th> 
        <th class='th-product'>
            <div class='th-wrapper  th-wrapper-inventory_num'>
                <span>Database</span> 
                <div class='sort-icon'>
                    <i class="fas fa-sort-up"></i>
                    <i class="fas fa-sort-down"></i>
                </div> 
            </div>
        </th> 
        <th class='th-product'>
            <div class='th-wrapper th-wrapper-price'>
                <span>Tên, mô tả</span> 
                <div class='sort-icon'>
                    <i class="fas fa-sort-up"></i>
                    <i class="fas fa-sort-down"></i>
                </div> 
            </div>
        </th> 
        <th class='th-product'>
            <div class='th-wrapper  th-wrapper-sold'>
                <span>Trạng thái</span> 
                <div class='sort-icon'>
                    <i class="fas fa-sort-up"></i>
                    <i class="fas fa-sort-down"></i>
                </div> 
            </div>
        </th> 
        <th class='th-product'>
            <div class='th-wrapper  th-wrapper-sold'>
                <span>Ngày khởi tạo</span> 
                <div class='sort-icon'>
                    <i class="fas fa-sort-up"></i>
                    <i class="fas fa-sort-down"></i>
                </div> 
            </div>
        </th>
        <th>Thao tác</th> 
    </tr>
        </thead>   
        `;
    },
    managerTd: function (index, domain) {
        return `
                <td class='stt-table'>${index}
                    <div class='delete-domain-action' domain-id='${domain.id}'>
                        <i class="fas fa-trash-alt"></i>
                    </div>
                </td>
                <td>
                    <div class='domain-row'>
                       <a target="_blank" href='https://${domain.domain}'>${domain.domain
            }</a>
                    </div>
                
                </td>
                <td>
                    <div class='database-row' >
                        <p>${domain.database_name}</p>      
                    </div>
                </td>
                <td>
                    <div class=''>
                        <p>${domain.name}</p>
                    </div>
                </td>
                
                <td>${tools.handleDomainStatus(domain.disabled)}</td>
                <td>${tools.handleTimeFull(domain.create_at)}</td>
                <td class='action-table'>                
                        <p class='edit-all-product-action' domain-id='${domain.id
            }'>Chỉnh sửa</p>
                        
                </td>
        `;
    },
    managerTr: function (domain, index) {
        return `
            <tr data='${domain.id}'>
                <td class='stt-table'>${index + 1}
                    <div class='delete-domain-action' domain-id='${domain.id}'>
                        <i class="fas fa-trash-alt"></i>
                    </div>
                </td>
                <td>
                    <div class='domain-row'>
                       <a target="_blank" href='https://${domain.domain}'>${domain.domain
            }</a>
                    </div>
                
                </td>
                <td>
                    <div class='database-row' >
                        <p>${domain.database_name}</p>      
                    </div>
                </td>
                <td>
                    <div class=''>
                        <p>${domain.name}</p>
                    </div>
                </td>
                
                <td>${tools.handleDomainStatus(domain.disabled)}</td>
                <td>${tools.handleTimeFull(domain.create_at)}</td>
                <td class='action-table'>         
                    <p class='edit-all-product-action' domain-id='${domain.id
            }'>Chỉnh sửa</p>
                </td>
               
            </tr>
        `;
    },
    editDomainCofig: function (domainTarget) {
        return `
        <div class='domain-edit-wrapper'>
            <div class="update-all-value">
                <span class='update-all-value-title bold'><span class='orange' >*</span> Domain </span>
                <input  type='text' id="news-title" data-name='domain' class='news-title required-infor' placeholder="Nhập domain" value='${domainTarget.domain
            }'/>
            </div>

            <div class="update-all-value">
                <span class='update-all-value-title bold'><span class='orange'>*</span> Database </span>
                <input  type='text' id="news-title" data-name='database_name' class='news-title required-infor' placeholder="Nhập tên database" value='${domainTarget.database_name
            }'/>
            </div>

            <div class="update-all-value">
                <span class='update-all-value-title bold'><span class='orange'>*</span> Tên, mô tả </span>
                <input  type='text' id="news-title" data-name='name' class='news-title required-infor' placeholder="Nhập tên, mô tả" value='${domainTarget.name
            }'/>
            </div>

            <div class="update-all-value">
                <span class='update-all-value-title bold'><span class='orange'>*</span> Trạng thái </span>
                <select id='disabled-option' tabindex="0" class='tags-news'>   
                    <option id="dis-0" value='0' ${!domainTarget.disabled ? "selected" : ""
            }>
                        <span>Đang hoạt động</span>
                    </option>
                    <option id="dis-1" value='1' ${domainTarget.disabled ? "selected" : ""
            }>
                        <span>Vô hiệu hoá</span>
                    </option>
                </select> 
            </div>
        </div>
        `;
    },
    addDomain: function (domainTarget) {
        return `
        <div class='domain-edit-wrapper'>
            <div class="update-all-value">
                <span class='update-all-value-title bold'><span class='orange' >*</span> Domain </span>
                <input  type='text' id="news-title" data-name='domain' class='news-title required-infor' placeholder="Nhập domain" value=''/>
            </div>

            <div class="update-all-value">
                <span class='update-all-value-title bold'><span class='orange'>*</span> Database </span>
                <input  type='text' id="news-title" data-name='database_name' class='news-title required-infor' placeholder="Nhập tên database" value=''/>
            </div>

            <div class="update-all-value">
                <span class='update-all-value-title bold'><span class='orange'>*</span> Tên, mô tả </span>
                <input  type='text' id="news-title" data-name='name' class='news-title required-infor' placeholder="Nhập tên, mô tả" value=''/>
            </div>

            <div class="update-all-value">
                <span class='update-all-value-title bold'><span class='orange'>*</span> Trạng thái </span>
                <select id='disabled-option' tabindex="0" class='tags-news'>   
                    <option id="dis-0" value='0' selected}>
                        <span>Đang hoạt động</span>
                    </option>
                    <option id="dis-1" value='1'>
                        <span>Vô hiệu hoá</span>
                    </option>
                </select> 
            </div>
        </div>
        `;
    },
    cvRecruitmentsPage: function (cvData) {
        // console.log(cvData);
        const cvDataLength = cvData.length;
        return `
            <div class='news-page-wrapper ${fadeInAnimate}'>
                <div class='news-page-top'>
                    <div class='main-title-layout'>
                        <h3 class='orange main-title-text'>CV hiện có</h3>
                        
                    </div>

                    <div class='news-content-wrapper'>
                        <div class='news-list'>
                            ${[...cvData]
                .reverse()
                .map((cv, index) => {
                    return `
                                <div   news-id = ${cv.id} class='news-item ${index === 0 ? "active" : ""
                        }'>
                                    <div class='news-name'>${cv.name} </div>
                                    <div class='news-infor'>
                                        <span>${cv.recruitment.title}</span> 
                                        <span>${tools.handleTime(
                            cv.created_at
                        )}</span> 
                                    </div>
                                </div>
                                `;
                })
                .join("")}
                            
                        </div>
                        <div class='news-content-edit'>
                            <div class='news-content-edit-content cv-area'>
                                ${components.cvRecruitmentsDetailUI(
                    cvData[cvDataLength - 1]
                )}
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    cvRecruitmentsDetailUI: function (cv) {
        return `
        <div class='person-infor'>
            <div class="update-all-value">
                <span >Họ tên: <b>${cv.name}</b></span>       
            </div>
            <div class="update-all-value">
                <span> Vị trí: <b>${cv.recruitment.title}</b></span>       
            </div>

            <div class="update-all-value">
                <span>Email: <b>${cv.email}</b></span>       
            </div>

            <div class="update-all-value">
                <span >Số điện thoại: <b>${cv.phone}</b></span>       
            </div>
            <div class="update-all-value">
                <span >Địa chỉ: <b>${cv.address}</b></span>       
            </div>
            <div class="update-all-value">
                <span >Ngày nộp: <b>${tools.handleTimeFull(
            cv.created_at
        )}</b></span>       
            </div>
            <div class='main-title-right'>
                        <button class='delete-news-btn high-light-btn-border'>Từ chối</button> 
                        <button class='delete-news-btn high-light-btn-border'>Chấp nhận</button> 
                        <button class='delete-news-btn high-light-btn-border'>Tải CV</button> 
                        </div>
        </div>
        
        <div class='cv-pdf-area'> 
            <embed class='cv' src="${"https://daily.intern.midvietnam.com/" + cv.file
            }#scrollbar=0" />
        </div>

        `;
    },
    recruitmentsPage: function (recruitmentsData) {
        const recruitmentsLength = recruitmentsData.length;
        return `
            <div class='news-page-wrapper ${fadeInAnimate}'>
                <div class='news-page-top'>
                    <div class='main-title-layout'>
                        <h3 class='orange main-title-text'>Các bài đăng hiện có</h3>
                        <div class='main-title-right'>
                        <button class='add-news-btn high-light-btn-border'><svg viewBox="0 0 32 32"><path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></path></svg> Thêm bài đăng mới</button> 
                        <button class='delete-news-btn high-light-btn-border'>Xoá bài</button> 
                        <button class='hidden-news-btn high-light-btn-border' status = ${recruitmentsData[0]?.hidden
            }>${Number(recruitmentsData[0]?.hidden) ? "Hiện" : "Ẩn"
            } bài</button> 
                        <button class='save-news-btn high-light-btn'>Lưu</button> 
                        </div>
                    </div>

                    <div class='news-content-wrapper'>
                        <div class='news-list'>
                            ${[...recruitmentsData]

                .map((recruitment, index) => {
                    return `
                                <div news-id = ${recruitment.id
                        } class='news-item ${index === 0 ? "active" : ""
                        }'>
                                    <div class='news-name'>${recruitment.title
                        } </div>
                                    <div class='news-infor'>
                                        <span>${tools.handleTime(
                            recruitment.date
                        )} đến ${tools.handleTime(
                            recruitment.expiration_date
                        )}</span> 
                                        
                                    </div>
                                </div>
                                `;
                })
                .join("")}
                            
                        </div>
                        <div class='news-content-edit'>
                            <div class='news-content-edit-content'>
                                ${components.recruitmentsDetailUI(
                    recruitmentsData[0]
                )}
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    recruitmentsDetailUI: function (recruitmentsData) {
        // console.log(tools.handleTimeDDMMYY(newData.date));
        // console.log(recruitmentsData);
        if (!recruitmentsData) {
            return "Trống";
        }
        return `
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Tiêu đề </span>
            <input  type='text' id="news-title" data-name='title' class='news-title required-infor' placeholder="Nhập tiêu đề bài viết" value='${recruitmentsData?.title
            }'/>
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Ngày đăng </span>
            <input  type='date' id="news-date" data-name='date' class='news-date required-infor' placeholder="Nhập ngày đăng" value='${tools.handleTimeDDMMYY(
                recruitmentsData?.date
            )}' max="${tools.getCurrDay()}"/>
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Ngày hết hạn </span>
            <input  type='date' id="news-expiration_date" data-name='expiration_date' class='news-date required-infor' placeholder="Nhập ngày đăng" value='${tools.handleTimeDDMMYY(
                recruitmentsData?.expiration_date
            )}' min="${tools.getCurrDay()}"/>
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Ảnh bìa </span>
            <input  type='text' id="news-image-input" data-name='image' class='news-image-input required-infor' style='display: none'value='${recruitmentsData?.image
            }' />
            <div class='set-image-item plus-image-item' style='background-image: url("${recruitmentsData?.image
            }");'>
                <div class='plus-alt-wrapper news-img-item'>
                    <div class="plus alt"></div>
                    <span>Chọn hình ảnh</span>
                </div>
            </div>
        </div>
        
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Số lượng </span>
            <input  type='text' id="news-quantity" data-name='quantity' class='news-title required-infor' placeholder="Nhập tiêu đề bài viết" value='${recruitmentsData?.quantity
            }'/>
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Mức lương </span>
            <input  type='text' id="news-salary" data-name='salary' class='news-title required-infor' placeholder="Nhập tiêu đề bài viết" value='${recruitmentsData?.salary
            }'/>
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Nơi làm việc </span>
            <input  type='text' id="news-workplace" data-name='workplace' class='news-title required-infor' placeholder="Nhập tiêu đề bài viết" value='${recruitmentsData?.workplace
            }'/>
        </div>
        <div class="update-all-value update-all-value-textarea">
            <span class='update-all-value-title update-all-value-title-textarea'><span class='orange'>*</span> Mô tả</span>
            <textarea type='number' id="news-des-input" data-name='des' class='required-infor'  placeholder="Viết mô tả">${recruitmentsData?.des
            }</textarea>
        </div>
        <div class="update-all-value update-all-value-textarea">
            <span class='update-all-value-title update-all-value-title-textarea'><span class='orange'>*</span> Nội dung bài đăng</span>
            <textarea type='number' id="news-content-input" data-name='content'  placeholder="Viết nội dung dịch vụ">${recruitmentsData?.content
            }</textarea>
        </div>
        `;
    },
    addRecruitmentsPage: function (news) {
        return `
            <div class='news-page-wrapper ${fadeInAnimate}'>
                <div class='news-page-top'>
                    <div class='main-title-layout'>
                        <h3 class='orange main-title-text'>Thêm bài đăng mới</h3>
                        <div class='main-title-right'>
                        <button class='save-show-news-btn save-action high-light-btn-border'>Lưu và hiện</button> 
                        <button class='save-hidden-news-btn save-action high-light-btn-border'>Lưu và ẩn</button> 
                        <button class='cancel-add-news-btn high-light-btn'>Huỷ</button> 
                        </div>
                    </div>

                    <div class='news-content-wrapper'>
                        <div class='news-list'>                          
                                <div news-id class='news-item active'>
                                    <div class='news-name'>Thêm bài viết mới</div>
                                </div>                        
                        </div>
                        <div class='news-content-edit'>
                            <div class='news-content-edit-content'>
                                ${components.addRecruitmentsDetailPage()}
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    addRecruitmentsDetailPage: function (news) {
        // console.log(news);
        return `
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Tiêu đề </span>
            <input  type='text' id="news-title" data-name='title' class='news-title required-infor' placeholder="Nhập tiêu đề bài viết" value=''/>
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Ngày đăng </span>
            <input  type='date' id="news-date" data-name='date' class='news-date required-infor' placeholder="Nhập ngày đăng" value='${tools.getCurrDay()}' max="${tools.getCurrDay()}"/>
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Ngày hết hạn </span>
            <input  type='date' id="news-expiration_date" data-name='expiration_date' class='news-date required-infor' placeholder="Nhập ngày đăng" value='${tools.getCurrDay(
            -1
        )}' min="${tools.getCurrDay()}"/>
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Ảnh bìa </span>
            <input  type='text' id="news-image-input" data-name='image' class='news-image-input required-infor' style='display: none'value='' />
            <div class='set-image-item plus-image-item' style='background-image: url("");'>
                <div class='plus-alt-wrapper news-img-item'>
                    <div class="plus alt"></div>
                    <span>Chọn hình ảnh</span>
                </div>
            </div>
        </div>
        
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Số lượng </span>
            <input  type='text' id="news-quantity" data-name='quantity' class='news-title required-infor' placeholder="Nhập tiêu đề bài viết" value=''/>
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Mức lương </span>
            <input  type='text' id="news-salary" data-name='salary' class='news-title required-infor' placeholder="Nhập tiêu đề bài viết" value=''/>
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Nơi làm việc </span>
            <input  type='text' id="news-workplace" data-name='workplace' class='news-title required-infor' placeholder="Nhập tiêu đề bài viết" value=''/>
        </div>
        <div class="update-all-value update-all-value-textarea">
            <span class='update-all-value-title update-all-value-title-textarea'><span class='orange'>*</span> Mô tả</span>
            <textarea type='number' id="news-des-input" data-name='des' class='required-infor'  placeholder="Viết mô tả"></textarea>
        </div>
        <div class="update-all-value update-all-value-textarea">
            <span class='update-all-value-title update-all-value-title-textarea'><span class='orange'>*</span> Nội dung bài đăng</span>
            <textarea type='number' id="news-content-input" data-name='content'  placeholder="Viết nội dung dịch vụ"></textarea>
        </div>
        `;
    },

    policysPage: function (newsData) {
        const newsLength = newsData.length;
        return `
            <div class='news-page-wrapper ${fadeInAnimate}'>
                <div class='news-page-top'>
                    <div class='main-title-layout'>
                        <h3 class='orange main-title-text'>Các chính sách hiện có</h3>
                        <div class='main-title-right'>
                        <button class='add-news-btn high-light-btn-border'><svg viewBox="0 0 32 32"><path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></path></svg> Thêm chính sách mới</button> 
                        <button class='delete-news-btn high-light-btn-border'>Xoá</button> 
                       
                        <button class='save-news-btn high-light-btn'>Lưu</button> 
                        </div>
                    </div>

                    <div class='news-content-wrapper'>
                        <div class='news-list'>
                            ${newsLength
                ? [...newsData]
                    .map((newData, index) => {
                        return `
                                <div  news-id = ${newData.id
                            } class='news-item ${index === 0 ? "active" : ""
                            }'>
                                    <div class='news-name'>${newData.title
                            } </div>
                                </div>
                                `;
                    })
                    .join("")
                : ""
            }
                            
                        </div>
                        <div class='news-content-edit'>
                            <div class='news-content-edit-content'>
                                ${newsLength
                ? components.policysContentUI(newsData[0])
                : "Chưa có chính sách nào được thêm"
            }
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    policysContentUI: function (newData) {
        // console.log(tools.handleTimeDDMMYY(newData.date));
        return `
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Tên </span>
            <input  type='text' id="news-title" data-name='title' class='news-title required-infor' placeholder="Nhập tên chính sách" value='${newData.title}'/>
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Tên (tiếng anh) </span>
            <input  type='text' id="news-en-title" data-name='title_en' class='news-title required-infor' placeholder="Nhập tên chính sách (tiếng anh)" value='${newData.title_en}'/>
        </div>
        
        <div class="update-all-value update-all-value-textarea">
            <span class='update-all-value-title update-all-value-title-textarea'><span class='orange'>*</span> Nội dung chính sách</span>
            <textarea type='number' id="news-content-input" data-name='content'  placeholder="Viết nội dung chính sách">${newData.content}</textarea>
        </div>
        <div class="update-all-value update-all-value-textarea">
            <span class='update-all-value-title update-all-value-title-textarea'><span class='orange'>*</span> Nội dung chính sách (tiếng anh)</span>
            <textarea type='number' id="news-en-content-input" data-name='content_en'  placeholder="Viết nội dung chính sách (tiếng anh)">${newData.content_en}</textarea>
        </div>
        
        `;
    },

    addPolicysPage: function (news) {
        return `
            <div class='news-page-wrapper ${fadeInAnimate}'>
                <div class='news-page-top'>
                    <div class='main-title-layout'>
                        <h3 class='orange main-title-text'>Thêm bài đăng mới</h3>
                        <div class='main-title-right'>
                        <button class='save-show-news-btn save-action high-light-btn-border'>Lưu</button> 
                        <button class='cancel-add-news-btn high-light-btn'>Huỷ</button> 
                        </div>
                    </div>

                    <div class='news-content-wrapper'>
                        <div class='news-list'>                          
                                <div news-id class='news-item active'>
                                    <div class='news-name'>Thêm bài viết mới</div>
                                </div>                        
                        </div>
                        <div class='news-content-edit'>
                            <div class='news-content-edit-content'>
                                ${components.addPolicysContentUI()}
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    addPolicysContentUI: function (newData) {
        // console.log(tools.handleTimeDDMMYY(newData.date));
        return `
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Tên </span>
            <input  type='text' id="news-title" data-name='title' class='news-title required-infor' placeholder="Nhập tên chính sách" value=''/>
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Tên (tiếng anh) </span>
            <input  type='text' id="news-title" data-name='title_en' class='news-title required-infor' placeholder="Nhập tên chính sách (tiếng anh)" value=''/>
        </div>
        
        <div class="update-all-value update-all-value-textarea">
            <span class='update-all-value-title update-all-value-title-textarea'><span class='orange'>*</span> Nội dung chính sách</span>
            <textarea type='number' id="news-content-input" data-name='content'  placeholder="Viết nội dung chính sách"></textarea>
        </div>
        <div class="update-all-value update-all-value-textarea">
            <span class='update-all-value-title update-all-value-title-textarea'><span class='orange'>*</span> Nội dung chính sách</span>
            <textarea type='number' id="news-content-input" data-name='content_en'  placeholder="Viết nội dung chính sách (tiếng anh)"></textarea>
        </div>
        `;
    },
    evPage: function (evData) {
        return `

      
        <table>
        
        <tr>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Số khách</th>
            <th>Phương tiện</th>
            <th>Xác nhận lúc</th>
        </tr>
        
        ${evData
                .map((item) => {
                    return `
                <tr>
                <td>${item?.name || "Không nhập"}</td>
                <td>${item?.phone || "Không nhập"}</td>
                <td>${item?.uNum || "Không nhập"}</td>
                <td>${item?.vehicle || "Không nhập"} </td>
                <td>${tools.handleTimeFull(item?.created_at)}</td>
              </tr>
                `;
                })
                .join("")}
     
        </table>
        `;
    },

    contactsPage: function (newsData) {
        const newsLength = newsData.length;
        return `
            <div class='news-page-wrapper ${fadeInAnimate}'>
                <div class='news-page-top'>
                    <div class='main-title-layout'>
                         
                       
                    </div>

                    <div class='news-content-wrapper'>
                        <div class='news-list'>
                            ${[...newsData]

                .map((newData, index) => {
                    return `
                                <div contact-id = ${newData.id
                        } class='news-item contact-item-tab ${index === 0 ? "active" : ""
                        }'>
                                    <div class='news-name'>${newData.name
                        } </div>
                                    <div class='news-infor'>
                                        <span>${tools.handleTime(
                            newData.create_at
                        )}</span>
                                        
                                    </div>
                                </div>
                                `;
                })
                .join("")}
                            
                        </div>
                        <div class='news-content-edit'>
                            <div class='news-content-edit-content contact-content-edit-content'>
                            ${components.contactDetailUI(newsData[0])}

                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    contactDetailUI: function (newData) {
        // console.log(tools.handleTimeDDMMYY(newData.date));
        return `
        <div class="update-all-value">
            <span>Tên người liên hệ: </span>
            &ensp;<b> ${newData.name}</b>
        </div>
        <div class="update-all-value">
            <span>Số điện thoại:</span>
            &ensp;<b>${newData.phone}</b>
        </div>
        <div class="update-all-value">
            <span>Nội dung: </span>
            &ensp;<b> ${newData.content}</b>
        </div>
        
        `;
    },

    newsPage: function (newsData) {
        const newsLength = newsData.length;
        return `
            <div class='news-page-wrapper ${fadeInAnimate}'>
                <div class='news-page-top'>
                    <div class='main-title-layout'>
                        <h3 class='orange main-title-text'>Các bài đăng hiện có</h3>
                        <div class='main-title-right'>
                        <button class='add-news-btn high-light-btn-border'><svg viewBox="0 0 32 32"><path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></path></svg> Thêm bài đăng mới</button> 
                        <button class='delete-news-btn high-light-btn-border'>Xoá bài</button> 
                        <button class='hidden-news-btn high-light-btn-border' status = ${newsData[0].hidden
            }>${Number(newsData[0].hidden) ? "Hiện" : "Ẩn"
            } bài</button> 
                        <button class='save-news-btn high-light-btn'>Lưu</button> 
                        </div>
                    </div>

                    <div class='news-content-wrapper'>
                        <div class='news-list'>
                            ${[...newsData]

                .map((newData, index) => {
                    return `
                                <div news-id = ${newData.id} class='news-item ${index === 0 ? "active" : ""
                        }'>
                                    <div class='news-name'>${newData.title
                        } </div>
                                    <div class='news-infor'>
                                        <span>${tools.handleTime(
                            newData.date
                        )}</span>
                                        <span>${Number(newData.featured)
                            ? "(Nổi bật)"
                            : ""
                        }</span>
                                    </div>
                                </div>
                                `;
                })
                .join("")}
                            
                        </div>
                        <div class='news-content-edit'>
                            <div class='news-content-edit-content'>
                                ${components.newDetailUI(newsData[0])}
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    newDetailUI: function (newData) {
        // console.log(tools.handleTimeDDMMYY(newData.date));
        return `
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Tiêu đề tiếng việt </span>
            <input  type='text' id="news-title" data-name='title' class='news-title required-infor' placeholder="Nhập tiêu đề bài viết" value='${newData.title
            }'/>
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Tiêu đề tiếng anh</span>
            <input  type='text' id="news-en-title" data-name='title_en' class='news-title required-infor' placeholder="Nhập tiêu đề bài viết" value='${newData.title_en
            }'/>
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Ngày đăng </span>
            <input  type='date' id="news-date" data-name='date' class='news-date required-infor' placeholder="Nhập ngày đăng" value='${tools.handleTimeDDMMYY(
                newData.date
            )}' max="${tools.getCurrDay()}"/>
        </div>
        
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Ảnh bìa </span>
            <input  type='text' id="news-image-input" data-name='img' class='news-image-input required-infor' style='display: none'value='${newData.img
            }' />
            <div class='set-image-item plus-image-item' style='background-image: url("${newData.img
            }");'>
                <div class='plus-alt-wrapper news-img-item'>
                    <div class="plus alt"></div>
                    <span>Chọn hình ảnh</span>
                </div>
            </div>
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Tag </span>
            <select id='tags-news' tabindex="0" class='tags-news' multiple="multiple">   
                    <option id="tags-add-1" value='1' selected>
                        <span>Tin tức</span>
                    </option>
            </select> 
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Phân loại </span>
            <select id='category-news' tabindex="0" class='category-news'>   
                    <option id="cate-news-1" value='0' ${Number(newData.is_blog) ? "" : "selected"
            }>
                        <span>Tin tức</span>
                    </option>

                    <option id="cate-news-2" value='1' ${!Number(newData.is_blog) ? "" : "selected"
            }>
                        <span>Blog</span>
                    </option>
            </select> 
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Nổi bật </span>
            <select id='featured-news' tabindex="0" class='featured-news'>   
                    <option id="feat-news-1" value='0' ${Number(newData.featured) ? "" : "selected"
            }>
                        <span>Không</span>
                    </option>

                    <option id="feat-news-2" value='1' ${!Number(newData.featured) ? "" : "selected"
            }>
                        <span>Có</span>
                    </option>
            </select> 
        </div>
        <div class="update-all-value update-all-value-textarea">
            <span class='update-all-value-title update-all-value-title-textarea'><span class='orange'>*</span> Mô tả tiếng việt</span>
            <textarea type='number' id="news-description-input" data-name='subcontent' class='required-infor'  placeholder="Viết mô tả">${newData.subcontent
            }</textarea>
        </div>
          <div class="update-all-value update-all-value-textarea">
            <span class='update-all-value-title update-all-value-title-textarea'><span class='orange'>*</span> Mô tả tiếng anh</span>
            <textarea type='number' id="news-en-description-input" data-name='subcontent_en' class='required-infor'  placeholder="Viết mô tả">${newData.subcontent_en
            }</textarea>
        </div>
        <div class="update-all-value update-all-value-textarea">
            <span class='update-all-value-title update-all-value-title-textarea'><span class='orange'>*</span> Nội dung bài đăng</span>
            <textarea type='number' id="news-content-input" data-name='content'  placeholder="Viết nội dung dịch vụ">${newData.content
            }</textarea>
        </div>
              <div class="update-all-value update-all-value-textarea">
            <span class='update-all-value-title update-all-value-title-textarea'><span class='orange'>*</span> Nội dung bài đăng tiếng anh</span>
            <textarea type='number' id="news-en-content-input" data-name='content_en'  placeholder="Viết nội dung dịch vụ">${newData.content_en
            }</textarea>
        </div>
        `;
    },

    addNewPage: function (news) {
        return `
            <div class='news-page-wrapper ${fadeInAnimate}'>
                <div class='news-page-top'>
                    <div class='main-title-layout'>
                        <h3 class='orange main-title-text'>Thêm bài đăng mới</h3>
                        <div class='main-title-right'>
                        <button class='save-show-news-btn save-action high-light-btn-border'>Lưu và hiện</button> 
                        <button class='save-hidden-news-btn save-action high-light-btn-border'>Lưu và ẩn</button> 
                        <button class='cancel-add-news-btn high-light-btn'>Huỷ</button> 
                        </div>
                    </div>

                    <div class='news-content-wrapper'>
                        <div class='news-list'>                          
                                <div news-id class='news-item active'>
                                    <div class='news-name'>Thêm bài viết mới</div>
                                </div>                        
                        </div>
                        <div class='news-content-edit'>
                            <div class='news-content-edit-content'>
                                ${components.addNewDetailUI()}
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    addNewDetailUI: function () {
        return `
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Tiêu đề tiếng việt </span>
            <input  type='text' id="news-title" data-name='title' class='news-title required-infor' placeholder="Nhập tiêu đề bài viết" value=''/>
        </div>
            <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Tiêu đề tiếng anh </span>
            <input  type='text' id="news-title-en" data-name='title_en' class='news-title required-infor' placeholder="Nhập tiêu đề bài viết" value=''/>
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Ngày đăng </span>
            <input  type='date' id="news-date" data-name='date' class='news-date required-infor' placeholder="Nhập ngày đăng" value='${tools.getCurrDay()}' max="${tools.getCurrDay()}"/>
        </div>
        
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Ảnh bìa </span>
            <input  type='text' id="news-image-input" data-name='img' class='news-image-input required-infor' style='display: none'value='' />
            <div class='set-image-item plus-image-item' style='background-image: url("");'>
                <div class='plus-alt-wrapper news-img-item'>
                    <div class="plus alt"></div>
                    <span>Chọn hình ảnh</span>
                </div>
            </div>
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Tag </span>
            <select id='tags-news' tabindex="0" class='tags-news' multiple="multiple">   
                    <option id="tags-add-1" value='1' selected>
                        <span>Tin tức</span>
                    </option>
            </select> 
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Phân loại </span>
            <select id='category-news' tabindex="0" class='category-news'>   
                    <option id="cate-news-1" value='0' 'selected'}>
                        <span>Tin tức</span>
                    </option>

                    <option id="cate-news-2" value='1'}>
                        <span>Blog</span>
                    </option>
            </select> 
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Đặt làm tin nổi bật </span>
            <select id='featured-news' tabindex="0" class='featured-news'>   
                    <option id="feat-news-1" value='0' selected}>
                        <span>Không</span>
                    </option>

                    <option id="feat-news-2" value='1'}>
                        <span>Có</span>
                    </option>
            </select> 
        </div>
        <div class="update-all-value update-all-value-textarea">
            <span class='update-all-value-title update-all-value-title-textarea'><span class='orange'>*</span> Mô tả Tiếng việt</span>
            <textarea type='number' id="news-description-input" data-name='subcontent' class='required-infor'  placeholder="Viết mô tả"></textarea>
        </div>
          <div class="update-all-value update-all-value-textarea">
            <span class='update-all-value-title update-all-value-title-textarea'><span class='orange'>*</span> Mô tả Tiếng Anh</span>
            <textarea type='number' id="news-en-description-input" data-name='subcontent_en' class='required-infor'  placeholder="Viết mô tả"></textarea>
        </div>
        <div class="update-all-value update-all-value-textarea">
            <span class='update-all-value-title update-all-value-title-textarea'><span class='orange'>*</span> Nội dung bài đăng tiếng việt</span>
            <textarea type='number' id="news-content-input" data-name='content'  placeholder="Viết nội dung dịch vụ"></textarea>
        </div>
           <div class="update-all-value update-all-value-textarea">
            <span class='update-all-value-title update-all-value-title-textarea'><span class='orange'>*</span> Nội dung bài đăng tiếng anh</span>
            <textarea type='number' id="news-en-content-input" data-name='content_en'  placeholder="Viết nội dung dịch vụ"></textarea>
        </div>
        `;
    },
    servicePage: function (serviceData) {
        return `
            <div class='service-page-wrapper ${fadeInAnimate}'>
                <div class='service-page-top'>
                    <div class='main-title-layout'>
                        <h3 class='orange main-title-text'>Dịch vụ hiện có</h3>
                        <div class='main-title-right'>
                        <button class='add-service-btn high-light-btn-border'><svg viewBox="0 0 32 32"><path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></path></svg> Thêm dịch vụ mới</button> 
                        <button class='delete-service-btn high-light-btn-border'>Xoá dịch vụ</button> 
                        <button class='hidden-service-btn high-light-btn-border' status = ${serviceData[0].hidden
            }>${Number(serviceData[0].hidden) ? "Hiện" : "Ẩn"
            } dịch vụ</button> 
                        <button class='save-service-btn high-light-btn'>Lưu</button> 
                        </div>
                    </div>

                    <div class='service-content-wrapper'>
                        <div class='service-list'>
                            ${serviceData
                .map((service, index) => {
                    return `
                                <div service-id = ${service.id
                        } class='service-item ${index === 0 ? "active" : ""
                        }'>
                                    <div class='service-name'>${service.name
                        }</div>
                                </div>
                                `;
                })
                .join("")}
                            
                        </div>
                        <div class='service-content-edit'>
                            <div class='service-content-edit-content'>
                                ${components.serviceDetailUI(serviceData[0])}
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    serviceDetailUI: function (service) {
        // console.log(service);
        return `
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Tên dịch vụ </span>
            <input  type='text' id="service-title" data-name='name' class='service-title required-infor' placeholder="Nhập tên dịch vụ" value='${service.name}'/>
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Ảnh bìa </span>
            <input  type='text' id="service-image-input" data-name='image' class='service-image-input required-infor' style='display: none'value='${service.image}' />
            <div class='set-image-item plus-image-item' style='background-image: url("${service.image}");'>
                <div class='plus-alt-wrapper service-img-item'>
                    <div class="plus alt"></div>
                    <span>Chọn hình ảnh</span>
                </div>
            </div>
        </div>
        <div class="update-all-value update-all-value-textarea">
            <span class='update-all-value-title update-all-value-title-textarea'><span class='orange'>*</span> Mô tả</span>
            <textarea type='number' id="service-description-input" data-name='discription' class='required-infor'  placeholder="Viết mô tả">${service.discription}</textarea>
        </div>
        <div class="update-all-value update-all-value-textarea">
            <span class='update-all-value-title update-all-value-title-textarea'><span class='orange'>*</span> Chi tiết</span>
            <textarea type='number' id="service-content-input" data-name='content'  placeholder="Viết nội dung dịch vụ">${service.content}</textarea>
        </div>
        `;
    },

    addServicePage: function (serviceData) {
        return `
            <div class='service-page-wrapper ${fadeInAnimate}'>
                <div class='service-page-top'>
                    <div class='main-title-layout'>
                        <h3 class='orange main-title-text'>Thêm dịch vụ mới</h3>
                        <div class='main-title-right'>
                        <button class='save-show-service-btn save-action high-light-btn-border'>Lưu và hiện</button> 
                        <button class='save-hidden-service-btn save-action high-light-btn-border'>Lưu và ẩn</button> 
                        <button class='cancel-add-service-btn high-light-btn'>Huỷ</button> 
                        </div>
                    </div>

                    <div class='service-content-wrapper'>
                        <div class='service-list'>                          
                                <div service-id class='service-item active'>
                                    <div class='service-name'>Thêm dịch vụ mới</div>
                                </div>                        
                        </div>
                        <div class='service-content-edit'>
                            <div class='service-content-edit-content'>
                                ${components.addServiceDetailUI()}
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    addServiceDetailUI: function (service) {
        // console.log(service);
        return `
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Tên dịch vụ </span>
            <input  type='text' id="service-title" data-name='name' class='service-title required-infor' placeholder="Nhập tên dịch vụ" value=''/>
        </div>
        <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Ảnh bìa </span>
            <input  type='text' id="service-image-input" data-name='image' class='service-image-input required-infor' style='display: none'value='' />
            <div class='set-image-item plus-image-item'>
                <div class='plus-alt-wrapper service-img-item'>
                    <div class="plus alt"></div>
                    <span>Chọn hình ảnh</span>
                </div>
            </div>
        </div>
        <div class="update-all-value update-all-value-textarea">
            <span class='update-all-value-title update-all-value-title-textarea'><span class='orange'>*</span> Mô tả</span>
            <textarea type='number' id="service-description-input" data-name='discription' class='required-infor'  placeholder="Viết mô tả"></textarea>
        </div>
        <div class="update-all-value update-all-value-textarea">
            <span class='update-all-value-title update-all-value-title-textarea'><span class='orange'>*</span> Chi tiết</span>
            <textarea type='number' id="service-content-input" data-name='content'  placeholder="Viết nội dung dịch vụ"></textarea>
        </div>
        `;
    },
    loader: function () {
        return `
        <div class="loader-element">
            <div class="loader"></div>
        </div>
        `;
    },
    productCard: function (title = "Tên sản phẩm", price = "0") {
        return `

                    <div class="product-img" style='display: none'>
                        <img class='product-image-preview'
                            src="https://st.quantrimang.com/photos/image/2020/07/30/Hinh-Nen-Trang-10.jpg"
                            alt=""
                        />
                    </div>
                    <div class="product-discount">%</div>
                    <div class="product-content">
                        <div class="product-content-name">
                            ${title}
                        </div>
                        <div class="product-content-price">${price} đ</div>
                        <button class="product-content-button"  id="" value="">
                            Thêm vào giỏ
                        </button>
                    </div>
          
            `;
    },
    addProductPage: function (category) {
        return `
            <div class='products-wrapper add-product-wrapper ${fadeInAnimate}'>
            <div class='products-wrapper-l1'>
                <div class='products-infor add-product-guide'>   
                    <div class='main-product-layout add-product-guide-layout'>
                        ${components.guideUI("Gợi ý", guideExample)}
                    </div>
                </div>

                <div class='products-infor preview-product-guide' style='display: none'>   
                <div class='guide-layout-title'>
                    <h2>Preview</h2>
                    <i class='guide-icon'>
                        <svg viewBox="0 0 34 53" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1604_57992)" fill-rule="evenodd" clip-rule="evenodd"><path d="M23.703 5.997c-6.371-3.935-14.518-1.6-18.197 5.216-3.623 6.714-1.122 14.722 5.297 18.686 1.3.803 2.366 2.152 3.255 3.865.893 1.72 1.656 3.903 2.309 6.509l.272 1.086 11.513-3.3-.273-1.086c-.652-2.606-1.011-4.904-1.042-6.872-.031-1.959.262-3.697 1.012-5.088 3.837-7.11 2.144-15.13-4.146-19.016zM3.078 9.713C7.53 1.463 17.392-1.364 25.105 3.4c7.793 4.814 9.688 14.748 5.173 23.114-.406.752-.663 1.889-.637 3.538.025 1.639.33 3.68.947 6.145l.998 3.985-16.93 4.853-.998-3.985c-.617-2.465-1.308-4.396-2.052-5.829-.748-1.442-1.502-2.288-2.205-2.723-7.562-4.67-10.83-14.431-6.323-22.784zm15.287 39.984l12.19-3.494.725 2.898-12.19 3.494-.725-2.898z"></path><path d="M28.599 34.05l-14.221 4.076-.726-2.898 14.221-4.076.726 2.898z"></path></g><defs><clipPath><path d="M0 0h34v53H0z"></path></clipPath></defs></svg>
                    </i>
                </div>
                <article class="product">
                    ${components.productCard()}
                </article>
                
                </div>

                <div class='main-products main-add-product'>          
                    <div class='main-product-layout product-layout add-product-layout'>      
                    <div class='category-wrapper'>  
                        <div class='products-area'>  
                            ${components.addProductPageUI(category)}
                        </div>
                    </div>                  
                </div>
            </div>
            </div>
        `;
    },

    addProductPageUI: function (category) {
        return `
        <div class= 'infor-product-edit-wrapper'>
        <div class='basic-product-infor-edit-all add-product-form'>
        <div class='form-infor-product'>
            <div class='title-edit-all-product'><h3 class='orange'>Thông tin cơ bản</h3></div>
            <div class="update-all-value">
                <span class='update-all-value-title'><span class='orange'>*</span> Tên sản phẩm </span>
                <input  type='text' id="add-product-title" data-name='title' class='input-add-product required-infor' placeholder="Nhập tên sản phẩm" />
            </div>
            <div class="update-all-value">
                <span class='update-all-value-title'><span class='orange'>*</span> Mã sản phẩm </span>
                <input  type='text' id="add-product-product_code" data-name='product_code' class='input-add-product required-infor' placeholder="Nhập mã sản phẩm" />
            </div>
            <div class="update-all-value">
                <span class='update-all-value-title'><span class='orange'>*</span> Danh mục</span>
                <select id='add-category-input' tabindex="0" class='add-category-input'>   
                    <option id="ca-add-0" value='0'>
                        <span>Chọn danh mục</span>
                    </option>  
                    ${category.map((category) => {
            return `
                            <option id="ca-add-${category.id}" value='${category.id}'>
                                <span>${category.name}</span>
                            </option>`;
        })}
                </select>
                <button class='high-light-btn-border add-pr-add-category-btn'>${components.icon.add()} Thêm danh mục</button>
            </div>

            <div class="update-all-value update-all-value-textarea">
                <span class='update-all-value-title update-all-value-title-textarea'>Mô tả</span>
                <textarea type='number' id="add-product-description" data-name='description'   placeholder="Nhập mô tả"></textarea>
            </div>

            <div class="update-all-value update-all-value-textarea">
                <span class='update-all-value-title update-all-value-title-textarea'>Chi tiết</span>
                <textarea type='number' id="add-product-description-all" data-name='description'  placeholder="Nhập mô tả chi tiết"></textarea>
            </div>
        </div>
        <div class='product-image-edit-area add-product-image-area'>
            <div class='title-edit-all-product'><h3 class='orange'>Hình ảnh sản phẩm</h3></div>
            
            <div class='set-image-product-area-wrapper-edit-all'>
                <div></div>
                <div class='set-image-product-area-edit-all update-all-value'>
                    <span class='update-all-value-title'> <span class='orange'>*</span> Thêm hình ảnh</span>
                    <div class='add-img-product-area'>
                    <!-- <input  type='file' accept="image/*" id="add-product-image" data-name='image' class='input-add-product required-infor' style='display: none' /> --!>
                    <div class='set-image-item plus-image-item'>
                        <div class='plus-alt-wrapper'>
                            <div class="plus alt"></div>
                            <span>Thêm hình ảnh</span>
                        </div>
                    </div>
                    </div>

                </div>
            </div>
            <div class='update-all-value'>
                <span class='update-all-value-title'>  </span><span class='orange image-warning' style='font-size: 1.2rem'>Hình ảnh quá lớn</span>
            </div>
            <div class='update-all-value'>
                <span class='update-all-value-title'>  </span><span class='' style='font-size: 1.2rem'>Để có hiển thị tốt nhất, kích thước hình ảnh không vượt quá 500x500 và dung lượng không quá 25Kb.</span>
            </div>
        </div>
        
        <div class='sell-product-infor-edit-all add-product-sell-infor'>
           
            <div class='title-edit-all-product'><h3 class='orange'>Thông tin bán hàng</h3></div>
            <div class="update-all-value">
                <span class='update-all-value-title'><span class='orange'>*</span> Giá sản phẩm </span>
                <input  type='number' id="add-product-price" data-name='price' class='input-add-product required-infor' placeholder="Nhập giá sản phẩm" />
                <span class='describe-input'>VND</span>
            </div>
            <div class='update-all-value'>
                <span class='update-all-value-title'>  </span><span class='' style='font-size: 1.2rem'>Lưu ý: giá sản phẩm chưa bao gồm % giảm giá.</span>
            </div>

            <div class="update-all-value">
                <span class='update-all-value-title'><span class='orange'>*</span> Giảm giá </span>
                <input  type='number' id="add-product-price" data-name='discount' class='input-add-product required-infor' placeholder="Nhập % giảm giá" value='0'/>
                <span class='describe-input'>%</span>
            </div>

            <div class="update-all-value">
                <span class='update-all-value-title'><span class='orange'>*</span> Kho hàng </span>
                <input type='number' id="add-product-inventory_num" data-name='inventory_num' class='input-add-product required-infor' placeholder="Nhập kho hàng" />
                <span class='describe-input'>Sản phẩm</span>
            </div>
        </div>
        <div class='action-add-product'>
            <button class='add-product-btn high-light-btn' h-data='1'>Lưu & Ẩn sản phẩm</button>
            <button class='add-product-btn high-light-btn' h-data='0'>Lưu & Hiện sản phẩm</button>
        </div>
        </div>`;
    },
    guideUI: function (title, content) {
        return `
        <div class='animate__animated animate__fadeIn'>
            <div class='guide-layout-title'>
                <h2>${title}</h2>
                <i class='guide-icon'>
                    <svg viewBox="0 0 34 53" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1604_57992)" fill-rule="evenodd" clip-rule="evenodd"><path d="M23.703 5.997c-6.371-3.935-14.518-1.6-18.197 5.216-3.623 6.714-1.122 14.722 5.297 18.686 1.3.803 2.366 2.152 3.255 3.865.893 1.72 1.656 3.903 2.309 6.509l.272 1.086 11.513-3.3-.273-1.086c-.652-2.606-1.011-4.904-1.042-6.872-.031-1.959.262-3.697 1.012-5.088 3.837-7.11 2.144-15.13-4.146-19.016zM3.078 9.713C7.53 1.463 17.392-1.364 25.105 3.4c7.793 4.814 9.688 14.748 5.173 23.114-.406.752-.663 1.889-.637 3.538.025 1.639.33 3.68.947 6.145l.998 3.985-16.93 4.853-.998-3.985c-.617-2.465-1.308-4.396-2.052-5.829-.748-1.442-1.502-2.288-2.205-2.723-7.562-4.67-10.83-14.431-6.323-22.784zm15.287 39.984l12.19-3.494.725 2.898-12.19 3.494-.725-2.898z"></path><path d="M28.599 34.05l-14.221 4.076-.726-2.898 14.221-4.076.726 2.898z"></path></g><defs><clipPath><path d="M0 0h34v53H0z"></path></clipPath></defs></svg>
                </i>
            </div>
            
            <div class='guide-content'>
                <span>
                    ${content}
                </span>
            </div>
        </div>
        `;
    },

    orderPage: function (orders, orderData) {
        const orderLength = orders.length;
        return `<div class="products-wrapper ${fadeInAnimate}">
            <div class="products-infor">
                <div class="main-product-layout">
                    <div class="main-table-action">
                        <div class="option-action-infor active">Tìm kiếm</div>
                        <div class="option-action-infor">Thống kê</div>
                    </div>
                    <div class="infor-layout">

                        <div class="search-wrapper">

                        
                        <div class="search-item">
                                <span class="search-title">Mã đơn hàng:</span>
                                <select
                                    id="search-code-input-order"
                                    tabindex="0"
                                    class="search-product-input"
                                    multiple="multiple"
                                >
                                    <option id="code-order-0" value="0">
                                        <span>Tất cả</span>
                                    </option>
                                    ${orders.map(
            (order) =>
                `<option id="code-order-${order.id}" value='${order.id}'>
                                            <span>${order.id}</span>
                                        </option>`
        )}
                                </select>
                            </div>

                            <div class="search-item">
                                <span class="search-title">Trạng thái:</span>
                                <select
                                    id="search-status-input-order"
                                    tabindex="0"
                                    class="search-product-input"
                                    
                                    >
                                    <option id="st-order-5" value="5">
                                        <span>Tất cả</span>
                                    </option>
                                    <option id="st-order-0" value="0">
                                        <span>Đã huỷ</span>
                                    </option>
                                    <option id="st-order-1" value="1">
                                        <span>Chờ xác nhận</span>
                                    </option>
                                    <option id="st-order-2" value="2">
                                        <span>Đã xác nhận</span>
                                    </option>
                                    <option id="st-order-3" value="3">
                                        <span>Đã giao</span>
                                    </option>
                                    
                                    
                                </select>
                            </div>

                            <div style='display: none' class="search-item">
                                <span class="search-title">Tên sản phẩm:</span>
                                <select
                                    id="search-product-input-order"
                                    tabindex="0"
                                    class="search-product-input"
                                    multiple="multiple"
                                >
                                    <option id="pr-order-0" value="0">
                                        <span>Tất cả</span>
                                    </option>
                                    ${app.data.products.map(
            (product) =>
                `<option id="pr-order-${product.id}" value='${product.id}'>
                                            <span>${product.title}</span>
                                        </option>`
        )}
                                </select>
                            </div>
                            <div style='display: none' class="search-item">
                                <span class="search-title">Danh mục sản phẩm:</span>
                                <select
                                    id="search-category-input-order"
                                    tabindex="0"
                                    class="search-category-input"
                                    multiple="multiple"
                                >
                                    <option id="ca-order-0" value="0">
                                        <span>Tất cả</span>
                                    </option>
                                    ${app.data.category.map(
            (category) =>
                `<option id="ca-order-${category.id}" value='${category.id}'>
                                            <span>${category.name}</span>
                                        </option>`
        )}
                                </select>
                            </div>
                            <div class="search-item">
                                <span class="search-title">Giá trị đơn (VND):</span>
                                <div class="two-input">
                                    <input type="number" id="minOrderValue" placeholder="Tối thiểu" />
                                    <span style="color: var(--main-bg-bl1)">-</span>
                                    <input type="number" id="maxOrderValue" placeholder="Tối đa" />
                                </div>
                            </div>
                            <div class="search-item">
                                <span class="search-title">Ngày đặt:</span>
                                <div class="two-input">
                                    <input type="date" id="minDate" placeholder="" />
                                    <span style="color: var(--main-bg-bl1)">-</span>
                                    <input type="date" id="maxDate" placeholder="" />
                                </div>
                            </div>
                            <div class="search-product-button-wrapper">
                                <button class="search-order-btn high-light-btn">
                                    <i class="fas fa-search"></i> Tìm kiếm
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="statistical-wrapper-master" style="display: none">
                        <div class="statistical-wrapper">
                            <p class="statistical-item">
                                Tổng số đơn hàng: <span>${orderData.length
            }</span>
                            </p>
                            <p class="statistical-item">
                                Chờ xác nhận: <span>${orderData.filter(
                (order) => order.status === 1
            ).length
            }</span>
                            </p>
                            <p class="statistical-item">
                                Đã xác nhận: <span>${orderData.filter(
                (order) => order.status === 2
            ).length
            }</span>
                            </p>
                            <p class="statistical-item">
                                Đã giao: <span>${orderData.filter(
                (order) => order.status === 3
            ).length
            }</span>
                            </p>
                            <p class="statistical-item">
                                Đã huỷ: <span>${orderData.filter(
                (order) => order.status === 0
            ).length
            }</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-products">
                <div class="main-product-layout product-layout">
                    <div class="main-table-action">
                        <div class="option-action active">Tất cả</div>
                        <div class="option-action">Chưa xác nhận</div>
                        <div class="option-action">Đã xác nhận</div>
                        <div class="option-action">Đã giao</div>
                        <div class="option-action">Đã huỷ</div>
                        <div class="add-product-btn-wrapper">
                            <button class="export-order-btn high-light-btn"><i class="fas fa-download"></i> Xuất file</button>
                        </div>
                    </div>

                    <div class="category-wrapper">
                        <div class="products-area">
                            <div class="table-wrapper">
                                <table class='order-table'>
                                    ${components.threadOrder()}
                                    <tbody class="product-tbody">
                                        ${orders
                .map((order, index) => {
                    // components.productCard(product);
                    return components.orderTr(
                        order,
                        index
                    );
                })
                .join("")}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class='bottom-table-action'>
                        <div class='bottom-table-action-left'></div>
                        <div class='bottom-table-action-right'>
                            <div class='change-tab-wrapper'>
                                <div class='change-tab-icon' index='left'>
                                    <i class="fas fa-chevron-left"></i>
                                </div>
                                <div class='current-tab-text' >
                                    <span>1</span>&#160;/&#160;
                                    <span>10</span>
                                </div>
                                <div class='change-tab-icon' index='right'>
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    },

    threadOrder: function () {
        return `
        <thead>                    
        <tr>
        <th class='stt-table th-product'>Mã</th> 
        <th class=' th-product order-products'>
            <div class='th-wrapper th-wrapper-name '>
                <span>Mặt hàng</span> 
                <div style='display: none' class='sort-icon'>
                    <i class="fas fa-sort-up"></i>
                    <i class="fas fa-sort-down"></i>
                </div> 
            </div>
        </th> 
        <th class=' th-product order-value'>
            <div class='th-wrapper th-wrapper-total_money'>
                <span>Giá trị đơn hàng</span> 
                <div class='sort-icon'>
                    <i class="fas fa-sort-up"></i>
                    <i class="fas fa-sort-down"></i>
                </div> 
            </div>
        </th> 
        <th class='th-product order-customer'>
            <div class='th-wrapper th-wrapper-fullname '>
                <span>Người đặt</span> 
                <div class='sort-icon'>
                    <i class="fas fa-sort-up"></i>
                    <i class="fas fa-sort-down"></i>
                </div> 
            </div>
        </th> 
        <th class='th-product order-email' >
            <div class='th-wrapper th-wrapper-email'>
                <span>Email</span> 
                <div class='sort-icon'>
                    <i class="fas fa-sort-up"></i>
                    <i class="fas fa-sort-down"></i>
                </div> 
            </div>
        </th> 
        <th class='th-product order-phone'>
            <div class='th-wrapper  th-wrapper-phone_number'>
                <span>Số điện thoại</span> 
                <div class='sort-icon'>
                    <i class="fas fa-sort-up"></i>
                    <i class="fas fa-sort-down"></i>
                </div> 
            </div>
        </th> 
        <th class='th-product order-address'>
            <div class='th-wrapper  th-wrapper-address'>
                <span>Địa chỉ</span> 
                <div class='sort-icon'>
                    <i class="fas fa-sort-up"></i>
                    <i class="fas fa-sort-down"></i>
                </div> 
            </div>
        </th> 
        <th class='th-product order-date'>
            <div class='th-wrapper  th-wrapper-order_date'>
                <span>Ngày đặt</span> 
                <div class='sort-icon'>
                    <i class="fas fa-sort-up"></i>
                    <i class="fas fa-sort-down"></i>
                </div> 
            </div>
        </th>

        <th class='th-product order-status'>
            <div class='th-wrapper  th-wrapper-status'>
                <span>Trạng thái</span> 
                <div class='sort-icon'>
                    <i class="fas fa-sort-up"></i>
                    <i class="fas fa-sort-down"></i>
                </div> 
            </div>
        </th>
        <!--  <th class='order-action'>Thao tác</th>   --!>
    </tr>
        </thead>   
        `;
    },
    orderTr: function (order, index) {
        return `
            <tr data='${order.id
            }' class='order-tr' title="Nhấn vào để xem chi tiết">
                <td>${order.id}</td>
                <td class='product-order'>                
                    ${tools.handleProductOrder(
                order.products
            )}                       
                </td>
                <td> 
                    <p class='blue'><b>${nf.format(
                order.total_money
            )} đ </b></p>                       
                </td>
                <td>                 
                    <p>${order.fullname}</p>                       
                </td>
                <td class='order-email'>      
                    <p>${order.email}</p>                 
                </td>
                <td>           
                    <p>${order.phone_number}</p>              
                </td>
                <td>     
                    <p>${order.address}</p>           
                </td>
                <td>     
                    <p>${tools.handleTime(order.order_date)}</p>           
                </td>
                
                <td class='order-status'>      
                    ${tools.handleOrderStatus(order.status)}         
                </td>
                
                <!-- <td class='action-table'>
                    <div class='action-table-wrapper'>
                        <p class='edit-all-order-action'>Thao tác</p>
                    </div>
                </td> --!>
               
            </tr>
        `;
    },
    orderTd: function (order) {
        return `
        <td>${order.id}</td>
                <td class='product-order'>                
                    ${tools.handleProductOrder(
            order.products
        )}                       
                </td>
                <td> 
                    <p class='blue'><b>${nf.format(
            order.total_money
        )} đ </b></p>                       
                </td>
                <td>                 
                    <p>${order.fullname}</p>                       
                </td>
                <td class='order-email'>      
                    <p>${order.email}</p>                 
                </td>
                <td>           
                    <p>${order.phone_number}</p>              
                </td>
                <td>     
                    <p>${order.address}</p>           
                </td>
                <td>     
                    <p>${tools.handleTime(order.order_date)}</p>           
                </td>
                
                <td class='order-status'>      
                    <p>${tools.handleOrderStatus(order.status)}</p>          
                </td>
                
                <!-- <td class='action-table'>
                    <div class='action-table-wrapper'>
                        <p class='edit-all-order-action'>Thao tác</p>
                    </div>
                </td> --!>
        `;
    },
    orders: function (orders) {
        if (!orders)
            return `
        <div class='products-area ${fadeInAnimate}'>
        <div class='table-wrapper'>
            <table class='order-table'>
            ${components.threadOrder()}  
                <tbody class='product-tbody'>
                    <td colspan="9" class='orange'>Không có đơn hàng nào</td> 
                </tbody>    
            </table>
        </div>          
        </div>
        `;
        return `
        <div class='products-area ${fadeInAnimate}'>
                                <div class='table-wrapper'>
                                    <table class='order-table'>
                                    ${components.threadOrder()}  
                                        <tbody class='product-tbody'>
                                        ${orders
                .map((order, index) => {
                    // components.productCard(product);
                    return components.orderTr(
                        order,
                        index
                    );
                })
                .join("")}  
                                        </tbody>    
                                    </table>
                                </div>          
                                </div>
        `;
    },

    actionOrderUI: function (order) {
        let actionUI = "";
        if (Number(order.status) === 1) {
            actionUI = `
            <div class='main-action-order-wrapper'>
                <button class='button' data='${order.id}' action='0'>Huỷ đơn</button>
                <button class='button blue' data='${order.id}' action='2'>Xác nhận đơn</button>
            </div>
            `;
        }
        if (Number(order.status) === 2) {
            actionUI = `
            <div class='main-action-order-wrapper'>
                <button class='button green' data='${order.id}' action='3'>Đã giao</button>
            </div>
            `;
        }
        return `
        <div class='action-order-ui-wrapper'>
            <div class='infor-order'>
                <div class="update-all-value order-infor-item">
                    <span class='update-all-value-title order-title-all'>Các sản phẩm: </span>
                    <div class='all-product-action-table'>${tools.handleProductOrderDetail(
            order.products
        )} </div>
                </div>
                <div class="update-all-value order-infor-item">
                    <span class='update-all-value-title order-title-all'>Giá trị đơn: </span>
                    <span class='blue'><b>${nf.format(
            order.total_money
        )} đ </b></span>
                </div>
                <div class="update-all-value order-infor-item">
                    <span class='update-all-value-title order-title-all'>Người đặt: </span>
                    <span><b>${order.fullname}</b></span>
                </div>
                <div class="update-all-value order-infor-item">
                    <span class='update-all-value-title order-title-all'>Email: </span>
                    <span><b>${order.email}</b></span>
                </div>
                <div class="update-all-value order-infor-item">
                    <span class='update-all-value-title order-title-all'>Số điên thoại: </span>
                    <span><b>${order.phone_number}</b></span>
                </div>
                <div class="update-all-value order-infor-item">
                    <span class='update-all-value-title order-title-all'>Địa chỉ: </span>
                    <span><b>${order.address}</b></span>
                </div>
                <div class="update-all-value order-infor-item">
                    <span class='update-all-value-title order-title-all'>Ngày đặt: </span>
                    <span><b>${tools.handleTimeFull(
            order.order_date
        )}</b></span>
                </div>
                <div class="update-all-value order-infor-item">
                    <span class='update-all-value-title order-title-all'>Ghi chú: </span>
                    <span><b>${tools.handleOrderNote(order.note)}</b></span>
                </div>
                <div class="update-all-value order-infor-item">
                    <span class='update-all-value-title order-title-all'>Trạng thái: </span>
                    <span><b>${tools.handleOrderStatus(order.status)}</b></span>
                </div>
            </div>
            ${actionUI}
        </div>
        `;
    },
    productsPage: function (products, category) {
        const productsLegth = products.length;
        const categoryLegth = category.length;
        let inventoryNum = products.reduce(
            (sum, curr) => sum + Number(curr.inventory_num),
            0
        );
        const filterArray = [];
        // console.log(inventoryNum);
        category.forEach((category) => {
            const item = products.filter(
                (product) => product.category_id === category.id
            );
            filterArray.push({
                category_id: category.id,
                category_name: category.name,
                products: item,
            });
        });
        // console.log(products);
        // console.log(filterArray);
        return `
            <div class='products-wrapper ${fadeInAnimate}'>
                <div class='products-infor'>
                    
                    <div class='main-product-layout'>
                        <div class='main-table-action'>
                            <div class='option-action-infor active'>Tìm kiếm</div>
                            <div class='option-action-infor'>Thống kê</div>
                        </div>
                    <div class='infor-layout'>
                    <div class='search-wrapper'>
                        <div class='search-item'>
                            <span class='search-title'>Tên sản phẩm:</span>
                            <select id='search-product-input'  tabindex="0" class='search-product-input' multiple="multiple">
                                <option id="pr-0" value='0'>
                                    <span>Tất cả</span>
                                </option>
                                ${products.map(
            (product) =>
                `<option id="pr-${product.id}" value='${product.id}'>
                                            <span>${product.title}</span>
                                        </option>`
        )}
                            </select>
                        </div>
                        <div class='search-item'>
                            <span class='search-title'>Danh mục sản phẩm:</span>
                            <select id='search-category-input'  tabindex="0" class='search-category-input' multiple="multiple">
                                <option id="ca-0" value='0'>
                                    <span>Tất cả</span>
                                </option>
                                ${category.map(
            (category) =>
                `<option id="ca-${category.id}" value='${category.id}'>
                                            <span>${category.name}</span>
                                        </option>`
        )}
                            </select>
                        </div>
                        <div class='search-item'>
                            <span class='search-title'>Khoảng giá (VND):</span>
                            <div class='two-input'>
                                <input type='number' id='minPrice' placeholder='Tối thiểu' />
                                <span style='color: var(--main-bg-bl1)'>-</span>
                                <input type='number' id='maxPrice' placeholder='Tối đa' />
                            </div>
                            
                        </div>
                        <div class='search-item'>
                            <span class='search-title'>Doanh số (VND):</span>
                            <div class='two-input'>
                                <input type='number' id='minSold' placeholder='Tối thiểu' />
                                <span style='color: var(--main-bg-bl1)'>-</span>
                                <input type='number' id='maxSold' placeholder='Tối đa'  />
                            </div>
                            
                        </div>
                        <div class='search-product-button-wrapper'>
                            <button class='search-product-btn high-light-btn'><i class="fas fa-search"></i> Tìm kiếm</button>
                        </div>
                    </div> 
                    </div>  

                    <div class='statistical-wrapper-master' style='display: none'>
                        
                        <div  class='statistical-wrapper'>
                            <p class='statistical-item'>Tổng số sản phẩm: <span>${productsLegth}</span></p>
                            <p class='statistical-item'>Kho hàng: <span>${inventoryNum}</span></p>
                            <p class='statistical-item'>Đã bán: <span>175</span></p>
                            <div class='statistical-item'>Danh mục: <span>${categoryLegth}</span>
                                ${filterArray
                .map(
                    (item) => `
                                    <p>- ${item.category_name}: <span>${item.products.length}</span></p>
                                `
                )
                .join("")}
                            
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div class='main-products'>
                    
                    <div class='main-product-layout product-layout'> 
                        <div class='main-table-action'>
                            <div class='option-action active'>Tất cả</div>
                            <div class='option-action'>Đang bán</div>
                            <div class='option-action'>Đang ẩn</div>
                            <div  class='option-action'>Danh mục</div>
                            <div class='add-product-btn-wrapper'>
                                <button class='add-category-btn high-light-btn'><svg viewBox="0 0 32 32"><path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></path></svg> Danh mục mới</button>
                                <button class='add-product-btn high-light-btn'><svg viewBox="0 0 32 32"><path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></path></svg> Sản phẩm mới</button>              
                            </div>
                        </div>                 
                        
                            <div class='category-wrapper'>    
                                <div class='products-area'>
                                <div class='table-wrapper'>
                                    <table>
                                    ${components.threadProduct()}  
                                        <tbody class='product-tbody'>
                                        ${products
                .map((product, index) => {
                    // components.productCard(product);
                    return components.producTr(
                        product,
                        index
                    );
                })
                .join("")}  
                                        </tbody>    
                                    </table>
                                </div>          
                                </div>

                            </div>
                        
                    </div>
                </div>
            </div>
        `;
    },

    product: function (products) {
        return `
        <div class='products-area ${fadeInAnimate}'>
                                <div class='table-wrapper'>
                                    <table>
                                    ${components.threadProduct()}  
                                        <tbody class='product-tbody'>
                                        ${products
                .map((product, index) => {
                    // components.productCard(product);
                    return components.producTr(
                        product,
                        index
                    );
                })
                .join("")}  
                                        </tbody>    
                                    </table>
                                </div>          
                                </div>
        `;
    },
    threadProduct: function () {
        return `
        <thead>                    
        <tr>
        <th class='stt-table th-product'>STT</th> 
        <th class='product-name-table th-product'>
        <div class='th-wrapper th-wrapper-name'>
                <span>Tên sản phẩm</span> 
                <div class='sort-icon'>
                    <i class="fas fa-sort-up"></i>
                    <i class="fas fa-sort-down"></i>
                </div> 
            </div>
            </th> 
        <th class='th-product'>
            <div class='th-wrapper th-wrapper-price'>
                <span>Giá</span> 
                <div class='sort-icon'>
                    <i class="fas fa-sort-up"></i>
                    <i class="fas fa-sort-down"></i>
                </div> 
            </div>
        </th> 
        <th class='th-product'>
            <div class='th-wrapper  th-wrapper-inventory_num'>
                <span>Kho hàng</span> 
                <div class='sort-icon'>
                    <i class="fas fa-sort-up"></i>
                    <i class="fas fa-sort-down"></i>
                </div> 
            </div>
        </th> 
        <th class='th-product'>
            <div class='th-wrapper  th-wrapper-sold'>
                <span>Doanh số</span> 
                <div class='sort-icon'>
                    <i class="fas fa-sort-up"></i>
                    <i class="fas fa-sort-down"></i>
                </div> 
            </div>
        </th> 
        <th>Thao tác</th> 
    </tr>
        </thead>   
        `;
    },

    productDetail: function () {
        return `
        <div class='product-detail-wrapper'>

        </div>
        `;
    },
    producTr: function (product, index) {
        return `
            <tr data='${product.id}'>
                <td>${index + 1}</td>
                <td>
                    <div class='product-title-table'>
                        <div class='product-thumbnail-table'>
                            <img src='${product.thumbnail}'></img>
                        </div>
                        <div>
                            <p class='product-name-table-l1'>${product.title
            }</p>
                            <p>Mã SP: ${product.product_code}</p>
                        </div>
                        <div class='edit-product-icon' indexing = 'title'><i class="fas fa-pen"></i></div>
                    </div>
                
                </td>
                <td>
                    <div class='product-detail-item'>
                        ${nf.format(product.price)} VND 
                        <div class='edit-product-icon'  indexing = 'price'><i class="fas fa-pen"></i></div>
                    </div>
                </td>
                <td>
                    <div class='product-detail-item' >
                        ${product.inventory_num} 
                        <div class='edit-product-icon' indexing = 'inventory_num'><i class="fas fa-pen"></i></div>
                        </div>
                    </td>
                <td>${product.sold}</td>
                <td class='action-table'>
                    <div class='action-table-wrapper'>
                        <p class='edit-all-product-action'>Chỉnh sửa</p>
                    </div>
                </td>
               
            </tr>
        `;
    },
    threadProductbyCategory: function () {
        return `
        <thead>                    
        <tr>
        <th class='stt-table th-product'>STT</th> 
        <th class='product-name-table th-product'>
        <div class='th-wrapper th-wrapper-name'>
                <span>Tên sản phẩm</span>  
            </div>
            </th> 
        <th class='th-product'>
            <div class='th-wrapper th-wrapper-price'>
                <span>Giá</span> 
            </div>
        </th> 
        <th class='th-product'>
            <div class='th-wrapper  th-wrapper-inventory_num'>
                <span>Kho hàng</span> 
            </div>
        </th> 
        <th class='th-product'>
            <div class='th-wrapper  th-wrapper-sold'>
                <span>Doanh số</span>  
            </div>
        </th> 
    </tr>
        </thead>   
        `;
    },
    productByCategory: function (filterArray) {
        // console.log(filterArray);
        return filterArray
            .map(
                (item) => `
                                <div class='products-title-layout '>
                                    <h2 class='category-title-product'>${item.category_name
                    }</h2>
                                    <div class='products-title-layout-right'>
                                        <button class='high-light-btn-border edit-category-btn' data-id='${item.category_id
                    }'>Chỉnh sửa</button>
                                        <button class='high-light-btn-border delete-category-btn' data-id='${item.category_id
                    }'>Xoá</button>
                                    </div>
                                </div>
                                <div class='products-area ${fadeInAnimate}'>
                                <div class='table-wrapper'>
                                    <table>
                                    ${components.threadProductbyCategory()}  
                                        <tbody class='product-tbody'>
                                        ${item.products
                        .map((product, index) => {
                            // components.productCard(product);
                            return components.producTrbyCategory(
                                product,
                                index
                            );
                        })
                        .join("")}  
                                        </tbody>    
                                    </table>
                                </div>          
                                </div>

                         
                        `
            )
            .join("");
        // return categoryWrapper;
    },
    producTrbyCategory: function (product, index) {
        return `
            <tr data='${product.id}'>
                <td>${index + 1}</td>
                <td>
                    <div class='product-title-table'>
                        <div class='product-thumbnail-table'>
                            <img src='${product.thumbnail}'></img>
                        </div>
                        <div>
                            <p class='product-name-table-l1'>${product.title
            }</p>
                            <p>Mã SP: ${product.product_code}</p>
                        </div>
                    </div>
                
                </td>
                <td>
                    <div class='product-detail-item'>
                        ${nf.format(product.price)} VND 
                    </div>
                </td>
                <td>
                    <div class='product-detail-item' >
                        ${product.inventory_num} 
                        </div>
                    </td>
                <td>${product.sold}</td>
                
               
            </tr>
        `;
    },
    producTd: function (index, product) {
        return `<td>${index}</td>
                <td>
                    <div class='product-title-table'>
                        <div class='product-thumbnail-table'>
                            <img src='${product.thumbnail}'></img>
                        </div>
                        <div>
                            <p class='product-name-table-l1'>${product.title
            }</p>
                            <p>Mã SP: ${product.product_code}</p>
                        </div>
                        <div class='edit-product-icon' indexing = 'title'><i class="fas fa-pen"></i></div>
                    </div>
                
                </td>
                <td>
                    <div class='product-detail-item'>
                        ${nf.format(product.price)} VND 
                        <div class='edit-product-icon'  indexing = 'price'><i class="fas fa-pen"></i></div>
                    </div>
                </td>
                <td>
                    <div class='product-detail-item' >
                        ${product.inventory_num} 
                        <div class='edit-product-icon' indexing = 'inventory_num'><i class="fas fa-pen"></i></div>
                        </div>
                    </td>
                <td>${product.sold}</td>
                <td class='action-table'>
                    <div class='action-table-wrapper'>
                        <p class='edit-all-product-action'>Chỉnh sửa</p>
                    </div>
                </td>`;
    },

    editProductUI: function (productName, infor, value) {
        const infor_ = infor.split(",");
        // console.log(infor_);
        return `
         <p>${productName}</p>
         <div class='update-value'>
            <span>${infor_[0]}</span><input id='update-value-input' placeholder='Nhập ${infor_[0]}' value='${value}' type='${infor_[1]}' />
         </div>
        `;
    },
    addCategoryUI: function () {
        return `
        <div class='update-value'>
           <span>Tên danh mục</span><input id='update-value-input' placeholder='Nhập tên danh mục' value='' type='text' />
        </div>
       `;
    },

    editCategoryUI: function (categoryTarget) {
        // console.log(categoryTarget);

        return `
        <div class='update-value'>
           <span>Tên danh mục</span><input id='update-category-name-input' placeholder='Nhập tên danh mục' value='${categoryTarget.category_name}' type='text' />
        </div>
       `;
    },

    noteConfirmUI: function (text) {
        return `
            <p class='note-text-confirm'>
                ${text}
            </p>
        `;
    },
    editAllUI: function (product, category) {
        // console.log(product);
        const descriptionText = product.description ? product.description : "";
        return `
        <div class= 'infor-product-edit-wrapper'>
        <div class='basic-product-infor-edit-all'>
        <div class='form-infor-product'>
            <div class='title-edit-all-product'><h3 class='orange'>Thông tin cơ bản</h3></div>
            <div class="update-all-value">
                <span class='update-all-value-title'><span class='orange'>*</span> Tên sản phẩm </span>
                <input  type='text' id="product-title-adit-all" data-name='title' class='input-edit-product-all required-infor' value='${product.title
            }' placeholder="Nhập tên sản phẩm" />
            </div>
            <div class="update-all-value">
                <span class='update-all-value-title'><span class='orange'>*</span> Mã sản phẩm </span>
                <input  type='text' id="product-product_code-adit-all" data-name='product_code' class='input-edit-product-all required-infor' value='${product.product_code
            }' placeholder="Nhập mã sản phẩm" />
            </div>
            <div class="update-all-value">
                <span class='update-all-value-title'><span class='orange'>*</span> Danh mục</span>
                <select id='edit-category-input'  tabindex="0" class='edit-category-input'>
                   
                    ${category
                .map((category) => {
                    if (
                        Number(category.id) === Number(product.category_id)
                    ) {
                        return `
                            <option id="ca-all-${category.id}" value='${category.id}' selected>
                                <span>${category.name}</span>
                            </option>`;
                    } else {
                        return `
                            <option id="ca-all-${category.id}" value='${category.id}'>
                                <span>${category.name}</span>
                            </option>`;
                    }
                })
                .join("")}
                    </select>
            </div>

           
            <div class="update-all-value update-all-value-textarea">
                <span class='update-all-value-title update-all-value-title-textarea'>Mô tả</span>
                <textarea type='number' id="edit-product-description" data-name='description'  placeholder="Nhập mô tả">
                        ${product.description}
                </textarea>
            </div>

            <div class="update-all-value update-all-value-textarea">
                <span class='update-all-value-title update-all-value-title-textarea'>Tính năng</span>
                <textarea type='number' id="edit-product-description-all" data-name='description-all'  placeholder="Nhập tính năng">
                        ${product.description_all}
                </textarea>
            </div>

            <div class="update-all-value update-all-value-textarea">
            <span class='update-all-value-title update-all-value-title-textarea'>Thông số kỹ thuật</span>
            <textarea type='number' id="edit-product-technique-all" data-name='technique'  placeholder="Nhập thông số kỹ thuật">
                    ${product.technique}
            </textarea>
        </div>
        </div>
        
        </div>

        
        <div class='sell-product-infor-edit-all'>
        <div class='product-image-edit-area'>
        <div class='title-edit-all-product'><h3 class='orange'>Hình ảnh sản phẩm</h3></div>
        <div class='set-image-product-area-wrapper-edit-all'>
            <div></div>
            <div class='set-image-product-area-edit-all'>
                <div class='set-image-item required-image-item' style="background-image: url('${product.thumbnail
            }')">
                    
                </div>
                ${product.product_images
                .split("*")
                .map((image, index) => {
                    return `

                    ${image !== ""
                            ? `<div class='set-image-item required-image-item' style="background-image: url('${image}')">
                        <span class="delete-prooduct-img"><i class="close"></i></span>
                    </div>`
                            : ""
                        }
                    `;
                })
                .join("")}
                
                <div class='set-image-item plus-image-item'>
                   
                    <div class="plus alt"></div>
                    <span>Thêm hình ảnh</span>
                </div>
            </div>
        </div>
    </div>
            <div class='title-edit-all-product'><h3 class='orange'>Thông tin bán hàng</h3></div>
            <div class="update-all-value">
                <span class='update-all-value-title'><span class='orange'>*</span> Giá sản phẩm </span>
                <input  type='number' id="product-price-adit-all" data-name='price' class='input-edit-product-all required-infor' value=${product.price
            } placeholder="Nhập giá sản phẩm" />
                <span class='describe-input'>VND</span>
            </div>

            <div class="update-all-value">
                <span class='update-all-value-title'><span class='orange'>*</span> Giảm giá</span>
                <input  type='number' id="product-discount-adit-all" data-name='discount' class='input-edit-product-all required-infor' value=${product.discount
            } placeholder="Nhập giá sản phẩm" />
                <span class='describe-input'>%</span>
            </div>

            <div class="update-all-value">
            <span class='update-all-value-title'><span class='orange'>*</span> Kho hàng </span>
            <input type='number'id="product-inventory_num-adit-all" data-name='inventory_num' class='input-edit-product-all required-infor' value=${product.inventory_num
            }  placeholder="Nhập kho hàng" />
            <span class='describe-input'>Sản phẩm</span>
            </div>
            <div class="update-all-value">
                <span class='update-all-value-title'>Trạng thái </span>
                <input disabled value='${tools.handleProductStatus(
                product.hidden
            )}' />
            </div>

            <div class="update-all-value">
                <span class='update-all-value-title'>Nổi bật </span>
                <select id='edit-featured-input'  tabindex="0" class='edit-featured-input'>
                            <option ${!Number(product.featured) ? "selected" : ""
            } id="fea-all-0" value='0'>
                                <span>Không</span>
                            </option>
                            
                            <option ${Number(product.featured) ? "selected" : ""
            } id="fea-all-1" value='1'>
                                <span>Có</span>
                            </option>         
                    </select>
            </div>

            <div class='title-edit-all-product'><h3 class='orange'>Thao tác</h3></div>
            <div class='product-action-main'>
            ${Number(product.hidden)
                ? `<button class='product-action-main-button open-sell'>Hiện bán sản phẩm<button>`
                : `<button class='product-action-main-button close-sell'>Ẩn bán sản phẩm</button>`
            }
                <button class='product-action-main-button delete-product'>Xoá sản phẩm</button>
            </div>
        </div>
        </div>`;
    },
    editUiProductThumb: function (children) {
        return `
            <div class='edit-product-thumb-wrapper'>
                ${children}
            </div>
        `;
    },
    confirm: function (content = "", confirmText = "Đồng ý") {
        return `
            <div class='confirm-content'>${content}</div>
            <div class = 'confirm-ui'>
                <button>Huỷ</button>
                <button>${confirmText}</button>
            </div>
        `;
    },
    themePage: function (themeData) {
        // console.log(window.location.origin);
        return `
        <div class="theme-page-wrapper">
            <div class="theme-page-top">
                <div class="theme-title">
                    <h3>Màu sắc</h3>
                    <button class="button save-theme-btn">Lưu</button>
                </div>
                <div class='combo-theme-wrapper'>
                <div class='combo-theme-wrapper-title'>
                    <h3>
                        Chọn theo gói chủ đề được đề xuất
                    </h3> 
                </div>
                <select id="combo-theme-color" tabindex="0" class="">
                        <option id="" value="">
                            <span>Chọn chủ đề</span>
                        </option>
                        ${themeCombo.map(
            (theme, index) => `
                            <option id="theme-${index}" value="${index}">
                                <span>${theme.name}</span>
                            </option>
                        `
        )}
                        

                    </select>
            </div>
                <div class='theme-choose-color-area'>

                <div class='theme-choose-color-area-left'>
                    <div class="theme-color-item">
                        <span class="title-theme-color-item">Màu chủ đề</span>
                        <input type="color" class='color-picker-theme' id='theme-main_color' value='${themeData.main_color
            }'/>
                        <select id="theme-color" tabindex="0" class="">
                            <option id="" value="" class='orange'>
                                <span class='orange'>Gợi ý</span>
                            </option>
                            
                        </select>
                    </div>
                    <div class="theme-color-item">
                        <span class="title-theme-color-item">Màu nút nhấn</span>
                        <input type="color" class='color-picker-theme'  id="theme-color_button" value='${themeData.color_button
            }'/>
                        <select id="theme-button-color" tabindex="0">
                            <option id="" value="">
                                <span>Gợi ý</span>
                            </option>
                            
                        </select>
                    </div>
                </div>

                <div class='theme-choose-color-area-right'>
                    <div class="theme-color-item">
                        <span class="title-theme-color-item">Màu chữ</span>
                        <input type="color" class='color-picker-theme' id='theme-color_letter_1' value='${themeData.color_letter_1
            }'/>
                        <select id="theme-text-color" tabindex="0" class="">
                            <option id="" value="">
                                <span>Gợi ý</span>
                            </option>
                        </select>
                    </div>
                    <div class="theme-color-item">
                        <span class="title-theme-color-item">Header</span>
                        <input type="color" class='color-picker-theme' id='theme-color_menu_home' value='${themeData.color_menu_home
            }'/>
                        <select id="theme-text-header-color" tabindex="0" class="">
                            <option id="" value="">
                                <span>Gợi ý</span>
                            </option>
                        </select>
                    </div>
                </div>

                <div class='theme-choose-color-area-right-l1'>
                    <div class="theme-color-item">
                        <span class="title-theme-color-item">Chữ hover</span>
                        <input type="color" class='color-picker-theme' id='theme-color_letter_1' value='${themeData.color_letter_1
            }'/>
                        <select id="theme-text-hover-color" tabindex="0" class="">
                            <option id="" value="">
                                <span>Gợi ý</span>
                            </option>
                        </select>
                    </div>
                    <div class="theme-color-item">
                        <span class="title-theme-color-item">Footer</span>
                        <input type="color" class='color-picker-theme' id='theme-color_menu_home' value='${themeData.color_menu_home
            }'/>
                        <select id="theme-text-footer-color" tabindex="0" class="">
                            <option id="" value="">
                                <span>Gợi ý</span>
                            </option>
                        </select>
                    </div>
                </div>
                </div>
               
            </div>
            <div class="theme-page-bottom">
                <div class="theme-title">
                    <h3>Bản xem trước</h3>
                </div>

                <div>
                    <iframe class='preview-page' id='iframe-preview' src="${window.location.origin
            }" title="DAI LY FRAME - ACCEPTED CROS">
                    </iframe>
                </div>

            </div>
        </div>`;
    },
    advertisementPage: function (advertisementData) {
        // console.log(window.location.origin);
        const multiBanner = advertisementData.multi_banner.split("*");
        return `
        <div class="infor-page-wrapper ${fadeInAnimate}">
            <div class="infor-page-top">
                <div class="infor-title">
                    <h3>Banner trang</h3>
                    <button class="button save-multi-banner-btn">Lưu</button>
                </div>
                <div class='infor-area'>
                    <div class='set-image-product-area-wrapper-edit-all'>
                    <div></div>
                <div class='set-image-product-area-edit-all'>
                    
                    ${multiBanner

                .map((image, index) => {
                    return `
    
                        ${image !== ""
                            ? `<div class='set-image-item required-image-item' style="background-image: url('${image}')">
                                ${!index
                                ? ""
                                : '<span class="delete-prooduct-img"><i class="close"></i></span>'
                            }
                        </div>`
                            : ""
                        }
                        `;
                })
                .join("")}
                    
                    <div class='set-image-item plus-image-item-multi'>
                       
                        <div class="plus alt"></div>
                        <span>Thêm hình ảnh</span>
                    </div>
                </div>
            </div>
                
                </div>
            </div>



            <div class="infor-page-top">
                <div class="infor-title">
                    <h3>Banner quảng cáo</h3>
                    <button class="button save-infor-btn">Lưu</button>
                </div>
                <div class='infor-area'>
                
                <div class="infor-item">
                <span class='title-infor-item'><span class='orange'>*</span> Trạng thái </span>
                <select id='advertisement-status' tabindex="0" class='advertisement-status'>   
                        <option id="feat-news-1" value='1' ${!Number(advertisementData.hidden) ? "" : "selected"
            }>
                            <span>Tắt</span>
                        </option>
    
                        <option id="feat-news-2" value='0' ${Number(advertisementData.hidden) ? "" : "selected"
            }>
                            <span>Bật</span>
                        </option>
                </select> 
                </div>

                <div class="infor-item">
                    <span class="title-infor-item"><i class="fas fa-question-circle appear_time-question"></i> <span class='orange'>*</span> Thời gian</span>
                    <input data-name='appear_time' type="number" class='infor-page-input required-infor' id='infor-page-name' value='${advertisementData.appear_time
            }' placeholder='Nhập Telegram ID'/>
                    <span class='describe-input'>giây</span>
                </div>

                <div class="infor-item">
                    <span class='title-infor-item'><span class='orange'>*</span> Ảnh banner </span>
                    <input  type='text' id="image-input" data-name='banner' class='image-input required-infor' style='display: none'value='${advertisementData.banner || ""
            }' />
                    <div class='set-image-item plus-image-item advertisement-banner' style='background-image: url("");'>
                        <img src='${advertisementData.banner}' />
                        <div class='plus-alt-wrapper news-img-item advertisement-banner-plus-icon'>
                            <div class="plus alt"></div>
                            <span>Chọn hình ảnh</span>
                        </div>
                    </div>
                </div>        
            </div>
            </div>
        </div>`;
    },
    configPage: function (configData) {
        // console.log(window.location.origin);
        return `
        <div class="infor-page-wrapper ${fadeInAnimate}">
            <div class="infor-page-top">
                <div class="infor-title">
                    <h3>Cấu hình tài khoản</h3>
                    <button class="button save-infor-btn">Lưu</button>
                </div>
                <div class='infor-area'>
                <div class='orange' style='font-weight: 600'>Thông liên liên hệ</div>
                <div class="infor-item">
                    <span class="title-infor-item"><i class="fas fa-question-circle user_telegram-question"></i> Telegram ID</span>
                    <input data-name='user_telegram' type="text" class='infor-page-input infor-required' id='infor-page-name' value='${configData.user_telegram}' placeholder='Nhập Telegram ID'/>
                </div>

                <div class="infor-item">
                    <span class="title-infor-item"><i class="fas fa-question-circle social-question"></i> Messenger ID</span>
                    <input data-name='messenger_id' type="text" class='infor-page-input infor-required' id='infor-page-name' value='${configData.messenger_id}' placeholder='Nhập Messenger ID'/>
                </div>

                <div class="infor-item">
                    <span class="title-infor-item"><i class="fas fa-question-circle social-question"></i> Admin Zalo</span>
                    <input data-name='zalo_phone' type="text" class='infor-page-input infor-required' id='infor-page-name' value='${configData.zalo_phone}' placeholder='Nhập Messenger ID'/>
                </div>

                <div class="infor-item">
                    <span class="title-infor-item"><i class="fas fa-question-circle social-question"></i> Admin Phone</span>
                    <input data-name='phone_number' type="text" class='infor-page-input infor-required' id='infor-page-name' value='${configData.phone_number}' placeholder='Nhập Messenger ID'/>
                </div>
            
            </div>

                
               
            </div>
           
        </div>`;
    },
    inforPage: function (inforData) {
        // console.log(window.location.origin);
        return `
        <div class="infor-page-wrapper ${fadeInAnimate}">
            <div class="infor-page-top">
                <div class="infor-title">
                    <h3>Thông tin trang</h3>
                    <button class="button save-infor-btn">Lưu</button>
                </div>
                <div class='infor-area'>

                    <div class="infor-item">
                        <span class="title-infor-item"><span class='orange'>* </span>Tên công ty</span>
                        <input data-name='name' type="text" class='infor-page-input infor-required' id='infor-page-name' value='${inforData.name
            }' placeholder='Nhập tên công ty'/>
                    </div>
                    <div class="infor-item">
                        <span class="title-infor-item"><span class='orange'>* </span>Số điện thoại</span>
                        <div class='infor-page-inner-wrapper'>
                            ${inforData.phone
                .map(
                    (phone, index) => `
                                    <div class='infor-page-input-wrapper'>
                                        <input data-name='phone' type="text" class='infor-page-input ${!index ? "infor-required" : ""
                        }' id='infor-page-phone' value='${phone.phone
                        }' placeholder='Nhập số điện thoại'/> 
                                        ${index
                            ? "<div class='delete-infor-item-btn'>Xoá</div>"
                            : '<span class="key-main-input">Hotline</span>'
                        }
                                    </div>
                            `
                )
                .join("")}     
                            <div class='add-infor-item-btn-wrapper'>
                                <div class='add-infor-item-btn'><svg viewBox="0 0 32 32"><path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></path></svg> Thêm</div>
                            </div>
                        </div>
                    </div>
                    <div class="infor-item">
                        <span class="title-infor-item"><span class='orange'>* </span>Email</span>
                        <div class='infor-page-inner-wrapper'>
                            ${inforData.email
                .map(
                    (email, index) => `
                                <div class='infor-page-input-wrapper'>
                                    <input data-name='email' type="text" class='infor-page-input ${!index ? "infor-required" : ""
                        }' id='infor-page-email' value='${email.email
                        }' placeholder='Nhập email'/>
                                    ${index
                            ? "<div class='delete-infor-item-btn'>Xoá</div>"
                            : '<span class="key-main-input">Email chính</span>'
                        }
                                </div>
                            `
                )
                .join("")}
                            
                            <div class='add-infor-item-btn-wrapper'>
                                <div class='add-infor-item-btn'><svg viewBox="0 0 32 32"><path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></path></svg> Thêm</div>
                            </div>
                        </div>
                    </div>
                    <div class="infor-item">
                        <span class="title-infor-item"><span class='orange'>* </span>Địa chỉ</span>
                        <div class='infor-page-inner-wrapper'>
                           
                            ${inforData.address
                .map(
                    (address, index) => `
                                <div class='infor-page-input-wrapper'>
                                <input data-name='address' type="text" class='infor-page-input ${!index ? "infor-required" : ""
                        }' id='infor-page-address' value='${address.location
                        }' placeholder='Nhập địa chỉ'/>
                                    ${index
                            ? "<div class='delete-infor-item-btn'>Xoá</div>"
                            : '<span class="key-main-input">Địa chỉ chính</span>'
                        }
                                </div>
                            `
                )
                .join("")}
                            <div class='add-infor-item-btn-wrapper'>
                                <div class='add-infor-item-btn'><svg viewBox="0 0 32 32"><path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></path></svg> Thêm</div>
                            </div>
                        </div>
                    </div>
                    <div class="infor-item special-title">
                        <span class="title-infor-item "><span class='orange'>* </span>Toạ độ công ty</br> (Chọn trên bản đồ)</span>
                        <div class='infor-page-inner-wrapper'>
                            <input data-name='lat' type="number" class='infor-page-input infor-required' id='infor-page-location-lat' value='${inforData.address[0].lat
            }' placeholder='Nhập vĩ độ'/>
                            <input data-name='lng' type="number" class='infor-page-input infor-required' id='infor-page-location-lng' value='${inforData.address[0].lng
            }' placeholder='Nhập kinh độ'/>
                            <div id='infor-page-map' class='infor-page-map'></div>
                        </div>
                    </div>
                    <div class="infor-item special-title">
                        <span class="title-infor-item"><span class='orange'>* </span>Logo công ty</span>
                        <div class='set-image-product-area-wrapper-edit-all'>
                            <div class='set-image-product-area-edit-all update-all-value infor-page-logo'>
                                <input data-name='logo' type='file' accept="image/*" id="infor-page-logo" data-name='image' class='input-add-product' style='display: none' value='1' />
                                <div class='set-image-item plus-image-item' style="background-image: url(${inforData.logo
            })">
                                    <div class='plus-alt-wrapper' >
                                        <div style='display: none' class="plus alt"></div>
                                        <span style='display: none'>Thêm hình ảnh</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    
                    <div class="infor-item">
                        <span class="title-infor-item"><span class='orange'>* </span>Coppyright</span>
                        <input data-name='footer' type="text" class='infor-page-input infor-required' id='infor-page-footer' value='${inforData.footer
            }' placeholder='@Coppyright'/>
                    </div>
                    <div class="infor-item">
                        <span class="title-infor-item">Bộ công thương</span>
                        <input data-name='gov_link' type="text" class='infor-page-input' id='infor-page-gov_link' value='${inforData.gov_link
            }'/>
                    </div>
                    <div class="infor-item">
                        <span class="title-infor-item">Địa chỉ Youtube</span>
                        <input data-name='link_youtube' type="text" class='infor-page-input' id='infor-page-link_youtube' value='${inforData.link_youtube
            }'/>
                    </div>
                    <div class="infor-item">
                        <span class="title-infor-item">Địa chỉ Facebook</span>
                        <input data-name='link_facebook' type="text" class='infor-page-input' id='infor-page-link_facebook' value='${inforData.link_facebook
            }'/>
                    </div>
                    <div class="infor-item">
                        <span class="title-infor-item">Địa chỉ Zalo</span>
                        <input data-name='link_zalo' type="text" class='infor-page-input' id='infor-page-link_zalo' value='${inforData.link_zalo
            }'/>
                    </div>
                </div>
               
            </div>
           
        </div>`;
    },
    imageManangePage: function () {
        const imgData = [...app.data.image];
        const currentImg = [...app.data.image].filter(
            (img) => tools.handleTime(img.create_at) === tools.handleTime(new Date())
        );
        let preTime;
        return `
        
        <div class='image-tab-wrapper img-manange-page ${fadeInAnimate}'>
            
            <div class='image-tab-wrapper-available'>
                <div class='image-tab-title'>
                    <h3 class='orange'>Ảnh tải lên gần đây</h3>
                    <div class='main-title-right animate__animated img-m-page'>
                        <button class='delete-images-btn high-light-btn-border'><i class="far fa-trash-alt"></i> Xoá</button> 
                    </div>
                </div>
                <div class='image-tab-area-wrapper'>
                <div class='image-tab-area'>
                <div class='date-title-image-tab'>Hôm nay</div>
                <div class='add-image-wrapper'>
                    <input data-name='image' type='file' accept="image/*" id="upload-image" style='display: none' />
                        <div class='plus-alt-wrapper' onclick="handleEvent.uploadImagePage(event)">
                            <span>Thêm hình ảnh</span>
                        </div>
                </div>
                ${!currentImg.length
                ? ""
                : currentImg
                    .reverse()
                    .map((img) => {
                        return `
                                  ${components.imageItemUI(img)}
                    `;
                    })
                    .join("")
            }
                ${imgData
                .reverse()
                .map((img) => {
                    let printTime = true;
                    let currTime = tools.handleTime(img.create_at);
                    // console.log(preTime + '  :  ' + currTime);
                    if (currTime !== preTime) {
                        printTime = true;
                        preTime = currTime;
                    } else printTime = false;

                    if (currTime === tools.handleTime(new Date())) {
                        return "";
                    }

                    return `
                        ${printTime
                            ? `
                            <div class='date-title-image-tab'>${currTime}</div>
                        `
                            : ""
                        }
                        ${components.imageItemUI(img)}
                    `;
                })
                .join("")}
                </div>
                </div>
            </div>

            
        </div>
        `;
    },
    imageItemUI: function (img) {
        return `
        <div class='image-item page_'>
        <img tag-name='image' id='img-${img.id}' class="loading_img"  onload="tools.onloadImage(event)"  loading="lazy" src='${img.url}'>
        <div class='img-item-action'>
            <label class="container">
                <input type="checkbox" class='img-checkbox-input'>
                <span class="checkmark"></span>
            </label>
            <div class='zoom-icon-img'><i class="fas fa-expand-alt"></i></div>
        </div>
    </div>
        `;
    },
    imageTab: function () {
        const imgData = [...app.data.image];
        const currentImg = [...app.data.image].filter(
            (img) => tools.handleTime(img.create_at) === tools.handleTime(new Date())
        );
        let preTime;
        // console.log(currentImg);
        return `
        <div class='image-tab-wrapper animate__animated animate__zoomIn'>
            
            <div class='image-tab-wrapper-available'>
                <div class='image-tab-title'>
                    <h3 class='orange'>Ảnh tải lên gần đây</h3>
                </div>
                <div>
                <div class='image-tab-area'>
                <div class='date-title-image-tab'>Hôm nay</div>
                <div class='add-image-wrapper'>
                    <input data-name='image' type='file' accept="image/*" id="upload-image"  style='display: none' />
                        <div class='plus-alt-wrapper' onclick="handleEvent.uploadImage(event)">
                            <span>Thêm hình ảnh</span>
                        </div>
                </div>
                ${!currentImg.length
                ? ""
                : currentImg
                    .reverse()
                    .map((img) => {
                        return `
                    <div class='image-item' onclick="handleEvent.imageItemClick(event)">
                    <img tag-name='image' class="loading_img"  onload="tools.onloadImage(event)"  loading="lazy" src='${img.url}'>
                </div>
                    `;
                    })
                    .join("")
            }
                ${imgData
                .reverse()
                .map((img) => {
                    let printTime = true;
                    let currTime = tools.handleTime(img.create_at);
                    // console.log(preTime + '  :  ' + currTime);
                    if (currTime !== preTime) {
                        printTime = true;
                        preTime = currTime;
                    } else printTime = false;

                    if (currTime === tools.handleTime(new Date())) {
                        return "";
                    }

                    return `
                        ${printTime
                            ? `
                            <div class='date-title-image-tab'>${currTime}</div>
                        `
                            : ""
                        }
                        <div class='image-item' onclick="handleEvent.imageItemClick(event)">
                            <img tag-name='image' class="loading_img"  onload="tools.onloadImage(event)"  loading="lazy" src='${img.url
                        }'>
                        </div>
                    `;
                })
                .join("")}
                </div>
                </div>
            </div>

            
        </div>

        `;
    },
    // imageTabInner: function () {
    //     const imgData = [...app.data.image];
    //     let preTime;
    //     // console.log(imgData);
    //     return `
    //     <div class='image-tab-wrapper animate__animated animate__zoomIn'>

    //         <div class='image-tab-wrapper-available'>
    //             <div class='image-tab-title'>
    //                 <h3 class='orange'>Ảnh tải lên</h3>
    //             </div>
    //             <div>
    //             <div class='image-tab-area'>
    //             <div class='add-image-wrapper'>
    //                 <input data-name='image' type='file' accept="image/*" id="upload-image"  style='display: none' />
    //                     <div class='plus-alt-wrapper' onclick="handleEvent.uploadImage(event)">
    //                         <span >Thêm hình ảnh</span>
    //                     </div>
    //             </div>
    //             ${imgData
    //                 .reverse()
    //                 .map((img) => {
    //                     let printTime = true;
    //                     let currTime = tools.handleTime(img.create_at);
    //                     if (currTime !== preTime) {
    //                         printTime = true;
    //                         preTime = currTime;
    //                     } else printTime = false;

    //                     if (currTime === tools.handleTime(new Date())) {
    //                         currTime = 'Hôm nay';
    //                     }
    //                     return `
    //                     ${
    //                         printTime
    //                             ? `
    //                         <div class='date-title-image-tab'>${currTime}</div>
    //                     `
    //                             : ''
    //                     }
    //                     <div class='image-item' onclick="handleEvent.imageItemClick(event)">
    //                         <img tag-name='image' class="loading_img"  onload="tools.onloadImage(event)"  loading="lazy" src='${
    //                             img.url
    //                         }'>
    //                     </div>
    //                 `;
    //                 })
    //                 .join('')}
    //             </div>
    //             </div>
    //         </div>

    //     </div>

    //     `;
    // },

    imgUI: function (img) {
        // console.log(img);
        return `
        <div class='image-ui'>
            <img  src='${img.src}'></img>
        </div>
        `;
    },
    icon: {
        add: function () {
            return `<svg viewBox="0 0 32 32"><path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></path></svg>`;
        },
    },
    mainUI: function (permission_id) {
        const logoWrapper = $_(".logo-wrapper");
        logoWrapper.querySelector("h2").innerText = tools.handlePermission(
            Number(permission_id)
        );
        const MANAGER = -1;
        const ADMIN = 1;
        const ACCOUNTANT = 2;
        const DESIGN = 3;
        return `
                    ${[MANAGER, ADMIN, ACCOUNTANT].includes(
            Number(permission_id)
        )
                ? `<div class="sidebar-option main-option" tab="dashboard">
                                    <div class="sidebar-option-top">
                                        <i class="fas fa-chart-line"></i>
                                        <h2>Dashboard</h2>
                                        <div class="bg-option"></div>
                                    </div>
                                </div>`
                : ""
            }

                    ${[MANAGER, ADMIN, ACCOUNTANT].includes(
                Number(permission_id)
            )
                ? `<div class="sidebar-option multi-option">
                            <div class="sidebar-option-top">
                                <i class="fas fa-dolly-flatbed"></i>
                                <h2>Sản phẩm</h2>
                                <i class="fas fa-chevron-left"></i>
                                <div class="bg-option"></div>
                            </div>
                            <div class="sidebar-option-l1">
                                <div class="main-option-l1 main-option" tab="products">
                                    <div class="main-option-l1-inner">
                                        <i class="fas fa-caret-right"></i>
                                        <h2>Tất cả</h2>
                                    </div>
                                </div>
                                <div class="main-option-l1 main-option" tab="add-products">
                                    <div class="main-option-l1-inner">
                                        <i class="fas fa-caret-right"></i>
                                        <h2>Thêm sản phẩm</h2>
                                    </div>
                                </div>
                            </div>
                        </div>`
                : ""
            }
                    
                    ${[MANAGER, ADMIN, ACCOUNTANT].includes(
                Number(permission_id)
            )
                ? `<div class="sidebar-option main-option" tab="orders">
                            <div class="sidebar-option-top">
                                <i class="fas fa-clipboard-list"></i>
                                <h2>Đơn hàng</h2>
                                <div class="bg-option"></div>
                            </div>
                        </div>`
                : ""
            }
                    ${[MANAGER, ADMIN, DESIGN].includes(Number(permission_id))
                ? `<div class="sidebar-option multi-option">
                            <div class="sidebar-option-top">
                                <i class="far fa-file-word"></i>
                                <h2>Trang</h2>
                                <i class="fas fa-chevron-left"></i>
                                <div class="bg-option"></div>
                            </div>
                            <div class="sidebar-option-l1">
                                
                                <div class="main-option-l1 main-option" tab="home-page">
                                    <div class="main-option-l1-inner">
                                        <i class="fas fa-caret-right"></i>
                                        <h2>Trang chủ</h2>
                                    </div>
                                </div>
                                <div class="main-option-l1 main-option" tab="products-page">
                                    <div class="main-option-l1-inner">
                                        <i class="fas fa-caret-right"></i>
                                        <h2>Sản phẩm</h2>
                                    </div>
                                </div>
                                
                                <div class="main-option-l1 main-option" tab="service-page">
                                    <div class="main-option-l1-inner">
                                        <i class="fas fa-caret-right"></i>
                                        <h2>Dịch vụ</h2>
                                    </div>
                                </div>
                                <div class="main-option-l1 main-option" tab="news-page">
                                    <div class="main-option-l1-inner">
                                        <i class="fas fa-caret-right"></i>
                                        <h2>Tin tức</h2>
                                    </div>
                                </div>
                                <div class="main-option-l1 main-option" tab="policys-page">
                                    <div class="main-option-l1-inner">
                                        <i class="fas fa-caret-right"></i>
                                        <h2>Chính sách</h2>
                                    </div>
                                </div>
                                  <div class="main-option-l1 main-option" tab="agency-page">
                                    <div class="main-option-l1-inner">
                                        <i class="fas fa-caret-right"></i>
                                        <h2>Nhãn hàng</h2>
                                    </div>
                                </div>
                                   <div class="main-option-l1 main-option" tab="registerSolutions-page">
                                    <div class="main-option-l1-inner">
                                        <i class="fas fa-caret-right"></i>
                                        <h2>Khách hàng</h2>
                                    </div>
                                </div>
                                <div class="main-option-l1 main-option" tab="solutions-page">
                                    <div class="main-option-l1-inner">
                                        <i class="fas fa-caret-right"></i>
                                        <h2>Giải pháp</h2>
                                </div>
                                
                                
                              
                                </div>
                                <div class="main-option-l1 main-option" tab="advertisement-page">
                                    <div class="main-option-l1-inner">
                                        <i class="fas fa-caret-right"></i>
                                        <h2>Banner</h2>
                                    </div>
                                </div>
                                
                                <div class="main-option-l1 main-option" tab="infor-page">
                                    <div class="main-option-l1-inner">
                                        <i class="fas fa-caret-right"></i>
                                        <h2>Thông tin trang</h2>
                                    </div>
                                </div>
                                <div class="main-option-l1 main-option" tab="theme-page">
                                    <div class="main-option-l1-inner">
                                        <i class="fas fa-caret-right"></i>
                                        <h2>Giao diện</h2>
                                    </div>
                                </div>
                                
                            </div>
                        </div>`
                : ""
            }
                    ${[MANAGER, ADMIN].includes(Number(permission_id))
                ? `<div class="sidebar-option multi-option">
                            <div class="sidebar-option-top">
                                <i class="fas fa-user-plus"></i>
                                <h2>Tuyển dụng</h2>
                                <i class="fas fa-chevron-left"></i>
                                <div class="bg-option"></div>
                            </div>
                            <div class="sidebar-option-l1">
                                
                                <div class="main-option-l1 main-option" tab="recruitment-page">
                                    <div class="main-option-l1-inner">
                                        <i class="fas fa-caret-right"></i>
                                        <h2>Bài tuyển dụng</h2>
                                    </div>
                                </div>

                                <div class="main-option-l1 main-option" tab="cv-recruitment-page">
                                    <div class="main-option-l1-inner">
                                        <i class="fas fa-caret-right"></i>
                                        <h2>CV ứng viên</h2>
                                    </div>
                                </div>

                            </div>
                            </div>`
                : ""
            }

                    ${[MANAGER, ADMIN, ACCOUNTANT].includes(
                Number(permission_id)
            )
                ? `<div class="sidebar-option main-option" tab="contact">
                            <div class="sidebar-option-top">
                                <i class="fas fa-clipboard-list"></i>
                                <h2>Liên hệ</h2>
                                <div class="bg-option"></div>
                            </div>
                        </div>`
                : ""
            }
                    ${[MANAGER, ADMIN, ACCOUNTANT].includes(
                Number(permission_id)
            )
                ? `<div class="sidebar-option main-option" tab="config-manange">
                            <div class="sidebar-option-top">
                                <i class="fas fa-cogs"></i>
                                <h2>Cấu hình</h2>
                                <div class="bg-option"></div>
                            </div>
                        </div>`
                : ""
            }

                    ${[MANAGER, ADMIN, DESIGN].includes(Number(permission_id))
                ? `<div class="sidebar-option main-option" tab="seo-infor-page">
                            <div class="sidebar-option-top">
                                <i class="fas fa-code"></i>
                                <h2>SEO & Mã nhúng</h2>
                                <div class="bg-option"></div>
                            </div>
                        </div>`
                : ""
            }


                    ${[MANAGER, ADMIN, DESIGN].includes(Number(permission_id))
                ? `<div class="sidebar-option main-option" tab="image-manange">
                            <div class="sidebar-option-top">
                                <i class="fas fa-photo-video"></i>
                                <h2>Quản lý hình ảnh</h2>
                                <div class="bg-option"></div>
                            </div>
                        </div>`
                : ""
            }

                    ${[MANAGER, ADMIN].includes(Number(permission_id))
                ? `<div class="sidebar-option main-option" tab="acc-manage">
                            <div class="sidebar-option-top">
                                <i class="fas fa-users-cog"></i>
                                <h2>Tài khoản & Hành động</h2>
                                <div class="bg-option"></div>
                            </div>
                        </div>`
                : ""
            }
                    ${[MANAGER].includes(Number(permission_id))
                ? `<div class="sidebar-option main-option" tab="manager">
                            <div class="sidebar-option-top">
                                <i class="fas fa-server"></i>
                                <h2>MANAGER</h2>
                                <div class="bg-option"></div>
                            </div>
                        </div>`
                : ""
            }

                    ${[ADMIN].includes(Number(permission_id))
                ? `<div class="sidebar-option main-option" tab="openning-event">
                            <div class="sidebar-option-top">
                                <i class="fas fa-server"></i>
                                <h2>Opening Event</h2>
                                <div class="bg-option"></div>
                            </div>
                        </div>`
                : ""
            }
                    
                    
        `;
    },
};
