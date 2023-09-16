import express from 'express';
// import { generateQRCodeWithId } from './src/qrcodes';
import qr from 'qrcode';

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/qrCodeController/create', async (req, res) => {
  // const qrCode = await generateQRCodeWithId();
   // URL a la que apunta el código QR (sin cambios en la URL real)
   const url = 'https://www.instagram.com/mesobralaprisa/';
  
   // TODO: Identificador personalizado
   const identifier = '12345';
   
   // Agregar el identificador como un parámetro de consulta
   const urlWithId = `${url}`;
   
   const qrOption = { 
     margin: 7,
     width: 175
   };
   
   // Crear el código QR con los datos combinados
   const bufferImage = await qr.toFile('/Users/gonzalo/Documents/Projects/mslp-api/assets/qrcode.png', urlWithId, qrOption);
 
   console.log('Código QR generado y guardado en /Users/gonzalo/Documents/Projects/mslp-api/assets/qrcode.png');
 
   const qrDataUrl = await qr.toDataURL(urlWithId, qrOption);
   console.log('Código QR generado como cadena base64:', qrDataUrl);

  res.send({result: qrDataUrl})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})