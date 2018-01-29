# Furniture Customizer
Epicodus wk 4 code review - Object Oriented Javascript

#### By Jared Clemmensen

## Description

This website was created for the code review in week 4 of the Epicodus web development program. It takes user input parameters for a custom table, calculates a price estimate based on those parameters. I also incorporated a 3D animation to help the user visualize their custom table using three.js.


## Specifications
* User chooses type of table
  * Example Input: Coffee table, desk, dining table
  * Example Output: Program increases price estimate relative to size, passes dimensions to animation script.
* User chooses table height
  * Example Input: 16", 24", 40"
  * Example Output: Program increases price estimate due to more materials needed.
* User chooses design details.
  * Example Input: type of wood, material of legs, color of painted Legs
  * Example Output: Computer increases price estimate based on cost of materials. Passes design info to animation script.
* User views animation.
  * Example Input: Visit link to second page containing three.js animation
  * Example Output: Simple animation based on original inputs. Original page inputs must be updated and animation refreshed to reflect changes.

## Setup/Installation Requirements

* access this site <a href="https://wh0pper.github.io/customizer">here</a>

Known bugs (resolved since submission):
* Pricing and link to animation are not displaying when published on gh-pages at time of submission despite working properly locally. I will be looking into this over the weekend. --turned out to be an issue with the jQuery CDN used

* As of submission on 1/26 I haven't finished implementing the custom color feature in the animation. I will continue working on this. --finished 1/28

## Support and contact details

contact the author at jaredclemmensen@gmail.com

## Technologies Used

The input section of this page is built using HTML, CSS, with javascript and jQuery for backend and interface logic respectively. Three.js is used to create the animation.


### License

Copyright (c) 2018 Jared Clemmensen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
