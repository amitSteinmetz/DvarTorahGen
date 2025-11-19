using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Repositories;
using server.Models;
using OpenAI.Chat;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TorahController : ControllerBase
    {
        private readonly TorahRepository _torahRepository;
        private readonly DrashaService _drashaService;
        private readonly IConfiguration _configuration;

        public TorahController(TorahRepository torahRepository, DrashaService drashaService, IConfiguration configuration)
        {
            _torahRepository = torahRepository;
            _drashaService = drashaService;
            _configuration = configuration;
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
        public async Task<IActionResult> GenerateDrasha([FromBody] DrashaFilters filters)
        {
            //string drasha =  _torahRepository.GenerateDrasha(filters);

            var apiKey = _configuration.GetValue<string>("OpenAI:ApiKey");

            ChatClient client = new(model: "gpt-4.1", apiKey);

            var chatMessages = _drashaService.BuildMessages(filters);

            ChatCompletion completion = await client.CompleteChatAsync(chatMessages);

            Console.WriteLine($"[ASSISTANT]: {completion.Content[0].Text}");

            return Ok(new { result = completion.Content[0].Text });
        }
    }
}
