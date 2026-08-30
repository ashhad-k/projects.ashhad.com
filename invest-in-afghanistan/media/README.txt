This folder holds the images and hero videos the site uses.

If it is empty, run the downloader in the parent folder first:

    bash download-media.sh

(or double-click download-media.command on a Mac)

The pages work either way — if a local file is missing they automatically fall
back to the hosted copy on the CDN. Downloading them just makes this folder
completely self-sufficient, so the zip you hand to the developer contains
everything and needs no internet connection.
