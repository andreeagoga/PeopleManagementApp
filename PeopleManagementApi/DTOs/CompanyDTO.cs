
namespace PeopleManagementApi.DTOs

{
    public class CompanyDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public ICollection<JobDTO>? Jobs { get; set; }
   
    }
}