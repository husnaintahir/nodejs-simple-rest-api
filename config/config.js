const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    cloudinary_cloudname: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_apikey: process.env.CLOUDINARY_API_KEY,
    cloudinary_apisecret: process.env.CLOUDINARY_API_SECRET,
    email_send_address: process.env.EMAIL_SEND_ADDRESS,
    email_send_password: process.env.EMAIL_SEND_PASSWORD,
    host: process.env.HOST_ADDRESS,
    FCM_AUTH_KEY: process.env.FCM_AUTH_KEY,
    WEATHER_APP_ID: process.env.WEATHER_APP_ID,
    merchant_email: process.env.MERCHANT_EMAIL,
    payment_secret_key: process.env.PTAB_SECRET_KEY,
    ip_merchant: process.env.MERCHANT_IP,
    paytabs_createpage_url: process.env.PAYTABS_CREATEPAGE_URL,
    paytabs_verifypayment_url: process.env.PAYTABS_VERIFYPAYMENT_URL,

    
    payment_site_url: process.env.PAYMENT_SITE_URL,
    payment_return_url: process.env.PAYMENT_RETURN_URL,

    // payment_site_url: "https://1235ec8a.ngrok.io",
    // payment_return_url: "https://1235ec8a.ngrok.io/payments/callback",
}