using PeopleManagementApi.Models;
using PeopleManagementApi.DTOs;

namespace PeopleManagementApi.Mappers
{
    public class SkillMappers
    {
        public static SkillDTO SkillToDTO(Skill skill) =>
            new()
            {
                Id = skill.Id,
                Name = skill.Name,
                Level = skill.Level,
                Type = skill.Type,
                // People = skill.People?.Select(si => PeopleMappers.MapPeopleToPeopleDTO(si)).ToList(),
            };
        
        public static Skill DTOToSkill(SkillDTO skillDTO) =>
            new Skill
            {
                Name = skillDTO.Name,
                Level = skillDTO.Level,
                Type = skillDTO.Type,
                // People = skillDTO.People?.Select(peopleDTO => PeopleMappers.MapPeopleDTOToPeople(peopleDTO)).ToList(),
            };
    }
}