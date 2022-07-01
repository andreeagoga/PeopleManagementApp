

namespace PeopleManagementApi.DTOs
{
    public class JobDTO 
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string Type { get; set; }
        public ICollection<PeopleDTO>? People { get; set; }
    }
    
}