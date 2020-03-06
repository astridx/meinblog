---
date: 2019-12-13
title: 'Joomla 4: Erweiterung erstellen - Teil 13 - Serverseiteige Validierung'
template: post
thumbnail: '../thumbnails/joomlatut.png'
slug: jooomla-erweiterung-13
categories:
  - Entwicklung
tags:
  - Tutorial
  - Joomla 
---

Serverseitige Validierung.

## Teste deine Joomla-Komponente

1. Installiere am Ende deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation. 

2.

## Teste deine Joomla-Komponente

1. Installiere am Ende deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation. 

2.

## Geänderte Dateien

### Übersicht


<div id="diff">
      <div class="d2h-file-list-wrapper">
    <div class="d2h-file-list-header">
        <span class="d2h-file-list-title">Files changed (2)</span>
        <a class="d2h-file-switch d2h-hide">hide</a>
        <a class="d2h-file-switch d2h-show">show</a>
    </div>
    <ol class="d2h-file-list">
    <li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-added" height="16" title="added" version="1.1" viewBox="0 0 14 16"
           width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>
      </svg>      <a href="#d2h-642809" class="d2h-file-name">src/administrator/components/com_foos/Rule/LetterRule.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+37</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
<li class="d2h-file-list-line">
    <span class="d2h-file-name-wrapper">
      <svg aria-hidden="true" class="d2h-icon d2h-changed" height="16" title="modified" version="1.1"
           viewBox="0 0 14 16" width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path>
      </svg>      <a href="#d2h-861015" class="d2h-file-name">src/administrator/components/com_foos/forms/foo.xml</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+2</span>
          <span class="d2h-lines-deleted">-1</span>
      </span>
    </span>
</li>
    </ol>
</div><div class="d2h-wrapper">
    <div id="d2h-642809" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/administrator/components/com_foos/Rule/LetterRule.php</span>
    <span class="d2h-tag d2h-added d2h-added-tag">ADDED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -0,0 +1,37 @@</div>
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
            <span class="d2h-code-line-ctn"> * Joomla! Content Management System</span>
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
            <span class="d2h-code-line-ctn"> *</span>
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
            <span class="d2h-code-line-ctn"> * @copyright  Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.</span>
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
            <span class="d2h-code-line-ctn"> * @license    GNU General Public License version 2 or later; see LICENSE.txt</span>
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
            <span class="d2h-code-line-ctn"> *&#x2F;</span>
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
            <span class="d2h-code-line-ctn">namespace Joomla\Component\Foos\Administrator\Rule;</span>
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
            <span class="d2h-code-line-ctn">defined(&#x27;JPATH_PLATFORM&#x27;) or die;</span>
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
            <span class="d2h-code-line-ctn">use Joomla\CMS\Form\FormRule;</span>
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
            <span class="d2h-code-line-ctn">&#x2F;**</span>
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
            <span class="d2h-code-line-ctn"> * Form Rule class for the Joomla Platform.</span>
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
            <span class="d2h-code-line-ctn"> *</span>
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
            <span class="d2h-code-line-ctn"> * @since  __DEPLOY_VERSION__</span>
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
            <span class="d2h-code-line-ctn"> *&#x2F;</span>
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
            <span class="d2h-code-line-ctn">class LetterRule extends FormRule</span>
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
            <span class="d2h-code-line-ctn">{</span>
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
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
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
            <span class="d2h-code-line-ctn">	 * The regular expression to use in testing a form field value.</span>
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
            <span class="d2h-code-line-ctn">	 *</span>
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
            <span class="d2h-code-line-ctn">	 * @var    string</span>
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
            <span class="d2h-code-line-ctn">	 * @since  __DEPLOY_VERSION__</span>
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
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
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
            <span class="d2h-code-line-ctn">	protected $regex = &#x27;^([a-z]+)$&#x27;;</span>
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
            <span class="d2h-code-line-ctn">	&#x2F;**</span>
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
            <span class="d2h-code-line-ctn">	 * The regular expression modifiers to use when testing a form field value.</span>
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
            <span class="d2h-code-line-ctn">	 * @var    string</span>
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
            <span class="d2h-code-line-ctn">	 * @since  __DEPLOY_VERSION__</span>
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
            <span class="d2h-code-line-ctn">	 *&#x2F;</span>
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
            <span class="d2h-code-line-ctn">	protected $modifiers = &#x27;i&#x27;;</span>
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
            <span class="d2h-code-line-ctn">}</span>
        </div>
    </td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
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
        <div class="d2h-code-line d2h-info">@@ -1,6 +1,6 @@</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">1</div>
<div class="line-num2">1</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">2</div>
<div class="line-num2">2</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">&lt;form&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-del d2h-change">
      <div class="line-num1">3</div>
<div class="line-num2"></div>
    </td>
    <td class="d2h-del d2h-change">
        <div class="d2h-code-line d2h-del d2h-change">
            <span class="d2h-code-line-prefix">-</span>
            <span class="d2h-code-line-ctn">	&lt;fieldset&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-ins d2h-change">
      <div class="line-num1"></div>
<div class="line-num2">3</div>
    </td>
    <td class="d2h-ins d2h-change">
        <div class="d2h-code-line d2h-ins d2h-change">
            <span class="d2h-code-line-prefix">+</span>
            <span class="d2h-code-line-ctn">	&lt;fieldset<ins> addruleprefix=&quot;Joomla\Component\Foos\Administrator\Rule&quot;</ins>&gt;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">4</div>
<div class="line-num2">4</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		&lt;field</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">5</div>
<div class="line-num2">5</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">			name=&quot;id&quot;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">6</div>
<div class="line-num2">6</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">			type=&quot;number&quot;</span>
        </div>
    </td>
</tr>
<tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -13,6 +13,7 @@</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">13</div>
<div class="line-num2">13</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		&lt;field</span>
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
            <span class="d2h-code-line-ctn">			name=&quot;name&quot;</span>
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
            <span class="d2h-code-line-ctn">			validate=&quot;Letter&quot;</span>
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
            <span class="d2h-code-line-ctn">			label=&quot;COM_FOOS_FIELD_NAME_LABEL&quot;</span>
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
            <span class="d2h-code-line-ctn">			size=&quot;40&quot;</span>
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
            <span class="d2h-code-line-ctn">			required=&quot;true&quot;</span>
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