---
description: 'desc'
set: 'en/eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-using-cassiopeia'
syndication:
shortTitle: 'short'
date: 2021-05-04
title: 'HTTP-Header and Content Security Policy in Joomla 4'
template: post
thumbnail: '/thumbnails/joomla.png'
slug: en/http-header-und-content-security-policy-joomla4
langKey: en
categories:
  - Cassiopeia English
tags:
  - Joomla
  - Sicherheit
  - CSP
  - HTTP Header
  - Content Security Policy
---








At first glance, the task of a browser seems simple: it displays text and images that you send it. On closer look, everything becomes more complex. Web standards have to be supported, usability is high on the agenda and developers need tools. On top of that, the web is a tricky place. Websites are constantly under automated attack. To protect against various attack vectors, software manufacturers have implemented HTTP headers that enable the website to activate security functions in the web browser and thus block or make attack patterns more difficult.<!-- \index{HTTP headers} --><!-- \index{Content Security Policy} -->

> You test locally and it doesn't work. You see the message `Cross-source (cross-origin) request blocked: The same-source rule forbids reading the external resource on ... Reason: CORS header 'Access-Control-Allow-Origin' is missing.`. Access to local files in Firefox is normally not possible due to the `Same-Origin-Policy`. The function itself is useful, but sometimes you want to disable it for development purposes. This can be done by calling `about:config` in the address bar of the Firefox browser. In the settings you will find the attribute `privacy.file_unique_origin`. If this value is set to `false`, the files can be loaded locally.

# How to make the headers visible

HTTP headers are often confused with the `<head>` element of an HTML document. You will not find HTTP headers in the HTML header! They are in the HTTP protocol. This forms the basis of the World Wide Web. HTTP is the language used by browsers and web servers to communicate. Together with the visible content, information about the data is transmitted. This information is in the header of the browser response - in the head of the [HTTP-Response](https://developer.mozilla.org/de/docs/Web/HTTP#die_struktur_einer_server-antwort)[^developer.mozilla.org/en/docs/web/http#the_structure_of_a_server-response]. Therefore the name Header. To view them, open the network tab of the browser developer tools.

![HTTP header made visible in Firefox](/images/header0e.png)

With the tool [Security Headers by Scott Helme](https://securityheaders.com/)[^securityheaders.com/] it is possible to check the HTTP headers and their configuration. The service reads out all set values, evaluates them and forms a rating from them. The following image shows an example report.

![Security Headers by Scott Helme](/images/header1.png)

> An alternative test tool is _Webbkoll_. This is a project from Sweden funded by [Internetfonden](https://internetstiftelsen.se/) among others. The source code is open source and available on [Github](https://github.com/andersju/webbkoll). If you meet the technical requirements, you can host Webbkoll on your own server. It is easier to use an already existing Webbkoll instance, as offered at [https://webbkoll.dataskydd.net](https://webbkoll.dataskydd.net).

# What Joomla 4 offers

Joomla 4 supports users with the plugin [System - HTTP Headers](https://docs.joomla.org/J4.x:Http_Header_Management/de#Plugin) to configure a secure [Content Security Policy](https://wiki.selfhtml.org/wiki/Sicherheit/Content_Security_Policy). Make sure that this plugin is activated if you want to use it.

![Joomla 4 Plugin System - HTTP Headers - To be activated in the System|Plugins menu ](/images/header00p.png)

> Originally, there was to be an additional component. Reports about the content security policy could have been managed via this component. This was removed with the PR [github.com/joomla/joomla-cms/pull/33550](https://github.com/joomla/joomla-cms/pull/33550). In the Content Security Policy chapter, I describe a way to receive the reports by email.

![Joomla 4 Plugin System - HTTP Headers - Detail view](/images/header0p.png)

I describe the most important HTTP headers and the configuration in Joomla 4.

> First of all: If you test your website under `localhost`, you should note that not all the functions described here can be tested locally.

# HTTP Security Headers in Detail

The following security headers are [HTTP Response Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers), which the web server passes to the web browser with the data of the web page. The browser then activates security functions.

## Special HTTP Headers in the Joomla 4 Plugins HTTP Header

In the Joomla Plugin, the three headers _X-Frame-Options_, _Referrer-Policy_ and _Cross-Origin-Opener-Policy_ are displayed in the upper area and the header _Strict-Transport-Security_ can be configured in a separate tab.

### X-Frame-Options

The [X-Frame-Options](https://developer.mozilla.org/de/docs/Web/HTTP/Headers/X-Frame-Options) header prevents [Clickjacking](https://de.wikipedia.org/wiki/Clickjacking). This technique loads a third-party website into your own via an _iframe_ tag. The aim is to get a user to provide sensitive data - for example, login details. As soon as a site tries to load another as _iframe_, the browser checks the website to be embedded. If the _X-Frame-Options Header_ is set there, the page is not loaded. This way, it is possible to prevent other websites from embedding one's own website in their content and pretending to be oneself.

The header offers three possible directives: 'DENY', 'SAMEORIGIN', and 'ALLOW-FROM'.

In Joomla 4, the header can be set in different ways. On the one hand, there is a separate option 'X-Frame-Options'. If this is activated, the plugin sets the header with the policy 'SAMEORIGIN'. This will be the desired function in most cases. In your own domain, it is still possible to integrate your own content via iFrame. Outside the domain, this is forbidden.

![X-Frame-Option in the Joomla 4 Content Security Policy](/images/header2.png)

If `ALLOW-FROM` or `DENY` is required, this can be configured in the plugin:

![X-Frame-Option in the Joomla 4 Content Security Policy](/images/header3.png)

In addition, the [setting](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Apache_Configuration_htaccess#frame_options) of the header is possible via `.htaccess` file:

```
<IfModule mod_headers.c>
  Header always set X-Frame-Options "DENY" "expr=%{CONTENT_TYPE} =~ m#text/html#i"
</IfModule>
```

Note: If you have activated the option in the upper area, `SAMEORIGIN` will always be set. If you manually configure the `ALLOW-FROM` or `DENY` in the lower area, then it is necessary to deactivate the option in the upper area.

X-Frame-Option in the Joomla 4 Content Security Policy](/images/header5.png)

### Referrer Policy

[Referrer Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy) instructs the browser to remove the referrer and not to send it to the next site.

> The [Referer Request Header](https://de.wikipedia.org/wiki/Referrer) contains the address of the previously visited website, which includes a link to the currently requested page. The Referer header allows servers to see where the people visiting them are coming from and to use this data for analysis, logging or caching, for example.

In the Joomla plugin, all possible options are selectable in a dropdown. The default setting in the plugin provides the option 'no-referrer-when-downgrading'.

Referrer-Policy in the Joomla 4 Content Security Policy](/images/header4.png)

By using `.htaccess` the header can also be [set](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Apache_Configuration_htaccess#referrer_policy):

```
<IfModule mod_headers.c>
  Header always set Referrer-Policy "strict-origin-when-cross-origin" "expr=%{CONTENT_TYPE} =~ m#text\/(css|html|javascript)|application\/pdf|xml#i"
</IfModule>
```

### Cross-Origin-Opener-Policy

The [Cross-Origin-Opener-Policy (COOP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy) header provides the ability to request a new browser context to better isolate itself from other untrusted calls.

The [Cross-Origin Resource Policy Header (CORP)](<https://developer.mozilla.org/en-US/docs/Web/HTTP/Cross-Origin_Resource_Policy_(CORP)>) allows websites and applications to protect themselves against certain _cross-origin requests_.

[Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) is an HTTP header-based mechanism that allows a server to specify origins (domain, scheme or port) other than its own from which a browser should allow resources to be loaded.

The [Cross-Origin Embedder Policy (COEP)](https://wicg.github.io/cross-origin-embedder-policy/) is used to prevent requests from being loaded that are not of the same origin, unless this is explicitly permitted via CORS or CORP.

Using `.htaccess`, the header can also be [set](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Apache_Configuration_htaccess#general_cors_access). Here is an example:

```
<IfModule mod_setenvif.c>
  <IfModule mod_headers.c>
    <FilesMatch "\.(bmp|cur|gif|ico|jpe?g|a?png|svgz?|webp|heic|heif|avif)$">
      SetEnvIf Origin ":" IS_CORS
      Header set Access-Control-Allow-Origin "*" env=*IS_CORS*
    </FilesMatch>
  </IfModule>
</IfModule>
```

### Strict-Transport-Security

The [Strict-Transport-Security (HSTS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) header can be configured in the plug-in in a separate tab. It provides additional security for all sites that are encrypted with HTTPS. If the header is set, the browser rejects all unencrypted HTTP connections.

> For sites that have been switched from HTTP to HTTPS, there is a high probability that a link can be found that is not provided with the additional _S_. Without HSTS, this link would be forwarded unencrypted via HTTP. Websites equipped with HSTS deliver all content via HTTPS without exception. Links are rewritten. This way, potential attackers will not find anything unencrypted in the transmission.

In the plugin, for example, the value 'max-age=31536000; includeSubDomains' can be configured. The following image shows the configuration via the option _Force HTTP Headers_.

![Strict-Transport-Security in the Joomla 4 Content Security Policy](/images/header6.png)

`max-age` tells the browser to save the domain. The value `31536000` is in seconds and represents one year. With the option `includeSubDomains` the browser extends the function to all subdomains.

> If `preload` is activated, the domain is stored in the [preload list](https://hstspreload.org).

Via `.htaccess` the header is to be [activated](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) as follows:

```
<IfModule mod_headers.c>
  # Header always set
  Strict-Transport-Security "max-age=31536000; includeSubDomains" env=HTTPS
  # (1) Enable your site for HSTS preload inclusion.
  Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" env=HTTPS
</IfModule>
```

> Despite the advantages, HSTS is [criticised](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security#Privacy_issues) because website operators are able to read user information. Access is complicated, but possible.

## Weitere Plugins im Bereich Force HTTP Headers

### HTTP Header Feature-Policy

The HTTP header [feature policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy) is relatively young and far-reaching. It tells the browser which functions the site needs. If no access to the microphone is necessary, a possible attacker has no access to these browser functions - provided the header is set correctly.

The structure is straightforward:

`Feature-Policy: <directive> <allowlist>`

> The controllable [features (directives), ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy), are so far [not all supported in all browsers.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy#browser_compatibility).

Via the Joomla plugin, the header can be configured as follows:

![Strict-Transport-Security in the Joomla 4 Content Security Policy](/images/header7.png)

Using `.htaccess`, the entry for a banning of microphone and geolocation looks like this:

```
<IfModule mod_headers.c>
  Header always set Feature-Policy microphone 'none'; geolocation 'none'
</IfModule>
```

### Expect-CT

The [Expect-CT header](https://developer.mozilla.org/de/docs/Web/HTTP/Headers/Expect-CT) allows websites to enforce the requirements of [Certificate Transparency](https://developer.mozilla.org/en-US/docs/Web/Security/Certificate_Transparency).

When a website enables the use of the `Expect-CT` header, the browser checks each certificate used in connection with the website in [public CT protocols](https://www.certificate-transparency.org/known-logs).

### Content-Security-Policy

The [Content-Security-Policy](https://scotthelme.co.uk/content-security-policy-an-introduction/) or CSP is the icing on the cake of HTTP headers.

> Without CSP, a browser loads all content, no matter from where. This is helpful in many cases. The problem is that not every site is trustworthy. I am referring to the invocation of malicious script code via [Cross Site Scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting). The dangerous thing is that as a website operator, you don't have things in your own hands if foreign content can be called up. Then it is sufficient for the attacker to pollute a linked site with malicious code.

CSP offers a high level of protection, but requires expertise. Basically, one creates a list of all resources that the website needs. Everything else is blocked by the browser. This makes it clear: if you don't know what you're doing, you can disable your website with a content security policy. In the most restrictive setting, the browser only allows content that comes from the calling domain itself (`self`).

> With Joomla 4.0, inline scripts and styles were largely eliminated from the Joomla Core. Unfortunately, extensions still use inline JavaScript and inline CSS styles. Therefore, the loading of inline elmenets is usually necessary and should not be interrupted. For this reason, only an 'A' rating and not an 'A+' rating is usually achievable with a Joomla website.

The header is structured as follows:

`Content-Security-Policy-(Report-Only) <directive> <allowlist>; <directive> <allowlist>;`

The [list](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy#Browser_compatibility) of possible directives is long and is supported by all common browsers.

When implementing the content security policy, it makes sense to activate the `report-only` mode and to set up a [reporting endpoint](https://github.com/zero-24/csp-reporter-php). The browser sends all violations of the CSP to this endpoint. This way, the website can be adjusted before the rule is armed and website functions no longer work. The use of this directive is only recommended if you know what you are causing. In the worst case, the Joomla administration area will no longer function.

> If you want to receive a report by e-mail, the script at the address [https://github.com/zero-24/csp-reporter-php](https://github.com/zero-24/csp-reporter-php) offers a possibility.

Setting the content security policy in a `.htaccess` looks like this, for example:

```
<IfModule mod_headers.c>
  Content-Security-Policy "default-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests" "expr=%{CONTENT_TYPE} =~ m#text\/(html|javascript)|application\/pdf|xml#i"
</IfModule>
```

> Many sites include _inline styles_ and _inline scripts_, so it is necessary to add `unsafe-inline` for the site to work correctly.

## More Header

### X-Content-Type-Options

The header [X-Content-Type-Options](https://developer.mozilla.org/de/docs/Web/HTTP/Headers/X-Content-Type-Options) is straightforward to configure, has been included in the Joomla Core [`.htaccess`](https://github.com/joomla/joomla-cms/blob/9b54e8bd5da61dfc1a4d1476b9e0df608d7289e9/htaccess.txt#L30) since Joomla 3.9.13 and [is recommended for all Joomla websites](https://docs.joomla.org/J3.x:Joomla_3.9.3_Security_Notes).

There is one valid value. This is `nosniff`. If the header is set, the browser does not try to guess the mime type (file type) of a file. This is no longer necessary with today's websites and leads to unnecessary security problems.

Ideally, this header is [set](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Apache_Configuration_htaccess#prevent_some_browsers_from_mime-sniffing_the_response) in the file `.htaccess`. This way, the security function is activated independently of Joomla on web server levels:

```
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options "nosniff"
</IfModule>
```

### X-XSS-Protection

I mention this header for the sake of completeness. It is not configurable in the Joomla 4 backend. The HTTP [X-XSS-Protection](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection) header was intended to activate an XSS auditor in the browser. Modern browsers do not take this header into account [any more]https://portswigger.net/daily-swig/google-deprecates-xss-auditor-for-chrome).

The recommended configuration for older browsers is: `1; mode=block`. In Joomla 4, the header can only be configured via the file `.htaccess`. The header is set directly with the `.htaccess` file as follows:

```
<IfModule mod_headers.c>
  Header always set X-XSS-Protection 1; mode=block
</IfModule>
```

# More links

## Joomla Documentation

[Joomla Documentation](https://docs.joomla.org/J4.x:Http_Header_Management/en)

## csp-cheat-sheet

The [scotthelme.co.uk](https://scotthelme.co.uk/csp-cheat-sheet/) page provides an overview in English of all supported functions and directives in the _Content Security Policy_. It can be used as a quick reference to identify valid and invalid directives and values, and includes sample policies and guidance on how to use CSP effectively.

## CSP Evaluator

The [CSP Evaluator](https://csp-evaluator.withgoogle.com/) allows developers and security professionals to verify that a Content Security Policy (CSP) is a strong possibility against cross-site scripting attacks. It supports the process of reviewing CSP policies, which is usually a manual task, and helps identify CSP bypasses that undermine the value of a policy. The CSP Evaluator checks are based on a large-scale study and are designed to help developers harden their CSP and improve the security of their applications. This tool (also available as a Chrome extension) is provided for the developer's and Google makes no warranties or guarantees for this tool.
<img src="https://vg04.met.vgwort.de/na/ab35781f61344b8e975e684549ae417c" width="1" height="1" alt="">
