namespace PeopleManagementApi.Models
{
    public class People
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Location { get; set; }
        public string Email { get; set; }
        public int YearsOfExperience { get; set; }
        public Job Parent { get; set; }
        public ICollection<Skill> Skills { get; set; }
    }
}