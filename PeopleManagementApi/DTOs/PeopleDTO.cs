
namespace PeopleManagementApi.DTOs
{
    public class PeopleDTO
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Location { get; set; }
        public string Email { get; set; }
        public int YearsOfExperience { get; set; }
        public ICollection<SkillDTO>? Skills { get; set; }
    }
}