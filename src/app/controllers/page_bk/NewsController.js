const pageInterface = require('../../models/PageInterface');

class NewsController {
    index(req, res, next) {
        const dbName = req.dbName;
        const inforBasicPage = req.inforBasicPage;
        if (!inforBasicPage || !dbName) {
            return res.send('Opp!, Có gì đó không ổn! </br>Có vẻ như domain hiện tại không tồn tại source.');
        }
        const template_id = inforBasicPage.companyInfor.information[0].template_id || '';

        pageInterface.getDataNewsPage(dbName, (err, results, fields) => {
            if (err) {
                res.render('error');
            } else {
                const numNewsOfPage = 4;

                const newsRows = results.map((row) => {
                    return row;
                });
                if (newsRows.length === 0) {
                    return res.render('error', {
                        title: 'ERROR',
                        active: 1,
                        root: inforBasicPage.root,
                        companyInfor: inforBasicPage.companyInfor,
                    });
                }
                const featuredNews = newsRows.filter((news) => news.featured == 1);
                const featuredMain = featuredNews.splice(0, 1);
                const pageNums = Math.ceil(newsRows.length / numNewsOfPage);
                const allNews = newsRows.splice(Number(1 - 1) * numNewsOfPage, numNewsOfPage);
                return res.render('news' + template_id, {
                    title: 'Tin tức & Sự kiện',
                    layout: 'main' + template_id,
                    style: 'news' + template_id,
                    active: 3,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                    news: {
                        featuredMain: featuredMain,
                        featuredNews: featuredNews,
                        allNews: allNews,
                        pageNums: pageNums,
                        pageActive: 1,
                    },
                });
            }
        });
    }
    slug(req, res, next) {
        const dbName = req.dbName;
        const inforBasicPage = req.inforBasicPage;
        if (!inforBasicPage || !dbName) {
            return res.send('Opp!, Có gì đó không ổn! </br>Có vẻ như domain hiện tại không tồn tại source.');
        }
        const template_id = inforBasicPage.companyInfor.information[0].template_id || '';

        const slug = req.params.slug;
        pageInterface.getDataNewsDetailPage(dbName, slug, (err, results, fields) => {
            if (err) {
                res.render('error');
            } else {
                const newsRows = results[0].map((row) => {
                    return row;
                });

                const ortherNewsRows = results[1].map((row) => {
                    return row;
                });

                ortherNewsRows.splice(5);

                if (newsRows.length === 0) {
                    return res.render('error', {
                        title: 'ERROR',
                        active: 3,
                        root: inforBasicPage.root,
                        companyInfor: inforBasicPage.companyInfor,
                    });
                }

                return res.render('newsDetail' + template_id, {
                    layout: 'main' + template_id,
                    title: newsRows[0].title,
                    style: 'newsDetail' + template_id,
                    classwrapper: 'page',
                    active: 3,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                    news: newsRows[0],
                    ortherNewsRows: ortherNewsRows,
                });
            }
        });
    }
    paging(req, res, next) {
        const dbName = req.dbName;
        const inforBasicPage = req.inforBasicPage;
        if (!inforBasicPage || !dbName) {
            return res.send('Opp!, Có gì đó không ổn! </br>Có vẻ như domain hiện tại không tồn tại source.');
        }

        const slug = req.params.slug;
        const numNewsOfPage = 4;
        pageInterface.getDataNewsPage(dbName, (err, results, fields) => {
            if (err) {
                res.render('error');
            } else {
                const newsRows = results.map((row) => {
                    return row;
                });
                if (newsRows.length === 0) {
                    return res.render('error', {
                        title: 'ERROR',
                        active: 1,
                        root: inforBasicPage.root,
                        companyInfor: inforBasicPage.companyInfor,
                    });
                }

                const pageNums = Math.ceil(newsRows.length / numNewsOfPage);
                const featuredNews = newsRows.filter((news) => news.featured == 1);
                const allNews = newsRows.splice(Number(slug - 1) * numNewsOfPage, numNewsOfPage);
                const featuredMain = featuredNews.splice(0, 1);

                return res.render('news', {
                    title: `Tin tức & Sự kiện - Trang ${slug}`,
                    style: 'news',
                    active: 3,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                    news: {
                        featuredMain: featuredMain,
                        featuredNews: featuredNews,
                        allNews: allNews,
                        pageNums: pageNums,
                        pageActive: slug,
                    },
                });
            }
        });
    }
}

module.exports = new NewsController();
