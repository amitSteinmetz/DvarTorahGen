using Microsoft.AspNetCore.Hosting;

namespace server.Utils
{
    public static class JsonUtils
    {
        public static IDictionary<string, string> BuildDrashaJsonFilePaths(IWebHostEnvironment env)
        {
            var basePath = Path.Combine(env.ContentRootPath, "Utils");
            return new Dictionary<string, string>
            {
                ["styles"] = Path.Combine(basePath, "DrashaStyles.json"),
                ["topics"] = Path.Combine(basePath, "DrashaTopics.json"),
                ["prompts"] = Path.Combine(basePath, "PromptTemplates.json")
            };
        }
    }
}
