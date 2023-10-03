using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace savingsTacker.Areas.Identity.Pages.Account.Manage
{
    public class SuccessViewModel : PageModel
    {
        public string Message { get; set; }
        public void OnGet()
        {
        }
    }
}
