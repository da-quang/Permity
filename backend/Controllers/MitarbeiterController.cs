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
    //Samir
    public class MitarbeiterController : Controller
    {
        private readonly IConfiguration _configuration;
        
        public MitarbeiterController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //api/Mitarbeiter/find
        [HttpGet("find")]
        public JsonResult FindById(string kurzzeichenOrName)
        {
            string query = @"select ""NAME"" from ""Mitarbeiter"" where ""KURZZEICHEN"" = @kurzzeichenOrName or ""NAME"" = @kurzzeichenOrName ";

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

        //api/Mitarbeiter/find
        [HttpGet("email")]
        public JsonResult FindById(string kurzzeichenOrName)
        {
            string query = @"select ""EMAIL"" from ""Mitarbeiter"" where ""KURZZEICHEN"" = @kurzzeichenOrName or ""NAME"" = @kurzzeichenOrName ";

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
    }
}
