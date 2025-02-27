using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using quizapi.Data;
using quizapi.Dtos.Scores;
using quizapi.Interfaces;
using quizapi.Mappers;

namespace quizapi.Controllers
{
    [Route("api/scores")]
    public class ScoresController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IScoresRepository _scoresRepo;
        public ScoresController(ApplicationDbContext context, IScoresRepository scoresRepo)
        {
            _scoresRepo = scoresRepo;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var scores = await _scoresRepo.GetAllAsync();

            var scoreDto = scores.Select(b => b.ToGetScoresDto());

            return Ok(scores);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var scores = await _scoresRepo.GetByIdAsync(id);

            if(scores == null)
            {
                return NotFound();
            }

            return Ok(scores.ToGetScoresDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateScores scoreDto)
        {
            var scoreModel = scoreDto.ToScoresFromCreateDto();
            await _scoresRepo.AddAsync(scoreModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = scoreModel.ScoreId }, scoreModel.ToGetScoresDto());
        }
        
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update ([FromRoute] int id, [FromBody] UpdateScores updateDto)
        {
            var scoreModel = await _scoresRepo.GetByIdAsync(id);

            if (scoreModel == null)
            {
                return NotFound();
            }

            scoreModel.UserId = updateDto.UserId;
            scoreModel.ScoreValue = updateDto.ScoreValue;
            scoreModel.Operator = updateDto.Operator;

            await _context.SaveChangesAsync();

            return Ok(scoreModel.ToGetScoresDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var scoreModel = await _scoresRepo.GetByIdAsync(id);

            if(scoreModel == null)
            {
                return NotFound();
            }
             
            await _scoresRepo.DeleteAsync(id);

            return NoContent();
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUserId([FromRoute] int userId)
        {
            var scores = await _scoresRepo.GetByUserIdAsync(userId);
            if (scores == null || !scores.Any())
            {
                return NotFound();
            }
            var scoreDtos = scores.Select(s => s.ToGetScoresDto());
            return Ok(scoreDtos);
        }
    }
}