# Require any additional compass plugins here.
require 'susy'
require 'breakpoint'
require 'bootstrap-sass'

css_dir = 'dist/css'
sass_dir = 'app/sass'
images_dir = 'dist/img'
fonts_dir = 'dist/fonts'
javascripts_dir = 'dist/js'

preferred_syntax = :scss
line_comments = false
output_style = :compressed
relative_assets = true

# https://github.com/twbs/bootstrap-sass/issues/409
# ::Sass::Script::Number.precision = 10