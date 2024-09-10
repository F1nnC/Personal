---
title: Anatomy of GitHub Pages
author: mort
categories: ['Lesson']
tags: ['Web Dev']
type: hacks
week: 0
description: Learn the Files and development work flow of GitHub Pages.  This includes working with you home page, theme, markdown, and more.
toc: True
comments: True
date: 2023-08-17 12:00:00 +0000
---

## Overview of GitHub Pages files
> Discuss how to develop a home page, code, run local server test, and then sync to deploy to GitHub Pages.
- Review tools setup and make in README.md to support this lesson.  

## Files and Directories in this Project
> Here are some defintion to key files and directories in this project

- `README.md`: This file contains instructions and background information about the project. It is a standard file present in all properly set up GitHub projects.

- `index.md`: This is the source file for the home page of the project. It is a standard file for all GitHub Pages projects. Note that Markdown (.md) files are converted to HTML by the Jekyll build process. HTML files are the only file type that is rendered on a website.

- `_notebooks`: This directory contains Jupyter Notebook (.ipynb) files. These files are converted to Markdown (.md) files by the Makefile rules in the build process. The Markdown files are then converted to HTML by the Jekyll build process.

- `_posts`: This directory contains Markdown (.md) files that will be part of the website. These files are formatted similarly to index.md and include frontmatter (metadata coded in YAML) and Markdown, HTML, JavaScript, and CSS source code. You will also find Liquid code in these files, which is used to generate Markdown, HTML, JavaScript, and CSS.

- `_data`: This directory is the standard location for storing data files that support the _posts or _notebooks directories.

- `images`: This directory is the standard location for storing image files (JPEG, PNG, etc.) that support the _posts or _notebooks directories.

- `_config.yml`: This file contains YAML definitions (key-value properties) used to build the Jekyll website.

- `.gitignore`: This file specifies elements to be excluded from version control. Files are excluded when they are derived from the original source and not considered part of the project's source code. In the VSCode Explorer, you may notice some files appearing dimmed, indicating that they are purposely excluded by the rules in .gitignore.

Please note that there are many other key files and directories in a GitHub Pages project, but we will highlight those as the development progresses.


## Changing the Theme
> Google "github pages themes"  or this [theme link](https://pages.github.com/themes/).   The purpose of this section is to help you change your Theme options.
- ```_config.yml``` contains commented out alternatives to themes (see '# theme requirements' cell below).  try these themes by commenting out midnight them with # at front and remove comment # from the front of theme of choice.  after changing theme you will need to do a `make clean`  followed by a `make` to test.
` ```_includes/head.thml``` this file contains code to ensure page loads the proper javascript.  this is a partial effort at support.  you will need to follow readme.md instruction of theme provider to finish convertion.


```python
# theme requirements
remote_theme: pages-themes/midnight@v0.2.0
# remote_theme: pages-themes/dinky@v0.2.0
# remote_theme: pages-themes/minimal@v0.2.0
# remote_theme: pages-themes/hacker@v0.2.0
# remote_theme: pages-themes/cayman@v0.2.0
# remote_theme: pages-themes/time-machine@v0.2.0
plugins:
- jekyll-remote-theme
```


```python

{% if site.remote_theme contains 'midnight' %}
  <script src="{{ '/assets/js/respond.js' | relative_url }}"></script>
{% elsif site.remote_theme contains 'dinky' %}
  <script src="{{ '/assets/js/scale.fix.js' | relative_url }}"></script>
{% elsif site.remote_theme contains 'time-machine' %}
  <script src="{{ '/assets/js/script.js' | relative_url }}"></script>
{% elsif site.remote_theme contains 'cayman' %}
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link rel="preload" href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" as="style" type="text/css" crossorigin>
  <meta name="theme-color" content="#157878">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
{% endif %}
```

## Hacks
> Perform customization to your 'student'.  This is an opportunity to learn a few concepts from 'teacher' repository and then customize your own page to your course needs and personal interests.  

Observe the Submenu on the teacher project home page.

- Course.  This is course overview.  
- Style.  This page how to Style, while understanding inherited styling from Theme.
- Background.  This page contains JavaScript background description overlay.
- Table.  This page shows how to obtain data from outside source and forming a table.
- About.  This is about the Creator.

### Course Hack
> This is made from markdown and references images from the `image` foler.
- ```index.md``` is the file that contains markdown for this page
- ```_includes/nave_home.html``` contains code for submenu, it is included in every page in this dialog
- menus code shows img and href examples, ```{{site.baseurl}}``` refers to baseurl defined in _config.yml, this is the localtion of all files in website.   note, this changes as you run on localhost and deployed; make sure you remember to use this for locations of assets in site.

```html
<table>
    <tr>
        <td><img src="{{site.baseurl}}//images/logo.png" height="60" title="Frontend" alt=""></td>
        <td><a href="{{site.baseurl}}/index">Course</a></td>
        <td><a href="{{site.baseurl}}/techtalk/home_style">Style</a></td>
        <td><a href="{{site.baseurl}}/frontend/home_javascript">JavaScript</a></td>
        <td><a href="{{site.baseurl}}/frontend/home_table">Table</a></td>
        <td><a href="{{site.baseurl}}/frontend/home_about">About</a></td>
    </tr>
</table>
```

- As you view content in any of these files, it is best to recognize language type and then find a reference.  For instance, looking at index.md you should recognize it as Markdown and then use a Markdown Cheet Sheet for reference.

### Style Hack
> The Style submenu is using a Calculator as an example.
- ```/assets/css/style.css``` contains import of style customization per rules defined by github pages themse.  read the description on how stye customization are handled by [midnight](https://github.com/pages-themes/midnight#readme) in the readme.md.  this is a way to use there repo of customization, but also add individual spice.  this is much faster than trying to do this by yourself.
- ```/_posts/<date>example-calculator.md``` contains code for calculator in the project.  only the top output is generating completely custom style, the remainder comes from adjusting style.css.
- A Calculator is a great way to learn customizations of things like buttons, which are common elements in a Theme.  Also, it is great way to learn Math operations.  Suggested Hacks are inside this file.
- As you view the content of this file you will see CSS, HTML, and JavaScipt.  To enhance this you would need to start to learn the basic structures and use a Cheat Sheet for reference.   Also, putting this code into ChatGPT and aking for overview is a great way to understand line by line.
