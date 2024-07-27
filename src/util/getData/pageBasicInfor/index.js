const pageInterface = require('../../../app/models/PageInterface');

function setInforPage() {
    const dbName = req.dbName;
    pageInterface.getBasicInfor(dbName, (err, results, fields) => {
        if (err) {
            // console.log('getBasic Data ERROR');
        } else {
            const themeRows = results[0].map((row) => {
                return row;
            });
            const keys = Object.keys(themeRows[0]);
            const root = keys.map((key) => `--${key}: ${themeRows[0][key]};`).join(' ');

            const addressRows = results[1].map((row) => {
                return row;
            });

            const emailRows = results[2].map((row) => {
                return row;
            });

            const phoneRows = results[3].map((row) => {
                return row;
            });

            const informationRows = results[4].map((row) => {
                return row;
            });

            const socialRows = results[5].map((row) => {
                return row;
            });

            inforBasicPage = {
                root: `:root { ${root} }`,
                companyInfor: {
                    address: addressRows,
                    emails: emailRows,
                    phones: phoneRows,
                    information: informationRows,
                    socials: socialRows,
                },
            };
        }
    });
}

module.exports = setInforPage;
