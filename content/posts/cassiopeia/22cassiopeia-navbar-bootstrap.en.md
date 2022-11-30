---
description: 'desc'
set: ''
booklink: ''
syndication: 
shortTitle: 'short'
date: 2022-03-28
title: 'Bootstrap 5 Navigation in Cassiopeia'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: en/cassiopeia-how-to-make-navbar-bootstrap
langKey: en
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---










Cassiopia is a Bootstrap 5 template. But the navigation works with MetisMenu. If you are familiar with Bootstrap and want to customize the navigation, you will run into problems every now and then.

I created an override which adds the essential Bootstrap classes and attributes.

> You can find the Bootstrap documentation at [getbootstrap.com/docs/](https://getbootstrap.com/docs)[https://getbootstrap.com/docs/].


## Embed Bootstrap

First I copy the minimized Bootstrap 5 files [^getbootstrap.com/] and put them in the directory `media/templates/site/MyTemplate/js/bootstrap.bundle.min.js`, respectively `media/templates/site/MyTemplate/css/bootstrap.bundle.min.css`.

## Create an override from the backend

Create an override for mod_menu in the backend. The image below shows you where to find this option in the administration area.

![Create override for the menu in the backend](/images/boot2a.png)

The override consists of several files, which you can find and edit in the tab editor.

![Edit files in the template manager](/images/boot2.png)

These are the main files

- default.php contains the westentlichen calls
- collapse-default.php extends the file 'default.php' so that it becomes the collapsed hamburger menu on narrow screens.

The layouts for the special menu types

- default_component.php
- default_url.php, 
- default_separator.php und 
- default_heading.php. 


### collapse-default.php
    
We do not need to change the `collapse-default.php` file, which ensures that the menu is usable on narrow screens. The following code snippet shows you the complete file.

```php
defined('_JEXEC') or die;

use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;

HTMLHelper::_('bootstrap.collapse');
?>

<nav class="navbar navbar-expand-md" aria-label="<?php echo htmlspecialchars($module->title, ENT_QUOTES, 'UTF-8'); ?>">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbar<?php echo $module->id; ?>" aria-controls="navbar<?php echo $module->id; ?>" aria-expanded="false" aria-label="<?php echo Text::_('MOD_MENU_TOGGLE'); ?>">
        <span class="icon-menu" aria-hidden="true"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbar<?php echo $module->id; ?>">
        <?php require __DIR__ . '/default.php'; ?>
    </div>
</nav>

```

### default.php

In the file `default.php` I deleted the calls for the Metis Menu JavaScript, because the functionality is now taken over by Bootstrap. In its place I have included the previously downloaded Bootstrap via HTMLHelper. Last but not least, I added the necessary classes.

The difference view looks like this:

```php {diff}
 defined('_JEXEC') or die;
 
 use Joomla\CMS\Helper\ModuleHelper;
+use Joomla\CMS\HTML\HTMLHelper;
 
-/** @var Joomla\CMS\WebAsset\WebAssetManager $wa */
-$wa = $app->getDocument()->getWebAssetManager();
-$wa->registerAndUseScript('mod_menu', 'mod_menu/menu.min.js', [], ['type' => 'module']);
-$wa->registerAndUseScript('mod_menu', 'mod_menu/menu-es5.min.js', [], ['nomodule' => true, 'defer' => true]);
+HTMLHelper::_(
+    'script',
+    'media/templates/site/astrid/js/bootstrap.bundle.min.js',
+    ['version' => 'auto', 'relative' => false]
+    );
+HTMLHelper::_(
+    'stylesheet',
+    'media/templates/site/astrid/js/bootstrap.bundle.min.css',
+    ['version' => 'auto', 'relative' => false]
+    ); 
 $id = '';
  
 // The menu class is deprecated. Use mod-menu instead
 ?>
-<ul<?php echo $id; ?> class="mod-menu mod-list nav <?php echo $class_sfx; ?>">
+<ul<?php echo $id; ?> class="mod-menu nav navbar-nav <?php echo $class_sfx; ?>">
 <?php foreach ($list as $i => &$item) {
     $itemParams = $item->getParams();
     $class      = 'nav-item item-' . $item->id;
     }
 
     if ($item->parent) {
-        $class .= ' parent';
+        $class .= ' parent dropdown';
     }
 
     echo '<li class="' . $class . '">';
 
     // The next item is deeper.
     if ($item->deeper) {
-        echo '<ul class="mod-menu__sub list-unstyled small">';
+        echo '<ul class="mod-menu__sub list-unstyled small dropdown-menu">';
     } elseif ($item->shallower) {
         // The next item is shallower.
         echo '</li>';


```

The complete file looks like this for me:

```php

defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;
use Joomla\CMS\HTML\HTMLHelper;

HTMLHelper::_(
    'script',
    'media/templates/site/astrid/js/bootstrap.bundle.min.js',
    ['version' => 'auto', 'relative' => false]
    );
HTMLHelper::_(
    'stylesheet',
    'media/templates/site/astrid/js/bootstrap.bundle.min.css',
    ['version' => 'auto', 'relative' => false]
    );

$id = '';

if ($tagId = $params->get('tag_id', '')) {
    $id = ' id="' . $tagId . '"';
}

// The menu class is deprecated. Use mod-menu instead
?>
<ul<?php echo $id; ?> class="mod-menu nav navbar-nav <?php echo $class_sfx; ?>">
<?php foreach ($list as $i => &$item) {
    $itemParams = $item->getParams();
    $class      = 'nav-item item-' . $item->id;

    if ($item->id == $default_id) {
        $class .= ' default';
    }

    if ($item->id == $active_id || ($item->type === 'alias' && $itemParams->get('aliasoptions') == $active_id)) {
        $class .= ' current';
    }

    if (in_array($item->id, $path)) {
        $class .= ' active';
    } elseif ($item->type === 'alias') {
        $aliasToId = $itemParams->get('aliasoptions');

        if (count($path) > 0 && $aliasToId == $path[count($path) - 1]) {
            $class .= ' active';
        } elseif (in_array($aliasToId, $path)) {
            $class .= ' alias-parent-active';
        }
    }

    if ($item->type === 'separator') {
        $class .= ' divider';
    }

    if ($item->deeper) {
        $class .= ' deeper';
    }

    if ($item->parent) {
        $class .= ' dropdown';
    }

    echo '<li class="' . $class . '">';

    switch ($item->type) :
        case 'separator':
        case 'component':
        case 'heading':
        case 'url':
            require ModuleHelper::getLayoutPath('mod_menu', 'default_' . $item->type);
            break;

        default:
            require ModuleHelper::getLayoutPath('mod_menu', 'default_url');
            break;
    endswitch;

    // The next item is deeper.
    if ($item->deeper) {
        echo '<ul class="mod-menu__sub list-unstyled small dropdown-menu">';
    } elseif ($item->shallower) {
        // The next item is shallower.
        echo '</li>';
        echo str_repeat('</ul></li>', $item->level_diff);
    } else {
        // The next item is on the same level.
        echo '</li>';
    }
}
?></ul>


```
### default_component.php

The file `default_component.php` is beside the file `default_url.php` the most complicated one. The active menu must be completed with the class `activ` and classes for submenu items and menu items which contain submenus must be added.

The difference view looks like this:

```php {diff}

 if ($item->anchor_css) {
     $attributes['class'] = $item->anchor_css;
+} else {
+    $attributes['class'] = '';
+}
+
+if ($item->level > 1) {
+    $attributes['class'] .= 'dropdown-item';
+} else {
+    $attributes['class'] .= 'nav-link';
+}
+
+if ($item->parent) {
+    $attributes['class'] .= ' dropdown-toggle';
+    $attributes['data-bs-toggle'] = 'dropdown';
+    $attributes['role'] = 'button';
+    $attributes['aria-expanded'] = 'false';
+}
+
+if (in_array($item->id, $path)) {
+    $attributes['class'] .= ' active';
 }
 
 if ($item->anchor_rel) {


```

The complete file looks like this for me:

```php

defined('_JEXEC') or die;

use Joomla\CMS\Filter\OutputFilter;
use Joomla\CMS\HTML\HTMLHelper;

$attributes = array();

if ($item->anchor_title) {
    $attributes['title'] = $item->anchor_title;
}

if ($item->anchor_css) {
    $attributes['class'] = $item->anchor_css;
} else {
    $attributes['class'] = '';
}

if ($item->level > 1) {
    $attributes['class'] .= 'dropdown-item';
} else {
    $attributes['class'] .= 'nav-link';
}

if ($item->parent) {
    $attributes['class'] .= ' dropdown-toggle';
    $attributes['data-bs-toggle'] = 'dropdown';
    $attributes['role'] = 'button';
    $attributes['aria-expanded'] = 'false';
}

if (in_array($item->id, $path)) {
    $attributes['class'] .= ' active';
}

if ($item->anchor_rel) {
    $attributes['rel'] = $item->anchor_rel;
}

if ($item->id == $active_id) {
    $attributes['aria-current'] = 'location';

    if ($item->current) {
        $attributes['aria-current'] = 'page';
    }
}

$linktype = $item->title;

if ($item->menu_icon) {
    // The link is an icon
    if ($itemParams->get('menu_text', 1)) {
        // If the link text is to be displayed, the icon is added with aria-hidden
        $linktype = '<span class="p-2 ' . $item->menu_icon . '" aria-hidden="true"></span>' . $item->title;
    } else {
        // If the icon itself is the link, it needs a visually hidden text
        $linktype = '<span class="p-2 ' . $item->menu_icon . '" aria-hidden="true"></span><span class="visually-hidden">' . $item->title . '</span>';
    }
} elseif ($item->menu_image) {
    // The link is an image, maybe with its own class
    $image_attributes = [];

    if ($item->menu_image_css) {
        $image_attributes['class'] = $item->menu_image_css;
    }

    $linktype = HTMLHelper::_('image', $item->menu_image, $item->title, $image_attributes);

    if ($itemParams->get('menu_text', 1)) {
        $linktype .= '<span class="image-title">' . $item->title . '</span>';
    }
}

if ($item->browserNav == 1) {
    $attributes['target'] = '_blank';
} elseif ($item->browserNav == 2) {
    $options = 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes';

    $attributes['onclick'] = "window.open(this.href, 'targetWindow', '" . $options . "'); return false;";
}

echo HTMLHelper::_('link', OutputFilter::ampReplace(htmlspecialchars($item->flink, ENT_COMPAT, 'UTF-8', false)), $linktype, $attributes);

```

### default_heading.php

In the file `default_heading.php` only the last line is supplemented with the necessary classes.

The difference view looks like this:

```php {diff}

?>
-<span class="mod-menu__heading nav-header <?php echo $anchor_css; ?>"<?php echo $title; ?>><?php echo $linktype; ?></span>
+<a class="nav-link dropdown-toggle <?php echo $anchor_css; ?>" href="#" <?php echo $title; ?> role="button" data-bs-toggle="dropdown" aria-expanded="false"><?php echo $linktype; ?></a>

```

The complete file looks like this for me:

```php

defined('_JEXEC') or die;

use Joomla\CMS\HTML\HTMLHelper;

$title      = $item->anchor_title ? ' title="' . $item->anchor_title . '"' : '';
$anchor_css = $item->anchor_css ?: '';
$linktype   = $item->title;

if ($item->menu_icon) {
    // The link is an icon
    if ($itemParams->get('menu_text', 1)) {
        // If the link text is to be displayed, the icon is added with aria-hidden
        $linktype = '<span class="p-2 ' . $item->menu_icon . '" aria-hidden="true"></span>' . $item->title;
    } else {
        // If the icon itself is the link, it needs a visually hidden text
        $linktype = '<span class="p-2 ' . $item->menu_icon . '" aria-hidden="true"></span><span class="visually-hidden">' . $item->title . '</span>';
    }
} elseif ($item->menu_image) {
    // The link is an image, maybe with its own class
    $image_attributes = [];

    if ($item->menu_image_css) {
        $image_attributes['class'] = $item->menu_image_css;
    }

    $linktype = HTMLHelper::_('image', $item->menu_image, $item->title, $image_attributes);

    if ($itemParams->get('menu_text', 1)) {
        $linktype .= '<span class="image-title">' . $item->title . '</span>';
    }
}

?>
<a class="nav-link dropdown-toggle <?php echo $anchor_css; ?>" href="#" <?php echo $title; ?> role="button" data-bs-toggle="dropdown" aria-expanded="false"><?php echo $linktype; ?></a>

```

### default_separator.php

For the divider or separator, we don't need to change anything in the standard Joomla output. The complete file looks like this for me:

```php 
defined('_JEXEC') or die;

use Joomla\CMS\HTML\HTMLHelper;

$title = $item->anchor_title ? ' title="' . $item->anchor_title . '"' : '';
$anchor_css = $item->anchor_css ?: '';
$linktype = $item->title;

if ($item->menu_icon) {
    // The link is an icon
    if ($itemParams->get('menu_text', 1)) {
        // If the link text is to be displayed, the icon is added with aria-hidden
        $linktype = '<span class="p-2 ' . $item->menu_icon . '" aria-hidden="true"></span>' . $item->title;
    } else {
        // If the icon itself is the link, it needs a visually hidden text
        $linktype = '<span class="p-2 ' . $item->menu_icon . '" aria-hidden="true"></span><span class="visually-hidden">' . $item->title . '</span>';
    }
} elseif ($item->menu_image) {
    $image_attributes = [];

    if ($item->menu_image_css) {
        $image_attributes['class'] = $item->menu_image_css;
    }

    $linktype = HTMLHelper::_('image', $item->menu_image, $item->title, $image_attributes);

    if ($itemParams->get('menu_text', 1)) {
        $linktype .= '<span class="image-title">' . $item->title . '</span>';
    }
}

?>
<span class="mod-menu__separator separator <?php echo $anchor_css; ?>"<?php echo $title; ?>><?php echo $linktype; ?></span>

```

### default_url.php

The changes in the file `default_url.php` are similar to the changes in the file `default_component.php`. The active menu must be marked with the class `activ` and classes for submenu items and menu items containing submenus must be added.

The difference view looks like this:

```php {diff}

 }
 
 if ($item->anchor_css) {
    $attributes['class'] = $item->anchor_css;
+} else {
+    $attributes['class'] = '';
+}
+
+if ($item->level > 1) {
+    $attributes['class'] .= 'dropdown-item';
+} else {
+    $attributes['class'] .= 'nav-link';
+}
+
+if ($item->parent) {
+    $attributes['class'] .= ' dropdown-toggle';
+    $attributes['role'] = 'button';
+    $attributes['data-bs-toggle'] = 'dropdown';
+    $attributes['aria-expanded'] = 'false';
+}
+
+if (in_array($item->id, $path)) {
+    $attributes['class'] .= ' active';
 }
 
 if ($item->anchor_rel) {

```

The complete file looks like this for me:

```php
defined('_JEXEC') or die;

use Joomla\CMS\Filter\OutputFilter;
use Joomla\CMS\HTML\HTMLHelper;

$attributes = array();

if ($item->anchor_title) {
    $attributes['title'] = $item->anchor_title;
}

if ($item->anchor_css) {
    $attributes['class'] = $item->anchor_css;
} else {
    $attributes['class'] = '';
}

if ($item->level > 1) {
    $attributes['class'] .= 'dropdown-item';
} else {
    $attributes['class'] .= 'nav-link';
}

if ($item->parent) {
    $attributes['class'] .= ' dropdown-toggle';
    $attributes['role'] = 'button';
    $attributes['data-bs-toggle'] = 'dropdown';
    $attributes['aria-expanded'] = 'false';
}

if (in_array($item->id, $path)) {
    $attributes['class'] .= ' active';
}

if ($item->anchor_rel) {
    $attributes['rel'] = $item->anchor_rel;
}

$linktype = $item->title;

if ($item->menu_icon) {
    // The link is an icon
    if ($itemParams->get('menu_text', 1)) {
        // If the link text is to be displayed, the icon is added with aria-hidden
        $linktype = '<span class="p-2 ' . $item->menu_icon . '" aria-hidden="true"></span>' . $item->title;
    } else {
        // If the icon itself is the link, it needs a visually hidden text
        $linktype = '<span class="p-2 ' . $item->menu_icon . '" aria-hidden="true"></span><span class="visually-hidden">' . $item->title . '</span>';
    }
} elseif ($item->menu_image) {
    // The link is an image, maybe with an own class
    $image_attributes = [];

    if ($item->menu_image_css) {
        $image_attributes['class'] = $item->menu_image_css;
    }

    $linktype = HTMLHelper::_('image', $item->menu_image, $item->title, $image_attributes);

    if ($itemParams->get('menu_text', 1)) {
        $linktype .= '<span class="image-title">' . $item->title . '</span>';
    }
}

if ($item->browserNav == 1) {
    $attributes['target'] = '_blank';
    $attributes['rel'] = 'noopener noreferrer';

    if ($item->anchor_rel == 'nofollow') {
        $attributes['rel'] .= ' nofollow';
    }
} elseif ($item->browserNav == 2) {
    $options = 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,' . $params->get('window_open');

    $attributes['onclick'] = "window.open(this.href, 'targetWindow', '" . $options . "'); return false;";
}

echo HTMLHelper::_('link', OutputFilter::ampReplace(htmlspecialchars($item->flink, ENT_COMPAT, 'UTF-8', false)), $linktype, $attributes);

```

### CSS

Using `user.css` you can now style the menu according to Booststrap 5 templates, there are enough examples on the internet. 

## Activate override

Now it is enough to select the override in your module.

![Select override for the menu in the backend](/images/boot1.png)

In the frontend, you now have a Bootstrap 5 navbar that is. 

> If you want to add more functionality to it for keyboard editing or need more than two layers, continue with the part `A11y - an accessible menu for Cassiopeia or How do I make the navigation accessible with the keyboard?`[^blog.astrid-guenther.de/en/cassiopeia-how-to-make-navbar-keyboard-accessible].

<img src="https://vg05.met.vgwort.de/na/dd7f7942a21d4417a3caf66bcf42d2bd" width="1" height="1" alt="">

