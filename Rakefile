
require 'rake/clean'
require 'erb'

OUTPUT_MODE_LIST = 'list'
OUTPUT_MODE_DEPS = 'deps'
OUTPUT_MODE_COMPILED = 'compiled'
OUTPUT_MODE_SCRIPT = 'script'
CLOSURE_LIBRARY_PATH = 'vendor/closure-library'
CLOSURE_TEMPLATES_PATH = 'vendor/closure-templates-for-javascript-latest'
CLOSURE_COMPILER_PATH = 'vendor/compiler-latest'
CALC_DEPS_PATH = CLOSURE_LIBRARY_PATH + '/closure/bin/calcdeps.py'
SOY_JAR = CLOSURE_TEMPLATES_PATH + '/SoyToJsSrcCompiler.jar'

DEPS_FILE = 'tmp/deps.js'
TMP_VIEWS_FOLDER = 'tmp/views'
PATHS = ['controllers', 'models', 'tmp/views', CLOSURE_LIBRARY_PATH, CLOSURE_TEMPLATES_PATH, 'lib']
PATHS_STR = (PATHS.collect do |path|
  "--path #{path} "
end).join

task :default => [:build]

CLEAN.include('tmp/**/*')

task :build => [:build_deps, :compile_templates, :compile, :build_all_tests_js]

task :compile => [:compile_templates] do
  compiled_file = 'tmp/compiled.js'
  system("python #{CALC_DEPS_PATH} #{PATHS_STR} --input post.js --output_mode #{OUTPUT_MODE_COMPILED} --compiler_jar #{CLOSURE_COMPILER_PATH}/compiler.jar -f --compilation_level=SIMPLE_OPTIMIZATIONS -f --warning_level=VERBOSE > #{compiled_file}")

end

task :build_deps => [:compile_templates] do
  puts "Compiling deps => #{DEPS_FILE}"
  system("python #{CALC_DEPS_PATH} #{PATHS_STR} --output_mode #{OUTPUT_MODE_DEPS} --dep #{CLOSURE_LIBRARY_PATH}/closure/goog/deps.js > #{DEPS_FILE}")
end

task :build_all_tests_js do
  paths = Dir.glob('test/**/*.html').collect { |file| "'#{file.gsub(/test\//,'')}'" }.join(',')

  output = "var _allTests = [#{paths}];"
  File.open('tmp/all_tests.js', 'w') {|f| f.write(output) }
end

task :test => [:build_deps, :compile_templates] do
  Dir.glob("test/**/*.html") do |file|
    system("open #{file}")
  end
end

task :ensure_tmp_views_exists do
  FileUtils.mkdir_p(TMP_VIEWS_FOLDER)
end

task :compile_templates  => [:ensure_tmp_views_exists] do

  Dir.glob('views/**/*.soy') do |file|
    soy_file = file
    js_file = 'tmp/views/' + file.sub(/^views\//, '').gsub(/\//, '__').sub(/soy$/, 'js')
    
    if !File.exists?(js_file) or File.mtime(soy_file) > File.mtime(js_file)
      puts "Compiling #{soy_file}"
      system("java -jar #{SOY_JAR} --outputPathFormat #{js_file} #{soy_file} --shouldProvideRequireSoyNamespaces --shouldGenerateJsdoc")
    else
      puts "Skipping compiling #{soy_file}"
    end
  end
end

task :generate, :file do |t, args|
  type = args[:file]


    file = args[:for]
    test_html_file = "test/#{file.gsub(/\.js$/,'')}_tests.html"
    test_js_file = "#{file.gsub(/\.js$/,'')}_tests.js"

    tmpl = ERB.new File.new("templates/test.html.erb").read
    puts tmpl.run binding
end

task :gen_js, :class_name, :methods do |t, args|
  class_name = args[:class_name]
  file_name = class_name.downcase.gsub(/\./, "/") + ".js"
  methods = eval(args[:methods])

  tmpl = ERB.new(File.new('templates/class.js.erb').read, nil, '<>')
  puts tmpl.run binding
end


