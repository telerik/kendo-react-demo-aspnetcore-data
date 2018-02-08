using Microsoft.AspNetCore.Mvc;
using reactSpa.Models;
using Kendo.Mvc.UI;
using Kendo.Mvc.Extensions;

namespace reactSpa.Controllers
{
    [Produces("application/json")]
    [Route("api/Products")]
    public class ProductsController : Controller
    {
        private readonly SampleContext _context;

        public ProductsController(SampleContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public JsonResult GetProducts([DataSourceRequest]DataSourceRequest request)
        {
            var result = Json(_context.Products.ToDataSourceResult(request));
            return result;
        }
    }
}