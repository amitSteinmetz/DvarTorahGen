using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Repositories;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TorahController : ControllerBase
    {
        private readonly TorahRepository _torahRepository;

        public TorahController(TorahRepository torahRepository)
        {
            _torahRepository = torahRepository;
        }

        [HttpPost("generate-dummy")]
        public IActionResult Generate([FromQuery] string format = "docx")
        {
            byte[] fileBytes;
            string contentType;
            string fileName;

            if (format != null && format.ToLower() == "pdf")
            {
                fileBytes = _torahRepository.GenerateDummyPdf();
                contentType = "application/pdf";
                fileName = "dvar-torah.pdf";
            }
            else
            {
                fileBytes = _torahRepository.GenerateDummyDocx();
                contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                fileName = "dvar-torah.docx";
            }

            return File(fileBytes, contentType, fileName);
        }

        [HttpPost("generate-drasha")]
        public IActionResult GenerateDrasha(DrashaFilters filters)
        {
           string drasha =  _torahRepository.GenerateDrasha(filters);
            return Ok(new { result = drasha});
        }
    }
}
