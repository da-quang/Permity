using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        static async Task Trigger()
        {
            const string connString = "Server=172.16.238.11;Database=postgres;Port=5432;User Id=postgres;Password=postgres";

            await using var conn = new NpgsqlConnection(connString);
            await conn.OpenAsync();

            //e.Payload is string representation of JSON we constructed in NotifyOnDataChange() function
            conn.Notification += (o, e) => Console.WriteLine("Received notification: " + e.Payload);

            await using (var cmd = new NpgsqlCommand("LISTEN datachange;", conn))
                cmd.ExecuteNonQuery();

            while (true)
                conn.Wait(); // wait for events
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
