import sys
import mysql.connector
import matplotlib.pyplot as plt
import base64
from io import BytesIO

roll_no = sys.argv[1]
semester = sys.argv[2]

# Connect to MySQL database
db = mysql.connector.connect(
    host='localhost',
    user='root',
    password='Pathan@2005',
    database='student_dashboard'
)

cursor = db.cursor()

# Fetch the marks data
cursor.execute("SELECT subject_name, marks FROM marks WHERE roll_no = %s AND semester = %s", (roll_no, semester))
data = cursor.fetchall()

if not data:
    print("No marks data found.")
    sys.exit(1)

# Extract subjects and marks
subjects = [row[0] for row in data]
marks = [row[1] for row in data]

# Generate the chart
plt.figure(figsize=(10, 6))
plt.bar(subjects, marks, color='skyblue')
plt.title(f'Marks Chart for Roll No {roll_no} Semester {semester}')
plt.xlabel('Subjects')
plt.ylabel('Marks')
plt.xticks(rotation=45)
plt.tight_layout()

# Save chart to BytesIO object (to avoid file I/O)
img_stream = BytesIO()
plt.savefig(img_stream, format='png')
plt.close()

# Convert the image to base64
img_stream.seek(0)
img_base64 = base64.b64encode(img_stream.read()).decode('utf-8')

# Print the base64 string (Node.js will capture this)
print(img_base64)

# Close the database connection
db.close()

 