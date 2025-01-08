CREATE DATABASE IF NOT EXISTS ESCOM;

USE ESCOM;

CREATE TABLE Carrera (
    idCarrera BIGINT AUTO_INCREMENT PRIMARY KEY, -- Clave primaria autoincremental
    nombreCarrera VARCHAR(150) NOT NULL,         -- Nombre con un límite de 150 caracteres
    descripcionCarrera TEXT NOT NULL,            -- Descripción (texto largo)
    duracionCarrera INT NOT NULL                 -- Duración en años o semestres
);