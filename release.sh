#!/usr/bin/env bash

base='chrome-firefox'
manifest="$base/manifest.json"

# get changelog and manifest version
version=`git show head:changelog.txt | head -n1`
mVersion=`git show head:${manifest} | python -c "import sys, json; print json.load(sys.stdin)['version']"`

# check changelog and manifest versions
if [ "${version}" != "v${mVersion}" ]; then
    git stash
    git show head:${manifest} |
        python -c "import sys, json; data = json.load(sys.stdin); data['version'] = '${version}'[1:]; print json.dumps(data)" |
        python -m json.tool > $manifest
    git add $manifest
    git commit -m "[RELEASE] Updated manifest version."
    git stash pop
fi

# tag from changelog / manifest
git tag -a ${version} -m "${version} released" && echo "Created tag: ${version}"

# make zipfile from latest tag
zipFile="build/${version}.zip"
git archive -o ${zipFile} ${version} ${base} && echo "Released version: ${zipFile}"
