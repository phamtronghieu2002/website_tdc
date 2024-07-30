const pageInterface = require('../../../app/models/PageInterface');

function getBasicInfor(req, res, next) {
    const dbName = req.dbName;

    pageInterface.getTableDB(dbName, (err, results, fields) => {
        console.log("results >>", results);
    }
    );




    pageInterface.getBasicInfor(dbName, (err, results, fields) => {
        if (err) {
            // console.log('getBasic Data ERROR');
            return res.send(
                `<div style = "box-sizing: border-box;font-family: 'Source Code Pro', monospace; height: 90vh;display: flex;align-items: center;justify-content: center;" = >Website hiện đang tạm dừng để bảo trì, vui lòng quay lại sau!</div>`,
            );
        } else {
            const themeRows = results[0].map((row) => {
                return row;
            });
            // console.log(themeRows);
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
            // console.log("policyRows 6 >>",results[6])
            const policysRows = results[6].map((row) => {
                return row;
            });
            // console.log("policyRows v2 >>",policysRows)
            const advertisementRows = results[7].map((row) => {
                return row;
            });
            // console.log("information >>",informationRows);
            req.inforBasicPage = {
                root: `:root { ${root} }`,
                companyInfor: {
                    address: addressRows,
                    emails: emailRows,
                    phones: phoneRows,
                    information: informationRows,
                    socials: socialRows,
                    policys: policysRows,
                    advertisement: advertisementRows,
                },
            };

            next();
        }
    });
}
module.exports = getBasicInfor;
