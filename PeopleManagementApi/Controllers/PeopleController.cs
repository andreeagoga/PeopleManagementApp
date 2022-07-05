
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
    // [Authorize]
    public class PeopleController : ControllerBase
    {
        private readonly PeopleManagementContext _context;

        public PeopleController(PeopleManagementContext context)
    {
        _context = context;
    }

        // GET: api/People
        [HttpGet("{companyId}/job/{jobId}/[controller]")]
        public async Task<ActionResult<IEnumerable<PeopleDTO>>> GetPeopleAll(long companyId, long jobId)
        {
            var query = _context.People.AsQueryable();

            return await query.Include(t => t.Skills)
            .Where(item => item.Parent.Comp.Id == companyId)
            .Where(item => item.Parent.Id == jobId)
            .Select(item => PeopleMappers.PeopleToDTO(item))
            .ToListAsync();
            
        }

        // GET: api/People/5
        [HttpGet("{companyId}/job/{jobId}/[controller]/{idPerson}")]
        public async Task<ActionResult<PeopleDTO>> GetPeople( long companyId, long jobId, long peopleId)
        {
            var people = await _context.People
            .Where(item => item.Parent.Comp.Id == companyId)
            .Where(item => item.Parent.Id == jobId)
            .Where(item => item.Id == peopleId)
            .Select(item => PeopleMappers.PeopleToDTO(item))
            .FirstOrDefaultAsync();
            return people;
        }

        // PUT: api/People/5
        [HttpPut("{companyId}/job/{jobId}/[controller]/{peopleId}")]
        public async Task<ActionResult<PeopleDTO>> PutPeople(long peopleId, PeopleDTO peopleDTO, long jobId, long companyId)
        {
            var people = await _context.People
            .Where(item => item.Parent.Id == jobId)
            .Where(item => item.Parent.Comp.Id == companyId)
            .Where(item => item.Id == peopleId)
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
        [HttpPost("{companyId}/job/{jobId}/[controller]")]
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
        [HttpDelete("{companyId}/job/{jobId}/[controller]/{id}")]
        public async Task<ActionResult<PeopleDTO>> DeletePeople(long peopleId, long jobId, long companyId)
        {
            var people = await _context.People
            .Where(item => item.Parent.Id == jobId)
            .Where(item => item.Parent.Comp.Id == companyId)
            .Where(item => item.Id == peopleId)
            .FirstOrDefaultAsync();
            if (people == null)
            {
                return NotFound();
            }
            _context.People.Remove(people);
            await _context.SaveChangesAsync();
            return PeopleMappers.PeopleToDTO(people);
        }

        private bool PeopleExists(long peopleId)
        {
            return _context.People.Any(e => e.Id == peopleId);
        }
    }
  

}