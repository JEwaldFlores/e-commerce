import { config as dotenvConfig } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenvConfig({ path: '.env.development' }); // ✅ Carga variables

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function testCloudinary() {
  try {
    const result = await cloudinary.api.ping();
    console.log('✅ Conexión exitosa con Cloudinary:', result);
  } catch (error) {
    console.error('❌ Error de conexión con Cloudinary:', error);
  }
}

testCloudinary();
testCloudinary();