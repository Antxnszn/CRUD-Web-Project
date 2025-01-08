from flask import Flask, request, jsonify
import json
import pymysql
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

def db_connection():
    conn = None
    try:
        conn = pymysql.connect(
            host="localhost",
            user="root",
            password="",
            database="escomcarreras",
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
        )
    except pymysql.error as e:
        print(e)
    return conn

@app.route('/carreras', methods=['GET', 'POST'])
def all_carreras():
    conn = db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = conn.cursor()
    
    if request.method == 'GET':
        try:
            cursor.execute("SELECT * FROM carreras")
            all_carreras = [
                dict(
                    idCarrera=row['idCarrera'],
                    carrera=row['carrera'],
                    descripcionCarrera=row['descripcionCarrera'],
                    semestres=row['semestres'],
                    plan=row['plan']
                )
                for row in cursor.fetchall()
            ]
            return jsonify(all_carreras), 200
        except Exception as e:
            print(f"Error fetching carreras: {e}")
            return jsonify({"error": "Failed to fetch carreras"}), 500
    
    if request.method == 'POST':
        try:
            new_carrera = request.form["carrera"]
            new_descripcion = request.form["descripcionCarrera"]
            new_semestres = int(request.form["semestres"])
            new_plan = int(request.form["plan"])
            
            sql = """INSERT INTO carreras (carrera, descripcionCarrera, semestres, plan)
                     VALUES (%s, %s, %s, %s)"""
            cursor.execute(sql, (new_carrera, new_descripcion, new_semestres, new_plan))
            conn.commit()
            return jsonify({"message": "Carrera creada exitosamente"}), 201
        except Exception as e:
            print(f"Error inserting carrera: {e}")
            return jsonify({"error": "Failed to create carrera"}), 500
    
    return jsonify({"error": "Invalid method"}), 405  # Por si se envía un método no permitido



@app.route('/carreras/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def single_carrera(id):
    conn = db_connection()
    cursor = conn.cursor()
    carrera = None

    if request.method == "GET":
        cursor.execute("SELECT * FROM carreras WHERE idCarrera=%s", (id,))
        rows = cursor.fetchall()
        for r in rows:
            carrera = r
        if carrera is not None:
            return jsonify(carrera), 200
        else:
            return "Carrera no encontrada", 404

    if request.method == 'PUT':
        sql = """UPDATE carreras 
                 SET carrera=%s,
                     descripcionCarrera=%s,
                     semestres=%s,
                     plan=%s
                 WHERE idCarrera=%s"""

        carrera = request.form['carrera']
        descripcion = request.form['descripcionCarrera']
        semestres = int(request.form['semestres'])
        plan = int(request.form['plan'])

        updated_carrera = {
            "idCarrera": id,
            "carrera": carrera,
            "descripcionCarrera": descripcion,
            "semestres": semestres,
            "plan": plan
        }
        
        cursor.execute(sql, (carrera, descripcion, semestres, plan, id))
        conn.commit()
        return jsonify(updated_carrera)

    if request.method == 'DELETE':
        try:
            sql = """DELETE FROM carreras WHERE idCarrera=%s"""
            cursor.execute(sql, (id,))
            conn.commit()
            return jsonify({"message": f"La carrera con id {id} ha sido eliminada."}), 200
        except Exception as e:
            print(f"Error deleting carrera: {e}")
            return jsonify({"error": "Failed to delete carrera"}), 500


if __name__ == '__main__':
    app.run(debug=True)
