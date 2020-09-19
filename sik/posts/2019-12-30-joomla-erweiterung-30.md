---
date: 2019-12-30
title: 'Joomla 4: Erweiterung erstellen - Teil 30 - Frontend Editing'
template: post
thumbnail: '../thumbnails/joomlatut.png'
slug: joomla-erweiterung-30
categories:
  - Entwicklung
tags:
  - Tutorial
  - Joomla
---

Es gibt mehrere Gründe dafür, einem Anwender das Editieren im Frontend zu ermöglichen. Zum einen finden Nutzer das benutzerfreundlicher. Oder, einem Administrator ist es wichtig, den Zugriff auf den Administrationsbereich nicht freigeben. Deshalb statten wir unsere Komponente im nächsten Schritt mit der Möglichkeit aus, Items im Frontend zu bearbeiten.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t24b...t25) an und übernimm diese Änderungen in deine Entwicklungsversion.

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla! aktualisiert bei der Installation die Namespaces für dich. Da eine neue Datei hinzugekommen ist, ist dies erforderlich.

2. Erstelle einen Menüpunkt

![Joomla! Frontend Bearbeitung](../images/j4x30x1.png)

3. Öffne den Menüpunkt im Frontend

![Joomla! Frontend Bearbeitung](../images/j4x30x2.png)

4. Stelle sicher, dass du das Icon zum Editieren bei der Detailanszeige eines Elements siehst.

![Joomla! Frontend Bearbeitung](../images/j4x30x3.png)

## Geänderte Dateien

### Übersicht

<div id="diff">
      <div class="d2h-file-list-wrapper">
    <div class="d2h-file-list-header">
        <span class="d2h-file-list-title">Files changed (13)</span>
        <a class="d2h-file-switch d2h-hide">hide</a>
        <a class="d2h-file-switch d2h-show">show</a>
    </div>
    <ol class="d2h-file-list">
    <li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-changed" height="16" title="modified" version="1.1"
           viewBox="0 0 14 16" width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path>
      </svg>      <a href="#d2h-640935" class="d2h-file-name">src/administrator/components/com_foos/src/Extension/FoosComponent.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+3</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-added" height="16" title="added" version="1.1" viewBox="0 0 14 16"
           width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>
      </svg>      <a href="#d2h-652010" class="d2h-file-name">src/administrator/components/com_foos/src/Service/HTML/Icon.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+198</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-added" height="16" title="added" version="1.1" viewBox="0 0 14 16"
           width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>
      </svg>      <a href="#d2h-296359" class="d2h-file-name">src/components/com_foos/forms/foo.xml</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+23</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-added" height="16" title="added" version="1.1" viewBox="0 0 14 16"
           width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>
      </svg>      <a href="#d2h-263171" class="d2h-file-name">src/components/com_foos/forms/form.xml</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+30</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-changed" height="16" title="modified" version="1.1"
           viewBox="0 0 14 16" width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path>
      </svg>      <a href="#d2h-023382" class="d2h-file-name">src/components/com_foos/src/Controller/DisplayController.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+6</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-added" height="16" title="added" version="1.1" viewBox="0 0 14 16"
           width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>
      </svg>      <a href="#d2h-020698" class="d2h-file-name">src/components/com_foos/src/Controller/FooController.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+207</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-added" height="16" title="added" version="1.1" viewBox="0 0 14 16"
           width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>
      </svg>      <a href="#d2h-815167" class="d2h-file-name">src/components/com_foos/src/Helper/RouteHelper.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+94</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-added" height="16" title="added" version="1.1" viewBox="0 0 14 16"
           width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>
      </svg>      <a href="#d2h-546680" class="d2h-file-name">src/components/com_foos/src/Model/FormModel.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+224</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-added" height="16" title="added" version="1.1" viewBox="0 0 14 16"
           width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>
      </svg>      <a href="#d2h-361070" class="d2h-file-name">src/components/com_foos/src/Service/Router.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+268</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-added" height="16" title="added" version="1.1" viewBox="0 0 14 16"
           width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>
      </svg>      <a href="#d2h-766940" class="d2h-file-name">src/components/com_foos/src/View/Form/HtmlView.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+177</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-changed" height="16" title="modified" version="1.1"
           viewBox="0 0 14 16" width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path>
      </svg>      <a href="#d2h-336930" class="d2h-file-name">src/components/com_foos/tmpl/foo/default.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+23</span>
          <span class="d2h-lines-deleted">-1</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-added" height="16" title="added" version="1.1" viewBox="0 0 14 16"
           width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>
      </svg>      <a href="#d2h-580763" class="d2h-file-name">src/components/com_foos/tmpl/form/edit.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+66</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-added" height="16" title="added" version="1.1" viewBox="0 0 14 16"
           width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>
      </svg>      <a href="#d2h-588602" class="d2h-file-name">src/components/com_foos/tmpl/form/edit.xml</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+14</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
    </ol>
</div><div class="d2h-wrapper">
    <div id="d2h-640935" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/administrator/components/com_foos/src/Extension/FoosComponent.php</span>
    <span class="d2h-tag d2h-changed d2h-changed-tag">CHANGED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -11,6 +11,7 @@ namespace FooNamespace\Component\Foos\Administrator\Extension;</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">11</div>
<div class="line-num2">11</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">12</div>
<div class="line-num2">12</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">defined(&#x27;JPATH_PLATFORM&#x27;) or die;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">13</div>
<div class="line-num2">13</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">14</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Application\SiteApplication;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">14</div>
<div class="line-num2">15</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Association\AssociationServiceInterface;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">15</div>
<div class="line-num2">16</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Association\AssociationServiceTrait;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">16</div>
<div class="line-num2">17</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Categories\CategoryServiceInterface;</span>
        </div>
    </td>
</tr>
<tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -19,6 +20,7 @@ use Joomla\CMS\Extension\BootableExtensionInterface;</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">19</div>
<div class="line-num2">20</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Extension\MVCComponent;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">20</div>
<div class="line-num2">21</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\HTML\HTMLRegistryAwareTrait;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">21</div>
<div class="line-num2">22</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">use FooNamespace\Component\Foos\Administrator\Service\HTML\AdministratorService;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">23</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use FooNamespace\Component\Foos\Administrator\Service\HTML\Icon;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">22</div>
<div class="line-num2">24</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">use Psr\Container\ContainerInterface;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">23</div>
<div class="line-num2">25</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Helper\ContentHelper;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">24</div>
<div class="line-num2">26</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr>
<tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -50,6 +52,7 @@ implements BootableExtensionInterface, CategoryServiceInterface, AssociationServ</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">50</div>
<div class="line-num2">52</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	public function boot(ContainerInterface $container)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">51</div>
<div class="line-num2">53</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">52</div>
<div class="line-num2">54</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		$this-&gt;getRegistry()-&gt;register(&#x27;foosadministrator&#x27;, new AdministratorService);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">55</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;getRegistry()-&gt;register(&#x27;fooicon&#x27;, new Icon($container-&gt;get(SiteApplication::class)));</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">53</div>
<div class="line-num2">56</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">54</div>
<div class="line-num2">57</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">55</div>
<div class="line-num2">58</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-652010" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/administrator/components/com_foos/src/Service/HTML/Icon.php</span>
    <span class="d2h-tag d2h-added d2h-added-tag">ADDED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -0,0 +1,198 @@</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">1</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&lt;?php</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">2</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">3</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @package     Joomla.Site</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">4</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @subpackage  com_foos</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">5</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">6</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">7</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @license     GNU General Public License version 2 or later; see LICENSE.txt</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">8</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">9</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">10</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">namespace FooNamespace\Component\Foos\Administrator\Service\HTML;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">11</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">12</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">defined(&#x27;_JEXEC&#x27;) or die;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">13</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">14</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Application\CMSApplication;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">15</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Factory;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">16</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\HTML\HTMLHelper;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">17</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Language\Text;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">18</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Layout\LayoutHelper;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">19</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Router\Route;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">20</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Uri\Uri;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">21</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use FooNamespace\Component\Foos\Site\Helper\RouteHelper;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">22</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\Registry\Registry;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">23</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">24</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">25</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * Content Component HTML Helper</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">26</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">27</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @since  __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">28</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">29</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">class Icon</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">30</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">31</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">32</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * The application</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">33</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">34</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @var    CMSApplication</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">35</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">36</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since  __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">37</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">38</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	private $application;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">39</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">40</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">41</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Service constructor</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">42</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">43</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   CMSApplication  $application  The application</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">44</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">45</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since   __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">46</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">47</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public function __construct(CMSApplication $application)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">48</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">49</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;application = $application;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">50</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">51</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">52</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">53</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Method to generate a link to the create item page for the given category</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">54</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">55</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   object    $category  The category information</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">56</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   Registry  $params    The item parameters</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">57</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   array     $attribs   Optional attributes for the link</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">58</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">59</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  string  The HTML markup for the create item link</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">60</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">61</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since  __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">62</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">63</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public static function create($category, $params, $attribs = array())</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">64</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">65</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$uri = Uri::getInstance();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">66</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">67</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$url = &#x27;index.php?option=com_foos&amp;task=foo.add&amp;return=&#x27; . base64_encode($uri) . &#x27;&amp;id=0&amp;catid=&#x27; . $category-&gt;id;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">68</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">69</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$text = LayoutHelper::render(&#x27;joomla.content.icons.create&#x27;, array(&#x27;params&#x27; =&gt; $params, &#x27;legacy&#x27; =&gt; false));</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">70</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">71</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Add the button classes to the attribs array</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">72</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if (isset($attribs[&#x27;class&#x27;]))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">73</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">74</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$attribs[&#x27;class&#x27;] .= &#x27; btn btn-primary&#x27;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">75</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">76</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		else</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">77</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">78</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$attribs[&#x27;class&#x27;] = &#x27;btn btn-primary&#x27;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">79</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">80</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">81</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$button = HTMLHelper::_(&#x27;link&#x27;, Route::_($url), $text, $attribs);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">82</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">83</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$output = &#x27;&lt;span class=&quot;hasTooltip&quot; title=&quot;&#x27; . HTMLHelper::_(&#x27;tooltipText&#x27;, &#x27;COM_FOOS_CREATE_FOO&#x27;) . &#x27;&quot;&gt;&#x27; . $button . &#x27;&lt;&#x2F;span&gt;&#x27;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">84</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">85</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return $output;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">86</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">87</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">88</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">89</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Display an edit icon for the foo.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">90</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">91</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * This icon will not display in a popup window, nor if the foo is trashed.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">92</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Edit access checks must be performed in the calling code.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">93</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">94</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   object    $foo  The foo information</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">95</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   Registry  $params   The item parameters</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">96</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   array     $attribs  Optional attributes for the link</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">97</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   boolean   $legacy   True to use legacy images, false to use icomoon based graphic</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">98</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">99</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  string   The HTML for the foo edit icon.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">100</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">101</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since   __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">102</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">103</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public static function edit($foo, $params, $attribs = array(), $legacy = false)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">104</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">105</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$user = Factory::getUser();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">106</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$uri  = Uri::getInstance();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">107</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">108</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Ignore if in a popup window.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">109</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if ($params &amp;&amp; $params-&gt;get(&#x27;popup&#x27;))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">110</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">111</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			return &#x27;&#x27;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">112</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">113</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">114</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Ignore if the state is negative (trashed).</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">115</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if ($foo-&gt;published &lt; 0)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">116</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">117</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			return &#x27;&#x27;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">118</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">119</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">120</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Set the link class</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">121</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$attribs[&#x27;class&#x27;] = &#x27;dropdown-item&#x27;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">122</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">123</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Show checked_out icon if the foo is checked out by a different user</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">124</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if (property_exists($foo, &#x27;checked_out&#x27;)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">125</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&amp;&amp; property_exists($foo, &#x27;checked_out_time&#x27;)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">126</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&amp;&amp; $foo-&gt;checked_out &gt; 0</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">127</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&amp;&amp; $foo-&gt;checked_out != $user-&gt;get(&#x27;id&#x27;))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">128</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">129</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$checkoutUser = Factory::getUser($foo-&gt;checked_out);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">130</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$date         = HTMLHelper::_(&#x27;date&#x27;, $foo-&gt;checked_out_time);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">131</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$tooltip      = Text::_(&#x27;JLIB_HTML_CHECKED_OUT&#x27;) . &#x27; :: &#x27; . Text::sprintf(&#x27;COM_FOOS_CHECKED_OUT_BY&#x27;, $checkoutUser-&gt;name)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">132</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				. &#x27; &lt;br &#x2F;&gt; &#x27; . $date;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">133</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">134</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$text = LayoutHelper::render(&#x27;joomla.content.icons.edit_lock&#x27;, array(&#x27;tooltip&#x27; =&gt; $tooltip, &#x27;legacy&#x27; =&gt; $legacy));</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">135</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">136</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$output = HTMLHelper::_(&#x27;link&#x27;, &#x27;#&#x27;, $text, $attribs);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">137</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">138</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			return $output;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">139</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">140</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">141</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if (!isset($foo-&gt;slug))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">142</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">143</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$foo-&gt;slug = &quot;&quot;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">144</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">145</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">146</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$fooUrl = RouteHelper::getFooRoute($foo-&gt;slug, $foo-&gt;catid, $foo-&gt;language);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">147</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$url        = $fooUrl . &#x27;&amp;task=foo.edit&amp;id=&#x27; . $foo-&gt;id . &#x27;&amp;return=&#x27; . base64_encode($uri);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">148</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">149</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if ($foo-&gt;published == 0)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">150</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">151</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$overlib = Text::_(&#x27;JUNPUBLISHED&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">152</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">153</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		else</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">154</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">155</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$overlib = Text::_(&#x27;JPUBLISHED&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">156</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">157</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">158</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if (!isset($foo-&gt;created))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">159</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">160</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$date = HTMLHelper::_(&#x27;date&#x27;, &#x27;now&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">161</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">162</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		else</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">163</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">164</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$date = HTMLHelper::_(&#x27;date&#x27;, $foo-&gt;created);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">165</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">166</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">167</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if (!isset($created_by_alias) &amp;&amp; !isset($foo-&gt;created_by))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">168</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">169</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$author = &#x27;&#x27;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">170</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">171</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		else</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">172</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">173</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$author = $foo-&gt;created_by_alias ?: Factory::getUser($foo-&gt;created_by)-&gt;name;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">174</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">175</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">176</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$overlib .= &#x27;&amp;lt;br &#x2F;&amp;gt;&#x27;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">177</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$overlib .= $date;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">178</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$overlib .= &#x27;&amp;lt;br &#x2F;&amp;gt;&#x27;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">179</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$overlib .= Text::sprintf(&#x27;COM_FOOS_WRITTEN_BY&#x27;, htmlspecialchars($author, ENT_COMPAT, &#x27;UTF-8&#x27;));</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">180</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">181</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$icon = $foo-&gt;published ? &#x27;edit&#x27; : &#x27;eye-slash&#x27;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">182</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">183</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if (strtotime($foo-&gt;publish_up) &gt; strtotime(Factory::getDate())</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">184</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			|| ((strtotime($foo-&gt;publish_down) &lt; strtotime(Factory::getDate())) &amp;&amp; $foo-&gt;publish_down != Factory::getDbo()-&gt;getNullDate()))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">185</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">186</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$icon = &#x27;eye-slash&#x27;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">187</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">188</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">189</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$text = &#x27;&lt;span class=&quot;hasTooltip fa fa-&#x27; . $icon . &#x27;&quot; title=&quot;&#x27;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">190</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			. HTMLHelper::tooltipText(Text::_(&#x27;COM_FOOS_EDIT_CONTACT&#x27;), $overlib, 0, 0) . &#x27;&quot;&gt;&lt;&#x2F;span&gt; &#x27;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">191</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$text .= Text::_(&#x27;JGLOBAL_EDIT&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">192</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">193</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$attribs[&#x27;title&#x27;] = Text::_(&#x27;COM_FOOS_EDIT_CONTACT&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">194</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$output           = HTMLHelper::_(&#x27;link&#x27;, Route::_($url), $text, $attribs);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">195</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">196</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return $output;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">197</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">198</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">}</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-296359" class="d2h-file-wrapper" data-lang="xml">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/components/com_foos/forms/foo.xml</span>
    <span class="d2h-tag d2h-added d2h-added-tag">ADDED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -0,0 +1,23 @@</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">1</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">2</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&lt;form&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">3</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&lt;fieldset </span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">4</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		name=&quot;foo&quot; </span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">5</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		label=&quot;COM_FOOS_FOO_DEFAULT_LABEL&quot;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">6</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&lt;field</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">7</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			name=&quot;spacer&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">8</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			type=&quot;spacer&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">9</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			label=&quot;COM_FOOS_FOO_REQUIRED&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">10</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			class=&quot;text&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">11</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">12</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">13</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&lt;field</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">14</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			name=&quot;name&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">15</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			type=&quot;text&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">16</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			label=&quot;COM_FOOS_FOO_NAME_LABEL&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">17</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			id=&quot;foo-name&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">18</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			size=&quot;30&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">19</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			filter=&quot;string&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">20</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			required=&quot;true&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">21</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">22</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&lt;&#x2F;fieldset&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">23</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&lt;&#x2F;form&gt;</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-263171" class="d2h-file-wrapper" data-lang="xml">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/components/com_foos/forms/form.xml</span>
    <span class="d2h-tag d2h-added d2h-added-tag">ADDED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -0,0 +1,30 @@</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">1</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">2</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&lt;form&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">3</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&lt;fieldset&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">4</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&lt;field</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">5</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			name=&quot;id&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">6</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			type=&quot;number&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">7</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			label=&quot;JGLOBAL_FIELD_ID_LABEL&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">8</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			default=&quot;0&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">9</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			class=&quot;readonly&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">10</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			size=&quot;10&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">11</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			readonly=&quot;true&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">12</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">13</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">14</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&lt;field</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">15</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			name=&quot;name&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">16</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			type=&quot;text&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">17</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			label=&quot;COM_FOOS_FIELD_NAME_LABEL&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">18</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			size=&quot;40&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">19</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			required=&quot;true&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">20</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">21</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">22</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&lt;field</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">23</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			name=&quot;alias&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">24</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			type=&quot;text&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">25</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			label=&quot;JFIELD_ALIAS_LABEL&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">26</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			size=&quot;45&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">27</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			hint=&quot;JFIELD_ALIAS_PLACEHOLDER&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">28</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">29</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&lt;&#x2F;fieldset&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">30</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&lt;&#x2F;form&gt;</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-023382" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/components/com_foos/src/Controller/DisplayController.php</span>
    <span class="d2h-tag d2h-changed d2h-changed-tag">CHANGED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -13,6 +13,7 @@ defined('_JEXEC') or die;</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">13</div>
<div class="line-num2">13</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">14</div>
<div class="line-num2">14</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\MVC\Controller\BaseController;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">15</div>
<div class="line-num2">15</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\MVC\Factory\MVCFactoryInterface;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">16</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Factory;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">16</div>
<div class="line-num2">17</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">17</div>
<div class="line-num2">18</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">18</div>
<div class="line-num2">19</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn"> * Foos Component Controller</span>
        </div>
    </td>
</tr>
<tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -52,6 +53,11 @@ class DisplayController extends BaseController</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">52</div>
<div class="line-num2">53</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">53</div>
<div class="line-num2">54</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		parent::display($cachable);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">54</div>
<div class="line-num2">55</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">56</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if (Factory::getUser()-&gt;get(&#x27;id&#x27;))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">57</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">58</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$cachable = false;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">59</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">60</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">55</div>
<div class="line-num2">61</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		return $this;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">56</div>
<div class="line-num2">62</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">57</div>
<div class="line-num2">63</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">}</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-020698" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/components/com_foos/src/Controller/FooController.php</span>
    <span class="d2h-tag d2h-added d2h-added-tag">ADDED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -0,0 +1,207 @@</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">1</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&lt;?php</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">2</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">3</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @package     Joomla.Site</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">4</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @subpackage  com_foos</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">5</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">6</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">7</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @license     GNU General Public License version 2 or later; see LICENSE.txt</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">8</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">9</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">10</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">namespace FooNamespace\Component\Foos\Site\Controller;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">11</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">12</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">defined(&#x27;_JEXEC&#x27;) or die;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">13</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">14</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Factory;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">15</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\MVC\Controller\FormController;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">16</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Router\Route;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">17</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Uri\Uri;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">18</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\Utilities\ArrayHelper;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">19</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">20</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">21</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * Controller for single foo view</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">22</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">23</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @since  __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">24</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">25</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">class FooController extends FormController</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">26</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">27</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">28</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * The URL view item variable.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">29</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">30</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @var    string</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">31</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since  __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">32</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">33</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	protected $view_item = &#x27;form&#x27;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">34</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">35</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">36</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Method to get a model object, loading it if required.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">37</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">38</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   string  $name    The model name. Optional.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">39</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   string  $prefix  The class prefix. Optional.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">40</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   array   $config  Configuration array for model. Optional.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">41</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">42</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  \Joomla\CMS\MVC\Model\BaseDatabaseModel  The model.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">43</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">44</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since   __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">45</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">46</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public function getModel($name = &#x27;form&#x27;, $prefix = &#x27;&#x27;, $config = array(&#x27;ignore_request&#x27; =&gt; true))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">47</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">48</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return parent::getModel($name, $prefix, array(&#x27;ignore_request&#x27; =&gt; false));</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">49</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">50</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">51</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">52</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Method override to check if you can add a new record.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">53</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">54</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   array  $data  An array of input data.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">55</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">56</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  boolean</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">57</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">58</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since   __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">59</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">60</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	protected function allowAdd($data = array())</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">61</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">62</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if ($categoryId = ArrayHelper::getValue($data, &#x27;catid&#x27;, $this-&gt;input-&gt;getInt(&#x27;catid&#x27;), &#x27;int&#x27;))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">63</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">64</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$user = Factory::getUser();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">65</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">66</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&#x2F;&#x2F; If the category has been passed in the data or URL check it.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">67</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			return $user-&gt;authorise(&#x27;core.create&#x27;, &#x27;com_foos.category.&#x27; . $categoryId);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">68</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">69</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">70</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; In the absence of better information, revert to the component permissions.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">71</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return parent::allowAdd();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">72</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">73</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">74</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">75</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Method override to check if you can edit an existing record.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">76</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">77</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   array   $data  An array of input data.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">78</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   string  $key   The name of the key for the primary key; default is id.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">79</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">80</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  boolean</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">81</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">82</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since   __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">83</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">84</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	protected function allowEdit($data = array(), $key = &#x27;id&#x27;)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">85</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">86</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$recordId = (int) isset($data[$key]) ? $data[$key] : 0;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">87</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">88</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if (!$recordId)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">89</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">90</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			return false;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">91</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">92</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">93</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Need to do a lookup from the model.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">94</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$record     = $this-&gt;getModel()-&gt;getItem($recordId);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">95</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$categoryId = (int) $record-&gt;catid;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">96</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">97</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if ($categoryId)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">98</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">99</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$user = Factory::getUser();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">100</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">101</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&#x2F;&#x2F; The category has been set. Check the category permissions.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">102</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			if ($user-&gt;authorise(&#x27;core.edit&#x27;, $this-&gt;option . &#x27;.category.&#x27; . $categoryId))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">103</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">104</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				return true;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">105</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">106</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">107</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&#x2F;&#x2F; Fallback on edit.own.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">108</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			if ($user-&gt;authorise(&#x27;core.edit.own&#x27;, $this-&gt;option . &#x27;.category.&#x27; . $categoryId))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">109</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">110</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				return ($record-&gt;created_by == $user-&gt;id);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">111</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">112</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">113</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			return false;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">114</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">115</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">116</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Since there is no asset tracking, revert to the component permissions.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">117</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return parent::allowEdit($data, $key);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">118</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">119</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">120</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">121</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Method to cancel an edit.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">122</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">123</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   string  $key  The name of the primary key of the URL variable.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">124</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">125</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  boolean  True if access level checks pass, false otherwise.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">126</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">127</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since   __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">128</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">129</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public function cancel($key = null)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">130</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">131</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$result = parent::cancel($key);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">132</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">133</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;setRedirect(Route::_($this-&gt;getReturnPage(), false));</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">134</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">135</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return $result;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">136</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">137</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">138</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">139</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Gets the URL arguments to append to an item redirect.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">140</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">141</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   integer  $recordId  The primary key id for the item.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">142</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   string   $urlVar    The name of the URL variable for the id.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">143</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">144</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  string    The arguments to append to the redirect URL.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">145</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">146</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since   __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">147</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">148</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	protected function getRedirectToItemAppend($recordId = 0, $urlVar = &#x27;id&#x27;)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">149</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">150</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Need to override the parent method completely.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">151</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$tmpl = $this-&gt;input-&gt;get(&#x27;tmpl&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">152</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">153</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$append = &#x27;&#x27;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">154</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">155</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Setup redirect info.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">156</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if ($tmpl)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">157</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">158</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$append .= &#x27;&amp;tmpl=&#x27; . $tmpl;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">159</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">160</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">161</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$append .= &#x27;&amp;layout=edit&#x27;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">162</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">163</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$append .= &#x27;&amp;&#x27; . $urlVar . &#x27;=&#x27; . (int) $recordId;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">164</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">165</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$itemId = $this-&gt;input-&gt;getInt(&#x27;Itemid&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">166</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$return = $this-&gt;getReturnPage();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">167</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$catId  = $this-&gt;input-&gt;getInt(&#x27;catid&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">168</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">169</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if ($itemId)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">170</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">171</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$append .= &#x27;&amp;Itemid=&#x27; . $itemId;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">172</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">173</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">174</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if ($catId)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">175</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">176</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$append .= &#x27;&amp;catid=&#x27; . $catId;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">177</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">178</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">179</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if ($return)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">180</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">181</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$append .= &#x27;&amp;return=&#x27; . base64_encode($return);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">182</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">183</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">184</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return $append;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">185</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">186</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">187</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">188</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Get the return URL.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">189</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">190</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * If a &quot;return&quot; variable has been passed in the request</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">191</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">192</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  string    The return URL.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">193</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">194</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since   __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">195</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">196</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	protected function getReturnPage()</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">197</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">198</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$return = $this-&gt;input-&gt;get(&#x27;return&#x27;, null, &#x27;base64&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">199</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">200</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if (empty($return) || !Uri::isInternal(base64_decode($return)))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">201</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">202</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			return Uri::base();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">203</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">204</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">205</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return base64_decode($return);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">206</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">207</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">}</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-815167" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/components/com_foos/src/Helper/RouteHelper.php</span>
    <span class="d2h-tag d2h-added d2h-added-tag">ADDED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -0,0 +1,94 @@</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">1</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&lt;?php</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">2</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">3</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @package     Joomla.Site</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">4</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @subpackage  com_foos</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">5</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">6</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">7</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @license     GNU General Public License version 2 or later; see LICENSE.txt</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">8</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">9</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">10</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">namespace FooNamespace\Component\Foos\Site\Helper;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">11</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">12</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">defined(&#x27;_JEXEC&#x27;) or die;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">13</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">14</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Categories\CategoryNode;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">15</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Language\Multilanguage;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">16</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">17</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">18</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * Foos Component Route Helper</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">19</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">20</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @static</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">21</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @package     Joomla.Site</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">22</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @subpackage  com_foos</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">23</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @since       __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">24</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">25</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">abstract class	RouteHelper</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">26</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">27</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">28</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Get the URL route for a foo from a foo ID, foos category ID and language</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">29</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">30</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   integer  $id        The id of the foos</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">31</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   integer  $catid     The id of the foos&#x27;s category</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">32</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   mixed    $language  The id of the language being used.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">33</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">34</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  string  The link to the foos</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">35</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">36</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since   __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">37</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">38</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public static function getFooRoute($id, $catid, $language = 0)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">39</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">40</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Create the link</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">41</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$link = &#x27;index.php?option=com_foos&amp;view=foo&amp;id=&#x27; . $id;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">42</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">43</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if ($catid &gt; 1)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">44</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">45</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$link .= &#x27;&amp;catid=&#x27; . $catid;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">46</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">47</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">48</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if ($language &amp;&amp; $language !== &#x27;*&#x27; &amp;&amp; Multilanguage::isEnabled())</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">49</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">50</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$link .= &#x27;&amp;lang=&#x27; . $language;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">51</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">52</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">53</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return $link;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">54</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">55</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">56</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">57</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Get the URL route for a foos category from a foos category ID and language</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">58</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">59</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   mixed  $catid     The id of the foos&#x27;s category either an integer id or an instance of CategoryNode</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">60</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   mixed  $language  The id of the language being used.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">61</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">62</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  string  The link to the foos</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">63</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">64</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since   __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">65</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">66</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public static function getCategoryRoute($catid, $language = 0)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">67</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">68</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if ($catid instanceof CategoryNode)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">69</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">70</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$id = $catid-&gt;id;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">71</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">72</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		else</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">73</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">74</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$id = (int) $catid;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">75</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">76</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">77</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if ($id &lt; 1)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">78</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">79</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$link = &#x27;&#x27;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">80</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">81</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		else</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">82</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">83</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&#x2F;&#x2F; Create the link</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">84</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$link = &#x27;index.php?option=com_foos&amp;view=category&amp;id=&#x27; . $id;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">85</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">86</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			if ($language &amp;&amp; $language !== &#x27;*&#x27; &amp;&amp; Multilanguage::isEnabled())</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">87</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">88</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				$link .= &#x27;&amp;lang=&#x27; . $language;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">89</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">90</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">91</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">92</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return $link;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">93</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">94</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">}</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-546680" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/components/com_foos/src/Model/FormModel.php</span>
    <span class="d2h-tag d2h-added d2h-added-tag">ADDED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -0,0 +1,224 @@</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">1</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&lt;?php</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">2</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">3</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @package     Joomla.Site</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">4</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @subpackage  com_foos</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">5</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">6</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">7</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @license     GNU General Public License version 2 or later; see LICENSE.txt</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">8</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">9</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">10</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">namespace FooNamespace\Component\Foos\Site\Model;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">11</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">12</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">defined(&#x27;_JEXEC&#x27;) or die;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">13</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">14</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Factory;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">15</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Form\Form;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">16</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Language\Associations;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">17</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Language\Multilanguage;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">18</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\Registry\Registry;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">19</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\Utilities\ArrayHelper;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">20</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">21</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">22</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * Foo Component Foo Model</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">23</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">24</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @since  __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">25</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">26</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">class FormModel extends \FooNamespace\Component\Foos\Administrator\Model\FooModel</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">27</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">28</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">29</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Model typeAlias string. Used for version history.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">30</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">31</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @var  string</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">32</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since  __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">33</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">34</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public $typeAlias = &#x27;com_foos.foo&#x27;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">35</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">36</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">37</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Name of the form</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">38</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">39</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @var string</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">40</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since  __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">41</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">42</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	protected $formName = &#x27;form&#x27;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">43</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">44</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">45</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Method to get the row form.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">46</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">47</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   array    $data      Data for the form.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">48</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   boolean  $loadData  True if the form is to load its own data (default case), false if not.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">49</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">50</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  \JForm|boolean  A \JForm object on success, false on failure</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">51</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">52</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since   __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">53</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">54</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public function getForm($data = array(), $loadData = true)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">55</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">56</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$form = parent::getForm($data, $loadData);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">57</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">58</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Prevent messing with article language and category when editing existing foo with associations</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">59</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if ($id = $this-&gt;getState(&#x27;foo.id&#x27;) &amp;&amp; Associations::isEnabled())</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">60</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">61</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$associations = Associations::getAssociations(&#x27;com_foos&#x27;, &#x27;#__foos_details&#x27;, &#x27;com_foos.item&#x27;, $id);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">62</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">63</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&#x2F;&#x2F; Make fields read only</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">64</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			if (!empty($associations))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">65</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">66</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				$form-&gt;setFieldAttribute(&#x27;language&#x27;, &#x27;readonly&#x27;, &#x27;true&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">67</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				$form-&gt;setFieldAttribute(&#x27;language&#x27;, &#x27;filter&#x27;, &#x27;unset&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">68</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">69</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">70</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">71</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return $form;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">72</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">73</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">74</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">75</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Method to get foo data.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">76</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">77</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   integer  $itemId  The id of the foo.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">78</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">79</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  mixed  Foo item data object on success, false on failure.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">80</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">81</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @throws  Exception</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">82</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">83</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since   __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">84</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">85</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public function getItem($itemId = null)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">86</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">87</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$itemId = (int) (!empty($itemId)) ? $itemId : $this-&gt;getState(&#x27;foo.id&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">88</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">89</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Get a row instance.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">90</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$table = $this-&gt;getTable();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">91</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">92</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Attempt to load the row.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">93</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		try</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">94</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">95</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			if (!$table-&gt;load($itemId))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">96</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">97</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				return false;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">98</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">99</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">100</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		catch (Exception $e)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">101</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">102</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			Factory::getApplication()-&gt;enqueueMessage($e-&gt;getMessage());</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">103</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">104</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			return false;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">105</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">106</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">107</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$properties = $table-&gt;getProperties();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">108</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$value      = ArrayHelper::toObject($properties, &#x27;JObject&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">109</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">110</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Convert field to Registry.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">111</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$value-&gt;params = new Registry($value-&gt;params);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">112</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">113</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return $value;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">114</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">115</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">116</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">117</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Get the return URL.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">118</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">119</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  string  The return URL.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">120</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">121</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since   __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">122</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">123</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public function getReturnPage()</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">124</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">125</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return base64_encode($this-&gt;getState(&#x27;return_page&#x27;));</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">126</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">127</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">128</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">129</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Method to save the form data.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">130</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">131</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   array  $data  The form data.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">132</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">133</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  boolean  True on success.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">134</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">135</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @throws Exception</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">136</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since   __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">137</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">138</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public function save($data)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">139</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">140</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Associations are not edited in frontend ATM so we have to inherit them</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">141</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if (Associations::isEnabled() &amp;&amp; !empty($data[&#x27;id&#x27;])</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">142</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&amp;&amp; $associations = Associations::getAssociations(&#x27;com_foos&#x27;, &#x27;#__foos_details&#x27;, &#x27;com_foos.item&#x27;, $data[&#x27;id&#x27;]))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">143</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">144</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			foreach ($associations as $tag =&gt; $associated)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">145</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">146</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				$associations[$tag] = (int) $associated-&gt;id;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">147</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">148</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">149</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$data[&#x27;associations&#x27;] = $associations;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">150</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">151</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">152</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return parent::save($data);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">153</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">154</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">155</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">156</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Method to auto-populate the model state.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">157</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">158</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Note. Calling getState in this method will result in recursion.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">159</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">160</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  void</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">161</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">162</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @throws  Exception</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">163</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">164</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since   __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">165</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">166</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	protected function populateState()</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">167</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">168</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$app = Factory::getApplication();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">169</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">170</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Load state from the request.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">171</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$pk = $app-&gt;input-&gt;getInt(&#x27;id&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">172</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;setState(&#x27;foo.id&#x27;, $pk);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">173</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">174</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;setState(&#x27;foo.catid&#x27;, $app-&gt;input-&gt;getInt(&#x27;catid&#x27;));</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">175</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">176</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$return = $app-&gt;input-&gt;get(&#x27;return&#x27;, null, &#x27;base64&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">177</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;setState(&#x27;return_page&#x27;, base64_decode($return));</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">178</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">179</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Load the parameters.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">180</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$params = $app-&gt;getParams();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">181</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;setState(&#x27;params&#x27;, $params);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">182</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">183</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;setState(&#x27;layout&#x27;, $app-&gt;input-&gt;getString(&#x27;layout&#x27;));</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">184</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">185</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">186</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">187</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Allows preprocessing of the JForm object.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">188</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">189</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   Form    $form   The form object</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">190</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   array   $data   The data to be merged into the form object</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">191</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   string  $group  The plugin group to be executed</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">192</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">193</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  Form</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">194</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">195</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since   __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">196</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">197</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	protected function preprocessForm(Form $form, $data, $group = &#x27;foo&#x27;)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">198</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">199</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if (!Multilanguage::isEnabled())</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">200</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">201</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$form-&gt;setFieldAttribute(&#x27;language&#x27;, &#x27;type&#x27;, &#x27;hidden&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">202</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$form-&gt;setFieldAttribute(&#x27;language&#x27;, &#x27;default&#x27;, &#x27;*&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">203</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">204</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">205</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return parent::preprocessForm($form, $data, $group);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">206</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">207</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">208</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">209</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Method to get a table object, load it if necessary.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">210</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">211</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   string  $name     The table name. Optional.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">212</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   string  $prefix   The class prefix. Optional.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">213</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   array   $options  Configuration array for model. Optional.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">214</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">215</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  Table  A Table object</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">216</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">217</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since   __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">218</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @throws  \Exception</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">219</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">220</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public function getTable($name = &#x27;Foo&#x27;, $prefix = &#x27;Administrator&#x27;, $options = array())</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">221</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">222</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return parent::getTable($name, $prefix, $options);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">223</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">224</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">}</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-361070" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/components/com_foos/src/Service/Router.php</span>
    <span class="d2h-tag d2h-added d2h-added-tag">ADDED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -0,0 +1,268 @@</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">1</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&lt;?php</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">2</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">3</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @package     Joomla.Site</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">4</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @subpackage  com_foos</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">5</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">6</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">7</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @license     GNU General Public License version 2 or later; see LICENSE.txt</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">8</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">9</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">10</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">namespace FooNamespace\Component\Foos\Site\Service;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">11</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">12</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">defined(&#x27;_JEXEC&#x27;) or die;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">13</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">14</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Application\SiteApplication;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">15</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Categories\CategoryFactoryInterface;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">16</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Component\ComponentHelper;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">17</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Component\Router\RouterView;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">18</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Component\Router\RouterViewConfiguration;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">19</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Component\Router\Rules\MenuRules;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">20</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Component\Router\Rules\NomenuRules;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">21</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Component\Router\Rules\StandardRules;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">22</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Menu\AbstractMenu;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">23</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\Database\DatabaseInterface;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">24</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\Database\ParameterType;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">25</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">26</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">27</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * Routing class from com_foos</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">28</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">29</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @since  __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">30</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">31</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">class Router extends RouterView</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">32</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">33</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">34</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Flag to remove IDs</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">35</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">36</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @var    boolean</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">37</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">38</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	protected $noIDs = false;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">39</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">40</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">41</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * The category factory</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">42</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">43</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @var CategoryFactoryInterface</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">44</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">45</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since  __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">46</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">47</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	private $categoryFactory;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">48</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">49</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">50</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * The db</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">51</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">52</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @var DatabaseInterface</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">53</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">54</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since  __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">55</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">56</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	private $db;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">57</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">58</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">59</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Content Component router constructor</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">60</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">61</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   SiteApplication           $app              The application object</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">62</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   AbstractMenu              $menu             The menu object to work with</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">63</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   CategoryFactoryInterface  $categoryFactory  The category object</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">64</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   DatabaseInterface         $db               The database object</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">65</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">66</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public function __construct(SiteApplication $app, AbstractMenu $menu, CategoryFactoryInterface $categoryFactory, DatabaseInterface $db)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">67</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">68</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;categoryFactory = $categoryFactory;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">69</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;db = $db;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">70</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">71</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$params = ComponentHelper::getParams(&#x27;com_foos&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">72</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;noIDs = (bool) $params-&gt;get(&#x27;sef_ids&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">73</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$categories = new RouterViewConfiguration(&#x27;categories&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">74</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$categories-&gt;setKey(&#x27;id&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">75</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;registerView($categories);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">76</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$category = new RouterViewConfiguration(&#x27;category&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">77</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$category-&gt;setKey(&#x27;id&#x27;)-&gt;setParent($categories, &#x27;catid&#x27;)-&gt;setNestable();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">78</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;registerView($category);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">79</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$foo = new RouterViewConfiguration(&#x27;foo&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">80</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$foo-&gt;setKey(&#x27;id&#x27;)-&gt;setParent($category, &#x27;catid&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">81</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;registerView($foo);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">82</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;registerView(new RouterViewConfiguration(&#x27;featured&#x27;));</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">83</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$form = new RouterViewConfiguration(&#x27;form&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">84</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$form-&gt;setKey(&#x27;id&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">85</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;registerView($form);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">86</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">87</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		parent::__construct($app, $menu);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">88</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">89</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;attachRule(new MenuRules($this));</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">90</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;attachRule(new StandardRules($this));</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">91</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;attachRule(new NomenuRules($this));</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">92</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">93</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">94</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">95</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Method to get the segment(s) for a category</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">96</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">97</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   string  $id     ID of the category to retrieve the segments for</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">98</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   array   $query  The request that is built right now</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">99</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">100</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  array|string  The segments of this item</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">101</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">102</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public function getCategorySegment($id, $query)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">103</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">104</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$category = $this-&gt;categoryFactory-&gt;createCategory()-&gt;get($id);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">105</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">106</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if ($category)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">107</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">108</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$path = array_reverse($category-&gt;getPath(), true);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">109</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$path[0] = &#x27;1:root&#x27;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">110</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">111</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			if ($this-&gt;noIDs)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">112</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">113</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				foreach ($path as &amp;$segment)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">114</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">115</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">					list($id, $segment) = explode(&#x27;:&#x27;, $segment, 2);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">116</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">117</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">118</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">119</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			return $path;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">120</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">121</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">122</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return array();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">123</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">124</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">125</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">126</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Method to get the segment(s) for a category</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">127</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">128</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   string  $id     ID of the category to retrieve the segments for</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">129</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   array   $query  The request that is built right now</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">130</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">131</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  array|string  The segments of this item</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">132</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">133</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public function getCategoriesSegment($id, $query)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">134</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">135</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return $this-&gt;getCategorySegment($id, $query);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">136</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">137</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">138</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">139</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Method to get the segment(s) for a foo</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">140</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">141</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   string  $id     ID of the foo to retrieve the segments for</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">142</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   array   $query  The request that is built right now</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">143</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">144</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  array|string  The segments of this item</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">145</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">146</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public function getFooSegment($id, $query)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">147</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">148</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if (!strpos($id, &#x27;:&#x27;))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">149</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">150</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$id = (int) $id;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">151</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$dbquery = $this-&gt;db-&gt;getQuery(true);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">152</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$dbquery-&gt;select($this-&gt;db-&gt;quoteName(&#x27;alias&#x27;))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">153</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				-&gt;from($this-&gt;db-&gt;quoteName(&#x27;#__foos_details&#x27;))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">154</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				-&gt;where($this-&gt;db-&gt;quoteName(&#x27;id&#x27;) . &#x27; = :id&#x27;)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">155</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				-&gt;bind(&#x27;:id&#x27;, $id, ParameterType::INTEGER);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">156</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$this-&gt;db-&gt;setQuery($dbquery);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">157</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">158</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$id .= &#x27;:&#x27; . $this-&gt;db-&gt;loadResult();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">159</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">160</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">161</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if ($this-&gt;noIDs)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">162</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">163</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			list($void, $segment) = explode(&#x27;:&#x27;, $id, 2);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">164</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">165</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			return array($void =&gt; $segment);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">166</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">167</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">168</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return array((int) $id =&gt; $id);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">169</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">170</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">171</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">172</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Method to get the segment(s) for a form</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">173</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">174</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   string  $id     ID of the foo form to retrieve the segments for</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">175</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   array   $query  The request that is built right now</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">176</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">177</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  array|string  The segments of this item</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">178</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">179</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since   __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">180</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">181</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public function getFormSegment($id, $query)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">182</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">183</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return $this-&gt;getFooSegment($id, $query);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">184</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">185</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">186</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">187</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Method to get the id for a category</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">188</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">189</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   string  $segment  Segment to retrieve the ID for</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">190</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   array   $query    The request that is parsed right now</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">191</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">192</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  mixed   The id of this item or false</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">193</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">194</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public function getCategoryId($segment, $query)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">195</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">196</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if (isset($query[&#x27;id&#x27;]))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">197</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">198</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$category = $this-&gt;categoryFactory-&gt;createCategory([&#x27;access&#x27; =&gt; false])-&gt;get($query[&#x27;id&#x27;]);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">199</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">200</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			if ($category)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">201</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">202</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				foreach ($category-&gt;getChildren() as $child)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">203</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">204</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">					if ($this-&gt;noIDs)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">205</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">					{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">206</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">						if ($child-&gt;alias == $segment)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">207</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">						{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">208</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">							return $child-&gt;id;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">209</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">						}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">210</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">					}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">211</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">					else</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">212</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">					{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">213</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">						if ($child-&gt;id == (int) $segment)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">214</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">						{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">215</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">							return $child-&gt;id;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">216</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">						}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">217</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">					}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">218</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">219</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">220</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">221</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">222</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return false;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">223</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">224</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">225</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">226</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Method to get the segment(s) for a category</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">227</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">228</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   string  $segment  Segment to retrieve the ID for</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">229</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   array   $query    The request that is parsed right now</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">230</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">231</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  mixed   The id of this item or false</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">232</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">233</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public function getCategoriesId($segment, $query)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">234</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">235</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return $this-&gt;getCategoryId($segment, $query);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">236</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">237</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">238</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">239</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Method to get the segment(s) for a foo</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">240</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">241</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   string  $segment  Segment of the foo to retrieve the ID for</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">242</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   array   $query    The request that is parsed right now</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">243</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">244</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  mixed   The id of this item or false</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">245</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">246</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public function getFooId($segment, $query)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">247</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">248</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if ($this-&gt;noIDs)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">249</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">250</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$dbquery = $this-&gt;db-&gt;getQuery(true);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">251</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$dbquery-&gt;select($this-&gt;db-&gt;quoteName(&#x27;id&#x27;))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">252</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				-&gt;from($this-&gt;db-&gt;quoteName(&#x27;#__foos_details&#x27;))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">253</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				-&gt;where(</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">254</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">					[</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">255</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">						$this-&gt;db-&gt;quoteName(&#x27;alias&#x27;) . &#x27; = :alias&#x27;,</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">256</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">						$this-&gt;db-&gt;quoteName(&#x27;catid&#x27;) . &#x27; = :catid&#x27;,</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">257</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">					]</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">258</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">259</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				-&gt;bind(&#x27;:alias&#x27;, $segment)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">260</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				-&gt;bind(&#x27;:catid&#x27;, $query[&#x27;id&#x27;], ParameterType::INTEGER);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">261</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$this-&gt;db-&gt;setQuery($dbquery);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">262</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">263</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			return (int) $this-&gt;db-&gt;loadResult();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">264</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">265</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">266</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		return (int) $segment;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">267</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">268</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">}</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-766940" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/components/com_foos/src/View/Form/HtmlView.php</span>
    <span class="d2h-tag d2h-added d2h-added-tag">ADDED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -0,0 +1,177 @@</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">1</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&lt;?php</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">2</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">3</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @package     Joomla.Site</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">4</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @subpackage  com_foos</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">5</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">6</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">7</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @license     GNU General Public License version 2 or later; see LICENSE.txt</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">8</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">9</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">10</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">namespace FooNamespace\Component\Foos\Site\View\Form;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">11</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">12</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">defined(&#x27;_JEXEC&#x27;) or die;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">13</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">14</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Factory;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">15</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Helper\TagsHelper;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">16</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Language\Multilanguage;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">17</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Language\Text;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">18</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">19</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use FooNamespace\Component\Foos\Administrator\Helper\FooHelper;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">20</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">21</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">22</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * HTML Foo View class for the Foo component</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">23</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">24</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @since  __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">25</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">26</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">class HtmlView extends BaseHtmlView</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">27</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">28</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">29</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @var    \Joomla\CMS\Form\Form</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">30</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since  __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">31</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">32</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	protected $form;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">33</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">34</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">35</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @var    object</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">36</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since  __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">37</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">38</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	protected $item;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">39</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">40</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">41</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @var    string</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">42</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since  __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">43</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">44</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	protected $return_page;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">45</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">46</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">47</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @var    string</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">48</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since  __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">49</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">50</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	protected $pageclass_sfx;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">51</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">52</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">53</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @var    \Joomla\Registry\Registry</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">54</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since  __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">55</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">56</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	protected $state;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">57</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">58</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">59</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @var    \Joomla\Registry\Registry</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">60</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since  __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">61</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">62</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	protected $params;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">63</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">64</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">65</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Execute and display a template script.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">66</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">67</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @param   string  $tpl  The name of the template file to parse; automatically searches through the template paths.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">68</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">69</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  mixed  A string if successful, otherwise an Error object.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">70</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">71</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @throws Exception</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">72</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since  __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">73</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">74</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	public function display($tpl = null)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">75</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">76</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$user = Factory::getUser();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">77</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$app  = Factory::getApplication();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">78</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">79</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Get model data.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">80</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;state = $this-&gt;get(&#x27;State&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">81</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;item = $this-&gt;get(&#x27;Item&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">82</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;form = $this-&gt;get(&#x27;Form&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">83</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;return_page = $this-&gt;get(&#x27;ReturnPage&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">84</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">85</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if (empty($this-&gt;item-&gt;id))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">86</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">87</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$authorised = $user-&gt;authorise(&#x27;core.create&#x27;, &#x27;com_foos&#x27;) || count($user-&gt;getAuthorisedCategories(&#x27;com_foos&#x27;, &#x27;core.create&#x27;));</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">88</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">89</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		else</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">90</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">91</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&#x2F;&#x2F; Since we don&#x27;t track these assets at the item level, use the category id.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">92</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$canDo = FooHelper::getActions(&#x27;com_foos&#x27;, &#x27;category&#x27;, $this-&gt;item-&gt;catid);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">93</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$authorised = $canDo-&gt;get(&#x27;core.edit&#x27;) || ($canDo-&gt;get(&#x27;core.edit.own&#x27;) &amp;&amp; $this-&gt;item-&gt;created_by == $user-&gt;id);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">94</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">95</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">96</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if ($authorised !== true)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">97</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">98</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$app-&gt;enqueueMessage(Text::_(&#x27;JERROR_ALERTNOAUTHOR&#x27;), &#x27;error&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">99</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$app-&gt;setHeader(&#x27;status&#x27;, 403, true);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">100</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">101</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			return false;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">102</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">103</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">104</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Check for errors.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">105</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if (count($errors = $this-&gt;get(&#x27;Errors&#x27;)))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">106</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">107</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$app-&gt;enqueueMessage(implode(&quot;\n&quot;, $errors), &#x27;error&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">108</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">109</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			return false;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">110</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">111</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">112</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Create a shortcut to the parameters.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">113</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;params = $this-&gt;state-&gt;params;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">114</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">115</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Escape strings for HTML output</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">116</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;pageclass_sfx = htmlspecialchars($this-&gt;params-&gt;get(&#x27;pageclass_sfx&#x27;));</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">117</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">118</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Override global params with foo specific params</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">119</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;params-&gt;merge($this-&gt;item-&gt;params);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">120</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">121</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Propose current language as default when creating new foo</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">122</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if (empty($this-&gt;item-&gt;id) &amp;&amp; Multilanguage::isEnabled())</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">123</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">124</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$lang = Factory::getLanguage()-&gt;getTag();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">125</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$this-&gt;form-&gt;setFieldAttribute(&#x27;language&#x27;, &#x27;default&#x27;, $lang);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">126</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">127</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">128</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;_prepareDocument();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">129</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">130</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		parent::display($tpl);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">131</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">132</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">133</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">134</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * Prepares the document</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">135</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">136</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @return  void</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">137</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">138</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @throws Exception</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">139</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">140</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * @since  __DEPLOY_VERSION__</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">141</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">142</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	protected function _prepareDocument()</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">143</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">144</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$app   = Factory::getApplication();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">145</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$menus = $app-&gt;getMenu();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">146</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$title = null;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">147</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">148</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Because the application sets a default page title,</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">149</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; we need to get it from the menu item itself</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">150</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$menu = $menus-&gt;getActive();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">151</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">152</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if ($menu)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">153</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">154</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$this-&gt;params-&gt;def(&#x27;page_heading&#x27;, $this-&gt;params-&gt;get(&#x27;page_title&#x27;, $menu-&gt;title));</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">155</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">156</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		else</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">157</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">158</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$this-&gt;params-&gt;def(&#x27;page_heading&#x27;, Text::_(&#x27;COM_FOOS_FORM_EDIT_FOO&#x27;));</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">159</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">160</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">161</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$title = $this-&gt;params-&gt;def(&#x27;page_title&#x27;, Text::_(&#x27;COM_FOOS_FORM_EDIT_FOO&#x27;));</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">162</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">163</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		if ($app-&gt;get(&#x27;sitename_pagetitles&#x27;, 0) == 1)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">164</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">165</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$title = Text::sprintf(&#x27;JPAGETITLE&#x27;, $app-&gt;get(&#x27;sitename&#x27;), $title);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">166</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">167</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		elseif ($app-&gt;get(&#x27;sitename_pagetitles&#x27;, 0) == 2)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">168</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">169</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			$title = Text::sprintf(&#x27;JPAGETITLE&#x27;, $title, $app-&gt;get(&#x27;sitename&#x27;));</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">170</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">171</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">172</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$this-&gt;document-&gt;setTitle($title);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">173</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">174</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$pathway = $app-&gt;getPathWay();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">175</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		$pathway-&gt;addItem($title, &#x27;&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">176</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">177</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">}</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-336930" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/components/com_foos/tmpl/foo/default.php</span>
    <span class="d2h-tag d2h-changed d2h-changed-tag">CHANGED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -8,17 +8,39 @@</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">8</div>
<div class="line-num2">8</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn"> *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">9</div>
<div class="line-num2">9</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">defined(&#x27;_JEXEC&#x27;) or die;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">10</div>
<div class="line-num2">10</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">11</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Factory;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">12</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Helper\ContentHelper;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">11</div>
<div class="line-num2">13</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Language\Text;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">12</div>
<div class="line-num2">14</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-del d2h-change">
      <div class="line-num1">13</div>
<div class="line-num2"></div>
    </td>
    <td class="d2h-del d2h-change">
        <div class="d2h-code-line d2h-del d2h-change">
            <span class="d2h-code-line-prefix">-</span>
            <span class="d2h-code-line-ctn"><del>if</del> ($this-&gt;item-&gt;<del>params-&gt;get(&#x27;show_name&#x27;</del>)<del>) {</del></span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins d2h-change">
      <div class="line-num1"></div>
<div class="line-num2">15</div>
    </td>
    <td class="d2h-ins d2h-change">
        <div class="d2h-code-line d2h-ins d2h-change">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"><ins>$canDo   =</ins> <ins>ContentHelper::getActions</ins>(<ins>&#x27;com_foos&#x27;, &#x27;category&#x27;, </ins>$this-&gt;item-&gt;<ins>catid</ins>)<ins>;</ins></span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">16</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">$canEdit = $canDo-&gt;get(&#x27;core.edit&#x27;) || ($canDo-&gt;get(&#x27;core.edit.own&#x27;) &amp;&amp; $this-&gt;item-&gt;created_by == Factory::getUser()-&gt;id);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">17</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">$tparams = $this-&gt;item-&gt;params;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">14</div>
<div class="line-num2">18</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">19</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">if ($tparams-&gt;get(&#x27;show_name&#x27;)) {</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">15</div>
<div class="line-num2">20</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	if ($this-&gt;Params-&gt;get(&#x27;show_foo_name_label&#x27;)) {</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">16</div>
<div class="line-num2">21</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		echo Text::_(&#x27;COM_FOOS_NAME&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">17</div>
<div class="line-num2">22</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">18</div>
<div class="line-num2">23</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">19</div>
<div class="line-num2">24</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	echo $this-&gt;item-&gt;name;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">20</div>
<div class="line-num2">25</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">26</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">21</div>
<div class="line-num2">27</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">28</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&lt;?php if ($canEdit) : ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">29</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&lt;div class=&quot;icons&quot;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">30</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&lt;div class=&quot;btn-group float-right&quot;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">31</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;button class=&quot;btn btn-secondary dropdown-toggle&quot; type=&quot;button&quot; id=&quot;dropdownMenuButton-&lt;?php echo $this-&gt;item-&gt;id; ?&gt;&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">32</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				aria-label=&quot;&lt;?php echo JText::_(&#x27;JUSER_TOOLS&#x27;); ?&gt;&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">33</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				data-toggle=&quot;dropdown&quot; aria-haspopup=&quot;true&quot; aria-expanded=&quot;false&quot;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">34</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				&lt;span class=&quot;fa fa-cog&quot; aria-hidden=&quot;true&quot;&gt;&lt;&#x2F;span&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">35</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;&#x2F;button&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">36</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;ul class=&quot;dropdown-menu&quot; aria-labelledby=&quot;dropdownMenuButton-&lt;?php echo $this-&gt;item-&gt;id; ?&gt;&quot;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">37</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				&lt;li class=&quot;edit-icon&quot;&gt; &lt;?php echo JHtml::_(&#x27;fooicon.edit&#x27;, $this-&gt;item, $tparams); ?&gt; &lt;&#x2F;li&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">38</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;&#x2F;ul&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">39</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&lt;&#x2F;div&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">40</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&lt;&#x2F;div&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">41</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&lt;?php endif; ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">42</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">43</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&lt;?php</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">22</div>
<div class="line-num2">44</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">echo $this-&gt;item-&gt;event-&gt;afterDisplayTitle; </span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">23</div>
<div class="line-num2">45</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">echo $this-&gt;item-&gt;event-&gt;beforeDisplayContent;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">24</div>
<div class="line-num2">46</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">echo $this-&gt;item-&gt;event-&gt;afterDisplayContent;</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-580763" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/components/com_foos/tmpl/form/edit.php</span>
    <span class="d2h-tag d2h-added d2h-added-tag">ADDED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -0,0 +1,66 @@</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">1</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&lt;?php</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">2</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">3</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @package     Joomla.Site</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">4</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @subpackage  com_foos</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">5</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">6</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">7</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> * @license     GNU General Public License version 2 or later; see LICENSE.txt</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">8</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"> *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">9</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">10</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">defined(&#x27;_JEXEC&#x27;) or die;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">11</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">12</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\HTML\HTMLHelper;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">13</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Language\Multilanguage;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">14</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Language\Text;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">15</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Layout\LayoutHelper;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">16</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Router\Route;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">17</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">18</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">HTMLHelper::_(&#x27;behavior.keepalive&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">19</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">HTMLHelper::_(&#x27;behavior.formvalidator&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">20</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">21</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">$this-&gt;tab_name = &#x27;com-foo-form&#x27;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">22</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">$this-&gt;ignore_fieldsets = array(&#x27;details&#x27;, &#x27;item_associations&#x27;, &#x27;language&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">23</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">$this-&gt;useCoreUI = true;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">24</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">25</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&lt;div class=&quot;edit item-page&lt;?php echo $this-&gt;pageclass_sfx; ?&gt;&quot;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">26</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&lt;?php if ($this-&gt;params-&gt;get(&#x27;show_page_heading&#x27;)) : ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">27</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&lt;div class=&quot;page-header&quot;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">28</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;h1&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">29</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				&lt;?php echo $this-&gt;escape($this-&gt;params-&gt;get(&#x27;page_heading&#x27;)); ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">30</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;&#x2F;h1&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">31</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&lt;&#x2F;div&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">32</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&lt;?php endif; ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">33</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">34</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&lt;form action=&quot;&lt;?php echo Route::_(&#x27;index.php?option=com_foos&amp;id=&#x27; . (int) $this-&gt;item-&gt;id); ?&gt;&quot; method=&quot;post&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">35</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		name=&quot;adminForm&quot; id=&quot;adminForm&quot; class=&quot;form-validate form-vertical&quot;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">36</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&lt;fieldset&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">37</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;?php echo HTMLHelper::_(&#x27;uitab.startTabSet&#x27;, $this-&gt;tab_name, array(&#x27;active&#x27; =&gt; &#x27;details&#x27;)); ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">38</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;?php echo HTMLHelper::_(&#x27;uitab.addTab&#x27;, $this-&gt;tab_name, &#x27;details&#x27;, empty($this-&gt;item-&gt;id) ? Text::_(&#x27;COM_FOOS_NEW_FOO&#x27;) : Text::_(&#x27;COM_FOOS_EDIT_FOO&#x27;)); ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">39</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;?php echo $this-&gt;form-&gt;renderField(&#x27;name&#x27;); ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">40</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">41</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;?php if (is_null($this-&gt;item-&gt;id)) : ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">42</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				&lt;?php echo $this-&gt;form-&gt;renderField(&#x27;alias&#x27;); ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">43</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;?php endif; ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">44</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">45</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;?php &#x2F;&#x2F;echo $this-&gt;form-&gt;renderFieldset(&#x27;details&#x27;); ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">46</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;?php echo HTMLHelper::_(&#x27;uitab.endTab&#x27;); ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">47</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">48</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;?php &#x2F;&#x2F;echo LayoutHelper::render(&#x27;joomla.edit.params&#x27;, $this); ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">49</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;?php echo HTMLHelper::_(&#x27;uitab.endTabSet&#x27;); ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">50</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">51</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;input type=&quot;hidden&quot; name=&quot;task&quot; value=&quot;&quot;&#x2F;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">52</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;input type=&quot;hidden&quot; name=&quot;return&quot; value=&quot;&lt;?php echo $this-&gt;return_page; ?&gt;&quot;&#x2F;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">53</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;?php echo HTMLHelper::_(&#x27;form.token&#x27;); ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">54</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&lt;&#x2F;fieldset&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">55</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&lt;div class=&quot;mb-2&quot;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">56</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot; onclick=&quot;Joomla.submitbutton(&#x27;foo.save&#x27;)&quot;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">57</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				&lt;span class=&quot;fas fa-check&quot; aria-hidden=&quot;true&quot;&gt;&lt;&#x2F;span&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">58</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				&lt;?php echo Text::_(&#x27;JSAVE&#x27;); ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">59</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;&#x2F;button&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">60</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;button type=&quot;button&quot; class=&quot;btn btn-danger&quot; onclick=&quot;Joomla.submitbutton(&#x27;foo.cancel&#x27;)&quot;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">61</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				&lt;span class=&quot;fas fa-times-cancel&quot; aria-hidden=&quot;true&quot;&gt;&lt;&#x2F;span&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">62</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				&lt;?php echo Text::_(&#x27;JCANCEL&#x27;); ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">63</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;&#x2F;button&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">64</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&lt;&#x2F;div&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">65</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&lt;&#x2F;form&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">66</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&lt;&#x2F;div&gt;</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-588602" class="d2h-file-wrapper" data-lang="xml">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/components/com_foos/tmpl/form/edit.xml</span>
    <span class="d2h-tag d2h-added d2h-added-tag">ADDED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -0,0 +1,14 @@</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">1</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">2</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&lt;metadata&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">3</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&lt;layout title=&quot;COM_CONTACT_FORM_VIEW_DEFAULT_TITLE&quot;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">4</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&lt;help</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">5</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">				key=&quot;JHELP_MENUS_MENU_ITEM_CONTACT_CREATE&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">6</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&#x2F;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">7</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&lt;message&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">8</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;![CDATA[COM_CONTACT_FORM_VIEW_DEFAULT_DESC]]&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">9</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">		&lt;&#x2F;message&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">10</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&lt;&#x2F;layout&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">11</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&lt;fields name=&quot;params&quot;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">12</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">13</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&lt;&#x2F;fields&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">14</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">&lt;&#x2F;metadata&gt;</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</div>
    </div>

    https://github.com/joomla/joomla-cms/pull/24311/files
