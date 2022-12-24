---
description: 'desc'
set: 'eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-cassipeia-anwenden'
syndication: 
shortTitle: 'short'
date: 2022-03-28
title: 'Bootstrap 5 Navigation in Cassiopeia'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-how-to-make-navbar-bootstrap
langKey: de
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---










Cassiopia ist ein Bootstrap 5 Template. Aber die Navigation arbeitet mit MetisMenü. Wer mit Bootstrap vertraut ist und die Navigation anpassen möchte, stößt immer mal wieder auf Probleme.<!-- \index{Navigation} -->

Ich habe ein Override erstellt, welches die wesentlichen Bootstrap Klassen und Attribute ergänzt.

> Die Bootstrap Dokumentation findest du unter der Adresse [getbootstrap.com/docs/](https://getbootstrap.com/docs)[https://getbootstrap.com/docs/].

## Bootstrap einbinden

Als erstes kopierte ich die minimierten Bootstrap 5 Dateien[^getbootstrap.com/] und lege diese im Verzeichnis `media/templates/site/MeinTemplate/js/bootstrap.bundle.min.js`, beziehungsweise `media/templates/site/MeinTemplate/css/bootstrap.bundle.min.css` ab.

Aber das war überhaupt nicht nötig. Man muss nichts herunterladen, denn Bootstrap ist bereits in `media/vendor/joomla.asset.json` registriert. Cassiopeia lädt nicht alle Teile. Es verwendet eine andere Navigation und braucht Bootstrap nicht zum Ein- und Ausklappen. Aber in Joomla ist alles vorhanden und kann leicht geladen werden.<!-- \index{Bootstrap!Einbinden} -->

## Override erstellen über das Backend

Erstelle im Backend ein Override für mod_menu. Das nachfolgende Bild zeigt dir, wo du diese Möglichkeit im Administrationsbereich findest.

![Override für das Menü im Backend anlegen](/images/boot2a.png)

Das Override besteht aus mehreren Dateien, die du im Tabulator Editor findes und bearbeiten kannst.

![Dateien im Templatemanager bearbeiten](/images/boot2.png)

Die sind die Hauptdateien

- default.php enthält die westentlichen Aufrufe
- collapse-default.php erweitert die Datei `default.php` so, dass sie auf engen Bildschirmen zum eingeklappten Hamburger Menü wird.

Die Layouts für die speziellen Menütypen

- default_component.php
- default_url.php, 
- default_separator.php und 
- default_heading.php. 


### collapse-default.php
    
Die Datei `collapse-default.php`, die dafür sorgt, dass das Menü auch auf engen Bildschirmen bedienbar ist, müssen wir nicht ändern. Der nachfolgende Codeschnipsel zeigt dir die vollständige Datei.

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

In der Datei `default.php` habe ich die Aufrufe für das Metis Menu JavaScript gelöscht, da die Funktionalität nun von Bootstrap übernommen wird. An dessen Stelle habe ich das zuvor heruntergeladene Bootstrap via HTMLHelper eingebunden. Last but not least habe ich die notwendigen Klassen hinzugefügt.

Die Differenzansicht sieht nun so aus:

```php {diff}
 defined('_JEXEC') or die;
 
 use Joomla\CMS\Helper\ModuleHelper;
+use Joomla\CMS\HTML\HTMLHelper;
 
-/** @var Joomla\CMS\WebAsset\WebAssetManager $wa */
-$wa->registerAndUseScript('mod_menu', 'mod_menu/menu.min.js', [], ['type' => 'module']);
-$wa->registerAndUseScript('mod_menu', 'mod_menu/menu-es5.min.js', [], ['nomodule' => true, 'defer' => true]);
+$wa->useScript('bootstrap.dropdown');
+$wa->useScript('bootstrap.collapse');

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

Die vollständige Datei sieht bei mir wie folgt aus:

```php

defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;
use Joomla\CMS\HTML\HTMLHelper;

/** @var Joomla\CMS\WebAsset\WebAssetManager $wa */
$wa = $app->getDocument()->getWebAssetManager();

$wa->useScript('bootstrap.dropdown');
$wa->useScript('bootstrap.collapse');

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

Die Datei `default_component.php` ist neben der Datei `default_url.php` die komplizierteste. Das aktive Menü muss mit der Klasse `activ` versehen werden und Klassen für Untermenüpunkte und Menüpunkte, die Untermenüs enthalten, müssen hinzugefügt werden.

Die Differenzansicht sieht so aus:

```php {diff}

 if ($item->anchor_css) {
     $attributes['class'] = $item->anchor_css;
+} else {
+    $attributes['class'] = '';
+}
+
+if ($item->level > 1) {
+    $attributes['class'] .= ' dropdown-item';
+} else {
+    $attributes['class'] .= ' nav-link';
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

Die vollständige Datei sieht bei mir wie folgt aus:

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
    $attributes['class'] .= ' dropdown-item';
} else {
    $attributes['class'] .= ' nav-link';
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

In der Datei `default_heading.php` wird nur die letzte Zeile um die notwendigen Klassen ergänzt.

Die Differenzansicht sieht wie folgt aus:

```php {diff}

?>
-<span class="mod-menu__heading nav-header <?php echo $anchor_css; ?>"<?php echo $title; ?>><?php echo $linktype; ?></span>
+<a class="nav-link dropdown-toggle <?php echo $anchor_css; ?>" href="#" <?php echo $title; ?> role="button" data-bs-toggle="dropdown" aria-expanded="false"><?php echo $linktype; ?></a>

```

Die vollständige Datei sieht bei mir wie folgt aus:

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

Für den Divider oder Separator müssen wir an der Standardausgabe von Joomla nichts ändern. Die vollständige Datei sieht bei mir wie folgt aus:

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

Die Änderungen in der Datei `default_url.php` sind ähnlich wie in der Datei `default_component.php`. Das aktive Menü muss mit der Klasse `activ` markiert werden und Klassen für Untermenüpunkte und Menüpunkte, welche Untermenüs enthalten, müssen ergänzt werden.

Die Differenzansicht sieht wie folgt aus:

```php {diff}

 }
 
 if ($item->anchor_css) {
    $attributes['class'] = $item->anchor_css;
+} else {
+    $attributes['class'] = '';
+}
+
+if ($item->level > 1) {
+    $attributes['class'] .= ' dropdown-item';
+} else {
+    $attributes['class'] .= ' nav-link';
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

Die vollständige Datei sieht bei mir wie folgt aus:

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
    $attributes['class'] .= ' dropdown-item';
} else {
    $attributes['class'] .= ' nav-link';
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

Per `user.css` kannst du nun nach Booststrap 5 Vorlagen das Menü stylen, im Internet gib es genug Beispiele. 

## Override aktivieren

Nun reicht es aus, in deinem Modul das Override auszuwählen.

![Override für das Menü im Backend auswählen](/images/boot1.png)

Im Frontend verfügst du nun über eine Bootstrap 5 Navbar, die zugänglich ist. Falls du diese mit weiteren Funktionen für die Bearbeitung mit der Tastatur ausstatten möchtest oder mehr als zwei Ebenen benötigst, machte mit dem Teil ` A11y - ein zugängliches Menü für Cassiopeia oder Wie erreiche ich es, dass die Navigation mit der Tastatur bedienbar ist?` weiter.

<img src="https://vg09.met.vgwort.de/na/533c135aa79a4eaeb45b864e5d56c9cc" width="1" height="1" alt="">
