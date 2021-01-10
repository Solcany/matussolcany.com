---
title: Doom Emacs cheatsheet
slug: doom-emacs-cheatsheet
date: 2020-11-20T20:43:39+01:00
type: note
layout: note
category: tools
draft: false
---


# Doom Emacs basics

*help* space + h

# workspace / work session
*save session to file* space + q + S

# search
*search terminal* spcae + s
*search current buffer*
*file terminal* space + .

# files
*file terminal* space + .

# projects
*open project* space + p + p

# bookmarks
*bookmarks terminal* space + return
*creating a new bookmark* while in a buffer, open the bookmarks terminal and type the bookmark's name

# dired
*rename* R
*new folder* +

# sidebar
*open sidebar* space + o + p

# windows 
*next window* space + w + w
*window above* space + w + j
*window below* space + w + k
*window left* space + w + h
*window right* space + w + l
*close window* space + w + c
*split vertically* space + w + v
*split horizontally* space + w + s
*equalize windows* space + w + =
*increase/decrease window width* space + w + > OR <
*increase/decrease window width 25 times* 25 space + w + > OR <

# buffers
*show buffers in the current workspace* space + , OR space + b + b
*show all buffers* space + b + B
*create new empty buffer* space + b + n
*kill buffer* space + b + k

# magit
*magit status* space + g + g
*check diff of unstaged changes* navigate cursor on an unstaged file, press tab
*expand commit information* navigate cursor on a commit, press enter, to quit the new window press q or ESC
*stage file* navigate the cursor on an unstaged file, press s
*unstage file* navigate the cursor on a staged file, press u
*stage all* S
*unstage all* U
*commit* c + c
*save commit* ctrl + c + ctrl + c
*push* p
