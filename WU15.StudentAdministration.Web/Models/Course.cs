using System.Collections.Generic;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;
using System.Web.Http;
using WU15.StudentAdministration.Web.Models;
using WU15.StudentAdministration.Web.DataAccess;
using System.Data.Entity;

namespace WU15.StudentAdministration.Web.Models
{
    public class Course
    {
        //[JsonProperty("courseId")]
        public int Id { get; set; }

        //[JsonProperty("courseName")]
        public string Name { get; set; }

        public string Term { get; set; }

        public string Year { get; set; }

        public string Credits { get; set; }

        public List<Student> Students { get; set; }

        public bool Active { get; set; }

        public Course()
        {
            Students = new List<Student>();
        }
    }
}