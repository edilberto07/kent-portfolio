export type SkillBarColor = "cyan" | "purple" | "green";

export type Skill = {
  name: string;
  level: number;
  color: SkillBarColor;
};

export type SkillCategory = {
  title: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "TypeScript", level: 80, color: "cyan" },
      { name: "JavaScript", level: 80, color: "cyan" },
      { name: "PHP", level: 75, color: "cyan" },
      { name: "Dart / Flutter", level: 70, color: "cyan" },
      { name: "Python", level: 40, color: "cyan" },
      { name: "C++", level: 35, color: "cyan" },
      { name: "Java", level: 30, color: "cyan" },
    ],
  },
  {
    title: "Frameworks & Technologies",
    skills: [
      { name: "Next.js", level: 85, color: "purple" },
      { name: "React / Expo", level: 80, color: "purple" },
      { name: "Laravel", level: 75, color: "purple" },
      { name: "Node.js", level: 70, color: "purple" },
      { name: "Flutter", level: 70, color: "purple" },
      { name: "React Native", level: 70, color: "purple" },
      { name: "PHP (vanilla)", level: 65, color: "purple" },
    ],
  },
  {
    title: "Game & Hardware",
    skills: [
      { name: "Arduino (C++)", level: 40, color: "green" },
      { name: "Godot Engine", level: 35, color: "green" },
    ],
  },
];
