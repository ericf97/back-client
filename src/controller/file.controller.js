const fileController = {};
const fileService = require('../services/file.service');
const scanFunction = require('../services/scan.service');

fileController.save = async(req, res, next) => {

  try {
    //true si scan retorna ok, false si es malicioso seguin implementacion
    // scanFunction(req.body)
    //   .then((result) => {
        
    //     if(result){
          fileService.save(req.body).catch((error) => {
            //error al subir, then..
            console.log("error al subir el archivo")
            console.error(error);
          });
        // }
        //scan es malo, then..
      // })
      // .catch((error) => {
        //error al escanear, then..
      //   console.log("error al escanear archivo")
      // });

    res.send({});
  } catch (error) {
    console.error(error);
    throw { error: "something went wrong uploading this file" };
  }
}

fileController.get = async(req, res, next) => {

  try {
    const {caseId} = req.params;

    const directories = await fileService.get(caseId);
    res.json(directories);
  } catch (error) {
    console.log(error);
    throw { error: "something went wrong uploading this file" };
  }
}

fileController.deleteFile = async(req, res, next) => {

  try {
    const {caseId, fileName} = req.params;

    const response = await fileService.deleteFile(caseId, fileName);
    res.json(response.status);
  } catch (error) {
    console.log(error);
    throw { error: "something went wrong getting this file" };
  }
}
module.exports = fileController;
