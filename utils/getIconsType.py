#!/usr/bin/env python3

import os

def getFiles(folder):
  files = []
  for file in os.listdir(folder):
    pwd = os.path.join(folder, file)
    if os.path.isfile(pwd):
      files.append('\'%s\'' % os.path.basename(file).split('.')[0])
    elif os.path.isdir(pwd):
      files += getFiles(pwd)
  return files

if __name__ == '__main__':
  print('\n    | '.join(getFiles(os.getcwd())))
