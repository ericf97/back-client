const azFileService = require("./az.file.service");
const utf8 = require('utf8');

const fileService = {};

fileService.save = async(body) => {

  const {caseId, fileName, fileData} = body;

  const directory = await azFileService.readDirectoryBase();

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

fileService.get = async(caseId) => {

  const files =  await azFileService.readDirectory(caseId);
  return files.EnumerationResults.Entries[0].File.map(a => {

    return {
      caseId: caseId,
      fileName: a.Name[0],
      url: `url/${a.Name}`,
      ext: a.Name[0].split('.')[1]
    }
  });
}

module.exports = fileService;
