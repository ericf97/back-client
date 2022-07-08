const azFileService = require("./az.file.service");

const fileService = {};


fileService.save = async(body) => {

  const {caseId, fileName, fileLength, fileData} = body;

  const directory = await azFileService.readDirectory();

  const cases = directory.EnumerationResults.Entries[0].Directory;

  //if case directory doesn't exist I must create a new one
  let directoryExist = false
  cases.forEach(data => {
    if(data.Name[0] == caseId) {
      directoryExist = true;
      return;
    }
  });

  if(!directoryExist) {
    console.log('creating');
    await azFileService.createDirectory(caseId);
  }

  // set space for file
  await azFileService.createFileSpace(fileName, fileLength, caseId);

  // upload the file
  await azFileService.uploadFile(fileName, fileLength, caseId, fileData)
}

module.exports = fileService;
