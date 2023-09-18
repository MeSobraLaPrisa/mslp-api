import type { Handler } from "@netlify/functions";
import postgres from "postgres";

const handler: Handler = async function(event, context) {
  
    const connectionUri = process.env.POLYSCALE_CUSTOMERS_CONNECTION_URI as string;
    
    if (!connectionUri) {
        throw new Error("POLYSCALE_CUSTOMERS_CONNECTION_URI no está configurado en las variables de entorno.");
    }

const sql = postgres(connectionUri);


  const products = await sql`SELECT * from products`;

  console.log("products", products);

  return {
    statusCode: 200,
    body: JSON.stringify({
        products,
    }),
  };
};

export { handler };
