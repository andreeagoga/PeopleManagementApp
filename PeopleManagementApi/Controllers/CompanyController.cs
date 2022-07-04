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
    [Authorize]
    public class CompanyController : ControllerBase
    {
        private readonly PeopleManagementContext _context;

        public CompanyController(PeopleManagementContext context)
        {
            _context = context;
        }

        // GET: api/Company
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompanyDTO>>> GetCompanies(string? searchLocation)
        {
            var claims = (User.Identity as ClaimsIdentity).Claims;
            var currentLoggedInUser =_context.Users.Find(long.Parse(claims.FirstOrDefault(c => c.Type == "UserId").Value));
            var query = _context.Companies.AsQueryable();

            if(searchLocation != null)
            {
                query = query.Where(item => item.Location == searchLocation);
            }
            
            return await query.Include(t => t.Jobs)
            .Select(item => CompanyMappers.CompanyToDTO(item))
            .ToListAsync();
        }

        // GET: api/Company/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CompanyDTO>> GetCompany(long id)
        {
               var company = await _context.Companies.Include(s => s.Jobs).FirstOrDefaultAsync(item => item.Id == id);

                if (company == null)
                {
                    return NotFound();
                }

                return CompanyMappers.CompanyToDTO(company);

        }

        // PUT: api/Company/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCompany(long id, CompanyDTO companyDTO)
        {
            if (id != companyDTO.Id)
            {
                return BadRequest();
            }
            var company = await _context.Companies.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }

            company.Name = companyDTO.Name;
            company.Description = companyDTO.Description;
            company.Location = companyDTO.Location;
            // company.Jobs = await _context.Jobs.Where(item => companyDTO.Jobs.Any(item2 => item2.Id == item.Id)).ToListAsync();

            try {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(company.Id))
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

        // POST: api/Company
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CompanyDTO>> AddCompany(CompanyDTO companyDTO, long id)
        {
            var currentLoggedInUser = User.Identity.Name;
            var company = CompanyMappers.DTOToCompany(companyDTO);

            var job = await _context.Companies.Include(s => s.Jobs).FirstOrDefaultAsync(item => item.Id == id);

            _context.Companies.Add(company);
            await _context.SaveChangesAsync();
            

            return CreatedAtAction(nameof(GetCompany), new { id = company.Id }, CompanyMappers.CompanyToDTO(company));
        }

        // DELETE: api/Company/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CompanyDTO>> DeleteCompany(long id)
        {
            var company = await _context.Companies.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool CompanyExists(long id)
        {
            return _context.Companies.Any(e => e.Id == id);
        }
    }
}
        