using PeopleManagementApi.Models;
using PeopleManagementApi.DTOs;

namespace PeopleManagementApi.Mappers
{
    public class JobMappers
    {
        public static JobDTO JobToDTO(Job job) =>
            new ()
            {
                Id = job.Id,
                Title = job.Title,
                Description = job.Description,
                Location = job.Location,
                Type = job.Type,
                People = job.People?.Select(si => PeopleMappers.PeopleToDTO(si)).ToList(),
            };
        
        public static Job DTOToJob(JobDTO jobDTO) =>
            new Job
            {
                Id = jobDTO.Id,
                Title = jobDTO.Title,
                Description = jobDTO.Description,
                Location = jobDTO.Location,
                Type = jobDTO.Type,
                People = jobDTO.People?.Select(peopleDTO => PeopleMappers.DTOToPeople(peopleDTO)).ToList(),
            };
    }
}