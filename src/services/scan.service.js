const fs = require('fs');
const fileService = require('./file.service');
const NodeClam = require('clamscan');
const { Readable } = require('stream');




scanFunction = async(body)=> {

    const {caseId, fileName, fileData} = body;
    
    const clamscan = await new NodeClam().init({
        clamdscan: {
            host: '127.0.0.1',
            port: 3310,
        }
    });

    const fileBuffer = Buffer.from(fileData, 'base64');
    
    //first way, scan a saved file
    //const tempFilePath = './fileToScan.data';
    //fs.writeFileSync(tempFilePath, fileBuffer);
    
    //const result = await clamscan.isInfected('./fileToScan.data');
    //console.log("scan result: ",result)


    //Second way, using a stream so we don't save the file
    const memStream = new Readable();
    //text that triggers antivirus 
    memStream.push(fileBuffer);
    memStream.push(null);

    // Create a buffer stream to store the data

    // Scan the data in memory with ClamAV
    clamscan.scanStream(memStream, (err, object, malicious) => {
        if (err) {
          console.error(err);
        } else if (malicious) {
          console.log(`The file is infected with ${object.name} virus.`);
        } else {
          console.log(`The file is safe.`);
        }
    })
  
    //if everything okay, call save function
    //await fileService.save(req.body);
}


module.exports = scanFunction;