import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export default function studentsPlugin() {
  return {
    name: 'students-plugin',

    async loadContent() {
      const csvPath = path.resolve(__dirname, '../../data/students.csv');
      const file = fs.readFileSync(csvPath, 'utf-8');

      const records = parse(file, {
        columns: true,
        skip_empty_lines: true,
      });

      return records.map((item: any) => ({
        id: Number(item.id),
        name: item.name,
        age: Number(item.age),
        grade: item.grade,
      }));
    },

    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;

      // 全局注入
      setGlobalData({
        students: content,
      });
    },
  };
}
