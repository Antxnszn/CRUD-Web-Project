import pymysql
conn = pymysql.connect(
    host="localhost",
    user="root",
    password="sancochito2",
    database="escomcarreras",
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)
cursor = conn.cursor()
conn.close()