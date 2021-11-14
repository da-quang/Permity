using backend.Models;
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
    public class KSVController : Controller
    {
        private readonly IConfiguration _configuration;

        public KSVController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        //api/KSV/all
        [HttpGet("all")]
        public JsonResult all(string kurzzeichen)
        {
            string query = @"select ""K"".""KSV"" from ""Mitarbeiter"" ""M"" 
                            left outer join ""Teamzuordnung"" ""T"" on concat (""M"".""ABTEILUNG"", ' ', ""M"".""TEAM"") = ""T"".""TEAM_KURZ"" 
                            left outer join ""KSV_Struktur"" ""K"" on ""T"".""KKS_STANDORT"" = ""K"".""KSV""
                            where ""M"".""KURZZEICHEN"" = @kurzzeichen
                            group by ""K"".""KSV""";

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

       

        //api/KSV/select
        [HttpGet("select")]
        public JsonResult getKSV(string ksv, int ebene)
        {
            string query = @"select ""K"".* from ""KSV_Struktur"" ""K"" where ""KSV"" like @ksv and ""EBENE"" = @ebene";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            NpgsqlDataReader myReader;

            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ebene", ebene);
                    myCommand.Parameters.AddWithValue("@ksv", ksv + "%");
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        //api/KSV/find
        [HttpGet("find")]
        public JsonResult findKSV(string bezeichnung)
        {
            string query = @"select * from ""KSV_Struktur""  where ""BEZEICHNUNG""= @bezeichnung limit 1";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            NpgsqlDataReader myReader;

            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@bezeichnung", bezeichnung);
              
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
