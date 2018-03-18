#!/bin/bash

jq --rawfile abc graphql.txt '.query=$abc' template.json | \
curl -sk -H "Authorization: bearer $GITHUB_TOKEN" -d @- https://api.github.com/graphql | \
jq -r '.data.repository.releases.nodes[0].releaseAssets.nodes | map(select(.name | endswith("Linux-64bit.tar.gz")))[0].downloadUrl' | \
tr -d '\r' | \
xargs -I {} curl -kL {} | \
tar -xz -C .. hugo
