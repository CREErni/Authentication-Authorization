using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace quizapi.Models
{
    public class Scores
    {
        public int ScoreId { get; set; }
        public int UserId { get; set; }
        public int ScoreValue { get; set; }
        public required string Operator { get; set; }
        public DateTime AttemptedAt { get; set; } = DateTime.UtcNow;
    }
}