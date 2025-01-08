import pymysql
from dotenv import load_dotenv
import os

# Cargar las variables de entorno
load_dotenv()

try:
    # Establecer la conexión
    conn = pymysql.connect(
        host=os.getenv("DB_HOST"),  # Usar la variable de entorno
        user=os.getenv("DB_USER"),  # Usar la variable de entorno
        password=os.getenv("DB_PASSWORD"),  # Usar la variable de entorno
        database=os.getenv("DB_DATABASE"),  # Usar la variable de entorno
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

    print("Conexión exitosa a la base de datos")

    # Crear un cursor para ejecutar consultas
    cursor = conn.cursor()

    # Cerrar la conexión
    conn.close()
    print("Conexión cerrada")

except pymysql.MySQLError as e:
    print(f"Error al conectar a la base de datos: {e}")
