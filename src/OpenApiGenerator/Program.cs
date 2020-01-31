using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using Microsoft.OpenApi.Readers;
using Microsoft.OpenApi.Writers;
using System.Net.Http;
using System.Text;

namespace OpenApiGenerator
{
    class Program
    {
        static string _outputDirectory = "output";
        static string _specDirectory = "spec";
        static string _yamlOutputFile = "output/swagger.yaml";
        static string _jsonOutputFile = "output/swagger.json";
        static List<CodeSample> _codeSamples = new List<CodeSample>();
        static string[] httpVerbs = new[] { "get", "put", "post", "delete", "options", "head", "patch", "trace" };

        static void Main(string[] args)
        {
            try
            {
                RefreshOutputDirectory();

                // start building up the yaml file
                using (StreamReader sr = File.OpenText($"{_specDirectory}/swagger.yaml"))
                {
                    using (TextWriter writer = File.CreateText(_yamlOutputFile))
                    {
                        var s = "";
                        while ((s = sr.ReadLine()) != null)
                        {
                            writer.WriteLine(s);
                        }
                    }
                }

                // append paths and components to yaml file
                AddPaths();
                AddAllComponents();

                // use openapi.net to read yaml file
                var str = File.ReadAllText(_yamlOutputFile);
                var openApiDocument = new OpenApiStringReader().Read(str, out var diagnostic);

                // log any errors
                foreach (var error in diagnostic.Errors)
                {
                    Console.WriteLine(error.Message);
                    Console.WriteLine(error.Pointer);
                }

                // convert yaml file to json
                using (TextWriter writer = File.CreateText(_jsonOutputFile))
                {
                    openApiDocument.SerializeAsV3(new OpenApiJsonWriter(writer));
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        static void RefreshOutputDirectory()
        {
            ClearOutputDirectory();
            Directory.CreateDirectory(_outputDirectory);
        }

        static void ClearOutputDirectory()
        {
            if (Directory.Exists(_outputDirectory))
            {
                foreach (var file in Directory.GetFiles(_outputDirectory))
                {
                    File.Delete(file);
                }

                Directory.Delete(_outputDirectory);
            }
        }

        static void AddAllComponents()
        {
            File.AppendAllText(_yamlOutputFile, "components:\n", Encoding.UTF8);

            foreach (var component in new List<string> { "schemas", "headers", "parameters", "responses", "securitySchemes" })
            {
                AddComponent(component);
            }
        }

        static void AddComponent(string component)
        {
            if (!Directory.Exists($"{_specDirectory}/components/{component}"))
                return;

            var yamlSchemaFiles = GetSpecFiles($"/components/{component}/", "*.yaml");
            var text = $"  {component}:\n";
            text += GetComponentsText(yamlSchemaFiles);
            File.AppendAllText(_yamlOutputFile, text, Encoding.UTF8);
        }

        static string GetComponentsText(IEnumerable<string> yamlFiles)
        {
            var text = "";

            foreach (var file in yamlFiles)
            {
                var fileInfo = new FileInfo(file);

                using (StreamReader sr = new StreamReader(file))
                {
                    var path = fileInfo.Name.Substring(0, fileInfo.Name.IndexOf("."));
                    text += ($"    {path}:\n");
                    var s = "";
                    while ((s = sr.ReadLine()) != null)
                    {
                        text += $"      {s}\n";
                    }
                }
            }

            return text;
        }

        static void AddPaths()
        {
            LoadCodeSamples();

            var yamlPathFiles = GetSpecFiles("paths", "*.yaml");
            var text = "paths:\n";

            foreach (var file in yamlPathFiles)
            {
                var fileInfo = new FileInfo(file);
                var path = "";

                using (StreamReader sr = new StreamReader(file))
                {
                    path = fileInfo.Name.Substring(0, fileInfo.Name.IndexOf(".")).Replace("@", "/");
                    text += ($"  /{path}:\n");

                    var s = "";
                    var currentVerb = "";
                    while ((s = sr.ReadLine()) != null)
                    {
                        if (httpVerbs.Contains($"{s.TrimEnd(':')}"))
                        {
                            if (!string.IsNullOrEmpty(currentVerb))
                            {
                                text += GetCodeSampleText(path, currentVerb);
                            }
                            currentVerb = s.Trim(':');
                        }
                        text += $"    {s}\n";
                    }
                    text += GetCodeSampleText(path, currentVerb);
                }
            }

            File.AppendAllText(_yamlOutputFile, text, Encoding.UTF8);
        }

        static string GetCodeSampleText(string path, string verb)
        {
            var text = "";
            var codeSamples = GetCodeSamples(path, verb);

            if (codeSamples.Count == 0)
                return text;

            text += $"      x-code-samples:\n";
            codeSamples.ForEach(codeSample => {
                text += $"        - lang: {codeSample.Language}\n";
                text += $"          source: {codeSample.SampleString}\n";
            });
            return text;
        }

        static List<CodeSample> GetCodeSamples(string path, string verb)
        {
            return _codeSamples.FindAll(x => string.Equals(x.Path, path, StringComparison.InvariantCultureIgnoreCase) && string.Equals(x.HttpVerb, verb, StringComparison.InvariantCultureIgnoreCase));
        }

        static void LoadCodeSamples()
        {
            var codeSampleFiles = GetSpecFiles("code_samples", "*.*");

            foreach (var file in codeSampleFiles)
            {
                var fileInfo = new FileInfo(file);
                var filename = fileInfo.Name.Substring(0, fileInfo.Name.IndexOf("."));
                if (filename.ToLowerInvariant() == "readme")
                    continue;

                _codeSamples.Add(new CodeSample
                {
                    Language = new DirectoryInfo(fileInfo.FullName).Parent.Parent.Name,
                    SampleString = $"\"{string.Join("\\n", File.ReadAllLines(fileInfo.FullName).Select(x => x.Replace("\"", "\\\"")))}\"",
                    Path = new DirectoryInfo(fileInfo.FullName).Parent.Name.Replace("@", "/"),
                    HttpVerb = filename
                });
            }
        }
        
        private static IEnumerable<string> GetSpecFiles(string relativePath, string searchPattern)
        {
            return Directory.GetFiles($"{_specDirectory}/{relativePath}", searchPattern, SearchOption.AllDirectories)
                .OrderBy(fileName => fileName);
        }
    }
}