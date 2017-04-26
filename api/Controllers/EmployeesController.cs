using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPIApplication.Controllers
{
    public class Employee
    {
        public DateTime BirthDate { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    [Route("api/employees")]
    public class EmployeesController : Controller
    {
        [Authorize("read:employees")]
        [HttpGet]
        public IActionResult GetAll()
        {
            return Json(new Employee[] 
            {
                new Employee
                {
                    BirthDate = DateTime.Now.AddYears(-36).AddDays(20),
                    FirstName = "Santiago",
                    LastName = "Rodriguez"
                },
                new Employee
                {
                    BirthDate = DateTime.Now.AddYears(-30).AddDays(-89),
                    FirstName = "Celia",
                    LastName = "Guapa"
                },
            });
        }

        [Authorize("create:employees")]
        [HttpPost]
        public IActionResult Create(Employee employee)
        {
            return Created("http://localhost:3636/api/employees/1", employee);
        }
    }
}
