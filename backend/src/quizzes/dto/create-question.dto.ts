import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ArrayMinSize,
} from 'class-validator';

import { QuestionType } from '@prisma/client';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsEnum(QuestionType)
  type!: QuestionType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  options?: string[];

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  correctAnswers!: string[];
}
