using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace savingsTacker.Models
{
    public class Saving
    {
        public int Id { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Amount { get; set; }
        public string Description { get; set; } = "";
        public string UserId { get; set; } = "";
        public string UserUpdated { get; set; } = "";
        public DateTime DateContributed { get; set; }
        public DateTime DateUpdated { get; set; }
        public bool IsActive { get; set; }
    }
}
