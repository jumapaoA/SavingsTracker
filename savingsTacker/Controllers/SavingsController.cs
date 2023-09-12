using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using savingsTacker.Data;
using savingsTacker.Data.Repositories.IRepositories;
using savingsTacker.Models;
using System.Linq;

namespace savingsTacker.Controllers
{
    [ApiController]
    [Authorize]
    public class SavingsController : Controller
    {
        public readonly ApplicationDbContext _DbContext;
        public readonly IGroupSavingsRepository _GroupSavings;
        public readonly ISavingsRepository _Savings;

        public SavingsController(ApplicationDbContext dbContext, IGroupSavingsRepository groupSavings, ISavingsRepository savings)
        {
            _DbContext = dbContext;
            _GroupSavings = groupSavings;
            _Savings = savings;
        }

        #region Getters that Returns a Saving Type

        [HttpGet]
        [Route("/[controller]")]
        public IEnumerable<Saving> GetAllSavings()
        {
            return _Savings.GetAllSavings();
        }

        [HttpGet]
        [Route("/[controller]/user/{userId:guid}")]
        public IEnumerable<Saving> GetSavingsByUserId(string userId)
        {
            return _Savings.GetSavingsByUserId(userId);
        }

        [HttpGet]
        [Route("/[controller]/{savingId:int}")]
        public Saving? GetSavingBySavingId(int savingId)
        {
            return _Savings.GetSavingsById(savingId);
        }

        [HttpGet]
        [Route("/[controller]/group/{groupId:int}")]
        public IEnumerable<Saving> GetSavingsByGroupId(int groupId)
        {
            return _GroupSavings.GetSavingsByGroupId(groupId);
        }

        [HttpGet]
        [Route("/[controller]/savingsInGroup/{userId:guid}")]
        public IEnumerable<Saving> GetAllGroupSavingsByUserId(string userId)
        {
            return _GroupSavings.GetAllGroupSavingsByUserId(userId);
        }

        #endregion

        #region Create

        //[HttpPost]
        //[Route("/[controller]/create")]
        //public async Task<ActionResult> CreateSaving()
        //{
        //    DateTime currentDate = DateTime.Now;
        //    Random Random = new Random();
        //    int NewSavingsId = Random.Next(0, 1000);
        //    var Savings = _Savings.GetSavingsById(NewSavingsId);

        //    while(Savings != null)
        //    {
        //        NewSavingsId = Random.Next(0,1000);
        //        Savings = _Savings.GetSavingsById(NewSavingsId);
        //    }

        //    Savings = new Saving()
        //    {
        //        Id = NewSavingsId,
        //        Amount = Request.Form["Amount"].ToString(),
        //    };
        //}

        #endregion
    }
}
