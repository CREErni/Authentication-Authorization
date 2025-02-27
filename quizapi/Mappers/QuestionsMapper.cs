using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using quizapi.Dtos;
using quizapi.Dtos.Questions;
using quizapi.Models;

namespace quizapi.Mappers
{
    public static class QuestionsMapper
    {
         public static GetQuestions ToGetQuestionsDto(this Questions questionsModel) 
        {
            return new GetQuestions
            {
                QuestionId = questionsModel.QuestionId,
                Operator = questionsModel.Operator,
                Operand1 = questionsModel.Operand1,
                Operand2 = questionsModel.Operand2,
                Answer = questionsModel.Answer,
                CreatedAt = questionsModel.CreatedAt
            };
        }
        
        public static Questions ToQuestionsFromCreateDto(this CreateQuestions questionsDto)
            {
                return new Questions
                {
                    Operator = questionsDto.Operator,
                    Operand1 = questionsDto.Operand1,
                    Operand2 = questionsDto.Operand2,
                    Answer = questionsDto.Answer
                };
            }
    }
}