using ImageResizer;
using System.IO;

namespace QuestAnsWebServices.Helpers
{
    public static class FileHelper
    {
        public static void DeleteIfExist(string path)
        {
            if (File.Exists(path))
            {
                File.Delete(path);
            }
        }

        public static void BuildImageJob(string srcPath, string destPath, Instructions instructions)
        {
            DeleteIfExist(destPath);

            var mobJob = new ImageJob(srcPath, destPath, instructions);
            mobJob.Build();
        }

        public static void CreateFile(string path, byte[] content)
        {
            DeleteIfExist(path);

            using (var str = File.Create(path))
            {
                str.Write(content, 0, content.Length);
            }

        }
    }
}