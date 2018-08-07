#!/bin/bash

if [ -f ../bin/jq ] ; then
    echo 'Cached!'
    exit 0
else
    echo 'Not cached!'
fi

git clone --depth 1 --recurse-submodules --shallow-submodules -j2 https://github.com/stedolan/jq.git jq_git && \
cd jq_git && \
mkdir build ; cd build && \
autoreconf -fi .. && \
../configure --with-oniguruma=builtin --enable-shared=no --enable-static=yes CFLAGS='-s -static -Os' && \
make -j4 && \
cp jq ../../../bin && \
cd ../..
