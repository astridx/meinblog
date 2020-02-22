---
date: 2019-12-27
title: 'Joomla 4: Erweiterung erstellen - Teil 27 - Hilfe'
template: post
thumbnail: '../thumbnails/joomlatut.png'
slug: joomla-erweiterung-27
categories:
  - Entwicklung
tags:
  - Tutorial
  - Joomla 
---

Hilfelink.

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
      <svg aria-hidden="true" class="d2h-icon d2h-changed" height="16" title="modified" version="1.1"
           viewBox="0 0 14 16" width="14">
          <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path>
      </svg>      <a href="#d2h-047734" class="d2h-file-name">src/administrator/components/com_foos/src/View/Foo/HtmlView.php</a>
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
      </svg>      <a href="#d2h-529131" class="d2h-file-name">src/administrator/components/com_foos/src/View/Foos/HtmlView.php</a>
      <span class="d2h-file-stats">
          <span class="d2h-lines-added">+3</span>
          <span class="d2h-lines-deleted">-0</span>
      </span>
    </span>
</li>
    </ol>
</div><div class="d2h-wrapper">
    <div id="d2h-047734" class="d2h-file-wrapper" data-lang="php">
    <div class="d2h-file-header">
    <span class="d2h-file-name-wrapper">
    <svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
    </svg>    <span class="d2h-file-name">src/administrator/components/com_foos/src/View/Foo/HtmlView.php</span>
    <span class="d2h-tag d2h-changed d2h-changed-tag">CHANGED</span></span>
    </div>
    <div class="d2h-file-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                <tr>
    <td class="d2h-code-linenumber d2h-info"></td>
    <td class="d2h-info">
        <div class="d2h-code-line d2h-info">@@ -143,5 +143,8 @@ class HtmlView extends BaseHtmlView</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">143</div>
<div class="line-num2">143</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">144</div>
<div class="line-num2">144</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">			ToolbarHelper::cancel(&#x27;foo.cancel&#x27;, &#x27;JTOOLBAR_CLOSE&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">145</div>
<div class="line-num2">145</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		}</span>
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
            <span class="d2h-code-line-ctn">		ToolbarHelper::divider();</span>
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
            <span class="d2h-code-line-ctn">		ToolbarHelper::help(&#x27;&#x27;, false, &#x27;http:&#x2F;&#x2F;joomla.org&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">146</div>
<div class="line-num2">149</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">147</div>
<div class="line-num2">150</div>
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
        <div class="d2h-code-line d2h-info">@@ -201,6 +201,9 @@ class HtmlView extends BaseHtmlView</div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">201</div>
<div class="line-num2">201</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">			$toolbar-&gt;preferences(&#x27;com_foos&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">202</div>
<div class="line-num2">202</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">203</div>
<div class="line-num2">203</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
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
            <span class="d2h-code-line-ctn">		ToolbarHelper::divider();</span>
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
            <span class="d2h-code-line-ctn">		ToolbarHelper::help(&#x27;&#x27;, false, &#x27;http:&#x2F;&#x2F;joomla.org&#x27;);</span>
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
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">204</div>
<div class="line-num2">207</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">		HTMLHelper::_(&#x27;sidebar.setAction&#x27;, &#x27;index.php?option=com_foos&#x27;);</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">205</div>
<div class="line-num2">208</div>
    </td>
    <td class="d2h-cntx">
        <div class="d2h-code-line d2h-cntx">
            <span class="d2h-code-line-prefix">&nbsp;</span>
            <span class="d2h-code-line-ctn">	}</span>
        </div>
    </td>
</tr><tr>
    <td class="d2h-code-linenumber d2h-cntx">
      <div class="line-num1">206</div>
<div class="line-num2">209</div>
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
</div>
    </div>