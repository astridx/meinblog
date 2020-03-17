---
date: 2019-12-28
title: 'Joomla 4: Erweiterung erstellen - Teil 28 - Featured'
template: post
thumbnail: '../thumbnails/joomlatut.png'
slug: joomla-erweiterung-28
categories:
  - Entwicklung
tags:
  - Tutorial
  - Joomla 
---

Manche Items sind etwas Besonderes und für sie gibt es in Joomla! ein spezielles Attribut: `featured`. Dieser Teil der Artikelserie fügt `featured` zu unserer Komponente hinzu.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t22...t23) an und übernimm diese Änderungen in deine Entwicklungsversion.

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten. 

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation. 

2. Die Datenbank ist geändert worden, so dass es erforderlich ist, sie zu aktualisieren. Öffne den Bereich `System | Information | Database`, wie in Teil 16 beschrieben. Wähle deine Komponente aus und klicke auf `Update Structure`. 

![Joomla! Published](../images/j4x16x1.png)

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. Die Liste enthält eine Spalte die mit `featured` überschrieben ist.

![Joomla! Featured](../images/j4x28x2.png)

3. Öffne ein Item in der Bearbeitungsansicht und überzeuge dich davon, dass du hier das Attribut `featured` zum Bearbeiten angeboten bekommst.

![Joomla! Featured](../images/j4x28x2.png)

4. Lege einen Menüpunkt vom Type `featured` an.

![Joomla! Featured](../images/j4x28x3.png)

5. Wechsele ins Frontend und stelle sicher, dass unter dem Menüpunkt `featured` ausschließlich Items angezeigt werden, bei denen das Attribut gesetzt ist. 

![Joomla! Featured](../images/j4x28x4.png)

## Geänderte Dateien

### Übersicht

<div id="diff">
      <div class="d2h-file-list-wrapper">
    <div class="d2h-file-list-header">
        <span class="d2h-file-list-title">Files changed (15)</span>
        <a class="d2h-file-switch d2h-hide">hide</a>
        <a class="d2h-file-switch d2h-show">show</a>
    </div>
    <ol class="d2h-file-list">
    <li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-changed" height="16" title="modified" version="1.1"
           viewBox="0 0 14 16" width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path>
      </svg>      <a href="#d2h-861015" class="d2h-file-name">src/administrator/components/com_foos/forms/foo.xml</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+11</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-changed" height="16" title="modified" version="1.1"
           viewBox="0 0 14 16" width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path>
      </svg>      <a href="#d2h-929815" class="d2h-file-name">src/administrator/components/com_foos/sql/install.mysql.utf8.sql</a>
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
      </svg>      <a href="#d2h-634673" class="d2h-file-name">src/administrator/components/com_foos/sql/updates/mysql/24.0.0.sql</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+3</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-changed" height="16" title="modified" version="1.1"
           viewBox="0 0 14 16" width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path>
      </svg>      <a href="#d2h-266525" class="d2h-file-name">src/administrator/components/com_foos/src/Controller/FoosController.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+63</span>
          <span class="d2h-lines-deleted">-2</span>
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
          <span class="d2h-lines-added">+55</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-changed" height="16" title="modified" version="1.1"
           viewBox="0 0 14 16" width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path>
      </svg>      <a href="#d2h-841411" class="d2h-file-name">src/administrator/components/com_foos/src/Model/FoosModel.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+11</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-changed" height="16" title="modified" version="1.1"
           viewBox="0 0 14 16" width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path>
      </svg>      <a href="#d2h-125543" class="d2h-file-name">src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+36</span>
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
          <span class="d2h-lines-added">+10</span>
          <span class="d2h-lines-deleted">-0</span>
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
          <span class="d2h-lines-added">+9</span>
          <span class="d2h-lines-deleted">-3</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-added" height="16" title="added" version="1.1" viewBox="0 0 14 16"
           width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>
      </svg>      <a href="#d2h-908514" class="d2h-file-name">src/components/com_foos/src/Model/FeaturedModel.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+199</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-added" height="16" title="added" version="1.1" viewBox="0 0 14 16"
           width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>
      </svg>      <a href="#d2h-777650" class="d2h-file-name">src/components/com_foos/src/View/Featured/HtmlView.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+200</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-added" height="16" title="added" version="1.1" viewBox="0 0 14 16"
           width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>
      </svg>      <a href="#d2h-075470" class="d2h-file-name">src/components/com_foos/tmpl/featured/default.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+35</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-added" height="16" title="added" version="1.1" viewBox="0 0 14 16"
           width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>
      </svg>      <a href="#d2h-083309" class="d2h-file-name">src/components/com_foos/tmpl/featured/default.xml</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+48</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-added" height="16" title="added" version="1.1" viewBox="0 0 14 16"
           width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>
      </svg>      <a href="#d2h-511281" class="d2h-file-name">src/components/com_foos/tmpl/featured/default_items.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+80</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
    </ol>
</div><div class="d2h-wrapper">
    <div id="d2h-861015" class="d2h-file-wrapper" data-lang="xml">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/administrator/components/com_foos/forms/foo.xml</span>
    <span class="d2h-tag d2h-changed d2h-changed-tag">CHANGED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -39,6 +39,17 @@</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">39</div>
<div class="line-num2">39</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">			&lt;option value=&quot;*&quot;&gt;JALL&lt;&#x2F;option&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;&#x2F;field&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;field</span>
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
            <span class="d2h-code-line-ctn">			name=&quot;featured&quot;</span>
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
            <span class="d2h-code-line-ctn">			type=&quot;radio&quot;</span>
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
            <span class="d2h-code-line-ctn">			class=&quot;switcher&quot;</span>
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
            <span class="d2h-code-line-ctn">			label=&quot;JFEATURED&quot;</span>
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
            <span class="d2h-code-line-ctn">			default=&quot;0&quot;</span>
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
            <span class="d2h-code-line-ctn">			&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;option value=&quot;0&quot;&gt;JNO&lt;&#x2F;option&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;option value=&quot;1&quot;&gt;JYES&lt;&#x2F;option&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;&#x2F;field&gt;</span>
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
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">42</div>
<div class="line-num2">53</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		&lt;field</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">43</div>
<div class="line-num2">54</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">			name=&quot;published&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">44</div>
<div class="line-num2">55</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">			type=&quot;list&quot;</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-929815" class="d2h-file-wrapper" data-lang="sql">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/administrator/components/com_foos/sql/install.mysql.utf8.sql</span>
    <span class="d2h-tag d2h-changed d2h-changed-tag">CHANGED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -42,3 +42,6 @@ ALTER TABLE `#__foos_details` ADD COLUMN `checked_out_time` datetime AFTER `alia</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">42</div>
<div class="line-num2">42</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">43</div>
<div class="line-num2">43</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">ALTER TABLE `#__foos_details` ADD KEY `idx_checkout` (`checked_out`);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">44</div>
<div class="line-num2">44</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
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
            <span class="d2h-code-line-ctn">ALTER TABLE `#__foos_details` ADD COLUMN  `featured` tinyint(3) unsigned NOT NULL DEFAULT 0 COMMENT &#x27;Set if contact is featured.&#x27;;</span>
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
            <span class="d2h-code-line-ctn">ALTER TABLE `#__foos_details` ADD KEY `idx_featured_catid` (`featured`,`catid`);</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-634673" class="d2h-file-wrapper" data-lang="sql">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/administrator/components/com_foos/sql/updates/mysql/24.0.0.sql</span>
    <span class="d2h-tag d2h-added d2h-added-tag">ADDED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -0,0 +1,3 @@</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">1</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">ALTER TABLE `#__foos_details` ADD COLUMN  `featured` tinyint(3) unsigned NOT NULL DEFAULT 0 COMMENT &#x27;Set if contact is featured.&#x27;;</span>
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
            <span class="d2h-code-line-ctn">ALTER TABLE `#__foos_details` ADD KEY `idx_featured_catid` (`featured`,`catid`);</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-266525" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/administrator/components/com_foos/src/Controller/FoosController.php</span>
    <span class="d2h-tag d2h-changed d2h-changed-tag">CHANGED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -9,13 +9,15 @@</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">9</div>
<div class="line-num2">9</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
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
            <span class="d2h-code-line-ctn">namespace Joomla\Component\Foos\Administrator\Controller;</span>
        </div>
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
            <span class="d2h-code-line-ctn">use Joomla\Utilities\ArrayHelper;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">12</div>
<div class="line-num2">16</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Application\CMSApplication;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">13</div>
<div class="line-num2">17</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\MVC\Controller\AdminController;</span>
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
            <span class="d2h-code-line-ctn">use Joomla\CMS\MVC\Factory\MVCFactoryInterface;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">15</div>
<div class="line-num2">19</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">use Joomla\Input\Input;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">16</div>
<div class="line-num2">20</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-del">
      <div class="line-num1">17</div>
<div class="line-num2"></div>
    </td>
    <td class="d2h-del">
        <div class="d2h-code-line d2h-del">
            <span class="d2h-code-line-prefix">-</span>
            <span class="d2h-code-line-ctn">defined(&#x27;_JEXEC&#x27;) or die;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-del">
      <div class="line-num1">18</div>
<div class="line-num2"></div>
    </td>
    <td class="d2h-del">
        <div class="d2h-code-line d2h-del">
            <span class="d2h-code-line-prefix">-</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">19</div>
<div class="line-num2">21</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">20</div>
<div class="line-num2">22</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn"> * Contacts list controller class.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">21</div>
<div class="line-num2">23</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn"> *</span>
        </div>
    </td>
</tr>
<tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -38,6 +40,65 @@ class FoosController extends AdminController</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">38</div>
<div class="line-num2">40</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	public function __construct($config = array(), MVCFactoryInterface $factory = null, $app = null, $input = null)</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">39</div>
<div class="line-num2">41</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	{</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">40</div>
<div class="line-num2">42</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		parent::__construct($config, $factory, $app, $input);</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;registerTask(&#x27;unfeatured&#x27;,	&#x27;featured&#x27;);</span>
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
            <span class="d2h-code-line-ctn">	}</span>
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
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
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
            <span class="d2h-code-line-ctn">	 * Method to toggle the featured setting of a list of foos.</span>
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
            <span class="d2h-code-line-ctn">	 * @return  void</span>
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
            <span class="d2h-code-line-ctn">	 * @since   __BUMP_VERSION__</span>
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
            <span class="d2h-code-line-ctn">	public function featured()</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Check for request forgeries</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;checkToken();</span>
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
            <span class="d2h-code-line-ctn">		$ids    = $this-&gt;input-&gt;get(&#x27;cid&#x27;, array(), &#x27;array&#x27;);</span>
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
            <span class="d2h-code-line-ctn">		$values = array(&#x27;featured&#x27; =&gt; 1, &#x27;unfeatured&#x27; =&gt; 0);</span>
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
            <span class="d2h-code-line-ctn">		$task   = $this-&gt;getTask();</span>
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
            <span class="d2h-code-line-ctn">		$value  = ArrayHelper::getValue($values, $task, 0, &#x27;int&#x27;);</span>
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
            <span class="d2h-code-line-ctn">		$model  = $this-&gt;getModel();</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Access checks.</span>
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
            <span class="d2h-code-line-ctn">		foreach ($ids as $i =&gt; $id)</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			$item = $model-&gt;getItem($id);</span>
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
            <span class="d2h-code-line-ctn">			if (!$this-&gt;app-&gt;getIdentity()-&gt;authorise(&#x27;core.edit.state&#x27;, &#x27;com_foos.category.&#x27; . (int) $item-&gt;catid))</span>
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
            <span class="d2h-code-line-ctn">			{</span>
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
            <span class="d2h-code-line-ctn">				&#x2F;&#x2F; Prune items that you can&#x27;t change.</span>
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
            <span class="d2h-code-line-ctn">				unset($ids[$i]);</span>
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
            <span class="d2h-code-line-ctn">				$this-&gt;app-&gt;enqueueMessage(Text::_(&#x27;JLIB_APPLICATION_ERROR_EDITSTATE_NOT_PERMITTED&#x27;), &#x27;notice&#x27;);</span>
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
            <span class="d2h-code-line-ctn">			}</span>
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
            <span class="d2h-code-line-ctn">		}</span>
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
            <span class="d2h-code-line-ctn">		if (empty($ids))</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			$this-&gt;app-&gt;enqueueMessage(Text::_(&#x27;COM_FOOS_NO_ITEM_SELECTED&#x27;), &#x27;warning&#x27;);</span>
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
            <span class="d2h-code-line-ctn">		}</span>
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
            <span class="d2h-code-line-ctn">		else</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			&#x2F;&#x2F; Publish the items.</span>
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
            <span class="d2h-code-line-ctn">			if (!$model-&gt;featured($ids, $value))</span>
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
            <span class="d2h-code-line-ctn">				$this-&gt;app-&gt;enqueueMessage($model-&gt;getError(), &#x27;warning&#x27;);</span>
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
            <span class="d2h-code-line-ctn">			if ($value == 1)</span>
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
            <span class="d2h-code-line-ctn">			{</span>
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
            <span class="d2h-code-line-ctn">				$message = Text::plural(&#x27;COM_FOOS_N_ITEMS_FEATURED&#x27;, count($ids));</span>
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
            <span class="d2h-code-line-ctn">			}</span>
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
            <span class="d2h-code-line-ctn">			else</span>
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
            <span class="d2h-code-line-ctn">				$message = Text::plural(&#x27;COM_FOOS_N_ITEMS_UNFEATURED&#x27;, count($ids));</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;setRedirect(&#x27;index.php?option=com_foos&amp;view=foos&#x27;, $message);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">41</div>
<div class="line-num2">102</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">42</div>
<div class="line-num2">103</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">43</div>
<div class="line-num2">104</div>
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
        <div class="d2h-code-line d2h-info">@@ -15,6 +15,8 @@ use Joomla\CMS\Factory;</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">15</div>
<div class="line-num2">15</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Language\Associations;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">16</div>
<div class="line-num2">16</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\MVC\Model\AdminModel;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">17</div>
<div class="line-num2">17</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Language\LanguageHelper;</span>
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
            <span class="d2h-code-line-ctn">use Joomla\Database\ParameterType;</span>
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
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">18</div>
<div class="line-num2">20</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">19</div>
<div class="line-num2">21</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">20</div>
<div class="line-num2">22</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn"> * Item Model for a Foo.</span>
        </div>
    </td>
</tr>
<tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -131,6 +133,59 @@ class FooModel extends AdminModel</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">131</div>
<div class="line-num2">133</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		return $item;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">132</div>
<div class="line-num2">134</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">133</div>
<div class="line-num2">135</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
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
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
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
            <span class="d2h-code-line-ctn">	 * Method to toggle the featured setting of foos.</span>
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
            <span class="d2h-code-line-ctn">	 *</span>
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
            <span class="d2h-code-line-ctn">	 * @param   array    $pks    The ids of the items to toggle.</span>
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
            <span class="d2h-code-line-ctn">	 * @param   integer  $value  The value to toggle to.</span>
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
            <span class="d2h-code-line-ctn">	 *</span>
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
            <span class="d2h-code-line-ctn">	 * @return  boolean  True on success.</span>
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
            <span class="d2h-code-line-ctn">	 * @since   __BUMP_VERSION__</span>
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
            <span class="d2h-code-line-ctn">	public function featured($pks, $value = 0)</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Sanitize the ids.</span>
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
            <span class="d2h-code-line-ctn">		$pks = ArrayHelper::toInteger((array) $pks);</span>
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
            <span class="d2h-code-line-ctn">		if (empty($pks))</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			$this-&gt;setError(Text::_(&#x27;COM_FOOS_NO_ITEM_SELECTED&#x27;));</span>
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
            <span class="d2h-code-line-ctn">			return false;</span>
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
            <span class="d2h-code-line-ctn">		$table = $this-&gt;getTable();</span>
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
            <span class="d2h-code-line-ctn">		try</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			$db = $this-&gt;getDbo();</span>
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
            <span class="d2h-code-line-ctn">			$query = $db-&gt;getQuery(true);</span>
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
            <span class="d2h-code-line-ctn">			$query-&gt;update($db-&gt;quoteName(&#x27;#__foos_details&#x27;));</span>
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
            <span class="d2h-code-line-ctn">			$query-&gt;set($db-&gt;quoteName(&#x27;featured&#x27;) . &#x27; = :featured&#x27;);</span>
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
            <span class="d2h-code-line-ctn">			$query-&gt;whereIn($db-&gt;quoteName(&#x27;id&#x27;), $pks);</span>
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
            <span class="d2h-code-line-ctn">			$query-&gt;bind(&#x27;:featured&#x27;, $value, ParameterType::INTEGER);</span>
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
            <span class="d2h-code-line-ctn">			$db-&gt;setQuery($query);</span>
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
            <span class="d2h-code-line-ctn">			$db-&gt;execute();</span>
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
            <span class="d2h-code-line-ctn">		}</span>
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
            <span class="d2h-code-line-ctn">		catch (\Exception $e)</span>
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
            <span class="d2h-code-line-ctn">			$this-&gt;setError($e-&gt;getMessage());</span>
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
            <span class="d2h-code-line-ctn">			return false;</span>
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
            <span class="d2h-code-line-ctn">		}</span>
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
            <span class="d2h-code-line-ctn">		$table-&gt;reorder();</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Clean component&#x27;s cache</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;cleanCache();</span>
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
            <span class="d2h-code-line-ctn">		return true;</span>
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
            <span class="d2h-code-line-ctn">	}</span>
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
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">134</div>
<div class="line-num2">189</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">135</div>
<div class="line-num2">190</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	 * Preprocess the form.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">136</div>
<div class="line-num2">191</div>
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
<div id="d2h-841411" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/administrator/components/com_foos/src/Model/FoosModel.php</span>
    <span class="d2h-tag d2h-changed d2h-changed-tag">CHANGED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -46,6 +46,7 @@ class FoosModel extends ListModel</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">46</div>
<div class="line-num2">46</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">				&#x27;published&#x27;, &#x27;a.published&#x27;,</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">47</div>
<div class="line-num2">47</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">				&#x27;access&#x27;, &#x27;a.access&#x27;, &#x27;access_level&#x27;,</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">48</div>
<div class="line-num2">48</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">				&#x27;ordering&#x27;, &#x27;a.ordering&#x27;,</span>
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
            <span class="d2h-code-line-ctn">				&#x27;featured&#x27;, &#x27;a.featured&#x27;,</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">49</div>
<div class="line-num2">50</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">				&#x27;language&#x27;, &#x27;a.language&#x27;, &#x27;language_title&#x27;,</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">50</div>
<div class="line-num2">51</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">				&#x27;publish_up&#x27;, &#x27;a.publish_up&#x27;,</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">51</div>
<div class="line-num2">52</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">				&#x27;publish_down&#x27;, &#x27;a.publish_down&#x27;,</span>
        </div>
    </td>
</tr>
<tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -61,6 +62,7 @@ class FoosModel extends ListModel</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">61</div>
<div class="line-num2">62</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">62</div>
<div class="line-num2">63</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		parent::__construct($config);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">63</div>
<div class="line-num2">64</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	}</span>
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
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">64</div>
<div class="line-num2">66</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">65</div>
<div class="line-num2">67</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	 * Build an SQL query to load the list data.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">66</div>
<div class="line-num2">68</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	 *</span>
        </div>
    </td>
</tr>
<tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -87,6 +89,7 @@ class FoosModel extends ListModel</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">87</div>
<div class="line-num2">89</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">						&#x27;, a.checked_out_time&#x27; .</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">88</div>
<div class="line-num2">90</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">						&#x27;, a.language&#x27; .</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">89</div>
<div class="line-num2">91</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">						&#x27;, a.ordering&#x27; .</span>
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
            <span class="d2h-code-line-ctn">						&#x27;, a.featured&#x27; .</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">90</div>
<div class="line-num2">93</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">						&#x27;, a.state&#x27; .</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">91</div>
<div class="line-num2">94</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">						&#x27;, a.published&#x27; .</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">92</div>
<div class="line-num2">95</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">						&#x27;, a.publish_up, a.publish_down&#x27;</span>
        </div>
    </td>
</tr>
<tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -197,6 +200,14 @@ class FoosModel extends ListModel</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">197</div>
<div class="line-num2">200</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">			}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">198</div>
<div class="line-num2">201</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">199</div>
<div class="line-num2">202</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Filter by featured.</span>
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
            <span class="d2h-code-line-ctn">		$featured = (string) $this-&gt;getState(&#x27;filter.featured&#x27;);</span>
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
            <span class="d2h-code-line-ctn">		if (in_array($featured, [&#x27;0&#x27;,&#x27;1&#x27;]))</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			$query-&gt;where($db-&gt;quoteName(&#x27;a.featured&#x27;) . &#x27; = &#x27; . (int) $featured);</span>
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
            <span class="d2h-code-line-ctn">		}</span>
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
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">200</div>
<div class="line-num2">211</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Add the list ordering clause.</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">201</div>
<div class="line-num2">212</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		$orderCol = $this-&gt;state-&gt;get(&#x27;list.ordering&#x27;, &#x27;a.name&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">202</div>
<div class="line-num2">213</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		$orderDirn = $this-&gt;state-&gt;get(&#x27;list.direction&#x27;, &#x27;asc&#x27;);</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-125543" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php</span>
    <span class="d2h-tag d2h-changed d2h-changed-tag">CHANGED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -16,6 +16,7 @@ use Joomla\CMS\Language\Associations;</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">16</div>
<div class="line-num2">16</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Language\Text;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">17</div>
<div class="line-num2">17</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Layout\LayoutHelper;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">18</div>
<div class="line-num2">18</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">use Joomla\CMS\Router\Route;</span>
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
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">19</div>
<div class="line-num2">20</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
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
            <span class="d2h-code-line-ctn">&#x2F;**</span>
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
            <span class="d2h-code-line-ctn"> * Foo HTML class.</span>
        </div>
    </td>
</tr>
<tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -88,6 +89,41 @@ class AdministratorService</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">88</div>
<div class="line-num2">89</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">			$html = LayoutHelper::render(&#x27;joomla.content.associations&#x27;, $items);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">89</div>
<div class="line-num2">90</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">90</div>
<div class="line-num2">91</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
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
            <span class="d2h-code-line-ctn">		return $html;</span>
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
            <span class="d2h-code-line-ctn">	 * Show the featured&#x2F;not-featured icon.</span>
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
            <span class="d2h-code-line-ctn">	 * @param   integer  $value      The featured value.</span>
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
            <span class="d2h-code-line-ctn">	 * @param   integer  $i          Id of the item.</span>
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
            <span class="d2h-code-line-ctn">	 * @param   boolean  $canChange  Whether the value can be changed or not.</span>
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
            <span class="d2h-code-line-ctn">	 * @return  string	The anchor tag to toggle featured&#x2F;unfeatured foos.</span>
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
            <span class="d2h-code-line-ctn">	 *</span>
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
            <span class="d2h-code-line-ctn">	 * @since   __BUMP_VERSION__</span>
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
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
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
            <span class="d2h-code-line-ctn">	public function featured($value, $i, $canChange = true)</span>
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
            <span class="d2h-code-line-ctn">	{</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Array of image, task, title, action</span>
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
            <span class="d2h-code-line-ctn">		$states = array(</span>
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
            <span class="d2h-code-line-ctn">			0 =&gt; array(&#x27;unfeatured&#x27;, &#x27;foos.featured&#x27;, &#x27;COM_FOOS_UNFEATURED&#x27;, &#x27;JGLOBAL_TOGGLE_FEATURED&#x27;),</span>
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
            <span class="d2h-code-line-ctn">			1 =&gt; array(&#x27;featured&#x27;, &#x27;foos.unfeatured&#x27;, &#x27;JFEATURED&#x27;, &#x27;JGLOBAL_TOGGLE_FEATURED&#x27;),</span>
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
            <span class="d2h-code-line-ctn">		);</span>
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
            <span class="d2h-code-line-ctn">		$state = ArrayHelper::getValue($states, (int) $value, $states[1]);</span>
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
            <span class="d2h-code-line-ctn">		$icon  = $state[0];</span>
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
            <span class="d2h-code-line-ctn">		if ($canChange)</span>
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
            <span class="d2h-code-line-ctn">			$html = &#x27;&lt;a href=&quot;#&quot; onclick=&quot;return Joomla.listItemTask(\&#x27;cb&#x27; . $i . &#x27;\&#x27;,\&#x27;&#x27; . $state[1] . &#x27;\&#x27;)&quot; class=&quot;tbody-icon&#x27;</span>
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
            <span class="d2h-code-line-ctn">				. ($value == 1 ? &#x27; active&#x27; : &#x27;&#x27;) . &#x27;&quot; title=&quot;&#x27; . Text::_($state[3])</span>
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
            <span class="d2h-code-line-ctn">				. &#x27;&quot;&gt;&lt;span class=&quot;icon-&#x27; . $icon . &#x27;&quot; aria-hidden=&quot;true&quot;&gt;&lt;&#x2F;span&gt;&lt;&#x2F;a&gt;&#x27;;</span>
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
            <span class="d2h-code-line-ctn">		else</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			$html = &#x27;&lt;a class=&quot;tbody-icon disabled&#x27; . ($value == 1 ? &#x27; active&#x27; : &#x27;&#x27;)</span>
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
            <span class="d2h-code-line-ctn">				. &#x27;&quot; title=&quot;&#x27; . Text::_($state[2]) . &#x27;&quot;&gt;&lt;span class=&quot;icon-&#x27; . $icon . &#x27;&quot; aria-hidden=&quot;true&quot;&gt;&lt;&#x2F;span&gt;&lt;&#x2F;a&gt;&#x27;;</span>
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
            <span class="d2h-code-line-ctn">		}</span>
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
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">91</div>
<div class="line-num2">127</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		return $html;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">92</div>
<div class="line-num2">128</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">93</div>
<div class="line-num2">129</div>
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
        <div class="d2h-code-line d2h-info">@@ -164,6 +164,16 @@ class HtmlView extends BaseHtmlView</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">164</div>
<div class="line-num2">164</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">			$childBar = $dropdown-&gt;getChildToolbar();</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">165</div>
<div class="line-num2">165</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">			$childBar-&gt;publish(&#x27;foos.publish&#x27;)-&gt;listCheck(true);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">166</div>
<div class="line-num2">166</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">			$childBar-&gt;unpublish(&#x27;foos.unpublish&#x27;)-&gt;listCheck(true);</span>
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
            <span class="d2h-code-line-ctn">			$childBar-&gt;standardButton(&#x27;featured&#x27;)</span>
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
            <span class="d2h-code-line-ctn">				-&gt;text(&#x27;JFEATURE&#x27;)</span>
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
            <span class="d2h-code-line-ctn">				-&gt;task(&#x27;foos.featured&#x27;)</span>
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
            <span class="d2h-code-line-ctn">				-&gt;listCheck(true);</span>
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
            <span class="d2h-code-line-ctn">			$childBar-&gt;standardButton(&#x27;unfeatured&#x27;)</span>
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
            <span class="d2h-code-line-ctn">				-&gt;text(&#x27;JUNFEATURE&#x27;)</span>
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
            <span class="d2h-code-line-ctn">				-&gt;task(&#x27;foos.unfeatured&#x27;)</span>
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
            <span class="d2h-code-line-ctn">				-&gt;listCheck(true);</span>
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
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">167</div>
<div class="line-num2">177</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">			$childBar-&gt;archive(&#x27;foos.archive&#x27;)-&gt;listCheck(true);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">168</div>
<div class="line-num2">178</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">169</div>
<div class="line-num2">179</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">			if ($user-&gt;authorise(&#x27;core.admin&#x27;))</span>
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
        <div class="d2h-code-line d2h-info">@@ -51,6 +51,7 @@ $tmpl    = $isModal || $input->get('tmpl', '', 'cmd') === 'component' ? '&tmpl=c</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">51</div>
<div class="line-num2">51</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">						&lt;?php echo $this-&gt;getForm()-&gt;renderField(&#x27;publish_down&#x27;); ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">52</div>
<div class="line-num2">52</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">						&lt;?php echo $this-&gt;getForm()-&gt;renderField(&#x27;catid&#x27;); ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">53</div>
<div class="line-num2">53</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">						&lt;?php echo $this-&gt;getForm()-&gt;renderField(&#x27;language&#x27;); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">						&lt;?php echo $this-&gt;getForm()-&gt;renderField(&#x27;featured&#x27;); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">					&lt;&#x2F;div&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">55</div>
<div class="line-num2">56</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">				&lt;&#x2F;div&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">56</div>
<div class="line-num2">57</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">			&lt;&#x2F;div&gt;</span>
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
        <div class="d2h-code-line d2h-info">@@ -57,6 +57,9 @@ if ($saveOrder && !empty($this->items))</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">57</div>
<div class="line-num2">57</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">								&lt;th scope=&quot;col&quot; style=&quot;width:1%&quot; class=&quot;text-center d-none d-md-table-cell&quot;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">58</div>
<div class="line-num2">58</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">									&lt;?php echo HTMLHelper::_(&#x27;searchtools.sort&#x27;, &#x27;COM_FOOS_TABLE_TABLEHEAD_NAME&#x27;, &#x27;a.name&#x27;, $listDirn, $listOrder); ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">59</div>
<div class="line-num2">59</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">								&lt;&#x2F;th&gt;</span>
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
            <span class="d2h-code-line-ctn">								&lt;th scope=&quot;col&quot; style=&quot;width:1%&quot; class=&quot;text-center&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">									&lt;?php echo HTMLHelper::_(&#x27;searchtools.sort&#x27;, &#x27;JFEATURED&#x27;, &#x27;a.featured&#x27;, $listDirn, $listOrder); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">								&lt;&#x2F;th&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">60</div>
<div class="line-num2">63</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">								&lt;th scope=&quot;col&quot; style=&quot;width:10%&quot; class=&quot;d-none d-md-table-cell&quot;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">61</div>
<div class="line-num2">64</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">									&lt;?php echo HTMLHelper::_(&#x27;searchtools.sort&#x27;, &#x27;JGRID_HEADING_ACCESS&#x27;, &#x27;access_level&#x27;, $listDirn, $listOrder); ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">62</div>
<div class="line-num2">65</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">								&lt;&#x2F;th&gt;</span>
        </div>
    </td>
</tr>
<tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -123,14 +126,17 @@ if ($saveOrder && !empty($this->items))</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">123</div>
<div class="line-num2">126</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">									&lt;&#x2F;div&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">124</div>
<div class="line-num2">127</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">								&lt;&#x2F;th&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">125</div>
<div class="line-num2">128</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">								&lt;td class=&quot;text-center&quot;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-del d2h-change">
      <div class="line-num1">126</div>
<div class="line-num2"></div>
    </td>
    <td class="d2h-del d2h-change">
        <div class="d2h-code-line d2h-del d2h-change">
            <span class="d2h-code-line-prefix">-</span>
            <span class="d2h-code-line-ctn">									&lt;?php </span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-del">
      <div class="line-num1">127</div>
<div class="line-num2"></div>
    </td>
    <td class="d2h-del">
        <div class="d2h-code-line d2h-del">
            <span class="d2h-code-line-prefix">-</span>
            <span class="d2h-code-line-ctn">									echo HTMLHelper::_(&#x27;jgrid.published&#x27;, $item-&gt;published, $i, &#x27;foos.&#x27;, $canChange, &#x27;cb&#x27;, $item-&gt;publish_up, $item-&gt;publish_down); </span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-del">
      <div class="line-num1">128</div>
<div class="line-num2"></div>
    </td>
    <td class="d2h-del">
        <div class="d2h-code-line d2h-del">
            <span class="d2h-code-line-prefix">-</span>
            <span class="d2h-code-line-ctn">									?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins d2h-change">
      <div class="line-num1"></div>
<div class="line-num2">129</div>
    </td>
    <td class="d2h-ins d2h-change">
        <div class="d2h-code-line d2h-ins d2h-change">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">									&lt;?php <ins>echo HTMLHelper::_(&#x27;foosadministrator.featured&#x27;, $item-&gt;featured, $i, $canChange); ?&gt;</ins></span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">129</div>
<div class="line-num2">130</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">								&lt;&#x2F;td&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">130</div>
<div class="line-num2">131</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">								&lt;td class=&quot;small d-none d-md-table-cell&quot;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">131</div>
<div class="line-num2">132</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">									&lt;?php echo $item-&gt;access_level; ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">132</div>
<div class="line-num2">133</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">								&lt;&#x2F;td&gt;</span>
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
            <span class="d2h-code-line-ctn">								&lt;td class=&quot;text-center&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">									&lt;?php </span>
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
            <span class="d2h-code-line-ctn">									echo HTMLHelper::_(&#x27;jgrid.published&#x27;, $item-&gt;published, $i, &#x27;foos.&#x27;, $canChange, &#x27;cb&#x27;, $item-&gt;publish_up, $item-&gt;publish_down); </span>
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
            <span class="d2h-code-line-ctn">									?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">133</div>
<div class="line-num2">138</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
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
            <span class="d2h-code-line-ctn">								&lt;&#x2F;td&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">134</div>
<div class="line-num2">140</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">								&lt;?php if ($assoc) : ?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">135</div>
<div class="line-num2">141</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">								&lt;td class=&quot;d-none d-md-table-cell&quot;&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">136</div>
<div class="line-num2">142</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">									&lt;?php if ($item-&gt;association) : ?&gt;</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-908514" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/components/com_foos/src/Model/FeaturedModel.php</span>
    <span class="d2h-tag d2h-added d2h-added-tag">ADDED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -0,0 +1,199 @@</div>
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
            <span class="d2h-code-line-ctn">namespace Joomla\Component\Foos\Site\Model;</span>
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
            <span class="d2h-code-line-ctn">use Joomla\CMS\Component\ComponentHelper;</span>
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
            <span class="d2h-code-line-ctn">use Joomla\CMS\MVC\Model\ListModel;</span>
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
            <span class="d2h-code-line-ctn">use Joomla\Database\ParameterType;</span>
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
            <span class="d2h-code-line-ctn">use Joomla\Registry\Registry;</span>
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
            <span class="d2h-code-line-ctn"> * Featured foos model class.</span>
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
            <span class="d2h-code-line-ctn"> * @since  __BUMP_VERSION__</span>
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
            <span class="d2h-code-line-ctn">class FeaturedModel extends ListModel</span>
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
            <span class="d2h-code-line-ctn">	 * Constructor.</span>
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
            <span class="d2h-code-line-ctn">	 * @param   array  $config  An optional associative array of configuration settings.</span>
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
            <span class="d2h-code-line-ctn">	 *</span>
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
            <span class="d2h-code-line-ctn">	 * @since   __BUMP_VERSION__</span>
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
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
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
            <span class="d2h-code-line-ctn">	public function __construct($config = array())</span>
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
            <span class="d2h-code-line-ctn">	{</span>
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
            <span class="d2h-code-line-ctn">		if (empty($config[&#x27;filter_fields&#x27;]))</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			$config[&#x27;filter_fields&#x27;] = array(</span>
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
            <span class="d2h-code-line-ctn">				&#x27;id&#x27;, &#x27;a.id&#x27;,</span>
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
            <span class="d2h-code-line-ctn">				&#x27;name&#x27;, &#x27;a.name&#x27;,</span>
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
            <span class="d2h-code-line-ctn">				&#x27;ordering&#x27;, &#x27;a.ordering&#x27;,</span>
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
            <span class="d2h-code-line-ctn">			);</span>
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
            <span class="d2h-code-line-ctn">		}</span>
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
            <span class="d2h-code-line-ctn">		parent::__construct($config);</span>
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
            <span class="d2h-code-line-ctn">	}</span>
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
            <span class="d2h-code-line-ctn">	 * Method to get a list of items.</span>
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
            <span class="d2h-code-line-ctn">	 * @return  mixed  An array of objects on success, false on failure.</span>
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
            <span class="d2h-code-line-ctn">	public function getItems()</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Invoke the parent getItems method to get the main list</span>
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
            <span class="d2h-code-line-ctn">		$items = parent::getItems();</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Convert the params field into an object, saving original in _params</span>
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
            <span class="d2h-code-line-ctn">		for ($i = 0, $n = count($items); $i &lt; $n; $i++)</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			$item = &amp;$items[$i];</span>
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
            <span class="d2h-code-line-ctn">			if (!isset($this-&gt;_params))</span>
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
            <span class="d2h-code-line-ctn">				$item-&gt;params = new Registry($item-&gt;params);</span>
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
            <span class="d2h-code-line-ctn">			}</span>
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
            <span class="d2h-code-line-ctn">		return $items;</span>
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
            <span class="d2h-code-line-ctn">	}</span>
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
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
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
            <span class="d2h-code-line-ctn">	 * Method to build an SQL query to load the list data.</span>
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
            <span class="d2h-code-line-ctn">	 *</span>
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
            <span class="d2h-code-line-ctn">	 * @return  string    An SQL query</span>
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
            <span class="d2h-code-line-ctn">	 *</span>
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
            <span class="d2h-code-line-ctn">	 * @since   __BUMP_VERSION__</span>
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
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
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
            <span class="d2h-code-line-ctn">	protected function getListQuery()</span>
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
            <span class="d2h-code-line-ctn">	{</span>
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
            <span class="d2h-code-line-ctn">		$user = Factory::getUser();</span>
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
            <span class="d2h-code-line-ctn">		$groups = $user-&gt;getAuthorisedViewLevels();</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Create a new query object.</span>
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
            <span class="d2h-code-line-ctn">		$db    = $this-&gt;getDbo();</span>
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
            <span class="d2h-code-line-ctn">		$query = $db-&gt;getQuery(true);</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Select required fields from the categories.</span>
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
            <span class="d2h-code-line-ctn">		$query-&gt;select($this-&gt;getState(&#x27;list.select&#x27;, &#x27;a.*&#x27;))</span>
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
            <span class="d2h-code-line-ctn">			-&gt;from($db-&gt;quoteName(&#x27;#__foos_details&#x27;, &#x27;a&#x27;))</span>
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
            <span class="d2h-code-line-ctn">			-&gt;where($db-&gt;quoteName(&#x27;a.featured&#x27;) . &#x27; = 1&#x27;)</span>
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
            <span class="d2h-code-line-ctn">			-&gt;whereIn($db-&gt;quoteName(&#x27;a.access&#x27;), $groups)</span>
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
            <span class="d2h-code-line-ctn">			-&gt;innerJoin($db-&gt;quoteName(&#x27;#__categories&#x27;, &#x27;c&#x27;) . &#x27; ON c.id = a.catid&#x27;)</span>
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
            <span class="d2h-code-line-ctn">			-&gt;whereIn($db-&gt;quoteName(&#x27;c.access&#x27;), $groups);</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Filter by category.</span>
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
            <span class="d2h-code-line-ctn">		if ($categoryId = $this-&gt;getState(&#x27;category.id&#x27;))</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			$query-&gt;where($db-&gt;quoteName(&#x27;a.catid&#x27;) . &#x27; = :catid&#x27;);</span>
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
            <span class="d2h-code-line-ctn">			$query-&gt;bind(&#x27;:catid&#x27;, $categoryId, ParameterType::INTEGER);</span>
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
            <span class="d2h-code-line-ctn">		$query-&gt;select(&#x27;c.published as cat_published, c.published AS parents_published&#x27;)</span>
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
            <span class="d2h-code-line-ctn">			-&gt;where(&#x27;c.published = 1&#x27;);</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Filter by state</span>
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
            <span class="d2h-code-line-ctn">		$state = $this-&gt;getState(&#x27;filter.published&#x27;);</span>
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
            <span class="d2h-code-line-ctn">		if (is_numeric($state))</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			$query-&gt;where($db-&gt;quoteName(&#x27;a.published&#x27;) . &#x27; = :published&#x27;);</span>
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
            <span class="d2h-code-line-ctn">			$query-&gt;bind(&#x27;:published&#x27;, $state, ParameterType::INTEGER);</span>
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
            <span class="d2h-code-line-ctn">			&#x2F;&#x2F; Filter by start and end dates.</span>
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
            <span class="d2h-code-line-ctn">			$nowDate = Factory::getDate()-&gt;toSql();</span>
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
            <span class="d2h-code-line-ctn">			$query-&gt;where(&#x27;(&#x27; . $db-&gt;quoteName(&#x27;a.publish_up&#x27;) .</span>
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
            <span class="d2h-code-line-ctn">				&#x27; IS NULL OR &#x27; . $db-&gt;quoteName(&#x27;a.publish_up&#x27;) . &#x27; &lt;= :publish_up)&#x27;</span>
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
            <span class="d2h-code-line-ctn">			)</span>
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
            <span class="d2h-code-line-ctn">				-&gt;where(&#x27;(&#x27; . $db-&gt;quoteName(&#x27;a.publish_down&#x27;) .</span>
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
            <span class="d2h-code-line-ctn">					&#x27; IS NULL OR &#x27; . $db-&gt;quoteName(&#x27;a.publish_down&#x27;) . &#x27; &gt;= :publish_down)&#x27;</span>
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
            <span class="d2h-code-line-ctn">				)</span>
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
            <span class="d2h-code-line-ctn">				-&gt;bind(&#x27;:publish_up&#x27;, $nowDate)</span>
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
            <span class="d2h-code-line-ctn">				-&gt;bind(&#x27;:publish_down&#x27;, $nowDate);</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Filter by language</span>
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
            <span class="d2h-code-line-ctn">		if ($this-&gt;getState(&#x27;filter.language&#x27;))</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			$language = [Factory::getLanguage()-&gt;getTag(), &#x27;*&#x27;];</span>
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
            <span class="d2h-code-line-ctn">			$query-&gt;whereIn($db-&gt;quoteName(&#x27;a.language&#x27;), $language, ParameterType::STRING);</span>
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
            <span class="d2h-code-line-ctn">		}</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Add the list ordering clause.</span>
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
            <span class="d2h-code-line-ctn">		$query-&gt;order($db-&gt;escape($this-&gt;getState(&#x27;list.ordering&#x27;, &#x27;a.ordering&#x27;)) . &#x27; &#x27; . $db-&gt;escape($this-&gt;getState(&#x27;list.direction&#x27;, &#x27;ASC&#x27;)));</span>
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
            <span class="d2h-code-line-ctn">		return $query;</span>
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
            <span class="d2h-code-line-ctn">	}</span>
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
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
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
            <span class="d2h-code-line-ctn">	 * Method to auto-populate the model state.</span>
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
            <span class="d2h-code-line-ctn">	 * Note. Calling getState in this method will result in recursion.</span>
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
            <span class="d2h-code-line-ctn">	 * @param   string  $ordering   An optional ordering field.</span>
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
            <span class="d2h-code-line-ctn">	 * @param   string  $direction  An optional direction (asc|desc).</span>
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
            <span class="d2h-code-line-ctn">	 *</span>
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
            <span class="d2h-code-line-ctn">	 * @return  void</span>
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
            <span class="d2h-code-line-ctn">	 *</span>
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
            <span class="d2h-code-line-ctn">	 * @since   __BUMP_VERSION__</span>
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
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
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
            <span class="d2h-code-line-ctn">	protected function populateState($ordering = null, $direction = null)</span>
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
            <span class="d2h-code-line-ctn">	{</span>
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
            <span class="d2h-code-line-ctn">		$app = Factory::getApplication();</span>
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
            <span class="d2h-code-line-ctn">		$params = ComponentHelper::getParams(&#x27;com_foos&#x27;);</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; List state information</span>
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
            <span class="d2h-code-line-ctn">		$limit = $app-&gt;getUserStateFromRequest(&#x27;global.list.limit&#x27;, &#x27;limit&#x27;, $app-&gt;get(&#x27;list_limit&#x27;), &#x27;uint&#x27;);</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;setState(&#x27;list.limit&#x27;, $limit);</span>
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
            <span class="d2h-code-line-ctn">		$limitstart = $app-&gt;input-&gt;get(&#x27;limitstart&#x27;, 0, &#x27;uint&#x27;);</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;setState(&#x27;list.start&#x27;, $limitstart);</span>
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
            <span class="d2h-code-line-ctn">		$orderCol = $app-&gt;input-&gt;get(&#x27;filter_order&#x27;, &#x27;ordering&#x27;);</span>
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
            <span class="d2h-code-line-ctn">		if (!in_array($orderCol, $this-&gt;filter_fields))</span>
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
            <span class="d2h-code-line-ctn">			$orderCol = &#x27;ordering&#x27;;</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;setState(&#x27;list.ordering&#x27;, $orderCol);</span>
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
            <span class="d2h-code-line-ctn">		$listOrder = $app-&gt;input-&gt;get(&#x27;filter_order_Dir&#x27;, &#x27;ASC&#x27;);</span>
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
            <span class="d2h-code-line-ctn">		if (!in_array(strtoupper($listOrder), array(&#x27;ASC&#x27;, &#x27;DESC&#x27;, &#x27;&#x27;)))</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			$listOrder = &#x27;ASC&#x27;;</span>
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
            <span class="d2h-code-line-ctn">		}</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;setState(&#x27;list.direction&#x27;, $listOrder);</span>
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
            <span class="d2h-code-line-ctn">		$user = Factory::getUser();</span>
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
            <span class="d2h-code-line-ctn">		if ((!$user-&gt;authorise(&#x27;core.edit.state&#x27;, &#x27;com_foos&#x27;)) &amp;&amp; (!$user-&gt;authorise(&#x27;core.edit&#x27;, &#x27;com_foos&#x27;)))</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			&#x2F;&#x2F; Limit to published for people who can&#x27;t edit or edit.state.</span>
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
            <span class="d2h-code-line-ctn">			$this-&gt;setState(&#x27;filter.published&#x27;, 1);</span>
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
            <span class="d2h-code-line-ctn">			&#x2F;&#x2F; Filter by start and end dates.</span>
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
            <span class="d2h-code-line-ctn">			$this-&gt;setState(&#x27;filter.publish_date&#x27;, true);</span>
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
            <span class="d2h-code-line-ctn">		}</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;setState(&#x27;filter.language&#x27;, Multilanguage::isEnabled());</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Load the parameters.</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;setState(&#x27;params&#x27;, $params);</span>
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
            <span class="d2h-code-line-ctn">	}</span>
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
            <span class="d2h-code-line-ctn">}</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-777650" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/components/com_foos/src/View/Featured/HtmlView.php</span>
    <span class="d2h-tag d2h-added d2h-added-tag">ADDED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -0,0 +1,200 @@</div>
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
            <span class="d2h-code-line-ctn">namespace Joomla\Component\Foos\Site\View\Featured;</span>
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
            <span class="d2h-code-line-ctn">use Joomla\CMS\HTML\HTMLHelper;</span>
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
            <span class="d2h-code-line-ctn">use Joomla\CMS\Language\Text;</span>
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
            <span class="d2h-code-line-ctn">use Joomla\CMS\Mail\MailHelper;</span>
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
            <span class="d2h-code-line-ctn">use Joomla\CMS\MVC\View\GenericDataException;</span>
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
            <span class="d2h-code-line-ctn">use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;</span>
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
            <span class="d2h-code-line-ctn"> * Featured View class</span>
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
            <span class="d2h-code-line-ctn"> * @since  __BUMP_VERSION__</span>
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
            <span class="d2h-code-line-ctn">	 * The item model state</span>
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
            <span class="d2h-code-line-ctn">	 * @var    \Joomla\Registry\Registry</span>
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
            <span class="d2h-code-line-ctn">	 * @since  __BUMP_VERSION__</span>
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
            <span class="d2h-code-line-ctn">	protected $state;</span>
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
            <span class="d2h-code-line-ctn">	 * The item details</span>
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
            <span class="d2h-code-line-ctn">	 * @var    \JObject</span>
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
            <span class="d2h-code-line-ctn">	 * @since  __BUMP_VERSION__</span>
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
            <span class="d2h-code-line-ctn">	protected $items;</span>
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
            <span class="d2h-code-line-ctn">	 * The pagination object</span>
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
            <span class="d2h-code-line-ctn">	 * @var    \JPagination</span>
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
            <span class="d2h-code-line-ctn">	 * @since  __BUMP_VERSION__</span>
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
            <span class="d2h-code-line-ctn">	protected $pagination;</span>
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
            <span class="d2h-code-line-ctn">	 * The page parameters</span>
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
            <span class="d2h-code-line-ctn">	 * @var    \Joomla\Registry\Registry|null</span>
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
            <span class="d2h-code-line-ctn">	 * @since  __BUMP_VERSION__</span>
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
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
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
            <span class="d2h-code-line-ctn">	protected $params = null;</span>
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
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">60</div>
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
<div class="line-num2">61</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	 * The page class suffix</span>
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
            <span class="d2h-code-line-ctn">	 *</span>
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
            <span class="d2h-code-line-ctn">	 * @var    string</span>
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
            <span class="d2h-code-line-ctn">	 * @since  __BUMP_VERSION__</span>
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
            <span class="d2h-code-line-ctn">	protected $pageclass_sfx = &#x27;&#x27;;</span>
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
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
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
            <span class="d2h-code-line-ctn">	 * Method to display the view.</span>
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
            <span class="d2h-code-line-ctn">	 * @param   string  $tpl  The name of the template file to parse; automatically searches through the template paths.</span>
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
            <span class="d2h-code-line-ctn">	 *</span>
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
            <span class="d2h-code-line-ctn">	 * @return  mixed  \Exception on failure, void on success.</span>
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
            <span class="d2h-code-line-ctn">	 *</span>
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
            <span class="d2h-code-line-ctn">	 * @since   __BUMP_VERSION__</span>
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
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
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
            <span class="d2h-code-line-ctn">	public function display($tpl = null)</span>
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
            <span class="d2h-code-line-ctn">	{</span>
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
            <span class="d2h-code-line-ctn">		$app    = Factory::getApplication();</span>
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
            <span class="d2h-code-line-ctn">		$params = $app-&gt;getParams();</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Get some data from the models</span>
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
            <span class="d2h-code-line-ctn">		$state      = $this-&gt;get(&#x27;State&#x27;);</span>
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
            <span class="d2h-code-line-ctn">		$items      = $this-&gt;get(&#x27;Items&#x27;);</span>
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
            <span class="d2h-code-line-ctn">		$category   = $this-&gt;get(&#x27;Category&#x27;);</span>
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
            <span class="d2h-code-line-ctn">		$children   = $this-&gt;get(&#x27;Children&#x27;);</span>
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
            <span class="d2h-code-line-ctn">		$parent     = $this-&gt;get(&#x27;Parent&#x27;);</span>
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
            <span class="d2h-code-line-ctn">		$pagination = $this-&gt;get(&#x27;Pagination&#x27;);</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Flag indicates to not add limitstart=0 to URL</span>
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
            <span class="d2h-code-line-ctn">		$pagination-&gt;hideEmptyLimitstart = true;</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Check for errors.</span>
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
            <span class="d2h-code-line-ctn">		if (count($errors = $this-&gt;get(&#x27;Errors&#x27;)))</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			throw new GenericDataException(implode(&quot;\n&quot;, $errors), 500);</span>
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
            <span class="d2h-code-line-ctn">		}</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Prepare the data.</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Compute the foos slug.</span>
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
            <span class="d2h-code-line-ctn">		for ($i = 0, $n = count($items); $i &lt; $n; $i++)</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			$item       = &amp;$items[$i];</span>
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
            <span class="d2h-code-line-ctn">			$item-&gt;slug = $item-&gt;alias ? ($item-&gt;id . &#x27;:&#x27; . $item-&gt;alias) : $item-&gt;id;</span>
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
            <span class="d2h-code-line-ctn">			$temp       = $item-&gt;params;</span>
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
            <span class="d2h-code-line-ctn">			$item-&gt;params = clone $params;</span>
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
            <span class="d2h-code-line-ctn">			$item-&gt;params-&gt;merge($temp);</span>
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
            <span class="d2h-code-line-ctn">			if ($item-&gt;params-&gt;get(&#x27;show_email&#x27;, 0) == 1)</span>
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
            <span class="d2h-code-line-ctn">			{</span>
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
            <span class="d2h-code-line-ctn">				$item-&gt;email_to = trim($item-&gt;email_to);</span>
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
            <span class="d2h-code-line-ctn">				if (!empty($item-&gt;email_to) &amp;&amp; MailHelper::isEmailAddress($item-&gt;email_to))</span>
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
            <span class="d2h-code-line-ctn">					$item-&gt;email_to = HTMLHelper::_(&#x27;email.cloak&#x27;, $item-&gt;email_to);</span>
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
            <span class="d2h-code-line-ctn">				else</span>
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
            <span class="d2h-code-line-ctn">				{</span>
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
            <span class="d2h-code-line-ctn">					$item-&gt;email_to = &#x27;&#x27;;</span>
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
            <span class="d2h-code-line-ctn">				}</span>
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
            <span class="d2h-code-line-ctn">			}</span>
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
            <span class="d2h-code-line-ctn">		}</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Escape strings for HTML output</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;pageclass_sfx = htmlspecialchars($params-&gt;get(&#x27;pageclass_sfx&#x27;), ENT_COMPAT, &#x27;UTF-8&#x27;);</span>
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
            <span class="d2h-code-line-ctn">		$maxLevel         = $params-&gt;get(&#x27;maxLevel&#x27;, -1);</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;maxLevel   = &amp;$maxLevel;</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;state      = &amp;$state;</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;items      = &amp;$items;</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;category   = &amp;$category;</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;children   = &amp;$children;</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;params     = &amp;$params;</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;parent     = &amp;$parent;</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;pagination = &amp;$pagination;</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;_prepareDocument();</span>
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
            <span class="d2h-code-line-ctn">		return parent::display($tpl);</span>
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
            <span class="d2h-code-line-ctn">	}</span>
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
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
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
            <span class="d2h-code-line-ctn">	 * Prepares the document</span>
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
            <span class="d2h-code-line-ctn">	 *</span>
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
            <span class="d2h-code-line-ctn">	 * @return  void</span>
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
            <span class="d2h-code-line-ctn">	 *</span>
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
            <span class="d2h-code-line-ctn">	 * @since   __BUMP_VERSION__</span>
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
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
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
            <span class="d2h-code-line-ctn">	protected function _prepareDocument()</span>
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
            <span class="d2h-code-line-ctn">	{</span>
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
            <span class="d2h-code-line-ctn">		$app   = Factory::getApplication();</span>
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
            <span class="d2h-code-line-ctn">		$menus = $app-&gt;getMenu();</span>
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
            <span class="d2h-code-line-ctn">		$title = null;</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; Because the application sets a default page title,</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&#x2F; we need to get it from the menu item itself</span>
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
            <span class="d2h-code-line-ctn">		$menu = $menus-&gt;getActive();</span>
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
            <span class="d2h-code-line-ctn">		if ($menu)</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			$this-&gt;params-&gt;def(&#x27;page_heading&#x27;, $this-&gt;params-&gt;get(&#x27;page_title&#x27;, $menu-&gt;title));</span>
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
            <span class="d2h-code-line-ctn">		}</span>
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
            <span class="d2h-code-line-ctn">		else</span>
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
            <span class="d2h-code-line-ctn">			$this-&gt;params-&gt;def(&#x27;page_heading&#x27;, Text::_(&#x27;COM_FOOS_DEFAULT_PAGE_TITLE&#x27;));</span>
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
            <span class="d2h-code-line-ctn">		$title = $this-&gt;params-&gt;get(&#x27;page_title&#x27;, &#x27;&#x27;);</span>
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
            <span class="d2h-code-line-ctn">		if (empty($title))</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			$title = $app-&gt;get(&#x27;sitename&#x27;);</span>
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
            <span class="d2h-code-line-ctn">		}</span>
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
            <span class="d2h-code-line-ctn">		elseif ($app-&gt;get(&#x27;sitename_pagetitles&#x27;, 0) == 1)</span>
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
            <span class="d2h-code-line-ctn">			$title = Text::sprintf(&#x27;JPAGETITLE&#x27;, $app-&gt;get(&#x27;sitename&#x27;), $title);</span>
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
            <span class="d2h-code-line-ctn">		elseif ($app-&gt;get(&#x27;sitename_pagetitles&#x27;, 0) == 2)</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			$title = Text::sprintf(&#x27;JPAGETITLE&#x27;, $title, $app-&gt;get(&#x27;sitename&#x27;));</span>
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
            <span class="d2h-code-line-ctn">		}</span>
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
            <span class="d2h-code-line-ctn">		$this-&gt;document-&gt;setTitle($title);</span>
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
            <span class="d2h-code-line-ctn">		if ($this-&gt;params-&gt;get(&#x27;menu-meta_description&#x27;))</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			$this-&gt;document-&gt;setDescription($this-&gt;params-&gt;get(&#x27;menu-meta_description&#x27;));</span>
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
            <span class="d2h-code-line-ctn">		}</span>
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
            <span class="d2h-code-line-ctn">		if ($this-&gt;params-&gt;get(&#x27;menu-meta_keywords&#x27;))</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			$this-&gt;document-&gt;setMetaData(&#x27;keywords&#x27;, $this-&gt;params-&gt;get(&#x27;menu-meta_keywords&#x27;));</span>
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
            <span class="d2h-code-line-ctn">		}</span>
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
            <span class="d2h-code-line-ctn">		if ($this-&gt;params-&gt;get(&#x27;robots&#x27;))</span>
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
            <span class="d2h-code-line-ctn">		{</span>
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
            <span class="d2h-code-line-ctn">			$this-&gt;document-&gt;setMetaData(&#x27;robots&#x27;, $this-&gt;params-&gt;get(&#x27;robots&#x27;));</span>
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
            <span class="d2h-code-line-ctn">		}</span>
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
            <span class="d2h-code-line-ctn">	}</span>
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
            <span class="d2h-code-line-ctn">}</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-075470" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/components/com_foos/tmpl/featured/default.php</span>
    <span class="d2h-tag d2h-added d2h-added-tag">ADDED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -0,0 +1,35 @@</div>
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
            <span class="d2h-code-line-ctn">&#x2F;&#x2F; If the page class is defined, add to class as suffix.</span>
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
            <span class="d2h-code-line-ctn">&#x2F;&#x2F; It will be a separate class if the user starts it with a space</span>
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
            <span class="d2h-code-line-ctn">?&gt;</span>
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
            <span class="d2h-code-line-ctn">&lt;div class=&quot;com-foos-featured blog-featured&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">&lt;?php if ($this-&gt;params-&gt;get(&#x27;show_page_headings&#x27;) != 0 ) : ?&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;h1&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;?php echo $this-&gt;escape($this-&gt;params-&gt;get(&#x27;page_heading&#x27;)); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;&#x2F;h1&gt;</span>
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
            <span class="d2h-code-line-ctn">&lt;?php endif; ?&gt;</span>
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
            <span class="d2h-code-line-ctn">&lt;?php echo $this-&gt;loadTemplate(&#x27;items&#x27;); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">&lt;?php if ($this-&gt;params-&gt;def(&#x27;show_pagination&#x27;, 2) == 1  || ($this-&gt;params-&gt;get(&#x27;show_pagination&#x27;) == 2 &amp;&amp; $this-&gt;pagination-&gt;pagesTotal &gt; 1)) : ?&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;div class=&quot;com-foos-featured__pagination w-100&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;?php if ($this-&gt;params-&gt;def(&#x27;show_pagination_results&#x27;, 1)) : ?&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;p class=&quot;counter float-right pt-3 pr-2&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;?php echo $this-&gt;pagination-&gt;getPagesCounter(); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;&#x2F;p&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;?php echo $this-&gt;pagination-&gt;getPagesLinks(); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">&lt;?php endif; ?&gt;</span>
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
            <span class="d2h-code-line-ctn">&lt;&#x2F;div&gt;</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-083309" class="d2h-file-wrapper" data-lang="xml">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/components/com_foos/tmpl/featured/default.xml</span>
    <span class="d2h-tag d2h-added d2h-added-tag">ADDED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -0,0 +1,48 @@</div>
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
            <span class="d2h-code-line-ctn">&lt;metadata&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;layout title=&quot;COM_FOOS_FEATURED_VIEW_DEFAULT_TITLE&quot; option=&quot;COM_FOOS_FEATURED_VIEW_DEFAULT_OPTION&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;help</span>
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
            <span class="d2h-code-line-ctn">			key = &quot;JHELP_MENUS_MENU_ITEM_FOOS_FEATURED&quot;</span>
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
            <span class="d2h-code-line-ctn">		&#x2F;&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;message&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;![CDATA[COM_FOOS_FEATURED_VIEW_DEFAULT_DESC]]&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;&#x2F;message&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;&#x2F;layout&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;!-- Add fields to the parameters object for the layout. --&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;fields name=&quot;params&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;fieldset name=&quot;advanced&quot; label=&quot;JGLOBAL_LIST_LAYOUT_OPTIONS&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;field</span>
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
            <span class="d2h-code-line-ctn">					name=&quot;spacer&quot;</span>
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
            <span class="d2h-code-line-ctn">					type=&quot;spacer&quot;</span>
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
            <span class="d2h-code-line-ctn">					label=&quot;JGLOBAL_SUBSLIDER_DRILL_CATEGORIES_LABEL&quot;</span>
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
            <span class="d2h-code-line-ctn">					class=&quot;text&quot;</span>
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
            <span class="d2h-code-line-ctn">				&#x2F;&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;field</span>
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
            <span class="d2h-code-line-ctn">					name=&quot;show_headings&quot;</span>
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
            <span class="d2h-code-line-ctn">					type=&quot;list&quot;</span>
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
            <span class="d2h-code-line-ctn">					label=&quot;JGLOBAL_SHOW_HEADINGS_LABEL&quot;</span>
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
            <span class="d2h-code-line-ctn">					useglobal=&quot;true&quot;</span>
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
            <span class="d2h-code-line-ctn">					class=&quot;custom-select-color-state&quot;</span>
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
            <span class="d2h-code-line-ctn">					&gt;</span>
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
            <span class="d2h-code-line-ctn">					&lt;option value=&quot;0&quot;&gt;JHIDE&lt;&#x2F;option&gt;</span>
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
            <span class="d2h-code-line-ctn">					&lt;option value=&quot;1&quot;&gt;JSHOW&lt;&#x2F;option&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;&#x2F;field&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;field</span>
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
            <span class="d2h-code-line-ctn">					name=&quot;show_pagination&quot;</span>
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
            <span class="d2h-code-line-ctn">					type=&quot;list&quot;</span>
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
            <span class="d2h-code-line-ctn">					label=&quot;JGLOBAL_PAGINATION_LABEL&quot;</span>
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
            <span class="d2h-code-line-ctn">					useglobal=&quot;true&quot;</span>
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
            <span class="d2h-code-line-ctn">					class=&quot;custom-select-color-state&quot;</span>
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
            <span class="d2h-code-line-ctn">					&gt;</span>
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
            <span class="d2h-code-line-ctn">					&lt;option value=&quot;0&quot;&gt;JHIDE&lt;&#x2F;option&gt;</span>
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
            <span class="d2h-code-line-ctn">					&lt;option value=&quot;1&quot;&gt;JSHOW&lt;&#x2F;option&gt;</span>
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
            <span class="d2h-code-line-ctn">					&lt;option value=&quot;2&quot;&gt;JGLOBAL_AUTO&lt;&#x2F;option&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;&#x2F;field&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;&#x2F;fieldset&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;&#x2F;fields&gt;</span>
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
            <span class="d2h-code-line-ctn">&lt;&#x2F;metadata&gt;</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="d2h-511281" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/components/com_foos/tmpl/featured/default_items.php</span>
    <span class="d2h-tag d2h-added d2h-added-tag">ADDED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -0,0 +1,80 @@</div>
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
            <span class="d2h-code-line-ctn">use Joomla\CMS\Language\Text;</span>
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
            <span class="d2h-code-line-ctn">use Joomla\CMS\Router\Route;</span>
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
            <span class="d2h-code-line-ctn">use Joomla\CMS\Uri\Uri;</span>
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
            <span class="d2h-code-line-ctn">use Joomla\Component\Foos\Site\Helper\RouteHelper;</span>
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
            <span class="d2h-code-line-ctn">HTMLHelper::_(&#x27;behavior.core&#x27;);</span>
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
            <span class="d2h-code-line-ctn">$listOrder = $this-&gt;escape($this-&gt;state-&gt;get(&#x27;list.ordering&#x27;));</span>
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
            <span class="d2h-code-line-ctn">$listDirn  = $this-&gt;escape($this-&gt;state-&gt;get(&#x27;list.direction&#x27;));</span>
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
            <span class="d2h-code-line-ctn">&#x2F;&#x2F; Create a shortcut for params.</span>
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
            <span class="d2h-code-line-ctn">$params = &amp;$this-&gt;item-&gt;params;</span>
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
            <span class="d2h-code-line-ctn">?&gt;</span>
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
            <span class="d2h-code-line-ctn">&lt;div class=&quot;com-foos-featured__items&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;?php if (empty($this-&gt;items)) : ?&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;p class=&quot;com-foos-featured__message&quot;&gt; &lt;?php echo Text::_(&#x27;COM_FOO_NO_FOOS&#x27;); ?&gt;	 &lt;&#x2F;p&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;?php else : ?&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;form action=&quot;&lt;?php echo htmlspecialchars(Uri::getInstance()-&gt;toString()); ?&gt;&quot; method=&quot;post&quot; name=&quot;adminForm&quot; id=&quot;adminForm&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;fieldset class=&quot;com-foos-featured__filters filters&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;legend class=&quot;hidelabeltxt&quot;&gt;&lt;?php echo Text::_(&#x27;JGLOBAL_FILTER_LABEL&#x27;); ?&gt;&lt;&#x2F;legend&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;?php if ($this-&gt;params-&gt;get(&#x27;show_pagination_limit&#x27;)) : ?&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;div class=&quot;display-limit&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;?php echo Text::_(&#x27;JGLOBAL_DISPLAY_NUM&#x27;); ?&gt;&amp;#160;</span>
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
            <span class="d2h-code-line-ctn">				&lt;?php echo $this-&gt;pagination-&gt;getLimitBox(); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;&#x2F;div&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;?php endif; ?&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;input type=&quot;hidden&quot; name=&quot;filter_order&quot; value=&quot;&lt;?php echo $listOrder; ?&gt;&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;input type=&quot;hidden&quot; name=&quot;filter_order_Dir&quot; value=&quot;&lt;?php echo $listDirn; ?&gt;&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;&#x2F;fieldset&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;table class=&quot;com-foos-featured__table table&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;?php if ($this-&gt;params-&gt;get(&#x27;show_headings&#x27;)) : ?&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;thead class=&quot;thead-default&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;tr&gt;</span>
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
            <span class="d2h-code-line-ctn">					&lt;th class=&quot;item-num&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">						&lt;?php echo Text::_(&#x27;JGLOBAL_NUM&#x27;); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">					&lt;&#x2F;th&gt;</span>
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
            <span class="d2h-code-line-ctn">					&lt;th class=&quot;item-title&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">						&lt;?php echo HTMLHelper::_(&#x27;grid.sort&#x27;, &#x27;COM_FOO_FOO_EMAIL_NAME_LABEL&#x27;, &#x27;a.name&#x27;, $listDirn, $listOrder); ?&gt;</span>
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
            <span class="d2h-code-line-ctn">					&lt;&#x2F;th&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;&#x2F;tr&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;&#x2F;thead&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;?php endif; ?&gt;</span>
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
    <td class="d2h-code-linenumber d2h-ins">
      <div class="line-num1"></div>
<div class="line-num2">60</div>
    </td>
    <td class="d2h-ins">
        <div class="d2h-code-line d2h-ins">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">			&lt;tbody&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;?php foreach ($this-&gt;items as $i =&gt; $item) : ?&gt;</span>
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
            <span class="d2h-code-line-ctn">					&lt;tr class=&quot;&lt;?php echo ($i % 2) ? &#x27;odd&#x27; : &#x27;even&#x27;; ?&gt;&quot; itemscope itemtype=&quot;https:&#x2F;&#x2F;schema.org&#x2F;Person&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">						&lt;td class=&quot;item-num&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">							&lt;?php echo $i; ?&gt;</span>
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
            <span class="d2h-code-line-ctn">						&lt;&#x2F;td&gt;</span>
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
            <span class="d2h-code-line-ctn">						&lt;td class=&quot;item-title&quot;&gt;</span>
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
            <span class="d2h-code-line-ctn">							&lt;?php if ($this-&gt;items[$i]-&gt;published == 0) : ?&gt;</span>
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
            <span class="d2h-code-line-ctn">								&lt;span class=&quot;badge badge-warning&quot;&gt;&lt;?php echo Text::_(&#x27;JUNPUBLISHED&#x27;); ?&gt;&lt;&#x2F;span&gt;</span>
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
            <span class="d2h-code-line-ctn">							&lt;?php endif; ?&gt;</span>
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
            <span class="d2h-code-line-ctn">								&lt;span itemprop=&quot;name&quot;&gt;&lt;?php echo $item-&gt;name; ?&gt;&lt;&#x2F;span&gt;</span>
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
            <span class="d2h-code-line-ctn">						&lt;&#x2F;td&gt;</span>
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
            <span class="d2h-code-line-ctn">					&lt;&#x2F;tr&gt;</span>
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
            <span class="d2h-code-line-ctn">				&lt;?php endforeach; ?&gt;</span>
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
            <span class="d2h-code-line-ctn">			&lt;&#x2F;tbody&gt;</span>
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
            <span class="d2h-code-line-ctn">		&lt;&#x2F;table&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;&#x2F;form&gt;</span>
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
            <span class="d2h-code-line-ctn">	&lt;?php endif; ?&gt;</span>
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
            <span class="d2h-code-line-ctn">&lt;&#x2F;div&gt;</span>
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
