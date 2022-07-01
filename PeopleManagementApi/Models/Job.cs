namespace PeopleManagementApi.Models
{
    public class Job {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string Type { get; set; }
        public Company Comp { get; set; }
        public ICollection<People> People { get; set; }
    }
    
}