"use client";

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { quizSchema, type QuizFormValues } from '@/lib/validations/quiz';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Trash2, Plus, CheckCircle2 } from 'lucide-react';

interface QuizFormProps {
  initialData?: Partial<QuizFormValues>;
  onSubmit: (data: QuizFormValues) => Promise<void>;
  isSubmitting?: boolean;
}

export function QuizForm({ initialData, onSubmit, isSubmitting = false }: QuizFormProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: initialData?.title || '',
      questions: initialData?.questions || [{ text: '', type: 'INPUT', correctAnswers: [], options: [] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const watchQuestions = watch('questions');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
      {/* Quiz Title */}
      <Card>
        <CardHeader>
          <CardTitle>Quiz Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Quiz Title</label>
            <Input
              {...register('title')}
              placeholder="e.g. JavaScript Fundamentals"
              error={!!errors.title}
            />
            {errors.title && (
              <p className="text-sm text-rose-500">{errors.title.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      <div className="space-y-6">
        {fields.map((field, index) => {
          const qType = watchQuestions[index]?.type || 'INPUT';
          const qErrors = errors.questions?.[index];

          return (
            <Card key={field.id} className="relative group">
              <div className="absolute -left-3 top-6 bottom-6 w-1 bg-indigo-500 rounded-r opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold">
                    {index + 1}
                  </div>
                  <CardTitle className="text-lg">Question</CardTitle>
                </div>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                )}
              </CardHeader>
              
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Question Text */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-slate-700">Question Text</label>
                    <Input
                      {...register(`questions.${index}.text`)}
                      placeholder="What is the output of 2 + 2?"
                      error={!!qErrors?.text}
                    />
                    {qErrors?.text && (
                      <p className="text-sm text-rose-500">{qErrors.text.message}</p>
                    )}
                  </div>

                  {/* Question Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Type</label>
                    <select
                      {...register(`questions.${index}.type`)}
                      className="flex h-11 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 hover:border-gray-300 transition-all shadow-sm"
                      onChange={(e) => {
                        register(`questions.${index}.type`).onChange(e);
                        // Reset answers/options when type changes
                        setValue(`questions.${index}.correctAnswers`, []);
                        setValue(`questions.${index}.options`, []);
                      }}
                    >
                      <option value="INPUT">Short Answer (Input)</option>
                      <option value="BOOLEAN">True / False</option>
                      <option value="CHECKBOX">Multiple Choice</option>
                    </select>
                  </div>
                </div>

                {/* Answers Section based on Type */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-4">
                  {qType === 'INPUT' && (
                    <div className="space-y-4">
                      <label className="text-sm font-medium text-slate-700">Accepted Answers</label>
                      <Controller
                        control={control}
                        name={`questions.${index}.correctAnswers`}
                        render={({ field }) => {
                          const currentAnswers = field.value || [];

                          const addAnswer = (val: string) => {
                            const trimmed = val.trim();
                            if (trimmed && !currentAnswers.includes(trimmed)) {
                              field.onChange([...currentAnswers, trimmed]);
                            }
                          };

                          const removeAnswer = (val: string) => {
                            field.onChange(currentAnswers.filter((a: string) => a !== val));
                          };

                          return (
                            <div className="space-y-3">
                              <div className="flex flex-wrap gap-2">
                                {currentAnswers.map((ans: string, i: number) => (
                                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-800 text-sm font-medium">
                                    {ans}
                                    <button
                                      type="button"
                                      onClick={() => removeAnswer(ans)}
                                      className="text-indigo-400 hover:text-rose-500 transition-colors"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </span>
                                ))}
                              </div>
                              <Input
                                placeholder="Type an acceptable answer and press Enter..."
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addAnswer(e.currentTarget.value);
                                    e.currentTarget.value = '';
                                  }
                                }}
                              />
                              <p className="text-xs text-slate-500">Press Enter to add an acceptable variation (you can freely use commas inside).</p>
                            </div>
                          );
                        }}
                      />
                    </div>
                  )}

                  {qType === 'BOOLEAN' && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Correct Answer</label>
                      <Controller
                        control={control}
                        name={`questions.${index}.correctAnswers`}
                        render={({ field }) => (
                          <div className="flex gap-4">
                            {['True', 'False'].map((opt) => (
                              <label key={opt} className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border bg-white hover:bg-slate-50 transition-colors">
                                <input
                                  type="radio"
                                  value={opt}
                                  checked={field.value.includes(opt)}
                                  onChange={() => field.onChange([opt])}
                                  className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                                />
                                <span className="text-sm font-medium">{opt}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      />
                    </div>
                  )}

                  {qType === 'CHECKBOX' && (
                    <div className="space-y-4">
                      <label className="text-sm font-medium text-slate-700">Options & Correct Answers</label>
                      <Controller
                        control={control}
                        name={`questions.${index}.options`}
                        render={({ field: optionsField }) => (
                          <Controller
                            control={control}
                            name={`questions.${index}.correctAnswers`}
                            render={({ field: answersField }) => {
                              const currentOptions = optionsField.value || [];
                              const currentAnswers = answersField.value || [];

                              const addOption = (val: string) => {
                                if (val && !currentOptions.includes(val)) {
                                  optionsField.onChange([...currentOptions, val]);
                                }
                              };

                              const removeOption = (val: string) => {
                                optionsField.onChange(currentOptions.filter(o => o !== val));
                                answersField.onChange(currentAnswers.filter(a => a !== val));
                              };

                              const toggleAnswer = (val: string) => {
                                if (currentAnswers.includes(val)) {
                                  answersField.onChange(currentAnswers.filter(a => a !== val));
                                } else {
                                  answersField.onChange([...currentAnswers, val]);
                                }
                              };

                              return (
                                <div className="space-y-3">
                                  {currentOptions.map((opt, i) => {
                                    const isCorrect = currentAnswers.includes(opt);
                                    return (
                                      <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${isCorrect ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-200'}`}>
                                        <button
                                          type="button"
                                          onClick={() => toggleAnswer(opt)}
                                          className={`flex-shrink-0 w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                                            isCorrect ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 hover:border-indigo-400'
                                          }`}
                                        >
                                          {isCorrect && <CheckCircle2 className="w-3 h-3 text-white" />}
                                        </button>
                                        <span className="flex-1 text-sm">{opt}</span>
                                        <button
                                          type="button"
                                          onClick={() => removeOption(opt)}
                                          className="text-slate-400 hover:text-rose-500"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    );
                                  })}
                                  
                                  <div className="flex gap-2">
                                    <Input
                                      placeholder="Add an option..."
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          e.preventDefault();
                                          addOption(e.currentTarget.value);
                                          e.currentTarget.value = '';
                                        }
                                      }}
                                    />
                                  </div>
                                  <p className="text-xs text-slate-500">Press Enter to add an option. Check the box to mark it as correct.</p>
                                </div>
                              );
                            }}
                          />
                        )}
                      />
                      {qErrors?.options && <p className="text-sm text-rose-500">{qErrors.options.message}</p>}
                    </div>
                  )}

                  {qErrors?.correctAnswers && (
                    <p className="text-sm text-rose-500">{qErrors.correctAnswers.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {errors.questions?.root && (
        <p className="text-sm text-rose-500">{errors.questions.root.message}</p>
      )}

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <Button
          type="button"
          variant="secondary"
          onClick={() => append({ text: '', type: 'INPUT', correctAnswers: [], options: [] })}
          className="w-full sm:w-auto border-dashed border-2 hover:border-indigo-300 hover:text-indigo-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Question
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto shadow-indigo-500/25"
        >
          {isSubmitting ? 'Creating...' : 'Save Quiz'}
        </Button>
      </div>
    </form>
  );
}
