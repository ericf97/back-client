const azFileService = {};
const axios = require('axios').default;
const parseString = require('xml2js').parseString;
const {AZURE_STORAGE_URL, SAS_KEY} = process.env;

const headers = {
  'x-ms-version': '2021-06-08'
}

azFileService.readDirectoryBase = async () => {

  const directory = await axios.get(`${AZURE_STORAGE_URL}?restype=directory&comp=list&${SAS_KEY}`);
  return parseToJSON(directory.data);
}
azFileService.readDirectory = async (caseId) => {

  const directory = await axios.get(`${AZURE_STORAGE_URL}${caseId}?restype=directory&comp=list&${SAS_KEY}`);
  return parseToJSON(directory.data);
}

azFileService.createDirectory = (directoryName) => {
  return axios.put(`${AZURE_STORAGE_URL}${directoryName}?restype=directory&${SAS_KEY}`, undefined,{headers});
}

azFileService.createFileSpace = (fileName, fileLength, directoryName) => {
  return axios.put(`${AZURE_STORAGE_URL}${directoryName}/${fileName}?${SAS_KEY}`, undefined,
  {
    headers: {
      ...headers,
      'x-ms-type': 'file',
      'x-ms-content-length': fileLength
    }
  });
}

azFileService.uploadFile = (fileName, fileLength, directoryName, fileData) => {
  return axios.put(`${AZURE_STORAGE_URL}${directoryName}/${fileName}?comp=range&${SAS_KEY}`, fileData,
  {
    headers: {
      // ...headers,
      'x-ms-write': 'update',
      'x-ms-range': `bytes=0-${fileLength-1}`
    }
  });
}

module.exports = azFileService;

const parseToJSON = (xml) => {
  return new Promise((resolve, reject) => {
    parseString(xml, {trim: true}, (err, data) => resolve(data));
  });
}
