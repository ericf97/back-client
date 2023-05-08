const fs = require('fs');
const fileService = require('./file.service');
const NodeClam = require('clamscan');
const { Readable } = require('stream');
const getVtInstance = require('./nvt.singleton')
const {VIRUS_TOTAL_API_KEY} = process.env;



scanFunction = async(body)=> {

    const {caseId, fileName, fileData} = body;
    

    const fileBuffer = Buffer.from(fileData, 'base64');

    

    //utilizando clamscan
    //import clamscan service, like so.
    // const clamscan = await new NodeClam().init({
    //     clamdscan: {
    //         host: '127.0.0.1',
    //         port: 3310,
    //     }
    // });


    //Primera forma, escanear utilizando clamav un archivo temporalmente guardado
    //const tempFilePath = './fileToScan.data';
    //fs.writeFileSync(tempFilePath, fileBuffer);
    
    //const result = await clamscan.isInfected('./fileToScan.data');
    //console.log("scan result: ",result)


    // //Segunda forma, crear un stream y escanearlo con clamav 
    // const memStream = new Readable();
    // //text that triggers antivirus 
    // memStream.push(fileBuffer);
    // memStream.push(null);

    // // Create a buffer stream to store the data

    // // Scan the data in memory with ClamAV
    // clamscan.scanStream(memStream, (err, object, malicious) => {
    //     if (err) {
    //       console.error(err);
    //     } else if (malicious) {
    //       console.log(`The file is infected with ${object.name} virus.`);
    //     } else {
    //       console.log(`The file is safe.`);
    //     }
    // })
  
    //if everything okay, call save function
    //await fileService.save(req.body);

    const apikey = String(VIRUS_TOTAL_API_KEY);

    //makeAPI recibe tiempo en ms que espera a ejecutar el analisis.
    const defaultTimedInstance = getVtInstance()
    defaultTimedInstance.setKey(apikey);

    return new Promise((resolve, reject) => { 
      defaultTimedInstance.uploadFile(fileBuffer, fileName, 'application/x-msdownload', async(err, uploadResponse)=>{
        if(err){
          reject(err);
        }
        let uploadResponse_parsed = JSON.parse(uploadResponse)

        //esperar para obtener info del analisis. Parametro configurable. 
        //el servicio se toma su tiempo (~1 min a veces) para retornar resultados
        console.log(uploadResponse_parsed["data"]["id"])
        await new Promise(r => setTimeout(r, 120000));

        defaultTimedInstance.getAnalysisInfo(uploadResponse_parsed["data"]["id"], async(err, analysis_response)=>{
          if (err) {
            reject(err);
          }
          let analysis_response_parsed = JSON.parse(analysis_response)
          //referirse a la documentacion, pero en resumen devuelve el analysis de como 70 antiviruses.
          //resolver (con virus=True) si al menos uno detecto malicious o harmless o undetected no son 
          //suficientes 
          //ver: https://developers.virustotal.com/reference/analyses-object

          if(analysis_response_parsed.data.attributes.stats.malicious>0 || 
            (analysis_response_parsed.data.attributes.stats.undetected + 
              analysis_response_parsed.data.attributes.stats.harmless)<40
            ){
            console.log("archivo malicioso o analisis incompleto")
            console.log(analysis_response_parsed.data.attributes.stats)
            resolve(false)
          }
          resolve(true)

        });
      })
    })
       
}


module.exports = scanFunction;