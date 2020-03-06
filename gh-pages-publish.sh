echo Publishing to GitHub Pages \
&& git checkout gh-pages \
&& cp dist/* . \
&& git add --ignore-errors *.html *.js *.map *.css \
&& git commit -am "new build" \
&& git push \
&& git checkout master