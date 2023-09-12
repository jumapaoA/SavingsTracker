namespace savingsTacker.Models
{
    public class ActivityLog
    {
        public int Id { get; set; }
        public string UserId { get; set; } = "";
        public string Message { get; set; } = "";
        public DateTime DateAccess { get; set; }
    }
}
