
require 'rake/clean'
require 'erb'

DEPS_FILE = 'tmp/deps.js'
SOY_JAR = 'vendor/closure-templates-for-javascript-latest/SoyToJsSrcCompiler.jar'
TMP_VIEWS_FOLDER = 'tmp/views'
PATHS = ['controllers', 'models', 'tmp/views', 'vendor/closure-library', 'vendor/closure-templates-for-javascript-latest', 'lib']
PATHS_STR = (PATHS.collect do |path|
  "--path #{path} "
end).join

task :default => [:build]

CLEAN.include('tmp/**/*')

task :build => [:build_deps, :compile_templates, :compile]

task :compile => [:compile_templates] do
  compiled_file = 'tmp/compiled.js'
  system("python #{CALC_DEPS_PATH} #{PATHS_STR} --input post.js --output_mode #{OUTPUT_MODE_COMPILED} --compiler_jar vendor/compiler-latest/compiler.jar -f --compilation_level=SIMPLE_OPTIMIZATIONS -f --warning_level=VERBOSE > #{compiled_file}")

end

task :build_deps => [:compile_templates] do
  puts "Compiling deps => #{DEPS_FILE}"
  system("python #{CALC_DEPS_PATH} #{PATHS_STR} --output_mode #{OUTPUT_MODE_DEPS} --dep vendor/closure-library/closure/goog/deps.js > #{DEPS_FILE}")
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
      puts "Compiling #{js_file}"
      system("java -jar #{SOY_JAR} --outputPathFormat #{js_file} #{soy_file} --shouldProvideRequireSoyNamespaces --shouldGenerateJsdoc")
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

OUTPUT_MODE_LIST = 'list'
OUTPUT_MODE_DEPS = 'deps'
OUTPUT_MODE_COMPILED = 'compiled'
OUTPUT_MODE_SCRIPT = 'script'

CALC_DEPS_PATH = "vendor/closure-library/closure/bin/calcdeps.py"

CLOSURE_LIBRARY_PATH = "vendor/closure-library"
