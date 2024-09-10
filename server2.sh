#!/bin/bash

port=4200
repo_name=alexblog
log_file="/tmp/jekyll${port}.log"
# Exceptions will stop make
shell="/bin/bash"
shellflags="-e"

# Set source and target directories
source_directory="_notebooks"
destination_directory="_posts"

# Function to convert the notebook
function convert_single_notebook() {
    notebook_file="$1"
    base_file_name=$(basename "$notebook_file" .ipynb)
    markdown_file="${destination_directory}/${base_file_name}.md"
    echo "Converting source $notebook_file to destination $markdown_file"
    python -c 'import sys; from scripts.convert_notebooks import convert_single_notebook; convert_single_notebook(sys.argv[1])' "$notebook_file"
    # touch "$markdown_file"  # Trigger auto-regeneration of Jekyll
    # echo "The Markdown file has been touched..."
}

# Function to watch for changes and trigger conversion
function watch_and_convert() {
    while true; do
        echo "Watching for changes..."
        inotifywait -e close_write "$source_directory"
        echo "Change detected, running conversion..."
        for notebook_file in "${notebook_files[@]}"; do
            convert_single_notebook "$notebook_file"
            # touch "$markdown_file"
        done
    done
}

# Get list of notebook files
notebook_files=("${source_directory}"/*.ipynb)

# Start the watch and convert loop in the background
watch_and_convert &

# Save the watch_and_convert function's process ID to stop it later
watch_and_convert_pid=$!

# Function to stop the server and conversion process
function stop() {
    echo "Stopping server..."
    kill "$watch_and_convert_pid"
    lsof -ti :$port | xargs kill >/dev/null 2>&1 || true
    echo "Stopping logging process..."
    ps aux | awk -v log_file=$log_file '$0 ~ "tail -f " log_file { print $2 }' | xargs kill >/dev/null 2>&1 || true
    rm -f "$log_file"
}

# Start the server and conversion process
function server() {
    stop
    for notebook_file in "${notebook_files[@]}"; do
        convert_single_notebook "$notebook_file"
    done
    jekyll clean
    echo "Starting server..."
    bundle exec jekyll serve --livereload
    # watch_and_convert
}

# Call the server function
server
