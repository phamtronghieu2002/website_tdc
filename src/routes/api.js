const express = require("express");
const router = express.Router();
const ApiControllers = require("../app/controllers/ApiController");
const DomainControllers = require("../app/controllers/DomainController");
const ProductControllers = require("../app/controllers/ProductController");
const SolutionControllers = require("../app/controllers/SolutionController");
const auth_token = require("../util/auth");
const upload = require("../util/upload/file/image/agencys");
const uploadSolutions = require("../util/upload/file/image/solutions");
const tools = require("../util/tools");
router.get("/content/home", ApiControllers.index);
router.post(
  "/update/view/content",
  auth_token.post([-1, 0, 1, 3]),
  ApiControllers.updateContent
);
router.post(
  "/update/service/content",
  auth_token.post([-1, 0, 1, 3]),
  ApiControllers.updateService
);
router.post(
  "/add/service/content",
  auth_token.post([-1, 0, 1, 3]),
  ApiControllers.addService
);
router.post(
  "/update/news/content",
  auth_token.post([-1, 0, 1, 3]),
  ApiControllers.updateNews
);
router.post(
  "/add/news/content",
  auth_token.post([-1, 0, 1, 3]),
  ApiControllers.addNews
);
router.post(
  "/add/policys",
  auth_token.post([-1, 0, 1, 3]),
  ApiControllers.addPolicys
);
router.post(
  "/update/recruitment/content",
  auth_token.post([-1, 0, 1, 3]),
  ApiControllers.updateRecruitment
);
router.post(
  "/add/recruitment/content",
  auth_token.post([-1, 0, 1, 3]),
  ApiControllers.addRecruitment
);
router.get("/account/all", auth_token.get([-1, 0, 1]), ApiControllers.allUser);

router.get("/domain/all", auth_token.get([-1]), DomainControllers.allDomain);
router.post(
  "/domain/update",
  auth_token.get([-1]),
  DomainControllers.updateDomain
);
router.post("/domain/add", auth_token.get([-1]), DomainControllers.addDomain);

// no Auth router
router.get("/maindata/all", ProductControllers.getAllDataOfP);
router.get("/news/all", ProductControllers.getNews);

router.post(
  "/add-agencys",
  auth_token.post([-1, 0, 1, 3]),
  async (req, res, next) => {
    try {
      await tools.deleteImagesFromDirectory(
        tools.agencys_img_folder
      );
      next();
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Error when delete all images from directory" });
    }
  },
  upload.array("files", 20),
  ApiControllers.saveAgencys
);
router.post("/add-solutions", uploadSolutions.array("images", 20),(req,res,next)=>{
   const images =req.files.map((file)=>file.filename);

  if(images.length>0){
        req.images = images;
       return next();
    }

    return res.status(400).json({message:"Error when upload images"});  
},SolutionControllers.handleAddSolutions);

router.put("/update-solutions", uploadSolutions.array("images", 20),(req,res,next)=>{
  const images =req.files.map((file)=>file.filename);

 if(images.length>0){
       req.images = images;
      return next();
   }
   return res.status(400).json({message:"Error when upload images"});  
},SolutionControllers.handleUpdateSolutions);
router.get("/all-solutions",SolutionControllers.handleGetAllSolutions);
router.delete(
  "/solutions/:id",SolutionControllers.handleDeleteSolutionById
);

router.post("/email", ApiControllers.saveEmail);
router.post("/sendMail", ApiControllers.sendMail);
router.get("/email", ApiControllers.getMail);
router.post("/registerSolution", ApiControllers.registerSolution);
router.get("/getCustomersRegister", ApiControllers.getRegisterSolution);
router.put("/updateCustomersRegister", ApiControllers.updateRegisterSolution);
module.exports = router;
