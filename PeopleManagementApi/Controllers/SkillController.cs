#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeopleManagementApi.Models;
using PeopleManagementApi.DTOs;
using PeopleManagementApi.Mappers;
using System.Security.Claims;

namespace PeopleManagementApi.Controllers
{
    [Route("api/company")]
    [ApiController]
    // [Authorize]
    public class SkillController : ControllerBase
    {
        private readonly PeopleManagementContext _context;

        public SkillController(PeopleManagementContext context)
    {
        _context = context;
    }

   // GET: api/Skill
        [HttpGet("{companyId}/job/{jobId}/people/{peopleId}/[controller]")]
        public async Task<ActionResult<IEnumerable<SkillDTO>>> GetSkills(long skillId, long peopleId, long jobId, long companyId)
        {
            var query = _context.Skills.AsQueryable();
            return await query.Where(item => item.Parent.Id == peopleId && item.Parent.Parent.Id == jobId && item.Parent.Parent.Comp.Id == companyId)
            .Select(item => SkillMappers.SkillToDTO(item))
            .ToListAsync();
        }
        //    var query = _context.People.AsQueryable();

        //     return await query.Include(t => t.Skills)
        //     .Where(item => item.Parent.Comp.Id == companyId)
        //     .Where(item => item.Parent.Id == jobId)
        //     .Select(item => PeopleMappers.PeopleToDTO(item))
        //     .ToListAsync();

    // GET: api/Skill/5
        [HttpGet("{companyId}/job/{jobId}/people/{peopleId}/[controller]/{skillId}")]
        public async Task<ActionResult<SkillDTO>> GetSkill(long skillId, long peopleId, long jobId, long companyId)
        {
            var skill = await _context.Skills
            .Where(item => item.Parent.Id == peopleId)
            .Where(item => item.Parent.Parent.Id == jobId)
            .Where(item => item.Parent.Parent.Comp.Id == companyId)
            .Where(item => item.Id == skillId)
            .Select(item => SkillMappers.SkillToDTO(item))
            .FirstOrDefaultAsync();
            return skill;
        }

    //PUT: api/Skill/5
        [HttpPut("{companyId}/job/{jobId}/people/{peopleId}/[controller]/{skillId}")]
        public async Task<ActionResult<SkillDTO>> PutSkill(long skillId, SkillDTO skillDTO, long peopleId, long jobId, long companyId)
        {
            var skill = await _context.Skills
            .Where(item => item.Parent.Id == peopleId)
            .Where(item => item.Parent.Parent.Id == jobId)
            .Where(item => item.Parent.Parent.Comp.Id == companyId)
            .Where(item => item.Id == skillId)
            .FirstOrDefaultAsync();
            if (skill == null)
            {
                return NotFound();
            }
            skill.Name = skillDTO.Name;
            skill.Level = skillDTO.Level;
            skill.Type = skillDTO.Type;

            await _context.SaveChangesAsync();
            return SkillMappers.SkillToDTO(skill);
        }
  

    //POST: api/Skill
    [HttpPost("{companyId}/job/{jobId}/people/{peopleId}/[controller]")]
    public async Task<ActionResult<SkillDTO>> PostSkill(SkillDTO skillDTO, long jobId, long companyId, long peopleId)
    {
       var company = await _context.Companies.FindAsync(companyId);
        var job = await _context.Jobs.FindAsync(jobId);
        job.Comp = company;
        var people = await _context.People.FindAsync(peopleId);
        people.Parent = job;
        var skill = SkillMappers.DTOToSkill(skillDTO);
        skill.Parent = people;

        _context.Skills.Add(skill);
        await _context.SaveChangesAsync();

        return SkillMappers.SkillToDTO(skill);
    }

    // DELETE: api/Skill/5
    [HttpDelete("{companyId}/job/{jobId}/people/{peopleId}/[controller]/{skillId}")]
    public async Task<ActionResult<SkillDTO>> DeleteSkill(long skillId, long peopleId, long jobId, long companyId)
    {
        var skill = await _context.Skills
        .Where(item => item.Parent.Parent.Comp.Id == companyId)
        .Where(item => item.Parent.Parent.Id == jobId)
        .Where(item => item.Parent.Id == peopleId)
        .Where(item => item.Id == skillId)
        .FirstOrDefaultAsync();
        if (skill == null)
        {
            return NotFound();
        }
        _context.Skills.Remove(skill);
        await _context.SaveChangesAsync();
        return SkillMappers.SkillToDTO(skill);
    }

    private bool SkillExists(long skillId)
    {
        return _context.Skills.Any(e => e.Id == skillId);
    }
}

}