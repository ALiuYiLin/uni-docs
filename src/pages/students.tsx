import React from 'react';
import { useStudents } from '../hooks/useStudents';

export default function StudentsPage() {
  const students = useStudents();
  console.log('students: ', students);

  return (
    <div style={{ padding: 24 }}>
      <h1>Students</h1>

      <ul>
        {students.map(s => (
          <li key={s.id}>
            {s.name} - {s.age}岁 - {s.grade}
          </li>
        ))}
      </ul>
    </div>
  );
}
