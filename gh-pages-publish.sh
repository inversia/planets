npm run build
git checkout gh-pages
cp dist/* .
git add *
git commit -am "new build"
git push
git checkout master