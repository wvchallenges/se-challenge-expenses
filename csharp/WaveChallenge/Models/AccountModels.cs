using System.Web;
using PagedList;

namespace WaveChallenge.Models
{
    public class PostFileModel
    {
        public HttpPostedFile File { get; set; }
    }

    public class HomeModel
    {
        public PagedList<Expense> Expenses { get; set; }

        public HttpPostedFile File { get; set; }
    }
}