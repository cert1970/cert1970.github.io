#!/usr/bin/env bash
#
# Create a new post for Jekyll blog

# Variables
declare_varialbes() {
  if [[ $# -eq 0 ]]; then
    POST_TITLE="hello, world"
  else
    POST_TITLE="$1"
  fi
  POST_NAME=$(echo $POST_TITLE | iconv -t ascii//TRANSLIT \
              | sed -r s/[^a-zA-Z0-9]+/-/g | sed -r s/^-+\|-+$//g | tr A-Z a-z)
  FILE_NAME=$(date +%F)-$POST_NAME.md
  FILE_PATH=./_posts/$FILE_NAME

  # echo $POST_TITLE
  # echo $POST_NAME
  # echo $FILE_NAME
  # echo $FILE_PATH
}

# Create file
init_post() {
  echo $FILE_PATH
  cat > $FILE_PATH << EOF
---
title: "$POST_TITLE"
description:
date: $(date +'%F %T %z')
date_modified:
image:
categories: []
tags: []
---
EOF
}

# Main
main() {
  declare_varialbes "$@"
  if [[ ! -f $FILE_PATH ]]; then
    init_post
  else
    echo $(tput setaf 1)File already exists.$(tput sgr0)
    return 1
  fi

}
main "$@"
