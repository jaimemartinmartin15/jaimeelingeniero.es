const fs = require('fs');
const cargaBDPath = "UPDATE THE PATH HERE"; // TODO

function generarNombreTaller() {
  const adjetivos = ['Rápido', 'Experto', 'Hábil', 'Innovador', 'Eficiente', 'Preciso', 'Oportuno', 'Seguro', 'Fiable', 'Profesional'];
  const nombres = ['Mecánica', 'Reparación', 'Mantenimiento', 'Servicio', 'Técnica', 'Automotriz', 'Electromecánica', 'Diagnóstico', 'Chapa y Pintura', 'Neumáticos'];
  const sufijos = ['del Motor', 'de Coches', 'de Autos', 'Automotriz', 'Mecánico', 'de Reparación', 'Express', 'Técnico', 'Mantenimiento', 'Total'];

  const randomAdjetivo = adjetivos[Math.floor(Math.random() * adjetivos.length)];
  const randomNombre = nombres[Math.floor(Math.random() * nombres.length)];
  const randomSufijo = sufijos[Math.floor(Math.random() * sufijos.length)];

  return `${randomNombre} ${randomAdjetivo} ${randomSufijo}`;
}

const CIUDADES_MECANICO = [  "Almería",  "Burgos",  "Cáceres",  "Castellón de la Plana",  "Cuenca",  "Girona",  "Huelva",  "Lugo",  "Teruel",  "Zamora"];
CIUDADES_MECANICO.sort(() => Math.random() - 0.5);

const TABLA_MECANICO = [];
for(let id = 1; id <= 10; id++) {
  const nombreTaller = generarNombreTaller();
  const ciudad = CIUDADES_MECANICO[id-1];
  TABLA_MECANICO.push([id, nombreTaller, ciudad]);
}

fs.appendFileSync(cargaBDPath, '/************ CARGA DE LA TABLA MECANICO (CODIGO, NOMBRE, CIUDAD) ************/\n\n');
TABLA_MECANICO.forEach(row => {
  fs.appendFileSync(cargaBDPath, `insert into MECANICO values (${row[0]}, '${row[1]}', '${row[2]}');\n`);
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
MARCAS.forEach((marca, i) => TABLA_MARCA.push([i+1, marca[0], marca[1]]));

fs.appendFileSync(cargaBDPath, '\n\n/************ CARGA DE LA TABLA MARCA (CODIGO, NOMBRE, SEDE) ************/\n');
TABLA_MARCA.forEach((row) => {
  fs.appendFileSync(cargaBDPath, `insert into MARCA values(${row[0]}, '${row[1]}', '${row[2]}');\n`);
});

const TOYOTA_MODELOS = [  ["Corolla", ["Gasolina", "Híbrido eléctrico"]],
  ["Yaris", ["Gasolina", "Híbrido eléctrico"]],
  ["RAV4", ["Gasolina", "Híbrido eléctrico"]],
  ["C-HR", ["Gasolina", "Híbrido eléctrico"]],
  ["Camry", ["Gasolina", "Híbrido eléctrico"]],
  ["Prius", ["Híbrido eléctrico"]],
  ["Mirai", ["Hidrógeno"]],
  ["GR Supra", ["Gasolina"]],
  ["GT86", ["Gasolina"]],
  ["Land Cruiser", ["Gasolina", "Diésel"]]
];

const FORD_MODELOS = [  ["Fiesta", ["Gasolina", "Diésel"]],
  ["Focus", ["Gasolina", "Diésel", "Híbrido eléctrico"]],
  ["Mondeo", ["Gasolina", "Diésel", "Híbrido eléctrico"]],
  ["Kuga", ["Gasolina", "Diésel", "Híbrido enchufable"]],
  ["EcoSport", ["Gasolina", "Diésel"]],
  ["Puma", ["Gasolina", "Diésel", "Híbrido eléctrico"]],
  ["Mustang", ["Gasolina"]],
  ["Edge", ["Diésel"]],
  ["Ranger", ["Diésel"]],
  ["Transit", ["Diésel"]]
];

const BMW_MODELOS = [  ["Serie 1", ["Gasolina", "Diésel", "Híbrido enchufable"]],
  ["Serie 2", ["Gasolina", "Diésel", "Híbrido enchufable"]],
  ["Serie 3", ["Gasolina", "Diésel", "Híbrido enchufable"]],
  ["Serie 4", ["Gasolina", "Diésel", "Híbrido enchufable"]],
  ["Serie 5", ["Gasolina", "Diésel", "Híbrido enchufable"]],
  ["Serie 6", ["Gasolina", "Diésel", "Híbrido enchufable"]],
  ["Serie 7", ["Gasolina", "Diésel", "Híbrido enchufable"]],
  ["X1", ["Gasolina", "Diésel", "Híbrido enchufable"]],
  ["X2", ["Gasolina", "Diésel", "Híbrido enchufable"]],
  ["X3", ["Gasolina", "Diésel", "Híbrido enchufable"]],
  ["X4", ["Gasolina", "Diésel", "Híbrido enchufable"]],
  ["X5", ["Gasolina", "Diésel", "Híbrido enchufable"]],
  ["X6", ["Gasolina", "Diésel", "Híbrido enchufable"]],
  ["X7", ["Gasolina", "Diésel", "Híbrido enchufable"]],
  ["i3", ["Eléctrico", "Híbrido enchufable"]],
  ["i8", ["Híbrido enchufable"]]
];

const AUDI_MODELOS = [
  ["A1", ["Gasolina"]],
  ["A2", ["Gasolina"]],
  ["A3", ["Gasolina"]],
  ["A4", ["Diesel"]],
  ["A5", ["Gasolina"]],
  ["A6", ["Diesel"]],
  ["A7", ["Gasolina"]],
  ["A8", ["Híbrido"]],
  ["Q2", ["Gasolina"]],
  ["Q3", ["Diesel"]],
  ["Q4", ["Eléctrico"]],
  ["Q5", ["Híbrido"]],
  ["Q7", ["Diesel"]],
  ["Q8", ["Gasolina"]],
  ["TT", ["Gasolina"]]
];

const MERCEDES_MODELOS = [
  ['Clase A', ['Gasolina']],
  ['Clase B', ['Diésel']],
  ['Clase C', ['Híbrido']],
  ['Clase E', ['Eléctrico']],
  ['Clase G', ['Gasolina']],
  ['Clase S', ['Híbrido']],
  ['GLA', ['Gasolina']],
  ['GLB', ['Diésel']],
  ['GLC', ['Híbrido']],
  ['GLE', ['Eléctrico']],
  ['GLS', ['Gasolina']],
  ['AMG GT', ['Gasolina']],
  ['EQC', ['Eléctrico']],
];

const VOLKSWAGEN_MODELOS = [
  ["Golf", ["Gasolina", "Diésel", "Híbrido", "Eléctrico"]],
  ["Polo", ["Gasolina", "Diésel", "Híbrido"]],
  ["Passat", ["Gasolina", "Diésel", "Híbrido"]],
  ["Tiguan", ["Gasolina", "Diésel", "Híbrido"]],
  ["Touareg", ["Gasolina", "Diésel", "Híbrido"]],
  ["Arteon", ["Gasolina", "Diésel", "Híbrido"]],
  ["Up", ["Gasolina", "Eléctrico"]],
  ["ID.3", ["Eléctrico"]],
  ["ID.4", ["Eléctrico"]],
  ["Caddy", ["Gasolina", "Diésel", "Híbrido"]],
];

const NISSAN_MODELOS = [
  ["Micra", ["Gasolina", "Eléctrico"]],
  ["Qashqai", ["Gasolina", "Diésel", "Híbrido", "Eléctrico"]],
  ["Juke", ["Gasolina", "Diésel", "Híbrido"]],
  ["Leaf", ["Eléctrico"]],
  ["GT-R", ["Gasolina"]]
];

const CHEVROLET_MODELOS = [  ["Bel Air", ["Gasolina"]],
  ["Camaro", ["Gasolina"]],
  ["Chevelle", ["Gasolina"]],
  ["Corvette", ["Gasolina"]],
  ["Impala", ["Gasolina"]],
  ["Nova", ["Gasolina"]],
];

const HONDA_MODELOS = [
  ["Accord", ["Gasolina", "Diésel"]],
  ["Civic", ["Gasolina", "Diésel", "Eléctrico"]],
  ["CR-V", ["Gasolina", "Híbrido"]],
  ["HR-V", ["Gasolina", "Híbrido"]],
  ["Jazz", ["Gasolina", "Híbrido"]],
  ["NSX", ["Híbrido"]],
];

const HYUNDAI_MODELOS = [ 
  ["Accent", ["Gasolina"]],
  ["Elantra", ["Gasolina", "Híbrido"]],
  ["i10", ["Gasolina"]],
  ["i20", ["Gasolina", "Diésel"]],
  ["i30", ["Gasolina", "Diésel", "Híbrido"]],
  ["Kona", ["Gasolina", "Híbrido", "Eléctrico"]],
  ["Santa Fe", ["Gasolina", "Diésel", "Híbrido"]],
  ["Tucson", ["Gasolina", "Diésel", "Híbrido"]],
];

const KIA_MODELOS = [
  ["Picanto", ["Gasolina", "Diesel"]],
  ["Rio", ["Gasolina", "Diesel"]],
  ["Stonic", ["Gasolina", "Diesel"]],
  ["Niro", ["Híbrido", "Eléctrico"]],
  ["Ceed", ["Gasolina", "Diesel"]],
  ["Sportage", ["Gasolina", "Diesel"]],
  ["Sorento", ["Gasolina", "Diesel"]],
  ["Telluride", ["Gasolina"]],
];

const MAZDA_MODELOS = [
  ["2", ["Gasolina", "Diesel", "Híbrido"]], 
  ["3", ["Gasolina", "Diesel", "Híbrido"]], 
  ["CX-30", ["Gasolina", "Diesel", "Híbrido"]], 
  ["CX-5", ["Gasolina", "Diesel", "Híbrido"]],
];

const VOLVO_MODELOS = [
  ["XC90", ["Gasolina", "Diésel", "Híbrido enchufable", "Eléctrico"]],
  ["XC60", ["Gasolina", "Diésel", "Híbrido enchufable", "Eléctrico"]],
  ["XC40", ["Gasolina", "Diésel", "Híbrido enchufable", "Eléctrico"]],
  ["S90", ["Gasolina", "Diésel", "Híbrido enchufable"]],
  ["S60", ["Gasolina", "Diésel", "Híbrido enchufable"]],
  ["V90", ["Gasolina", "Diésel", "Híbrido enchufable"]],
  ["V60", ["Gasolina", "Diésel", "Híbrido enchufable"]],
];

const PEUGEOT_MODELOS = [
  ["108", ["Gasolina"]],
  ["208", ["Gasolina", "Diesel", "Eléctrico"]],
  ["2008", ["Gasolina", "Diesel", "Eléctrico"]],
  ["308", ["Gasolina", "Diesel"]],
  ["3008", ["Gasolina", "Diesel", "Eléctrico"]],
  ["508", ["Gasolina", "Diesel", "Eléctrico"]],
  ["5008", ["Gasolina", "Diesel", "Eléctrico"]],
  ["Rifter", ["Gasolina", "Diesel"]],
  ["Traveller", ["Gasolina", "Diesel"]],
  ["Partner", ["Gasolina", "Diesel"]],
  ["Expert", ["Gasolina", "Diesel"]],
  ["Boxer", ["Gasolina", "Diesel"]],
];

const FIAT_MODELOS = [  ["500", ["Gasolina", "Eléctrico"]],
  ["500L", ["Gasolina"]],
  ["500X", ["Gasolina"]],
  ["Panda", ["Gasolina", "GNC"]],
  ["Tipo", ["Gasolina", "Diésel", "GNC"]],
  ["Doblo", ["Gasolina", "Diésel", "GNC"]],
  ["Qubo", ["Gasolina", "Diésel"]],
  ["Tipo Cross", ["Gasolina", "Diésel"]],
  ["500e", ["Eléctrico"]],
  ["500C", ["Gasolina"]],
  ["Talento", ["Diésel"]],
  ["Ducato", ["Diésel"]],
  ["Punto", ["Gasolina", "Diésel"]],
  ["Freemont", ["Gasolina", "Diésel"]],
  ["500L Living", ["Gasolina", "Diésel"]],
  ["124 Spider", ["Gasolina"]],
  ["Fullback", ["Diésel"]],
  ["Tipo Station Wagon", ["Gasolina", "Diésel"]],
  ["Tipo Sedan", ["Gasolina", "Diésel", "GNC"]],
  ["500L Cross", ["Gasolina", "Diésel"]],
  ["500L Trekking", ["Gasolina", "Diésel"]],
  ["500L Urban", ["Gasolina", "Diésel"]],
  ["500S", ["Gasolina"]],
  ["500C Cabrio", ["Gasolina"]],
  ["500L MPV", ["Gasolina", "Diésel"]],
  ["500 Spiaggina 58", ["Gasolina"]]
];

const SEAT_MODELOS = [
  ["Arona", ["Gasolina", "Diésel", "Eléctrico", "Híbrido enchufable"]],
  ["Ateca", ["Gasolina", "Diésel", "Híbrido enchufable"]],
  ["Ibiza", ["Gasolina", "Diésel"]],
  ["Leon", ["Gasolina", "Diésel", "Eléctrico", "Híbrido enchufable"]],
  ["Tarraco", ["Gasolina", "Diésel", "Híbrido enchufable"]],
];

const TESLA_MODELOS = [
  ["Model S", ["Eléctrico"]],
  ["Model 3", ["Eléctrico"]],
  ["Model X", ["Eléctrico"]],
  ["Model Y", ["Eléctrico"]],
];

const RENAULT_MODELOS = [
  ["Clio", ["Gasolina", "Diésel", "Híbrido"]],
  ["Mégane", ["Gasolina", "Diésel", "Híbrido"]],
  ["Captur", ["Gasolina", "Diésel", "Híbrido"]],
  ["Zoe", ["Eléctrico"]],
  ["Kadjar", ["Gasolina", "Diésel", "Híbrido"]],
  ["Talisman", ["Gasolina", "Diésel", "Híbrido"]],
  ["Scénic", ["Gasolina", "Diésel", "Híbrido"]],
  ["Twingo", ["Gasolina", "Eléctrico"]],
  ["Koleos", ["Gasolina", "Diésel", "Híbrido"]],
  ["Clio", ["Gasolina"]],
  ["Laguna", ["Gasolina", "Diésel", "Híbrido"]],
];

// same order than MARCAS
const ALL_MODELS = [TOYOTA_MODELOS, FORD_MODELOS, BMW_MODELOS, AUDI_MODELOS, MERCEDES_MODELOS, VOLKSWAGEN_MODELOS, NISSAN_MODELOS, CHEVROLET_MODELOS, HONDA_MODELOS, HYUNDAI_MODELOS, KIA_MODELOS, MAZDA_MODELOS, VOLVO_MODELOS, PEUGEOT_MODELOS, FIAT_MODELOS, SEAT_MODELOS, TESLA_MODELOS, RENAULT_MODELOS];

const TABLA_COCHE = [];
let car_counter = 1;
MARCAS.forEach((_, mai) => {
  ALL_MODELS[mai].forEach((model) => {
    model[1].forEach(propulsion => {
      TABLA_COCHE.push([car_counter++, mai+1, model[0], propulsion]);
    })
  });
});

fs.appendFileSync(cargaBDPath, '\n\n/************ CARGA DE LA TABLA COCHE (CODIGO, COD_MARCA, MODELO, PROPULSION) ************/\n');
TABLA_COCHE.forEach((row => {
  fs.appendFileSync(cargaBDPath, `insert into COCHE values (${row[0]}, ${row[1]}, '${row[2]}', '${row[3]}');\n`);
}));

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
  const fecha = generarFechaAleatoria('2015-01-01', '2023-03-24');
  const precio = generarPrecioAleatorio(100, 5000);
  TABLA_REPARA.push([i, codMecanico, codCoche, fecha, precio]);
}

fs.appendFileSync(cargaBDPath, '\n\n/************ CARGA DE LA TABLA REPARA (ID, COD_MECANICO, COD_COCHE, FECHA, PRECIO) ************/\n');
TABLA_REPARA.forEach(row => {
  fs.appendFileSync(cargaBDPath, `insert into REPARA values (${row[0]}, ${row[1]}, ${row[2]}, '${row[3]}', ${row[4]});\n`);
});

const CIUDADES_CONCESIONARIO = [  "Madrid",  "Barcelona",  "Valencia",  "Sevilla",  "Zaragoza",  "Málaga",  "Murcia",  "Palma",  "Las Palmas de Gran Canaria",  "Bilbao",  "Alicante",  "Córdoba",  "Valladolid",  "Vigo",  "Gijón"];

function generarHoraApertura() {
  const hora = Math.floor(Math.random() * 4) + 8; // generamos un número aleatorio entre 8 y 11 (ambos inclusive)
  const minutos = Math.floor(Math.random() * 2) * 30; // generamos 0 o 30 aleatoriamente
  return `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:00`;
}

function generarHoraCierre() {
  const hora = Math.floor(Math.random() * 4) + 18; // generamos un número aleatorio entre 18 y 21 (ambos inclusive)
  const minutos = Math.floor(Math.random() * 2) * 30; // generamos 0 o 30 aleatoriamente
  return `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:00`;
}

const TABLA_CONCESIONARIO = [];
for (let i = 0; i < CIUDADES_CONCESIONARIO.length; i++) {
  const horaApertura = generarHoraApertura(); // genera una hora entre las 08:00:00 y las 11:00:00
  const horaCierre = generarHoraCierre();  // genera una hora entre las 18:00:00 y las 21:00:00
  TABLA_CONCESIONARIO.push([i+1, CIUDADES_CONCESIONARIO[i], horaApertura, horaCierre]);
}

fs.appendFileSync(cargaBDPath, '\n\n/************ CARGA DE LA TABLA CONCESIONARIO (CODIGO, LOCALIDAD, HORA_APERTURA, HORA_CIERRE) ************/\n');
TABLA_CONCESIONARIO.forEach(row => {
  fs.appendFileSync(cargaBDPath, `insert into CONCESIONARIO values (${row[0]}, '${row[1]}', '${row[2]}', '${row[3]}');\n`);
});

const TABLA_OFRECE = [];

// Generar al menos una oferta por cada concesionario
for (let codConcesionario = 1; codConcesionario <= TABLA_CONCESIONARIO.length; codConcesionario++) {
  const codCoche = Math.floor(Math.random() * TABLA_COCHE.length) + 1;
  const cantidad = Math.floor(Math.random() * 31) + 10;
  TABLA_OFRECE.push([codCoche, codConcesionario, cantidad]);
}

// Generar al menos una oferta por cada coche
for (let codCoche = 1; codCoche <= TABLA_COCHE.length; codCoche++) {
  let codConcesionario;
  do {
    codConcesionario = Math.floor(Math.random() * TABLA_CONCESIONARIO.length) + 1;
  } while (TABLA_OFRECE.includes(oferta => oferta[0] === codCoche && oferta[1] === codConcesionario));
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
  } while (TABLA_OFRECE.includes(oferta => oferta[0] === codCoche && oferta[1] === codConcesionario));
  
  const cantidad = Math.floor(Math.random() * 31) + 10;
  TABLA_OFRECE.push([codCoche, codConcesionario, cantidad]);
}

fs.appendFileSync(cargaBDPath, '\n\n/************ CARGA DE LA TABLA OFRECE (COD_COCHE, COD_CONCESIONARIO, CANTIDAD) ************/\n');
TABLA_OFRECE.sort(() => Math.random() - 0.5).forEach(row => {
  fs.appendFileSync(cargaBDPath, `insert into OFRECE values (${row[0]}, ${row[1]}, ${row[2]});\n`);
});

function generarNombreYApellidos() {
  const NOMBRES = ["Lucía", "Hugo", "Sofía", "Jaime", "María", "Lucas", "Valentina", "Mateo", "Paula", "Daniel", "Carmen", "Pablo", "Julia", "David", "Adriana", "Alejandro", "Emma", "Leo", "Carla", "Jorge", "Alba", "Diego", "Claudia", "Miguel", "Marta", "Javier", "Natalia", "Manuel", "Ana", "Álvaro", "Laura", "Fernando", "Cristina", "Carlos", "Isabel", "José", "Celia", "Juan", "Elena", "Pedro", "Andrea", "Rafael", "Silvia", "José Antonio", "Alicia", "Juan Carlos", "Rosa", "Rubén", "Patricia", "Iván", "Sara", "Francisco", "Eva", "Jesús", "Miriam", "Antonio", "Lorena", "Raúl", "Irene", "Ángel", "Carmen María", "Guillermo", "Marina", "Enrique", "Mercedes", "Mariano", "Gloria", "Víctor", "Raquel", "Óscar", "Luisa", "Ignacio", "Verónica", "Joaquín", "Beatriz"];
  const APELLIDOS = ['García', 'González', 'Rodríguez', 'Fernández', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Martín', 'Jiménez', 'Ruiz', 'Hernández', 'Díaz', 'Moreno', 'Álvarez', 'Muñoz', 'Romero', 'Alonso', 'Gutiérrez', 'Navarro', 'Torres', 'Domínguez', 'Vázquez', 'Ramos', 'Gil', 'Ramírez', 'Serrano', 'Blanco', 'Suárez', 'Molina', 'Morales', 'Ortega', 'Delgado', 'Castro', 'Ortiz', 'Rubio', 'Marín', 'Sanz', 'Iglesias', 'Nuñez', 'Medina', 'Santos', 'Castillo', 'Cortés', 'Lozano', 'Guerrero', 'Cano', 'Prieto', 'Méndez', 'Calvo', 'Gallego', 'Vidal'];
  const nombre = NOMBRES[Math.floor(Math.random() * NOMBRES.length)];
  const apellido1 = APELLIDOS[Math.floor(Math.random() * APELLIDOS.length)];
  const apellido2 = APELLIDOS[Math.floor(Math.random() * APELLIDOS.length)];
  return `${nombre} ${apellido1} ${apellido2}`;
}

function generarDNI() {
  const letras = 'ABCDEFGHJKLMPNQRSTVWXYZ';
  const numeros = Math.floor(Math.random() * 99999999) + 1;
  const letra = letras.charAt(numeros % 23);
  return numeros.toString().padStart(8, '0') + letra;
}

function generarTelefono() {
  let prefijo = Math.random() < 0.5 ? '9' : '6';
  let numero = prefijo;
  for (let i = 0; i < 8; i++) {
    numero += Math.floor(Math.random() * 10);
  }
  return numero;
}

const TABLA_CLIENTE = [];

for(let cliente = 0; cliente < 400; cliente++) {
  TABLA_CLIENTE.push([generarDNI(), generarNombreYApellidos(), generarFechaAleatoria('1955-01-01', '2000-03-24'), generarTelefono()]);
}

fs.appendFileSync(cargaBDPath, '\n\n/************ CARGA DE LA TABLA CLIENTE (DNI, NOMBRE, FECHA_NAC, TELEFONO) ************/\n');
TABLA_CLIENTE.forEach(row => {
  fs.appendFileSync(cargaBDPath, `insert into CLIENTE values ('${row[0]}', '${row[1]}', '${row[2]}', '${row[3]}');\n`);
});

function generarNumeroAleatorio(maximo) {
  return Math.floor(Math.random() * maximo) + 1;
}

const TABLA_VENTA = [];

// asegurar que cada cliente hace al menos una compra
TABLA_CLIENTE.forEach((cliente, i) =>{
  TABLA_VENTA.push([i+1, cliente[0], generarNumeroAleatorio(TABLA_COCHE.length), generarNumeroAleatorio(TABLA_CONCESIONARIO.length), generarPrecioAleatorio(15000,50000), generarFechaAleatoria('1995-01-01', '2022-12-31')]);
});

// añadir alguna compra mas de clientes aleatorios
for(let i = TABLA_VENTA.length; i <= 600; i++) {
  TABLA_VENTA.push([i, TABLA_CLIENTE[generarNumeroAleatorio(TABLA_CLIENTE.length-1)][0], generarNumeroAleatorio(TABLA_COCHE.length), generarNumeroAleatorio(TABLA_CONCESIONARIO.length), generarPrecioAleatorio(15000,50000), generarFechaAleatoria('1995-01-01', '2022-12-31')]);
}

fs.appendFileSync(cargaBDPath, '\n\n/************ CARGA DE LA TABLA VENTA (NUM_FACTURA, COD_CLIENTE, COD_COCHE, COD_CONCESIONARIO, PRECIO, FECHA) ************/\n');
TABLA_VENTA.forEach(row => {
  fs.appendFileSync(cargaBDPath, `insert into VENTA values (${row[0]}, '${row[1]}', ${row[2]}, ${row[3]}, ${row[4]}, '${row[5]}');\n`);
});
