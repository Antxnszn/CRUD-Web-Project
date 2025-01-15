CREATE TABLE alumnos (
    idAlumno INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    carrera VARCHAR(100) NOT NULL,
    semestre INT NOT NULL,
    boleta VARCHAR(20) NOT NULL UNIQUE,
    CONSTRAINT check_semestre CHECK (semestre > 0)
)