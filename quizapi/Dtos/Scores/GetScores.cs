using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace quizapi.Dtos.Scores
{
    public class GetScores
    {
         public int ScoreId { get; set; }
        public int UserId { get; set; }
        public int ScoreValue { get; set; }
        public required string Operator { get; set; }
        public DateTime AttemptedAt { get; set; } = DateTime.UtcNow;
    }
}