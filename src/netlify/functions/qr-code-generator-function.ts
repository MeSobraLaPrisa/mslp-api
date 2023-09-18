import axios from "axios";

const fs = require('fs');
const qr = require('qrcode');

export async function generateQRCodeWithId() {
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
  // const bufferImage = await qr.toFile('/Users/gonzalo/Documents/Projects/mslp-api/assets/qrcode.png', urlWithId, qrOption);

  const qrDataUrl = await qr.toDataURL(urlWithId, qrOption);

  console.log('Código QR generado y guardado en /Users/gonzalo/Documents/Projects/mslp-api/assets/qrcode.png');

  const notifyWaveUrl = 'https://metricswave.com/webhooks/f1508aa4-eb80-4baa-8d95-213cbdec408d?';
  // Llamada GET cona la notifyWaveUrl

    axios.get(notifyWaveUrl)
      .then(res => {
        console.log('Status Code:', res.status);

      })
      .catch(err => {
        console.log('Error: ', err.message);
      });

  return qrDataUrl;
};

