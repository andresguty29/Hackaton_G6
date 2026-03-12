using System.Text;
using System.Web.Mvc;

namespace CalendarApp.Filters
{
    public class Utf8ActionFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            filterContext.HttpContext.Response.ContentEncoding = Encoding.UTF8;
            filterContext.HttpContext.Response.HeaderEncoding = Encoding.UTF8;
            base.OnActionExecuting(filterContext);
        }
    }
}