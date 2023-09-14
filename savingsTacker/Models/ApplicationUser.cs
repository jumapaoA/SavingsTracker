using Microsoft.AspNetCore.Identity;
using System;

namespace savingsTacker.Models
{
    public class ApplicationUser : IdentityUser
    {
        [PersonalData]
        public string FirstName { get; set; } = "";
        [PersonalData]
        public string LastName { get; set; } = "";
        [PersonalData]
        public string Password { get; set; } = "";
        [PersonalData]
        public string Gender { get; set; } = "";
        [PersonalData]
        public string NumberType { get; set; } = "";
        [PersonalData]
        public string ContactNumber { get; set; } = "";
        [PersonalData]
        public string AddressStreet { get; set; } = "";
        [PersonalData]
        public string AddressBarangay { get; set; } = "";
        [PersonalData]
        public string AddressProvince { get; set; } = "";
        [PersonalData]
        public string AddressCity { get; set; } = "";
        [PersonalData]
        public string ProfilePicURL { get; set; } = "";
        public DateTime AccountCreated { get; set; }
        [PersonalData]
        public bool IsActive { get; set; }
    }
}