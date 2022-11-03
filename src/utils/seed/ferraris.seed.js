const mongoose = require("mongoose");
const Ferrari = require('../../api/ferrari/ferrari.model');
const { DB_URL } = require('../database/db');
require('dotenv').config();

const ferraris = [
    {
        model: "296",
        name: "Ferrari 296 GTB",
        price: "238.956",
        power_cv: 830,
        max_speed: "350 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977726/lamborghini/ferrari-296-gtb-2021-side-view_vywps1.png"
    },
    {
        model: "296",
        name: "Ferrari 296 GTS",
        price: "238.956",
        power_cv: 830,
        max_speed: "350 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977726/lamborghini/ferrari-296-gts-side-view_srmozg.png"
    },
    {
        model: "sf90",
        name: "Ferrari SF90 Stradale",
        price: "238.956",
        power_cv: 830,
        max_speed: "350 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977726/lamborghini/ferrari-sf90-stradale-2019-side-view_htmmgt.png"
    },
    {
        model: "sf90",
        name: "Ferrari SF90 Spider",
        price: "473.000",
        power_cv: 1000,
        max_speed: "370 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1667509698/lamborghini/ferrari-sf90-spider-2019-side-view_qpa3jn.png"
    },
    {
        model: "Portofino",
        name: "Ferrari Portofino",
        price: "215.132",
        power_cv: 620,
        max_speed: "320 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1667509697/lamborghini/rosso-portofino_wfg3cj.png"
    },
    {
        model: "Roma",
        name: "Ferrari Roma",
        price: "209.705",
        power_cv: 620,
        max_speed: "320 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1667509697/lamborghini/roma_cif6mp.png"
    },
    {
        model: "812",
        name: "Ferrari 812 Superfast",
        price: "499.000",
        power_cv: 830,
        max_speed: "350 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1667509697/lamborghini/rosso-scuderia_rqrck2.png"
    },
    {
        model: "812",
        name: "Ferrari 812 GTS",
        price: "342.660",
        power_cv: 800,
        max_speed: "345 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1667509697/lamborghini/812-gts_uqg63c.png"
    },
    {
        model: "812",
        name: "Ferrari 812 Competizione A",
        price: "578.840",
        power_cv: 830,
        max_speed: "350 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1667509698/lamborghini/competizzione_a_nm1xf5.png"
    },
    {
        model: "F8",
        name: "Ferrari F8 Tributo",
        price: "236.000",
        power_cv: 720,
        max_speed: "340 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1667509697/lamborghini/nero_ukoe6q.png"
    },
    {
        model: "F8",
        name: "Ferrari F8 Spider",
        price: "262.000",
        power_cv: 720,
        max_speed: "340 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1667509697/lamborghini/giallo-modena_ukj976.png"
    },
];


mongoose.connect(DB_URL)
  .then(async () => {
    const allFerraris = await Ferrari.find().lean();
    
    if(!allFerraris.length) {
      console.log('[seed]: No se encuentram coches, continuo...')
    } else {
      console.log(`[seed]: Encontrados ${allFerraris.length} coches`);
      await Ferrari.collection.drop();
      console.log('[seed]: Coleccion cars eliminada');
    }
  })
  .catch((error) => console.log('[seed]: Error eliminando la colección', error))
  .then(async() => {
    await Ferrari.insertMany(ferraris);
    console.log('[seed]: Nuevos coches añadidos con exito');
  })
  .catch((error) => console.log('[seed]: Error añadiendo los nuevos coches', error))
  .finally(() => mongoose.disconnect());