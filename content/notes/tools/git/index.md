# git basics

## fixing repo within new repo being ignored
if git is ignoring a folder that used to be a repo on its own do this:

    git rm --cached /ignoredfolder
    git commit -m "removed phantom /ignoredfolder dir"
    git add /ignoredfolder
    git commit -m "finally able to add /ignoredfolder"

