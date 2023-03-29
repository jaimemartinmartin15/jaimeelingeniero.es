const fs = require("fs");

/*
 * // TODO
 * Pon aquí el path donde quieres generar el fichero (con el nombre del fichero incluido acabado en .sql)
 */
const cargaBDPath = "cargaBD.sql";

function generarNombreTaller() {
  const adjetivos = [
    "Rápido",
    "Experto",
    "Hábil",
    "Innovador",
    "Eficiente",
    "Preciso",
    "Oportuno",
    "Seguro",
    "Fiable",
    "Profesional",
  ];
  const nombres = [
    "Mecánica",
    "Reparación",
    "Mantenimiento",
    "Servicio",
    "Técnica",
    "Automotriz",
    "Electromecánica",
    "Diagnóstico",
    "Chapa y Pintura",
    "Neumáticos",
  ];
  const sufijos = [
    "del Motor",
    "de Coches",
    "de Autos",
    "Automotriz",
    "Mecánico",
    "de Reparación",
    "Express",
    "Técnico",
    "Mantenimiento",
    "Total",
  ];

  const randomAdjetivo =
    adjetivos[Math.floor(Math.random() * adjetivos.length)];
  const randomNombre = nombres[Math.floor(Math.random() * nombres.length)];
  const randomSufijo = sufijos[Math.floor(Math.random() * sufijos.length)];

  return `${randomNombre} ${randomAdjetivo} ${randomSufijo}`;
}

const CIUDADES_MECANICO = [
  "Almería",
  "Burgos",
  "Cáceres",
  "Castellón de la Plana",
  "Cuenca",
  "Girona",
  "Huelva",
  "Lugo",
  "Teruel",
  "Zamora",
];
CIUDADES_MECANICO.sort(() => Math.random() - 0.5);

const TABLA_MECANICO = [];
for (let id = 1; id <= 10; id++) {
  const nombreTaller = generarNombreTaller();
  const ciudad = CIUDADES_MECANICO[id - 1];
  TABLA_MECANICO.push([id, nombreTaller, ciudad]);
}

fs.appendFileSync(
  cargaBDPath,
  "/************ CARGA DE LA TABLA MECANICO (CODIGO, NOMBRE, CIUDAD) ************/\n\n"
);
TABLA_MECANICO.forEach((row) => {
  fs.appendFileSync(
    cargaBDPath,
    `insert into MECANICO values (${row[0]}, '${row[1]}', '${row[2]}');\n`
  );
});

const MARCAS = [
  ["Toyota", "Japón"],
  ["Ford", "Estados Unidos"],
  ["BMW", "Alemania"],
  ["Audi", "Alemania"],
  ["Mercedes-Benz", "Alemania"],
  ["Volkswagen", "Alemania"],
  ["Nissan", "Japón"],
  ["Chevrolet", "Estados Unidos"],
  ["Honda", "Japón"],
  ["Hyundai", "Corea del Sur"],
  ["Kia", "Corea del Sur"],
  ["Mazda", "Japón"],
  ["Volvo", "Suecia"],
  ["Peugeot", "Francia"],
  ["Fiat", "Italia"],
  ["Seat", "España"],
  ["Tesla", "Estados Unidos"],
  ["Renault ", "Francia"],
];

const TABLA_MARCA = [];
MARCAS.forEach((marca, i) => TABLA_MARCA.push([i + 1, marca[0], marca[1]]));

fs.appendFileSync(
  cargaBDPath,
  "\n\n/************ CARGA DE LA TABLA MARCA (CODIGO, NOMBRE, SEDE) ************/\n"
);
TABLA_MARCA.forEach((row) => {
  fs.appendFileSync(
    cargaBDPath,
    `insert into MARCA values(${row[0]}, '${row[1]}', '${row[2]}');\n`
  );
});

const TABLA_PROPULSION = [
  [1, "Gasolina"],
  [2, "Diésel"],
  [3, "Híbrido eléctrico"],
  [4, "Híbrido enchufable"],
  [5, "Eléctrico"],
  [6, "Hidrógeno"],
  [7, "Híbrido"],
  [8, "GNC"],
];

fs.appendFileSync(
  cargaBDPath,
  "\n\n/************ CARGA DE LA TABLA PROPULSION (ID, NOMBRE) ************/\n"
);
TABLA_PROPULSION.forEach((row) => {
  fs.appendFileSync(
    cargaBDPath,
    `insert into PROPULSION values(${row[0]}, '${row[1]}');\n`
  );
});

const TOYOTA_MODELOS = [
  ["Corolla", [1, 3]],
  ["Yaris", [1, 3]],
  ["RAV4", [1, 3]],
  ["C-HR", [1, 3]],
  ["Camry", [1, 3]],
  ["Prius", [3]],
  ["Mirai", [6]],
  ["GR Supra", [1]],
  ["GT86", [1]],
  ["Land Cruiser", [1, 2]],
];

const FORD_MODELOS = [
  ["Fiesta", [1, 2]],
  ["Focus", [1, 2, 3]],
  ["Mondeo", [1, 2, 3]],
  ["Kuga", [1, 2, 4]],
  ["EcoSport", [1, 2]],
  ["Puma", [1, 2, 3]],
  ["Mustang", [1]],
  ["Edge", [2]],
  ["Ranger", [2]],
  ["Transit", [2]],
];

const BMW_MODELOS = [
  ["Serie 1", [1, 2, 4]],
  ["Serie 2", [1, 2, 4]],
  ["Serie 3", [1, 2, 4]],
  ["Serie 4", [1, 2, 4]],
  ["Serie 5", [1, 2, 4]],
  ["Serie 6", [1, 2, 4]],
  ["Serie 7", [1, 2, 4]],
  ["X1", [1, 2, 4]],
  ["X2", [1, 2, 4]],
  ["X3", [1, 2, 4]],
  ["X4", [1, 2, 4]],
  ["X5", [1, 2, 4]],
  ["X6", [1, 2, 4]],
  ["X7", [1, 2, 4]],
  ["i3", [5, 4]],
  ["i8", [4]],
];

const AUDI_MODELOS = [
  ["A1", [1]],
  ["A2", [1]],
  ["A3", [1]],
  ["A4", [2]],
  ["A5", [1]],
  ["A6", [2]],
  ["A7", [1]],
  ["A8", [7]],
  ["Q2", [1]],
  ["Q3", [2]],
  ["Q4", [5]],
  ["Q5", [7]],
  ["Q7", [2]],
  ["Q8", [1]],
  ["TT", [1]],
];

const MERCEDES_MODELOS = [
  ["Clase A", [1]],
  ["Clase B", [2]],
  ["Clase C", [7]],
  ["Clase E", [5]],
  ["Clase G", [1]],
  ["Clase S", [7]],
  ["GLA", [1]],
  ["GLB", [2]],
  ["GLC", [7]],
  ["GLE", [5]],
  ["GLS", [1]],
  ["AMG GT", [1]],
  ["EQC", [5]],
];

const VOLKSWAGEN_MODELOS = [
  ["Golf", [1, 2, 7, 5]],
  ["Polo", [1, 2, 7]],
  ["Passat", [1, 2, 7]],
  ["Tiguan", [1, 2, 7]],
  ["Touareg", [1, 2, 7]],
  ["Arteon", [1, 2, 7]],
  ["Up", [1, 5]],
  ["ID.3", [5]],
  ["ID.4", [5]],
  ["Caddy", [1, 2, 7]],
];

const NISSAN_MODELOS = [
  ["Micra", [1, 5]],
  ["Qashqai", [1, 2, 7, 5]],
  ["Juke", [1, 2, 7]],
  ["Leaf", [5]],
  ["GT-R", [1]],
];

const CHEVROLET_MODELOS = [
  ["Bel Air", [1]],
  ["Camaro", [1]],
  ["Chevelle", [1]],
  ["Corvette", [1]],
  ["Impala", [1]],
  ["Nova", [1]],
];

const HONDA_MODELOS = [
  ["Accord", [1, 2]],
  ["Civic", [1, 2, 5]],
  ["CR-V", [1, 7]],
  ["HR-V", [1, 7]],
  ["Jazz", [1, 7]],
  ["NSX", [7]],
];

const HYUNDAI_MODELOS = [
  ["Accent", [1]],
  ["Elantra", [1, 7]],
  ["i10", [1]],
  ["i20", [1, 2]],
  ["i30", [1, 2, 7]],
  ["Kona", [1, 7, 5]],
  ["Santa Fe", [1, 2, 7]],
  ["Tucson", [1, 2, 7]],
];

const KIA_MODELOS = [
  ["Picanto", [1, 2]],
  ["Rio", [1, 2]],
  ["Stonic", [1, 2]],
  ["Niro", [7, 5]],
  ["Ceed", [1, 2]],
  ["Sportage", [1, 2]],
  ["Sorento", [1, 2]],
  ["Telluride", [1]],
];

const MAZDA_MODELOS = [
  ["2", [1, 2, 7]],
  ["3", [1, 2, 7]],
  ["CX-30", [1, 2, 7]],
  ["CX-5", [1, 2, 7]],
];

const VOLVO_MODELOS = [
  ["XC90", [1, 2, 4, 5]],
  ["XC60", [1, 2, 4, 5]],
  ["XC40", [1, 2, 4, 5]],
  ["S90", [1, 2, 4]],
  ["S60", [1, 2, 4]],
  ["V90", [1, 2, 4]],
  ["V60", [1, 2, 4]],
];

const PEUGEOT_MODELOS = [
  ["108", [1]],
  ["208", [1, 2, 5]],
  ["2008", [1, 2, 5]],
  ["308", [1, 2]],
  ["3008", [1, 2, 5]],
  ["508", [1, 2, 5]],
  ["5008", [1, 2, 5]],
  ["Rifter", [1, 2]],
  ["Traveller", [1, 2]],
  ["Partner", [1, 2]],
  ["Expert", [1, 2]],
  ["Boxer", [1, 2]],
];

const FIAT_MODELOS = [
  ["500", [1, 5]],
  ["500L", [1]],
  ["500X", [1]],
  ["Panda", [1, 8]],
  ["Tipo", [1, 2, 8]],
  ["Doblo", [1, 2, 8]],
  ["Qubo", [1, 2]],
  ["Tipo Cross", [1, 2]],
  ["500e", [5]],
  ["500C", [1]],
  ["Talento", [2]],
  ["Ducato", [2]],
  ["Punto", [1, 2]],
  ["Freemont", [1, 2]],
  ["500L Living", [1, 2]],
  ["124 Spider", [1]],
  ["Fullback", [2]],
  ["Tipo Station Wagon", [1, 2]],
  ["Tipo Sedan", [1, 2, 8]],
  ["500L Cross", [1, 2]],
  ["500L Trekking", [1, 2]],
  ["500L Urban", [1, 2]],
  ["500S", [1]],
  ["500C Cabrio", [1]],
  ["500L MPV", [1, 2]],
  ["500 Spiaggina 58", [1]],
];

const SEAT_MODELOS = [
  ["Arona", [1, 2, 5, 4]],
  ["Ateca", [1, 2, 4]],
  ["Ibiza", [1, 2]],
  ["Leon", [1, 2, 5, 4]],
  ["Tarraco", [1, 2, 4]],
];

const TESLA_MODELOS = [
  ["Model S", [5]],
  ["Model 3", [5]],
  ["Model X", [5]],
  ["Model Y", [5]],
];

const RENAULT_MODELOS = [
  ["Clio", [1, 2, 7]],
  ["Mégane", [1, 2, 7]],
  ["Captur", [1, 2, 7]],
  ["Zoe", [5]],
  ["Kadjar", [1, 2, 7]],
  ["Talisman", [1, 2, 7]],
  ["Scénic", [1, 2, 7]],
  ["Twingo", [1, 5]],
  ["Koleos", [1, 2, 7]],
  ["Clio", [1]],
  ["Laguna", [1, 2, 7]],
];

// same order than MARCAS
const ALL_MODELS = [
  TOYOTA_MODELOS,
  FORD_MODELOS,
  BMW_MODELOS,
  AUDI_MODELOS,
  MERCEDES_MODELOS,
  VOLKSWAGEN_MODELOS,
  NISSAN_MODELOS,
  CHEVROLET_MODELOS,
  HONDA_MODELOS,
  HYUNDAI_MODELOS,
  KIA_MODELOS,
  MAZDA_MODELOS,
  VOLVO_MODELOS,
  PEUGEOT_MODELOS,
  FIAT_MODELOS,
  SEAT_MODELOS,
  TESLA_MODELOS,
  RENAULT_MODELOS,
];

const TABLA_COCHE = [];
let car_counter = 1;
MARCAS.forEach((_, mai) => {
  ALL_MODELS[mai].forEach((model) => {
    model[1].forEach((propulsion) => {
      TABLA_COCHE.push([car_counter++, mai + 1, model[0], propulsion]);
    });
  });
});

fs.appendFileSync(
  cargaBDPath,
  "\n\n/************ CARGA DE LA TABLA COCHE (CODIGO, COD_MARCA, MODELO, COD_PROP) ************/\n"
);
TABLA_COCHE.forEach((row) => {
  fs.appendFileSync(
    cargaBDPath,
    `insert into COCHE values (${row[0]}, ${row[1]}, '${row[2]}', ${row[3]});\n`
  );
});

// Generar una fecha aleatoria entre startDate y endDate
function generarFechaAleatoria(startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const randomTime = start + Math.random() * (end - start);
  const randomDate = new Date(randomTime).toISOString().slice(0, 10);
  return randomDate;
}

// Generar un valor decimal aleatorio entre min y max euros
function generarPrecioAleatorio(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

const TABLA_REPARA = [];
for (let i = 1; i <= 450; i++) {
  const codMecanico = Math.floor(Math.random() * TABLA_MECANICO.length) + 1;
  const codCoche = Math.floor(Math.random() * TABLA_COCHE.length) + 1;
  const fecha = generarFechaAleatoria("2015-01-01", "2023-03-24");
  const precio = generarPrecioAleatorio(100, 5000);
  TABLA_REPARA.push([i, codMecanico, codCoche, fecha, precio]);
}

fs.appendFileSync(
  cargaBDPath,
  "\n\n/************ CARGA DE LA TABLA REPARA (ID, COD_MECANICO, COD_COCHE, FECHA, PRECIO) ************/\n"
);
TABLA_REPARA.forEach((row) => {
  fs.appendFileSync(
    cargaBDPath,
    `insert into REPARA values (${row[0]}, ${row[1]}, ${row[2]}, '${row[3]}', ${row[4]});\n`
  );
});

const CIUDADES_CONCESIONARIO = [
  "Madrid",
  "Barcelona",
  "Valencia",
  "Sevilla",
  "Zaragoza",
  "Málaga",
  "Murcia",
  "Palma",
  "Las Palmas de Gran Canaria",
  "Bilbao",
  "Alicante",
  "Córdoba",
  "Valladolid",
  "Vigo",
  "Gijón",
];

function generarHoraApertura() {
  const hora = Math.floor(Math.random() * 4) + 8; // generamos un número aleatorio entre 8 y 11 (ambos inclusive)
  const minutos = Math.floor(Math.random() * 2) * 30; // generamos 0 o 30 aleatoriamente
  return `${hora.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:00`;
}

function generarHoraCierre() {
  const hora = Math.floor(Math.random() * 4) + 18; // generamos un número aleatorio entre 18 y 21 (ambos inclusive)
  const minutos = Math.floor(Math.random() * 2) * 30; // generamos 0 o 30 aleatoriamente
  return `${hora.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:00`;
}

const TABLA_CONCESIONARIO = [];
for (let i = 0; i < CIUDADES_CONCESIONARIO.length; i++) {
  const horaApertura = generarHoraApertura(); // genera una hora entre las 08:00:00 y las 11:00:00
  const horaCierre = generarHoraCierre(); // genera una hora entre las 18:00:00 y las 21:00:00
  TABLA_CONCESIONARIO.push([
    i + 1,
    CIUDADES_CONCESIONARIO[i],
    horaApertura,
    horaCierre,
  ]);
}

fs.appendFileSync(
  cargaBDPath,
  "\n\n/************ CARGA DE LA TABLA CONCESIONARIO (CODIGO, LOCALIDAD, HORA_APERTURA, HORA_CIERRE) ************/\n"
);
TABLA_CONCESIONARIO.forEach((row) => {
  fs.appendFileSync(
    cargaBDPath,
    `insert into CONCESIONARIO values (${row[0]}, '${row[1]}', '${row[2]}', '${row[3]}');\n`
  );
});

const TABLA_OFRECE = [];

// Generar al menos una oferta por cada concesionario
for (
  let codConcesionario = 1;
  codConcesionario <= TABLA_CONCESIONARIO.length;
  codConcesionario++
) {
  const codCoche = Math.floor(Math.random() * TABLA_COCHE.length) + 1;
  const cantidad = Math.floor(Math.random() * 31) + 10;
  TABLA_OFRECE.push([codCoche, codConcesionario, cantidad]);
}

// Generar al menos una oferta por cada coche
for (let codCoche = 1; codCoche <= TABLA_COCHE.length; codCoche++) {
  let codConcesionario;
  do {
    codConcesionario =
      Math.floor(Math.random() * TABLA_CONCESIONARIO.length) + 1;
  } while (
    TABLA_OFRECE.some(
      (oferta) => oferta[0] === codCoche && oferta[1] === codConcesionario
    )
  );
  const cantidad = Math.floor(Math.random() * 31) + 10;
  TABLA_OFRECE.push([codCoche, codConcesionario, cantidad]);
}

// Generar el resto de ofertas
for (let i = TABLA_OFRECE.length; i < 800; i++) {
  let codCoche = 0;
  let codConcesionario = 0;
  do {
    codCoche = Math.floor(Math.random() * 353) + 1;
    codConcesionario = Math.floor(Math.random() * 15) + 1;
  } while (
    TABLA_OFRECE.some(
      (oferta) => oferta[0] === codCoche && oferta[1] === codConcesionario
    )
  );

  const cantidad = Math.floor(Math.random() * 31) + 10;
  TABLA_OFRECE.push([codCoche, codConcesionario, cantidad]);
}

fs.appendFileSync(
  cargaBDPath,
  "\n\n/************ CARGA DE LA TABLA OFRECE (COD_COCHE, COD_CONCESIONARIO, CANTIDAD) ************/\n"
);
TABLA_OFRECE.sort(() => Math.random() - 0.5).forEach((row) => {
  fs.appendFileSync(
    cargaBDPath,
    `insert into OFRECE values (${row[0]}, ${row[1]}, ${row[2]});\n`
  );
});

function generarNombreYApellidos() {
  const NOMBRES = [
    "Lucía",
    "Hugo",
    "Sofía",
    "Jaime",
    "María",
    "Lucas",
    "Valentina",
    "Mateo",
    "Paula",
    "Daniel",
    "Carmen",
    "Pablo",
    "Julia",
    "David",
    "Adriana",
    "Alejandro",
    "Emma",
    "Leo",
    "Carla",
    "Jorge",
    "Alba",
    "Diego",
    "Claudia",
    "Miguel",
    "Marta",
    "Javier",
    "Natalia",
    "Manuel",
    "Ana",
    "Álvaro",
    "Laura",
    "Fernando",
    "Cristina",
    "Carlos",
    "Isabel",
    "José",
    "Celia",
    "Juan",
    "Elena",
    "Pedro",
    "Andrea",
    "Rafael",
    "Silvia",
    "José Antonio",
    "Alicia",
    "Juan Carlos",
    "Rosa",
    "Rubén",
    "Patricia",
    "Iván",
    "Sara",
    "Francisco",
    "Eva",
    "Jesús",
    "Miriam",
    "Antonio",
    "Lorena",
    "Raúl",
    "Irene",
    "Ángel",
    "Carmen María",
    "Guillermo",
    "Marina",
    "Enrique",
    "Mercedes",
    "Mariano",
    "Gloria",
    "Víctor",
    "Raquel",
    "Óscar",
    "Luisa",
    "Ignacio",
    "Verónica",
    "Joaquín",
    "Beatriz",
  ];
  const APELLIDOS = [
    "García",
    "González",
    "Rodríguez",
    "Fernández",
    "López",
    "Martínez",
    "Sánchez",
    "Pérez",
    "Gómez",
    "Martín",
    "Jiménez",
    "Ruiz",
    "Hernández",
    "Díaz",
    "Moreno",
    "Álvarez",
    "Muñoz",
    "Romero",
    "Alonso",
    "Gutiérrez",
    "Navarro",
    "Torres",
    "Domínguez",
    "Vázquez",
    "Ramos",
    "Gil",
    "Ramírez",
    "Serrano",
    "Blanco",
    "Suárez",
    "Molina",
    "Morales",
    "Ortega",
    "Delgado",
    "Castro",
    "Ortiz",
    "Rubio",
    "Marín",
    "Sanz",
    "Iglesias",
    "Nuñez",
    "Medina",
    "Santos",
    "Castillo",
    "Cortés",
    "Lozano",
    "Guerrero",
    "Cano",
    "Prieto",
    "Méndez",
    "Calvo",
    "Gallego",
    "Vidal",
  ];
  const nombre = NOMBRES[Math.floor(Math.random() * NOMBRES.length)];
  const apellido1 = APELLIDOS[Math.floor(Math.random() * APELLIDOS.length)];
  const apellido2 = APELLIDOS[Math.floor(Math.random() * APELLIDOS.length)];
  return `${nombre} ${apellido1} ${apellido2}`;
}

function generarDNI() {
  const letras = "ABCDEFGHJKLMPNQRSTVWXYZ";
  const numeros = Math.floor(Math.random() * 99999999) + 1;
  const letra = letras.charAt(numeros % 23);
  return numeros.toString().padStart(8, "0") + letra;
}

function generarTelefono() {
  let prefijo = Math.random() < 0.5 ? "9" : "6";
  let numero = prefijo;
  for (let i = 0; i < 8; i++) {
    numero += Math.floor(Math.random() * 10);
  }
  return numero;
}

const TABLA_CLIENTE = [];

for (let cliente = 0; cliente < 400; cliente++) {
  TABLA_CLIENTE.push([
    generarDNI(),
    generarNombreYApellidos(),
    generarFechaAleatoria("1955-01-01", "2000-03-24"),
    generarTelefono(),
  ]);
}

fs.appendFileSync(
  cargaBDPath,
  "\n\n/************ CARGA DE LA TABLA CLIENTE (DNI, NOMBRE, FECHA_NAC, TELEFONO) ************/\n"
);
TABLA_CLIENTE.forEach((row) => {
  fs.appendFileSync(
    cargaBDPath,
    `insert into CLIENTE values ('${row[0]}', '${row[1]}', '${row[2]}', '${row[3]}');\n`
  );
});

function generarNumeroAleatorio(maximo) {
  return Math.floor(Math.random() * maximo) + 1;
}

const TABLA_VENTA = [];

// asegurar que cada cliente hace al menos una compra
TABLA_CLIENTE.forEach((cliente, i) => {
  const ofrece = TABLA_OFRECE[generarNumeroAleatorio(TABLA_OFRECE.length - 1)];
  TABLA_VENTA.push([
    i + 1,
    cliente[0],
    ofrece[0],
    ofrece[1],
    generarPrecioAleatorio(15000, 50000),
    generarFechaAleatoria("1995-01-01", "2022-12-31"),
  ]);
});

// añadir alguna compra mas de clientes aleatorios
for (let i = TABLA_VENTA.length + 1; i <= 600; i++) {
  const ofrece = TABLA_OFRECE[generarNumeroAleatorio(TABLA_OFRECE.length - 1)];
  TABLA_VENTA.push([
    i,
    TABLA_CLIENTE[generarNumeroAleatorio(TABLA_CLIENTE.length - 1)][0],
    ofrece[0],
    ofrece[1],
    generarPrecioAleatorio(15000, 50000),
    generarFechaAleatoria("1995-01-01", "2022-12-31"),
  ]);
}

fs.appendFileSync(
  cargaBDPath,
  "\n\n/************ CARGA DE LA TABLA VENTA (NUM_FACTURA, COD_CLIENTE, COD_COCHE, COD_CONCESIONARIO, PRECIO, FECHA) ************/\n"
);
TABLA_VENTA.forEach((row) => {
  fs.appendFileSync(
    cargaBDPath,
    `insert into VENTA values (${row[0]}, '${row[1]}', ${row[2]}, ${row[3]}, ${row[4]}, '${row[5]}');\n`
  );
});
