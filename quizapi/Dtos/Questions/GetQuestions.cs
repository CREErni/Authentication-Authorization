using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace quizapi.Dtos.Questions
{
    public class GetQuestions
    {
        public int QuestionId { get; set; }
        public required string Operator { get; set; }
        public int Operand1 { get; set; }
        public int Operand2 { get; set; }
        public int Answer { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}