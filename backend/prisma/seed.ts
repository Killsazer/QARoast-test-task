import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database with sample quizzes...');

  // Create Quiz 1: General Knowledge
  const quiz1 = await prisma.quiz.create({
    data: {
      title: 'General Knowledge & Tech',
      questions: {
        create: [
          {
            text: 'Is HTML considered a programming language?',
            type: 'BOOLEAN',
            options: [],
            correctAnswers: ['False'],
          },
          {
            text: 'What does CSS stand for?',
            type: 'INPUT',
            options: [],
            correctAnswers: ['Cascading Style Sheets', 'cascading style sheets'],
          },
          {
            text: 'Which of the following are JavaScript frameworks/libraries?',
            type: 'CHECKBOX',
            options: ['React', 'Laravel', 'Vue', 'Django', 'Angular'],
            correctAnswers: ['React', 'Vue', 'Angular'],
          },
        ],
      },
    },
  });

  // Create Quiz 2: JavaScript Basics
  const quiz2 = await prisma.quiz.create({
    data: {
      title: 'JavaScript Basics',
      questions: {
        create: [
          {
            text: 'const and let were introduced in ES6.',
            type: 'BOOLEAN',
            options: [],
            correctAnswers: ['True'],
          },
          {
            text: 'What is the output of typeof null?',
            type: 'INPUT',
            options: [],
            correctAnswers: ['object', 'Object'],
          },
        ],
      },
    },
  });

  console.log('Successfully seeded database!');
  console.log(`- Created Quiz: ${quiz1.title} (ID: ${quiz1.id})`);
  console.log(`- Created Quiz: ${quiz2.title} (ID: ${quiz2.id})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
