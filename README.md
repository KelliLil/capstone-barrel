# School Management System

## Overview

This is a school management system that allows you to manage students, teachers, and classes. It is a simple system that allows you to add, edit, and delete students, teachers, and classes. It also allows you to assign students to classes and assign teachers to classes.

It provides an alternative to the traditional paper-based systems or spreadsheets that is used in many schools. It is a simple system that is easy to use and is designed to be used by teachers and administrators.

It doesn't try to do too much by being a full-blown LMS, but just focuses on the core functionality of managing students, teachers, and classes, specifically attendance as this is a common metric for various financial aids and funding.

This concept is inspired by the very nice spreadsheet set up by Elias here at Claim Academy and takes it a step further by adding a simple web interface to it.

## Primary Features (MVP)

- [ ] As a teacher, I want to be able to add a student to a class so that I can track their attendance.
- [ ] As a teacher, when I login, I want to see a list of my classes so that I can select one to view.
- [ ] As a teacher, when I select a class, I want to enter the data for capturing attendance.
- [ ] As a teacher, when I select a class, I want to see a list of students in that class.
- [ ] As a teacher, when I select a student, I want to toggle them as present or absent.
- [ ] As a teacher, when I select a student, I want to edit their name.
- [ ] As a teacher, I want to be able to update my account information, such as my name and email.
- [ ] As a teacher, I want to be able to edit my class information, such as the name and description.

---

- [ ] As an administrator, I want to be able to add a teacher to a class.
- [ ] As an administrator, I want to be able to add a student to a class.
- [ ] As an administrator, I want to be able to add a class.
- [ ] As an administrator, I want to be able to edit a student.
- [ ] As an administrator, I want to be able to delete a student.
- [ ] As an administrator, I want to be able to delete a teacher.
- [ ] As an administrator, I want to be able to delete a class.
- [ ] As an administrator, I want a list of all rosters, including absences.

---

- [ ] As an administrator, I can see all teachers, classes and students.
- [ ] As a teacher, I can only see my classes and students.

## Secondary Features (Stretch)

- [ ] As an administrator, I want to be able to set a maximum threshold of absences for a class.
- [ ] As a teacher, I want additional options for tracking attendance: late, excused, unexcused, left early.
- [ ] As an administrator, I want to generate a list of students that have exceeded the maximum threshold of absences.
- [ ] As an administrator, I want to assign TAs to classes.

## Bonus Features (Super Stretch)

- [ ] As a teacher, I want to add assignments and track grades through this same system.
- [ ] When a student comes close to the maximum threshold, I want SMS/E-mail notifications to be sent to all involved.
- [ ] As a teacher, I want integrated video conferencing so that I can conduct virtual classes.
- [ ] As a teacher, I want to be able to send SMS/E-mail notifications to students and parents.
- [ ] As a teacher, I want to integrate Slack and/or a chatbot so that I can communicate with students and parents.
- [ ] As an administrator, I want students to be able to update documentation such as immunization records, emergency contacts, etc.
- [ ] As an administrator, I want to add additional roles such as principal, counselor, etc.
- [ ] As an administrator, I want to assign times and classrooms to classes so that I can generate a schedule.
- [ ] As an administrator, I want to generate a scheduling calendar for all classes and teachers.
- [ ] As a teacher, I want to integrate with various learning management systems (LMS) such as Canvas.

## Tech Stack

- [ ] React
- [ ] Node
- [ ] Express
- [ ] MongoDB with Mongoose

<!-- TODO: Add more ℹ️ here as coding gets underway to better describe the process. -->

## Data Schema

I am favoring an embedded document approach for this project. This is because the data is highly relational and it is easier to manage the data this way. It also makes it easier to query the data. This is the **general** approach that is used in MongoDB for small data sets.

The nesting of `attendance` creates 3 layers of nesting is concerning, but moving attendance to a separate **collection** and using `$lookup` for **joins** is not a good idea because it is not performant. It is better to keep the data in the same collection and use a **projection** to filter out any data that is not needed.

"Data that's related should be stored together" is a good rule of thumb to follow when designing a schema. `attendance` is related to `students` and `students` is related to `classes` and `classes` is related to `teachers`. So, it makes sense to nest the data this way.

```json
[
  {
    "name": "Full-stack Web Development",
    "description": "This is a full-stack web development class.",
    "teacher": {
      "name": "Elias",
      "email": "elias@claimacademystl.com"
      "password": "password"
    },
    "students": [
      {
        "name": "John Doe",
        "attendance": [
          {
            "date": "2020-01-01",
            "present": true
          },
          {
            "date": "2020-01-02",
            "present": false
          }
        ]
      },
      {
        "name": "Jane Doe",
        "attendance": [
          {
            "date": "2020-01-01",
            "present": true
          },
          {
            "date": "2020-01-02",
            "present": true
          }
        ]
      }
    ]
  }
]
```

```js
// TODO: Improve validation
const AttendanceSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  present: {
    type: Boolean,
    required: true,
  },
});

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  attendance: [AttendanceSchema],
});

const TeacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  teacher: TeacherSchema,
  students: [StudentSchema],
});
```

## API Endpoints

### 🧑‍🏫

- [ ] `POST /api/teacher/login` - Login a teacher
- [ ] `POST /api/teacher/logout` - Logout a teacher
- [ ] `POST /api/teacher/register` - Register a teacher
- [ ] `GET /api/teacher` - Get all teachers (admin only)
- [ ] `PUT /api/teacher/:teacherId` - Update a teacher (auth required)
- [ ] `DELETE /api/teacher/:teacherId` - Delete a teacher (admin only)

### Classes

- [ ] `GET /api/classes` - Get all classes. Admin gets all. Teacher gets only their classes.
- [ ] `POST /api/classes` - Create a class (admin only)
- [ ] `PUT /api/classes/:classId` - Update a class (admin only). We can add students, teachers, updated the name and description. We can also update attendance.
- [ ] `DELETE /api/classes/:classId` - Delete a class (admin only)

### Students 🧑‍🎓

- [ ] `GET /api/teacher/classes/:classId/students` - Get all students for a class (auth required)
