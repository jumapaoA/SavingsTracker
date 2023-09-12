namespace savingsTacker.Models
{
    public class GroupDetails
    {
        public int Id { get; set; }
        public string GroupName { get; set; } = "";
        public string GroupDescription { get; set; } = "";
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
        public bool IsActive {  get; set; }
    }
}
