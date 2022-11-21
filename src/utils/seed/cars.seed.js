const mongoose = require("mongoose");
const Car = require('../../api/cars/car.model');
const { DB_URL } = require('../database/db');
require('dotenv').config();

const cars = [
    {
        model: "aventador",
        name: "Aventador LP 780-4 Ultimate",
        price: "498.258" ,
        power_cv: "780",
        max_speed: "355 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977081/lamborghini/Lamborghini-Aventador-LP700-4_vamiit.png",
    },
    {
        model: "aventador",
        name: "Aventador LP 780-4 Ultimate Roadster",
        price: "525.362",
        power_cv: "780",
        max_speed: "355 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977081/lamborghini/Lamborghini-Aventador-LP720-4-Roadster-50-Anniversario_oizuwh.png",
    },
    {
        model: "aventador",
        name: "Aventador SVJ",
        price: "500.362",
        power_cv: "770",
        max_speed: "370 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977081/lamborghini/Lamborghini-Aventador-SVJ_uhiait.png",
    },
    {
        model: "aventador",
        name: "Aventador SVJ Roadster",
        price: "525.362",
        power_cv: "770",
        max_speed: "370 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977081/lamborghini/Lamborghini-Aventador-SVJ-Roadster_ztl5gn.png",
    },
    {
        model: "aventador",
        name: "Aventador S Coupe",
        price: "382.211",
        power_cv: "740",
        max_speed: "350 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977081/lamborghini/Lamborghini-Aventador-S-Coupe_eb7syn.png",
    },
    {
        model: "huracan",
        name: "Huracan Tecnica",
        price: "275.010" ,
        power_cv: "640",
        max_speed: "325 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977084/lamborghini/menu_hura_tecnica_01_kgisw3.png"
    },
    {
        model: "huracan",
        name: "Huracan Performante",
        price: "264.767",
        power_cv: "631",
        max_speed: "325 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977083/lamborghini/Lamborghini-Huraca%CC%81n-Performante_q3jmvq.png"
    },
    {
        model: "huracan",
        name: "Huracan Performante Spyder",
        price: "298.087",
        power_cv: "631",
        max_speed: "325 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977083/lamborghini/Lamborghini-Huraca%CC%81n-Performante-Spyder_rstplu.png"
    },
    {
        model: "huracan",
        name: "Huracan LP620-2 Super Trofeo",
        price: "500.087",
        power_cv: "620",
        max_speed: "280 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977082/lamborghini/Lamborghini-Huraca%CC%81n-LP-620-2-Super-Trofeo_uoo4bg.png"
    },
    {
        model: "huracan",
        name: "Huracan STO",
        price: "449.900",
        power_cv: "640",
        max_speed: "310 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977083/lamborghini/Lamborghini-Huraca%CC%81n-STO_ap6md9.png"
    },
    {
        model: "huracan",
        name: "Huracan EVO",
        price: "249.826",
        power_cv: "640",
        max_speed: "350 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977082/lamborghini/Lamborghini-Huraca%CC%81n-EVO_htagns.png"
    },
    {
        model: "huracan",
        name: "Huracan EVO Spyder",
        price: "238.700",
        power_cv: "640",
        max_speed: "350 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977082/lamborghini/Lamborghini-Huraca%CC%81n-EVO-Spyder_awwbjl.png"
    },
    {
        model: "huracan",
        name: "Huracan EVO RWD",
        price: "216.444",
        power_cv: "610",
        max_speed: "325 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977082/lamborghini/Lamborghini-Huraca%CC%81n-EVO-RWD_jfigxn.png"
    },
    {
        model: "huracan",
        name: "Huracan EVO RWD Spyder",
        price: "238.700",
        power_cv: "610",
        max_speed: "324 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977082/lamborghini/Lamborghini-Huraca%CC%81n-EVO-RWD-Spyder_bzbofx.png"
    },
    {
        model: "diablo",
        name: "Diablo GT",
        price: "238.700",
        power_cv: "575",
        max_speed: "338 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977081/lamborghini/lamborghini-diablo-gt_gpem6m.png"
    },
    {
        model: "diablo",
        name: "The Malcolm Forbes Diablo",
        price: "238.700",
        power_cv: "492",
        max_speed: "328 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977083/lamborghini/Lamborghini-The-Malcolm-Forbes-Diablo_unfqlz.png"
    },
    {
        model: "diablo",
        name: "Diablo SE30 (Special Edition)",
        price: "238.700",
        power_cv: "575",
        max_speed: "333 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977081/lamborghini/lamborghini-diablo-se30_no5luz.png"
    },
    {
        model: "diablo",
        name: "Diablo SV-R",
        price: "238.700",
        power_cv: "540",
        max_speed: "330 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977081/lamborghini/Lamborghini-Diablo-SV-R_wrbwgy.png"
    },
    {
        model: "diablo",
        name: "Diablo Alpine Edition",
        price: "238.700",
        power_cv: "530",
        max_speed: "335 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977081/lamborghini/Lamborghini-Diablo-Alpine-Edition_zwnc37.png"
    },
    {
        model: "gallardo",
        name: "Gallardo 5.0",
        price: "238.700",
        power_cv: "500",
        max_speed: "315 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977081/lamborghini/Lamborghini-Gallardo-5.0_siydup.png"
    },
    {
        model: "gallardo",
        name: "Gallardo Spyder",
        price: "238.700",
        power_cv: "520",
        max_speed: "315 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977082/lamborghini/Lamborghini-Gallardo-Spyder_k17ijr.png"
    },
    {
        model: "gallardo",
        name: "Gallardo Superleggera",
        price: "238.700",
        power_cv: "530",
        max_speed: "335 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977082/lamborghini/Lamborghini-Gallardo-Superleggera_il1kjn.png"
    },
    {
        model: "gallardo",
        name: "Gallardo LP560-4",
        price: "238.700",
        power_cv: "552",
        max_speed: "325 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977082/lamborghini/Lamborghini-Gallardo-LP560-4_bnrfrc.png"
    },
    {
        model: "gallardo",
        name: "Gallardo LP570-4 Squadra Corse",
        price: "238.700",
        power_cv: "570",
        max_speed: "320 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977082/lamborghini/Lamborghini-Gallardo-LP570-4-Squadra-Corse-1_s4blpa.png"
    },
    {
        model: "gallardo",
        name: "Gallardo LP570-4 Spyder Performante",
        price: "238.700",
        power_cv: "562",
        max_speed: "325 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977082/lamborghini/Lamborghini-Gallardo-LP570-4-Spyder-Performante-1_ycmpx8.png"
    },
    {
        model: "murcielago",
        name: "Murcielago 6.2",
        price: "238.700",
        power_cv: "580",
        max_speed: "330 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977083/lamborghini/Lamborghini-Murcie%CC%81lago-6.2_v8lyhc.png"
    },
    {
        model: "murcielago",
        name: "Murcielago LP640",
        price: "238.700",
        power_cv: "640",
        max_speed: "340 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977083/lamborghini/Lamborghini-Murcie%CC%81lago-LP640_t4oyfr.png"
    },
    {
        model: "murcielago",
        name: "Murcielago LP640 Roadster",
        price: "238.700",
        power_cv: "640",
        max_speed: "330 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977083/lamborghini/Lamborghini-Murcie%CC%81lago-LP640-Roadster-1_mmax4p.png"
    },
    {
        model: "murcielago",
        name: "Murcielago LP670-4 SuperVeloce",
        price: "238.700",
        power_cv: "670",
        max_speed: "340 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977084/lamborghini/Lamborghini-Murcie%CC%81lago-LP-670-4-SuperVeloce_sdndsz.png"
    },
    {
        model: "murcielago",
        name: "Murcielago 40th Anniversary",
        price: "238.700",
        power_cv: "580",
        max_speed: "330 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977083/lamborghini/Lamborghini-Murcie%CC%81lago-40th-Anniversary_wjv8ao.png"
    },
    {
        model: "murcielago",
        name: "Murcielago LP640 Versace Edition",
        price: "238.700",
        power_cv: "640",
        max_speed: "340 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977083/lamborghini/Lamborghini-Murcie%CC%81lago-LP-640-Versace-Edition_hnn17g.png"
    },
    {
        model: "urus",
        name: "Urus S",
        price: "265.443",
        power_cv: "666",
        max_speed: "305 km/h",
        img:"https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977084/lamborghini/Lamborghini-Urus_cr0f0s.png"
    },
    {
        model: "urus",
        name: "Urus Performante",
        price: "296.596",
        power_cv: "666",
        max_speed: "306 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977084/lamborghini/Lamborghini-Urus-Graphite-Capsule_pxoklw.png"
    },
    {
        model: "urus",
        name: "Urus",
        price: "232.715",
        power_cv: "650",
        max_speed: "305 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977084/lamborghini/Lamborghini-Urus_1_ows920.png"
    },
    {
        model: "urus",
        name: "Urus Pearl Capsule",
        price: "186.134",
        power_cv: "650",
        max_speed: "305 km/h",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977084/lamborghini/Lamborghini-Urus-Pearl-Capsule-1_iciprv.png"
    },
    {
        model: "urus",
        name: "Urus Graphite Capsule",
        price: "186.134",
        power_cv: "650",
        max_speed: "305 km/h",
        img : "https://res.cloudinary.com/dj0q4vclw/image/upload/v1666977084/lamborghini/Lamborghini-Urus-Graphite-Capsule_pxoklw.png",
    },
];




mongoose.connect(DB_URL)
  .then(async () => {
    const allCars = await Car.find().lean();
    
    if(!allCars.length) {
      console.log('[seed]: No se encuentram coches, continuo...')
    } else {
      console.log(`[seed]: Encontrados ${allCars.length} coches`);
      await Car.collection.drop();
      console.log('[seed]: Coleccion cars eliminada');
    }
  })
  .catch((error) => console.log('[seed]: Error eliminando la colección', error))
  .then(async() => {
    await Car.insertMany(cars);
    console.log('[seed]: Nuevos coches añadidos con exito');
  })
  .catch((error) => console.log('[seed]: Error añadiendo los nuevos coches', error))
  .finally(() => mongoose.disconnect());