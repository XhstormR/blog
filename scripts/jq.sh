#!/bin/bash

git clone --depth 1 --recurse-submodules -j2 https://github.com/stedolan/jq.git jq_git && \
cd jq_git && \
mkdir build ; cd build && \
autoreconf -fi .. && \
../configure --with-oniguruma=builtin --enable-shared=no --enable-static=yes CFLAGS='-s -static -Os' && \
make -j4 && \
cp jq ../.. && \
cd ../..
