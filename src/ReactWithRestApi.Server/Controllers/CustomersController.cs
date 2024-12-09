using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactWithRestApi.Server.Models;

namespace ReactWithRestApi.Server.Controllers;

// IMPORTANT: To recreate what I did here for your SQL server's context follow this tutorial https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-9.0&tabs=visual-studio
// That shows you how to make the connection to the SQL server using EntityFramework Core.
//
// Once that is working, now you can focus on the Kendo topics:
// A - accept the Kendo Grid's DataSourceRequest in each method
// B - return the Kendo Grid's DataSourceResult from each method
// This is what I have done below.

[ApiController]
[Route("api/[controller]")]
public class CustomersController(SalesDbContext dbContext) : ControllerBase
{
    // GET: api/customers
    [HttpGet]
    public async Task<IActionResult> GetCustomers([DataSourceRequest] DataSourceRequest request)
    {
        try
        {
            return new JsonResult(await CreateResponse(request));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> AddCustomer([DataSourceRequest] DataSourceRequest request, CustomerEntity customer)
    {
        try
        {
            await dbContext.AddAsync(customer);

            await dbContext.SaveChangesAsync();

            return new JsonResult(await CreateResponse(request));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCustomer([DataSourceRequest] DataSourceRequest request, CustomerEntity customer)
    {
        try
        {
            var originalItem = await dbContext.FindAsync<CustomerEntity>(customer.Id);

            if (originalItem != null)
            {
                dbContext.Entry(originalItem).State = EntityState.Detached;

                dbContext.Update(customer);
 
                await dbContext.SaveChangesAsync();
            }

            return new JsonResult(await CreateResponse(request));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCustomer([DataSourceRequest] DataSourceRequest request, CustomerEntity customer)
    {
        try
        {
            var originalItem = await dbContext.FindAsync<CustomerEntity>(customer.Id);

            if(originalItem == null)
            {
                dbContext.Remove(customer);

                await dbContext.SaveChangesAsync();
            }

            return new JsonResult(await CreateResponse(request));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    private async Task<DataSourceResult> CreateResponse(DataSourceRequest request)
    {
        // Uses ToDataSourceResultAsync to format the response to what the Kendo Grid is expecting (contains sorting, filtering, page and grouping information).
        // The DataSourceRequest object is passed in from the Kendo Grid and contains the information about the current state of the grid.
        // The ToDataSourceResultAsync method is an extension method that automatically converts the IQueryable to a DataSourceResult object.
        // The DataSourceResponse object is what the Kendo Grid is expecting to receive back from the REST API.
        var currentPageOfCustomers = await dbContext.Customers.ToDataSourceResultAsync(request);

        return currentPageOfCustomers;
    }
}