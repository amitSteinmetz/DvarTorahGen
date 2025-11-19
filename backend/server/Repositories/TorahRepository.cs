using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using server.Models;
//using OpenAI;
using OpenAI.Chat;
// using OpenAI.Chat.Models;
using Microsoft.Extensions.Configuration;

namespace server.Repositories
{
    public class TorahRepository
    {
        //private readonly OpenAIClient _client;
        private readonly IConfiguration _configuration;


        public TorahRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            //_client = new OpenAIClient(apiKey);
        }

        public byte[] GenerateDummyDocx()
        {
            using var stream = new MemoryStream();
            using (var wordDocument = WordprocessingDocument.Create(stream, WordprocessingDocumentType.Document))
            {
                var mainPart = wordDocument.AddMainDocumentPart();
                mainPart.Document = new DocumentFormat.OpenXml.Wordprocessing.Document();
                var body = mainPart.Document.AppendChild(new Body());

                var paragraph = body.AppendChild(new Paragraph());
                var run = paragraph.AppendChild(new Run());
                run.AppendChild(new Text("This is a dummy D'var Torah document."));

                var paragraph2 = body.AppendChild(new Paragraph());
                var run2 = paragraph2.AppendChild(new Run());
                run2.AppendChild(new Text("Generated content will appear here."));
            }

            return stream.ToArray();
        }

        public byte[] GenerateDummyPdf()
        {
            return QuestPDF.Fluent.Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(2, Unit.Centimetre);

                    page.Content()
                        .Column(column =>
                        {
                            column.Item().Text("Dummy D'var Torah").FontSize(20).Bold();
                            column.Item().PaddingVertical(10);
                            column.Item().Text("This is a dummy PDF document.");
                            column.Item().Text("Generated content will appear here.");
                        });
                });
            })
            .GeneratePdf();
        }

//        public string GenerateDrasha(DrashaFilters filters)
//        {
//            var apiKey = _configuration.GetValue<string>("OpenAI:ApiKey");


//            ChatClient client = new(model: "gpt-4o", apiKey);

//            ChatCompletion completion = client.CompleteChat($@"You are a knowledgeable Jewish rabbi and Torah scholar, well-versed in classical sources such as the Torah, Midrash, Talmud, and traditional commentators.

//Write a Dvar Torah in Hebrew about the weekly Torah portion {filters.Parasha}, and involve {filters.Commentator} opinion in the answer.
//In your answer, integrate the opinion of {filters.Commentator}, explaining their interpretation of at least one specific verse in that Parasha.

//Structure the Dvar Torah as follows:
//1. **Introduction** – Briefly describe the theme or central story of {filters.Parasha} (2–3 sentences).
//2. **Main Insight** – Present a key idea from {filters.Commentator}, quote or paraphrase their words, and connect it to the Parasha's message.
//3. **Practical Application** – Explain what we can learn from this idea in our modern daily life.
//4. **Sources** – At the end, list 2–4 sources used or referenced (e.g. Torah book, chapter and verse; name of commentator and location).

//Requirements:
//- Write fully in Hebrew.
//- The tone should be respectful, educational, and suitable for a synagogue or Shabbat publication.
//- Keep the total length between 250–350 words.
//- If you are uncertain about a source, clearly write: 'איני בטוח במיקום המדויק של המקור'.
//- Avoid inventing sources that do not exist.
//");

//            Console.WriteLine($"[ASSISTANT]: {completion.Content[0].Text}");

//            return completion.Content[0].Text;
//        }
    }
}