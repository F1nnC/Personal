---
title: Linux Shell and Bash
author: mort
categories: ['Lesson']
tags: ['Linux', 'Bash']
type: hacks
week: 0
description: A Tech Talk on Linux and the Bash shell.
toc: True
comments: True
date: 2023-08-17 12:00:00 +0000
---

## Bash Tutorial
> A brief overview of Bash, on your way to becoming a Linux expert.  <mark>When a computer boots up, a kernel (MacOS, Windows, Linux) is started</mark>.  This kernel provides a shell, or <mark>terminal</mark>, that allows user to interact with a most basic set of commands.  Typically, the casual user will not interact with the shell/terminal as a Desktop User Interface is started by the computer boot up process.  To activate a shell directly, users will run a "terminal" through the Desktop. <mark>VS Code provides ability to activate "terminal"</mark> while in the IDE.

## Variable Prerequisites
> Setup bash shell dependency variables for this page.  Variables are one of the first aspects of programming.  <mark>Variables have "name" and a "value"</mark>.

- Hack Note: Change variables to match your student project.

### Define variable
The following code cell <mark>defines 3 variables and assigns each a value</mark>.  There are some extra command, called a HERE document, that write these variables to a file.  This is so we can use these variables over and over below.


```python
%%script bash

# Dependency Variables, set to match your project directories

cat <<EOF > /tmp/variables.sh
export project_dir=$HOME/vscode  # change vscode to different name to test git clone
export project=\$project_dir/teacher  # change teacher to name of project from git clone
export project_repo="https://github.com/nighthawkcoders/teacher.git"  # change to project of choice
EOF
```

### Output the value of a variable
The following code cell <mark>outputs the value of the variables</mark>, using the echo command.  For visual understanding in the output, each echo command provide a title before the $variable 


```python
%%script bash

# Extract saved variables
source /tmp/variables.sh

# Output shown title and value variables
echo "Project dir: $project_dir"
echo "Project: $project"
echo "Repo: $project_repo"
```

    Project dir: /home/david/vscode
    Project: /home/david/vscode/teacher
    Repo: https://github.com/nighthawkcoders/teacher.git


## Project Setup and Analysis with Bash Scripts
The bash scripts that follow automate what was done in the setup procedures.  The purpose of this is to show that many of the commands we performed can be added to a script, then performed automatically.

### Pull Code
> Pull code from GitHub to your machine. This is a <mark>bash script</mark>, a sequence of commands, that will create a project directory and add the "project" from GitHub to the vscode directory.  There is conditional logic to make sure that clone only happen if it does not (!) exist.   Here are some key elements in this code...

- cd command (change directory), remember this from terminal session
- if statements (conditional statement, called selection statement by College Board), code inside only happens if condition is met


```python
%%script bash

# Extract saved variables
source /tmp/variables.sh

echo "Using conditional statement to create a project directory and project"

cd ~    # start in home directory

# Conditional block to make a project directory
if [ ! -d $project_dir ]
then 
    echo "Directory $project_dir does not exists... makinng directory $project_dir"
    mkdir -p $project_dir
fi
echo "Directory $project_dir exists." 

# Conditional block to git clone a project from project_repo
if [ ! -d $project ]
then
    echo "Directory $project does not exists... cloning $project_repo"
    cd $project_dir
    git clone $project_repo
    cd ~
fi
echo "Directory $project exists." 
```

    Using conditional statement to create a project directory and project
    Directory /home/david/vscode exists.
    Directory /home/david/vscode/teacher exists.


### Look at files Github project
> All computers contain files and directories.  The clone brought more files from cloud to your machine.  Review the bash shell script, observe the commands that show and interact with files and directories.  These were used during setup.

- "ls" lists computer files in Unix and Unix-like operating systems
- "cd" offers way to navigate and change working directory
- "pwd" print working directory
- "echo" used to display line of text/string that are passed as an argument


```python
%%script bash

# Extract saved variables
source /tmp/variables.sh

echo "Navigate to project, then navigate to area wwhere files were cloned"
cd $project
pwd

echo ""
echo "list top level or root of files with project pulled from github"
ls

```

    Navigate to project, then navigate to area wwhere files were cloned
    /home/david/vscode/teacher
    
    list top level or root of files with project pulled from github
    Gemfile
    LICENSE
    Makefile
    README.md
    _config.yml
    _data
    _includes
    _layouts
    _notebooks
    _posts
    assets
    csa.md
    csp.md
    csse.md
    images
    index.md
    indexBlogs.md
    scripts


### Look at file list with hidden and long attributes
> Most linux commands have options to enhance behavior.  The enhanced listing below shows permission bits, owner of file, size and date.

[ls reference](https://www.rapidtables.com/code/linux/ls.html)


```python
%%script bash

# Extract saved variables
source /tmp/variables.sh

echo "Navigate to project, then navigate to area wwhere files were cloned"
cd $project
pwd

echo ""
echo "list all files in long format"
ls -al   # all files -a (hidden) in -l long listing
```

    Navigate to project, then navigate to area wwhere files were cloned
    /home/david/vscode/teacher
    
    list all files in long format
    total 100
    drwxr-xr-x 12 david david 4096 Aug 22 08:56 .
    drwxr-xr-x  6 david david 4096 Aug 22 08:56 ..
    drwxr-xr-x  8 david david 4096 Aug 22 08:56 .git
    drwxr-xr-x  3 david david 4096 Aug 22 08:56 .github
    -rw-r--r--  1 david david  157 Aug 22 08:56 .gitignore
    -rw-r--r--  1 david david  122 Aug 22 08:56 Gemfile
    -rw-r--r--  1 david david 1081 Aug 22 08:56 LICENSE
    -rw-r--r--  1 david david 3131 Aug 22 08:56 Makefile
    -rw-r--r--  1 david david 6853 Aug 22 08:56 README.md
    -rw-r--r--  1 david david  607 Aug 22 08:56 _config.yml
    drwxr-xr-x  2 david david 4096 Aug 22 08:56 _data
    drwxr-xr-x  2 david david 4096 Aug 22 08:56 _includes
    drwxr-xr-x  2 david david 4096 Aug 22 08:56 _layouts
    drwxr-xr-x  3 david david 4096 Aug 22 08:56 _notebooks
    drwxr-xr-x  2 david david 4096 Aug 22 08:56 _posts
    drwxr-xr-x  4 david david 4096 Aug 22 08:56 assets
    -rw-r--r--  1 david david   92 Aug 22 08:56 csa.md
    -rw-r--r--  1 david david   98 Aug 22 08:56 csp.md
    -rw-r--r--  1 david david  108 Aug 22 08:56 csse.md
    drwxr-xr-x  2 david david 4096 Aug 22 08:56 images
    -rw-r--r--  1 david david 5149 Aug 22 08:56 index.md
    -rw-r--r--  1 david david   53 Aug 22 08:56 indexBlogs.md
    drwxr-xr-x  2 david david 4096 Aug 22 08:56 scripts



```python
%%script bash

# Extract saved variables
source /tmp/variables.sh

echo "Look for posts"
export posts=$project/_posts  # _posts inside project
cd $posts  # this should exist per fastpages
pwd  # present working directory
ls -l  # list posts
```

    Look for posts
    /home/david/vscode/teacher/_posts
    total 88
    -rw-r--r-- 1 david david  7685 Aug 22 08:56 2023-08-16-Tools_Equipment.md
    -rw-r--r-- 1 david david  4650 Aug 22 08:56 2023-08-16-pair_programming.md
    -rw-r--r-- 1 david david  7137 Aug 22 08:56 2023-08-17-markdown-html_fragments.md
    -rw-r--r-- 1 david david  6659 Aug 22 08:56 2023-08-23-javascript-calculator.md
    -rw-r--r-- 1 david david 10642 Aug 22 08:56 2023-08-30-agile_methodolgy.md
    -rw-r--r-- 1 david david  3849 Aug 22 08:56 2023-08-30-javascript-music-api.md
    -rw-r--r-- 1 david david  5312 Aug 22 08:56 2023-09-06-javascript-motion-mario-oop.md
    -rw-r--r-- 1 david david  4812 Aug 22 08:56 2023-09-13-java-free_response.md
    -rw-r--r-- 1 david david 13220 Aug 22 08:56 2023-10-16-java-api-pojo-jpa.md
    -rw-r--r-- 1 david david  6819 Aug 22 08:56 2023-11-13-jwt-java-spring.md



```python
%%script bash

# Extract saved variables
source /tmp/variables.sh

echo "Look for notebooks"
export notebooks=$project/_notebooks  # _notebooks is inside project
cd $notebooks   # this should exist per fastpages
pwd  # present working directory
ls -l  # list notebooks
```

    Look for notebooks
    /home/david/vscode/teacher/_notebooks
    total 740
    -rw-r--r-- 1 david david  13014 Aug 22 08:56 2023-08-01-cloud_database.ipynb
    -rw-r--r-- 1 david david   8992 Aug 22 08:56 2023-08-01-mario_player.ipynb
    -rw-r--r-- 1 david david  43705 Aug 22 08:56 2023-08-02-cloud-workspace-automation.ipynb
    -rw-r--r-- 1 david david  22060 Aug 22 08:56 2023-08-03-mario_block.ipynb
    -rw-r--r-- 1 david david  11791 Aug 22 08:56 2023-08-03-mario_platform.ipynb
    -rw-r--r-- 1 david david  19450 Aug 22 08:56 2023-08-03-mario_tube.ipynb
    -rw-r--r-- 1 david david  24387 Aug 22 08:56 2023-08-04-mario_background.ipynb
    -rw-r--r-- 1 david david   3496 Aug 22 08:56 2023-08-07-mario_lesson.ipynb
    -rw-r--r-- 1 david david  10110 Aug 22 08:56 2023-08-15-java-hello.ipynb
    -rw-r--r-- 1 david david  25624 Aug 22 08:56 2023-08-16-github_pages_setup.ipynb
    -rw-r--r-- 1 david david  16156 Aug 22 08:56 2023-08-16-linux_shell.ipynb
    -rw-r--r-- 1 david david  11466 Aug 22 08:56 2023-08-16-python_hello.ipynb
    -rw-r--r-- 1 david david   9425 Aug 22 08:56 2023-08-23-github_pages_anatomy.ipynb
    -rw-r--r-- 1 david david  22668 Aug 22 08:56 2023-08-23-java-console_games.ipynb
    -rw-r--r-- 1 david david   9038 Aug 22 08:56 2023-08-23-python_tricks.ipynb
    -rw-r--r-- 1 david david  10152 Aug 22 08:56 2023-08-30-javascript_top_10.ipynb
    -rw-r--r-- 1 david david   9689 Aug 22 08:56 2023-08-30-showcase-S1-pair.ipynb
    -rw-r--r-- 1 david david   7192 Aug 22 08:56 2023-09-05-python-flask-anatomy.ipynb
    -rw-r--r-- 1 david david  22157 Aug 22 08:56 2023-09-06-AWS-deployment.ipynb
    -rw-r--r-- 1 david david  14380 Aug 22 08:56 2023-09-06-java-primitives.ipynb
    -rw-r--r-- 1 david david  11671 Aug 22 08:56 2023-09-06-javascript-input.ipynb
    -rw-r--r-- 1 david david  13706 Aug 22 08:56 2023-09-12-java_menu_class.ipynb
    -rw-r--r-- 1 david david   9562 Aug 22 08:56 2023-09-13-java_fibonaccii_class.ipynb
    -rw-r--r-- 1 david david  44217 Aug 22 08:56 2023-09-13-javascript_output.ipynb
    -rw-r--r-- 1 david david  43423 Aug 22 08:56 2023-09-13-python-pandas_intro.ipynb
    -rw-r--r-- 1 david david  11578 Aug 22 08:56 2023-09-20-java-image_2D.ipynb
    -rw-r--r-- 1 david david  26739 Aug 22 08:56 2023-09-20-javascript_motion_dog.ipynb
    -rw-r--r-- 1 david david  13599 Aug 22 08:56 2023-10-02-java-spring-anatomy.ipynb
    -rw-r--r-- 1 david david  12429 Aug 22 08:56 2023-10-09-java-chatgpt.ipynb
    -rw-r--r-- 1 david david  15632 Aug 22 08:56 2023-10-09-javascript_api.ipynb
    -rw-r--r-- 1 david david 113091 Aug 22 08:56 2023-10-09-python_machine_learing_fitness.ipynb
    -rw-r--r-- 1 david david  16271 Aug 22 08:56 2023-11-13-jwt-python-flask.ipynb
    -rw-r--r-- 1 david david  15951 Aug 22 08:56 2023-11-13-vulnerabilities.ipynb
    -rw-r--r-- 1 david david  18328 Aug 22 08:56 2023-11-20-jwt-java-spring-challenge.md
    -rw-r--r-- 1 david david  10745 Aug 22 08:56 2024-01-04-cockpit-setup.ipynb
    drwxr-xr-x 2 david david   4096 Aug 22 08:56 files



```python
%%script bash

# Extract saved variables
source /tmp/variables.sh

echo "Look for images in notebooks, print working directory, list files"
cd $notebooks/images  # this should exist per fastpages
pwd
ls -l
```

    Look for images in notebooks, print working directory, list files


    bash: line 6: cd: /images: No such file or directory


    /home/david/vscode/CSApages/_notebooks
    total 40
    -rw-r--r-- 1 david david   628 Aug 22 13:42 2023-08-17-tools.ipynb
    -rw-r--r-- 1 david david 10122 Aug 22 13:41 2023-08-21-java-hello.ipynb
    -rw-r--r-- 1 david david 23480 Aug 22 14:13 2023-08-21-linux_shell.ipynb


### Look inside a Markdown File
> "cat" reads data from the file and gives its content as output


```python
%%script bash

# Extract saved variables
source /tmp/variables.sh

echo "Navigate to project, then navigate to area wwhere files were cloned"

cd $project
echo "show the contents of README.md"
echo ""

cat README.md  # show contents of file, in this case markdown
echo ""
echo "end of README.md"

```

    Navigate to project, then navigate to area wwhere files were cloned
    show the contents of README.md
    
    ## Teacher Blog site
    This site is intended for the development of Teacher content.  This blogging site is built using GitHub Pages [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).
    - The purpose is to build lessons and distribute across different Computer Science sections (CSSE, CSP, CSA), a pathway that covers 3 years of High School Instruction.
    - The primary languages and frameworks that are taught are `JavaScript/HTML/CSS`, `Python/Flask`, `Java/Spring`.  Read below for more details.
    - In this course, Teacher content is not exclusively developed by Teachers.  In fact, many Students have been invited to develop and publish content into this repository.  Their names will appear as authors on the content which they aided in producing.
    - This site has incorporated ideas and has radically modified scripts from the now deprecated [fastpages](https://github.com/fastai/fastpages) repository.
    - This site includes assistance and guideance from ChatGPT, [chat.openai.com](https://chat.openai.com/) 
    
    ### Courses and Pathway
    The focus of the Del Norte Computer Science three-year pathway is `Full Stack Web Development`.  This focus provides a variety of technologies and exposures.  The intention of the pathway is breadth and exposure.
    - `JavaScript` documents are focused on frontend development and for entry class into the Del Norte Computer Science pathway.  JavaScript documents and materials are a prerequisites to Python and Java classes.
    - `Python` documents are focused on backend development and requirements for the AP Computer Science Principles exam.
    - `Java` documents are focused on backend development and requirements for the AP Computer Sciene A exam.
    - `Data Structures` materials embedded into JavaScript, Python, or Java documents are focused on college course articulation.
    
    ### Resources and Instruction
    The materials, such as this README, as well as `Tools`, `DevOps`, and `Collaboration` resources are integral part of this course and Computer Science in general.  Everything in our environment is part of our learning of Computer Science. 
    - `Visual Studio Code` is key the code-build-debug cycle editor used in this course, [VSCode download](https://code.visualstudio.com/).  This is an example of a resource, but inside of it it has features for collaboration.
    - `Tech Talks`, aka lectures, are intended to be interactive and utilize `Jupyter Notebooks` and Websites.  This is an example of blending instruction and tools together, which in turn provide additional resources for learning.  For instance, deep knowledge on  GitHub Pages and Notebooks are valuable in understanding principles behind Full Stack Development and Data Science. 
    
    ## GitHub Pages
    All `GitHub Pages` websites are managed on GitHub infrastructure. GitHub uses `Jekyll` to tranform your content into static websites and blogs. Each time we change files in GitHub it initiates a GitHub Action that rebuilds and publishes the site with Jekyll.  
    - GitHub Pages is powered by: [Jekyll](https://jekyllrb.com/).
    - Publised teacher website: [nighthawkcoders.github.io/teacher](https://nighthawkcoders.github.io/teacher/)
    
    ## Preparing a Preview Site 
    In all development, it is recommended to test your code before deployment.  The GitHub Pages development process is optimized by testing your development on your local machine, prior to files on GitHub
    
    Development Cycle. For GitHub pages, the tooling described below will create a development cycle  `make-code-save-preview`.  In the development cycle, it is a requirement to preview work locally, prior to doing a VSCode `commit` to git.
    
    Deployment Cycle.  In the deplopyment cycle, `sync-github-action-review`, it is a requirement to complete the development cycle prior to doing a VSCode `sync`.  The sync triggers github repository update.  The action starts the jekyll build to publish the website.  Any step can have errors and will require you to do a review.
    
    ### WSL and/or Ubuntu installation requirements
    - The result of these step is Ubuntu tools to run preview server.  These procedures were created using [jekyllrb.com](https://jekyllrb.com/docs/installation/ubuntu/)
    ```bash
    # 
    # WSL/Ubuntu setup
    #
    mkdir mkdir vscode
    git clone https://github.com/nighthawkcoders/teacher.git
    # run script, path vscode/teacher are baked in script
    ~/vscode/teacher/scripts/activate_ubuntu.sh
    #=== !!!Start a new Terminal!!! ===
    #=== Continue to next section ===
    ```
    
    ### MacOs installation requirements 
    - Ihe result of these step are MacOS tools to run preview server.  These procedures were created using [jekyllrb.com](https://jekyllrb.com/docs/installation/macos/). 
    
    ```bash
    # 
    # MacOS setup
    #
    mkdir mkdir vscode
    git clone https://github.com/nighthawkcoders/teacher.git
    # run script, path vscode/teacher are baked in script
    ~/vscode/teacher/scripts/activate_macos.sh
    #=== !!!Start a new Terminal!!! ===
    #=== Continue to next section ===
    ```
    
    
    ### Run Preview Server
    - The result of these step is server running on: http://0.0.0.0:4100/teacher/.  Regeneration messages will run in terminal on any save and update site upon refresh.  Terminal is active, press the Enter or Return key in the terminal at any time to see prompt to enter commands.
    
    - Complete installation
    ```bash
    cd ~/vscode/teacher
    bundle install
    make
    ```
    - Run Server.  This requires running terminal commands `make`, `make stop`, `make clean`, or `make convert` to manage the running server.  Logging of details will appear in terminal.   A `Makefile` has been created in project to support commands and start processes.
    
        - Start preview server in terminal
        ```bash
        cd ~/vscode/teacher  # my project location, adapt as necessary
        make
        ```
    
        - Terminal output of shows server address. Cmd or Ctl click http location to open preview server in browser. Example Server address message... 
        ```
        Server address: http://0.0.0.0:4100/teacher/
        ```
    
        - Save on ipynb or md activiates "regeneration". Refresh browser to see updates. Example terminal message...
        ```
        Regenerating: 1 file(s) changed at 2023-07-31 06:54:32
            _notebooks/2024-01-04-cockpit-setup.ipynb
        ```
    
        - Terminal message are generated from background processes.  Click return or enter to obtain prompt and use terminal as needed for other tasks.  Alway return to root of project `cd ~/vscode/teacher` for all "make" actions. 
            
    
        - Stop preview server, but leave constructed files in project for your review.
        ```bash
        make stop
        ```
    
        - Stop server and "clean" constructed files, best choice when renaming files to eliminate potential duplicates in constructed files.
        ```bash
        make clean
        ```
    
        - Test notebook conversions, best choice to see if IPYNB conversion is acting up.
        ```bash
        make convert
        ```
        
    end of README.md


## Env, Git and GitHub
> Environment is used to capture things like path to Code or Home directory.  Git and GitHub is NOT Only used to exchange code between individuals, it is often used to exchange code through servers, in our case deployment for Website.   All tools we use have a behind the scenes relationships with the system they run on (MacOS, Windows, Linus) or a relationship with servers which they are connected to (ie GitHub).  There is an "env" command in bash.  There are environment files and setting files (.git/config) for Git.  They both use a key/value concept.

- "env" show setting for your shell
- "git clone" sets up a director of files
- "cd $project" allows user to move inside that directory of files
- ".git" is a hidden directory that is used by git to establish relationship between machine and the git server on GitHub.  


```python
%%script bash

# This command has no dependencies

echo "Show the shell environment variables, key on left of equal value on right"
echo ""

env
```

    Show the shell environment variables, key on left of equal value on right
    
    SHELL=/bin/bash
    PYTHONUNBUFFERED=1
    WSL2_GUI_APPS_ENABLED=1
    CONDA_EXE=/home/david/anaconda3/bin/conda
    _CE_M=
    APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL=1
    WSL_DISTRO_NAME=Ubuntu
    ELECTRON_RUN_AS_NODE=1
    VSCODE_AMD_ENTRYPOINT=vs/workbench/api/node/extensionHostProcess
    NAME=Code
    PWD=/home/david/vscode/CSApages/_notebooks
    LOGNAME=david
    CONDA_ROOT=/home/david/anaconda3
    CONDA_PREFIX=/home/david/anaconda3
    PYDEVD_IPYTHON_COMPATIBLE_DEBUGGING=1
    MOTD_SHOWN=update-motd
    HOME=/home/david
    LANG=C.UTF-8
    WSL_INTEROP=/run/WSL/24013_interop
    LS_COLORS=rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:
    WAYLAND_DISPLAY=wayland-0
    FORCE_COLOR=1
    CONDA_PROMPT_MODIFIER=(base) 
    PYDEVD_USE_FRAME_EVAL=NO
    CLICOLOR=1
    VSCODE_L10N_BUNDLE_LOCATION=
    CLICOLOR_FORCE=1
    LESSCLOSE=/usr/bin/lesspipe %s %s
    VSCODE_HANDLES_SIGPIPE=true
    TERM=xterm-color
    _CE_CONDA=
    LESSOPEN=| /usr/bin/lesspipe %s
    USER=david
    GIT_PAGER=cat
    PYTHONIOENCODING=utf-8
    CONDA_SHLVL=1
    DISPLAY=:0
    SHLVL=3
    PAGER=cat
    VSCODE_CWD=/mnt/c/Users/David/AppData/Local/Programs/Microsoft VS Code
    MPLBACKEND=module://matplotlib_inline.backend_inline
    CONDA_PYTHON_EXE=/home/david/anaconda3/bin/python
    XDG_RUNTIME_DIR=/run/user/1000/
    CONDA_DEFAULT_ENV=base
    CONDA_ALLOW_SOFTLINKS=false
    WSLENV=ELECTRON_RUN_AS_NODE/w:
    
    VSCODE_WSL_EXT_LOCATION=/mnt/c/Users/David/.vscode/extensions/ms-vscode-remote.remote-wsl-0.81.0
    XDG_DATA_DIRS=/usr/local/share:/usr/share:/var/lib/snapd/desktop
    PATH=/home/david/anaconda3/bin:/home/david/anaconda3/condabin:/home/david/anaconda3/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/usr/lib/wsl/lib:/mnt/c/Windows/system32:/mnt/c/Windows:/mnt/c/Windows/System32/Wbem:/mnt/c/Windows/System32/WindowsPowerShell/v1.0:/mnt/c/Windows/System32/OpenSSH:/Docker/host/bin:/mnt/c/Users/David/AppData/Local/Microsoft/WindowsApps:/mnt/c/Users/David/AppData/Local/Programs/Microsoft VS Code/bin:/snap/bin
    DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus
    VSCODE_NLS_CONFIG={"locale":"en","osLocale":"en","availableLanguages":{}}
    HOSTTYPE=x86_64
    PULSE_SERVER=unix:/mnt/wslg/PulseServer
    VSCODE_HANDLES_UNCAUGHT_ERRORS=true
    VSCODE_IPC_HOOK_CLI=/run/user/1000/vscode-ipc-e9a6530b-9f4f-4d64-b64f-1024c95cf91a.sock
    _=/usr/bin/env



```python
%%script bash

# Extract saved variables
source /tmp/variables.sh

cd $project

echo ""
echo "show the secrets of .git"
cd .git
ls -l

echo ""
echo "look at config file"
cat config
```

    
    show the secrets of .git
    total 56
    -rw-r--r-- 1 david david   102 Aug 22 12:19 FETCH_HEAD
    -rw-r--r-- 1 david david    21 Aug 22 08:56 HEAD
    drwxr-xr-x 2 david david  4096 Aug 22 08:56 branches
    -rw-r--r-- 1 david david   267 Aug 22 08:56 config
    -rw-r--r-- 1 david david    73 Aug 22 08:56 description
    drwxr-xr-x 2 david david  4096 Aug 22 08:56 hooks
    -rw-r--r-- 1 david david 11702 Aug 22 08:56 index
    drwxr-xr-x 2 david david  4096 Aug 22 08:56 info
    drwxr-xr-x 3 david david  4096 Aug 22 08:56 logs
    drwxr-xr-x 4 david david  4096 Aug 22 12:19 objects
    -rw-r--r-- 1 david david   112 Aug 22 08:56 packed-refs
    drwxr-xr-x 5 david david  4096 Aug 22 08:56 refs
    
    look at config file
    [core]
    	repositoryformatversion = 0
    	filemode = true
    	bare = false
    	logallrefupdates = true
    [remote "origin"]
    	url = https://github.com/nighthawkcoders/teacher.git
    	fetch = +refs/heads/*:refs/remotes/origin/*
    [branch "main"]
    	remote = origin
    	merge = refs/heads/main


## Advanced Student Request - Make a file in Bash
> This example was requested by a student (Jun Lim, CSA). The request was to make jupyter file using bash, I adapted the request to markdown.  This type of thought will have great extrapolation to coding and possibilities of using List, Arrays, or APIs to build user interfaces.  JavaScript is a language where building HTML is very common.

> To get more interesting output from terminal, this will require using something like mdless (https://github.com/ttscoff/mdless).  This enables see markdown in rendered format.
- On Desktop [Install PKG from MacPorts](https://www.macports.org/install.php)
- In Terminal on MacOS
    - [Install ncurses](https://ports.macports.org/port/ncurses/)
    - ```gem install mdless```
    
> Output of the example is much nicer in "jupyter"


```python
%%script bash

# This example has error in VSCode, it run best on Jupyter
cd /tmp

file="sample.md"
if [ -f "$file" ]; then
    rm $file
fi

tee -a $file >/dev/null <<EOF
# Show Generated Markdown
This introductory paragraph and this line and the title above are generated using tee with the standard input (<<) redirection operator.
- This bulleted element is still part of the tee body.
EOF

echo "- This bulleted element and lines below are generated using echo with standard output (>>) redirection operator." >> $file
echo "- The list definition, as is, is using space to seperate lines.  Thus the use of commas and hyphens in output." >> $file
actions=("ls,list-directory" "cd,change-directory" "pwd,present-working-directory" "if-then-fi,test-condition" "env,bash-environment-variables" "cat,view-file-contents" "tee,write-to-output" "echo,display-content-of-string" "echo_text_>\$file,write-content-to-file" "echo_text_>>\$file,append-content-to-file")
for action in ${actions[@]}; do  # for loop is very similar to other language, though [@], semi-colon, do are new
  action=${action//-/ }  # convert dash to space
  action=${action//,/: } # convert comma to colon
  action=${action//_text_/ \"sample text\" } # convert _text_ to sample text, note escape character \ to avoid "" having meaning
  echo "    - ${action//-/ }" >> $file  # echo is redirected to file with >>
done

echo ""
echo "File listing and status"
ls -l $file # list file
wc $file   # show words
mdless $file  # this requires installation, but renders markown from terminal

rm $file  # clean up termporary file
```

    
    File listing and status
    -rw-r--r-- 1 david david 809 Aug 22 14:18 sample.md
     15 132 809 sample.md
    
    [0m[0;1;47;90mShow Generated Markdown [0;2;30;47m========================================================[0m
    
    This introductory paragraph and this line and the title above are generated
    using tee with the standard input (<<) redirection operator.
    [0;1;91m- [0;1;91m[0;97mThis [0;97mbulleted [0;97melement [0;97mis [0;97mstill [0;97mpart [0;97mof [0;97mthe [0;97mtee [0;97mbody.
    [0;1;91m- [0;1;91m[0;97mThis [0;97mbulleted [0;97melement [0;97mand [0;97mlines [0;97mbelow [0;97mare [0;97mgenerated [0;97musing [0;97mecho [0;97mwith [0;97mstandard
    [0;97moutput [0;97m(>>) [0;97mredirection [0;97moperator.
    [0;1;91m- [0;1;91m[0;97mThe [0;97mlist [0;97mdefinition, [0;97mas [0;97mis, [0;97mis [0;97musing [0;97mspace [0;97mto [0;97mseperate [0;97mlines. [0;97mThus [0;97mthe [0;97muse [0;97mof
    [0;97mcommas [0;97mand [0;97mhyphens [0;97min [0;97moutput.
          [0;1;91m- [0;1;91m[0;97mls: [0;97mlist [0;97mdirectory
          [0;1;91m- [0;1;91m[0;97mcd: [0;97mchange [0;97mdirectory
          [0;1;91m- [0;1;91m[0;97mpwd: [0;97mpresent [0;97mworking [0;97mdirectory
          [0;1;91m- [0;1;91m[0;97mif [0;97mthen [0;97mfi: [0;97mtest [0;97mcondition
          [0;1;91m- [0;1;91m[0;97menv: [0;97mbash [0;97menvironment [0;97mvariables
          [0;1;91m- [0;1;91m[0;97mcat: [0;97mview [0;97mfile [0;97mcontents
          [0;1;91m- [0;1;91m[0;97mtee: [0;97mwrite [0;97mto [0;97moutput
          [0;1;91m- [0;1;91m[0;97mecho: [0;97mdisplay [0;97mcontent [0;97mof [0;97mstring
          [0;1;91m- [0;1;91m[0;97mecho [0;97m"sample [0;97mtext" [0;97m>$file: [0;97mwrite [0;97mcontent [0;97mto [0;97mfile
          [0;1;91m- [0;1;91m[0;97mecho [0;97m"sample [0;97mtext" [0;97m>>$file: [0;97mappend [0;97mcontent [0;97mto [0;97mfile
    
    [0m

## Hack Preparation.
> Review Tool Setup Procedures and think about some thing you could verify through a Shell notebook.
- Come up with your own student view of this procedure to show your tools are installed.  It is best that you keep the few things you understand, add things later as you start to understand them.
- Name and create blog notes on some Linux commands you will use frequently.
- Is there anything we use to verify tools we installed? Review versions?
- How would you update a repository?  Use the git command line? 



```python
%%script bash

echo "Finding Ubuntu Version:"
lsb_release -a
echo

echo "Getting Github Info:"
git config --global --get user.name
git config --global --get user.email
echo

echo "Testing Python:"
if command -v python3 &>/dev/null; then
    echo "Python is already installed."
    python3 --version
else
    echo "Installing Python..."
    sudo apt install -y python3
fi
echo

echo "Testing Ruby:"
if command -v ruby &>/dev/null; then
    echo "Ruby is already installed."
    ruby -v
else
    echo "Installing Ruby..."
    sudo apt install -y ruby-full build-essential zlib1g-dev
fi
echo

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
    

