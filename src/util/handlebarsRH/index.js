var nf = Intl.NumberFormat();

function getPriceUi(price, discount) {
  if (discount) {
    const discountPrice = (
      nf.format(price - (discount / 100) * price) + " ₫"
    ).replaceAll(",", ".");
    const rightPrice = (nf.format(Number(price)) + " ₫").replaceAll(",", ".");

    return `<p class='right-price-wrapper'>
                    <span class='right-price'>${rightPrice}</span> 
                    <span class='discount-percent'>-${discount}%</span>
                </p>
                <p class='discount-price'>${discountPrice}</p>`;
  } else {
    const rightPrice = (nf.format(Number(price)) + " ₫").replaceAll(",", ".");

    return `<p class='discount-price'>${rightPrice}</p>`;
  }
}

function HandlebarsRegisterHelper(hbs) {
  hbs.handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });

  hbs.handlebars.registerHelper('getLocalizedField', function (obj, field, lang) {


    return lang === 'en' ? obj[`${field}_en`] : obj[field];
  });
  hbs.handlebars.registerHelper('getBreadcurmb', function (pathName, lang,slug) {
    const langPath = lang && lang == "en" ? `/${lang}` : "";

    return `
                                <li><a href="/" data-lang="home">Trang chủ</a></li>
                                <li><a href="/${slug}/${langPath}" data-lang="news">${pathName}</a></li>
   `
  });

  hbs.handlebars.registerHelper(
    "eachLimitSPHome",
    function (arr, limit, cateName) {
      // return '<div>sản phẩm limit : 4</div>';

      return arr
        .map((sp, index) => {
          if (index < 4) {
            return `<div class='product-item'>
                <a href='/san-pham/${sp.slug}'>
                    ${sp?.discount
                ? `<div class='top-discount'>- ${sp.discount}%</div>`
                : ""
              }
                    <div class='product-image'>
                        <img alt='hinh-anh-san-pham' src='${sp.thumbnail}' />
                    </div>
                    <div class='product-infor'>
                        <div class='product-category'>
                            <span>${cateName}</span>
                        </div>
                        <div class='product-name'>
                            <span>${sp.title}</span>
                        </div>
                        <div class='stars'>
                            <svg width='15' height='15' viewBox='0 0 940.688 940.688'>
                                <path
                                    d='M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z'
                                ></path>
                            </svg>
                            <svg width='15' height='15' viewBox='0 0 940.688 940.688'>
                                <path
                                    d='M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z'
                                ></path>
                            </svg>
                            <svg width='15' height='15' viewBox='0 0 940.688 940.688'>
                                <path
                                    d='M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z'
                                ></path>
                            </svg>
                            <svg width='15' height='15' viewBox='0 0 940.688 940.688'>
                                <path
                                    d='M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z'
                                ></path>
                            </svg>
                            <svg width='15' height='15' viewBox='0 0 940.688 940.688'>
                                <path
                                    d='M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z'
                                ></path>
                            </svg>

                            <div class='overlay' style='width: 37%'></div>
                        </div>
                        <div class='product-price'>
                            ${getPriceUi(sp.price, sp.discount)}
                        </div>
                    </div>
                </a>
                </div>`;
          }
        })
        .join("");
    }
  );

  hbs.handlebars.registerHelper("liAdv", function (adv) {
    return adv
      .map((ad, index) => {
        return `
                <li data-target='#banner-main' data-slide-to='${index}' ${!index ? 'class="active"' : ""
          }></li>
            `;
      })
      .join("");
  });
  hbs.handlebars.registerHelper("eachBanner", function (adv) {
    return adv
      .map((ad, index) => {
        return `
                <div class='carousel-item ${!index ? "active" : ""}'>
                <img
                    class='d-block w-100'
                    src='${ad}'
                    alt='First slide'
                />
            </div>
            `;
      })
      .join("");
  });
  hbs.handlebars.registerHelper("ifnotEquals", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.inverse(this) : options.fn(this);
  });

  hbs.handlebars.registerHelper("paging", function (pageNums_, pageActive_, lang) {
    const pageNums = Number(pageNums_);
    const pageActive = Number(pageActive_);

    if (Number(pageActive) > Number(pageNums)) {
      return "";
    }

    return `
        ${pageActive - 3 > 0
        ? `<li class='pagination-item'><a   href='/tin-tuc/trang/${lang}/${pageActive - 1
        }'><i class="fa-solid fa-angles-left"></i></a></li>`
        : ""
      }
        ${pageActive - 2 > 0
        ? `<li class='pagination-item'><a   href='/tin-tuc/trang/${lang}/${pageActive - 2
        }'><div>${pageActive - 2}</div></a> </li>  `
        : ""
      }
        ${pageActive - 1 > 0
        ? `<li class='pagination-item'> <a   href='/tin-tuc/trang/${lang}/${pageActive - 1
        }'><div>${pageActive - 1}</div></a> </li>`
        : ""
      }
       <li class='pagination-item'>  <a class="active" href='/tin-tuc/trang/${lang}/${pageActive}'><div class="paging-item">${pageActive}</div></a></li> 
        ${pageActive + 1 <= pageNums
        ? `<li class='pagination-item'>  <a   href='/tin-tuc/trang/${lang}/${pageActive + 1
        }'><div>${pageActive + 1}</div></a></li>`
        : ""
      }
        ${pageActive + 2 <= pageNums
        ? `<li class='pagination-item'><a   href='/tin-tuc/trang/${lang}/${pageActive + 2
        }'><div>${pageActive + 2}</div></a> </li> `
        : ""
      }

        ${pageActive + 3 <= pageNums
        ? `<li class='pagination-item'><a href='/tin-tuc/trang/${lang}/${pageActive + 1
        }'><div class="paging-item"><i class="fa-solid fa-angles-right"></i></div></a> </li> `
        : ""
      }
      
        `;
  });

  hbs.handlebars.registerHelper("menuItems", function (lang = "") {

    const langPath = lang && lang == "en" ? `/${lang}` : "";
    return `
          <a class="nav-link" href="${langPath == "" ? "/" : langPath}" data-lang="home">Trang chủ</a>
</li>
<li class="menu-item-has-children">
  <a class="nav-link" href='/gioi-thieu${langPath}' data-lang="about">Giới thiệu</a>
</li>
<li class="menu-item-has-children">
  <a class="nav-link" href="/giai-phap${langPath}" data-lang="solutions">Giải pháp</a>
</li>
<li class="menu-item-has-children">
  <a class="nav-link" href='/tin-tuc${langPath}' data-lang="news">Tin tức</a>
</li>
<li class="menu-item-has-children">
  <a class="nav-link" href='/lien-he${langPath}' data-lang="contact">Liên hệ</a>
</li>
       `
  });

  hbs.handlebars.registerHelper('eq', function (a, b) {
    return a === b;
  });
  hbs.handlebars.registerHelper("dateFormatDDMMYY", function (date) {
    // console.log(date);
    d = new Date(date);
    var h = d.getHours();
    h < 10 ? (h = "0" + h) : (h = h);
    var m = d.getMinutes();
    m < 10 ? (m = "0" + m) : (m = m);
    var s = d.getSeconds();
    s < 10 ? (s = "0" + s) : (s = s);
    var day = d.getDate();
    day < 10 ? (day = "0" + day) : (day = day);
    var mo = d.getMonth() + 1;
    mo < 10 ? (mo = "0" + mo) : (mo = mo);
    var y = d.getFullYear();
    // return h + ':' + m + ':' + s + ' ' + day + '/' + mo + '/' + y;
    return day + "/" + mo + "/" + y;
  });

  hbs.handlebars.registerHelper("arrowRightIcon", function () {
    return `<svg enable-background="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" class="shopee-svg-icon _2o3dIs icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg>`;
  });

  hbs.handlebars.registerHelper("formatPrice", function (price, discount) {
    if (discount) {
      const discountPrice = (
        nf.format(price - (discount / 100) * price) + " ₫"
      ).replaceAll(",", ".");
      const rightPrice = (nf.format(Number(price)) + " ₫").replaceAll(",", ".");

      return `<p class='right-price-wrapper'>
                        <span class='right-price'>${rightPrice}</span> 
                        <span class='discount-percent'>-${discount}%</span>
                    </p>
                    <p class='discount-price'>${discountPrice}</p>`;
    } else {
      const rightPrice = (nf.format(Number(price)) + " ₫").replaceAll(",", ".");

      return `<p class='discount-price'>${rightPrice}</p>`;
    }
  });
}

module.exports = HandlebarsRegisterHelper;
