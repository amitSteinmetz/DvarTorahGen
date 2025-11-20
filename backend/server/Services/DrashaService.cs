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

        public DrashaService(string stylesJsonPath, string topicsJsonPath)
        {
            var stylesJson = File.ReadAllText(stylesJsonPath);
            var topicsJson = File.ReadAllText(topicsJsonPath);

            _styleMap = JsonSerializer.Deserialize<StyleMap>(stylesJson) ?? new StyleMap();
            _topicMap = JsonSerializer.Deserialize<TopicMap>(topicsJson) ?? new TopicMap();
        }

        public ChatMessage[] BuildMessages(DrashaFilters filters)
        {
            DrashaStyle? drashaStyleObj = _styleMap.TryGetValue(filters.Style, out var styleObj) ? styleObj : null;
            if (drashaStyleObj == null) throw new NullReferenceException($"{nameof(drashaStyleObj)} is null");

            string drashaTopicExplanation = _topicMap.TryGetValue(filters.Topic, out var topicExplanation)
                ? topicExplanation
                : "";

            var systemMessage = new SystemChatMessage(
                @"אתה רב יהודי בקיא בתורה, במדרש, בתלמוד, בראשונים ובאחרונים.
                אתה כותב דברי תורה בעברית טבעית, אותנטית, עם עומק וחום אנושי.
                עליך להימנע מניסוח שנשמע מלאכותי או מרמז על כתיבה אוטומטית."
            );

            var userMessage = new UserChatMessage(
                $@"כתוב דבר תורה בעברית על פי המאפיינים הבאים:
                    קטגוריה: {filters.Topic},
                    הסבר הקטגוריה: {drashaTopicExplanation},
                    פרשה: {filters.Parasha ?? ""},
                    אורך: בערך {filters.Length} מילים,
                    סגנון: {drashaStyleObj.Title},
                    הסבר הסגנון:
                    {drashaStyleObj.Description}

                    הנחיות:
                    - בתשובתך אל תכניס כוכביות, וניקוד אותיות 
                    - אם ערך הקטגוריה אינו 'פרשת שבוע', התעלם משדה 'פרשה'.
                    - התשובה חייבת להיות בעברית תקינה, עם דקדוק נכון וכתיבה מימין לשמאל.
                    - צטט רק מקורות אמיתיים. אם אין מקור מתאים — אל תיצור מקור חדש.
                    - בעת ציטוט פסוק או מדרש, ציין מיד את המקור (ספר, פרק, פסוק).
                    - שלב מסר רוחני ברור ומשמעותי.
                    - הכתיבה חייבת להישמע אנושית, זורמת וחיה — לא רובוטית.
                    - השתמש בלשון עשירה אך נגישה, המתאימה לדברי תורה מדוברים או כתובים."
            );

            return [systemMessage, userMessage];
        }
    }
}
