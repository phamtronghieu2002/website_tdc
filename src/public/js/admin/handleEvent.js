


const splitUrlImage = (url) => {

  const keyword = "interface";
  const index = url.indexOf(keyword);

  if (index !== -1) {
    // Add the length of the keyword to the index to start after the keyword
    const result = url.substring(index + keyword.length + 1); // +1 to skip the '/'
    return result
  } else {

  }

}

const registerMarkDownSolution = () => {
  FilePond.registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginFileValidateSize,
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginMediaPreview

  );

  pond = FilePond.create(document.querySelector(".filepond"), {
    allowVideoPreview: true,
    allowAudioPreview: true,
    dropOnPage: true,
    dropOnElement: false,
    allowReorder: true,
    maxFiles: 20,
    maxParallelUploads: 10,
    labelIdle:
      'Kéo & thả ảnh của bạn hoặc <span class="filepond--label-action">Chọn Ảnh</span>',
  });

  tinymce.remove("#edit-content-solution");
  tools.config.tinymceInit("#edit-content-solution", "400");
  tinymce.remove("#edit-technum-solution");
  tools.config.tinymceInit("#edit-technum-solution", "400");


  tinymce.remove("#edit-content-en-solution");
  tools.config.tinymceInit("#edit-content-en-solution", "400");
  tinymce.remove("#edit-technum-en-solution");
  tools.config.tinymceInit("#edit-technum-en-solution", "400");
};
const refgisterImageSelectBox = () => {
  const plusImageItem = $$_(".plus-image-item");

  plusImageItem.forEach((plusImageItem, index) => {
    plusImageItem.onclick = (e) => {
      tools.displayOpacity("show", "Hình ảnh");
      tools.confirm(
        () => {
          const imageItem = $_('.image-item[is-selected="true"]');
          if (imageItem) {
            const url = imageItem.querySelector("img").src;
            console.log("url", url);
            plusImageItem.style.backgroundImage = `url('${url}')`;
            $_(".news-img-item").innerHTML = "";
            if (index == 0) {
              console.log("index", document.getElementById("banner-image-input"));
              document.getElementById("banner-image-input").setAttribute("value", url);
            } else {
              document.getElementById("thumbnail-image-input").setAttribute("value", url);
            }

          } else {

          }
          tools.displayOpacity("hidden");
        },
        components.imageTab(),
        "Chọn"
      );
    };
  });
}
const handleEvent = {
  handleAgentPage: function async() {
    const auth_token = localStorage.getItem("admin_token");
    const toast_duration = 3000;
    registerMarkDownSolution();
    if (agencysImages) {
      const createFileFromUrl = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const fileName = url.split("/").pop();
        return new File([blob], fileName, { type: blob.type });
      };
      // Thêm ảnh từ URL vào FilePond
      (async () => {
        agencysImages.forEach(async (url) => {
          const file = await createFileFromUrl(url);
          pond.addFile(file);
        });
      })();
    }
    // Đăng ký plugin

    const btn_save_agency = document.querySelector(".save-img-btn");
    btn_save_agency.addEventListener("click", async () => {

      const files = pond.getFiles();

      const formData = new FormData();

      files.forEach((fileItem) => {
        const file = fileItem.file;
        const fileSizeInBytes = file.size;
        // Thêm file vào formData
        formData.append("files", file);
      });
      try {
        tools.displayOpacity("show", `đang upload ảnh?`);
        const response = await axios.post(ADD_AGENCYS_API, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: "Bearer " + auth_token,
          },
        });
        window.location.reload();
        tools.displayOpacity("hidden");
        showToast(
          "Đã lưu",
          "success",
          "Lưu thành công Nhãn hàng hợp tác",
          toast_duration
        );
      } catch (error) {
        console.log("error", error);
      }
    });
  },
  handleSolutionMainPage: function () {


    refgisterImageSelectBox();
    const addSolutionBtn = $_(".add-solutions-btn");
    const solutionItems = $$_(".solution-item");
    const deleteSolutionBtn = $_(".delete-solutions-btn");
    const updateSolutionBtn = $_(".update-solutions-btn");
    const contentRight = $_(".wrapper-solution-page .content-right");
    addSolutionBtn.onclick = (e) => {
      render.solutionPageAddUI();

    };
    registerMarkDownSolution();
    solutionItems.forEach((solutionItem) => {
      solutionItem.onclick = function (e) {
        const solutionId = solutionItem.getAttribute("solution-id");

        const solutionItemTarget = dataSolutions.find(
          (solution) => Number(solution.id) === Number(solutionId)
        );
        const solutionImages = solutionItemTarget.images;
        solutionItems.forEach((solutionItem) => {
          solutionItem.classList.remove("active");
        });


        this.classList.add("active");
        contentRight.innerHTML =
          components.solutionPage.contentRight(solutionItemTarget);
        registerMarkDownSolution();
        refgisterImageSelectBox();

        const handleEvent = () => {

          if (solutionImages.length > 0) {
            const createFileFromUrl = async (url) => {
              const response = await fetch(url);
              const blob = await response.blob();
              const fileName = url.split("/").pop();
              return new File([blob], fileName, { type: blob.type });
            };
            // Thêm ảnh từ URL vào FilePond
            (async () => {
              solutionImages.forEach(async (url) => {
                const file = await createFileFromUrl(`/static/images/solutions/${url}`);
                pond.addFile(file);
              });
            })();
          }
        };
        handleEvent();
      };
    });
    deleteSolutionBtn.onclick = (e) => {
      const solutionItemActive = $_(".solution-item.active");
      if (!solutionItemActive) {
        return;
      }
      tools.displayOpacity("show", `Xác nhận xóa giải pháp này?`);
      tools.confirm(() => {
        const solutionId = solutionItemActive.getAttribute("solution-id");

        axios.delete(`/api/solutions/${solutionId}`).then((feedback) => {
          if (feedback.data.status === 1) {
            tools.displayOpacity("hidden");
            showToast(
              "Thành công",
              "success",
              "Đã xóa giải pháp",
              toast_duration
            );
            reloadBtn.click();
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
    }


    updateSolutionBtn.onclick = (e) => {

      tools.displayOpacity("show", `Xác nhận cập nhật giải pháp mới?`);
      tools.confirm(() => {

        const solutionItemActive = $_(".solution-item.active");
        if (!solutionItemActive) {
          return;
        }
        const solutionId = solutionItemActive.getAttribute("solution-id");
        const nameSolution = $_(".solution_input").value;
        const nameSolution_en = $_(".solution_name_en_input").value;
        const prioritySolution = $_(".solutions_select").value;
        const contentSolution = tinymce
          .get("edit-content-solution")
          .getContent();
        const technumSolution = tinymce
          .get("edit-technum-solution")
          .getContent();

          const contentSolution_en = tinymce
          .get("edit-content-en-solution")
          .getContent();
        const technumSolution_en = tinymce
          .get("edit-technum-en-solution")
          .getContent();
        const files = pond.getFiles();
        const images = [];
        files.forEach((fileItem) => {
          const file = fileItem.file;
          const fileSizeInBytes = file.size;
          images.push(file);
        });

        const body = new FormData();
        images.forEach((image) => {
          body.append("images", image);
        });
        const description = document.getElementById("description").value;
        const description_en = document.getElementById("description_en").value;
        const thumbnail = splitUrlImage(document.getElementById("thumbnail-image-input").value)
        const banner = splitUrlImage(document.getElementById("banner-image-input").value);
        const json = {
          name: nameSolution,
          priority: prioritySolution,
          content: contentSolution,
          technum: technumSolution,
          description: description,
          name_en: nameSolution_en,
          content_en: contentSolution_en,
          technum_en: technumSolution_en,
          description_en: description_en,
          thumbnail: thumbnail,
          banner: banner,
          id: solutionId
        };
        body.append("data", JSON.stringify(json));
        axios
          .put("/api/update-solutions", body)
          .then((response) => {
            tools.displayOpacity("hidden");
            showToast("Thành công", "success", "Đã cập nhật", toast_duration);
            reloadBtn.click();
          })
          .catch((error) => {
            console.log(error);
            tools.displayOpacity("hidden");
            showToast(
              "Có lỗi",
              "error",
              "Có lỗi khi cập nhật giải pháp mới",
              toast_duration
            );
          });
      });
    };
  },
  handleSolutionAddPage: function async() {
    //handle when click button add solutions

    registerMarkDownSolution();
    refgisterImageSelectBox();
    const saveSolutionBtn = $_(".save-solutions-btn");
    const cancelSolutionBtn = $_(".cancel-solutions-btn");

    saveSolutionBtn.onclick = (e) => {
      tools.displayOpacity("show", `Xác nhận thêm giải pháp mới?`);
      tools.confirm(() => {
        const nameSolution = $_(".solution_name_input").value;
        const nameSolution_en = $_(".solution_name_en_input").value;

        const prioritySolution = $_(".solutions_select").value;
        const contentSolution = tinymce
          .get("edit-content-solution")
          .getContent();
        const technumSolution = tinymce
          .get("edit-technum-solution")
          .getContent();

          const contentSolution_en = tinymce
          .get("edit-content-en-solution")
          .getContent();
        const technumSolution_en = tinymce
          .get("edit-technum-en-solution")
          .getContent();
        const files = pond.getFiles();
        const images = [];
        files.forEach((fileItem) => {
          const file = fileItem.file;
          const fileSizeInBytes = file.size;
          images.push(file);
        });
        const description = document.getElementById("description").value;
        const description_en = document.getElementById("description_en").value;

        const thumbnail = splitUrlImage(document.getElementById("thumbnail-image-input").value)
        const banner = splitUrlImage(document.getElementById("banner-image-input").value);

        const body = new FormData();
        images.forEach((image) => {
          body.append("images", image);
        });
        const json = {
          name: nameSolution,
          priority: prioritySolution,
          content: contentSolution,
          technum: technumSolution,
          description: description,
          name_en: nameSolution_en,
          content_en: contentSolution_en,
          technum_en: technumSolution_en,
          description_en: description_en,
          thumbnail: thumbnail,
          banner: banner
        };
        body.append("data", JSON.stringify(json));
        axios
          .post("/api/add-solutions", body)
          .then((response) => {
            tools.displayOpacity("hidden");
            showToast("Thành công", "success", "Đã thêm giải pháp", toast_duration);
            reloadBtn.click();
          })
          .catch((error) => {
            console.log(error);
            tools.displayOpacity("hidden");
            showToast(
              "Có lỗi",
              "error",
              "Có lỗi khi thêm giải pháp mới",
              toast_duration
            );
          });
      });
    };

    cancelSolutionBtn.onclick = (e) => {
      reloadBtn.click();
    };
  },

  imgClick: function () {
    allImage = $$_("img");
    if (allImage.length <= 1) {
      return;
    }
    allImage.forEach((img) => {
      img.onclick = (e) => {
        console.log("img-click");
      };
    });
  },

  wordProductPage: function (products, category) {
    tippy(".category-item-wrapper", {
      content: "Kéo thả để sắp xếp",
      placement: "top",
      // followCursor: true,
    });
    const mainWordproductsWrapper = $_(".main-wordproducts-wrapper");
    const categoryItemWrapper = $$_(".category-item-wrapper");
    const removeMask = () => {
      const allMask = $$_(".mask-element-item");
      if (allMask.length >= 1) {
        allMask.forEach((mask) => {
          mask.remove();
        });
      }
    };
    categoryItemWrapper.forEach((categoryItem) => {
      categoryItem.ondragstart = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
        // ev.target.classList.add('dragging');

        // var img = document.createElement('img');
        // img.src = 'http://kryogenix.org/images/hackergotchi-simpler.png';
        // ev.dataTransfer.setDragImage(img, 0, 0);
      };

      categoryItem.ondrop = (ev) => {
        ev.preventDefault();
        removeMask();
        const data = ev.dataTransfer.getData("text");
        tools.insertAfter(
          document.getElementById(data),
          ev.target.closest(".category-item-wrapper")
        );
        document.getElementById(data).classList.remove("dragging");
      };

      categoryItem.ondragenter = (ev) => {
        ev.preventDefault();

        const maskElement = document.createElement("div");
        removeMask();
        maskElement.classList.add("mask-element-item");
        // maskElement.classList.add('animate_height-show');
        maskElement.ondrop = (ev) => {
          ev.preventDefault();
          const data = ev.dataTransfer.getData("text");
          // console.log(data);
          mainWordproductsWrapper.insertBefore(
            document.getElementById(data),
            maskElement
          );
          document.getElementById(data).classList.remove("dragging");

          removeMask();
        };
        maskElement.ondragover = (ev) => {
          ev.preventDefault();
        };
        tools.insertAfter(
          maskElement,
          ev.target.closest(".category-item-wrapper")
        );
      };
      categoryItem.ondragover = (ev) => {
        ev.preventDefault();
      };
    });

    //handle Save
    const sortSaveBtn = $_(".sort-save-btn");
    sortSaveBtn.onclick = (e) => {
      tools.displayOpacity("show", "Xác nhận thay đổi");
      tools.confirm(() => {
        const allItem = $$_(".category-item-wrapper");
        const body = {};
        allItem.forEach((item, index) => {
          body[index + 1] = item.id;
        });
        // console.log(body);

        tools.postData(SORT_CATEGORY_API, body).then((feedback) => {
          if (feedback.data.status === 1) {
            tools.displayOpacity("hidden");
            showToast("Thành công", "success", "Đã cập nhật", toast_duration);
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
    };
  },
  contactsPage: function (contactsData) {
    const items = $$_(".contact-item-tab");
    const contactContent = $_(".contact-content-edit-content");

    items.forEach((item) => {
      item.onclick = (e) => {
        const id = item.getAttribute("contact-id");
        const contactItem = contactsData.find((dt) => dt.id == id);
        if (contactItem) {
          items.forEach((item) => {
            item.classList.remove("active");
          });
          item.classList.add("active");
          contactContent.innerHTML = components.contactDetailUI(contactItem);
        }
      };
    });
  },
  accManagePage: function (accountsData) {
    const changePasswordAdmin = $_(".change-password-admin");
    const changePassBtn = $_(".change-pass-btn");
    changePassBtn.onclick = (e) => {
      const inputRequired = $$_(".required-infor");
      let isValid = true;
      inputRequired.forEach((input) => {
        const value = input.value;
        if (value.length < 5 || !value) {
          isValid = false;
          input.classList.add("invalid");
          input.onfocus = (e) => {
            input.classList.remove("invalid");
          };
        }
      });
      const newPass = changePasswordAdmin.querySelector(
        '[data-name="newpass"]'
      );
      const reNewPass = changePasswordAdmin.querySelector(
        '[data-name="renewpass"]'
      );
      if (newPass.value != reNewPass.value) {
        isValid = false;
        newPass.classList.add("invalid");
        reNewPass.classList.add("invalid");
      } else {
        newPass.classList.remove("invalid");
        reNewPass.classList.remove("invalid");
      }

      if (!isValid) {
        return;
      }
      tools.displayOpacity("show", `Xác nhận đổi mật khẩu`);
      tools.confirm(() => {
        const body = {};
        const email = changePasswordAdmin.querySelector('[data-name="email"]');
        const oldPass = changePasswordAdmin.querySelector(
          '[data-name="oldpass"]'
        );
        const newPass = changePasswordAdmin.querySelector(
          '[data-name="newpass"]'
        );

        body.oldPass = oldPass.value;
        body.newPass = newPass.value;
        body.email = email.value;

        console.log(body);

        tools.postData(CHANGE_PASS_API, body).then((feedback) => {
          if (feedback.data.status === 1) {
            tools.displayOpacity("hidden");
            showToast(
              "Thành công",
              "success",
              "Mật khẩu đã được đổi, đăng xuất sau 3 giây!",
              toast_duration
            );
            setTimeout(() => {
              localStorage.removeItem("admin_token");
              window.location = LOGIN_PAGE;
            }, 3000);
            return;
          } else if (feedback.data.status === 2) {
            tools.displayOpacity("hidden");
            showToast(
              "Mật khẩu cũ không đúng!",
              "error",
              "Hm! Có vẻ như mật khẩu cũ không đúng!",
              toast_duration
            );
            return;
          } else {
            tools.displayOpacity("hidden");
            showToast("Có lỗi", "error", "Có lỗi khi thao tác", toast_duration);
          }
        });
        return 0;
      });
    };
  },
  addProductPage: function (products_, categoty) {
    const inputElements = $$_(".input-add-product");
    const guideArea = $_(".add-product-guide-layout");
    const addImageBtn = $_(".plus-image-item");
    let imgValid = true;

    //handle Add category
    const addCategoryBtn = $_(".add-pr-add-category-btn");
    addCategoryBtn.onclick = (e) => {
      tools.displayOpacity("show", `Thêm một danh mục mới`);
      tools.confirm(
        () => {
          const body = {};
          const inputElement = document.getElementById("update-value-input");
          const category_name = inputElement.value;
          if (!category_name) {
            // console.log(data);
            inputElement.classList.add("invalid");
            inputElement.onfocus = (e) => {
              inputElement.classList.remove("invalid");
            };

            return 1;
          }
          body.name = category_name;

          tools.postData(ADD_CATEGORY_API, body).then((feedback) => {
            if (feedback.data.status === 1) {
              tools.displayOpacity("hidden");
              showToast(
                "Thêm thành công",
                "success",
                "Danh mục đã được thêm",
                toast_duration
              );
              reloadBtn.click();
            } else {
              tools.displayOpacity("hidden");
              showToast(
                "Có lỗi",
                "error",
                "Có lỗi khi thao tác",
                toast_duration
              );
            }
          });
          return 0;
        },
        components.addCategoryUI(),
        "Thêm"
      );
      opacityChildren.style.minWidth = "30%";
      opacityChildren.querySelector("input").focus();
      tools.setEnterEvent(opacityChildren.querySelector("input"), () =>
        $_(".confirm-ui").children[1].click()
      );
    };
    //handle Guide
    inputElements.forEach((input) => {
      input.addEventListener("focus", () => {
        const dataName = input.getAttribute("data-name");
        const guideData = tools.handleNameGuide(dataName);
        guideArea.innerHTML = components.guideUI(guideData[0], guideData[1]);
      });

      input.addEventListener("input", () => {
        const dataName = input.getAttribute("data-name");
        if (dataName === "title") {
          const value = input.value || "Tên sản phẩm";
          $_(".product-content-name").innerHTML = value;
        }
        if (dataName === "price") {
          const value = nf.format(input.value) || "0 đ";
          $_(".product-content-price").innerHTML = value + " đ";
        }
      });
    });

    //handle add image
    const imgInput = $_("#add-product-image");
    addImageBtn.onclick = (e) => {
      guideArea.innerHTML = components.guideUI("Hình ảnh sản phẩm", imageGuide);
      // imgInput.click();
      addImageBtn.classList.remove("invalid");
      tools.displayOpacity("show", "Hình ảnh");
      tools.confirm(
        () => {
          const imageItem = $_('.image-item[is-selected="true"]');

          if (imageItem) {
            const url = imageItem.querySelector("img").src;
            const plusImageItem = $_(".set-image-item.plus-image-item");

            const imgBox = document.createElement("div");
            imgBox.classList.add("set-image-item");
            imgBox.classList.add("required-image-item");
            imgBox.style.backgroundImage = `url('${url}')`;

            imgBox.innerHTML = `<span class="delete-prooduct-img"><i class="close"></i></span>`;

            imgBox.querySelector(".delete-prooduct-img").onclick = (e) => {
              e.stopPropagation();
              imgBox.remove();
            };

            imgBox.onclick = (e) => {
              tools.displayOpacity("show", "Hình ảnh");
              tools.confirm(
                () => {
                  const imageItem = $_('.image-item[is-selected="true"]');

                  if (imageItem) {
                    const url = imageItem.querySelector("img").src;

                    imgBox.style.backgroundImage = `url('${url}')`;
                  }
                  tools.displayOpacity("hidden");
                },
                components.imageTab(),
                "Chọn"
              );
            };

            plusImageItem.parentElement.insertBefore(imgBox, plusImageItem);
          } else {
            // $_('.service-img-item').innerHTML = `
            // <div class="plus alt"></div>
            // <span>Thêm hình ảnh</span>`;
          }
          tools.displayOpacity("hidden");
        },
        components.imageTab(),
        "Chọn"
      );
    };
    // let objectUrl;
    // imgInput.onchange = (e) => {
    //     // console.log(objectUrl);
    //     if (objectUrl) {
    //         URL.revokeObjectURL(objectUrl);
    //     }
    //     if (!imgInput.value) {
    //         addImageBtn.style.backgroundImage = `url('')`;
    //         $_('.product-image-preview').src =
    //             'https://st.quantrimang.com/photos/image/2020/07/30/Hinh-Nen-Trang-10.jpg';

    //         addImageBtn.classList.remove('img-true');
    //         return;
    //     }

    //     //change image
    //     addImageBtn.classList.remove('invalid');
    //     // console.log(imgInput.files[0]);
    //     objectUrl = URL.createObjectURL($_('#add-product-image').files[0]);
    //     // addImageBtn.style.backgroundImage = '';
    //     addImageBtn.style.backgroundImage = `url('${URL.createObjectURL($_('#add-product-image').files[0])}')`;
    //     $_('.product-image-preview').src = URL.createObjectURL($_('#add-product-image').files[0]);

    //     addImageBtn.classList.remove('img-true');
    //     const plusAltWrapper = $_('.plus-alt-wrapper');
    //     plusAltWrapper.innerHTML = components.loader();

    //     //check img
    //     let img = new Image();
    //     img.src = objectUrl;
    //     img.onload = function () {
    //         addImageBtn.classList.add('img-true');
    //         plusAltWrapper.innerHTML = `
    //               <div class="plus alt"></div>
    //               <span>Thêm hình ảnh</span>
    //          `;

    //         if (this.width > 500 || this.height > 500) {
    //             imgValid = false;
    //             addImageBtn.classList.add('invalid');
    //             $_('.image-warning').classList.add('image-warning-show');
    //         } else {
    //             imgValid = true;
    //             addImageBtn.classList.remove('invalid');
    //             $_('.image-warning').classList.remove('image-warning-show');
    //         }
    //     };
    // };

    //handle submit
    const addProductBtns = $$_(".add-product-btn");
    addProductBtns.forEach((addProductBtn) => {
      addProductBtn.onclick = (e) => {
        const hidden = addProductBtn.getAttribute("h-data");
        const imgProducts = $$_(".required-image-item");
        // console.log(imgProducts);

        const inputRequire = $$_(".required-infor");
        let isValid = true;
        const warningText = [];
        const product_images = [];
        if (imgProducts.length == 0) {
          warningText.push(`<b>- Thiếu hình ảnh</b> </br>`);
          addImageBtn.classList.add("invalid");
          isValid = false;
        } else {
          imgProducts.forEach((img) => {
            product_images.push(
              img.style.backgroundImage.slice(4, -1).replace(/"/g, "")
            );
            // console.log(product_images.join('*'));
          });
        }
        inputRequire.forEach((input) => {
          if (!input.value) {
            warningText.push(
              `<b>- ${tools.handleNameGuide(input.getAttribute("data-name"))[0]
              }</b> </br>`
            );
            // if (input.type === 'file') {
            //     addImageBtn.classList.add('invalid');
            // }
            input.classList.add("invalid");
            isValid = false;
          }
          input.onfocus = (e) => {
            input.classList.remove("invalid");
          };
        });

        const category_id = addCategory.val();
        if (Number(category_id) === 0) {
          isValid = false;
          selectE.classList.add("invalid");
          selectE.addEventListener("click", (e) => {
            selectE.classList.remove("invalid");
          });
        }

        if (!isValid) {
          guideArea.innerHTML = components.guideUI(
            "Thiếu thông tin !",
            warningText.join("")
          );
          return;
        }

        tools.displayOpacity("show", `Xác nhận thêm sản phẩm mới?`);
        tools.confirm(() => {
          const inputAddProduct = $$_(".input-add-product");
          // const imagefile = $_('#add-product-image');
          const myContent = tinymce
            .get("add-product-description-all")
            .getContent();
          // const technique = tinymce.get('add-product-technique-all').getContent();
          const des = tinymce.get("add-product-description").getContent();
          // console.log(des);
          const body = {};
          // body.append('product_img', imagefile.files[0]);
          body.hidden = hidden;
          body.category_id = category_id;
          body.description_all = myContent;
          body.description = des;
          body.product_images = product_images.join("*");

          inputAddProduct.forEach((input) => {
            const key = input.getAttribute("data-name");
            body[key] = input.value;
          });
          // console.log(body);

          tools.postData(ADD_PRODUCT_API, body).then((feedback) => {
            if (feedback.data.status === 1) {
              tools.displayOpacity("hidden");
              showToast(
                "Thêm thành công",
                "success",
                "Sản phẩm đã được cập nhật",
                toast_duration
              );
              app.data.image.push({ url: feedback.data.imgUrl });
              render.productsPage().then((promise) => {
                // productLayout.scrollTop = productLayout.scrollHeight;
              });
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
      };
    });

    const addCategory = $("#add-category-input");
    addCategory.select2({
      placeholder: "Chọn danh mục",
    });
    const selectE = $_(".select2-selection.select2-selection--single");
    selectE.addEventListener("click", () => {
      guideArea.innerHTML = components.guideUI(
        "Danh mục sản phẩm",
        categoryGuide
      );
    });
  },
  newsPage: function (newsData) {
    const newsItem = $$_(".news-item");
    const newsContentEditContent = $_(".news-content-edit-content");
    newsItem.forEach((news) => {
      news.onclick = (e) => {
        //delete all class active service

        newsItem.forEach((news) => {
          news.classList.remove("active");
        });
        //add active class
        news.classList.add("active");

        const newID = news.getAttribute("news-id");
        const newTarget = newsData.find(
          (newData) => Number(newData.id) === Number(newID)
        );

        newsContentEditContent.innerHTML = components.newDetailUI(newTarget);

        $_(".hidden-news-btn").setAttribute("status", newTarget.hidden);

        $_(".hidden-news-btn").innerHTML = Number(newTarget.hidden)
          ? "Hiện bài"
          : "Ẩn bài";
        tinymce.remove("#news-content-input");
        tools.config.tinymceInit("#news-content-input", "600");
        handleEvent();
      };

      function handleEvent() {
        const plusImageItem = $_(".plus-image-item");
        plusImageItem.onclick = (e) => {
          tools.displayOpacity("show", "Hình ảnh");
          tools.confirm(
            () => {
              const imageItem = $_('.image-item[is-selected="true"]');
              if (imageItem) {
                const url = imageItem.querySelector("img").src;
                plusImageItem.style.backgroundImage = `url('${url}')`;
                $_(".news-img-item").innerHTML = "";
                document.getElementById("news-image-input").value = url;
              } else {
                // $_('.service-img-item').innerHTML = `
                // <div class="plus alt"></div>
                // <span>Thêm hình ảnh</span>`;
              }
              tools.displayOpacity("hidden");
            },
            components.imageTab(),
            "Chọn"
          );
        };
        //handle Save
        const saveServiceBtn = $_(".save-news-btn");
        saveServiceBtn.onclick = (e) => {
          let isValid = true;
          const requiredInfor = $$_(".required-infor");
          const newsContent = tinymce.get("news-content-input").getContent();
          const newsContentEN = tinymce.get("news-en-content-input").getContent();

          const tagsNewsData = tagsNews.val();
          const categoryNewsData = categoryNews.val();
          const featuredNewsData = featuredNews.val();
          const newsActive = $_(".news-item.active");
          if (!newsActive) {
            return;
          }
          const newsId = newsActive.getAttribute("news-id");
          const body = {};
          body.id = newsId;
          requiredInfor.forEach((input) => {
            const key = input.getAttribute("data-name");
            body[key] = input.value;
            if (!input.value) {
              input.classList.add("invalid");
              isValid = false;
            }
            input.onfocus = (e) => {
              input.classList.remove("invalid");
            };
          });
          // console.log(tagsNews);
          if (!tagsNewsData) {
            tagsNews[0].nextElementSibling.classList.add("invalid");
            tagsNews[0].nextElementSibling.onclick = (e) => {
              tagsNews[0].nextElementSibling.classList.remove("invalid");
            };
            isValid = false;
          }
          if (!newsContent || !categoryNewsData || !featuredNewsData) {
            isValid = false;
          }

          if (!isValid) {
            return;
          }
          body["content"] = newsContent;
          body["content_en"] = newsContentEN;
          body["tags"] = tagsNewsData.toString();
          body["is_blog"] = categoryNewsData;
          body["featured"] = featuredNewsData;
          // console.log(body);
          tools.displayOpacity("show", "Xác nhận thay đổi?");
          tools.confirm(() => {
            // console.log(body);
            tools.postData(UPDATE_NEWS_API, body).then((feedback) => {
              if (feedback.data.status === 1) {
                tools.displayOpacity("hidden");
                showToast(
                  "Thành công",
                  "success",
                  "Bài viết đã được cập nhật",
                  toast_duration
                );
                const newsTarget = newsData.find(
                  (news) => Number(news.id) === Number(newsId)
                );
                const keys = Object.keys(body);
                keys.forEach((key) => {
                  newsTarget[key] = body[key];
                });
                newsActive.children[0].innerHTML = body.title;
                newsActive.children[1].children[0].innerHTML = tools.handleTime(
                  body.date
                );
                newsActive.children[1].children[1].innerHTML = Number(
                  body.featured
                )
                  ? "(Nổi bật)"
                  : "";
              } else {
                tools.displayOpacity("hidden");
                showToast(
                  `Có lỗi`,
                  "error",
                  `Mã lỗi: <b> UNx0${feedback.data.status}</b>`,
                  toast_duration
                );
              }
            });
          });
        };
        //handle Hidden
        const hiddenNewsBtn = $_(".hidden-news-btn");
        hiddenNewsBtn.onclick = (e) => {
          const newsActive = $_(".news-item.active");
          if (!newsActive) {
            return;
          }
          const newsId = newsActive.getAttribute("news-id");
          let hiddenStatus = hiddenNewsBtn.getAttribute("status");
          if (Number(hiddenStatus)) {
            hiddenStatus = 0;
          } else {
            hiddenStatus = 1;
          }
          const newsTarget = newsData.find(
            (news) => Number(news.id) === Number(newsId)
          );
          tools.displayOpacity(
            "show",
            `Xác nhận ${hiddenStatus ? "ẩn" : "hiển thị"} bài đăng này?`
          );
          tools.confirm(() => {
            const body = {};
            body.id = newsId;
            body.hidden = hiddenStatus;
            // console.log(body);
            tools.postData(UPDATE_NEWS_API, body).then((feedback) => {
              if (feedback.data.status === 1) {
                tools.displayOpacity("hidden");
                showToast(
                  "Thành công",
                  "success",
                  `Bài viết đã được ${hiddenStatus ? "ẩn" : "hiển thị"}`,
                  toast_duration
                );
                const keys = Object.keys(body);
                keys.forEach((key) => {
                  newsTarget[key] = body[key];
                });
                $_(".hidden-news-btn").setAttribute(
                  "status",
                  newsTarget.hidden
                );
                $_(".hidden-news-btn").innerHTML = Number(newsTarget.hidden)
                  ? "Hiện bài"
                  : "Ẩn bài";
              } else {
                tools.displayOpacity("hidden");
                showToast(
                  `Có lỗi`,
                  "error",
                  `Mã lỗi: <b> UNx0${feedback.data.status}</b>`,
                  toast_duration
                );
              }
            });
          }, `Lưu ý: Bài viết sẽ ngay lập tức được ${hiddenStatus ? "ẩn" : "hiện thị"} trên trang tin tức`);
        };
        // handle Delete
        const deleteServideBtn = $_(".delete-news-btn");
        deleteServideBtn.onclick = (e) => {
          // console.log('ok');
          const newsActive = $_(".news-item.active");
          if (!newsActive) {
            return;
          }
          const newsId = newsActive.getAttribute("news-id");
          const newsTarget = newsData.find(
            (news) => Number(news.id) === Number(newsId)
          );
          tools.displayOpacity("show", `Xác nhận xoá bài viết này?`);
          tools.confirm(() => {
            const body = {};
            body.id = newsId;
            body.is_deleted = 1;
            // console.log(body);
            tools.postData(UPDATE_NEWS_API, body).then((feedback) => {
              if (feedback.data.status === 1) {
                tools.displayOpacity("hidden");
                showToast(
                  "Thành công",
                  "success",
                  "Bài viết đã được xoá",
                  toast_duration
                );
                reloadBtn.click();
              } else {
                tools.displayOpacity("hidden");
                showToast(
                  `Có lỗi`,
                  "error",
                  `Mã lỗi: <b> UNx0${feedback.data.status}</b>`,
                  toast_duration
                );
              }
            });
          }, `Lưu ý: Bài viết bị xoá sẽ không được khôi phục lại bằng trang admin`);
        };
        // // handle add news
        const addServiceBtn = $_(".add-news-btn");
        addServiceBtn.onclick = (e) => {
          mainContent.innerHTML = components.addNewPage();
          const cancelAddServiceBtn = $_(".cancel-add-news-btn");
          //handle cancel
          cancelAddServiceBtn.onclick = (e) => {
            reloadBtn.click();
          };
          //handle add Image
          const plusImageItem = $_(".plus-image-item");
          plusImageItem.onclick = (e) => {
            tools.displayOpacity("show", "Hình ảnh");
            tools.confirm(
              () => {
                const imageItem = $_('.image-item[is-selected="true"]');
                if (imageItem) {
                  const url = imageItem.querySelector("img").src;
                  plusImageItem.style.backgroundImage = `url('${url}')`;
                  $_(".news-img-item").innerHTML = "";
                  document.getElementById("news-image-input").value = url;
                } else {
                }
                tools.displayOpacity("hidden");
              },
              components.imageTab(),
              "Chọn"
            );
          };
          //handle Save
          const saveAction = $$_(".save-action");
          saveAction.forEach((saveBtn) => {
            saveBtn.onclick = (e) => {
              if (saveBtn.className.includes("save-show-news-btn")) {
                saveService(0);
              }
              if (saveBtn.className.includes("save-hidden-news-btn")) {
                saveService(1);
              }
            };
          });
          function saveService(action) {
            // console.log(action);
            const hidden = action;
            // return;
            let isValid = true;
            const requiredInfor = $$_(".required-infor");
            const newsContent = tinymce.get("news-content-input").getContent();
            const newsContent_en = tinymce.get("news-en-content-input").getContent();
            const tagsNewsData = tagsNews.val();
            const categoryNewsData = categoryNews.val();
            const featuredNewsData = featuredNews.val();
            const newsActive = $_(".news-item.active");
            if (!newsActive) {
              return;
            }
            const newsId = newsActive.getAttribute("news-id");
            const body = {};
            body.id = newsId;
            requiredInfor.forEach((input) => {
              const key = input.getAttribute("data-name");
              body[key] = input.value;
              if (!input.value) {
                input.classList.add("invalid");
                isValid = false;
              }
              input.onfocus = (e) => {
                input.classList.remove("invalid");
              };
            });
            if (!tagsNewsData) {
              tagsNews[0].nextElementSibling.classList.add("invalid");
              tagsNews[0].nextElementSibling.onclick = (e) => {
                tagsNews[0].nextElementSibling.classList.remove("invalid");
              };
              isValid = false;
            }
            if (!newsContent || !categoryNewsData || !featuredNewsData) {
              isValid = false;
            }
            if (!isValid) {
              return;
            }
            body["content"] = newsContent;

            body["content_en"] = newsContent_en;

            body["hidden"] = hidden;
            body["tags"] = tagsNewsData.toString();
            body["is_blog"] = categoryNewsData;
            body["featured"] = featuredNewsData;
            console.log(body);
            tools.displayOpacity(
              "show",
              `Xác nhận thêm và ${hidden ? "ẩn" : "hiện"} bài viết?`
            );

            tools.confirm(async () => {
              tools.postData(ADD_NEWS_API, body).then(async (feedback) => {
                const slug = feedback.data.slug;
                body["slug"] = slug;
                if (feedback.data.status === 1) {
                  tools.displayOpacity("hidden");





                  try {


                    const res = await axios.post("/api/sendMail", body)
                    console.log("res >>>", res);
                    showToast(
                      "Thành công",
                      "success",
                      `Đã thêm và ${hidden ? "ẩn" : "hiện"} một bài viết mới`,
                      toast_duration
                    );




                    reloadBtn.click();
                  } catch (error) {
                    showToast(
                      "Thất bại khi gửi mail cho khách",
                      "fail",

                      toast_duration
                    );

                  }
                } else {
                  tools.displayOpacity("hidden");
                  showToast(
                    `Có lỗi`,
                    "error",
                    `Mã lỗi: <b> UDVx0${feedback.data.status}</b>`,
                    toast_duration
                  );
                }
              });
            });
          }
          tinymce.remove("#news-content-input");
          tools.config.tinymceInit("#news-content-input", "1200");

          tinymce.remove("#news-en-content-input");
          tools.config.tinymceInit("#news-en-content-input", "1200");

          const tagsNews = $("#tags-news");
          const categoryNews = $("#category-news");
          const featuredNews = $("#featured-news");
          tagsNews.select2({
            placeholder: "Chọn tags",
          });
          categoryNews.select2({
            placeholder: "Chọn phân loại",
          });
          featuredNews.select2({
            placeholder: "Chọn nổi bật",
          });
        };
        tinymce.remove("#news-content-input");
        tinymce.remove("#news-en-content-input");
        tools.config.tinymceInit("#news-content-input", "1200");
        tools.config.tinymceInit("#news-en-content-input", "1200");
        const tagsNews = $("#tags-news");
        const categoryNews = $("#category-news");
        const featuredNews = $("#featured-news");
        tagsNews.select2({
          placeholder: "Chọn tags",
        });
        categoryNews.select2({
          placeholder: "Chọn phân loại",
        });
        featuredNews.select2({
          placeholder: "Chọn nổi bật",
        });
      }

      handleEvent();
    });
  },

  policysPage: function (newsData) {
    const newsItem = $$_(".news-item");
    const newsContentEditContent = $_(".news-content-edit-content");
    // // handle add news
    const addServiceBtn = $_(".add-news-btn");

    addServiceBtn.onclick = (e) => {
      mainContent.innerHTML = components.addPolicysPage();
      const cancelAddServiceBtn = $_(".cancel-add-news-btn");
      //handle cancel
      cancelAddServiceBtn.onclick = (e) => {
        reloadBtn.click();
      };
      //handle add Image

      //handle Save
      const saveAction = $_(".save-action");

      saveAction.onclick = (e) => {
        saveService();
      };

      function saveService() {
        // console.log(action);

        let isValid = true;
        const requiredInfor = $$_(".required-infor");
        const newsContent = tinymce.get("news-content-input").getContent();
        const newsENContent = tinymce.get("news-en-content-input").getContent();

        const tagsNewsData = tagsNews.val();

        const body = {};

        requiredInfor.forEach((input) => {
          const key = input.getAttribute("data-name");
          body[key] = input.value;
          if (!input.value) {
            input.classList.add("invalid");
            isValid = false;
          }
          input.onfocus = (e) => {
            input.classList.remove("invalid");
          };
        });

        if (!newsContent) {
          isValid = false;
        }
        if (!isValid) {
          return;
        }
        body["content"] = newsContent;
        body["content_en"] = newsENContent;

        console.log(body);
        tools.displayOpacity("show", `Xác nhận thêm chính sách?`);
        tools.confirm(() => {
          tools.postData(ADD_POLICYS_API, body).then((feedback) => {
            if (feedback.data.status === 1) {
              tools.displayOpacity("hidden");
              showToast(
                "Thành công",
                "success",
                `Đã thêm chính sách mới`,
                toast_duration
              );
              reloadBtn.click();
            } else {
              tools.displayOpacity("hidden");
              showToast(
                `Có lỗi`,
                "error",
                `Mã lỗi: <b> UDVx0${feedback.data.status}</b>`,
                toast_duration
              );
            }
          });
        });
      }
      tinymce.remove("#news-content-input");
      tinymce.remove("#news-en-content-input");
      tools.config.tinymceInit("#news-content-input", "1200");
      tools.config.tinymceInit("#news-en-content-input", "1200");
      const tagsNews = $("#tags-news");
      const categoryNews = $("#category-news");
      const featuredNews = $("#featured-news");
      tagsNews.select2({
        placeholder: "Chọn tags",
      });
      categoryNews.select2({
        placeholder: "Chọn phân loại",
      });
      featuredNews.select2({
        placeholder: "Chọn nổi bật",
      });
    };
    newsItem.forEach((news) => {
      news.onclick = (e) => {
        //delete all class active service

        newsItem.forEach((news) => {
          news.classList.remove("active");
        });
        //add active class
        news.classList.add("active");

        const newID = news.getAttribute("news-id");
        const newTarget = newsData.find(
          (newData) => Number(newData.id) === Number(newID)
        );

        newsContentEditContent.innerHTML =
          components.policysContentUI(newTarget);

        tinymce.remove("#news-content-input");
        tools.config.tinymceInit("#news-content-input", "600");
        handleEvent();
      };

      function handleEvent() {
        //handle Save
        const saveServiceBtn = $_(".save-news-btn");
        saveServiceBtn.onclick = (e) => {
          let isValid = true;
          const requiredInfor = $$_(".required-infor");
          const newsContent = tinymce.get("news-content-input").getContent();
          const newsContentEN = tinymce.get("news-en-content-input").getContent();

          const newsActive = $_(".news-item.active");
          if (!newsActive) {
            return;
          }
          const newsId = newsActive.getAttribute("news-id");
          const body = {};
          body.id = newsId;
          requiredInfor.forEach((input) => {
            const key = input.getAttribute("data-name");
            body[key] = input.value;
            if (!input.value) {
              input.classList.add("invalid");
              isValid = false;
            }
            input.onfocus = (e) => {
              input.classList.remove("invalid");
            };
          });
          // console.log(tagsNews);

          if (!newsContent) {
            isValid = false;
          }

          if (!isValid) {
            return;
          }
          body["content"] = newsContent;
          body["content_en"] = newsContentEN;

          console.log(body);
          tools.displayOpacity("show", "Xác nhận thay đổi?");
          tools.confirm(() => {
            // console.log(body);
            tools.postData(UPDATE_POLICYS_API, body).then((feedback) => {
              if (feedback.data.status === 1) {
                tools.displayOpacity("hidden");
                showToast(
                  "Thành công",
                  "success",
                  "Chính sách đã được cập nhật",
                  toast_duration
                );
                const newsTarget = newsData.find(
                  (news) => Number(news.id) === Number(newsId)
                );
                const keys = Object.keys(body);
                keys.forEach((key) => {
                  newsTarget[key] = body[key];
                });
                newsActive.children[0].innerHTML = body.title;
              } else {
                tools.displayOpacity("hidden");
                showToast(
                  `Có lỗi`,
                  "error",
                  `Mã lỗi: <b> UNx0${feedback.data.status}</b>`,
                  toast_duration
                );
              }
            });
          });
        };

        // handle Delete
        const deleteServideBtn = $_(".delete-news-btn");
        deleteServideBtn.onclick = (e) => {
          // console.log('ok');
          const newsActive = $_(".news-item.active");
          if (!newsActive) {
            return;
          }
          const newsId = newsActive.getAttribute("news-id");
          const newsTarget = newsData.find(
            (news) => Number(news.id) === Number(newsId)
          );
          tools.displayOpacity("show", `Xác nhận xoá chính sách này?`);
          tools.confirm(() => {
            const body = {};
            body.id = newsId;
            body.is_deleted = 1;
            // console.log(body);
            tools.postData(UPDATE_POLICYS_API, body).then((feedback) => {
              if (feedback.data.status === 1) {
                tools.displayOpacity("hidden");
                showToast(
                  "Thành công",
                  "success",
                  "Chính sách đã được xoá",
                  toast_duration
                );
                reloadBtn.click();
              } else {
                tools.displayOpacity("hidden");
                showToast(
                  `Có lỗi`,
                  "error",
                  `Mã lỗi: <b> UNx0${feedback.data.status}</b>`,
                  toast_duration
                );
              }
            });
          }, `Lưu ý: Chính sách bị xoá sẽ không được khôi phục lại bằng trang admin`);
        };

        tinymce.remove("#news-content-input");
        tools.config.tinymceInit("#news-content-input", "1200");
        tinymce.remove("#news-en-content-input");
        tools.config.tinymceInit("#news-en-content-input", "1200");
        const tagsNews = $("#tags-news");
        const categoryNews = $("#category-news");
        const featuredNews = $("#featured-news");
        tagsNews.select2({
          placeholder: "Chọn tags",
        });
        categoryNews.select2({
          placeholder: "Chọn phân loại",
        });
        featuredNews.select2({
          placeholder: "Chọn nổi bật",
        });
      }

      handleEvent();
    });
  },
  cvRecruitmentsPage: function (cvData) {
    const newsItem = $$_(".news-item");
    const newsContentEditContent = $_(".news-content-edit-content");
    newsItem.forEach((news) => {
      news.onclick = (e) => {
        //delete all class active service

        newsItem.forEach((news) => {
          news.classList.remove("active");
        });
        //add active class
        news.classList.add("active");

        const cvID = news.getAttribute("news-id");
        const newTarget = cvData.find((cv) => Number(cv.id) === Number(cvID));

        newsContentEditContent.innerHTML =
          components.cvRecruitmentsDetailUI(newTarget);
      };
    });
  },
  recruitmentsPage: function (newsData) {
    const newsItem = $$_(".news-item");
    const newsContentEditContent = $_(".news-content-edit-content");

    const addServiceBtn = $_(".add-news-btn");
    addServiceBtn.onclick = (e) => {
      mainContent.innerHTML = components.addRecruitmentsPage();
      const cancelAddServiceBtn = $_(".cancel-add-news-btn");
      //handle cancel
      cancelAddServiceBtn.onclick = (e) => {
        reloadBtn.click();
      };
      //handle add Image
      const plusImageItem = $_(".plus-image-item");
      plusImageItem.onclick = (e) => {
        tools.displayOpacity("show", "Hình ảnh");
        tools.confirm(
          () => {
            const imageItem = $_('.image-item[is-selected="true"]');
            if (imageItem) {
              const url = imageItem.querySelector("img").src;
              plusImageItem.style.backgroundImage = `url('${url}')`;
              $_(".news-img-item").innerHTML = "";
              document.getElementById("news-image-input").value = url;
            } else {
            }
            tools.displayOpacity("hidden");
          },
          components.imageTab(),
          "Chọn"
        );
      };
      //handle Save
      const saveAction = $$_(".save-action");
      saveAction.forEach((saveBtn) => {
        saveBtn.onclick = (e) => {
          if (saveBtn.className.includes("save-show-news-btn")) {
            saveService(0);
          }
          if (saveBtn.className.includes("save-hidden-news-btn")) {
            saveService(1);
          }
        };
      });
      function saveService(action) {
        // console.log(action);
        const hidden = action;
        // return;
        let isValid = true;
        const requiredInfor = $$_(".required-infor");
        const newsContent = tinymce.get("news-content-input").getContent();
        const tagsNewsData = tagsNews.val();
        const categoryNewsData = categoryNews.val();
        const featuredNewsData = featuredNews.val();
        const newsActive = $_(".news-item.active");
        if (!newsActive) {
          return;
        }
        const newsId = newsActive.getAttribute("news-id");
        const body = {};
        body.id = newsId;
        requiredInfor.forEach((input) => {
          const key = input.getAttribute("data-name");
          body[key] = input.value;
          if (!input.value) {
            input.classList.add("invalid");
            isValid = false;
          }
          input.onfocus = (e) => {
            input.classList.remove("invalid");
          };
        });

        if (!newsContent) {
          isValid = false;
        }
        if (!isValid) {
          return;
        }
        body["content"] = newsContent;
        body["hidden"] = hidden;
        // body['tags'] = tagsNewsData.toString();
        // body['is_blog'] = categoryNewsData;
        // body['featured'] = featuredNewsData;
        // console.log(body);
        tools.displayOpacity(
          "show",
          `Xác nhận thêm và ${hidden ? "ẩn" : "hiện"} bài viết?`
        );
        tools.confirm(() => {
          tools.postData(ADD_RECRUITMENT_API, body).then((feedback) => {
            if (feedback.data.status === 1) {
              tools.displayOpacity("hidden");
              showToast(
                "Thành công",
                "success",
                `Đã thêm và ${hidden ? "ẩn" : "hiện"} một bài viết mới`,
                toast_duration
              );
              reloadBtn.click();
            } else {
              tools.displayOpacity("hidden");
              showToast(
                `Có lỗi`,
                "error",
                `Mã lỗi: <b> UDVx0${feedback.data.status}</b>`,
                toast_duration
              );
            }
          });
        });
      }
      tinymce.remove("#news-content-input");
      tools.config.tinymceInit("#news-content-input", "1200");
      tinymce.remove("#news-en-content-input");
      tools.config.tinymceInit("#news-en-content-input", "1200");
      const tagsNews = $("#tags-news");
      const categoryNews = $("#category-news");
      const featuredNews = $("#featured-news");
      tagsNews.select2({
        placeholder: "Chọn tags",
      });
      categoryNews.select2({
        placeholder: "Chọn phân loại",
      });
      featuredNews.select2({
        placeholder: "Chọn nổi bật",
      });
    };
    newsItem.forEach((news) => {
      news.onclick = (e) => {
        //delete all class active service

        newsItem.forEach((news) => {
          news.classList.remove("active");
        });
        //add active class
        news.classList.add("active");

        const newID = news.getAttribute("news-id");
        const newTarget = newsData.find(
          (newData) => Number(newData.id) === Number(newID)
        );

        newsContentEditContent.innerHTML =
          components.recruitmentsDetailUI(newTarget);

        $_(".hidden-news-btn").setAttribute("status", newTarget.hidden);

        $_(".hidden-news-btn").innerHTML = Number(newTarget.hidden)
          ? "Hiện bài"
          : "Ẩn bài";

        tinymce.remove("#news-content-input");
        tools.config.tinymceInit("#news-content-input", "600");
        handleEvent();
      };

      function handleEvent() {
        const plusImageItem = $_(".plus-image-item");
        plusImageItem.onclick = (e) => {
          tools.displayOpacity("show", "Hình ảnh");
          tools.confirm(
            () => {
              const imageItem = $_('.image-item[is-selected="true"]');
              if (imageItem) {
                const url = imageItem.querySelector("img").src;
                plusImageItem.style.backgroundImage = `url('${url}')`;
                $_(".news-img-item").innerHTML = "";
                document.getElementById("news-image-input").value = url;
              } else {
                // $_('.service-img-item').innerHTML = `
                // <div class="plus alt"></div>
                // <span>Thêm hình ảnh</span>`;
              }
              tools.displayOpacity("hidden");
            },
            components.imageTab(),
            "Chọn"
          );
        };
        //handle Save
        const saveServiceBtn = $_(".save-news-btn");
        saveServiceBtn.onclick = (e) => {
          let isValid = true;
          const requiredInfor = $$_(".required-infor");
          const newsContent = tinymce.get("news-content-input").getContent();
          const tagsNewsData = tagsNews.val();
          const categoryNewsData = categoryNews.val();
          const featuredNewsData = featuredNews.val();
          const newsActive = $_(".news-item.active");
          if (!newsActive) {
            return;
          }
          const newsId = newsActive.getAttribute("news-id");
          const body = {};
          body.id = newsId;
          requiredInfor.forEach((input) => {
            const key = input.getAttribute("data-name");
            body[key] = input.value;
            if (!input.value) {
              input.classList.add("invalid");
              isValid = false;
            }
            input.onfocus = (e) => {
              input.classList.remove("invalid");
            };
          });
          // console.log(tagsNews);

          if (!newsContent) {
            isValid = false;
          }

          if (!isValid) {
            return;
          }
          body["content"] = newsContent;
          // body['tags'] = tagsNewsData.toString();
          // body['is_blog'] = categoryNewsData;
          // body['featured'] = featuredNewsData;
          // console.log(body);
          tools.displayOpacity("show", "Xác nhận thay đổi?");
          tools.confirm(() => {
            // console.log(body);
            tools.postData(UPDATE_RECRUITMENT_API, body).then((feedback) => {
              if (feedback.data.status === 1) {
                tools.displayOpacity("hidden");
                showToast(
                  "Thành công",
                  "success",
                  "Bài viết đã được cập nhật",
                  toast_duration
                );
                const newsTarget = newsData.find(
                  (news) => Number(news.id) === Number(newsId)
                );
                const keys = Object.keys(body);
                keys.forEach((key) => {
                  newsTarget[key] = body[key];
                });
                newsActive.children[0].innerHTML = body.title;
                newsActive.children[1].children[0].innerHTML =
                  tools.handleTime(body.date) +
                  " đến " +
                  tools.handleTime(body.expiration_date);
              } else {
                tools.displayOpacity("hidden");
                showToast(
                  `Có lỗi`,
                  "error",
                  `Mã lỗi: <b> UNx0${feedback.data.status}</b>`,
                  toast_duration
                );
              }
            });
          });
        };
        //handle Hidden
        const hiddenNewsBtn = $_(".hidden-news-btn");
        hiddenNewsBtn.onclick = (e) => {
          const newsActive = $_(".news-item.active");
          if (!newsActive) {
            return;
          }
          const newsId = newsActive.getAttribute("news-id");
          let hiddenStatus = hiddenNewsBtn.getAttribute("status");
          if (Number(hiddenStatus)) {
            hiddenStatus = 0;
          } else {
            hiddenStatus = 1;
          }
          const newsTarget = newsData.find(
            (news) => Number(news.id) === Number(newsId)
          );
          tools.displayOpacity(
            "show",
            `Xác nhận ${hiddenStatus ? "ẩn" : "hiển thị"} bài đăng này?`
          );
          tools.confirm(() => {
            const body = {};
            body.id = newsId;
            body.hidden = hiddenStatus;
            // console.log(body);
            tools.postData(UPDATE_RECRUITMENT_API, body).then((feedback) => {
              if (feedback.data.status === 1) {
                tools.displayOpacity("hidden");
                showToast(
                  "Thành công",
                  "success",
                  `Bài viết đã được ${hiddenStatus ? "ẩn" : "hiển thị"}`,
                  toast_duration
                );
                const keys = Object.keys(body);
                keys.forEach((key) => {
                  newsTarget[key] = body[key];
                });
                $_(".hidden-news-btn").setAttribute(
                  "status",
                  newsTarget.hidden
                );
                $_(".hidden-news-btn").innerHTML = Number(newsTarget.hidden)
                  ? "Hiện bài"
                  : "Ẩn bài";
              } else {
                tools.displayOpacity("hidden");
                showToast(
                  `Có lỗi`,
                  "error",
                  `Mã lỗi: <b> UNx0${feedback.data.status}</b>`,
                  toast_duration
                );
              }
            });
          }, `Lưu ý: Bài viết sẽ ngay lập tức được ${hiddenStatus ? "ẩn" : "hiện thị"} trên trang tuyển dụng`);
        };
        // handle Delete
        const deleteServideBtn = $_(".delete-news-btn");
        deleteServideBtn.onclick = (e) => {
          // console.log('ok');
          const newsActive = $_(".news-item.active");
          if (!newsActive) {
            return;
          }
          const newsId = newsActive.getAttribute("news-id");
          const newsTarget = newsData.find(
            (news) => Number(news.id) === Number(newsId)
          );
          tools.displayOpacity("show", `Xác nhận xoá bài viết này?`);
          tools.confirm(() => {
            const body = {};
            body.id = newsId;
            body.deleted = 0;
            // console.log(body);
            tools.postData(UPDATE_RECRUITMENT_API, body).then((feedback) => {
              if (feedback.data.status === 1) {
                tools.displayOpacity("hidden");
                showToast(
                  "Thành công",
                  "success",
                  "Bài viết đã được xoá",
                  toast_duration
                );
                reloadBtn.click();
              } else {
                tools.displayOpacity("hidden");
                showToast(
                  `Có lỗi`,
                  "error",
                  `Mã lỗi: <b> UNx0${feedback.data.status}</b>`,
                  toast_duration
                );
              }
            });
          }, `Lưu ý: Bài viết bị xoá sẽ không được khôi phục lại bằng trang admin`);
        };
        // // handle add news

        tinymce.remove("#news-content-input");
        tools.config.tinymceInit("#news-content-input", "1200");
        tinymce.remove("#news-en-content-input");
        tools.config.tinymceInit("#news-en-content-input", "1200");
        const tagsNews = $("#tags-news");
        const categoryNews = $("#category-news");
        const featuredNews = $("#featured-news");
        tagsNews.select2({
          placeholder: "Chọn tags",
        });
        categoryNews.select2({
          placeholder: "Chọn phân loại",
        });
        featuredNews.select2({
          placeholder: "Chọn nổi bật",
        });
      }

      handleEvent();
    });
  },
  seoPage: function (seoData) {
    const plusImageItem = $_(".plus-image-item");
    plusImageItem.onclick = (e) => {
      tools.displayOpacity("show", "Hình ảnh");
      tools.confirm(
        () => {
          const imageItem = $_('.image-item[is-selected="true"]');

          if (imageItem) {
            const url = imageItem.querySelector("img").src;
            plusImageItem.style.backgroundImage = `url('${url}')`;
            $_(".service-img-item").innerHTML = "";
            document.getElementById("service-image-input").value = url;
          } else {
            // $_('.service-img-item').innerHTML = `
            // <div class="plus alt"></div>
            // <span>Thêm hình ảnh</span>`;
          }
          tools.displayOpacity("hidden");
        },
        components.imageTab(),
        "Chọn"
      );
    };

    //handle Save
    const saveServiceBtn = $_(".save-seo-infor-btn");
    saveServiceBtn.onclick = (e) => {
      // console.log(body);
      const requiredInfor = $$_(".required-infor");
      const body = {};
      requiredInfor.forEach((infor) => {
        const keyName = infor.getAttribute("data-name");
        body[keyName] = infor.value;
      });
      // console.log(body);
      // return;
      tools.displayOpacity("show", "Xác nhận thay đổi?");
      tools.confirm(() => {
        tools.postData(SEO_UPDATE_API, body).then((feedback) => {
          if (feedback.data.status === 1) {
            tools.displayOpacity("hidden");
            showToast("Thành công", "success", "Đã cập nhật", toast_duration);
            reloadBtn.click();
          } else {
            tools.displayOpacity("hidden");
            showToast(
              `Có lỗi`,
              "error",
              `Mã lỗi: <b> UDVx0${feedback.data.status}</b>`,
              toast_duration
            );
          }
        });
      });
    };

    const saveScriptBtn = $_(".save-script-infor-btn");
    saveScriptBtn.onclick = (e) => {
      // console.log(body);
      const requiredInfor = $$_(".required-infor-script");
      const body = {};
      requiredInfor.forEach((infor) => {
        const keyName = infor.getAttribute("data-name");
        body[keyName] = infor.value;
      });
      // console.log(body);
      // return;
      tools.displayOpacity("show", "Xác nhận thay đổi?");
      tools.confirm(() => {
        tools.postData(SEO_UPDATE_API, body).then((feedback) => {
          if (feedback.data.status === 1) {
            tools.displayOpacity("hidden");
            showToast("Thành công", "success", "Đã cập nhật", toast_duration);
            reloadBtn.click();
          } else {
            tools.displayOpacity("hidden");
            showToast(
              `Có lỗi`,
              "error",
              `Mã lỗi: <b> UDVx0${feedback.data.status}</b>`,
              toast_duration
            );
          }
        });
      });
    };
  },
  servicePage: function (serviceData) {
    const serviceItem = $$_(".service-item");
    const serviceContentEditContent = $_(".service-content-edit-content");
    serviceItem.forEach((service) => {
      service.onclick = (e) => {
        //delete all class active service

        serviceItem.forEach((service) => {
          service.classList.remove("active");
        });
        //add active class
        service.classList.add("active");

        const serviceID = service.getAttribute("service-id");
        const serviceTarget = serviceData.find(
          (service) => Number(service.id) === Number(serviceID)
        );

        serviceContentEditContent.innerHTML =
          components.serviceDetailUI(serviceTarget);

        $_(".hidden-service-btn").setAttribute("status", serviceTarget.hidden);

        $_(".hidden-service-btn").innerHTML = Number(serviceTarget.hidden)
          ? "Hiện dịch vụ"
          : "Ẩn dịch vụ";

        tinymce.remove("#service-content-input");
        tools.config.tinymceInit("#service-content-input", "600");
        handleEvent();
      };

      function handleEvent() {
        const plusImageItem = $_(".plus-image-item");
        plusImageItem.onclick = (e) => {
          tools.displayOpacity("show", "Hình ảnh");
          tools.confirm(
            () => {
              const imageItem = $_('.image-item[is-selected="true"]');

              if (imageItem) {
                const url = imageItem.querySelector("img").src;
                plusImageItem.style.backgroundImage = `url('${url}')`;
                $_(".service-img-item").innerHTML = "";
                document.getElementById("service-image-input").value = url;
              } else {
                // $_('.service-img-item').innerHTML = `
                // <div class="plus alt"></div>
                // <span>Thêm hình ảnh</span>`;
              }
              tools.displayOpacity("hidden");
            },
            components.imageTab(),
            "Chọn"
          );
        };

        //handle Save
        const saveServiceBtn = $_(".save-service-btn");
        saveServiceBtn.onclick = (e) => {
          let isValid = true;
          const requiredInfor = $$_(".required-infor");
          const serviceContent = tinymce
            .get("service-content-input")
            .getContent();

          const serviceActive = $_(".service-item.active");
          if (!serviceActive) {
            return;
          }

          const serviceId = serviceActive.getAttribute("service-id");
          const body = {};
          body.id = serviceId;
          requiredInfor.forEach((input) => {
            const key = input.getAttribute("data-name");
            body[key] = input.value;
            if (!input.value) {
              input.classList.add("invalid");
              isValid = false;
            }
            input.onfocus = (e) => {
              input.classList.remove("invalid");
            };
          });
          if (!serviceContent) {
            isValid = false;
          }

          if (!isValid) {
            return;
          }
          body["content"] = serviceContent;

          // console.log(body);
          tools.displayOpacity("show", "Xác nhận thay đổi?");
          tools.confirm(() => {
            tools.postData(UPDATE_SERVICE_API, body).then((feedback) => {
              if (feedback.data.status === 1) {
                tools.displayOpacity("hidden");
                showToast(
                  "Thành công",
                  "success",
                  "Dịch vụ đã được cập nhật",
                  toast_duration
                );
                const serviceTarget = serviceData.find(
                  (service) => Number(service.id) === Number(serviceId)
                );

                const keys = Object.keys(body);
                keys.forEach((key) => {
                  serviceTarget[key] = body[key];
                });
              } else {
                tools.displayOpacity("hidden");
                showToast(
                  `Có lỗi`,
                  "error",
                  `Mã lỗi: <b> UDVx0${feedback.data.status}</b>`,
                  toast_duration
                );
              }
            });
          });
        };

        //handle Hidden

        const hiddenServideBtn = $_(".hidden-service-btn");

        hiddenServideBtn.onclick = (e) => {
          const serviceActive = $_(".service-item.active");
          if (!serviceActive) {
            return;
          }

          const serviceId = serviceActive.getAttribute("service-id");
          let hiddenStatus = hiddenServideBtn.getAttribute("status");
          if (Number(hiddenStatus)) {
            hiddenStatus = 0;
          } else {
            hiddenStatus = 1;
          }

          const serviceTarget = serviceData.find(
            (service) => Number(service.id) === Number(serviceId)
          );

          tools.displayOpacity(
            "show",
            `Xác nhận ${hiddenStatus ? "ẩn" : "hiển thị"} dịch vụ ${serviceTarget.name
            }`
          );
          tools.confirm(() => {
            const body = {};
            body.id = serviceId;
            body.hidden = hiddenStatus;

            // console.log(body);
            tools.postData(UPDATE_SERVICE_API, body).then((feedback) => {
              if (feedback.data.status === 1) {
                tools.displayOpacity("hidden");
                showToast(
                  "Thành công",
                  "success",
                  `Dịch vụ đã được ${hiddenStatus ? "ẩn" : "hiển thị"}`,
                  toast_duration
                );

                const keys = Object.keys(body);
                keys.forEach((key) => {
                  serviceTarget[key] = body[key];
                });

                $_(".hidden-service-btn").setAttribute(
                  "status",
                  serviceTarget.hidden
                );

                $_(".hidden-service-btn").innerHTML = Number(
                  serviceTarget.hidden
                )
                  ? "Hiện dịch vụ"
                  : "Ẩn dịch vụ";
              } else {
                tools.displayOpacity("hidden");
                showToast(
                  `Có lỗi`,
                  "error",
                  `Mã lỗi: <b> UDVx0${feedback.data.status}</b>`,
                  toast_duration
                );
              }
            });
          }, `Lưu ý: Dịch vụ sẽ ngay lập tức được ${hiddenStatus ? "ẩn" : "hiện thị"} trên trang khách hàng`);
        };

        //handle Delete

        const deleteServideBtn = $_(".delete-service-btn");

        deleteServideBtn.onclick = (e) => {
          // console.log('ok');
          const serviceActive = $_(".service-item.active");
          if (!serviceActive) {
            return;
          }

          const serviceId = serviceActive.getAttribute("service-id");

          const serviceTarget = serviceData.find(
            (service) => Number(service.id) === Number(serviceId)
          );

          tools.displayOpacity(
            "show",
            `Xác nhận xoá dịch vụ ${serviceTarget.name}`
          );
          tools.confirm(() => {
            const body = {};
            body.id = serviceId;
            body.is_deleted = 1;

            // console.log(body);
            tools.postData(UPDATE_SERVICE_API, body).then((feedback) => {
              if (feedback.data.status === 1) {
                tools.displayOpacity("hidden");
                showToast(
                  "Thành công",
                  "success",
                  "Dịch vụ đã được xoá",
                  toast_duration
                );

                reloadBtn.click();
              } else {
                tools.displayOpacity("hidden");
                showToast(
                  `Có lỗi`,
                  "error",
                  `Mã lỗi: <b> UDVx0${feedback.data.status}</b>`,
                  toast_duration
                );
              }
            });
          }, `Lưu ý: Dịch vụ được xoá sẽ không được khôi phục lại bằng trang admin`);
        };

        // handle add service

        const addServiceBtn = $_(".add-service-btn");
        addServiceBtn.onclick = (e) => {
          mainContent.innerHTML = components.addServicePage();
          // handleEvent.servicePage(serviceData);

          const cancelAddServiceBtn = $_(".cancel-add-service-btn");

          //handle cancel
          cancelAddServiceBtn.onclick = (e) => {
            reloadBtn.click();
          };

          //handle add Image
          const plusImageItem = $_(".plus-image-item");
          plusImageItem.onclick = (e) => {
            tools.displayOpacity("show", "Hình ảnh");
            tools.confirm(
              () => {
                const imageItem = $_('.image-item[is-selected="true"]');

                if (imageItem) {
                  const url = imageItem.querySelector("img").src;
                  plusImageItem.style.backgroundImage = `url('${url}')`;
                  $_(".service-img-item").innerHTML = "";
                  document.getElementById("service-image-input").value = url;
                } else {
                  // $_('.service-img-item').innerHTML = `
                  // <div class="plus alt"></div>
                  // <span>Thêm hình ảnh</span>`;
                }
                tools.displayOpacity("hidden");
              },
              components.imageTab(),
              "Chọn"
            );
          };
          //handle Save
          const saveAction = $$_(".save-action");
          saveAction.forEach((saveBtn) => {
            saveBtn.onclick = (e) => {
              if (saveBtn.className.includes("save-show-service-btn")) {
                saveService(0);
              }
              if (saveBtn.className.includes("save-hidden-service-btn")) {
                saveService(1);
              }
            };
          });
          function saveService(action) {
            console.log(action);
            const hidden = action;
            // return;
            let isValid = true;
            const requiredInfor = $$_(".required-infor");
            const serviceContent = tinymce
              .get("service-content-input")
              .getContent();

            const serviceActive = $_(".service-item.active");
            if (!serviceActive) {
              return;
            }

            const serviceId = serviceActive.getAttribute("service-id");
            const body = {};
            body.id = serviceId;
            requiredInfor.forEach((input) => {
              const key = input.getAttribute("data-name");
              body[key] = input.value;
              if (!input.value) {
                input.classList.add("invalid");
                isValid = false;
              }
              input.onfocus = (e) => {
                input.classList.remove("invalid");
              };
            });
            if (!serviceContent) {
              isValid = false;
            }

            if (!isValid) {
              return;
            }
            body["content"] = serviceContent;
            body["hidden"] = hidden;
            // console.log(body);
            tools.displayOpacity(
              "show",
              `Xác nhận thêm và ${hidden ? "ẩn" : "hiện"} dịch vụ?`
            );
            tools.confirm(() => {
              tools.postData(ADD_SERVICE_API, body).then((feedback) => {
                if (feedback.data.status === 1) {
                  tools.displayOpacity("hidden");
                  showToast(
                    "Thành công",
                    "success",
                    `Đã thêm và ${hidden ? "ẩn" : "hiện"} một dịch vụ mới`,
                    toast_duration
                  );
                  reloadBtn.click();
                } else {
                  tools.displayOpacity("hidden");
                  showToast(
                    `Có lỗi`,
                    "error",
                    `Mã lỗi: <b> UDVx0${feedback.data.status}</b>`,
                    toast_duration
                  );
                }
              });
            });
          }

          tinymce.remove("#service-content-input");
          tools.config.tinymceInit("#service-content-input", "600");
        };
      }

      handleEvent();
    });

    tinymce.remove("#service-content-input");
    tools.config.tinymceInit("#service-content-input", "600");
  },
  managerPage: function (domainData_) {
    const domainData = domainData_;
    const optionAction = $$_(".option-action");
    const categoryWrapper = $_(".category-wrapper");

    let runningDomain = domainData.filter((domain) => domain.disabled == 0);
    let disabledDomain = domainData.filter((domain) => domain.disabled == 1);

    function handleEvent() {
      //handle Edit
      const editAllProductAction = $$_(".edit-all-product-action");
      // console.log(editAllProductAction);
      editAllProductAction.forEach((editBtn) => {
        editBtn.onclick = (e) => {
          const target = editBtn.parentElement.parentElement;
          const domainId = editBtn.getAttribute("domain-id");
          const domainTarget = domainData.find(
            (domain) => domain.id == domainId
          );
          tools.displayOpacity(
            "show",
            `Chỉnh sửa "${domainTarget.domain}"`,
            "normal"
          );
          opacityChildren.style.minHeight = "unset";
          tools.confirm(
            () => {
              const requiredElements =
                opacityChildren.querySelectorAll(".required-infor");
              let isValid = true;
              requiredElements.forEach((requiredE) => {
                const value = requiredE.value;
                if (!value) {
                  requiredE.classList.add("invalid");
                  requiredE.onfocus = (e) => {
                    requiredE.classList.remove("invalid");
                  };
                  isValid = false;
                }
              });

              if (!isValid) {
                return 1;
              }
              const domainStatus = disabledOption.val();
              const body = {};

              requiredElements.forEach((requiredE) => {
                const keyName = requiredE.getAttribute("data-name");
                body[keyName] = requiredE.value;
              });
              body.id = Number(domainId);
              body.disabled = Number(domainStatus);

              tools.postData(UPDATE_DOMAIN_API, body).then((feedback) => {
                if (feedback.data.status === 1) {
                  tools.displayOpacity("hidden");
                  showToast(
                    "Cập nhật thành công",
                    "success",
                    "Domain đã được cập nhật",
                    toast_duration
                  );
                  // producInfor[indexing] = data;
                  const domainUpdate = { ...domainTarget, ...body };
                  domainData.forEach((domain) => {
                    if (domain.id == domainId) {
                      domain.disabled = domainUpdate.disabled;
                      domain.name = domainUpdate.name;
                      domain.database_name = domainUpdate.database_name;
                      domain.domain = domainUpdate.domain;

                      // console.log(domainData);
                    }
                  });

                  target.innerHTML = components.managerTd(
                    target.children[0].innerText,
                    domainUpdate
                  );
                  handleEvent();
                  // reloadBtn.click();
                } else {
                  tools.displayOpacity("hidden");
                  showToast(
                    "Có lỗi",
                    "error",
                    "Có lỗi khi cập nhật",
                    toast_duration
                  );
                }
              });
              return 0;
            },
            components.editDomainCofig(domainTarget),
            "Lưu thay đổi"
          );

          const disabledOption = $("#disabled-option");
          disabledOption.select2({
            placeholder: "Chọn trạng thái",
            minimumResultsForSearch: -1,
          });
        };
      });

      //handle Add
      const addBtn = $_(".add-domain-btn");
      addBtn.onclick = (e) => {
        tools.displayOpacity("show", `Thêm Domain`, "normal");
        opacityChildren.style.minHeight = "unset";
        tools.confirm(
          () => {
            const requiredElements =
              opacityChildren.querySelectorAll(".required-infor");
            let isValid = true;
            requiredElements.forEach((requiredE) => {
              const value = requiredE.value;
              if (!value) {
                requiredE.classList.add("invalid");
                requiredE.onfocus = (e) => {
                  requiredE.classList.remove("invalid");
                };
                isValid = false;
              }
            });

            if (!isValid) {
              return 1;
            }
            const domainStatus = disabledOption.val();
            const body = {};

            requiredElements.forEach((requiredE) => {
              const keyName = requiredE.getAttribute("data-name");
              body[keyName] = requiredE.value;
            });

            body.disabled = Number(domainStatus);

            tools.postData(ADD_DOMAIN_API, body).then((feedback) => {
              if (feedback.data.status === 1) {
                tools.displayOpacity("hidden");
                showToast(
                  "Thêm thành công",
                  "success",
                  "Domain đã được thêm",
                  toast_duration
                );
                reloadBtn.click();
              } else {
                tools.displayOpacity("hidden");
                showToast(
                  "Có lỗi",
                  "error",
                  "Có lỗi khi cập nhật",
                  toast_duration
                );
              }
            });
            return 0;
          },
          components.addDomain(),
          "Thêm"
        );

        const disabledOption = $("#disabled-option");
        disabledOption.select2({
          placeholder: "Chọn trạng thái",
          minimumResultsForSearch: -1,
        });
      };

      //handle Delete
      const deleteDomainBtn = $$_(".delete-domain-action");
      // console.log(editAllProductAction);
      deleteDomainBtn.forEach((deleteBtn) => {
        deleteBtn.onclick = (e) => {
          const target = deleteBtn.parentElement.parentElement;
          const domainId = deleteBtn.getAttribute("domain-id");
          const domainTarget = domainData.find(
            (domain) => domain.id == domainId
          );
          tools.displayOpacity("show", `Xoá "${domainTarget.domain}"?`);
          opacityChildren.style.minHeight = "unset";
          tools.confirm(() => {
            const body = {};
            body.is_deleted = 1;
            body.disabled = 1;
            body.id = domainId;

            console.log(body);
            tools.postData(UPDATE_DOMAIN_API, body).then((feedback) => {
              if (feedback.data.status === 1) {
                tools.displayOpacity("hidden");
                showToast(
                  "Cập nhật thành công",
                  "success",
                  "Domain đã được cập nhật",
                  toast_duration
                );
                // producInfor[indexing] = data;

                target.remove();
                handleEvent();
                // reloadBtn.click();
              } else {
                tools.displayOpacity("hidden");
                showToast(
                  "Có lỗi",
                  "error",
                  "Có lỗi khi cập nhật",
                  toast_duration
                );
              }
            });
            return 0;
          });

          const disabledOption = $("#disabled-option");
          disabledOption.select2({
            placeholder: "Chọn trạng thái",
            minimumResultsForSearch: -1,
          });
        };
      });
    }

    optionAction.forEach((opAc, index) => {
      opAc.onclick = (e) => {
        runningDomain = domainData.filter((domain) => domain.disabled == 0);
        disabledDomain = domainData.filter((domain) => domain.disabled == 1);
        optionAction.forEach((opAcl1) => {
          opAcl1.classList.remove("active");
        });
        opAc.classList.add("active");
        if (index === 0) {
          categoryWrapper.innerHTML = components.managerTable(domainData);
        }
        if (index === 1) {
          categoryWrapper.innerHTML = components.managerTable(runningDomain);
        }
        if (index === 2) {
          categoryWrapper.innerHTML = components.managerTable(disabledDomain);
        }

        handleEvent();
      };
    });
    handleEvent();
  },

  productPage: function (products_, categoty) {
    const addProductBtn = $$_(".add-product-btn");
    const addCategoryBtn = $_(".add-category-btn");
    const optionAction = $$_(".option-action");
    const optionActionInfor = $$_(".option-action-infor");
    const categoryWrapper = $_(".category-wrapper");
    const products__ = [];
    let products = [];

    products_.forEach((product) => {
      products__.push({
        ...product,
        sold: Number(product.sold) * Number(product.price),
      });
    });
    // console.log(products);
    const sellingProduct = products__.filter(
      (product) => Number(product.hidden) === 0
    );
    const hiddenProduct = products__.filter(
      (product) => Number(product.hidden) === 1
    );
    const filterArray = [];
    products = products__;
    //create Data Table
    // console.log(inventoryNum);
    categoty.forEach((category) => {
      const item = products.filter(
        (product) => product.category_id === category.id
      );
      filterArray.push({
        category_id: category.id,
        category_name: category.name,
        products: item,
      });
    });

    const handleEvent = function () {
      handleImgClick();
      const productsArea = $_(".products-area");

      const editProductIcon = $$_(".edit-product-icon");
      const thTitles = productsArea.querySelectorAll(".th-wrapper");
      const productTbody = productsArea.querySelector(".product-tbody");
      // console.log(productsArea);
      //handle sort
      thTitles.forEach((thTitle) => {
        thTitle.onclick = (e) => {
          // console.log('sort');
          if (thTitle.className.includes("th-wrapper-name")) {
            tools.updateSortTablebyTitle(
              thTitles,
              thTitle,
              products,
              productTbody,
              "title",
              "producTr"
            );
          }
          if (thTitle.className.includes("th-wrapper-price")) {
            tools.updateSortTablebyTitle(
              thTitles,
              thTitle,
              products,
              productTbody,
              "price",
              "producTr"
            );
          }
          if (thTitle.className.includes("th-wrapper-inventory_num")) {
            tools.updateSortTablebyTitle(
              thTitles,
              thTitle,
              products,
              productTbody,
              "inventory_num",
              "producTr"
            );
          }
          if (thTitle.className.includes("th-wrapper-sold")) {
            tools.updateSortTablebyTitle(
              thTitles,
              thTitle,
              products,
              productTbody,
              "sold",
              "producTr"
            );
          }
          handleEvent();
        };
      });
      // handle edit item
      editProductIcon.forEach((edit) => {
        edit.onclick = (e) => {
          const target = edit.parentElement.parentElement.parentElement;
          const productId = target.getAttribute("data");
          const indexing = edit.getAttribute("indexing");
          const producInfor = products.find(
            (product) => Number(product.id) === Number(productId)
          );
          // console.log(producInfor);
          tools.displayOpacity(
            "show",
            `Chỉnh sửa ${tools.handleIndexingEdit(indexing, "indexing")}`
          );
          tools.confirm(
            () => {
              const body = {};
              const inputElement =
                document.getElementById("update-value-input");
              const data = inputElement.value;
              if (!data) {
                // console.log(data);
                inputElement.classList.add("invalid");
                inputElement.onfocus = (e) => {
                  inputElement.classList.remove("invalid");
                };

                return 1;
              }
              body[indexing] = data;
              body.id = productId;
              tools.postData(UPDATE_PRODUCT_API, body).then((feedback) => {
                if (feedback.data.status === 1) {
                  tools.displayOpacity("hidden");
                  showToast(
                    "Cập nhật thành công",
                    "success",
                    "Sản phẩm đã được cập nhật",
                    toast_duration
                  );
                  producInfor[indexing] = data;
                  target.innerHTML = components.producTd(
                    target.children[0].innerText,
                    producInfor
                  );
                  handleEvent();
                  // reloadBtn.click();
                } else {
                  tools.displayOpacity("hidden");
                  showToast(
                    "Có lỗi",
                    "error",
                    "Có lỗi khi cập nhật",
                    toast_duration
                  );
                }
              });
              return 0;
            },

            components.editProductUI(
              components.editUiProductThumb(
                target.children[1].children[0].innerHTML
              ),
              `${tools.handleIndexingEdit(indexing, "title")}`,
              producInfor[indexing]
            ),
            "Cập nhật"
          );
          opacityChildren.style.minWidth = "30%";
          opacityChildren.querySelector("input").focus();
          tools.setEnterEvent(opacityChildren.querySelector("input"), () =>
            $_(".confirm-ui").children[1].click()
          );
          // tools.setValueInputEdit(indexing, producInfor);
        };
      });
      //handle_edit_all 12345678
      const editAllProductAction = $$_(".edit-all-product-action");
      // console.log(editAllProductAction);
      editAllProductAction.forEach((editAllBtn) => {
        editAllBtn.onclick = (e) => {
          // console.log('show op');
          const target = editAllBtn.parentElement.parentElement.parentElement;
          const productId = target.getAttribute("data");
          const producInfor = products.find(
            (product) => Number(product.id) === Number(productId)
          );
          tools.displayOpacity(
            "show",
            `Chỉnh sửa sản phẩm: <span class='orange'>${producInfor.title} (MSP: ${producInfor.product_code})<span>`,
            "big"
          );

          tools.confirm(
            () => {
              const inputElements = opacityChildren.querySelectorAll(
                ".input-edit-product-all"
              );
              const requiredElements =
                opacityChildren.querySelectorAll(".required-infor");
              const descriptionText = opacityChildren.querySelector(
                "#product-description-adit-all"
              );
              const categoryId = categoryInput.val();
              const featured = featuredInput.val();
              const body = {};
              let isValid = true;

              const imgProducts = $$_(".required-image-item");
              const product_images = [];
              if (imgProducts.length == 0) {
                addImageBtn.classList.add("invalid");
                isValid = false;
              } else {
                imgProducts.forEach((img) => {
                  product_images.push(
                    img.style.backgroundImage.slice(4, -1).replace(/"/g, "")
                  );
                  // console.log(product_images.join('*'));
                });
              }

              requiredElements.forEach((requiredE) => {
                const value = requiredE.value;
                if (!value) {
                  requiredE.classList.add("invalid");
                  requiredE.onfocus = (e) => {
                    requiredE.classList.remove("invalid");
                  };
                  isValid = false;
                }
              });
              if (!isValid) {
                return 1;
              }
              inputElements.forEach((input) => {
                const keyName = input.getAttribute("data-name");
                body[keyName] = input.value;
              });
              const descriptionAll = tinymce
                .get("edit-product-description-all")
                .getContent();
              const technique = tinymce
                .get("edit-product-technique-all")
                .getContent();
              const description = tinymce
                .get("edit-product-description")
                .getContent();
              body.description_all = descriptionAll;
              body.description = description;
              body.category_id = categoryId;
              body.featured = featured;
              body.product_images = product_images.join("*");
              body.id = productId;
              body.technique = technique;

              // console.log(body);
              // return 0;
              tools.postData(UPDATE_PRODUCT_API, body).then((feedback) => {
                if (feedback.data.status === 1) {
                  tools.displayOpacity("hidden");
                  showToast(
                    "Cập nhật thành công",
                    "success",
                    "Sản phẩm đã được cập nhật",
                    toast_duration
                  );
                  const keys = Object.keys(body);
                  keys.forEach((key) => {
                    producInfor[key] = body[key];
                  });

                  producInfor.thumbnail = product_images[0];
                  product_images.shift();
                  producInfor.product_images = product_images.join("*");
                  target.innerHTML = components.producTd(
                    target.children[0].innerText,
                    producInfor
                  );

                  handleEvent();
                  // reloadBtn.click();
                } else {
                  tools.displayOpacity("hidden");
                  showToast(
                    "Có lỗi",
                    "error",
                    "Có lỗi khi cập nhật",
                    toast_duration
                  );
                }
              });

              return 0;
            },

            components.editAllUI(producInfor, categoty),
            "Cập nhật"
          );

          //handle delete img
          const deleteProoductImg = $$_(".delete-prooduct-img");
          deleteProoductImg.forEach((deleteImgBtn) => {
            deleteImgBtn.onclick = (e) => {
              e.stopPropagation();
              deleteImgBtn.parentElement.remove();
            };
          });

          //handle change image {
          const requiredImageItems_ = $$_(".required-image-item");
          requiredImageItems_.forEach((imageItemRq) => {
            imageItemRq.onclick = (e) => {
              tools.confirml2(
                () => {
                  const imageItem = $_('.image-item[is-selected="true"]');

                  if (imageItem) {
                    const url = imageItem.querySelector("img").src;

                    imageItemRq.style.backgroundImage = `url('${url}')`;
                  }
                  // tools.displayOpacity('hidden');
                },
                "Chọn ảnh",
                components.imageTab(),
                "Chọn"
              );
            };
          });

          //handle add image

          const addImageBtn = $_(".set-image-item.plus-image-item");
          addImageBtn.onclick = (e) => {
            tools.confirml2(
              () => {
                const imageItem = $_('.image-item[is-selected="true"]');
                if (imageItem) {
                  const url = imageItem.querySelector("img").src;
                  const plusImageItem = $_(".set-image-item.plus-image-item");
                  const imgBox = document.createElement("div");
                  imgBox.classList.add("set-image-item");
                  imgBox.classList.add("required-image-item");
                  imgBox.style.backgroundImage = `url('${url}')`;
                  imgBox.innerHTML = `<span class="delete-prooduct-img"><i class="close"></i></span>`;
                  imgBox.querySelector(".delete-prooduct-img").onclick = (
                    e
                  ) => {
                    e.stopPropagation();
                    imgBox.remove();
                  };
                  imgBox.onclick = (e) => {
                    tools.confirml2(
                      () => {
                        const imageItem = $_('.image-item[is-selected="true"]');

                        if (imageItem) {
                          const url = imageItem.querySelector("img").src;

                          imgBox.style.backgroundImage = `url('${url}')`;
                        }
                        // tools.displayOpacity('hidden');
                      },
                      "Chọn ảnh",
                      components.imageTab(),
                      "Chọn"
                    );
                  };
                  plusImageItem.parentElement.insertBefore(
                    imgBox,
                    plusImageItem
                  );
                } else {
                  // $_('.service-img-item').innerHTML = `
                  // <div class="plus alt"></div>
                  // <span>Thêm hình ảnh</span>`;
                }
                // tools.displayOpacity('hidden');
              },
              "Chọn ảnh",
              components.imageTab(),
              "Chọn"
            );
            // tools.confirm(
            //     () => {
            //         const imageItem = $_('.image-item[is-selected="true"]');
            //         if (imageItem) {
            //             const url = imageItem.querySelector('img').src;
            //             const plusImageItem = $_('.set-image-item.plus-image-item');
            //             const imgBox = document.createElement('div');
            //             imgBox.classList.add('set-image-item');
            //             imgBox.classList.add('required-image-item');
            //             imgBox.style.backgroundImage = `url('${url}')`;
            //             imgBox.innerHTML = `<span class="delete-prooduct-img"><i class="close"></i></span>`;
            //             imgBox.querySelector('.delete-prooduct-img').onclick = (e) => {
            //                 imgBox.remove();
            //             };
            //             plusImageItem.parentElement.insertBefore(imgBox, plusImageItem);
            //         } else {
            //             // $_('.service-img-item').innerHTML = `
            //             // <div class="plus alt"></div>
            //             // <span>Thêm hình ảnh</span>`;
            //         }
            //         tools.displayOpacity('hidden');
            //     },
            //     components.imageTab(),
            //     'Chọn',
            // );
          };

          //handle Action
          const openSell = $_(".open-sell");
          const closeSell = $_(".close-sell");
          const deleteProduct = $_(".delete-product");

          function handleAction(productId_, action) {
            const interface = tools.handleActionProduct(productId_, action);
            tools.displayOpacity("show", `Xác nhận ${interface[0]}?`, "small");
            // opacityChildrenContent.innerHTML = 'Lưu ý ...'
            tools.confirm(() => {
              // console.log(interface[2][0]);
              const body_ = {};
              body_[interface[2][0]] = interface[2][1];
              body_.id = productId_;
              // console.log(body_);
              tools.postData(UPDATE_PRODUCT_API, body_).then((feedback) => {
                if (feedback.data.status === 1) {
                  tools.displayOpacity("hidden");
                  showToast(
                    "Cập nhật thành công",
                    "success",
                    `Đã ${interface[0]}`,
                    toast_duration
                  );
                  reloadBtn.click();
                } else {
                  tools.displayOpacity("hidden");
                  showToast(
                    "Có lỗi",
                    "error",
                    "Có lỗi khi cập nhật",
                    toast_duration
                  );
                }
              });
            }, `Lưu ý: ${interface[1]}`);
          }

          if (openSell) {
            openSell.onclick = (e) => {
              handleAction(productId, "open");
            };
          }
          if (closeSell) {
            closeSell.onclick = (e) => {
              handleAction(productId, "close");
            };
          }
          if (deleteProduct) {
            deleteProduct.onclick = (e) => {
              handleAction(productId, "delete");
            };
          }

          opacityChildren.style.minHeight = "80%%";
          const categoryInput = $("#edit-category-input");
          const featuredInput = $("#edit-featured-input");
          categoryInput.select2({
            placeholder: "Chọn danh mục",
          });
          featuredInput.select2({
            placeholder: "Chọn nổi bật",
          });

          setTimeout(() => {
            tinymce.remove("#edit-product-description-all");
            tinymce.remove("#edit-product-technique-all");
            tinymce.remove("#edit-product-description");
            tools.config.tinymceInit("#edit-product-description-all", "600");
            tools.config.tinymceInit("#edit-product-technique-all", "600");
            tools.config.tinymceInit("#edit-product-description", "400");
          }, 100);
        };
      });

      //handle Category
      //handle edit category
      const editCategoryBtns = $$_(".edit-category-btn");
      editCategoryBtns.forEach((editBtn) => {
        editBtn.onclick = (e) => {
          const id = Number(editBtn.getAttribute("data-id"));
          const categoryTarget = filterArray.find(
            (category) => category.category_id === id
          );
          tools.displayOpacity("show", "Chỉnh sửa danh mục");
          tools.confirm(
            () => {
              const inputE = document.getElementById(
                "update-category-name-input"
              );
              if (!inputE) {
                tools.displayOpacity("hidden");
                return;
              }
              if (!inputE.value) {
                inputE.classList.add("invalid");
                inputE.onfocus = (e) => {
                  inputE.classList.remove("invalid");
                };
                return 1;
              }
              const body = {};
              body.id = id;
              body.name = inputE.value;
              tools.postData(UPDATE_CATEGORY_API, body).then((feedback) => {
                if (feedback.data.status === 1) {
                  tools.displayOpacity("hidden");
                  filterArray.forEach((categoty) => {
                    if (categoty.category_id === id) {
                      categoty.category_name = body.name;
                    }
                  });
                  // console.log(filterArray);
                  editBtn.parentElement.previousElementSibling.innerText =
                    body.name;
                  showToast(
                    "Thành công",
                    "success",
                    "Danh mục đã được chỉnh sửa",
                    toast_duration
                  );
                } else {
                  tools.displayOpacity("hidden");
                  showToast(
                    "Có lỗi",
                    "error",
                    "Có lỗi khi thao tác",
                    toast_duration
                  );
                }
              });
            },
            components.editCategoryUI(categoryTarget),
            "Lưu"
          );
        };
      });

      const deleteCategoryBtns = $$_(".delete-category-btn");
      deleteCategoryBtns.forEach((deleteBtn) => {
        deleteBtn.onclick = (e) => {
          const id = Number(deleteBtn.getAttribute("data-id"));
          tools.displayOpacity("show", "Xác nhận xoá danh mục");
          tools.confirm(() => {
            const body = {};
            body.id = id;
            body.is_deleted = 1;
            tools.postData(UPDATE_CATEGORY_API, body).then((feedback) => {
              if (feedback.data.status === 1) {
                tools.displayOpacity("hidden");
                showToast(
                  "Thành công",
                  "success",
                  "Danh mục đã được xoá",
                  toast_duration
                );
                reloadBtn.click();
              } else {
                tools.displayOpacity("hidden");
                showToast(
                  "Có lỗi",
                  "error",
                  "Có lỗi khi thao tác",
                  toast_duration
                );
              }
            });
          }, components.noteConfirmUI("Lưu ý, sau khi xoá các sản phẩm trong danh mục cũng sẽ bị xoá, vui lòng chuyển các sản phẩm sang danh mục khác nếu vẫn còn đăng bán."));
        };
      });
      //handle Action
      // handle Search Logic
      const searchBtn = $_(".search-product-btn");
      searchBtn.onclick = (e) => {
        const body = {};
        body.productName = searchProductInput.val();
        body.categoryName = searchCategoryInput.val();
        body.minPrice = Number($_("#minPrice").value);
        body.maxPrice = Number($_("#maxPrice").value);
        body.minSold = Number($_("#minSold").value);
        body.maxSold = Number($_("#maxSold").value);

        const results = tools.productFilter(products, body);
        // console.log(body);
        // console.log(results);
        if (results.length) {
          categoryWrapper.innerHTML =
            `<div class="search-result-title"><span>Có <span class='orange'>${results.length}</span> sản phẩm phù hợp</span></div>` +
            components.product(results);
          handleEvent();
        } else {
          categoryWrapper.innerHTML =
            '<span class="orange">Không có sản phẩm nào cho bộ lọc này!</span>';
        }
      };

      tippy(".edit-product-icon", {
        content: "chỉnh sửa",
        placement: "top",
        // followCursor: true,
      });
    };
    // console.log('ok');
    handleEvent();
    //insert total product

    //option  action
    optionAction.forEach((opAc, index) => {
      opAc.onclick = (e) => {
        optionAction.forEach((opAcl1) => {
          opAcl1.classList.remove("active");
        });
        opAc.classList.add("active");
        if (index === 0) {
          products = products__;
          categoryWrapper.innerHTML = components.product(products);
        }
        if (index === 1) {
          products = sellingProduct;
          categoryWrapper.innerHTML = components.product(sellingProduct);
        }
        if (index === 2) {
          products = hiddenProduct;
          categoryWrapper.innerHTML = components.product(hiddenProduct);
        }
        if (index === 3) {
          products = filterArray;
          categoryWrapper.innerHTML = components.productByCategory(filterArray);
          // console.log(filterArray);
        }
        handleEvent();
      };
    });
    //handle infor Tab
    optionActionInfor.forEach((opAc, index) => {
      opAc.onclick = (e) => {
        optionActionInfor.forEach((opAcl1) => {
          opAcl1.classList.remove("active");
        });
        opAc.classList.add("active");
        if (index === 0) {
          $_(".statistical-wrapper-master").style.display = "none";
          $_(".search-wrapper").style.display = "block";
        }
        if (index === 1) {
          $_(".statistical-wrapper-master").style.display = "block";
          $_(".search-wrapper").style.display = "none";
        }

        // handleEvent();
      };
    });

    // add-product-btn
    addProductBtn.forEach((addBtn) => {
      addBtn.onclick = () => {
        app.handleTab("", 2);
      };
    });
    //add category
    addCategoryBtn.onclick = (e) => {
      tools.displayOpacity("show", `Thêm một danh mục mới`);
      tools.confirm(
        () => {
          const body = {};
          const inputElement = document.getElementById("update-value-input");
          const category_name = inputElement.value;
          if (!category_name) {
            // console.log(data);
            inputElement.classList.add("invalid");
            inputElement.onfocus = (e) => {
              inputElement.classList.remove("invalid");
            };

            return 1;
          }
          body.name = category_name;

          tools.postData(ADD_CATEGORY_API, body).then((feedback) => {
            if (feedback.data.status === 1) {
              tools.displayOpacity("hidden");
              showToast(
                "Thêm thành công",
                "success",
                "Danh mục đã được thêm",
                toast_duration
              );
              reloadBtn.click();
            } else {
              tools.displayOpacity("hidden");
              showToast(
                "Có lỗi",
                "error",
                "Có lỗi khi thao tác",
                toast_duration
              );
            }
          });
          return 0;
        },
        components.addCategoryUI(),
        "Thêm"
      );
      opacityChildren.style.minWidth = "30%";
      opacityChildren.querySelector("input").focus();
      tools.setEnterEvent(opacityChildren.querySelector("input"), () =>
        $_(".confirm-ui").children[1].click()
      );
    };
    // add-category-btn

    //search-btn
    const searchProductInput = $("#search-product-input");
    const searchCategoryInput = $("#search-category-input");
    searchProductInput.select2({
      placeholder: "Nhập tên sản phẩm",
    });
    searchCategoryInput.select2({
      placeholder: "Chọn danh mục",
    });
  },
  orderPage: function (orders) {
    let currentTab = 1;

    const categoryWrapper = $_(".category-wrapper");
    const optionAction = $$_(".option-action");
    const optionActionInfor = $$_(".option-action-infor");
    let oderSort = [...orders];
    // console.log(orders);
    const orderDatas = [...orders];
    const penddingOrders = orderDatas.filter(
      (order) => Number(order.status) === 1
    );
    const confirmedOrders = orderDatas.filter(
      (order) => Number(order.status) === 2
    );
    const completedOrders = orderDatas.filter(
      (order) => Number(order.status) === 3
    );
    const cannelOrders = orderDatas.filter(
      (order) => Number(order.status) === 0
    );

    //Handle Event
    const handleEvent = function () {
      tabTableNum = Math.ceil(oderSort.length / numOfRowTable);
      // console.log(tabTableNum);
      $_(".current-tab-text").children[1].innerText = tabTableNum;

      const productsArea = $_(".products-area");
      if (!productsArea) return;
      const thTitles = productsArea.querySelectorAll(".th-wrapper");
      const productTbody = productsArea.querySelector(".product-tbody");
      const searchOrderBtn = $_(".search-order-btn");

      //handle Sort
      thTitles.forEach((thTitle) => {
        thTitle.onclick = (e) => {
          if (thTitle.className.includes("th-wrapper-status")) {
            tools.updateSortTablebyTitle(
              thTitles,
              thTitle,
              oderSort,
              productTbody,
              "status",
              "orderTr"
            );
          }
          if (thTitle.className.includes("th-wrapper-total_money")) {
            tools.updateSortTablebyTitle(
              thTitles,
              thTitle,
              oderSort,
              productTbody,
              "total_money",
              "orderTr"
            );
          }
          if (thTitle.className.includes("th-wrapper-fullname")) {
            tools.updateSortTablebyTitle(
              thTitles,
              thTitle,
              oderSort,
              productTbody,
              "fullname",
              "orderTr"
            );
          }
          if (thTitle.className.includes("th-wrapper-email")) {
            tools.updateSortTablebyTitle(
              thTitles,
              thTitle,
              oderSort,
              productTbody,
              "email",
              "orderTr"
            );
          }
          if (thTitle.className.includes("th-wrapper-phone_number")) {
            tools.updateSortTablebyTitle(
              thTitles,
              thTitle,
              oderSort,
              productTbody,
              "phone_number",
              "orderTr"
            );
          }
          if (thTitle.className.includes("th-wrapper-address")) {
            tools.updateSortTablebyTitle(
              thTitles,
              thTitle,
              oderSort,
              productTbody,
              "address",
              "orderTr"
            );
          }
          if (thTitle.className.includes("th-wrapper-order_date")) {
            tools.updateSortTablebyTitle(
              thTitles,
              thTitle,
              oderSort,
              productTbody,
              "order_date",
              "orderTr"
            );
          }
          handleEvent();
        };
      });

      //handle Search
      searchOrderBtn.onclick = (e) => {
        const body = {};
        body.order_code = String(searchCodeInput.val());
        body.order_status = String(searchStatusInput.val());
        body.order_product = String(searchProductInput.val());
        body.order_category = String(searchCategoryInput.val());
        body.minOV = Number($_("#minOrderValue").value) || 0;
        body.maxOV = Number($_("#maxOrderValue").value) || 10000000000;
        body.minDate = $_("#minDate").value;
        body.maxDate = $_("#maxDate").value;

        categoryWrapper.innerHTML = components.loader();
        tools.postData(ODERS_FILTER_API, body).then((feedback) => {
          const orderFilter = feedback.data.data;
          oderSort = orderFilter;
          // console.log(typeof orderFilter);
          if (typeof orderFilter !== "object" || orderFilter.length === 0) {
            categoryWrapper.innerHTML =
              '<span class="orange">Không có đơn hàng nào cho bộ lọc này!</span>';
            return;
          }
          categoryWrapper.innerHTML =
            `<div class="search-result-title"><span>Có <span class='orange'>${orderFilter.length}</span> đơn hàng phù hợp</span></div>` +
            components.orders(orderFilter);
          handleEvent();
        });
      };

      // handle Edit

      // const editAllOrderAction = $$_('.edit-all-order-action');
      const orderTr = $$_(".order-tr");
      orderTr.forEach((editBtn) => {
        editBtn.onclick = (e) => {
          const target = editBtn;
          const mainId = target.getAttribute("data");
          const order = [...orders].find(
            (orderItem) => Number(orderItem.id) === Number(mainId)
          );

          tools.displayOpacity("show", `Đơn hàng ${mainId}`, "normal");
          opacityChildrenContent.innerHTML = components.actionOrderUI(order);

          const mainActionOrderWrapper = $_(".main-action-order-wrapper");
          if (mainActionOrderWrapper) {
            const actionBtns =
              mainActionOrderWrapper.querySelectorAll(".button");

            actionBtns.forEach((actionBtn) => {
              actionBtn.onclick = (e) => {
                opacityChildrenContent.innerHTML = components.loader();
                const orderStatus = actionBtn.getAttribute("action");
                const orderId = actionBtn.getAttribute("data");
                const data = {
                  id: Number(orderId),
                  status: Number(orderStatus),
                };
                // console.log(data);
                tools.postData(ODERS_UPDATE_API, data).then((feedback) => {
                  if (feedback.data.status == 1) {
                    closeOpacityBtn.click();
                    showToast(
                      "Thành công",
                      "success",
                      `Đơn hàng <b>${orderId}</b> đã được ${tools.handleStatusOrder(
                        Number(orderStatus)
                      )}`,
                      toast_duration
                    );
                    editBtn.querySelector(".order-status").innerHTML =
                      tools.handleOrderStatus(Number(orderStatus));
                    oderSort.forEach((order) => {
                      if (Number(order.id) === Number(orderId)) {
                        order.status = orderStatus;
                      }
                    });
                  } else {
                    closeOpacityBtn.click();
                    showToast(
                      "Lỗi",
                      "error",
                      `Thao tác thất bại`,
                      toast_duration
                    );
                  }
                });
              };
            });
          }
        };
      });

      tippy(".order-tr", {
        content: "Nhấn vào đơn hàng để xem chi tiết",
        placement: "left",
        // followCursor: true,
      });
    };
    //handle Tab Table
    const changeTabIconLeft = $$_(".change-tab-icon");
    let tabTableNum = Math.ceil(oderSort.length / numOfRowTable);

    handleEvent();

    changeTabIconLeft.forEach((tabIcon) => {
      tabIcon.onclick = (e) => {
        const index = tabIcon.getAttribute("index");
        const currentTabInner = Number(
          $_(".current-tab-text").children[0].innerText
        );
        // console.log(currentTabInner);
        if (index === "left") {
          if (currentTab > 1) {
            currentTab = currentTabInner - 1;
          }
          // console.log(currentTab);
        }
        if (index === "right") {
          if (currentTab < tabTableNum) {
            currentTab = currentTabInner + 1;
          }
          // console.log(currentTab);
        }
        $_(".current-tab-text").children[0].innerText = currentTab;
        categoryWrapper.innerHTML = components.orders(
          tools.handleTabTable(oderSort, currentTab - 1)
        );
        handleEvent();
      };
    });

    const exportOrderBtn = $_(".export-order-btn");
    exportOrderBtn.onclick = (e) => {
      console.log(oderSort);
      const dataExport = oderSort.map((order, index) => ({
        stt: index + 1,
        order_code: order.order_code,
        products: tools.handleProductExport(order.products),
        value: nf.format(order.total_money),
        fullname: order.fullname,
        email: order.email,
        phone: order.phone_number,
        address: order.address,
        order_date: tools.handleTimeFull(order.order_date),
        note: order.note,
        status: tools.handleOrderStatusExport(order.status),
      }));
      console.log(dataExport);
      tools.export2ExelFormat(
        dataExport,
        ["Bảng thống kê đơn hàng", "Trong khoảng thời gian từ - đến - "],
        [
          "STT",
          "Mã đơn hàng",
          "Sản phẩm",
          "Giá trị đơn",
          "Tên người mua",
          "Email",
          "Số điện thoại",
          "Địa chỉ",
          "Ngày đặt",
          "Ghi chú",
          "Trạng thái",
        ],
        `Order_report_${tools.handleDateFileName(new Date())}`,
        tools.handleDateFileName(new Date())
      );
    };

    const searchProductInput = $("#search-product-input-order");
    const searchCategoryInput = $("#search-category-input-order");
    const searchCodeInput = $("#search-code-input-order");
    const searchStatusInput = $("#search-status-input-order");
    searchProductInput.select2({
      placeholder: "Nhập tên sản phẩm",
    });
    searchCategoryInput.select2({
      placeholder: "Chọn danh mục",
    });
    searchCodeInput.select2({
      placeholder: "Nhập mã đơn hàng",
    });
    searchStatusInput.select2({
      placeholder: "Chọn trạng thái",
    });
    $_("#minDate").value = tools.getCurrDay(1);
    $_("#maxDate").value = tools.getCurrDay();

    optionAction.forEach((opAc, index) => {
      opAc.onclick = (e) => {
        optionAction.forEach((opAcl1) => {
          opAcl1.classList.remove("active");
        });
        opAc.classList.add("active");
        if (index === 0) {
          oderSort = [...orders];
          categoryWrapper.innerHTML = components.orders(
            tools.handleTabTable(orders, 0)
          );
        }
        if (index === 1) {
          oderSort = [...penddingOrders];
          categoryWrapper.innerHTML = components.orders(
            tools.handleTabTable(penddingOrders, 0)
          );
        }
        if (index === 2) {
          oderSort = [...confirmedOrders];
          categoryWrapper.innerHTML = components.orders(
            tools.handleTabTable(confirmedOrders, 0)
          );
        }
        if (index === 3) {
          oderSort = [...completedOrders];
          categoryWrapper.innerHTML = components.orders(
            tools.handleTabTable(completedOrders, 0)
          );
        }
        if (index === 4) {
          oderSort = [...cannelOrders];
          categoryWrapper.innerHTML = components.orders(
            tools.handleTabTable(cannelOrders, 0)
          );
        }
        handleEvent();
        $_(".current-tab-text").children[0].innerText = 1;
        currentTab = 1;
      };
    });
    optionActionInfor.forEach((opAc, index) => {
      opAc.onclick = (e) => {
        optionActionInfor.forEach((opAcl1) => {
          opAcl1.classList.remove("active");
        });
        opAc.classList.add("active");
        if (index === 0) {
          $_(".statistical-wrapper-master").style.display = "none";
          $_(".search-wrapper").style.display = "block";
        }
        if (index === 1) {
          $_(".statistical-wrapper-master").style.display = "block";
          $_(".search-wrapper").style.display = "none";
        }

        // handleEvent();
      };
    });
  },
  advertisementPage: function (advertisementData) {
    const plusImageItem = $_(".plus-image-item");
    plusImageItem.onclick = (e) => {
      tools.displayOpacity("show", "Hình ảnh");
      tools.confirm(
        () => {
          const imageItem = $_('.image-item[is-selected="true"]');
          if (imageItem) {
            const url = imageItem.querySelector("img").src;
            plusImageItem.querySelector("img").src = url;
            $_(".news-img-item").innerHTML = "";
            document.getElementById("image-input").value = url;
            console.log(document.getElementById("image-input").value);
          } else {
            // $_('.service-img-item').innerHTML = `
            // <div class="plus alt"></div>
            // <span>Thêm hình ảnh</span>`;
          }
          tools.displayOpacity("hidden");
        },
        components.imageTab(),
        "Chọn"
      );
    };

    //handle change default
    const defaultImage = $_(".set-image-product-area-edit-all").children[0];

    defaultImage.onclick = (e) => {
      tools.displayOpacity("show", "Hình ảnh");
      tools.confirm(
        () => {
          const imageItem = $_('.image-item[is-selected="true"]');

          if (imageItem) {
            const url = imageItem.querySelector("img").src;

            defaultImage.style.backgroundImage = `url('${url}')`;
          }
          tools.displayOpacity("hidden");
        },
        components.imageTab(),
        "Chọn"
      );
    };

    //handle Submit
    const saveInforBtn = $_(".save-infor-btn");
    saveInforBtn.onclick = (e) => {
      let isValid = true;
      const body = {};
      const requiredInfor = $$_(".required-infor");
      requiredInfor.forEach((input) => {
        const key = input.getAttribute("data-name");
        body[key] = input.value;
        if (!input.value) {
          console.log(input);
          input.classList.add("invalid");
          isValid = false;
        }
        input.onfocus = (e) => {
          input.classList.remove("invalid");
        };
      });
      if (!isValid) {
        return;
      }
      // console.log(body);
      tools.displayOpacity("show", "Xác nhận thay đổi?");
      tools.confirm(() => {
        const hidden = advertisementStatus.val();
        if (hidden === "undefined") {
          showToast(
            `Có lỗi`,
            "error",
            `<b>Chưa chọn trạng thái</b>`,
            toast_duration
          );
        }
        body.hidden = hidden;
        // console.log(body);
        // return;
        tools.postData(UPDATE_ADVERTISEMENT_API, body).then((feedback) => {
          if (feedback.data.status === 1) {
            tools.displayOpacity("hidden");
            showToast("Thành công", "success", "Đã cập nhật", toast_duration);
            reloadBtn.click();
          } else {
            tools.displayOpacity("hidden");
            showToast(
              `Có lỗi`,
              "error",
              `Mã lỗi: <b> UNx0${feedback.data.status}</b>`,
              toast_duration
            );
          }
        });
      });
    };

    //config UI

    const advertisementStatus = $("#advertisement-status");
    advertisementStatus.select2({
      placeholder: "Trạng thái",
    });

    tippy(".fa-question-circle.appear_time-question", {
      content: appearTimeDES,
      placement: "top",
      // followCursor: true,
    });

    $$_(".delete-prooduct-img").forEach((deleteBtn) => {
      deleteBtn.onclick = (e) => {
        e.stopPropagation();
        deleteBtn.parentElement.remove();
      };
    });

    $_(".plus-image-item-multi").onclick = (e) => {
      tools.displayOpacity("show", "Hình ảnh");
      tools.confirm(
        () => {
          const imageItem = $_('.image-item[is-selected="true"]');

          if (imageItem) {
            const url = imageItem.querySelector("img").src;
            const plusImageItem = $_(".set-image-item.plus-image-item-multi");

            const imgBox = document.createElement("div");
            imgBox.classList.add("set-image-item");
            imgBox.classList.add("required-image-item");
            imgBox.style.backgroundImage = `url('${url}')`;

            imgBox.innerHTML = `<span class="delete-prooduct-img"><i class="close"></i></span>`;

            imgBox.querySelector(".delete-prooduct-img").onclick = (e) => {
              e.stopPropagation();
              imgBox.remove();
            };

            imgBox.onclick = (e) => {
              tools.displayOpacity("show", "Hình ảnh");
              tools.confirm(
                () => {
                  const imageItem = $_('.image-item[is-selected="true"]');

                  if (imageItem) {
                    const url = imageItem.querySelector("img").src;

                    imgBox.style.backgroundImage = `url('${url}')`;
                  }
                  tools.displayOpacity("hidden");
                },
                components.imageTab(),
                "Chọn"
              );
            };

            plusImageItem.parentElement.insertBefore(imgBox, plusImageItem);
          } else {
            // $_('.service-img-item').innerHTML = `
            // <div class="plus alt"></div>
            // <span>Thêm hình ảnh</span>`;
          }
          tools.displayOpacity("hidden");
        },
        components.imageTab(),
        "Chọn"
      );
    };

    $_(".save-multi-banner-btn").onclick = (e) => {
      tools.displayOpacity("show", "Xác nhận thay đổi?");
      tools.confirm(() => {
        const imageRequired = $$_(".required-image-item");
        const multi_banner = [];
        imageRequired.forEach((img) => {
          multi_banner.push(
            img.style.backgroundImage.slice(4, -1).replace(/"/g, "")
          );
        });

        const body = {};
        body.multi_banner = multi_banner.join("*");

        tools.postData(UPDATE_ADVERTISEMENT_API, body).then((feedback) => {
          if (feedback.data.status === 1) {
            tools.displayOpacity("hidden");
            showToast("Thành công", "success", "Đã cập nhật", toast_duration);
            reloadBtn.click();
          } else {
            tools.displayOpacity("hidden");
            showToast(
              `Có lỗi`,
              "error",
              `Mã lỗi: <b> UNx0${feedback.data.status}</b>`,
              toast_duration
            );
          }
        });
      });
    };
  },
  inforPage: function (inforData) {
    const inforPageInput = $_(".infor-page-input");
    const plusImageItem = $_(".plus-image-item");
    const inforPageLogo = $_("#infor-page-logo");

    let isChangeLogo = 0;
    const saveInforBtn = $_(".save-infor-btn");

    function handleEvent() {
      const deleteInforItemBtn = $$_(".delete-infor-item-btn");
      const addInforItemBtn = $$_(".add-infor-item-btn");

      deleteInforItemBtn.forEach((deleteBtn) => {
        deleteBtn.onclick = (e) => {
          tools.displayOpacity("show", "Xác nhận xoá?");
          tools.confirm(() => {
            deleteBtn.parentElement.remove();
            closeOpacityBtn.click();
          });
        };
      });

      addInforItemBtn.forEach((addBtn) => {
        addBtn.onclick = (e) => {
          const inputWrapper = document.createElement("div");
          inputWrapper.classList.add("infor-page-input-wrapper");
          const dataName =
            addBtn.parentElement.parentElement.children[0].children[0].getAttribute(
              "data-name"
            );
          inputWrapper.innerHTML = `
                            <input data-name=${dataName} type="text" class='infor-page-input'  value='' placeholder='Nhập thông tin'/> 
                            <div class='delete-infor-item-btn'>Xoá</div>
                                     `;
          addBtn.parentElement.parentElement.insertBefore(
            inputWrapper,
            addBtn.parentElement
          );
          handleEvent();
        };
      });

      plusImageItem.onclick = (e) => {
        inforPageLogo.click();
      };

      let objectUrl;
      inforPageLogo.onchange = (e) => {
        const plusAltWrapper = $_(".plus-alt-wrapper");
        isChangeLogo = 1;
        // console.log(objectUrl);
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
        if (!inforPageLogo.value) {
          plusImageItem.style.backgroundImage = `url('')`;
          plusAltWrapper.innerHTML = `        
                      <div class="plus alt"></div>
                      <span>Thêm hình ảnh</span>
                 `;
          return;
        }
        objectUrl = URL.createObjectURL(inforPageLogo.files[0]);
        plusImageItem.style.backgroundImage = `url('${URL.createObjectURL(
          inforPageLogo.files[0]
        )}')`;

        plusAltWrapper.innerHTML = components.loader();

        // check img
        let img = new Image();
        img.src = objectUrl;
        img.onload = function () {
          plusAltWrapper.innerHTML = `
                          
                     `;
          // if (this.width > 500 || this.height > 500) {
          //     imgValid = false;
          //     addImageBtn.classList.add('invalid');
          //     $_('.image-warning').classList.add('image-warning-show');
          // } else {
          //     imgValid = true;
          //     addImageBtn.classList.remove('invalid');
          //     $_('.image-warning').classList.remove('image-warning-show');
          // }
        };
      };
    }
    handleEvent();

    var map = L.map("infor-page-map").setView(
      [inforData.address[0].lat, inforData.address[0].lng],
      13
    );
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    var marker = L.marker([
      inforData.address[0].lat,
      inforData.address[0].lng,
    ]).addTo(map);
    marker
      .bindPopup(
        `<span>${inforData.address[0].lat} - ${inforData.address[0].lng}</span>`
      )
      .openPopup();

    var searchControl = new L.esri.Controls.Geosearch().addTo(map);

    var results = new L.LayerGroup().addTo(map);

    // searchControl.on('results', function (data) {
    //     results.clearLayers();

    //     for (var i = data.results.length - 1; i >= 0; i--) {
    //         results.addLayer(L.marker(data.results[i].latlng));
    //     }
    // });

    var newMaker;
    map.on("click", function (e) {
      const position = {};
      position.lat = e.latlng.lat;
      position.lng = e.latlng.lng;

      if (newMaker) {
        map.removeLayer(newMaker);
      }
      newMaker = L.marker([position.lat, position.lng], {
        icon: redMaker,
      }).addTo(map);
      newMaker
        .bindPopup(
          `Toạ độ mới: </br><span>${position.lat} - ${position.lng}</span>`
        )
        .openPopup();
      $_("#infor-page-location-lat").value = `${position.lat}`;
      $_("#infor-page-location-lng").value = `${position.lng}`;
    });

    //handele Submit
    saveInforBtn.onclick = (e) => {
      const inforRequired = $$_(".infor-required");
      // console.log(inforRequired);

      const body = new FormData();
      const data = {};
      let isValid = true;

      inforRequired.forEach((inputRequired) => {
        if (!inputRequired.value) {
          inputRequired.classList.add("invalid");
          isValid = false;
        }
        inputRequired.addEventListener("focus", () => {
          inputRequired.classList.remove("invalid");
        });
      });

      // console.log(isValid);
      if (!isValid) {
        return;
      }
      tools.displayOpacity("show", "Xác nhận thay đổi?");
      tools.confirm(() => {
        const inforPageInput = $$_(".infor-page-input");
        // const body = {};
        inforPageInput.forEach((input) => {
          if (!input.value) {
            return;
          }
          const key = input.getAttribute("data-name");
          if ("email phone address".includes(key)) {
            if (data[key]) {
              data[key].push(input.value);
              body.append(key, input.value);
            } else {
              data[key] = [input.value];
              body.append(key, data[key]);
            }
          } else {
            data[key] = input.value;
            body.append(key, data[key]);
          }
        });

        body.append("logo_img", inforPageLogo.files[0]);
        body.append("is_logo_change", isChangeLogo);

        // console.log(body);
        tools.postData(INFOR_UPDATE_API, body).then((feedback) => {
          if (feedback.data.status == 1) {
            closeOpacityBtn.click();
            reloadBtn.click();
            showToast(
              "Thành công",
              "success",
              `Thông tin trang đã được cập nhật`,
              toast_duration
            );
          } else {
            closeOpacityBtn.click();
            reloadBtn.click();
            showToast("Lỗi", "error", `Thao tác thất bại`, toast_duration);
          }
        });
      });
    };
  },
  configPage: function () {
    const saveInforBtn = $_(".save-infor-btn");
    saveInforBtn.onclick = (e) => {
      const inforRequired = $$_(".infor-required");
      // console.log(inforRequired);
      const body = {};
      let isValid = true;

      // inforRequired.forEach((inputRequired) => {
      //     if (!inputRequired.value) {
      //         inputRequired.classList.add('invalid');
      //         isValid = false;
      //     }
      //     inputRequired.addEventListener('focus', () => {
      //         inputRequired.classList.remove('invalid');
      //     });
      // });

      // console.log(isValid);
      if (!isValid) {
        return;
      }
      tools.displayOpacity("show", "Xác nhận thay đổi?");
      tools.confirm(() => {
        const inforPageInput = $$_(".infor-page-input");
        // const body = {};
        inforPageInput.forEach((input) => {
          if (!input.value) {
            return;
          }
          const key = input.getAttribute("data-name");
          if ("email phone address".includes(key)) {
            if (data[key]) {
              data[key].push(input.value);
              body.append(key, input.value);
            } else {
              data[key] = [input.value];
              body.append(key, data[key]);
            }
          } else {
            body[key] = input.value;
          }
        });
        // console.log(body);
        // return;
        // console.log(body);
        tools.postData(UPDATE_CONFIG_API, body).then((feedback) => {
          if (feedback.data.status == 1) {
            closeOpacityBtn.click();
            reloadBtn.click();
            showToast(
              "Thành công",
              "success",
              `Cấu hình trang đã được cập nhật`,
              toast_duration
            );
          } else {
            closeOpacityBtn.click();
            reloadBtn.click();
            showToast("Lỗi", "error", `Thao tác thất bại`, toast_duration);
          }
        });
      });
    };

    tippy(".fa-question-circle.user_telegram-question", {
      content: userTelegramDES,
      placement: "top",
      // followCursor: true,
    });

    tippy(".fa-question-circle.social-question", {
      content: "Thông tin các nút social",
      placement: "top",
      // followCursor: true,
    });
  },
  themePage: function () {
    const themeColor = $("#theme-color");
    const themeTextColor = $("#theme-text-color");
    const themeButtonColor = $("#theme-button-color");
    const themeTextHeaderColor = $("#theme-text-header-color");
    const themeTextHoverColor = $("#theme-text-hover-color");
    const themeTextFooterColor = $("#theme-text-footer-color");
    const iframePreview = document.getElementById("iframe-preview");

    const colorPickerTheme = $$_(".color-picker-theme");

    const comboThemeColor = $("#combo-theme-color");

    const mainColor = $_("#theme-main_color");
    const colorLetter1 = $_("#theme-color_letter_1");
    const colorButton = $_("#theme-color_button");
    const colorMenuHome = $_("#theme-color_menu_home");

    const selectorArray = [
      themeColor,
      themeTextColor,
      themeButtonColor,
      themeTextHeaderColor,
      themeTextHoverColor,
      themeTextFooterColor,
    ];
    function updatePreview() {
      const html =
        iframePreview.contentWindow.document.getElementsByTagName("html");
      // const
      html[0].style.setProperty("--main-color", mainColor.value);
      html[0].style.setProperty("--color-letter-1", colorLetter1.value);
      html[0].style.setProperty("--color-button", colorButton.value);
      html[0].style.setProperty("--color-menu-home", colorMenuHome.value);
    }

    colorPickerTheme.forEach((input) => {
      input.addEventListener("input", () => {
        updatePreview();
      });
    });
    iframePreview.addEventListener("load", () => {
      setTimeout(updatePreview, 1000);
    });

    const saveThemeBtn = $_(".save-theme-btn");

    const selectColorConfig = {
      data: data,
      escapeMarkup: function (markup) {
        return markup;
      },
      templateSelection: function (data) {
        return data.text;
      },
    };

    selectorArray.forEach((selector) => {
      const selectorElement = selector.select2(selectColorConfig);
      selectorElement.on("change", function (e) {
        // var data = e.params.data;
        e.target.previousElementSibling.value = e.target.value;

        updatePreview();
      });
    });

    const comboThemeColorSelect2 = comboThemeColor.select2();
    comboThemeColorSelect2.on("change", function (e) {
      const theme = themeCombo[Number(e.target.value)];
      mainColor.value = theme.main_color;
      colorLetter1.value = theme.color_letter_1;
      colorButton.value = theme.color_button;
      colorMenuHome.value = theme.color_menu_home;

      updatePreview();
    });

    function handleEvent() {
      saveThemeBtn.onclick = (e) => {
        tools.displayOpacity("show", `Xác nhận chỉnh sửa màu sắc chủ đề?`);
        tools.confirm(() => {
          const body = {};

          body.main_color = mainColor.value;
          body.color_letter_1 = colorLetter1.value;
          body.color_button = colorButton.value;
          body.color_menu_home = colorMenuHome.value;

          tools.postData(THEME_UPDATE_API, body).then((feedback) => {
            if (feedback.data.status == 1) {
              closeOpacityBtn.click();
              showToast(
                "Thành công",
                "success",
                `Đã cập nhật màu chủ đề`,
                toast_duration
              );
            } else {
              closeOpacityBtn.click();
              showToast("Lỗi", "error", `Thao tác thất bại`, toast_duration);
            }
          });
          // console.log(body);
        });
      };
    }
    handleEvent();

    //iframe preview
    var cssLink = document.createElement("link");
    cssLink.href = "test.css";
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";

    // const header = $_('#header');
    // console.log(header);
  },
  imageItemClick: function (e) {
    const targetName = e.target.getAttribute("tag-name");
    const imageItem = $$_(".image-item");
    if (targetName === "image") {
      imageItem.forEach((image) => {
        image.setAttribute("is-selected", "false");
      });
      e.target.parentElement.setAttribute("is-selected", "true");
    }
  },
  imageManangePage: function (imageData) {
    let lastCheck = false;
    const zoomIconImg = $$_(".zoom-icon-img");
    const imgCheckboxInput = $$_(".img-checkbox-input");
    //handle Zoom
    zoomIconImg.forEach((zoomIcon) => {
      zoomIcon.onclick = (e) => {
        const imgTarget =
          zoomIcon.parentElement.parentElement.querySelector("img");
        // console.log(imgTarget);
        if (!imgTarget) return;

        tools.displayOpacity("show", "Xem hình ảnh", "full");
        const imgInfor = {};
        imgInfor.src = imgTarget.src;
        opacityChildrenContent.innerHTML = components.imgUI(imgInfor);
      };
    });
    //handle Select
    imgCheckboxInput.forEach((imgCheckbox) => {
      imgCheckbox.onchange = (e) => {
        // const isChecked = imgCheckbox.checked;
        const checkedInput = $$_(".img-checkbox-input:checked");
        const actionElement = $_(".main-title-right.img-m-page");
        if (checkedInput.length) {
          actionElement.style.opacity = 1;
          actionElement.style.display = "flex";
          actionElement.classList.add("animate__fadeIn");
          actionElement.classList.remove("animate__fadeOut");
        } else {
          actionElement.classList.remove("animate__fadeIn");
          actionElement.classList.add("animate__fadeOut");
        }
      };
    });

    //handle Delete
    const deleteImagesBtn = $_(".delete-images-btn");
    deleteImagesBtn.onclick = (e) => {
      const checkedInput = $$_(".img-checkbox-input:checked");
      if (!checkedInput.length) {
        return;
      }
      tools.displayOpacity("show", "Xác nhận xoá các hình được chọn?");
      tools.confirm(() => {
        const imgList = {};
        checkedInput.forEach((checked) => {
          const imgTarget =
            checked.parentElement.parentElement.parentElement.querySelector(
              "img"
            );
          const imgId = imgTarget.id.slice(4);
          const imgNameList = imgTarget.src.split("/");
          const imgName =
            imgNameList[imgNameList.length - 2] +
            "/" +
            imgNameList[imgNameList.length - 1];
          imgList[imgId] = imgName;
        });
        // console.log(imgList);
        tools.postData(DELETE_IMAGE_API, imgList).then((feedback) => {
          if (feedback.data.status == 1) {
            closeOpacityBtn.click();
            showToast("Thành công", "success", `Đã xoá!`, toast_duration);
            reloadBtn.click();
          } else {
            closeOpacityBtn.click();
            showToast(
              "Có gì đó không ổn!",
              "warning",
              `Một số hình ảnh chưa được xoá do lỗi máy chủ`,
              toast_duration
            );

            reloadBtn.click();
          }
        });
      });
    };
  },
  uploadImage: function (e) {
    const imageInput = document.getElementById("upload-image");
    if (!imageInput) {
      return;
    }
    imageInput.click();
    imageInput.onchange = (e) => {
      if (!imageInput.nextElementSibling) {
        return;
      }
      if (!imageInput.value) {
        imageInput.nextElementSibling.innerHTML = `<span>Thêm hình ảnh</span>`;
        return;
      }
      imageInput.nextElementSibling.innerHTML = components.loader();
      // console.log(imageInput);
      // imageInput.nextElementSibling.parentElement.setAttribute('is_data', 'true');
      // const objectUrl = URL.createObjectURL(imageInput.files[0]);
      // imageInput.nextElementSibling.children[0].style.display = 'none';
      // imageInput.nextElementSibling.style.backgroundImage = `url('${URL.createObjectURL(imageInput.files[0])}')`;
      let body = new FormData();
      body.append("image", imageInput.files[0]);

      tools.postData(UPLOAD_IMAGE_API, body).then((feedback) => {
        if (feedback.data.status == 1) {
          showToast("Tải xong", "success", `Vừa tải lên 1 ảnh`, toast_duration);
          app.data.image.push({
            url: feedback.data.imgUrl,
            create_at: new Date(),
          });

          const imgWrapperE = document.createElement("div");
          imgWrapperE.classList.add("image-item");
          imgWrapperE.setAttribute(
            "onclick",
            "handleEvent.imageItemClick(event)"
          );
          imgWrapperE.innerHTML = `
                    <img tag-name='image' class="loading_img"  onload="tools.onloadImage(event)"  loading="lazy" src='${feedback.data.imgUrl}'>
                    `;

          tools.insertAfter(imgWrapperE, $_(".add-image-wrapper"));
          imageInput.nextElementSibling.innerHTML = `<span>Thêm hình ảnh</span>`;

          // $_('.image-tab-wrapper').innerHTML = components.imageTabInner();
        } else {
          imageInput.nextElementSibling.innerHTML = `<span>Thêm hình ảnh</span>`;
          if (feedback.data.status == 2) {
            return showToast(
              `Có lỗi`,
              "error",
              `Mã lỗi: <b> UPDx0${feedback.data.status}</b> - Không phải tệp hình ảnh!`,
              toast_duration
            );
          }
          showToast(
            `Có lỗi`,
            "error",
            `Mã lỗi: <b> UPDx0${feedback.data.status}</b>`,
            toast_duration
          );
        }
      });
      body = null;
    };
    // imageInput.addEventListener('change', () => {

    // });
  },
  uploadImagePage: function (e) {
    const imageInput = document.getElementById("upload-image");
    if (!imageInput) {
      return;
    }
    imageInput.click();
    imageInput.onchange = (e) => {
      if (!imageInput.nextElementSibling) {
        return;
      }
      if (!imageInput.value) {
        imageInput.nextElementSibling.innerHTML = `<span>Thêm hình ảnh</span>`;
        return;
      }
      imageInput.nextElementSibling.innerHTML = components.loader();
      // console.log(imageInput);
      // imageInput.nextElementSibling.parentElement.setAttribute('is_data', 'true');
      // const objectUrl = URL.createObjectURL(imageInput.files[0]);
      // imageInput.nextElementSibling.children[0].style.display = 'none';
      // imageInput.nextElementSibling.style.backgroundImage = `url('${URL.createObjectURL(imageInput.files[0])}')`;
      let body = new FormData();
      body.append("image", imageInput.files[0]);

      tools.postData(UPLOAD_IMAGE_API, body).then((feedback) => {
        // console.log(feedback);
        if (feedback.data.status == 1) {
          showToast("Tải xong", "success", `Vừa tải lên 1 ảnh`, toast_duration);
          app.data.image.push({
            url: feedback.data.imgUrl,
            create_at: new Date(),
          });

          const imgWrapperE = document.createElement("div");
          imgWrapperE.classList.add("image-item");
          // imgWrapperE.setAttribute('onclick', 'handleEvent.imageItemClick(event)');
          imgWrapperE.innerHTML = `
                    <img tag-name='image' class="loading_img"  onload="tools.onloadImage(event)"  loading="lazy" src='${feedback.data.imgUrl}'>
                    <div class='img-item-action'>
                        
                        <div class='zoom-icon-img'><i class="fas fa-expand-alt"></i></div>
                    </div>
                    `;
          imgWrapperE.querySelector(".zoom-icon-img").onclick = (e) => {
            tools.displayOpacity("show", "Xem hình ảnh", "full");
            const imgInfor = {};
            imgInfor.src = feedback.data.imgUrl;
            opacityChildrenContent.innerHTML = components.imgUI(imgInfor);
          };
          tools.insertAfter(imgWrapperE, $_(".add-image-wrapper"));
          imageInput.nextElementSibling.innerHTML = `<span>Thêm hình ảnh</span>`;
          // $_('.image-tab-wrapper').innerHTML = components.imageTabInner();
        } else {
          imageInput.nextElementSibling.innerHTML = `<span>Thêm hình ảnh</span>`;
          if (feedback.data.status == 2) {
            return showToast(
              `Có lỗi`,
              "error",
              `Mã lỗi: <b> UPDx0${feedback.data.status}</b> - Không phải tệp hình ảnh!`,
              toast_duration
            );
          }
          showToast(
            `Có lỗi`,
            "error",
            `Mã lỗi: <b> UPDx0${feedback.data.status}</b>`,
            toast_duration
          );
        }
      });
      body = null;
    };
    // imageInput.addEventListener('change', () => {

    // });
  },
};
const handleImgClick = function () {
  allImage = $$_("img");
  if (allImage.length <= 1) {
    return;
  }
  allImage.forEach((img) => {
    img.onclick = (e) => {
      tools.displayOpacity("show", "Xem hình ảnh", "full");
      const imgInfor = {};
      imgInfor.src = img.src;
      opacityChildrenContent.innerHTML = components.imgUI(imgInfor);
    };
  });
};
