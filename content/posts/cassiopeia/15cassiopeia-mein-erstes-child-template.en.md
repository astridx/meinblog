---
description: 'desc'
set: 'en/eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-using-cassiopeia'
syndication:
shortTitle: 'short'
date: 2022-05-04
title: 'A first Joomla Child-Template'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: en/cassiopeia-mein-erstes-child-template
langKey: en
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---










In this tutorial I describe the first steps on the way to the birth of my first child template. I made this start on the basis of the standard template Cassiopeia.<!-- \index{child template} -->

Since Joomla 4.1 it is possible to create your own template easily with the child template function. Like a cat at a mouse hole, you can very slowly work your way into template development. It is only necessary to maintain the elements you have added yourself. So it is only mandatory that you are familiar with them. Everything else will continue to be kept up to date by the Joomla project.

### Creating a Child Template

I am building on a fresh Joomla 4.1 installation. 1.

Open the Template Manager by clicking on 'System' on the left and then on 'Site Templates' on the right.

You will see a new entry 'parent' under the name of the template. This indicates whether a template has the prerequisites to create a child template. This is where the magic begins!

![Joomla 4 - Cassiopeia | Childtemplate - A new entry](/images/child1.png)

2. next open the template Cassiopei by clicking on the entry 'Cassiopeia Details and Files'.

Here you will also find something new: The button 'Create Childtemplate'. In addition, the file structure has changed, which you can see in the left-hand area. 

> The button 'Copy template' is no longer available. You might know this from previous Joomla versions?

![Joomla 4 - Cassiopeia | Childtemplate - Template Cassiopeia](/images/child2.png)

Now click on the button 'Create Childtemplate' and create your first Joomla Child Template.

Follow the two steps shown in the following pictures. You will see that it is indeed uncomplicated.

![Joomla 4 - Cassiopeia | Childtemplate - Create Step 1](/images/child3.png)

![Joomla 4 - Cassiopeia | Childtemplate - Create Step 2](/images/child4.png)

Voila! That is it! You have created a child template. You can see from the files in the left-hand area that you are still in the Cassiopeia view. To edit the new child template, change the view in the next step. 

4. Close the display of the Cassiopeia files and open your child template.

Click on the name of your child template in the dashboard.

![Joomla 4 - Cassiopeia | Childtemplate - Open Child Template ](/images/child5.png)

5. Look at the files that were automatically created for your child template. This is a minimal structure.

The following views show you the content of your child template after you have clicked on the name of your child template in the dashboard.

![Joomla 4 - Cassiopeia | Childtemplate - File structure of the child template](/images/child6.png)

If you activate this template as default template, the display in the frontend does not change yet, because everything is inherited and used from the parent template Cassiopeia. 

6. Open the frontend view of the website and make sure that Cassiopeia and your child template have the same display so far.

To do this, first look at the display of Cassiopeia immediately after the installation of Joomla.

![Joomla 4 - Cassiopeia | Childtemplate - View of the Cassiopeia Template in the Frontend](/images/child7.png)

Activate your Child Template

![Joomla 4 - Cassiopeia | Childtemplate - Open Template Styles](/images/child8a.png)

![Joomla 4 - Cassiopeia | Childtemplate - Activate other template til](/images/child8.png)

Look at the display again in the frontend

![Joomla 4 - Cassiopeia | Childtemplate - View of the Cassiopeia Child Template in the Frontend](/images/child7.png)

7. create an override

After a very fresh Joomla installation, the 'Featured' view is active by default. Therefore we create an override of this view. 

Click on the entry 'featured'.

![Joomla 4 - Cassiopeia | Childtemplate - Create Override 1](/images/child9a.png)

Add a simple text in the override.

![Joomla 4 - Cassiopeia | Childtemplate - Create Override 2](/images/child9b.png)

Make sure that the change is applied in the frontend.

![Joomla 4 - Cassiopeia | Childtemplate - Create Override 3](/images/child9.png)

> This is not about programming, but about principle. You are now in a position to create your own overrides!

8. create a 'user.css' and change CSS styles

Usually you want to output your style on the website. This is usually done using CSS. With the help of the file `user.css` you can use everything from Cassiopeia and only add or change your own style.

So click on the 'New File' button in the toolbar to create a new file.

![Joomla 4 - Cassiopeia | Childtemplate - ](/images/child10a.png)

Create the file `user.css` in the directory `media/css`, because here it will be searched first, if your Child Template is active.
 
![Joomla 4 - Cassiopeia | Childtemplate - ](/images/child10b.png)

Make sure that the file is saved correctly.

![Joomla 4 - Cassiopeia | Childtemplate - ](/images/child10c.png)

Create new styles. For example, change the background colour of the navigation:

Use the following code:

```css
:root {
  --cassiopeia-color-primary: red;
}

.container-header {
  background-image: none;
}
```

The specification 

```css
.container-header {
  background-image: none;
}
```

is important because Cassiopeia uses CSS to insert a gradient as an image in the header. See the following code excerpt from Cassiopeia's `template.css`. 

```css
/* Codeauszug aus der template.css von Cassiopeia*/
.container-header {
  background-color: var(--cassiopeia-color-primary);
  background-image: linear-gradient(135deg,var(--cassiopeia-color-primary) 0,var(--cassiopeia-color-hover) 100%);
  box-shadow: inset 0 5px 5px rgba(0,0,0,.03);
  position: relative;
  z-index: 10;
}
```
It is mandatory to overwrite this code.
 
![Joomla 4 - Cassiopeia | Childtemplate - ](/images/child10d.png)

Make sure that the change is applied to the frontend.

![Joomla 4 - Cassiopeia | Childtemplate - ](/images/child10.png)
<img src="https://vg05.met.vgwort.de/na/d853bd401a674539a14dbe522babd39d" width="1" height="1" alt="">