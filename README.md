# Flickr Image Fetcher
## Overview
This JavaScript-based project enables users to search and display images from Flickr. It provides a dynamic and interactive web interface for filtering and viewing images based on user input.

## Features
Dynamic Search: Users can search for photos, people, or groups on Flickr using a text input field.

Filter Options: Users can sort results by date, relevance, or 'interestingness' and choose the size of the displayed images.

Customizable Results: The amount of pictures to display can be adjusted (up to 500).

Responsive Image Display: Images are shown in a flexible grid layout, which adjusts to the screen size and sidebar state.

Interactive UI: The sidebar for filter options can be toggled, and clicking on an image opens it in a larger view.

Error Handling: The application handles errors gracefully, displaying relevant error messages to users (e.g., network issues, input validation).
## How It Works
The user inputs a query, selects filter options, and specifies the number of images to display.
Upon submitting the search, the application fetches data from Flickr's API based on the user's input.
The application validates user input and displays an error message if the input does not meet the requirements.
If the search is successful, images are displayed according to the specified filters and amount.
Users can click on images to view them in full size.
## Usage
Enter a search term in the text field.
Optionally, set your preferred filters and the desired number of images in the sidebar.
Click 'Search' to display images, or 'Save filters' to apply filter options.
## Technologies Used
HTML/CSS for structure and styling.
Vanilla JavaScript for interactivity and API requests.
