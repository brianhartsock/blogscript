
require 'rake/clean'

task :default => [:build]

CLEAN.include('tmp/views/*', 'tmp/test/*')

task :build => [:build_deps_for_tests, :compile_templates]

task :build_deps_for_tests => [:compile_templates] do

  Dir.glob("test/**/*.js") do |file|
    if file !~ /-deps.js$/
      deps_file = 'tmp/test/' + file.sub(/^test\//,'').gsub(/\//, '__').sub(/.js$/, '-deps.js')

      puts "Compiling deps for test #{file} => #{deps_file}"
      system("python #{CALC_DEPS_PATH} --path models --path tmp/views --path vendor/closure-library --path vendor/closure-templates-for-javascript-latest --input #{file} --output_mode #{OUTPUT_MODE_DEPS} --dep vendor/closure-library/closure/goog/deps.js > #{deps_file}")

    end
  end
end

task :test => [:build_deps_for_tests, :compile_templates] do
  Dir.glob("test/**/*.html") do |file|
    system("open #{file}")
  end
end

task :compile_templates do

  soy_jar = 'vendor/closure-templates-for-javascript-latest/SoyToJsSrcCompiler.jar'

  Dir.glob('views/**/*.soy') do |file|
    soy_file = file
    js_file = 'tmp/views/' + file.sub(/^views\//, '').gsub(/\//, '__').sub(/soy$/, 'js')
    
    if !File.exists?(js_file) or File.mtime(soy_file) > File.mtime(js_file)
      puts "Compiling #{js_file}"
      system("java -jar #{soy_jar} --outputPathFormat #{js_file} #{soy_file} --shouldProvideRequireSoyNamespaces --shouldGenerateJsdoc")
    end
  end
end

OUTPUT_MODE_LIST = 'list'
OUTPUT_MODE_DEPS = 'deps'
OUTPUT_MODE_COMPILE = 'compiled'
OUTPUT_MODE_SCRIPT = 'script'

CALC_DEPS_PATH = "vendor/closure-library/closure/bin/calcdeps.py"

CLOSURE_LIBRARY_PATH = "vendor/closure-library"
