
task :default => [:build_deps_for_tests]

task :build_deps_for_tests do

  Dir.glob("test/**/*.js") do |file|
    if file !~ /-deps.js$/
      puts "Compiling deps for test #{file}"
      system("python #{CALC_DEPS_PATH} --path models --path vendor/closure-library --input #{file} --output_mode #{OUTPUT_MODE_DEPS} > #{file.sub(/.js$/, '-deps.js --dep vendor/closure-library/closure/goog/deps.js')}")

    end
  end
end

task :test => [:build_deps_for_tests] do
  Dir.glob("test/**/*.html") do |file|
    system("open #{file}")
  end
end

OUTPUT_MODE_LIST = 'list'
OUTPUT_MODE_DEPS = 'deps'
OUTPUT_MODE_COMPILE = 'compiled'
OUTPUT_MODE_SCRIPT = 'script'

CALC_DEPS_PATH = "vendor/closure-library/closure/bin/calcdeps.py"

CLOSURE_LIBRARY_PATH = "vendor/closure-library"
