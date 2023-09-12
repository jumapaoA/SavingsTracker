namespace savingsTacker.Models
{
    public class GroupMember
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public string UserId { get; set; } = "";
        public bool IsAdmin { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime DateRemoved { get; set; }
        public bool IsActive { get; set; } 
    }
}
