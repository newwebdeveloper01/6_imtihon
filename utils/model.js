const {readFileSync , writeFileSync}=require('fs');
const {resolve}=require('path');



function read (fileName) {
  const data = readFileSync( resolve('db', fileName + '.json'), 'utf-8' )
  return JSON.parse(data)
}


function write(fileName, data) {
  writeFileSync(resolve('db', fileName + '.json'), JSON.stringify(data, null, 4));
  return true;
}


module.exports={ read , write };
