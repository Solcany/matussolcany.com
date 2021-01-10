---
title: FFmpeg cheatsheet
slug: ffmpeg-cheatsheet
date: 2020-11-20T20:43:39+01:00
type: note
layout: note
category: tools
draft: false
---

# FFmpeg basics

*resources*
https://opensource.com/article/17/6/ffmpeg-convert-media-file-formats

## conversion for web

### mp4, webm

ffmpeg -i input.mp4 -crf 30 -b:v 2M -maxrate 2M output.webm 
ffmpeg -i input.mp4 -crf 30 -b:v 2M -maxrate 2M output.mp4 

### ogv

ffmpeg -i ira-video.mp4 -c:v libtheora -q:v 4 -c:a libvorbis -q:a 4 output.ogv
