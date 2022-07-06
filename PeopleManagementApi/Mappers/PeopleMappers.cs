using PeopleManagementApi.Models;
using PeopleManagementApi.DTOs;

namespace PeopleManagementApi.Mappers
{
    public class PeopleMappers
    {
        public static PeopleDTO PeopleToDTO(People people) =>
            new()
            {
                Id = people.Id,
                FirstName = people.FirstName,
                LastName = people.LastName,
                Email = people.Email,
                Phone = people.Phone,
                Location = people.Location,
                YearsOfExperience = people.YearsOfExperience,
                Skills = people.Skills?.Select(si => SkillMappers.SkillToDTO(si)).ToList(),
            };
        
        public static People DTOToPeople(PeopleDTO peopleDTO) =>
            new People
            {
                Id = peopleDTO.Id,
                FirstName = peopleDTO.FirstName,
                LastName = peopleDTO.LastName,
                Email = peopleDTO.Email,
                Phone = peopleDTO.Phone,
                Location = peopleDTO.Location,
                YearsOfExperience = peopleDTO.YearsOfExperience,
                Skills = peopleDTO.Skills?.Select(skillDTO => SkillMappers.DTOToSkill(skillDTO)).ToList(),
            };
    }
}