# Require any additional compass plugins here.
require 'susy'
require 'breakpoint'
require 'bootstrap-sass'

project_type = :stand_alone

http_path = '/'
sass_dir = 'src/sass'
css_dir = 'dist/css'
images_dir = 'dist/img'
fonts_dir = 'dist/fonts'
javascripts_dir = 'dist/js'

line_comments = false
preferred_syntax = :scss
output_style = :compressed
relative_assets = false

# https://github.com/twbs/bootstrap-sass/issues/409
# ::Sass::Script::Number.precision = 10