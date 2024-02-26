create database knexjs;

create table usuario (
	id serial primary key,
  nome text not null,
  email text,
  telefone text
);
