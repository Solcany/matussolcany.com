---
title: Using Terminal with Aframe
slug: using-terminal-with-aframe
date: 2020-11-20T20:43:39+01:00
type: note
layout: note
categories:
  - tools
draft: false
---

Terminal(also known as CLI, or command line interface) is a tool for controlling your computer and programs. Instead of using graphical icons to start and use programs it uses text commands to do the same. Some niche, open source and free software is often developed without a graphical front-end due to time, budget and people power constrains. Instead this software uses CLI for operation. 

## Install aframe-watcher and Browser-sync

One of these CLI tools is Aframe-watcher used for saving changes made in Aframe Inspector back to the html file. Unfortunately due to the way some CLI software is made and distributed today we need to install other software to install aframe-watcher and browser-sync.

1. On Mac: Applications -> Terminal. On Windows: Start -> search: Command Prompt or cmd
2. **Install Homebrew( https://brew.sh/ ):** Homebrew is a CLI tool for installing software and programming languages.
   */bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"*
3. **Install Node.js( https://nodejs.org/en/ ):** Node.js is a back-end language based on Javascript. It comes with npm which is a tool to install tools based on Node.js. *To install use command: brew install node* 
4. Install aframe-watcher and browser-sync: Both tools use node.js and thus can be installed via npm. Browser-sync is used for to create a local web server on a computer, we need this to be able to serve external files on our aframe website, while we’re developing it.
*To install aframe use command: npm install -g aframe-watcher*
*To install browser-sync use command: npm install -g browser-sync*

## Use aframe-watcher and Browser-sync

If you have your Terminal open after the installation I recommend opening a new terminal session with cmd + t hotkey. To use aframe-watcher and browser-sync we need to first navigate the terminal session to the folder with all the aframe website files. Terminal session always is in some folder, to check where the current terminal session is looking use command pwd
