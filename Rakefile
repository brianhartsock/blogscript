
require 'rake/clean'

TMP_VIEWS_FOLDER = 'tmp/views'
TMP_TEST_FOLDER = 'tmp/test'
PATHS = ['controllers', 'models', 'tmp/views', 'vendor/closure-library', 'vendor/closure-templates-for-javascript-latest']
PATHS_STR = (PATHS.collect do |path|
  "--path #{path} "
end).join


task :default => [:build]

CLEAN.include('tmp/**/*')

task :build => [:build_deps_for_tests, :compile_templates, :compile]

task :compile => [:compile_templates] do
  compiled_file = 'tmp/compiled.js'
  system("python #{CALC_DEPS_PATH} #{PATHS_STR} --input post.js --output_mode #{OUTPUT_MODE_COMPILED} --compiler_jar vendor/compiler-latest/compiler.jar -f --compilation_level=SIMPLE_OPTIMIZATIONS -f --warning_level=VERBOSE > #{compiled_file}")

end

task :debug => [:compile_templates] do
  system("python #{CALC_DEPS_PATH} #{PATHS_STR} --input post.js --output_mode #{OUTPUT_MODE_DEPS} --dep vendor/closure-library/closure/goog/deps.js > tmp/post-deps.js")
end

task :build_deps_for_tests => [:compile_templates, :ensure_tmp_test_exists] do

  Dir.glob("test/**/*.js") do |file|
    if file !~ /-deps.js$/
      deps_file = TMP_TEST_FOLDER + "/" + file.sub(/^test\//,'').gsub(/\//, '__').sub(/.js$/, '-deps.js')

      puts "Compiling deps for test #{file} => #{deps_file}"
      system("python #{CALC_DEPS_PATH} #{PATHS_STR} --input #{file} --output_mode #{OUTPUT_MODE_DEPS} --dep vendor/closure-library/closure/goog/deps.js > #{deps_file}")

    end
  end
end

task :test => [:build_deps_for_tests, :compile_templates] do
  Dir.glob("test/**/*.html") do |file|
    system("open #{file}")
  end
end

task :ensure_tmp_test_exists do
  unless Dir.exists?(TMP_TEST_FOLDER)
    FileUtils.mkdir(TMP_TEST_FOLDER)
  end
end

task :ensure_tmp_views_exists do
  unless Dir.exists?(TMP_VIEWS_FOLDER)
    FileUtils.mkdir(TMP_VIEWS_FOLDER)
  end
end

task :compile_templates  => [:ensure_tmp_views_exists] do

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
OUTPUT_MODE_COMPILED = 'compiled'
OUTPUT_MODE_SCRIPT = 'script'

CALC_DEPS_PATH = "vendor/closure-library/closure/bin/calcdeps.py"

CLOSURE_LIBRARY_PATH = "vendor/closure-library"
