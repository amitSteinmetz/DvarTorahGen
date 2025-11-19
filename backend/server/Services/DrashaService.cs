using OpenAI.Chat;
using server.Models;
using System.Text.Json;

namespace server.Services
{
    public class StyleMap : Dictionary<string, DrashaStyle> { }

    public class DrashaService
    {
        private readonly StyleMap _styleMap;

        public DrashaService(string stylesJsonPath)
        {
            var json = File.ReadAllText(stylesJsonPath);
            _styleMap = JsonSerializer.Deserialize<StyleMap>(json) ?? new StyleMap();
        }

        public ChatMessage[] BuildMessages(DrashaFilters filters)
        {
            DrashaStyle? drashaStyleObj = _styleMap.TryGetValue(filters.Style, out var styleObj) ? styleObj : null;
            if (drashaStyleObj == null) throw new NullReferenceException($"{nameof(drashaStyleObj)} is null");

            var systemMessage = new SystemChatMessage(
    @"אתה רב יהודי בקיא בתורה, במדרש, בתלמוד, בראשונים ובאחרונים.
אתה כותב דברי תורה בעברית טבעית, אותנטית, עם עומק וחום אנושי.
עליך להימנע מניסוח שנשמע מלאכותי או מרמז על כתיבה אוטומטית."
);

            var userMessage = new UserChatMessage(
                $@"כתוב דבר תורה בעברית על פי המאפיינים הבאים:

קטגוריה: {filters.Topic},
פרשה: {filters.Parasha ?? ""},
אורך: בערך {filters.Length} מילים,
סגנון: {drashaStyleObj.Title},
הסבר הסגנון:
{drashaStyleObj.Description}

הנחיות:
- אם ערך הקטגוריה אינו 'פרשת שבוע', התעלם משדה 'פרשה'.
- התשובה חייבת להיות בעברית תקינה, עם דקדוק נכון וכתיבה מימין לשמאל.
- צטט רק מקורות אמיתיים. אם אין מקור מתאים — אל תיצור מקור חדש.
- בעת ציטוט פסוק או מדרש, ציין מיד את המקור (ספר, פרק, פסוק).
- שלב מסר רוחני ברור ומשמעותי.
- הכתיבה חייבת להישמע אנושית, זורמת וחיה — לא רובוטית.
- השתמש בלשון עשירה אך נגישה, המתאימה לדברי תורה מדוברים או כתובים."
            );

            //var systemMessage = new SystemChatMessage(
            //    @"You are a knowledgeable Jewish rabbi well-versed in the Torah, Midrash, Talmud, Rishonim, and Acharonim.
            //    You write Divrei Torah in natural, authentic Hebrew with depth, warmth, and a human tone.
            //    Avoid any phrasing that suggests artificial intelligence or automated writing."
            //);

            //var userMessage = new UserChatMessage(
            //     $@"Write a Dvar Torah in Hebrew according to the following attributes:

            //    Category: {filters.Category},
            //    Parasha: {filters.Parasha ?? ""},
            //    Length: {filters.Length} words approximately,
            //    Style: {drashaStyleObj.Title},
            //    Style Explanation:
            //    {drashaStyleObj.Description}

            //    Guidelines:
            //    - If Category's value is not parashat shavua (weekly parasha), ignore the 'Parasha' field. 
            //    - Be sure to answer in proper, valid Hebrew, while maintaining the rules of grammar and writing words from right to left, etc.
            //    - Cite only real, authentic sources. If no suitable source exists, do not invent one.
            //    - When quoting a verse or Midrash, specify the source immediately (book, chapter, verse).
            //    - Integrate a clear spiritual message and meaningful insight.
            //    - The writing must feel fully human, natural, and expressive—never robotic.
            //    - Use rich yet accessible Hebrew, suitable for spoken or written Divrei Torah.
            //    "
            //);

            return [systemMessage, userMessage];
        }
    }
}

/*
 * var systemMessage = new SystemChatMessage(
    @"אתה רב יהודי בקיא בתורה, במדרש, בתלמוד, בראשונים ובאחרונים.
אתה כותב דברי תורה בעברית טבעית, אותנטית, עם עומק וחום אנושי.
עליך להימנע מניסוח שנשמע מלאכותי או מרמז על כתיבה אוטומטית."
);

var userMessage = new UserChatMessage(
    $@"כתוב דבר תורה בעברית על פי המאפיינים הבאים:

קטגוריה: {filters.Category},
פרשה: {filters.Parasha ?? ""},
אורך: בערך {filters.Length} מילים,
סגנון: {drashaStyleObj.Title},
הסבר הסגנון:
{drashaStyleObj.Description}

הנחיות:
- אם ערך הקטגוריה אינו 'פרשת שבוע', התעלם משדה 'פרשה'.
- התשובה חייבת להיות בעברית תקינה, עם דקדוק נכון וכתיבה מימין לשמאל.
- צטט רק מקורות אמיתיים. אם אין מקור מתאים — אל תיצור מקור חדש.
- בעת ציטוט פסוק או מדרש, ציין מיד את המקור (ספר, פרק, פסוק).
- שלב מסר רוחני ברור ומשמעותי.
- הכתיבה חייבת להישמע אנושית, זורמת וחיה — לא רובוטית.
- השתמש בלשון עשירה אך נגישה, המתאימה לדברי תורה מדוברים או כתובים."
);

 **/