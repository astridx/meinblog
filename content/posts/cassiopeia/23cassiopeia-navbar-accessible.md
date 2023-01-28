---
description: 'desc'
set: 'eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-cassipeia-anwenden'
syndication: 
shortTitle: 'short'
date: 2022-03-29
title: 'A11y - ein zugängliches Menü für Cassiopeia'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-how-to-make-navbar-keyboard-accessible
langKey: de
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
  - A11y
---









Wie implementiert man die Tastaturnavigation in der Navbar, so dass beispielsweise die linke und rechte Pfeiltasten das vorherige, beziehungsweise nächste Dropdown-Menü öffnen, und ein Klick auf einen Buchstaben den dazugehörigen Menüpunkt aktiviert.<!-- \index{Barrierefreiheit} --><!-- \index{Zugänglichkeit} --><!-- \index{Accessibility} --><!-- \index{a11y} --> 

Die gute Nachricht, es ist nicht erforderlich, dies selbst zu implementieren. Es gibt bereits eine JavaScript Bibliothek[^github.com/NickDJM/accessible-menu], die dies umsetzt. Weil Cassiopeia ein Bootstrap 5 Template ist, wähle ich die Variante, die speziell für Bootstrap 5[^github.com/NickDJM/accessible-menu-bootstrap-5] erstellt wurde.

Die unterstützten Menütypen sind:

- [Navigation Menu Disclosure](https://www.w3.org/TR/wai-aria-practices-1.2/examples/disclosure/disclosure-navigation.html)[^w3.org/TR/wai-aria-practices-1.2/examples/disclosure/disclosure-navigation.html]
- [Navigation Menubar](https://www.w3.org/TR/wai-aria-practices-1.2/examples/menubar/menubar-navigation.html)[^w3.org/TR/wai-aria-practices-1.2/examples/menubar/menubar-navigation.html], and
- [Navigation Treeview](https://www.w3.org/TR/wai-aria-practices-1.2/examples/treeview/treeview-navigation.html)[^w3.org/TR/wai-aria-practices-1.2/examples/treeview/treeview-navigation.html]


Ein Cassiopeia Override, mit dem du WCAG-gerechte Menüs im DOM erzeugst, zeigt das nachfolgende Beispiel.

## PHP Override

Erstelle im Verzeichnis `/templates/DEINTEMPLATE/html/mod_menu/` die Datei `accessiblemenu.php`. 

> Hast du noch nie ein Override für ein Menü erstellt? Genauere Informationen findest du in dem Teil, der eine Bootstrap Navigation in Cassiopeia beschreibt[^blog.astrid-guenther.de/cassiopeia-how-to-make-navbar-bootstrap].

```php
<?php
defined('_JEXEC') or die;

use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Helper\ModuleHelper;
use Joomla\CMS\Filter\OutputFilter;

HTMLHelper::_('bootstrap.collapse');
?>

<nav class="navbar navbar-expand-md" aria-label="<?php echo htmlspecialchars($module->title, ENT_QUOTES, 'UTF-8'); ?>">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbar<?php echo $module->id; ?>" aria-controls="navbar<?php echo $module->id; ?>"
        aria-expanded="false" aria-label="<?php echo Text::_('MOD_MENU_TOGGLE'); ?>">
        <span class="icon-menu" aria-hidden="true"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbar<?php echo $module->id; ?>">

        <?php
            if ($tagId = $params->get('tag_id', '')) {
                $id = $tagId;
            } else {
                $id = 'accessiblemenu' .  $module->id;
            }

            $app->getDocument()->addScriptOptions('accessibleMenuID', $id);
        ?>

        <ul id="<?php echo $id; ?>" class="mod-menu nav navbar-nav <?php echo $class_sfx; ?>">
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
                    echo 'separator not ready yet';
                    break;
                case 'component':
                    $attributes['class'] = '';

                    if ($item->anchor_title) {
                        $attributes['title'] = $item->anchor_title;
                    } else {
                        $attributes['class'] = '';
                    }
                    
                    if ($item->anchor_css) {
                        $attributes['class'] .= $item->anchor_css;
                    }
                    
                    if ($item->level > 1) {
                        $attributes['class'] = 'dropdown-item';
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
                    break;

                case 'heading':
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
                    
                    echo '<a class="nav-link dropdown-toggle ' . $anchor_css. '" href="#" ' . $title. ' role="button" data-bs-toggle="dropdown" aria-expanded="false">' . $linktype. '</a>';
                    break;
        
                default:
                    $attributes = array();
                    
                    if ($item->anchor_title) {
                        $attributes['title'] = $item->anchor_title;
                    } else {
                        $attributes['class'] = '';
                    }
                    
                    if ($item->anchor_css) {
                        $attributes['class'] .= $item->anchor_css;
                    }
                    
                    if ($item->level > 1) {
                        $attributes['class'] = 'dropdown-item';
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
    </div>
</nav>
```

Beachte die Zeile `$app->getDocument()->addScriptOptions('accessibleMenuID', $id);`. Diese ist dafür verantwortlich, den Namen der ID der Navigation an die JavaScript-Datei weiterzugeben. Im nächsten Abschnitt erfährst du, wie wir darauf zugreifen.

## 2. JavaScript Datei

Ich habe den Code zur Datei `https://github.com/NickDJM/accessible-menu-bootstrap-5/blob/1.x/dist/accessible-menu-bs5.js` in die JavaScript Datei meines Templates kopiert. Die JavaScript-Datei rufe ich genauso auf, wie Cassipeia es implementiert. Folglich liegt die Datei im Verzeichnis `/media/templates/site/MEINTEMPLATE/js/template.js`. 

> Die vorgenannte Lösung ist einfach und hat den Vorteil, dass keine zusätzliche JavaScript Datei geladen wird. Nachteilig ist, dass der Code immer geladen wird. Beachte dies, falls du ein anderes Menü integrierst und in diesem die neue Funktion nicht wünschst.

Der ursprüngliche Inhalt der JavaScript-Datei ist der Folgende:

`
```js
Joomla = window.Joomla || {};

(function(Joomla, document) {
  'use strict';

  function initTemplate(event) {
    var target = event && event.target ? event.target : document;

    /**
     * Prevent clicks on buttons within a disabled fieldset
     */
    var fieldsets = target.querySelectorAll('fieldset.btn-group');
    for (var i = 0; i < fieldsets.length; i++) {
      var self = fieldsets[i];
      if (self.getAttribute('disabled') ===  true) {
        self.style.pointerEvents = 'none';
        var btns = self.querySelectorAll('.btn');
        for (var ib = 0; ib < btns.length; ib++) {
          btns[ib].classList.add('disabled');
        }
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function (event) {
    initTemplate(event);

    /**
     * Back to top
     */
    var backToTop = document.getElementById('back-top');

    if (backToTop) {

      function checkScrollPos() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible')
        }
      }

      checkScrollPos();

      window.onscroll = function() {
        checkScrollPos();
      };

      backToTop.addEventListener('click', function(event) {
        event.preventDefault();
        window.scrollTo(0, 0);
      });
    }

    [].slice.call(document.head.querySelectorAll('link[rel="lazy-stylesheet"]'))
      .forEach(function($link){
        $link.rel = "stylesheet";
      });
  });

  /**
   * Initialize when a part of the page was updated
   */
  document.addEventListener('joomla:updated', initTemplate);

})(Joomla, document);

```

Der nächste Codeschnipsel zeigt dir, wo ich meine Ergänzungen eingefügt habe.

```js
Joomla = window.Joomla || {};

(function(Joomla, document) {
  'use strict';

  function initTemplate(event) {
    var target = event && event.target ? event.target : document;

    /**
     * Prevent clicks on buttons within a disabled fieldset
     */
    var fieldsets = target.querySelectorAll('fieldset.btn-group');
    for (var i = 0; i < fieldsets.length; i++) {
      var self = fieldsets[i];
      if (self.getAttribute('disabled') ===  true) {
        self.style.pointerEvents = 'none';
        var btns = self.querySelectorAll('.btn');
        for (var ib = 0; ib < btns.length; ib++) {
          btns[ib].classList.add('disabled');
        }
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function (event) {
    initTemplate(event);

    /**
     * Back to top
     */
    var backToTop = document.getElementById('back-top');

    if (backToTop) {

      function checkScrollPos() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible')
        }
      }

      checkScrollPos();

      window.onscroll = function() {
        checkScrollPos();
      };

      backToTop.addEventListener('click', function(event) {
        event.preventDefault();
        window.scrollTo(0, 0);
      });
    }

    [].slice.call(document.head.querySelectorAll('link[rel="lazy-stylesheet"]'))
      .forEach(function($link){
        $link.rel = "stylesheet";
      });
  });

  /**
   * Initialize when a part of the page was updated
   */
  document.addEventListener('joomla:updated', initTemplate);




  // Inhalt der Datei 
  // https://github.com/NickDJM/accessible-menu-bootstrap-5/blob/1.x/dist/accessible-menu-bs5.js
  // hier hinein kopieren und nachfolgend Code einfügen.

    const menuid = Joomla.getOptions("accessibleMenuID");

    const menu = new AccessibleMenuBootstrap5.Bootstrap5DisclosureMenu({
      menuElement: document.querySelector('#' + menuid),
    });


})(Joomla, document);

```

Beachte die Zeile `const menuid = Joomla.getOptions("accessibleMenuID");`. Mit dieser lädst du die zuvor in der PHP-Datei übergebene Variable in den JavaScript Bereich.

Wenn du es vorziehst, `Treeview` oder `Menubar` anstelle des `DisclosureMenu` zu verwenden, ersetze den Aufruf einfach durch einen der folgenden Codeschnipsel.

```
const menu = new AccessibleMenuBootstrap5.Bootstrap5Treeview({
  menuElement: document.querySelector('#' + menuid),
});
```
```
menu = new AccessibleMenuBootstrap5.Bootstrap5Menubar({
  menuElement: document.querySelector('#' + menuid),
});
```

## Menü im Backend auswählen

![Override für das Menü im Backend auswählen](/images/accessiblemenu1.png)
<img src="https://vg04.met.vgwort.de/na/d84fc25b84a942b3b77b8a1e06095c96" width="1" height="1" alt="">
