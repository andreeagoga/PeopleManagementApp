
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
    public class PeopleController : ControllerBase
    {
        private readonly PeopleManagementContext _context;

        public PeopleController(PeopleManagementContext context)
    {
        _context = context;
    }

   // GET: api/People
        [HttpGet("{jobId}")]
        public async Task<ActionResult<IEnumerable<PeopleDTO>>> GetPeople(long jobId)
        {
            return await _context.People
            .Where(item => item.Parent.Id == jobId)
            .Select(item => PeopleMappers.PeopleToDTO(item))
            .ToListAsync();
        }
    }

    //    [HttpPost]
    //     public async Task<ActionResult<JobDTO>> PostJob(JobDTO jobDTO)
    //     {
    //         var currentLoggedInUser = User.Identity.Name;
    //         var job = JobMappers.DTOToJob(jobDTO);

    //         _context.Jobs.Add(job);
    //         await _context.SaveChangesAsync();

    //         return CreatedAtAction(nameof(GetJob), new { id = job.Id }, JobMappers.JobToDTO(job));
    //     }
}