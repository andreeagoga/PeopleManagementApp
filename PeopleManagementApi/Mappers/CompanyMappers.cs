using PeopleManagementApi.Models;
using PeopleManagementApi.DTOs;

namespace PeopleManagementApi.Mappers
{
    public class CompanyMappers
    {
        public static CompanyDTO CompanyToDTO(Company company) =>
            new()
            {
                Id = company.Id,
                Name = company.Name,
                Description = company.Description,
                Location = company.Location,
                Jobs = company.Jobs?.Select(si => JobMappers.JobToDTO(si)).ToList(),
            };
        
        public static Company DTOToCompany(CompanyDTO companyDTO) =>
            new Company
            {
                Name = companyDTO.Name,
                Description = companyDTO.Description,
                Location = companyDTO.Location,
                Jobs = companyDTO.Jobs?.Select(jobDTO => JobMappers.DTOToJob(jobDTO)).ToList(),
            };
    }
}