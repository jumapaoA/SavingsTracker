using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace savingsTacker.Controllers
{
    public class SavingsForm
    {
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Amount { get; set; }
        public string UserId { get; set; } = "";
        public bool IsActive { get; set; }
    }
}
