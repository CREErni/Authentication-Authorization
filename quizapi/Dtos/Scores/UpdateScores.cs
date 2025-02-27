using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace quizapi.Dtos.Scores
{
    public class UpdateScores
    {
        public int UserId { get; set; }
        public int ScoreValue { get; set; }
        public required string Operator { get; set; }
    }
}