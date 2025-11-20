using OpenAI.Chat;
using server.Models;
using System.Text.Json;

namespace server.Services
{
    public class StyleMap : Dictionary<string, DrashaStyle> { }
    public class TopicMap : Dictionary<string, string> { }

    public class DrashaService
    {
        private readonly StyleMap _styleMap;
        private readonly TopicMap _topicMap;
        private readonly PromptTemplates _prompts;

        public DrashaService(IDictionary<string, string> jsonFilePaths)
        {
            var stylesJson = File.ReadAllText(jsonFilePaths["styles"]);
            var topicsJson = File.ReadAllText(jsonFilePaths["topics"]);
            var promptsJson = File.ReadAllText(jsonFilePaths["prompts"]);

            _styleMap = JsonSerializer.Deserialize<StyleMap>(stylesJson) ?? new StyleMap();
            _topicMap = JsonSerializer.Deserialize<TopicMap>(topicsJson) ?? new TopicMap();
            _prompts = JsonSerializer.Deserialize<PromptTemplates>(promptsJson) ?? new PromptTemplates();
        }

        public ChatMessage[] BuildMessages(DrashaFilters filters)
        {
            DrashaStyle? drashaStyleObj = _styleMap.TryGetValue(filters.Style, out var styleObj) ? styleObj : null;
            if (drashaStyleObj == null) throw new NullReferenceException($"{nameof(drashaStyleObj)} is null");

            string drashaTopicExplanation = _topicMap.TryGetValue(filters.Topic, out var topicExplanation)
                ? topicExplanation
                : "";

            var systemMessage = new SystemChatMessage(_prompts.System);

            var userMessage = new UserChatMessage(
                _prompts.User
                    .Replace("{Topic}", filters.Topic)
                    .Replace("{TopicExplanation}", drashaTopicExplanation)
                    .Replace("{Parasha}", filters.Parasha ?? "")
                    .Replace("{Length}", filters.Length.ToString())
                    .Replace("{StyleTitle}", drashaStyleObj.Title)
                    .Replace("{StyleDescription}", drashaStyleObj.Description)
            );

            return [systemMessage, userMessage];
        }
    }
}
