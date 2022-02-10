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

        /*
        * Get all tasks from employee
        *
        * return all tasks as json-format
        *
        * edit by David Nguyen
        * 15.01.2022
        */
        //api/Auftrag/all
        [HttpGet("all")]
        public JsonResult AllAuftrag(string name)
        {
            string query = @"select * from ""Auftrag"" where ""AUFTRAGGEBER"" = @name or ""AUFTRAGNEHMER"" = @name order by 7 desc";

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
        * Create Task
        *
        * return status message
        *
        * edit by David Nguyen
        * 15.01.2022
        */
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

        /*
        * Get Id from Task
        *
        * return id from task
        *
        * edit by David Nguyen
        * 15.01.2022
        */
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

        /*
        * Check after 20min if task is still open --> change to 'Nicht angenommen'
        *
        * edit by David Nguyen
        * 15.01.2022        
        */
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

        /*
        * Find task by id
        *
        * return task as json-format
        *
        * edit by David Nguyen
        * 15.01.2022
        */
        //api/Auftrag/find
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

        /*
        * Delete task by id
        * 
        * return status message
        *
        * edit by David Nguyen
        * 15.01.2022
        */
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
            return new JsonResult("Deleted successfully");
        }

        /*
        * Update status from task to 'Bestätigt' after signing
        *
        * return status message
        *
        * edit by David Nguyen
        * 15.01.2022
        */
        //api/Auftrag/update
        [HttpPut("update")]
        public JsonResult UpdateAuftrag(int id, string auftragnehmer_unterschrift)
        {
            string query = @"update ""Auftrag"" set ""STATUS"" = 'Bestätigt', ""AUFTRAGNEHMER_UNTERSCHRIFT""= @auftragnehmer_unterschrift  where ""ID"" = @id";

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
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated successfully");
        }

        /*
        * Update status from task to 'Abgeschlossen' after closing the task
        * 
        * return status message
        *
        * edit by David Nguyen
        * 15.01.2022
        */
        //api/Auftrag/close
        [HttpPut("close")]
        public JsonResult closeAuftrag(int id)
        {
            string query = @"update ""Auftrag"" set ""STATUS"" = 'Abgeschlossen' where ""ID"" = @id";

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
            return new JsonResult("Closed successfully");
        }
        /*
        * Update status from task to 'Offen' after resending the task
        * 
        * return status message
        *
        * edit by David Nguyen
        * 15.01.2022
        */
        //api/Auftrag/resend
        [HttpPut("resend")]
        public JsonResult resendAuftrag(int id)
        {
            string query = @"update ""Auftrag"" set ""STATUS"" = 'Offen' where ""ID"" = @id";

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
            return new JsonResult("Resend successfully");
        }
    }

}
