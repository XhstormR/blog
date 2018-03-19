#!/bin/bash

if [ -f ../bin/hugo ] ; then
    echo "Cached!"
    exit 0
else
    echo "Not cached!"
fi

../bin/jq --rawfile abc graphql.txt '.query=$abc' template.json | \
curl -sk -H "Authorization: bearer $GITHUB_TOKEN" -d @- https://api.github.com/graphql | \
../bin/jq -r '.data.repository.releases.nodes[0].releaseAssets.nodes | map(select(.name | endswith("Linux-64bit.tar.gz")))[0].downloadUrl' | \
tr -d '\r' | \
xargs -I {} curl -skL {} | \
tar -xz -C ../bin hugo
