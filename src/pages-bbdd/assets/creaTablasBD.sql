CREATE TABLE MECANICO (
  codigo INT not null primary key,
  nombre VARCHAR(50) not null,
  ciudad VARCHAR(50) not null
);

CREATE TABLE PROPULSION (
  id INT not null primary key,
  nombre VARCHAR(30) not null
);

CREATE TABLE MARCA (
  codigo INT not null primary key,
  nombre VARCHAR(20) not null,
  sede VARCHAR(20) not null
);

CREATE TABLE CONCESIONARIO (
  codigo INT not null primary key, 
  localidad VARCHAR(50) not null,
  hora_apertura TIME not null,
  hora_cierre TIME not null
);

CREATE TABLE CLIENTE (
  dni VARCHAR(15) not null primary key,
  nombre VARCHAR(40) not null,
  fecha_nac DATE not null,
  telefono VARCHAR(15) not null
);

CREATE TABLE COCHE (
  codigo INT not null primary key,
  cod_marca INT not null references MARCA(codigo) ON DELETE RESTRICT,
  modelo VARCHAR(60) not null,
  propulsion INT not null references PROPULSION(id) ON DELETE RESTRICT
);

CREATE TABLE OFRECE (
  cod_coche INT not null references COCHE(codigo) ON DELETE RESTRICT,
  cod_concesionario INT not null references CONCESIONARIO(codigo) ON DELETE RESTRICT,
  cantidad INT check(cantidad > 0),
  primary key (cod_coche, cod_concesionario)
);

CREATE TABLE REPARA (
  id INT not null primary key,
  cod_mecanico INT not null references MECANICO(codigo) ON DELETE RESTRICT, 
  cod_coche INT not null references COCHE(codigo) ON DELETE RESTRICT,
  fecha DATE not null,
  precio DECIMAL(10,2) not null check(precio > 0)
);

CREATE TABLE VENTA (
  num_factura VARCHAR(15) not null primary key,
  cod_cliente VARCHAR(15) not null references CLIENTE(dni) ON DELETE RESTRICT,
  cod_coche INT not null,
  cod_concesionario INT not null,
  precio DECIMAL(10,2) not null check(precio > 100),
  fecha VARCHAR(30) not null,
  foreign key (cod_coche, cod_concesionario) references OFRECE(cod_coche, cod_concesionario)
);