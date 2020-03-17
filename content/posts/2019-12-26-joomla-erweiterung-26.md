---
date: 2019-12-26
title: 'Joomla 4: Erweiterung erstellen - Teil 26 - Stapelverarbeitung/Batch'
template: post
thumbnail: '../thumbnails/joomlatut.png'
slug: joomla-erweiterung-26
categories:
  - Entwicklung
tags:
  - Tutorial
  - Joomla 
---

Joomla! bietet eine Reihe von Funktionen, mit denen es Administratoren möglich ist, mehrere Items auf einen Schlag zu bearbeiten. Diese Stapelverarbeitung (englisch Batch) fügen wir jetzt zur Komponente hinzu. Darauf aufbauend ist dir möglich, eigenen Funktionen hinzuzufügen.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t25...t26) an und übernimm diese Änderungen in deine Entwicklungsversion.

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten. 

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation. 

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. In der Werkzeugleiste siehst du eine Auswahlliste zum Anstoßen von verschiedenen Aktionen. Klicke den Eintrag `Batch`.

![Joomla! Stapelverarbeitung](../images/j4x26x1.png)

3. Teste die Stapelverarbeitung.

![Joomla! Stapelverarbeitung](../images/j4x26x2.png)

## Geänderte Dateien

### Übersicht

<div id="diff">
      <div class="d2h-file-list-wrapper">
    <div class="d2h-file-list-header">
        <span class="d2h-file-list-title">Files changed (8)</span>
        <a class="d2h-file-switch d2h-hide">hide</a>
        <a class="d2h-file-switch d2h-show">show</a>
    </div>
    <ol class="d2h-file-list">
    <li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-changed" height="16" title="modified" version="1.1"
           viewBox="0 0 14 16" width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path>
      </svg>      <a href="#d2h-850660" class="d2h-file-name">src/administrator/components/com_foos/src/Controller/FooController.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+21</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-changed" height="16" title="modified" version="1.1"
           viewBox="0 0 14 16" width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path>
      </svg>      <a href="#d2h-206858" class="d2h-file-name">src/administrator/components/com_foos/src/Model/FooModel.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+18</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-changed" height="16" title="modified" version="1.1"
           viewBox="0 0 14 16" width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path>
      </svg>      <a href="#d2h-529131" class="d2h-file-name">src/administrator/components/com_foos/src/View/Foos/HtmlView.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+18</span>
          <span class="d2h-lines-deleted">-7</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-changed" height="16" title="modified" version="1.1"
           viewBox="0 0 14 16" width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path>
      </svg>      <a href="#d2h-426783" class="d2h-file-name">src/administrator/components/com_foos/tmpl/foo/edit.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+1</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-changed" height="16" title="modified" version="1.1"
           viewBox="0 0 14 16" width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path>
      </svg>      <a href="#d2h-900341" class="d2h-file-name">src/administrator/components/com_foos/tmpl/foos/default.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+10</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-added" height="16" title="added" version="1.1" viewBox="0 0 14 16"
           width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>
      </svg>      <a href="#d2h-899194" class="d2h-file-name">src/administrator/components/com_foos/tmpl/foos/default_batch.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+59</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-added" height="16" title="added" version="1.1" viewBox="0 0 14 16"
           width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>
      </svg>      <a href="#d2h-605135" class="d2h-file-name">src/administrator/components/com_foos/tmpl/foos/default_batch_body.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+32</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-added" height="16" title="added" version="1.1" viewBox="0 0 14 16"
           width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>
      </svg>      <a href="#d2h-318600" class="d2h-file-name">src/administrator/components/com_foos/tmpl/foos/default_batch_footer.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+12</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
    </ol>
</div><div class="d2h-wrapper">
    <div id="d2h-850660" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/administrator/components/com_foos/src/Controller/FooController.php</span>
    <span class="d2h-tag d2h-changed d2h-changed-tag">CHANGED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -12,6 +12,7 @@ namespace Joomla\Component\Foos\Administrator\Controller;</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">12</div>
<div class="line-num2">12</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">defined(&#x27;_JEXEC&#x27;) or die;</span>
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
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">14</div>
<div class="line-num2">14</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\MVC\Controller\FormController;</span>
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
            <span class="d2h-code-line-ctn">use Joomla\CMS\Router\Route;</span>
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
            <span class="d2h-code-line-ctn">&#x2F;**</span>
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
            <span class="d2h-code-line-ctn"> * Controller for a single foo</span>
        </div>
    </td>
</tr>
<tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -20,4 +21,24 @@ use Joomla\CMS\MVC\Controller\FormController;</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">20</div>
<div class="line-num2">21</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn"> *&#x2F;</span>
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
            <span class="d2h-code-line-ctn">class FooController extends FormController</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">22</div>
<div class="line-num2">23</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">{</span>
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
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
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
            <span class="d2h-code-line-ctn">	 * Method to run batch operations.</span>
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
            <span class="d2h-code-line-ctn">	 *</span>
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
            <span class="d2h-code-line-ctn">	 * @param   object  $model  The model.</span>
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
            <span class="d2h-code-line-ctn">	 *</span>
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
            <span class="d2h-code-line-ctn">	 * @return  boolean   True if successful, false otherwise and internal error is set.</span>
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
            <span class="d2h-code-line-ctn">	 * @since   __BUMP_VERSION__</span>
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
            <span class="d2h-code-line-ctn">	public function batch($model = null)</span>
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
            <span class="d2h-code-line-ctn">	{</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;checkToken();</span>
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
            <span class="d2h-code-line-ctn">		$model = $this-&gt;getModel(&#x27;Foo&#x27;, &#x27;Administrator&#x27;, array());</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Preset the redirect</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;setRedirect(Route::_(&#x27;index.php?option=com_foos&amp;view=foos&#x27; . $this-&gt;getRedirectToListAppend(), false));</span>
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
            <span class="d2h-code-line-ctn">		return parent::batch($model);</span>
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
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">23</div>
<div class="line-num2">44</div>
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
<div id="d2h-206858" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/administrator/components/com_foos/src/Model/FooModel.php</span>
    <span class="d2h-tag d2h-changed d2h-changed-tag">CHANGED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -39,6 +39,24 @@ class FooModel extends AdminModel</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">39</div>
<div class="line-num2">39</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">40</div>
<div class="line-num2">40</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	protected $associationsContext = &#x27;com_foos.item&#x27;;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">41</div>
<div class="line-num2">41</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
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
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
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
            <span class="d2h-code-line-ctn">	 * Batch copy&#x2F;move command. If set to false, the batch copy&#x2F;move command is not supported</span>
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
            <span class="d2h-code-line-ctn">	 * @var  string</span>
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
            <span class="d2h-code-line-ctn">	protected $batch_copymove = &#x27;category_id&#x27;;</span>
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
            <span class="d2h-code-line-ctn">	 * Allowed batch commands</span>
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
            <span class="d2h-code-line-ctn">	 * @var array</span>
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
            <span class="d2h-code-line-ctn">	protected $batch_commands = array(</span>
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
            <span class="d2h-code-line-ctn">		&#x27;assetgroup_id&#x27; =&gt; &#x27;batchAccess&#x27;,</span>
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
            <span class="d2h-code-line-ctn">		&#x27;language_id&#x27;   =&gt; &#x27;batchLanguage&#x27;,</span>
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
            <span class="d2h-code-line-ctn">		&#x27;user_id&#x27;       =&gt; &#x27;batchUser&#x27;,</span>
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
            <span class="d2h-code-line-ctn">	);</span>
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
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">42</div>
<div class="line-num2">60</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">43</div>
<div class="line-num2">61</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	 * Method to get the row form.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">44</div>
<div class="line-num2">62</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-529131" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/administrator/components/com_foos/src/View/Foos/HtmlView.php</span>
    <span class="d2h-tag d2h-changed d2h-changed-tag">CHANGED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -175,14 +175,25 @@ class HtmlView extends BaseHtmlView</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">175</div>
<div class="line-num2">175</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">			{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">176</div>
<div class="line-num2">176</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">				$childBar-&gt;trash(&#x27;foos.trash&#x27;)-&gt;listCheck(true);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">177</div>
<div class="line-num2">177</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">			}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-del">
      <div class="line-num1">178</div>
<div class="line-num2"></div>
    </td>
    <td class="d2h-del">
        <div class="d2h-code-line d2h-del">
            <span class="d2h-code-line-prefix">-</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">179</div>
<div class="line-num2">178</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-del d2h-change">
      <div class="line-num1">180</div>
<div class="line-num2"></div>
    </td>
    <td class="d2h-del d2h-change">
        <div class="d2h-code-line d2h-del d2h-change">
            <span class="d2h-code-line-prefix">-</span>
            <span class="d2h-code-line-ctn"><del>		</del>if ($this-&gt;state-&gt;get(&#x27;filter.published&#x27;) == -2 &amp;&amp; $canDo-&gt;get(&#x27;core.delete&#x27;))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-del d2h-change">
      <div class="line-num1">181</div>
<div class="line-num2"></div>
    </td>
    <td class="d2h-del d2h-change">
        <div class="d2h-code-line d2h-del d2h-change">
            <span class="d2h-code-line-prefix">-</span>
            <span class="d2h-code-line-ctn"><del>		</del>{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-del d2h-change">
      <div class="line-num1">182</div>
<div class="line-num2"></div>
    </td>
    <td class="d2h-del d2h-change">
        <div class="d2h-code-line d2h-del d2h-change">
            <span class="d2h-code-line-prefix">-</span>
            <span class="d2h-code-line-ctn"><del>			</del>$<del>toolbar</del>-&gt;delete(&#x27;foos.delete&#x27;)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-del d2h-change">
      <div class="line-num1">183</div>
<div class="line-num2"></div>
    </td>
    <td class="d2h-del d2h-change">
        <div class="d2h-code-line d2h-del d2h-change">
            <span class="d2h-code-line-prefix">-</span>
            <span class="d2h-code-line-ctn"><del>				</del>-&gt;text(&#x27;JTOOLBAR_EMPTY_TRASH&#x27;)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-del d2h-change">
      <div class="line-num1">184</div>
<div class="line-num2"></div>
    </td>
    <td class="d2h-del d2h-change">
        <div class="d2h-code-line d2h-del d2h-change">
            <span class="d2h-code-line-prefix">-</span>
            <span class="d2h-code-line-ctn"><del>				</del>-&gt;message(&#x27;JGLOBAL_CONFIRM_DELETE&#x27;)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-del d2h-change">
      <div class="line-num1">185</div>
<div class="line-num2"></div>
    </td>
    <td class="d2h-del d2h-change">
        <div class="d2h-code-line d2h-del d2h-change">
            <span class="d2h-code-line-prefix">-</span>
            <span class="d2h-code-line-ctn"><del>				</del>-&gt;listCheck(true);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins d2h-change">
      <div class="line-num1"></div>
<div class="line-num2">179</div>
    </td>
    <td class="d2h-ins d2h-change">
        <div class="d2h-code-line d2h-ins d2h-change">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"><ins>			</ins>if ($this-&gt;state-&gt;get(&#x27;filter.published&#x27;) == -2 &amp;&amp; $canDo-&gt;get(&#x27;core.delete&#x27;))</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins d2h-change">
      <div class="line-num1"></div>
<div class="line-num2">180</div>
    </td>
    <td class="d2h-ins d2h-change">
        <div class="d2h-code-line d2h-ins d2h-change">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"><ins>			</ins>{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins d2h-change">
      <div class="line-num1"></div>
<div class="line-num2">181</div>
    </td>
    <td class="d2h-ins d2h-change">
        <div class="d2h-code-line d2h-ins d2h-change">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"><ins>				</ins>$<ins>childBar</ins>-&gt;delete(&#x27;foos.delete&#x27;)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins d2h-change">
      <div class="line-num1"></div>
<div class="line-num2">182</div>
    </td>
    <td class="d2h-ins d2h-change">
        <div class="d2h-code-line d2h-ins d2h-change">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"><ins>					</ins>-&gt;text(&#x27;JTOOLBAR_EMPTY_TRASH&#x27;)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins d2h-change">
      <div class="line-num1"></div>
<div class="line-num2">183</div>
    </td>
    <td class="d2h-ins d2h-change">
        <div class="d2h-code-line d2h-ins d2h-change">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"><ins>					</ins>-&gt;message(&#x27;JGLOBAL_CONFIRM_DELETE&#x27;)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins d2h-change">
      <div class="line-num1"></div>
<div class="line-num2">184</div>
    </td>
    <td class="d2h-ins d2h-change">
        <div class="d2h-code-line d2h-ins d2h-change">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn"><ins>					</ins>-&gt;listCheck(true);</span>
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
            <span class="d2h-code-line-ctn">			}</span>
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
            <span class="d2h-code-line-ctn">			&#x2F;&#x2F; Add a batch button</span>
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
            <span class="d2h-code-line-ctn">			if ($user-&gt;authorise(&#x27;core.create&#x27;, &#x27;com_foos&#x27;)</span>
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
            <span class="d2h-code-line-ctn">				&amp;&amp; $user-&gt;authorise(&#x27;core.edit&#x27;, &#x27;com_foos&#x27;)</span>
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
            <span class="d2h-code-line-ctn">				&amp;&amp; $user-&gt;authorise(&#x27;core.edit.state&#x27;, &#x27;com_foos&#x27;))</span>
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
            <span class="d2h-code-line-ctn">			{</span>
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
            <span class="d2h-code-line-ctn">				$childBar-&gt;popupButton(&#x27;batch&#x27;)</span>
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
            <span class="d2h-code-line-ctn">					-&gt;text(&#x27;JTOOLBAR_BATCH&#x27;)</span>
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
            <span class="d2h-code-line-ctn">					-&gt;selector(&#x27;collapseModal&#x27;)</span>
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
            <span class="d2h-code-line-ctn">					-&gt;listCheck(true);</span>
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
            <span class="d2h-code-line-ctn">			}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">186</div>
<div class="line-num2">197</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">187</div>
<div class="line-num2">198</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">188</div>
<div class="line-num2">199</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		if ($user-&gt;authorise(&#x27;core.admin&#x27;, &#x27;com_foos&#x27;) || $user-&gt;authorise(&#x27;core.options&#x27;, &#x27;com_foos&#x27;))</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-426783" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/administrator/components/com_foos/tmpl/foo/edit.php</span>
    <span class="d2h-tag d2h-changed d2h-changed-tag">CHANGED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -34,6 +34,7 @@ $tmpl    = $isModal || $input->get('tmpl', '', 'cmd') === 'component' ? '&tmpl=c</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">34</div>
<div class="line-num2">34</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">35</div>
<div class="line-num2">35</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">&lt;input type=&quot;text&quot; readonly id=&quot;jform_id&quot; name=&quot;jform_id&quot; value=&quot;&lt;?php echo (int) $this-&gt;item-&gt;id ?&gt;&quot;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">36</div>
<div class="line-num2">36</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">&lt;form action=&quot;&lt;?php echo Route::_(&#x27;index.php?option=com_foos&amp;layout=&#x27; . $layout . $tmpl . &#x27;&amp;id=&#x27; . (int) $this-&gt;item-&gt;id); ?&gt;&quot; method=&quot;post&quot; name=&quot;adminForm&quot; id=&quot;foo-form&quot; class=&quot;form-validate&quot;&gt;</span>
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
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">37</div>
<div class="line-num2">38</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	&lt;div&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">38</div>
<div class="line-num2">39</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		&lt;?php echo HTMLHelper::_(&#x27;uitab.startTabSet&#x27;, &#x27;myTab&#x27;, array(&#x27;active&#x27; =&gt; &#x27;details&#x27;)); ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">39</div>
<div class="line-num2">40</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-900341" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/administrator/components/com_foos/tmpl/foos/default.php</span>
    <span class="d2h-tag d2h-changed d2h-changed-tag">CHANGED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -156,6 +156,16 @@ if ($saveOrder && !empty($this->items))</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">156</div>
<div class="line-num2">156</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">157</div>
<div class="line-num2">157</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">					&lt;?php echo $this-&gt;pagination-&gt;getListFooter(); ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">158</div>
<div class="line-num2">158</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">				</span>
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
            <span class="d2h-code-line-ctn">					&lt;?php echo HTMLHelper::_(</span>
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
            <span class="d2h-code-line-ctn">						&#x27;bootstrap.renderModal&#x27;,</span>
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
            <span class="d2h-code-line-ctn">						&#x27;collapseModal&#x27;,</span>
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
            <span class="d2h-code-line-ctn">						array(</span>
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
            <span class="d2h-code-line-ctn">							&#x27;title&#x27;  =&gt; Text::_(&#x27;COM_FOOS_BATCH_OPTIONS&#x27;),</span>
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
            <span class="d2h-code-line-ctn">							&#x27;footer&#x27; =&gt; $this-&gt;loadTemplate(&#x27;batch_footer&#x27;),</span>
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
            <span class="d2h-code-line-ctn">						),</span>
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
            <span class="d2h-code-line-ctn">						$this-&gt;loadTemplate(&#x27;batch_body&#x27;)</span>
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
            <span class="d2h-code-line-ctn">					); ?&gt;</span>
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
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">159</div>
<div class="line-num2">169</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">				&lt;?php endif; ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">160</div>
<div class="line-num2">170</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">				&lt;input type=&quot;hidden&quot; name=&quot;task&quot; value=&quot;&quot;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">161</div>
<div class="line-num2">171</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">				&lt;input type=&quot;hidden&quot; name=&quot;boxchecked&quot; value=&quot;0&quot;&gt;</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-899194" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/administrator/components/com_foos/tmpl/foos/default_batch.php</span>
    <span class="d2h-tag d2h-added d2h-added-tag">ADDED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -0,0 +1,59 @@</div>
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
            <span class="d2h-code-line-ctn">defined(&#x27;_JEXEC&#x27;) or die;</span>
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
            <span class="d2h-code-line-ctn">use Joomla\CMS\Language\Text;</span>
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
            <span class="d2h-code-line-ctn">use Joomla\CMS\Layout\LayoutHelper;</span>
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
            <span class="d2h-code-line-ctn">$published = $this-&gt;state-&gt;get(&#x27;filter.published&#x27;);</span>
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
            <span class="d2h-code-line-ctn">$noUser = true;</span>
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
            <span class="d2h-code-line-ctn">?&gt;</span>
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
            <span class="d2h-code-line-ctn">&lt;div class=&quot;modal hide fade&quot; id=&quot;collapseModal&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;div class=&quot;modal-header&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;button type=&quot;button&quot; class=&quot;close&quot; data-dismiss=&quot;modal&quot;&gt;&amp;#215;&lt;&#x2F;button&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;h3&gt;&lt;?php echo Text::_(&#x27;COM_FOOS_BATCH_OPTIONS&#x27;); ?&gt;&lt;&#x2F;h3&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;div class=&quot;modal-body modal-batch&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;p&gt;&lt;?php echo Text::_(&#x27;COM_FOOS_BATCH_TIP&#x27;); ?&gt;&lt;&#x2F;p&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;div class=&quot;row&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;div class=&quot;form-group col-md-6&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;div class=&quot;controls&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">					&lt;?php echo LayoutHelper::render(&#x27;joomla.html.batch.language&#x27;, []); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;div class=&quot;form-group col-md-6&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;div class=&quot;controls&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">					&lt;?php echo LayoutHelper::render(&#x27;joomla.html.batch.access&#x27;, []); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;div class=&quot;row&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;?php if ($published &gt;= 0) : ?&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;div class=&quot;form-group col-md-6&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;div class=&quot;controls&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">					&lt;?php echo LayoutHelper::render(&#x27;joomla.html.batch.item&#x27;, [&#x27;extension&#x27; =&gt; &#x27;com_foos&#x27;]); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;?php endif; ?&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;div class=&quot;form-group col-md-6&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;div class=&quot;controls&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;?php echo LayoutHelper::render(&#x27;joomla.html.batch.tag&#x27;, []); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;div class=&quot;row&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;div class=&quot;control-group&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;div class=&quot;controls&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">					&lt;?php echo LayoutHelper::render(&#x27;joomla.html.batch.user&#x27;, [&#x27;noUser&#x27; =&gt; $noUser]); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;div class=&quot;modal-footer&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;button class=&quot;btn btn-secondary&quot; type=&quot;button&quot; onclick=&quot;document.getElementById(&#x27;batch-category-id&#x27;).value=&#x27;&#x27;;document.getElementById(&#x27;batch-access&#x27;).value=&#x27;&#x27;;document.getElementById(&#x27;batch-language-id&#x27;).value=&#x27;&#x27;;document.getElementById(&#x27;batch-user-id&#x27;).value=&#x27;&#x27;;document.getElementById(&#x27;batch-tag-id&#x27;).value=&#x27;&#x27;&quot; data-dismiss=&quot;modal&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;?php echo Text::_(&#x27;JCANCEL&#x27;); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;&#x2F;button&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;button class=&quot;btn btn-primary&quot; type=&quot;submit&quot; onclick=&quot;Joomla.submitbutton(&#x27;foo.batch&#x27;);&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;?php echo Text::_(&#x27;JGLOBAL_BATCH_PROCESS&#x27;); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;&#x2F;button&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">&lt;&#x2F;div&gt;</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-605135" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/administrator/components/com_foos/tmpl/foos/default_batch_body.php</span>
    <span class="d2h-tag d2h-added d2h-added-tag">ADDED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -0,0 +1,32 @@</div>
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
            <span class="d2h-code-line-ctn">defined(&#x27;_JEXEC&#x27;) or die;</span>
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
            <span class="d2h-code-line-ctn">use Joomla\CMS\Layout\LayoutHelper;</span>
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
            <span class="d2h-code-line-ctn">$published = $this-&gt;state-&gt;get(&#x27;filter.published&#x27;);</span>
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
            <span class="d2h-code-line-ctn">$noUser    = true;</span>
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
            <span class="d2h-code-line-ctn">?&gt;</span>
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
            <span class="d2h-code-line-ctn">&lt;div class=&quot;container&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;div class=&quot;row&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;div class=&quot;form-group col-md-6&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;div class=&quot;controls&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;?php echo LayoutHelper::render(&#x27;joomla.html.batch.language&#x27;, []); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;div class=&quot;form-group col-md-6&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;div class=&quot;controls&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;?php echo LayoutHelper::render(&#x27;joomla.html.batch.access&#x27;, []); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;div class=&quot;row&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;?php if ($published &gt;= 0) : ?&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;div class=&quot;form-group col-md-6&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;div class=&quot;controls&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">					&lt;?php echo LayoutHelper::render(&#x27;joomla.html.batch.item&#x27;, [&#x27;extension&#x27; =&gt; &#x27;com_foos&#x27;]); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;?php endif; ?&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">&lt;&#x2F;div&gt;</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-318600" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/administrator/components/com_foos/tmpl/foos/default_batch_footer.php</span>
    <span class="d2h-tag d2h-added d2h-added-tag">ADDED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -0,0 +1,12 @@</div>
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
            <span class="d2h-code-line-ctn">defined(&#x27;_JEXEC&#x27;) or die;</span>
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
            <span class="d2h-code-line-ctn">use Joomla\CMS\Language\Text;</span>
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
            <span class="d2h-code-line-ctn">?&gt;</span>
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
            <span class="d2h-code-line-ctn">&lt;button type=&quot;button&quot; class=&quot;btn btn-secondary&quot; onclick=&quot;document.getElementById(&#x27;batch-category-id&#x27;).value=&#x27;&#x27;;document.getElementById(&#x27;batch-access&#x27;).value=&#x27;&#x27;;document.getElementById(&#x27;batch-language-id&#x27;).value=&#x27;&#x27;;document.getElementById(&#x27;batch-user-id&#x27;).value=&#x27;&#x27;;document.getElementById(&#x27;batch-tag-id&#x27;).value=&#x27;&#x27;&quot; data-dismiss=&quot;modal&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;?php echo Text::_(&#x27;JCANCEL&#x27;); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">&lt;&#x2F;button&gt;</span>
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
            <span class="d2h-code-line-ctn">&lt;button type=&quot;submit&quot; class=&quot;btn btn-success&quot; onclick=&quot;Joomla.submitbutton(&#x27;foo.batch&#x27;);&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;?php echo Text::_(&#x27;JGLOBAL_BATCH_PROCESS&#x27;); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">&lt;&#x2F;button&gt;</span>
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