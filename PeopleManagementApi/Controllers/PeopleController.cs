
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
    [Route("api/company/job/[controller]")]
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
        [HttpGet("{companyId}/{jobId}")]
        public async Task<ActionResult<IEnumerable<PeopleDTO>>> GetPeopleAll(long jobId, long companyId)
        {
            var query = _context.People.AsQueryable();

            return await query.Include(t => t.Skills)
            .Where(item => item.Parent.Comp.Id == companyId)
            .Where(item => item.Parent.Id == jobId)
            .Select(item => PeopleMappers.PeopleToDTO(item))
            .ToListAsync();
            
        }

        // GET: api/People/5
        [HttpGet("{companyId}/{jobId}/{id}")]
        public async Task<ActionResult<PeopleDTO>> GetPeople(long id, long jobId, long companyId)
        {
            var people = await _context.People
            .Where(item => item.Parent.Comp.Id == companyId)
            .Where(item => item.Parent.Id == jobId)
            .Where(item => item.Id == id)
            .Select(item => PeopleMappers.PeopleToDTO(item))
            .FirstOrDefaultAsync();
            return people;
        }

        // PUT: api/People/5
        [HttpPut("{companyId}/{jobId}/{id}")]
        public async Task<ActionResult<PeopleDTO>> PutPeople(long id, PeopleDTO peopleDTO, long jobId, long companyId)
        {
            var people = await _context.People
            .Where(item => item.Parent.Id == jobId)
            .Where(item => item.Parent.Comp.Id == companyId)
            .Where(item => item.Id == id)
            .FirstOrDefaultAsync();
            if (people == null)
            {
                return NotFound();
            }
            people.FirstName = peopleDTO.FirstName;
            people.LastName = peopleDTO.LastName;
            people.Phone = peopleDTO.Phone;
            people.Email = peopleDTO.Email;
            people.Location = peopleDTO.Location;
            people.YearsOfExperience = peopleDTO.YearsOfExperience;
            
            await _context.SaveChangesAsync();
            return PeopleMappers.PeopleToDTO(people);
        }
    
    

        //POST: api/People
        [HttpPost("{companyId}/{jobId}")]
        public async Task<ActionResult<PeopleDTO>> PostPeople(PeopleDTO peopleDTO, long jobId, long companyId)
        {
            var company = await _context.Companies.FindAsync(companyId);
            var job = await _context.Jobs.FindAsync(jobId);
            job.Comp = company;
            var people = PeopleMappers.DTOToPeople(peopleDTO);
            people.Parent = job;
        
            _context.People.Add(people);
            await _context.SaveChangesAsync();
        
            return PeopleMappers.PeopleToDTO(people);
        }

        // DELETE: api/People/5
        [HttpDelete("{companyId}/{jobId}/{id}")]
        public async Task<ActionResult<PeopleDTO>> DeletePeople(long id, long jobId, long companyId)
        {
            var people = await _context.People
            .Where(item => item.Parent.Id == jobId)
            .Where(item => item.Parent.Comp.Id == companyId)
            .Where(item => item.Id == id)
            .FirstOrDefaultAsync();
            if (people == null)
            {
                return NotFound();
            }
            _context.People.Remove(people);
            await _context.SaveChangesAsync();
            return PeopleMappers.PeopleToDTO(people);
        }

        private bool PeopleExists(long id)
        {
            return _context.People.Any(e => e.Id == id);
        }
    }
  

}