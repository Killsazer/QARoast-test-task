import { Test, TestingModule } from '@nestjs/testing';
import { QuizzesService } from './quizzes.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { QuestionType } from '@prisma/client';
import { CreateQuizDto } from './dto/create-quiz.dto';

const mockPrismaService = {
  client: {
    quiz: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  },
};

describe('QuizzesService', () => {
  let service: QuizzesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizzesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<QuizzesService>(QuizzesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a quiz', async () => {
      const createDto: CreateQuizDto = {
        title: 'Test Quiz',
        questions: [
          { text: 'Q1', type: QuestionType.INPUT, correctAnswers: ['A1'] },
        ],
      };

      const expectedResult = { id: 1, title: 'Test Quiz', questions: [] };
      mockPrismaService.client.quiz.create.mockResolvedValue(expectedResult);

      const result = await service.create(createDto);

      expect(prisma.client.quiz.create).toHaveBeenCalledWith({
        data: {
          title: createDto.title,
          questions: {
            create: [
              {
                text: 'Q1',
                type: QuestionType.INPUT,
                options: [],
                correctAnswers: ['A1'],
              },
            ],
          },
        },
        include: { questions: true },
      });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return an array of quizzes', async () => {
      const expectedResult = [{ id: 1, title: 'Test Quiz', _count: { questions: 5 } }];
      mockPrismaService.client.quiz.findMany.mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(prisma.client.quiz.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          title: true,
          createdAt: true,
          _count: { select: { questions: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a quiz by id', async () => {
      const expectedResult = { id: 1, title: 'Test Quiz', questions: [] };
      mockPrismaService.client.quiz.findUnique.mockResolvedValue(expectedResult);

      const result = await service.findOne(1);

      expect(prisma.client.quiz.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { questions: true },
      });
      expect(result).toEqual(expectedResult);
    });

    it('should throw NotFoundException if quiz is not found', async () => {
      mockPrismaService.client.quiz.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should successfully remove a quiz', async () => {
      const expectedResult = { id: 1, title: 'Test Quiz' };
      mockPrismaService.client.quiz.findUnique.mockResolvedValue(expectedResult);
      mockPrismaService.client.quiz.delete.mockResolvedValue(expectedResult);

      const result = await service.remove(1);

      expect(prisma.client.quiz.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if delete fails', async () => {
      const expectedResult = { id: 999, title: 'Test Quiz' };
      mockPrismaService.client.quiz.findUnique.mockResolvedValue(expectedResult);
      mockPrismaService.client.quiz.delete.mockRejectedValue(new Error('Record to delete does not exist.'));

      await expect(service.remove(999)).rejects.toThrow('Record to delete does not exist.');
    });
  });
});
