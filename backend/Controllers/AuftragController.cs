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
    public class AuftragController : Controller
    {
        private readonly IConfiguration _configuration;
        
        public AuftragController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private async Task Confirmation(int id)
        {
            await Task.Delay(1200000);
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                NpgsqlCommand query = new NpgsqlCommand(@"update ""Auftrag"" set ""STATUS"" = 'Nicht angenommen' where ""ID"" = @id and ""STATUS"" = 'Offen'", myCon);
                query.Parameters.AddWithValue("@id", id);
                query.ExecuteScalar();
            }           
        }

        private int getId(string auftraggeber, string auftragnehmer)
        {
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                NpgsqlCommand query = new NpgsqlCommand(@"select ""ID"" from ""Auftrag"" where ""AUFTRAGGEBER"" = @auftraggeber and ""AUFTRAGNEHMER"" = @auftragnehmer order by ""ID"" desc limit 1", myCon);
                query.Parameters.AddWithValue("@auftraggeber", auftraggeber);
                query.Parameters.AddWithValue("@auftragnehmer", auftragnehmer);
                int id = (int)query.ExecuteScalar();
                return id;   
            }
        }

        //api/Auftrag/all
        [HttpGet("all")]
        public JsonResult GetAuftrag(string name)
        {
            string query = @"select * from ""Auftrag"" where ""AUFTRAGGEBER"" = @name or ""AUFTRAGNEHMER"" = @name";

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
        
        [HttpGet("sended")]
        public JsonResult SendedAuftrag(string name)
        {
            string query = @"select * from ""Auftrag"" where ""AUFTRAGGEBER"" = @name";

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

        [HttpGet("received")]
        public JsonResult ReceivedAuftrag(string name)
        {
            string query = @"select * from ""Auftrag"" where ""AUFTRAGNEHMER"" = @name";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@namkurzzeicehne", name);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

//api/Auftrag/create
        [HttpPost("abi")]
        public JsonResult CreateAuftrag1(string id, string name)
        {
            string query = @"insert into ""Test"" (""id"", ""name"") values (@id, @name);";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myCommand.Parameters.AddWithValue("@name", name);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added successfully");
        }
        
        //api/Auftrag/create
        [HttpPost("create")]
        public JsonResult CreateAuftrag(string ksv, string auftrag, string auftraggeber, string auftragnehmer, string sperren, string kommentar, string von, string bis, string auftraggeber_unterschrift)
        {
            string query = @"insert into ""Auftrag"" (""KSV"", ""AUFTRAG"", ""AUFTRAGGEBER"", ""AUFTRAGNEHMER"", ""SPERREN"", ""KOMMENTAR"", ""VON"", ""BIS"", ""STATUS"", ""AUFTRAGGEBER_UNTERSCHRIFT"") 
                                            values (@ksv, @auftrag, @auftraggeber, @auftragnehmer, @sperren, @kommentar, @von, @bis , 'Offen', @auftraggeber_unterschrift)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ksv", ksv);
                    myCommand.Parameters.AddWithValue("@auftrag", auftrag);
                    myCommand.Parameters.AddWithValue("@auftraggeber", auftraggeber);
                    myCommand.Parameters.AddWithValue("@auftragnehmer", auftragnehmer);
                    myCommand.Parameters.AddWithValue("@sperren", sperren);
                    myCommand.Parameters.AddWithValue("@kommentar", kommentar);
                    myCommand.Parameters.AddWithValue("@von", DateTimeOffset.Parse(von));
                    myCommand.Parameters.AddWithValue("@bis", DateTimeOffset.Parse(bis));
                    myCommand.Parameters.AddWithValue("@auftraggeber_unterschrift", auftraggeber_unterschrift);
       
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            Confirmation(getId(auftraggeber, auftragnehmer));
            return new JsonResult("Added successfully");
        }

        [HttpGet("new")]
        public JsonResult NewAuftrag(string name)
        {
            string query = @"select * from ""Auftrag"" where ""AUFTRAGNEHMER"" = @name order by ""ID"" desc LIMIT 1;";

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

        //api/Auftrag/update
        [HttpPut("update")]
        public JsonResult UpdateAuftrag(int id, string auftragnehmer_unterschrift, string status)
        {
            string query = @"update ""Auftrag"" set ""STATUS"" = @status, ""AUFTRAGNEHMER_UNTERSCHRIFT""= @auftragnehmer_unterschrift  where ""ID"" = @id";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myCommand.Parameters.AddWithValue("@auftragnehmer_unterschrift", auftragnehmer_unterschrift);
                    myCommand.Parameters.AddWithValue("@status", status);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated successfully");
        }

    //api/Auftrag/update
        [HttpPut("abgeschlossen")]
        public JsonResult abgeschlossenAuftrag(int id, string auftragnehmer_unterschrift, string status)
        {
            string query = @"update ""Auftrag"" set ""STATUS"" = @status where ""ID"" = @id";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myCommand.Parameters.AddWithValue("@status", status);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated successfully");
        }

        //api/Auftrag/update
        [HttpPut("unterschrift")]
        public JsonResult UpdateAuftrag(int id, string auftraggeber_unterschrift)
        {
            string query = @"update ""Auftrag"" set ""AUFTRAGGEBER_UNTERSCHRIFT"" = @auftraggeber_unterschrift  where ""ID"" = @id";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myCommand.Parameters.AddWithValue("@auftraggeber_unterschrift", auftraggeber_unterschrift);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated successfully");
        }


        [HttpGet("find")]
        public JsonResult find(int id)
        {
            string query = @"select * from ""Auftrag"" where ""ID"" = @id";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

             return new JsonResult(table);
        }

        //api/Auftrag/delete
        [HttpDelete("delete")]
        public JsonResult Delete(int id)
        {
            string query = @"delete from ""Auftrag"" where ""ID"" = @id";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Delete successfully");
        }
    }
}
