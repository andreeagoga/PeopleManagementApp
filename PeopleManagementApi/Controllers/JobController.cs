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
    [Route("api/company/[controller]")]
    [ApiController]
    [Authorize]
    public class JobController : ControllerBase
    {
        private readonly PeopleManagementContext _context;

        public JobController(PeopleManagementContext context)
        {
            _context = context;
        }

        // GET: api/company/job/5
        [HttpGet("{companyId}")]
        public async Task<ActionResult<IEnumerable<JobDTO>>> GetJobs(long companyId)
        {
            return await _context.Jobs
            .Where(item => item.Comp.Id == companyId)
            .Select(item => JobMappers.JobToDTO(item))
            .ToListAsync();
            
        }

        // GET: api/company/job/5/5
        [HttpGet("{companyId}/{id}")]
        public async Task<ActionResult<JobDTO>> GetJob(long id, long companyId)
        {
            var job = await _context.Jobs
            .Where(item => item.Comp.Id == companyId)
            .Where(item => item.Id == id)
            .Select(item => JobMappers.JobToDTO(item))
            .FirstOrDefaultAsync();

            if (job == null)
            {
                return NotFound();
            }

            return job;
        }

        //Put: api/company/job/5/5
        [HttpPut("{companyId}/{id}")]
        public async Task<IActionResult> PutJob(long id, JobDTO jobDTO)
        {
            if (id != jobDTO.Id)
            {
                return BadRequest();
            }

            _context.Entry(JobMappers.DTOToJob(jobDTO)).State = EntityState.Modified;
            // var job = await _context.Jobs.FindAsync(id);
            // if (job == null)
            // {
            //     return NotFound();
            // }
            // job.Title = jobDTO.Title;
            // job.Description = jobDTO.Description;
            // job.Location = jobDTO.Location;
            // job.Type = jobDTO.Type;
            // job.People = await _context.People.Where(item => jobDTO.People.Any(item2 => item2.Id == item.Id)).ToListAsync();
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        // POST: api/company/job
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("{companyId}")]
        public async Task<ActionResult<JobDTO>> PostJob(long companyId, JobDTO jobDTO)
        {
            
            var company = await _context.Companies.FindAsync(companyId);
            var job = JobMappers.DTOToJob(jobDTO);
            job.Comp = company;
       

            if (company == null)
            {
                return NotFound();
            }

             _context.Jobs.Add(job);
            await _context.SaveChangesAsync();
            return JobMappers.JobToDTO(job);
        }
    

        // DELETE: api/company/job/5/5
        [HttpDelete("{companyId}/{id}")]
        public async Task<ActionResult<JobDTO>> DeleteJob(long id, long companyId)
        {
            var company = await _context.Companies.FindAsync(companyId);
            var job = await _context.Jobs.FindAsync(id);
            if (job == null || company == null)
            {
                return NotFound();
            }
    
            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();
            return JobMappers.JobToDTO(job);
        }
        private bool JobExists(long id)
        {
            return _context.Jobs.Any(e => e.Id == id);
        }
    }
}