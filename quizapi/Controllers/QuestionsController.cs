using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using quizapi.Data;
using quizapi.Dtos.Questions;
using quizapi.Interfaces;
using quizapi.Mappers;

namespace quizapi.Controllers
{
    [Route("api/questions")]
    public class QuestionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IQuestionsRepository _questionsRepo;
        public QuestionsController(ApplicationDbContext context, IQuestionsRepository questionsRepo)
        {
            _questionsRepo = questionsRepo;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var questions = await _questionsRepo.GetAllAsync();

            var questionDto = questions.Select(b => b.ToGetQuestionsDto());

            return Ok(questions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var questions = await _questionsRepo.GetByIdAsync(id);

            if(questions == null)
            {
                return NotFound();
            }

            return Ok(questions.ToGetQuestionsDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateQuestions questionDto)
        {
            var questionModel = questionDto.ToQuestionsFromCreateDto();
            await _questionsRepo.AddAsync(questionModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = questionModel.QuestionId }, questionModel.ToGetQuestionsDto());
        }
        
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update ([FromRoute] int id, [FromBody] UpdateQuestions updateDto)
        {
            var questionModel = await _questionsRepo.GetByIdAsync(id);

            if (questionModel == null)
            {
                return NotFound();
            }

            questionModel.Operator = updateDto.Operator;
            questionModel.Operand1 = updateDto.Operand1;

            questionModel.Operand2 = updateDto.Operand2;
            questionModel.Answer = updateDto.Answer;

            await _context.SaveChangesAsync();

            return Ok(questionModel.ToGetQuestionsDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var questionModel = await _questionsRepo.GetByIdAsync(id);

            if(questionModel == null)
            {
                return NotFound();
            }
             
            await _questionsRepo.DeleteAsync(id);

            return NoContent();
        }
    }
}