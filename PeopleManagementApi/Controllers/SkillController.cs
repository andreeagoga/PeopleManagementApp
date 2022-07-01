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
    [Route("api/[controller]")]
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
        [HttpGet("{peopleId}")]
        public async Task<ActionResult<IEnumerable<SkillDTO>>> GetSkill(long peopleId)
        {
            return await _context.Skill
            .Where(item => item.Parent.Id == peopleId)
            .Select(item => SkillMappers.SkillToDTO(item))
            .ToListAsync();
        }
    }
}