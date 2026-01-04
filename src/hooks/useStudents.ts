import { usePluginData } from '@docusaurus/useGlobalData';

export interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
}

export function useStudents(): Student[] {
  const data = usePluginData('students-plugin') as {
    students: Student[];
  };

  return data?.students ?? [];
}
