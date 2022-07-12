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

  const file = Buffer.from(fileData, 'base64');
  // set space for file
  await azFileService.createFileSpace(fileName, file.length, caseId);
  console.log('space created');

  // upload the file
  await azFileService.uploadFile(fileName, file.length, caseId, file);
}

module.exports = fileService;
