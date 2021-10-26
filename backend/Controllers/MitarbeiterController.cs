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
        int iZahl;
        public MitarbeiterController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //api/Mitarbeiter/all
        [HttpGet("all")]
        public JsonResult findAll()
        {
            string query = @"select ""ID"", ""KURZZEICHEN"", ""NAME"", ""PERSONALNR"", ""ABTEILUNG"", ""TEAM"", ""BEREICH"" from ""Mitarbeiter""";

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

        //api/KSV/all
        [HttpGet("all1")]
        public JsonResult all()
        {
            string query = @"select ""M"".""KURZZEICHEN"" from ""Mitarbeiter"" ""M"" 
                            right outer join ""Teamzuordnung"" ""T"" on concat (""M"".""ABTEILUNG"", ' ', ""M"".""TEAM"") = ""T"".""TEAM_KURZ"" 
                            right outer join ""KSV_Struktur"" ""K"" on ""T"".""KKS_STANDORT"" = ""K"".""KSV""
                            where ""KURZZEICHEN"" != 'null'
                            group by ""M"".""KURZZEICHEN""";

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

        //api/Mitarbeiter/find
        [HttpGet("find")]
        public JsonResult FindById(string name)
        {
            string query = @"select ""ID"", ""KURZZEICHEN"", ""NAME"", ""PERSONALNR"", ""ABTEILUNG"", ""TEAM"", ""BEREICH"" from ""Mitarbeiter"" where ""NAME"" = @name or ""KURZZEICHEN"" = @name";

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

        //api/Mitarbeiter/profil
        [HttpPost("profil")]
        public JsonResult Profil(string kurzzeichen)
        {
            string query = @"select ""ID"", ""KURZZEICHEN"", ""NAME"", ""PERSONALNR"", ""ABTEILUNG"", ""TEAM"", ""BEREICH"" from ""Mitarbeiter"" where ""KURZZEICHEN"" = @kurzzeichen";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            NpgsqlDataReader myReader;

            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@kurzzeichen", kurzzeichen);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        //api/Mitarbeiter/profil
        [HttpGet("profil")]
        public JsonResult Profil1(string kurzzeichen)
        {
            string query = @"select ""ID"", ""KURZZEICHEN"", ""NAME"", ""PERSONALNR"", ""ABTEILUNG"", ""TEAM"", ""BEREICH"" from ""Mitarbeiter"" where ""KURZZEICHEN"" = @kurzzeichen";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            NpgsqlDataReader myReader;

            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@kurzzeichen", kurzzeichen);
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
