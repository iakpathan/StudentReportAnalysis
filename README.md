#  StudentReportAnalysis


```markdown

This web application allows teachers to input student marks and attendance, generate corresponding charts (marks and attendance), and view results. The charts are generated using Python scripts, and the application is built using Node.js on the backend and HTML on the frontend.

## Project Structure

```

/charts
├── attendance\_chart\_238w1a54b8\_1.png
├── marks\_chart\_238w1a54b8\_1.png
├── marks\_chart\_238w1a54b9\_1.png
├── marks\_chart\_238w1a54c0\_1.png
├── results\_238w1a54b8.png
/node\_modules
└── \[node modules for the application]
/generate\_attendance\_chart.py   # Python script to generate the attendance chart
/generate\_marks\_chart.py        # Python script to generate the marks chart
/package-lock.json              # Package lock for Node.js dependencies
/package.json                   # Project dependencies and scripts for Node.js
/server.js                      # Backend server script using Node.js
/student.html                   # Frontend HTML for student-related pages
/teacher.html                   # Frontend HTML for teacher-related pages

````

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   cd <project-directory>
````

2. Install required Node.js dependencies:

   ```bash
   npm install
   ```

3. Install required Python dependencies (e.g., matplotlib):

   ```bash
   pip install matplotlib
   ```

4. Run the server:

   ```bash
   node server.js
   ```

5. Open `student.html` or `teacher.html` in your browser to interact with the app.

##Database tables:
attendance:
+------------------+--------------+------+-----+---------+----------------+
| Field            | Type         | Null | Key | Default | Extra          |
+------------------+--------------+------+-----+---------+----------------+
| id               | int          | NO   | PRI | NULL    | auto_increment |
| roll_no          | varchar(20)  | YES  |     | NULL    |                |
| semester         | int          | YES  |     | NULL    |                |
| class_name       | varchar(100) | YES  |     | NULL    |                |
| attended_classes | int          | YES  |     | NULL    |                |
| total_classes    | int          | YES  |     | NULL    |                |
| percentage       | float        | YES  |     | NULL    |                |
+------------------+--------------+------+-----+---------+----------------+
marks:
+--------------+--------------+------+-----+---------+----------------+
| Field        | Type         | Null | Key | Default | Extra          |
+--------------+--------------+------+-----+---------+----------------+
| id           | int          | NO   | PRI | NULL    | auto_increment |
| roll_no      | varchar(20)  | YES  |     | NULL    |                |
| semester     | int          | YES  |     | NULL    |                |
| subject_name | varchar(100) | YES  |     | NULL    |                |
| marks        | int          | YES  |     | NULL    |                |
+--------------+--------------+------+-----+---------+----------------+
students:
+--------------------+--------------+------+-----+---------+-------+
| Field              | Type         | Null | Key | Default | Extra |
+--------------------+--------------+------+-----+---------+-------+
| roll_no            | varchar(20)  | NO   | PRI | NULL    |       |
| name               | varchar(100) | YES  |     | NULL    |       |
| semester           | int          | YES  |     | NULL    |       |
| overall_attendance | decimal(5,2) | YES  |     | NULL    |       |
+--------------------+--------------+------+-----+---------+-------+


## Features

* Teachers can input student marks and attendance in the frontend (HTML pages).
* The backend generates attendance and marks charts using Python scripts (`generate_attendance_chart.py` and `generate_marks_chart.py`).
* The charts are saved as PNG images in the `/charts` directory.
* Results are displayed visually with corresponding charts for easy analysis.

## File Descriptions

* **charts/**: Contains the generated charts as PNG images for attendance and marks.
* **generate\_attendance\_chart.py**: Python script to generate a chart visualizing student attendance.
* **generate\_marks\_chart.py**: Python script to generate a chart visualizing student marks.
* **server.js**: The backend server built with Node.js, handling the logic and requests.
* **student.html**: HTML file containing the student interface for interacting with the app.
* **teacher.html**: HTML file for the teacher interface for inputting student data.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

Feel free to adjust this template based on additional details you might want to add!
```
