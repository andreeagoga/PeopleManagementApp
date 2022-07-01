namespace PeopleManagementApi.Models

{
    public class Company
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public ICollection<Job> Jobs { get; set; }
   
    }
}