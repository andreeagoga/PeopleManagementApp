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
    [Route("api/company/")]
    [ApiController]
    [Authorize]
    public class JobController : ControllerBase
    {
        private readonly PeopleManagementContext _context;

        public JobController(PeopleManagementContext context)
        {
            _context = context;
        }

        // GET: api/company/5/job
        [HttpGet("{companyId}/[controller]")]
        public async Task<ActionResult<IEnumerable<JobDTO>>> GetJobs(long companyId, string? searchLocation, string? searchType, string? searchTitle)
        {
            
            var query = _context.Jobs.AsQueryable();

               if(searchLocation != null)
            {
                query = query.Where(item => item.Location == searchLocation);
            } 
            if(searchType != null)
            {
                query = query.Where(item => item.Type == searchType);
            }
            if(searchTitle != null)
            {
                query = query.Where(item => item.Title == searchTitle);
            }
            return await query.Include(t => t.People)
                .Where(item => item.Comp.Id == companyId)
                .Select(item => JobMappers.JobToDTO(item))
                .ToListAsync();
            
        }

        // GET: api/company/job/5/5
        [HttpGet("{companyId}/[controller]/{jobId}")]
        public async Task<ActionResult<JobDTO>> GetJob(long companyId, long jobId)
        {
            
            var job = await _context.Jobs
            .Include(t => t.People)
            .FirstOrDefaultAsync(item => item.Id == jobId && item.Comp.Id == companyId);

            if (job == null)
            {
                return NotFound();
            }

            return JobMappers.JobToDTO(job);

        }

        //Put: api/company/job/5/5
        [HttpPut("{companyId}/[controller]/{jobId}")]
        public async Task<IActionResult> PutJob(long companyId, long jobId,  JobDTO jobDTO)
        {
            var company = await _context.Companies.FindAsync(companyId);
            var job = JobMappers.DTOToJob(jobDTO);
            job.Comp = company;
            

            if (jobId != job.Id)
            {
                return BadRequest();
            }
            _context.Entry(job).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
            // if (jobId != jobDTO.Id)
            // {
            //     return BadRequest();
            // }
            // // var company = await _context.Companies.FindAsync(companyId);
            // var job = JobMappers.DTOToJob(jobDTO);

       
            // if (company == null || job == null)
            // {
            //     return NotFound();
            // }
        
            // job.Title = jobDTO.Title;
            // job.Description = jobDTO.Description;
            // job.Location = jobDTO.Location;
            // job.Type = jobDTO.Type;
            // job.Comp = company;
            // try {
            //     await _context.SaveChangesAsync();
            // }
            // catch (DbUpdateConcurrencyException)
            // {
            //     if (!JobExists(job.Id))
            //     {
            //         return NotFound();
            //     }
            //     else
            //     {
            //         throw;
            //     }
                
            // }

            // return NoContent();
         
        }

        // POST: api/company/job
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("{companyId}/[controller]")]
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
        [HttpDelete("{companyId}/[controller]/{jobId}")]
        public async Task<ActionResult<JobDTO>> DeleteJob(long companyId, long jobId)
        {
            var company = await _context.Companies.FindAsync(companyId);
            var job = await _context.Jobs.FindAsync(jobId);
            job.Comp = company;
            if (job == null || company == null)
            {
                return NotFound();
            }
    
            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();
            return JobMappers.JobToDTO(job);
        }

        private bool JobExists(long jobId)
        {
            return _context.Jobs.Any(e => e.Id == jobId);
        }
    }
}