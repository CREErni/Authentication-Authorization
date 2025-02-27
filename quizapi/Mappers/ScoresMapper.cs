using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using quizapi.Dtos.Scores;
using quizapi.Models;

namespace quizapi.Mappers
{
    public static class ScoresMapper
    {
        public static GetScores ToGetScoresDto(this Scores scoresModel) 
        {
            return new GetScores
            {
                ScoreId = scoresModel.ScoreId,
                UserId = scoresModel.UserId,
                ScoreValue = scoresModel.ScoreValue,
                Operator = scoresModel.Operator,
                AttemptedAt = scoresModel.AttemptedAt
            };
        }
        
        public static Scores ToScoresFromCreateDto(this CreateScores scoresDto)
            {
                return new Scores
                {
                    UserId = scoresDto.UserId,
                    ScoreValue = scoresDto.ScoreValue,
                    Operator = scoresDto.Operator,
                };
            }
        
    }
}