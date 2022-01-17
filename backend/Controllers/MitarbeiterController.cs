using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MitarbeiterController : Controller
    {
        private readonly IConfiguration _configuration;
        
        public MitarbeiterController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /*
        * Get employee by name
        *
        * return all ksv as json-format
        *
        * edit by David Nguyen
        * 15.01.2022
        */
        //api/Mitarbeiter/find
        [HttpGet("find")]
        public JsonResult FindById(string name)
        {
            string query = @"select ""NAME"" from ""Mitarbeiter"" where ""KURZZEICHEN"" = @name or ""NAME"" = @name ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@name", name);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        /*
        * Get email from employee by name
        *
        * return all ksv as json-format
        *
        * edit by David Nguyen
        * 15.01.2022
        */
        //api/Mitarbeiter/email
        [HttpGet("email")]
        public JsonResult GetEmail(string name)
        {
            string query = @"select ""EMAIL"" from ""Mitarbeiter"" where ""KURZZEICHEN"" = @name or ""NAME"" = @name ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@kurzzeichenOrName", kurzzeichenOrName);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        /*
        * Check if name and password is true
        *
        * return status message as json-format
        *
        * edit by David Nguyen
        * 15.01.2022
        */
        //api/Mitarbeiter/login
        [HttpGet("login")]
        public JsonResult Login(string name, string kurzzeichen)
        {
            string query = @"select exists(select 1 from ""Mitarbeiter"" where ""KURZZEICHEN"" = @kurzzeichen and ""NAME"" = @name)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            NpgsqlDataReader myReader;

            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@kurzzeichen", kurzzeichen);
                    myCommand.Parameters.AddWithValue("@name", name);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        /*
        * Get all names from employees
        *
        * return status message as json-format
        *
        * edit by David Nguyen
        * 15.01.2022
        */
        //api/Mitarbeiter/all
        [HttpGet("all")]
        public JsonResult AllEmployees()
        {
            string query = @"select ""NAME"" from ""Mitarbeiter""";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            NpgsqlDataReader myReader;

            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
    }
}
