---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2022-03-02
title: 'Background image over full screen in Cassiopeia'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: en/cassiopeia-hintergrundbild
langKey: en
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---

You want to add an image to the background of your Cassiopeia template in Joomla. The image should fill the whole screen at any time. If the website content is either longer or wider than the screen, the image should stay fixed while scrolling. You can achieve this goal by using the file `user.css`. 

### Background image over full screen

1. choose an image as background image and save it under the name `background.jpg` in the image directory of your Joomla installation.

I use the image from Pexels[^pixabay.com/en/users/pexels-2286921/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1850417] on Pixabay[^pixabay. com/en/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1850417] as an example.

2. create a few sample posts in case you choose a fresh installation to try out. That way you can test later what happens when you scroll them on the site.

> My image serves only as an example. When choosing the image for a productive website, make sure that all content remains readable!

![Joomla 4.1 - Cassiopeia | Background image over whole screen | ](/images/c1_hintergrund.png)

3. now open the system settings in the administration area of Joomla by clicking on `System` in the left menu. Then click in the right area under `Template` the entry `Site Templates` and choose Cassiopeia. Now add the following text to the file `user.css` and save your changes.

> You may have to create the file `user.css` first. Since Joomla 4.1 the correct place for this file is the directory `/media/templates/site/cassiopeia/css/`.

```css
body.site {
	background: transparent;
	background-image: url(../../../../images/background.jpg);
	background-position: top;
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-size: cover;
}
```

> `background-image: url(../../../../images/background.jpg);` is correct if the image is located in the root of the Joomla media directory. If you put the image under `/media/templates/site/cassiopeia/images/`, `background-image: url(../images/background.jpg);` would be the correct entry [^en.wikipedia.org/w/index.php?title=pathname&oldid=205952565].

4. now check the view in the frontend. Your image should now be visible here as background.

![Joomla 4.1 - Cassiopeia | Background image over whole screen ](/images/c2_hintergrund.png)

You can see the result in the following image.

![Joomla 4.1 - Cassiopeia | Background image over whole screen | ](/images/c3_hintergrund.png)

5. adjust background of modules and header.

Add the following text to `user.css` if you want the background of the modules and the header to be transparent as well, so that your image appears here as well.

```css
.card {
  background:transparent;
  border:none;
}

.header {
   background: transparent;
}
```
You can see the result in the following image.

![Joomla 4.1 - Cassiopeia | background image over whole screen ](/images/c4_hintergrund.png)

7. the image stays fixed while scrolling

Scroll to the bottom of the website and make sure that the background does not change.

![Joomla 4.1 - Cassiopeia | full screen background image | ](/images/c5_hintergrund.png)

8. check the appearance of the image on different screen sizes.

The image will not be deformed! But areas are cut off:

If the screen is narrow, image area right and left will be cut off.

![Joomla 4.1 - Cassiopeia | Background image over whole screen ](/images/c6_hintergrund.png)

If the screen is wide but not very high, image area above and below will be hidden.

![Joomla 4.1 - Cassiopeia | Background image over whole screen | ](/images/c6a_hintergrund.png)
<img src="https://vg05.met.vgwort.de/na/7612d32f83da4248a09815fd0a6ef730" width="1" height="1" alt="">
