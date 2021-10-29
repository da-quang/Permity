﻿using backend.Models;
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
            await Task.Run(() =>
            {
                do
                {
                    Task.Delay(10000).Wait();
                    string sqlDataSource = _configuration.GetConnectionString("AppCon");
                    using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
                    {
                        myCon.Open();
                        NpgsqlCommand query = new NpgsqlCommand(@"select exists (select ""ID"" from ""Auftrag"" where ""ID"" = @id and ""STATUS"" = 'bestätigt')", myCon);
                        query.Parameters.AddWithValue("@id", id);

                        Boolean flag = (Boolean)query.ExecuteScalar();
                        if (flag == true)
                        {
                            break;
                        }
                    }
                } while (true);
            });

            await Task.Run(() =>
            {
                Task.Delay(200000).Wait();
                string sqlDataSource = _configuration.GetConnectionString("AppCon");
                using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    NpgsqlCommand query = new NpgsqlCommand(@"update ""Auftrag"" set ""STATUS"" = 'nicht angenommen' where ""ID"" = @id and ""STATUS"" = 'offen'", myCon);
                    query.Parameters.AddWithValue("@id", id);
                    query.ExecuteScalar();
                }
            });
        }

        private int getId(string auftraggeber)
        {
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                NpgsqlCommand query = new NpgsqlCommand(@"select ""ID"" from ""Auftrag"" where ""AUFTRAGGEBER"" = @auftraggeber order by ""ID"" desc limit 1", myCon);
                query.Parameters.AddWithValue("@auftraggeber", auftraggeber);
                return (int)query.ExecuteScalar();
                
            }
        }

        //api/Auftrag/all
        [HttpGet("all")]
        public JsonResult GetAuftrag(string kurzzeicehn)
        {
            string query = @"select * from ""Auftrag"" where ""AUFTRAGGEBER"" = @kurzzeicehn or ""AUFTRAGNEHMER"" = @kurzzeicehn";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@kurzzeicehn", kurzzeicehn);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        
        [HttpGet("sended")]
        public JsonResult SendedAuftrag(string kurzzeicehn)
        {
            string query = @"select * from ""Auftrag"" where ""AUFTRAGGEBER"" = @kurzzeicehn";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@kurzzeicehn", kurzzeicehn);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpGet("received")]
        public JsonResult ReceivedAuftrag(string kurzzeicehn)
        {
            string query = @"select * from ""Auftrag"" where ""AUFTRAGNEHMER"" = @kurzzeicehn";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@namkurzzeicehne", kurzzeicehn);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        //api/Auftrag/create
        [HttpPost("create")]
        public JsonResult CreateAuftrag(string ksv, string auftraggeber, string auftragnehmer, string sperren, string kommentar, string von, string bis, string status)
        {
            string query = @"insert into ""Auftrag"" (""KSV"", ""AUFTRAGGEBER"", ""AUFTRAGNEHMER"", ""SPERREN"", ""KOMMENTAR"", ""VON"", ""BIS"", ""STATUS"") 
                                            values (@ksv, @auftraggeber, @auftragnehmer, @sperren, @kommentar, @von, @bis , @status)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ksv", ksv);
                    myCommand.Parameters.AddWithValue("@auftraggeber", auftraggeber);
                    myCommand.Parameters.AddWithValue("@auftragnehmer", auftragnehmer);
                    myCommand.Parameters.AddWithValue("@sperren", sperren);
                    myCommand.Parameters.AddWithValue("@kommentar", kommentar);
                    myCommand.Parameters.AddWithValue("@von", DateTimeOffset.Parse(von));
                    myCommand.Parameters.AddWithValue("@bis", DateTimeOffset.Parse(bis));
                    myCommand.Parameters.AddWithValue("@status", status);
       
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            Confirmation(getId(auftragnehmer));
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
        public JsonResult UpdateAuftrag(int id, string status)
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
