# OpenCharity practice

## Web Site approach
### Images
Most images have a greater resolution that what is displayed. This strategy is to allow better quality in devices with pixel-ratio greater than 1

### Styling
- It was divided in three files, in order to separate basic settings, from layout and from section-specific styles.
- Names follow BEM convention
- Properties are ordered
- Fonts are inserted in the html.tpl.php file

### Sections
- Topbar is dynamic, it's contents depend on the main menu of drupal. In narrow screens, the menu is css-based drop-down
- The main banner is static
- The next event bar, depends on the last content of type event that is posted
- Get Involved section has three columns arranged by flexbox with same height and their buttons aligned. In narrow screens it displays one column and three rows.
- Our Mission section has the same arrangement than "Get Involved". Their images are just the white lines, because circles are formed by divs
- The 'Our Members' uses a developed Pagination class, the content depends on "member" content type at administration. As it is a limited quantity, all the content is loaded once and dots are render according to the quantity of elements. The quantity of elements to display vary among screen's break points, and if the quantity is less than the required to complete the width, elements are going to be centered instead of justified.
- The Blog section depends on the *article* content type managed by administration. This section makes uses of the lazy load characteristic of the *Paginator* class.
- The footer section is static.

### What would be better
The following list displays different concepts that I'm used to including in developments, but I don't have the free time to accomplish.
- **Mobile fit**. Several more adjustments should be done to avoid some display problems at narrow screens.
- **Administration customization**, A client that needs a customized public web usually needs a custom administration web.
- **TDD and more tests**. TDD is not suitable for this kind of individual short practices. However, if the site is real, many hands would be on the development and many changes would be expected
- **Sass**. Believe me, I like scss. But as I experimented a machine problem last week I preferred not to install node, gulp/webpack or whatever until I do my checks. Perhaps it is not justified a preprocessor because of the low level of complexity in styles, but it is easier to read.
- **Intelligent text overflow**, the title and body of blogs are just cut. A better solution would be ellipsis in label and a *view more* link at content. However, the 'text-overflow:ellipsis' doesn't word properly, and a smarter cut of body requires much more development or an external library.
- **Dynamic banner**, it is expected that the client wants to change the banner background from time to time.
- **REST SERVICE**, As blogs could have a large amount of data, it would be better to use the service module.
