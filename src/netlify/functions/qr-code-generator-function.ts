import { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import axios from "axios";
const fs = require('fs');
const qr = require('qrcode');

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    console.log('qr-code-generator-function => event: ', event);
    console.log('qr-code-generator-function => context: ', context);

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
    const qrDataUrl = await qr.toDataURL(urlWithId, qrOption);

    console.log('Código QR generado y guardado en /Users/gonzalo/Documents/Projects/mslp-api/assets/qrcode.png');

    const notifyWaveUrl = 'https://metricswave.com/webhooks/f1508aa4-eb80-4baa-8d95-213cbdec408d?';

    // Llamada GET a la notifyWaveUrl
    const response = await axios.get(notifyWaveUrl);
    console.log('Status Code:', response.status);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'QR Code generado y notificación enviada correctamente',
        qrDataUrl: qrDataUrl,
      }),
    };
  } catch (error: any) { // Especificamos el tipo de 'error' como 'any'
    console.error('Error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error al generar el QR Code o enviar la notificación',
      }),
    };
  }
};
