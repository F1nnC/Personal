---
title: Lab Notebook 0
author: david
categories: ['Lab Notebook']
tags: ['Linux', 'Bash']
type: tangibles
week: 0
description: Week 0 lab work.
toc: True
comments: True
date: 2023-08-18 12:00:00 +0000
---

## Main Tools

There are many tools that are used in CSA, however there are some major tools that are needed to succeed, including:
- WSL - Windows Subsystems for Linux
- VSCode - Coding Program
- Github - Online Storage and Hosting for Code
- Python - Coding Language for Projects
- Java - Coding Language for Projects
- Jekyll - Website Building and Structure
- Ruby - Coding Language for Local Hosting
- Jupyter - Blogging Tool

![tools](/assets/img/post_images/tools.png)

### WSL - Windows Subsystems for Linux

This is essentially a virtual machine that is run in Windows that is used to host a Linux environment which can be accessed through powershell. This is what we use to access VSCode and where we install python and other important tools because of the simplicity of Ubuntu Linux. In order to access WSL, you can type wsl in powershell after you have installed it in order to start the server.

### VSCode - Coding Program

VSCode is where we write all of our code. VSCode's user-friendly interface is what makes it extremely easy to use and plugins that are installed within VSCode allow for server hosting and running different languages. Code can also be debugged in this program easily and errors with in the code can be found. VSCode also has a feature to connect to WSL in order to run files inside the WSL server, allowing us to entirely use Linux when programming.

### Github - Online Storage and Hosting for Code

This is another very important tool to which code is uploaded and can be shared with peers. Websites can also be hosted on Github using Github pages and code can easily be transferred between devices with cloning, pushing, and pulling. Github also allows for the creation of organizations, or groups, which are extremely useful when creating scrum boards and team repositories off of which team members can work. This is valuable and essential to collaboration in all of computer science.

### Python - Coding Language for Projects

this is arguably the best and most simple coding language to begin with, as it has an extremely simply structure and requires very little to get started. this language can be used from printing simple phrases with ```print()``` all the way to hosting flask based servers on which apis and databases are created and stored, which when paired with aws servers, can be extremely powerful in data collection and management.

### Java - Coding Language for Projects

This language is another interesting, yet more advanced language for coding. It has pretty much the same uses as Python, with it's ability to print statements to managing large apis and databases. It is however the most universal and common language run in any device, from CD players to quantum computers. This language is more compact than Python and also allows for better integration with a wider variety of products.

### Jekyll - Website Building and Structure

This tool is important to building websites with external themes. It allows themes, such as mine (chirpy), to be imported from source files and built in my own environment. This is especially important to have with Github Pages, where you might want to customize your theme. You can also use liquid in order to organize your code so that you can import from certain folders and also have page layouts that are pre-coded. With this your code can be short and organized while still having the complexity of other websites.

### Ruby - Coding Language for Local Hosting

Ruby is a very important tool when it come to developing with Jekyll, as it is used to install and manage the libraries required by Jekyll in order to run local servers. Ruby is good at hosting local server environments, which are important with web development, in which you need to see the results of your work at an instant in order to make changes accordingly.

### Jupyter - Blogging Tool

This is a very important tool with creating blogs, in which you might need to insert run pieces of code. Jupyter allows for kernels to be installed which are environments that interpret specific languages. For example, the python kernel is used to run python code in the code cells of a Jupyter Notebook. The same is for Java and many other languages such as HTML, CSS, JS, Bash, LaTex, and many more.

### Tools Script

Below is a script that can be run to install the most important tools needed in a WSL environment.


```python
%%script bash

# Checking Ubuntu Version
echo "Finding Ubuntu Version:"
lsb_release -a
echo

# Checking that Github Info is Correct
echo "Getting Github Info:"
git config --global --get user.name
git config --global --get user.email
echo

# Checking if Python is installed and installing if needed
echo "Testing Python:"
if command -v python3 &>/dev/null; then
    echo "Python is already installed."
    python3 --version
else
    echo "Installing Python..."
    sudo apt install -y python3
fi
echo

# Checking if Ruby is installed and installing if needed
echo "Testing Ruby:"
if command -v ruby &>/dev/null; then
    echo "Ruby is already installed."
    ruby -v
else
    echo "Installing Ruby..."
    sudo apt install -y ruby-full build-essential zlib1g-dev
fi
echo

# Checking if Jupyter is installed and installing if needed
echo "Testing Jupyter:"
if command -v jupyter-notebook &>/dev/null; then
    echo "Jupyter is already installed."
    jupyter --version
    jupyter kernelspec list
else
    echo "Installing Jupyter..."
    sudo apt-get install -y jupyter-notebook
fi
echo

# Checking if Bundler (a part of ruby) is installed and installing if needed
echo "Testing Bundler:"
if command -v jekyll bundler &>/dev/null; then
    echo "Bundler is already installed."
    bundler --version
else
    echo "Installing Bundler..."
    export GEM_HOME="$HOME/gems"
    export PATH="$HOME/gems/bin:$PATH"
    echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
    echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
    gem install jekyll bundler
fi
echo
```

    Finding Ubuntu Version:


    No LSB modules are available.


    Distributor ID:	Ubuntu
    Description:	Ubuntu 22.04.3 LTS
    Release:	22.04
    Codename:	jammy
    
    Getting Github Info:
    DavidVasilev1
    davidkvasilev@gmail.com
    
    Testing Python:
    Python is already installed.
    Python 3.11.4
    
    Testing Ruby:
    Ruby is already installed.
    ruby 3.0.2p107 (2021-07-07 revision 0db68f0233) [x86_64-linux-gnu]
    
    Testing Jupyter:
    Jupyter is already installed.
    Selected Jupyter core packages...
    IPython          : 8.12.0
    ipykernel        : 6.19.2
    ipywidgets       : 8.0.4
    jupyter_client   : 7.4.9
    jupyter_core     : 5.3.0
    jupyter_server   : 1.23.4
    jupyterlab       : 3.6.3
    nbclient         : 0.5.13
    nbconvert        : 6.5.4
    nbformat         : 5.7.0
    notebook         : 6.5.4
    qtconsole        : 5.4.2
    traitlets        : 5.7.1


    0.00s - Debugger warning: It seems that frozen modules are being used, which may
    0.00s - make the debugger miss breakpoints. Please pass -Xfrozen_modules=off
    0.00s - to python to disable frozen modules.
    0.00s - Note: Debugging will proceed. Set PYDEVD_DISABLE_FILE_VALIDATION=1 to disable this validation.


    Available kernels:
      java       /home/david/.local/share/jupyter/kernels/java
      python3    /home/david/anaconda3/share/jupyter/kernels/python3
    
    Testing Bundler:
    Bundler is already installed.
    Bundler version 2.4.19
    


## Common Commands During Windows Installation

There are many different environments and commands that you move through while installing the necessary tools that are needed for this class. The installation begins in powershell, where we install WSL and then move to a Linux environment where we use common commands in order to install various tools.

- ```cd``` - moves between directories
- ```apt install``` - install specific tools that don't need prerequisites
- ```sudo``` - elevate to admin power in order to execute commands where permissions aren't allowed usually
- ```mkdir``` - this command makes a new directory (folder)
- ```gem install``` - installs gems that  are needed with ruby
- ```bundle install``` - installs gems from gemfile
- ```bundle exec jekyll serve``` - creates a simple local server
- ```bundle exec jekyll build``` - builds server in order to deploy as a website
- ```-v``` or ```--version``` - check the version of certain things you've installed in linux to make sure it's the right version
- ```make``` - makes whatever is written in the makefile of a website

## Github and How it Works

Github is where all of the projects that you work on are placed. This is how you will be able to share code and projects with other people as well as keep your files safe if your computer breaks and the files are unrecoverable. Repositories are where you will be keeping your projects and inside these repositories is where your code will be placed. Some of these repositories can be hosted with Github pages and accessed from anywhere in the world but other will be needed to be hosted on other AWS. This can be done by running a server on a linux machine that is constantly up, and which is linked to the internet with a URL. Files in here can be accessed through VSCode if it is personal machine, however if it is a remote machine, then you will need to either edit the code on a local machine and upload to github from which the information can be taken and served or you can edit the files with nano Either way, Github is a powerful tool that can be used to store data which can be easily transferred to machines.

## Local Servers vs Remote Servers

A local server can only be accessed by you and no one else, unless you use a tool such as ngrok to route it through an open port in your network. This type of server is mainly used for development and updates as you edit the code. A remote server includes Github pages or AWS, where code is hosted and routed to the rest of the internet to be constantly run. This is usually used to show off the final product to the internet, where anyone from anywhere can type in the URL of your site and access it.
