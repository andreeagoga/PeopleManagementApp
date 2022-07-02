namespace PeopleManagementApi.Models
{
    public class Skill
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public string Type { get; set; }
        public People Parent { get; set; }
        // public ICollection<People> People { get; set; }
    }
    
}

