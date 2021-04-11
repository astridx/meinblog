---
date: 2020-12-20
title: 'Joomla 4.x Tutorial - Extension Development - Filter, Sort, Search'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-filtern-sortieren-suchen
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

Filtering, sorting and searching - now we organize the Joomla 4 component ! Joomla offers view filters and search tools with which you can limit the number of visible items. If the status filter is set accordingly, only items whose status is published will be displayed. Beside the status filter the search tools offer the search by title or content and the possibility to sort the table, i.e. to change the order.

![Joomla Filter Sort and Search -Search Tools](/images/j4x20x1.png)

## For impatient people

Look at the changed program code in the [Diff view](https://github.com/astridx/boilerplate/compare/t15a...t16) and take over these changes into your development version.

## Step by step

### New files

#### [administrator/components/com_foos/ forms/filter_foos.xml](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-680833320598887b6d6cc4feb95d4408)

First, we create the form through which the filters will be set.

[administrator/components/com_foos/ forms/filter_foos.xml](https://github.com/astridx/boilerplate/blob/t16/src/administrator/components/com_foos/forms/filter_foos.xml)

```xml {numberLines: -2}
<!-- https://github.com/astridx/boilerplate/blob/t16/src/administrator/components/com_foos/forms/filter_foos.xml -->







<!DOCTYPE html>
<html lang="en" >
  <head>
    <meta charset="utf-8">
  <link rel="dns-prefetch" href="https://github.githubassets.com">
  <link rel="dns-prefetch" href="https://avatars.githubusercontent.com">
  <link rel="dns-prefetch" href="https://github-cloud.s3.amazonaws.com">
  <link rel="dns-prefetch" href="https://user-images.githubusercontent.com/">



  <link crossorigin="anonymous" media="all" integrity="sha512-PYWr2OavT8crCvolPhJe+bHZ6PG6Q6cH7+2eZue+suNLa9t4w/spUoiSCNG+JfpZIL7kq9rnGXwNXCJup7IQdA==" rel="stylesheet" href="https://github.githubassets.com/assets/frameworks-3d85abd8e6af4fc72b0afa253e125ef9.css" />
  <link crossorigin="anonymous" media="all" integrity="sha512-jaRxAk/R7Eq6XXtxt2dWYc6UfgT/Jk9zYWYh4UpAt5LFRnYVaWqEM3sPhUFL3fOBmHhHoOcn4wfLkMS21Q1yaw==" rel="stylesheet" href="https://github.githubassets.com/assets/site-8da471024fd1ec4aba5d7b71b7675661.css" />
    <link crossorigin="anonymous" media="all" integrity="sha512-jTdvoiCezBiH9yw26ZDI7d23d6fazvCUVOTMSiazFi9Ag0lnqFGqlnrhp+Amz6ztXz95V+0IbSHzqqNl6w70lw==" rel="stylesheet" href="https://github.githubassets.com/assets/behaviors-8d376fa2209ecc1887f72c36e990c8ed.css" />



    <link crossorigin="anonymous" media="all" integrity="sha512-eJ5SF1C8dgIPoW4kSTUm8MSPC61sDW8j336tq+7uZvZpdLaeEGk8EWXbkkbdKQ8yyKI1KL4CC/WptyDK+RAsaQ==" rel="stylesheet" href="https://github.githubassets.com/assets/github-789e521750bc76020fa16e24493526f0.css" />

  <script crossorigin="anonymous" defer="defer" integrity="sha512-CzeY4A6TiG4fGZSWZU8FxmzFFmcQFoPpArF0hkH0/J/S7UL4eed/LKEXMQXfTwiG5yEJBI+9BdKG8KQJNbhcIQ==" type="application/javascript" src="https://github.githubassets.com/assets/environment-0b3798e0.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-sw16M2npbt+P8ZPI/qesmb/qYA6Ad+oDpDe0XtREwJGuXWwo/UUJkffPzbuCX52jypJzobNJD8S5Lt29O5Y2Xw==" type="application/javascript" src="https://github.githubassets.com/assets/chunk-frameworks-b30d7a33.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-xs/XWtVY6sgxCZKGLtrGrcsYgDgR0UR1Nx14ivzvJC0S8ZEB7BAxAOBDF8xFrtPq/6Vek9n2A2A8mx/odP+fMg==" type="application/javascript" src="https://github.githubassets.com/assets/chunk-vendor-c6cfd75a.js"></script>

  <script crossorigin="anonymous" defer="defer" integrity="sha512-eDTfGTSC0/46o8puZd5wMeJdQHea/FghXKFHuhF7uGNPrAv3CQTYAz6EAotJxaJWSYvw4YAXGJt1ZKIJc5TfDg==" type="application/javascript" src="https://github.githubassets.com/assets/behaviors-7834df19.js"></script>

    <script crossorigin="anonymous" defer="defer" integrity="sha512-PNWgI0klII5M3oY8I2gz0PscHM2y5Kssqx1GvudT71XK8SfIsY1xp8W8niacw7vwY9p9ghxl7Gs8IPf4VTGPlg==" type="application/javascript" data-module-id="./chunk-codemirror.js" data-src="https://github.githubassets.com/assets/chunk-codemirror-3cd5a023.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-SXIExRkA78ru95lnVy8pTP36kPC7hzl3VIKYLfpsc5uAPjCGkugvrynH4gHk7/pGQ2PP0930j37F1jkJm19ZFA==" type="application/javascript" data-module-id="./chunk-color-modes.js" data-src="https://github.githubassets.com/assets/chunk-color-modes-497204c5.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-aXaEDYjukiK8mNa8+JEeHDMUNEr8z/DwIXjEa6nHWMhucFO/lqq/6x+NnPYM4QDj2AFRU62EcCTYY9qNPBSrOA==" type="application/javascript" data-module-id="./chunk-contributions-spider-graph.js" data-src="https://github.githubassets.com/assets/chunk-contributions-spider-graph-6976840d.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-6j/oSF+kbW+yetNPvI684VzAu9pzug6Vj2h+3u1LdCuRhR4jnuiHZfeQKls3nxcT/S3H+oIt7FtigE/aeoj+gg==" type="application/javascript" data-module-id="./chunk-drag-drop.js" data-src="https://github.githubassets.com/assets/chunk-drag-drop-ea3fe848.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-ymxyvUviKFi+en2si3ZTyY4YCLRKlk0cKK/ngD9ir8xoeH44pCE1I4MBRQE5PcErmUJMhlcAk3+pgwHB7VcseA==" type="application/javascript" data-module-id="./chunk-edit.js" data-src="https://github.githubassets.com/assets/chunk-edit-ca6c72bd.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-aiqMIGGZGo8AQMjcoImKPMTsZVVRl6htCSY7BpRmpGPG/AF+Wq+P/Oj/dthWQOIk9cCNMPEas7O2zAR6oqn0tA==" type="application/javascript" data-module-id="./chunk-emoji-picker-element.js" data-src="https://github.githubassets.com/assets/chunk-emoji-picker-element-6a2a8c20.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-DAk56F8lz8k6kg6vf15oE4tu4MTIPDT9DUo3VwO8SLYyb3ws4QU433BG7eVXOS50wzl7dUuMFRfTP1rHlHi45g==" type="application/javascript" data-module-id="./chunk-filter-input.js" data-src="https://github.githubassets.com/assets/chunk-filter-input-0c0939e8.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-j5Eltv6XYkPt7XVCMWLH6qhNBoFOzxXLIsaoffjjTl2fw/sXVfluH+EGE5dYJPEBwsmqK0LenheRi9hmNcWnCA==" type="application/javascript" data-module-id="./chunk-insights-graph.js" data-src="https://github.githubassets.com/assets/chunk-insights-graph-8f9125b6.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-vvgGYQm5eXCUTRJj+GVP1X8JcE5y7Xakq/6U4rhjmUir2S4h0xgjjpSMK+T/Xb6zzdUNhi3goLzNpeiCu4BHoA==" type="application/javascript" data-module-id="./chunk-jump-to.js" data-src="https://github.githubassets.com/assets/chunk-jump-to-bef80661.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-ma0OOy3nj0c1cqBx0BkcmIFsLqcSZ+MIukQxyEFM/OWTzZpG+QMgOoWPAHZz43M6fyjAUG1jH6c/6LPiiKPCyw==" type="application/javascript" data-module-id="./chunk-profile-pins-element.js" data-src="https://github.githubassets.com/assets/chunk-profile-pins-element-99ad0e3b.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-9WNXtB07IyWypiPmkuucspwog4mme9q5GKGMSgd7FI0DPimmg/pEw+aaAofFV1vuWMt9I8H5QpsVtlbHGg1YBA==" type="application/javascript" data-module-id="./chunk-runner-groups.js" data-src="https://github.githubassets.com/assets/chunk-runner-groups-f56357b4.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-JoWpXsdKsRKFyspZP0lsV/mUnqLhErMvFLeq7PwLuptuR0JgHOv5NMWIeBqqWHuWmhIltMifR+/rEjO553Raug==" type="application/javascript" data-module-id="./chunk-sortable-behavior.js" data-src="https://github.githubassets.com/assets/chunk-sortable-behavior-2685a95e.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-WK8VXw3lfUQ/VRW0zlgKPhcMUqH0uTnB/KzePUPdZhCm/HpxfXXHKTGvj5C0Oex7+zbIM2ECzULbtTCT4ug3yg==" type="application/javascript" data-module-id="./chunk-toast.js" data-src="https://github.githubassets.com/assets/chunk-toast-58af155f.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-ZyozqjwhoIovRiwFwpwYmlQUgmIyGt5y8DgJhtiLHr9EM6f51vmXxaIIZap+ly64QSLa0zeA7DPCD6Yio2/AGA==" type="application/javascript" data-module-id="./chunk-tweetsodium.js" data-src="https://github.githubassets.com/assets/chunk-tweetsodium-672a33aa.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-XwZYpRsOiSlFjfpVmuwm13/NzEJdRXAtqYo3fZ54WRBePihtHMR1HLf2dCWxPT0DnBG0qcm9GszICyC/3CrEcg==" type="application/javascript" data-module-id="./chunk-user-status-submit.js" data-src="https://github.githubassets.com/assets/chunk-user-status-submit-5f0658a5.js"></script>

  <script crossorigin="anonymous" defer="defer" integrity="sha512-FdNzy+ow9f4RPLqXb68n6upzurTGw+sRQwx/ZXGlZxPJ4ady5NYGYjJcCGE6j900t/ZoYuDylxroHMuqx/Dy4w==" type="application/javascript" src="https://github.githubassets.com/assets/repositories-15d373cb.js"></script>
<script crossorigin="anonymous" defer="defer" integrity="sha512-9Py+eXPJzcXFKowJGSGfyuhLezFlGDOv05SFfHUa6NtBQE5TK+AFqBLmA8h8SHDKz9sSgFmOrfsdZutqbqAGeg==" type="application/javascript" src="https://github.githubassets.com/assets/diffs-f4fcbe79.js"></script>

  <meta name="viewport" content="width=device-width">

  <title>boilerplate/filter_foos.xml at t16 · astridx/boilerplate · GitHub</title>
    <meta name="description" content="Boilerplate files for Joomla! extensions. Contribute to astridx/boilerplate development by creating an account on GitHub.">
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub">
  <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub">
  <meta property="fb:app_id" content="1401488693436528">
  <meta name="apple-itunes-app" content="app-id=1477376905" />
    <meta name="twitter:image:src" content="https://avatars.githubusercontent.com/u/9974686?s=400&amp;v=4" /><meta name="twitter:site" content="@github" /><meta name="twitter:card" content="summary" /><meta name="twitter:title" content="astridx/boilerplate" /><meta name="twitter:description" content="Boilerplate files for Joomla! extensions. Contribute to astridx/boilerplate development by creating an account on GitHub." />
    <meta property="og:image" content="https://avatars.githubusercontent.com/u/9974686?s=400&amp;v=4" /><meta property="og:site_name" content="GitHub" /><meta property="og:type" content="object" /><meta property="og:title" content="astridx/boilerplate" /><meta property="og:url" content="https://github.com/astridx/boilerplate" /><meta property="og:description" content="Boilerplate files for Joomla! extensions. Contribute to astridx/boilerplate development by creating an account on GitHub." />





  <link rel="assets" href="https://github.githubassets.com/">


  <meta name="request-id" content="E581:4928:428638B:44A9955:6072CA6A" data-pjax-transient="true"/><meta name="html-safe-nonce" content="4d4e4ac09c3d3d071663202cea5e92f0ecb427ccb2cf870bf80f21600d565716" data-pjax-transient="true"/><meta name="visitor-payload" content="eyJyZWZlcnJlciI6IiIsInJlcXVlc3RfaWQiOiJFNTgxOjQ5Mjg6NDI4NjM4Qjo0NEE5OTU1OjYwNzJDQTZBIiwidmlzaXRvcl9pZCI6Ijc0MjA5Nzc3ODk5NTY5NjcwMTgiLCJyZWdpb25fZWRnZSI6ImZyYSIsInJlZ2lvbl9yZW5kZXIiOiJmcmEifQ==" data-pjax-transient="true"/><meta name="visitor-hmac" content="ff7bd7c41897992249926996b5fc02c27b9b39a4172eb75919153debc4ceb774" data-pjax-transient="true"/>

    <meta name="hovercard-subject-tag" content="repository:82167237" data-pjax-transient>


  <meta name="github-keyboard-shortcuts" content="repository,source-code" data-pjax-transient="true" />



  <meta name="selected-link" value="repo_source" data-pjax-transient>

    <meta name="google-site-verification" content="c1kuD-K2HIVF635lypcsWPoD4kilo5-jA_wBFyT4uMY">
  <meta name="google-site-verification" content="KT5gs8h0wvaagLKAVWq8bbeNwnZZK1r1XQysX3xurLU">
  <meta name="google-site-verification" content="ZzhVyEFwb7w3e0-uOTltm8Jsck2F5StVihD0exw2fsA">
  <meta name="google-site-verification" content="GXs5KoUUkNCoaAZn7wPN-t01Pywp9M3sEjnt_3_ZWPc">

  <meta name="octolytics-host" content="collector.githubapp.com" /><meta name="octolytics-app-id" content="github" /><meta name="octolytics-event-url" content="https://collector.githubapp.com/github-external/browser_event" />

  <meta name="analytics-location" content="/&lt;user-name&gt;/&lt;repo-name&gt;/blob/show" data-pjax-transient="true" />





  <meta name="optimizely-datafile" content="{&quot;version&quot;: &quot;4&quot;, &quot;rollouts&quot;: [], &quot;typedAudiences&quot;: [], &quot;anonymizeIP&quot;: true, &quot;projectId&quot;: &quot;16737760170&quot;, &quot;variables&quot;: [], &quot;featureFlags&quot;: [], &quot;experiments&quot;: [], &quot;audiences&quot;: [{&quot;conditions&quot;: &quot;[\&quot;or\&quot;, {\&quot;match\&quot;: \&quot;exact\&quot;, \&quot;name\&quot;: \&quot;$opt_dummy_attribute\&quot;, \&quot;type\&quot;: \&quot;custom_attribute\&quot;, \&quot;value\&quot;: \&quot;$opt_dummy_value\&quot;}]&quot;, &quot;id&quot;: &quot;$opt_dummy_audience&quot;, &quot;name&quot;: &quot;Optimizely-Generated Audience for Backwards Compatibility&quot;}], &quot;groups&quot;: [{&quot;policy&quot;: &quot;random&quot;, &quot;trafficAllocation&quot;: [{&quot;entityId&quot;: &quot;20065350824&quot;, &quot;endOfRange&quot;: 10000}], &quot;experiments&quot;: [{&quot;status&quot;: &quot;Running&quot;, &quot;audienceIds&quot;: [], &quot;variations&quot;: [{&quot;variables&quot;: [], &quot;id&quot;: &quot;20061181493&quot;, &quot;key&quot;: &quot;control&quot;}, {&quot;variables&quot;: [], &quot;id&quot;: &quot;20046091568&quot;, &quot;key&quot;: &quot;most_popular&quot;}], &quot;id&quot;: &quot;20065350824&quot;, &quot;key&quot;: &quot;pricing_page&quot;, &quot;layerId&quot;: &quot;20047761391&quot;, &quot;trafficAllocation&quot;: [{&quot;entityId&quot;: &quot;20061181493&quot;, &quot;endOfRange&quot;: 5000}, {&quot;entityId&quot;: &quot;20046091568&quot;, &quot;endOfRange&quot;: 10000}], &quot;forcedVariations&quot;: {&quot;890b7acea08c1711c74beff6bd78b5e7&quot;: &quot;control&quot;, &quot;235830406.1616679911&quot;: &quot;control&quot;, &quot;167363014.1617810094&quot;: &quot;most_popular&quot;, &quot;f7d5ee986ba8bcc155e2393401c920f7&quot;: &quot;most_popular&quot;, &quot;2022915492.1615428687&quot;: &quot;most_popular&quot;, &quot;1006574531.1617036769&quot;: &quot;control&quot;, &quot;1693726779.1607624005&quot;: &quot;most_popular&quot;, &quot;b3d9f4f9910bc46c43a8d65ab83d8570&quot;: &quot;most_popular&quot;, &quot;1800070736.1616613011&quot;: &quot;control&quot;}}], &quot;id&quot;: &quot;19972601768&quot;}], &quot;attributes&quot;: [{&quot;id&quot;: &quot;16822470375&quot;, &quot;key&quot;: &quot;user_id&quot;}, {&quot;id&quot;: &quot;17143601254&quot;, &quot;key&quot;: &quot;spammy&quot;}, {&quot;id&quot;: &quot;18175660309&quot;, &quot;key&quot;: &quot;organization_plan&quot;}, {&quot;id&quot;: &quot;18813001570&quot;, &quot;key&quot;: &quot;is_logged_in&quot;}, {&quot;id&quot;: &quot;19073851829&quot;, &quot;key&quot;: &quot;geo&quot;}, {&quot;id&quot;: &quot;20175462351&quot;, &quot;key&quot;: &quot;requestedCurrency&quot;}], &quot;botFiltering&quot;: false, &quot;accountId&quot;: &quot;16737760170&quot;, &quot;events&quot;: [{&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;17911811441&quot;, &quot;key&quot;: &quot;hydro_click.dashboard.teacher_toolbox_cta&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18124116703&quot;, &quot;key&quot;: &quot;submit.organizations.complete_sign_up&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18145892387&quot;, &quot;key&quot;: &quot;no_metric.tracked_outside_of_optimizely&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18178755568&quot;, &quot;key&quot;: &quot;click.org_onboarding_checklist.add_repo&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18180553241&quot;, &quot;key&quot;: &quot;submit.repository_imports.create&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18186103728&quot;, &quot;key&quot;: &quot;click.help.learn_more_about_repository_creation&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18188530140&quot;, &quot;key&quot;: &quot;test_event.do_not_use_in_production&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18191963644&quot;, &quot;key&quot;: &quot;click.empty_org_repo_cta.transfer_repository&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18195612788&quot;, &quot;key&quot;: &quot;click.empty_org_repo_cta.import_repository&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18210945499&quot;, &quot;key&quot;: &quot;click.org_onboarding_checklist.invite_members&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18211063248&quot;, &quot;key&quot;: &quot;click.empty_org_repo_cta.create_repository&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18215721889&quot;, &quot;key&quot;: &quot;click.org_onboarding_checklist.update_profile&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18224360785&quot;, &quot;key&quot;: &quot;click.org_onboarding_checklist.dismiss&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18234832286&quot;, &quot;key&quot;: &quot;submit.organization_activation.complete&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18252392383&quot;, &quot;key&quot;: &quot;submit.org_repository.create&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18257551537&quot;, &quot;key&quot;: &quot;submit.org_member_invitation.create&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18259522260&quot;, &quot;key&quot;: &quot;submit.organization_profile.update&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18564603625&quot;, &quot;key&quot;: &quot;view.classroom_select_organization&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18568612016&quot;, &quot;key&quot;: &quot;click.classroom_sign_in_click&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18572592540&quot;, &quot;key&quot;: &quot;view.classroom_name&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18574203855&quot;, &quot;key&quot;: &quot;click.classroom_create_organization&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18582053415&quot;, &quot;key&quot;: &quot;click.classroom_select_organization&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18589463420&quot;, &quot;key&quot;: &quot;click.classroom_create_classroom&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18591323364&quot;, &quot;key&quot;: &quot;click.classroom_create_first_classroom&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18591652321&quot;, &quot;key&quot;: &quot;click.classroom_grant_access&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18607131425&quot;, &quot;key&quot;: &quot;view.classroom_creation&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18831680583&quot;, &quot;key&quot;: &quot;upgrade_account_plan&quot;}, {&quot;experimentIds&quot;: [&quot;20065350824&quot;], &quot;id&quot;: &quot;19064064515&quot;, &quot;key&quot;: &quot;click.signup&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;19075373687&quot;, &quot;key&quot;: &quot;click.view_account_billing_page&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;19077355841&quot;, &quot;key&quot;: &quot;click.dismiss_signup_prompt&quot;}, {&quot;experimentIds&quot;: [&quot;20065350824&quot;], &quot;id&quot;: &quot;19079713938&quot;, &quot;key&quot;: &quot;click.contact_sales&quot;}, {&quot;experimentIds&quot;: [&quot;20065350824&quot;], &quot;id&quot;: &quot;19120963070&quot;, &quot;key&quot;: &quot;click.compare_account_plans&quot;}, {&quot;experimentIds&quot;: [&quot;20065350824&quot;], &quot;id&quot;: &quot;19151690317&quot;, &quot;key&quot;: &quot;click.upgrade_account_cta&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;19424193129&quot;, &quot;key&quot;: &quot;click.open_account_switcher&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;19520330825&quot;, &quot;key&quot;: &quot;click.visit_account_profile&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;19540970635&quot;, &quot;key&quot;: &quot;click.switch_account_context&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;19730198868&quot;, &quot;key&quot;: &quot;submit.homepage_signup&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;19820830627&quot;, &quot;key&quot;: &quot;click.homepage_signup&quot;}, {&quot;experimentIds&quot;: [&quot;20065350824&quot;], &quot;id&quot;: &quot;19988571001&quot;, &quot;key&quot;: &quot;click.create_enterprise_trial&quot;}, {&quot;experimentIds&quot;: [&quot;20065350824&quot;], &quot;id&quot;: &quot;20036538294&quot;, &quot;key&quot;: &quot;click.create_organization_team&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;20040653299&quot;, &quot;key&quot;: &quot;click.input_enterprise_trial_form&quot;}, {&quot;experimentIds&quot;: [&quot;20065350824&quot;], &quot;id&quot;: &quot;20062030003&quot;, &quot;key&quot;: &quot;click.continue_with_team&quot;}, {&quot;experimentIds&quot;: [&quot;20065350824&quot;], &quot;id&quot;: &quot;20068947153&quot;, &quot;key&quot;: &quot;click.create_organization_free&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;20086636658&quot;, &quot;key&quot;: &quot;click.signup_continue.username&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;20091648988&quot;, &quot;key&quot;: &quot;click.signup_continue.create_account&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;20103637615&quot;, &quot;key&quot;: &quot;click.signup_continue.email&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;20111574253&quot;, &quot;key&quot;: &quot;click.signup_continue.password&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;20120044111&quot;, &quot;key&quot;: &quot;view.pricing_page&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;20152062109&quot;, &quot;key&quot;: &quot;submit.create_account&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;20165800992&quot;, &quot;key&quot;: &quot;submit.upgrade_payment_form&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;20171520319&quot;, &quot;key&quot;: &quot;submit.create_organization&quot;}], &quot;revision&quot;: &quot;595&quot;}" />
  <!-- To prevent page flashing, the optimizely JS needs to be loaded in the
    <head> tag before the DOM renders -->
  <script crossorigin="anonymous" defer="defer" integrity="sha512-pYsZ5nv4Ik2oB39Lk84n9CLvbtMKb2uANcvFiEMMHva18PyfI08ZSA8xKPFF1l3BEHRDxpEdl8kU+vssPUqcGQ==" type="application/javascript" src="https://github.githubassets.com/assets/optimizely-a58b19e6.js"></script>





      <meta name="hostname" content="github.com">
    <meta name="user-login" content="">


      <meta name="expected-hostname" content="github.com">


    <meta name="enabled-features" content="MARKETPLACE_PENDING_INSTALLATIONS,AUTOCOMPLETE_EMOJIS_IN_MARKDOWN_EDITOR">

  <meta http-equiv="x-pjax-version" content="3b5355b3138a2756b60e27c14b4eaba4d445777b0c7fb1f138783e875270bc3d">



  <meta name="go-import" content="github.com/astridx/boilerplate git https://github.com/astridx/boilerplate.git">

  <meta name="octolytics-dimension-user_id" content="9974686" /><meta name="octolytics-dimension-user_login" content="astridx" /><meta name="octolytics-dimension-repository_id" content="82167237" /><meta name="octolytics-dimension-repository_nwo" content="astridx/boilerplate" /><meta name="octolytics-dimension-repository_public" content="true" /><meta name="octolytics-dimension-repository_is_fork" content="true" /><meta name="octolytics-dimension-repository_parent_id" content="62122373" /><meta name="octolytics-dimension-repository_parent_nwo" content="joomla-extensions/boilerplate" /><meta name="octolytics-dimension-repository_network_root_id" content="62122373" /><meta name="octolytics-dimension-repository_network_root_nwo" content="joomla-extensions/boilerplate" />



    <link rel="canonical" href="https://github.com/astridx/boilerplate/blob/t16/src/administrator/components/com_foos/forms/filter_foos.xml" data-pjax-transient>


  <meta name="browser-stats-url" content="https://api.github.com/_private/browser/stats">

  <meta name="browser-errors-url" content="https://api.github.com/_private/browser/errors">

  <meta name="browser-optimizely-client-errors-url" content="https://api.github.com/_private/browser/optimizely_client/errors">

  <link rel="mask-icon" href="https://github.githubassets.com/pinned-octocat.svg" color="#000000">
  <link rel="alternate icon" class="js-site-favicon" type="image/png" href="https://github.githubassets.com/favicons/favicon.png">
  <link rel="icon" class="js-site-favicon" type="image/svg+xml" href="https://github.githubassets.com/favicons/favicon.svg">

<meta name="theme-color" content="#1e2327">



  <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials">

  </head>

  <body class="logged-out env-production page-responsive page-blob" style="word-wrap: break-word;">


    <div class="position-relative js-header-wrapper ">
      <a href="#start-of-content" class="px-2 py-4 color-bg-info-inverse color-text-white show-on-focus js-skip-to-content">Skip to content</a>
      <span class="progress-pjax-loader width-full js-pjax-loader-bar Progress position-fixed">
    <span style="background-color: #79b8ff;width: 0%;" class="Progress-item progress-pjax-loader-bar "></span>
</span>



            <header class="Header-old header-logged-out js-details-container Details position-relative f4 py-2" role="banner">
  <div class="container-xl d-lg-flex flex-items-center p-responsive">
    <div class="d-flex flex-justify-between flex-items-center">
        <a class="mr-4" href="https://github.com/" aria-label="Homepage" data-ga-click="(Logged out) Header, go to homepage, icon:logo-wordmark">
          <svg height="32" class="octicon octicon-mark-github color-text-white" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
        </a>

          <div class="d-lg-none css-truncate css-truncate-target width-fit p-2">


          </div>

        <div class="d-flex flex-items-center">
              <a href="/join?ref_cta=Sign+up&amp;ref_loc=header+logged+out&amp;ref_page=%2F%3Cuser-name%3E%2F%3Crepo-name%3E%2Fblob%2Fshow&amp;source=header-repo"
                class="d-inline-block d-lg-none f5 color-text-white no-underline border color-border-tertiary rounded-2 px-2 py-1 mr-3 mr-sm-5 js-signup-redesign-control js-signup-redesign-target"
                data-hydro-click="{&quot;event_type&quot;:&quot;authentication.click&quot;,&quot;payload&quot;:{&quot;location_in_page&quot;:&quot;site header&quot;,&quot;repository_id&quot;:null,&quot;auth_type&quot;:&quot;SIGN_UP&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t16/src/administrator/components/com_foos/forms/filter_foos.xml&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="53ef9e52a632042b0a72324e7c2f43a8df14abb7bf206dcb2ad89e6455f20416"
              >
                Sign&nbsp;up
              </a>
              <a href="/join_next?ref_cta=Sign+up&amp;ref_loc=header+logged+out&amp;ref_page=%2F%3Cuser-name%3E%2F%3Crepo-name%3E%2Fblob%2Fshow&amp;source=header-repo"
                class="d-inline-block d-lg-none f5 color-text-white no-underline border color-border-tertiary rounded-2 px-2 py-1 mr-3 mr-sm-5 js-signup-redesign-variation js-signup-redesign-target"
                hidden
                data-hydro-click="{&quot;event_type&quot;:&quot;authentication.click&quot;,&quot;payload&quot;:{&quot;location_in_page&quot;:&quot;site header&quot;,&quot;repository_id&quot;:null,&quot;auth_type&quot;:&quot;SIGN_UP&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t16/src/administrator/components/com_foos/forms/filter_foos.xml&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="53ef9e52a632042b0a72324e7c2f43a8df14abb7bf206dcb2ad89e6455f20416"
              >
                Sign&nbsp;up
              </a>

          <button class="btn-link d-lg-none mt-1 js-details-target" type="button" aria-label="Toggle navigation" aria-expanded="false">
            <svg height="24" class="octicon octicon-three-bars color-text-white" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true"><path fill-rule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z"></path></svg>
          </button>
        </div>
    </div>

    <div class="HeaderMenu HeaderMenu--logged-out position-fixed top-0 right-0 bottom-0 height-fit position-lg-relative d-lg-flex flex-justify-between flex-items-center flex-auto">
      <div class="d-flex d-lg-none flex-justify-end border-bottom color-bg-secondary p-3">
        <button class="btn-link js-details-target" type="button" aria-label="Toggle navigation" aria-expanded="false">
          <svg height="24" class="octicon octicon-x color-text-secondary" viewBox="0 0 24 24" version="1.1" width="24" aria-hidden="true"><path fill-rule="evenodd" d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"></path></svg>
        </button>
      </div>

        <nav class="mt-0 px-3 px-lg-0 mb-5 mb-lg-0" aria-label="Global">
          <ul class="d-lg-flex list-style-none">
              <li class="d-block d-lg-flex flex-lg-nowrap flex-lg-items-center border-bottom border-lg-bottom-0 mr-0 mr-lg-3 edge-item-fix position-relative flex-wrap flex-justify-between d-flex flex-items-center ">
                <details class="HeaderMenu-details details-overlay details-reset width-full">
                  <summary class="HeaderMenu-summary HeaderMenu-link px-0 py-3 border-0 no-wrap d-block d-lg-inline-block">
                    Why GitHub?
                    <svg x="0px" y="0px" viewBox="0 0 14 8" xml:space="preserve" fill="none" class="icon-chevon-down-mktg position-absolute position-lg-relative">
                      <path d="M1,1l6.2,6L13,1"></path>
                    </svg>
                  </summary>
                  <div class="dropdown-menu flex-auto rounded px-0 mt-0 pb-4 p-lg-4 position-relative position-lg-absolute left-0 left-lg-n4">
                    <a href="/features" class="py-2 lh-condensed-ultra d-block Link--primary no-underline h5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Features">Features <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a>
                    <ul class="list-style-none f5 pb-3">
                        <li class="edge-item-fix"><a href="/mobile" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover">Mobile <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                        <li class="edge-item-fix"><a href="/features/actions" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover">Actions <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                        <li class="edge-item-fix"><a href="/features/codespaces" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover">Codespaces <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                        <li class="edge-item-fix"><a href="/features/packages" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover">Packages <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                        <li class="edge-item-fix"><a href="/features/security" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover">Security <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                        <li class="edge-item-fix"><a href="/features/code-review/" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover">Code review <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                        <li class="edge-item-fix"><a href="/features/project-management/" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover">Project management <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                        <li class="edge-item-fix"><a href="/features/integrations" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover">Integrations <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                    </ul>

                    <ul class="list-style-none mb-0 border-lg-top pt-lg-3">
                      <li class="edge-item-fix"><a href="/sponsors" class="py-2 lh-condensed-ultra d-block no-underline Link--primary no-underline h5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Sponsors">GitHub Sponsors <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                      <li class="edge-item-fix"><a href="/customer-stories" class="py-2 lh-condensed-ultra d-block no-underline Link--primary no-underline h5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Customer stories">Customer stories<span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                    </ul>
                  </div>
                </details>
              </li>
              <li class="border-bottom border-lg-bottom-0 mr-0 mr-lg-3">
                <a href="/team" class="HeaderMenu-link no-underline py-3 d-block d-lg-inline-block" data-ga-click="(Logged out) Header, go to Team">Team</a>
              </li>
              <li class="border-bottom border-lg-bottom-0 mr-0 mr-lg-3">
                <a href="/enterprise" class="HeaderMenu-link no-underline py-3 d-block d-lg-inline-block" data-ga-click="(Logged out) Header, go to Enterprise">Enterprise</a>
              </li>

              <li class="d-block d-lg-flex flex-lg-nowrap flex-lg-items-center border-bottom border-lg-bottom-0 mr-0 mr-lg-3 edge-item-fix position-relative flex-wrap flex-justify-between d-flex flex-items-center ">
                <details class="HeaderMenu-details details-overlay details-reset width-full">
                  <summary class="HeaderMenu-summary HeaderMenu-link px-0 py-3 border-0 no-wrap d-block d-lg-inline-block">
                    Explore
                    <svg x="0px" y="0px" viewBox="0 0 14 8" xml:space="preserve" fill="none" class="icon-chevon-down-mktg position-absolute position-lg-relative">
                      <path d="M1,1l6.2,6L13,1"></path>
                    </svg>
                  </summary>

                  <div class="dropdown-menu flex-auto rounded px-0 pt-2 pb-0 mt-0 pb-4 p-lg-4 position-relative position-lg-absolute left-0 left-lg-n4">
                    <ul class="list-style-none mb-3">
                      <li class="edge-item-fix"><a href="/explore" class="py-2 lh-condensed-ultra d-block Link--primary no-underline h5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Explore">Explore GitHub <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                    </ul>

                    <h4 class="color-text-tertiary text-normal text-mono f5 mb-2 border-lg-top pt-lg-3">Learn and contribute</h4>
                    <ul class="list-style-none mb-3">
                      <li class="edge-item-fix"><a href="/topics" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Topics">Topics <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                        <li class="edge-item-fix"><a href="/collections" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Collections">Collections <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                      <li class="edge-item-fix"><a href="/trending" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Trending">Trending <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                      <li class="edge-item-fix"><a href="https://lab.github.com/" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Learning lab">Learning Lab <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                      <li class="edge-item-fix"><a href="https://opensource.guide" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Open source guides">Open source guides <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                    </ul>

                    <h4 class="color-text-tertiary text-normal text-mono f5 mb-2 border-lg-top pt-lg-3">Connect with others</h4>
                    <ul class="list-style-none mb-0">
                      <li class="edge-item-fix"><a href="https://github.com/readme" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover">The ReadME Project <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                      <li class="edge-item-fix"><a href="https://github.com/events" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Events">Events <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                      <li class="edge-item-fix"><a href="https://github.community" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Community forum">Community forum <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                      <li class="edge-item-fix"><a href="https://education.github.com" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to GitHub Education">GitHub Education <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                      <li class="edge-item-fix"><a href="https://stars.github.com" class="py-2 pb-0 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to GitHub Stars Program">GitHub Stars program <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                    </ul>
                  </div>
                </details>
              </li>

              <li class="border-bottom border-lg-bottom-0 mr-0 mr-lg-3">
                <a href="/marketplace" class="HeaderMenu-link no-underline py-3 d-block d-lg-inline-block" data-ga-click="(Logged out) Header, go to Marketplace">Marketplace</a>
              </li>

              <li class="d-block d-lg-flex flex-lg-nowrap flex-lg-items-center border-bottom border-lg-bottom-0 mr-0 mr-lg-3 edge-item-fix position-relative flex-wrap flex-justify-between d-flex flex-items-center ">
                <details class="HeaderMenu-details details-overlay details-reset width-full">
                  <summary class="HeaderMenu-summary HeaderMenu-link px-0 py-3 border-0 no-wrap d-block d-lg-inline-block">
                    Pricing
                    <svg x="0px" y="0px" viewBox="0 0 14 8" xml:space="preserve" fill="none" class="icon-chevon-down-mktg position-absolute position-lg-relative">
                       <path d="M1,1l6.2,6L13,1"></path>
                    </svg>
                  </summary>

                  <div class="dropdown-menu flex-auto rounded px-0 pt-2 pb-4 mt-0 p-lg-4 position-relative position-lg-absolute left-0 left-lg-n4">
                    <a href="/pricing" class="pb-2 lh-condensed-ultra d-block Link--primary no-underline h5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Pricing">Plans <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a>

                    <ul class="list-style-none mb-3">
                      <li class="edge-item-fix"><a href="/pricing#feature-comparison" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Compare plans">Compare plans <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                      <li class="edge-item-fix"><a href="https://enterprise.github.com/contact" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Contact Sales">Contact Sales <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                    </ul>

                    <ul class="list-style-none mb-0 border-lg-top pt-lg-3">
                      <li class="edge-item-fix"><a href="https://education.github.com" class="py-2 pb-0 lh-condensed-ultra d-block no-underline Link--primary no-underline h5 Bump-link--hover"  data-ga-click="(Logged out) Header, go to Education">Education <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                    </ul>
                  </div>
                </details>
              </li>
          </ul>
        </nav>

      <div class="d-lg-flex flex-items-center px-3 px-lg-0 text-center text-lg-left">
          <div class="d-lg-flex min-width-0 mb-3 mb-lg-0">
            <div class="header-search flex-auto js-site-search position-relative flex-self-stretch flex-md-self-auto mb-3 mb-md-0 mr-0 mr-md-3 scoped-search site-scoped-search js-jump-to"
  role="combobox"
  aria-owns="jump-to-results"
  aria-label="Search or jump to"
  aria-haspopup="listbox"
  aria-expanded="false"
>
  <div class="position-relative">
    <!-- '"` --><!-- </textarea></xmp> --></option></form><form class="js-site-search-form" role="search" aria-label="Site" data-scope-type="Repository" data-scope-id="82167237" data-scoped-search-url="/astridx/boilerplate/search" data-owner-scoped-search-url="/users/astridx/search" data-unscoped-search-url="/search" action="/astridx/boilerplate/search" accept-charset="UTF-8" method="get">
      <label class="form-control input-sm header-search-wrapper p-0 js-chromeless-input-container header-search-wrapper-jump-to position-relative d-flex flex-justify-between flex-items-center">
        <input type="text"
          class="form-control input-sm header-search-input jump-to-field js-jump-to-field js-site-search-focus js-site-search-field is-clearable"
          data-hotkey="s,/"
          name="q"
          value=""
          placeholder="Search"
          data-unscoped-placeholder="Search GitHub"
          data-scoped-placeholder="Search"
          autocapitalize="off"
          aria-autocomplete="list"
          aria-controls="jump-to-results"
          aria-label="Search"
          data-jump-to-suggestions-path="/_graphql/GetSuggestedNavigationDestinations"
          spellcheck="false"
          autocomplete="off"
          >
          <input type="hidden" data-csrf="true" class="js-data-jump-to-suggestions-path-csrf" value="0Iqqxn+wnm3bwT0RqCTeKyhQOhTymz9z18nvJWGGpPD3TQ+EjFaUiW+DdwRS4rf0rkSYfbXMud0XMGS/v9EORQ==" />
          <input type="hidden" class="js-site-search-type-field" name="type" >
            <img src="https://github.githubassets.com/images/search-key-slash.svg" alt="" class="mr-2 header-search-key-slash">

            <div class="Box position-absolute overflow-hidden d-none jump-to-suggestions js-jump-to-suggestions-container">

<ul class="d-none js-jump-to-suggestions-template-container">


<li class="d-flex flex-justify-start flex-items-center p-0 f5 navigation-item js-navigation-item js-jump-to-suggestion" role="option">
  <a tabindex="-1" class="no-underline d-flex flex-auto flex-items-center jump-to-suggestions-path js-jump-to-suggestion-path js-navigation-open p-2" href="" data-item-type="suggestion">
    <div class="jump-to-octicon js-jump-to-octicon flex-shrink-0 mr-2 text-center d-none">
      <svg height="16" width="16" class="octicon octicon-repo flex-shrink-0 js-jump-to-octicon-repo d-none" title="Repository" aria-label="Repository" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>
      <svg height="16" width="16" class="octicon octicon-project flex-shrink-0 js-jump-to-octicon-project d-none" title="Project" aria-label="Project" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z"></path></svg>
      <svg height="16" width="16" class="octicon octicon-search flex-shrink-0 js-jump-to-octicon-search d-none" title="Search" aria-label="Search" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"></path></svg>
    </div>

    <img class="avatar mr-2 flex-shrink-0 js-jump-to-suggestion-avatar d-none" alt="" aria-label="Team" src="" width="28" height="28">

    <div class="jump-to-suggestion-name js-jump-to-suggestion-name flex-auto overflow-hidden text-left no-wrap css-truncate css-truncate-target">
    </div>

    <div class="border rounded-1 flex-shrink-0 color-bg-tertiary px-1 color-text-tertiary ml-1 f6 d-none js-jump-to-badge-search">
      <span class="js-jump-to-badge-search-text-default d-none" aria-label="in this repository">
        In this repository
      </span>
      <span class="js-jump-to-badge-search-text-global d-none" aria-label="in all of GitHub">
        All GitHub
      </span>
      <span aria-hidden="true" class="d-inline-block ml-1 v-align-middle">↵</span>
    </div>

    <div aria-hidden="true" class="border rounded-1 flex-shrink-0 color-bg-tertiary px-1 color-text-tertiary ml-1 f6 d-none d-on-nav-focus js-jump-to-badge-jump">
      Jump to
      <span class="d-inline-block ml-1 v-align-middle">↵</span>
    </div>
  </a>
</li>

</ul>

<ul class="d-none js-jump-to-no-results-template-container">
  <li class="d-flex flex-justify-center flex-items-center f5 d-none js-jump-to-suggestion p-2">
    <span class="color-text-secondary">No suggested jump to results</span>
  </li>
</ul>

<ul id="jump-to-results" role="listbox" class="p-0 m-0 js-navigation-container jump-to-suggestions-results-container js-jump-to-suggestions-results-container">


<li class="d-flex flex-justify-start flex-items-center p-0 f5 navigation-item js-navigation-item js-jump-to-scoped-search d-none" role="option">
  <a tabindex="-1" class="no-underline d-flex flex-auto flex-items-center jump-to-suggestions-path js-jump-to-suggestion-path js-navigation-open p-2" href="" data-item-type="scoped_search">
    <div class="jump-to-octicon js-jump-to-octicon flex-shrink-0 mr-2 text-center d-none">
      <svg height="16" width="16" class="octicon octicon-repo flex-shrink-0 js-jump-to-octicon-repo d-none" title="Repository" aria-label="Repository" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>
      <svg height="16" width="16" class="octicon octicon-project flex-shrink-0 js-jump-to-octicon-project d-none" title="Project" aria-label="Project" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z"></path></svg>
      <svg height="16" width="16" class="octicon octicon-search flex-shrink-0 js-jump-to-octicon-search d-none" title="Search" aria-label="Search" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"></path></svg>
    </div>

    <img class="avatar mr-2 flex-shrink-0 js-jump-to-suggestion-avatar d-none" alt="" aria-label="Team" src="" width="28" height="28">

    <div class="jump-to-suggestion-name js-jump-to-suggestion-name flex-auto overflow-hidden text-left no-wrap css-truncate css-truncate-target">
    </div>

    <div class="border rounded-1 flex-shrink-0 color-bg-tertiary px-1 color-text-tertiary ml-1 f6 d-none js-jump-to-badge-search">
      <span class="js-jump-to-badge-search-text-default d-none" aria-label="in this repository">
        In this repository
      </span>
      <span class="js-jump-to-badge-search-text-global d-none" aria-label="in all of GitHub">
        All GitHub
      </span>
      <span aria-hidden="true" class="d-inline-block ml-1 v-align-middle">↵</span>
    </div>

    <div aria-hidden="true" class="border rounded-1 flex-shrink-0 color-bg-tertiary px-1 color-text-tertiary ml-1 f6 d-none d-on-nav-focus js-jump-to-badge-jump">
      Jump to
      <span class="d-inline-block ml-1 v-align-middle">↵</span>
    </div>
  </a>
</li>



<li class="d-flex flex-justify-start flex-items-center p-0 f5 navigation-item js-navigation-item js-jump-to-owner-scoped-search d-none" role="option">
  <a tabindex="-1" class="no-underline d-flex flex-auto flex-items-center jump-to-suggestions-path js-jump-to-suggestion-path js-navigation-open p-2" href="" data-item-type="owner_scoped_search">
    <div class="jump-to-octicon js-jump-to-octicon flex-shrink-0 mr-2 text-center d-none">
      <svg height="16" width="16" class="octicon octicon-repo flex-shrink-0 js-jump-to-octicon-repo d-none" title="Repository" aria-label="Repository" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>
      <svg height="16" width="16" class="octicon octicon-project flex-shrink-0 js-jump-to-octicon-project d-none" title="Project" aria-label="Project" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z"></path></svg>
      <svg height="16" width="16" class="octicon octicon-search flex-shrink-0 js-jump-to-octicon-search d-none" title="Search" aria-label="Search" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"></path></svg>
    </div>

    <img class="avatar mr-2 flex-shrink-0 js-jump-to-suggestion-avatar d-none" alt="" aria-label="Team" src="" width="28" height="28">

    <div class="jump-to-suggestion-name js-jump-to-suggestion-name flex-auto overflow-hidden text-left no-wrap css-truncate css-truncate-target">
    </div>

    <div class="border rounded-1 flex-shrink-0 color-bg-tertiary px-1 color-text-tertiary ml-1 f6 d-none js-jump-to-badge-search">
      <span class="js-jump-to-badge-search-text-default d-none" aria-label="in this user">
        In this user
      </span>
      <span class="js-jump-to-badge-search-text-global d-none" aria-label="in all of GitHub">
        All GitHub
      </span>
      <span aria-hidden="true" class="d-inline-block ml-1 v-align-middle">↵</span>
    </div>

    <div aria-hidden="true" class="border rounded-1 flex-shrink-0 color-bg-tertiary px-1 color-text-tertiary ml-1 f6 d-none d-on-nav-focus js-jump-to-badge-jump">
      Jump to
      <span class="d-inline-block ml-1 v-align-middle">↵</span>
    </div>
  </a>
</li>



<li class="d-flex flex-justify-start flex-items-center p-0 f5 navigation-item js-navigation-item js-jump-to-global-search d-none" role="option">
  <a tabindex="-1" class="no-underline d-flex flex-auto flex-items-center jump-to-suggestions-path js-jump-to-suggestion-path js-navigation-open p-2" href="" data-item-type="global_search">
    <div class="jump-to-octicon js-jump-to-octicon flex-shrink-0 mr-2 text-center d-none">
      <svg height="16" width="16" class="octicon octicon-repo flex-shrink-0 js-jump-to-octicon-repo d-none" title="Repository" aria-label="Repository" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>
      <svg height="16" width="16" class="octicon octicon-project flex-shrink-0 js-jump-to-octicon-project d-none" title="Project" aria-label="Project" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z"></path></svg>
      <svg height="16" width="16" class="octicon octicon-search flex-shrink-0 js-jump-to-octicon-search d-none" title="Search" aria-label="Search" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"></path></svg>
    </div>

    <img class="avatar mr-2 flex-shrink-0 js-jump-to-suggestion-avatar d-none" alt="" aria-label="Team" src="" width="28" height="28">

    <div class="jump-to-suggestion-name js-jump-to-suggestion-name flex-auto overflow-hidden text-left no-wrap css-truncate css-truncate-target">
    </div>

    <div class="border rounded-1 flex-shrink-0 color-bg-tertiary px-1 color-text-tertiary ml-1 f6 d-none js-jump-to-badge-search">
      <span class="js-jump-to-badge-search-text-default d-none" aria-label="in this repository">
        In this repository
      </span>
      <span class="js-jump-to-badge-search-text-global d-none" aria-label="in all of GitHub">
        All GitHub
      </span>
      <span aria-hidden="true" class="d-inline-block ml-1 v-align-middle">↵</span>
    </div>

    <div aria-hidden="true" class="border rounded-1 flex-shrink-0 color-bg-tertiary px-1 color-text-tertiary ml-1 f6 d-none d-on-nav-focus js-jump-to-badge-jump">
      Jump to
      <span class="d-inline-block ml-1 v-align-middle">↵</span>
    </div>
  </a>
</li>


</ul>

            </div>
      </label>
</form>  </div>
</div>

          </div>

        <a href="/login?return_to=%2Fastridx%2Fboilerplate%2Fblob%2Ft16%2Fsrc%2Fadministrator%2Fcomponents%2Fcom_foos%2Fforms%2Ffilter_foos.xml"
          class="HeaderMenu-link flex-shrink-0 no-underline mr-3"
          data-hydro-click="{&quot;event_type&quot;:&quot;authentication.click&quot;,&quot;payload&quot;:{&quot;location_in_page&quot;:&quot;site header menu&quot;,&quot;repository_id&quot;:null,&quot;auth_type&quot;:&quot;SIGN_UP&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t16/src/administrator/components/com_foos/forms/filter_foos.xml&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="954997b7e027bbec966738fff4b4e030555b464b94c8dedc358f401998d08162"
          data-ga-click="(Logged out) Header, clicked Sign in, text:sign-in">
          Sign in
        </a>
            <a href="/join?ref_cta=Sign+up&amp;ref_loc=header+logged+out&amp;ref_page=%2F%3Cuser-name%3E%2F%3Crepo-name%3E%2Fblob%2Fshow&amp;source=header-repo&amp;source_repo=astridx%2Fboilerplate"
              class="HeaderMenu-link flex-shrink-0 d-inline-block no-underline border color-border-tertiary rounded px-2 py-1 js-signup-redesign-target js-signup-redesign-control"
              data-hydro-click="{&quot;event_type&quot;:&quot;authentication.click&quot;,&quot;payload&quot;:{&quot;location_in_page&quot;:&quot;site header menu&quot;,&quot;repository_id&quot;:null,&quot;auth_type&quot;:&quot;SIGN_UP&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t16/src/administrator/components/com_foos/forms/filter_foos.xml&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="954997b7e027bbec966738fff4b4e030555b464b94c8dedc358f401998d08162"
              data-hydro-click="{&quot;event_type&quot;:&quot;analytics.click&quot;,&quot;payload&quot;:{&quot;category&quot;:&quot;Sign up&quot;,&quot;action&quot;:&quot;click to sign up for account&quot;,&quot;label&quot;:&quot;ref_page:/&lt;user-name&gt;/&lt;repo-name&gt;/blob/show;ref_cta:Sign up;ref_loc:header logged out&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t16/src/administrator/components/com_foos/forms/filter_foos.xml&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="e54b34639fad663c419056064648e92b5727a9663481773bfe38ce1ef28201bd"
            >
              Sign up
            </a>
            <a href="/join_next?ref_cta=Sign+up&amp;ref_loc=header+logged+out&amp;ref_page=%2F%3Cuser-name%3E%2F%3Crepo-name%3E%2Fblob%2Fshow&amp;source=header-repo&amp;source_repo=astridx%2Fboilerplate"
              class="HeaderMenu-link flex-shrink-0 d-inline-block no-underline border color-border-tertiary rounded-1 px-2 py-1 js-signup-redesign-target js-signup-redesign-variation"
              hidden
              data-hydro-click="{&quot;event_type&quot;:&quot;authentication.click&quot;,&quot;payload&quot;:{&quot;location_in_page&quot;:&quot;site header menu&quot;,&quot;repository_id&quot;:null,&quot;auth_type&quot;:&quot;SIGN_UP&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t16/src/administrator/components/com_foos/forms/filter_foos.xml&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="954997b7e027bbec966738fff4b4e030555b464b94c8dedc358f401998d08162"
              data-hydro-click="{&quot;event_type&quot;:&quot;analytics.click&quot;,&quot;payload&quot;:{&quot;category&quot;:&quot;Sign up&quot;,&quot;action&quot;:&quot;click to sign up for account&quot;,&quot;label&quot;:&quot;ref_page:/&lt;user-name&gt;/&lt;repo-name&gt;/blob/show;ref_cta:Sign up;ref_loc:header logged out&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t16/src/administrator/components/com_foos/forms/filter_foos.xml&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="e54b34639fad663c419056064648e92b5727a9663481773bfe38ce1ef28201bd"
            >
              Sign up
            </a>
      </div>
    </div>
  </div>
</header>

    </div>

  <div id="start-of-content" class="show-on-focus"></div>





    <div data-pjax-replace id="js-flash-container">


  <template class="js-flash-template">
    <div class="flash flash-full  {{ className }}">
  <div class=" px-2" >
    <button class="flash-close js-flash-close" type="button" aria-label="Dismiss this message">
      <svg class="octicon octicon-x" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path></svg>
    </button>

      <div>{{ message }}</div>

  </div>
</div>
  </template>
</div>




  <include-fragment class="js-notification-shelf-include-fragment" data-base-src="https://github.com/notifications/beta/shelf"></include-fragment>




  <div
    class="application-main "
    data-commit-hovercards-enabled
    data-discussion-hovercards-enabled
    data-issue-and-pr-hovercards-enabled
  >
        <div itemscope itemtype="http://schema.org/SoftwareSourceCode" class="">
    <main id="js-repo-pjax-container" data-pjax-container >











  <div class="color-bg-secondary pt-3 hide-full-screen mb-5">

      <div class="d-flex mb-3 px-3 px-md-4 px-lg-5">

        <div class="flex-auto min-width-0 width-fit mr-3">
            <h1 class=" d-flex flex-wrap flex-items-center break-word f3 text-normal">
    <svg class="octicon octicon-repo-forked color-text-secondary mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>
  <span class="author flex-self-stretch" itemprop="author">
    <a class="url fn" rel="author" data-hovercard-type="user" data-hovercard-url="/users/astridx/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="/astridx">astridx</a>
  </span>
  <span class="mx-1 flex-self-stretch color-text-secondary">/</span>
  <strong itemprop="name" class="mr-2 flex-self-stretch">
    <a data-pjax="#js-repo-pjax-container" href="/astridx/boilerplate">boilerplate</a>
  </strong>

</h1>

  <span class="text-small lh-condensed-ultra no-wrap mt-1" data-repository-hovercards-enabled>
    forked from <a data-hovercard-type="repository" data-hovercard-url="/joomla-extensions/boilerplate/hovercard" href="/joomla-extensions/boilerplate">joomla-extensions/boilerplate</a>
  </span>

        </div>

          <ul class="pagehead-actions flex-shrink-0 d-none d-md-inline" style="padding: 2px 0;">

  <li>
      <a class="tooltipped tooltipped-s btn btn-sm" aria-label="You must be signed in to change notification settings" rel="nofollow" data-hydro-click="{&quot;event_type&quot;:&quot;authentication.click&quot;,&quot;payload&quot;:{&quot;location_in_page&quot;:&quot;notification subscription menu watch&quot;,&quot;repository_id&quot;:null,&quot;auth_type&quot;:&quot;LOG_IN&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t16/src/administrator/components/com_foos/forms/filter_foos.xml&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="f05dced3160aeb5cd26a3192f996e6b06d41517802170f4563806cbda14fc594" href="/login?return_to=%2Fastridx%2Fboilerplate">
    <svg class="octicon octicon-bell" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path d="M8 16a2 2 0 001.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 008 16z"></path><path fill-rule="evenodd" d="M8 1.5A3.5 3.5 0 004.5 5v2.947c0 .346-.102.683-.294.97l-1.703 2.556a.018.018 0 00-.003.01l.001.006c0 .002.002.004.004.006a.017.017 0 00.006.004l.007.001h10.964l.007-.001a.016.016 0 00.006-.004.016.016 0 00.004-.006l.001-.007a.017.017 0 00-.003-.01l-1.703-2.554a1.75 1.75 0 01-.294-.97V5A3.5 3.5 0 008 1.5zM3 5a5 5 0 0110 0v2.947c0 .05.015.098.042.139l1.703 2.555A1.518 1.518 0 0113.482 13H2.518a1.518 1.518 0 01-1.263-2.36l1.703-2.554A.25.25 0 003 7.947V5z"></path></svg>
    Notifications
</a>
  </li>

  <li>
          <a class="btn btn-sm btn-with-count  tooltipped tooltipped-s" aria-label="You must be signed in to star a repository" rel="nofollow" data-hydro-click="{&quot;event_type&quot;:&quot;authentication.click&quot;,&quot;payload&quot;:{&quot;location_in_page&quot;:&quot;star button&quot;,&quot;repository_id&quot;:82167237,&quot;auth_type&quot;:&quot;LOG_IN&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t16/src/administrator/components/com_foos/forms/filter_foos.xml&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="a8a35f62504790afcfcb3485c1fe1b9c1dbda279e155b2e7071b3b9141db81fc" href="/login?return_to=%2Fastridx%2Fboilerplate">
      <svg class="octicon octicon-star v-align-text-bottom mr-1" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
      <span>
        Star
</span></a>
    <a class="social-count js-social-count" href="/astridx/boilerplate/stargazers"
      aria-label="9 users starred this repository">
      9
    </a>

  </li>

  <li>
        <a class="btn btn-sm btn-with-count tooltipped tooltipped-s" aria-label="You must be signed in to fork a repository" rel="nofollow" data-hydro-click="{&quot;event_type&quot;:&quot;authentication.click&quot;,&quot;payload&quot;:{&quot;location_in_page&quot;:&quot;repo details fork button&quot;,&quot;repository_id&quot;:82167237,&quot;auth_type&quot;:&quot;LOG_IN&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t16/src/administrator/components/com_foos/forms/filter_foos.xml&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="f118810853c34391199e5b42d05d5c74329ac0629f48246a5f63bf631583916e" href="/login?return_to=%2Fastridx%2Fboilerplate">
          <svg class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>
          Fork
</a>
      <a href="/astridx/boilerplate/network/members" class="social-count"
         aria-label="56 users forked this repository">
        56
      </a>
  </li>
</ul>

      </div>

<nav aria-label="Repository" data-pjax="#js-repo-pjax-container" class="js-repo-nav js-sidenav-container-pjax js-responsive-underlinenav overflow-hidden UnderlineNav px-3 px-md-4 px-lg-5 color-bg-secondary">
  <ul class="UnderlineNav-body list-style-none ">        <li class="d-flex">
          <a class="js-selected-navigation-item selected UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item" data-tab-item="i0code-tab" data-hotkey="g c" data-ga-click="Repository, Navigation click, Code tab" aria-current="page" data-selected-links="repo_source repo_downloads repo_commits repo_releases repo_tags repo_branches repo_packages repo_deployments /astridx/boilerplate/tree/t16" href="/astridx/boilerplate/tree/t16">
                <svg class="octicon octicon-code UnderlineNav-octicon d-none d-sm-inline" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z"></path></svg>
              <span data-content="Code">Code</span>
                <span title="Not available" class="Counter "></span>
</a>        </li>
        <li class="d-flex">
          <a class="js-selected-navigation-item UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item" data-tab-item="i1issues-tab" data-hotkey="g i" data-ga-click="Repository, Navigation click, Issues tab" data-selected-links="repo_issues repo_labels repo_milestones /astridx/boilerplate/issues" href="/astridx/boilerplate/issues">
                <svg class="octicon octicon-issue-opened UnderlineNav-octicon d-none d-sm-inline" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"></path></svg>
              <span data-content="Issues">Issues</span>
                <span title="4" class="Counter ">4</span>
</a>        </li>
        <li class="d-flex">
          <a class="js-selected-navigation-item UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item" data-tab-item="i2pull-requests-tab" data-hotkey="g p" data-ga-click="Repository, Navigation click, Pull requests tab" data-selected-links="repo_pulls checks /astridx/boilerplate/pulls" href="/astridx/boilerplate/pulls">
                <svg class="octicon octicon-git-pull-request UnderlineNav-octicon d-none d-sm-inline" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"></path></svg>
              <span data-content="Pull requests">Pull requests</span>
                <span title="0" hidden="hidden" class="Counter ">0</span>
</a>        </li>
        <li class="d-flex">
          <a class="js-selected-navigation-item UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item" data-tab-item="i3actions-tab" data-hotkey="g a" data-ga-click="Repository, Navigation click, Actions tab" data-selected-links="repo_actions /astridx/boilerplate/actions" href="/astridx/boilerplate/actions">
                <svg class="octicon octicon-play UnderlineNav-octicon d-none d-sm-inline" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM6.379 5.227A.25.25 0 006 5.442v5.117a.25.25 0 00.379.214l4.264-2.559a.25.25 0 000-.428L6.379 5.227z"></path></svg>
              <span data-content="Actions">Actions</span>
                <span title="Not available" class="Counter "></span>
</a>        </li>
        <li class="d-flex">
          <a class="js-selected-navigation-item UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item" data-tab-item="i4projects-tab" data-hotkey="g b" data-ga-click="Repository, Navigation click, Projects tab" data-selected-links="repo_projects new_repo_project repo_project /astridx/boilerplate/projects" href="/astridx/boilerplate/projects">
                <svg class="octicon octicon-project UnderlineNav-octicon d-none d-sm-inline" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z"></path></svg>
              <span data-content="Projects">Projects</span>
                <span title="1" class="Counter ">1</span>
</a>        </li>
        <li class="d-flex">
          <a class="js-selected-navigation-item UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item" data-tab-item="i5wiki-tab" data-hotkey="g w" data-ga-click="Repository, Navigation click, Wikis tab" data-selected-links="repo_wiki /astridx/boilerplate/wiki" href="/astridx/boilerplate/wiki">
                <svg class="octicon octicon-book UnderlineNav-octicon d-none d-sm-inline" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574z"></path></svg>
              <span data-content="Wiki">Wiki</span>
                <span title="Not available" class="Counter "></span>
</a>        </li>
        <li class="d-flex">
          <a class="js-selected-navigation-item UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item" data-tab-item="i6security-tab" data-hotkey="g s" data-ga-click="Repository, Navigation click, Security tab" data-selected-links="security overview alerts policy token_scanning code_scanning /astridx/boilerplate/security" href="/astridx/boilerplate/security">
                <svg class="octicon octicon-shield UnderlineNav-octicon d-none d-sm-inline" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.467.133a1.75 1.75 0 011.066 0l5.25 1.68A1.75 1.75 0 0115 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.7 1.7 0 01-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.75 1.75 0 011.217-1.667l5.25-1.68zm.61 1.429a.25.25 0 00-.153 0l-5.25 1.68a.25.25 0 00-.174.238V7c0 1.358.275 2.666 1.057 3.86.784 1.194 2.121 2.34 4.366 3.297a.2.2 0 00.154 0c2.245-.956 3.582-2.104 4.366-3.298C13.225 9.666 13.5 8.36 13.5 7V3.48a.25.25 0 00-.174-.237l-5.25-1.68zM9 10.5a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.75a.75.75 0 10-1.5 0v3a.75.75 0 001.5 0v-3z"></path></svg>
              <span data-content="Security">Security</span>
                <include-fragment src="/astridx/boilerplate/security/overall-count" accept="text/fragment+html"></include-fragment>
</a>        </li>
        <li class="d-flex">
          <a class="js-selected-navigation-item UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item" data-tab-item="i7insights-tab" data-ga-click="Repository, Navigation click, Insights tab" data-selected-links="repo_graphs repo_contributors dependency_graph dependabot_updates pulse people community /astridx/boilerplate/pulse" href="/astridx/boilerplate/pulse">
                <svg class="octicon octicon-graph UnderlineNav-octicon d-none d-sm-inline" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M1.5 1.75a.75.75 0 00-1.5 0v12.5c0 .414.336.75.75.75h14.5a.75.75 0 000-1.5H1.5V1.75zm14.28 2.53a.75.75 0 00-1.06-1.06L10 7.94 7.53 5.47a.75.75 0 00-1.06 0L3.22 8.72a.75.75 0 001.06 1.06L7 7.06l2.47 2.47a.75.75 0 001.06 0l5.25-5.25z"></path></svg>
              <span data-content="Insights">Insights</span>
                <span title="Not available" class="Counter "></span>
</a>        </li>
</ul>
    <div style="visibility:hidden;" class="UnderlineNav-actions  js-responsive-underlinenav-overflow position-absolute pr-3 pr-md-4 pr-lg-5 right-0">    <details class="details-overlay details-reset position-relative">
  <summary role="button">        <div class="UnderlineNav-item mr-0 border-0">
          <svg class="octicon octicon-kebab-horizontal" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
          <span class="sr-only">More</span>
        </div>
</summary>
  <div>        <details-menu role="menu" class="dropdown-menu dropdown-menu-sw ">

          <ul>
              <li data-menu-item="i0code-tab" hidden>
                <a role="menuitem" class="js-selected-navigation-item dropdown-item" data-selected-links=" /astridx/boilerplate/tree/t16" href="/astridx/boilerplate/tree/t16">
                  Code
</a>              </li>
              <li data-menu-item="i1issues-tab" hidden>
                <a role="menuitem" class="js-selected-navigation-item dropdown-item" data-selected-links=" /astridx/boilerplate/issues" href="/astridx/boilerplate/issues">
                  Issues
</a>              </li>
              <li data-menu-item="i2pull-requests-tab" hidden>
                <a role="menuitem" class="js-selected-navigation-item dropdown-item" data-selected-links=" /astridx/boilerplate/pulls" href="/astridx/boilerplate/pulls">
                  Pull requests
</a>              </li>
              <li data-menu-item="i3actions-tab" hidden>
                <a role="menuitem" class="js-selected-navigation-item dropdown-item" data-selected-links=" /astridx/boilerplate/actions" href="/astridx/boilerplate/actions">
                  Actions
</a>              </li>
              <li data-menu-item="i4projects-tab" hidden>
                <a role="menuitem" class="js-selected-navigation-item dropdown-item" data-selected-links=" /astridx/boilerplate/projects" href="/astridx/boilerplate/projects">
                  Projects
</a>              </li>
              <li data-menu-item="i5wiki-tab" hidden>
                <a role="menuitem" class="js-selected-navigation-item dropdown-item" data-selected-links=" /astridx/boilerplate/wiki" href="/astridx/boilerplate/wiki">
                  Wiki
</a>              </li>
              <li data-menu-item="i6security-tab" hidden>
                <a role="menuitem" class="js-selected-navigation-item dropdown-item" data-selected-links=" /astridx/boilerplate/security" href="/astridx/boilerplate/security">
                  Security
</a>              </li>
              <li data-menu-item="i7insights-tab" hidden>
                <a role="menuitem" class="js-selected-navigation-item dropdown-item" data-selected-links=" /astridx/boilerplate/pulse" href="/astridx/boilerplate/pulse">
                  Insights
</a>              </li>
          </ul>

</details-menu></div>
</details></div>
</nav>
  </div>


<div class="container-xl clearfix new-discussion-timeline px-3 px-md-4 px-lg-5">
  <div id="repo-content-pjax-container" class="repository-content " >





<div>



    <a class="d-none js-permalink-shortcut" data-hotkey="y" href="/astridx/boilerplate/blob/ff32f655f7752e116322b76e97395d41f1213b1c/src/administrator/components/com_foos/forms/filter_foos.xml">Permalink</a>

    <!-- blob contrib key: blob_contributors:v22:42af80ef50da2825e7a42c595ccf3e3e4ad3df8f6cadcb1e3a12f92570e223fb -->

    <div class="d-flex flex-items-start flex-shrink-0 pb-3 flex-wrap flex-md-nowrap flex-justify-between flex-md-justify-start">

<div class="position-relative">
  <details class="details-reset details-overlay mr-0 mb-0 " id="branch-select-menu">
    <summary class="btn css-truncate"
            data-hotkey="w"
            title="Switch branches or tags">
      <svg class="octicon octicon-git-branch text-gray" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z"></path></svg>
      <span class="css-truncate-target" data-menu-button>t16</span>
      <span class="dropdown-caret"></span>
    </summary>

      <div class="SelectMenu">
  <div class="SelectMenu-modal">
    <header class="SelectMenu-header">
      <span class="SelectMenu-title">Switch branches/tags</span>
      <button class="SelectMenu-closeButton" type="button" data-toggle-for="branch-select-menu"><svg aria-label="Close menu" aria-hidden="false" class="octicon octicon-x" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path></svg></button>
    </header>

    <input-demux data-action="tab-container-change:input-demux#storeInput tab-container-changed:input-demux#updateInput">
      <tab-container class="d-flex flex-column js-branches-tags-tabs" style="min-height: 0;">
        <div class="SelectMenu-filter">
          <input data-target="input-demux.source"
                 id="context-commitish-filter-field"
                 class="SelectMenu-input form-control"
                 aria-owns="ref-list-branches"
                 data-controls-ref-menu-id="ref-list-branches"
                 autofocus
                 autocomplete="off"
                 aria-label="Filter branches/tags"
                 placeholder="Filter branches/tags"
                 type="text"
          >
        </div>

        <div class="SelectMenu-tabs" role="tablist" data-target="input-demux.control">
          <button class="SelectMenu-tab" type="button" role="tab" aria-selected="true">Branches</button>
          <button class="SelectMenu-tab" type="button" role="tab">Tags</button>
        </div>

        <div role="tabpanel" id="ref-list-branches" data-filter-placeholder="Filter branches/tags" class="d-flex flex-column flex-auto overflow-auto" tabindex="">
          <ref-selector
            type="branch"
            data-targets="input-demux.sinks"
            data-action="
              input-entered:ref-selector#inputEntered
              tab-selected:ref-selector#tabSelected
              focus-list:ref-selector#focusFirstListMember
            "
            query-endpoint="/astridx/boilerplate/refs"

            cache-key="v0:1616708249.796553"
            current-committish="dDE2"
            default-branch="dHV0b3JpYWw="
            name-with-owner="YXN0cmlkeC9ib2lsZXJwbGF0ZQ=="
          >

            <template data-target="ref-selector.noMatchTemplate">
                <div class="SelectMenu-message">Nothing to show</div>
            </template>

            <!-- TODO: this max-height is necessary or else the branch list won't scroll.  why? -->
            <div data-target="ref-selector.listContainer" role="menu" class="SelectMenu-list" style="max-height: 330px">
              <div class="SelectMenu-loading pt-3 pb-0" aria-label="Menu is loading">
                <svg style="box-sizing: content-box; color: var(--color-icon-primary);" viewBox="0 0 16 16" fill="none" width="32" height="32" class="anim-rotate">
  <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-opacity="0.25" stroke-width="2" vector-effect="non-scaling-stroke" />
  <path d="M15 8a7.002 7.002 0 00-7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke" />
</svg>
              </div>
            </div>

            <template data-target="ref-selector.itemTemplate">
              <a href="https://github.com/astridx/boilerplate/blob/{{ urlEncodedRefName }}/src/administrator/components/com_foos/forms/filter_foos.xml" class="SelectMenu-item" role="menuitemradio" rel="nofollow" aria-checked="{{ isCurrent }}" data-index="{{ index }}">
                <svg class="octicon octicon-check SelectMenu-icon SelectMenu-icon--check" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>
                <span class="flex-1 css-truncate css-truncate-overflow {{ isFilteringClass }}">{{ refName }}</span>
                <span hidden="{{ isNotDefault }}" class="Label Label--secondary flex-self-start">default</span>
              </a>
            </template>
            <footer class="SelectMenu-footer"><a href="/astridx/boilerplate/branches">View all branches</a></footer>
          </ref-selector>

        </div>

        <div role="tabpanel" id="tags-menu" data-filter-placeholder="Find a tag" class="d-flex flex-column flex-auto overflow-auto" tabindex="" hidden>
          <ref-selector
            type="tag"
            data-action="
              input-entered:ref-selector#inputEntered
              tab-selected:ref-selector#tabSelected
              focus-list:ref-selector#focusFirstListMember
            "
            data-targets="input-demux.sinks"
            query-endpoint="/astridx/boilerplate/refs"
            cache-key="v0:1616708249.796553"
            current-committish="dDE2"
            default-branch="dHV0b3JpYWw="
            name-with-owner="YXN0cmlkeC9ib2lsZXJwbGF0ZQ=="
          >

            <template data-target="ref-selector.noMatchTemplate">
              <div class="SelectMenu-message" data-index="{{ index }}">Nothing to show</div>
            </template>

            <template data-target="ref-selector.itemTemplate">
              <a href="https://github.com/astridx/boilerplate/blob/{{ urlEncodedRefName }}/src/administrator/components/com_foos/forms/filter_foos.xml" class="SelectMenu-item" role="menuitemradio" rel="nofollow" aria-checked="{{ isCurrent }}" data-index="{{ index }}">
                <svg class="octicon octicon-check SelectMenu-icon SelectMenu-icon--check" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>
                <span class="flex-1 css-truncate css-truncate-overflow {{ isFilteringClass }}">{{ refName }}</span>
                <span hidden="{{ isNotDefault }}" class="Label Label--secondary flex-self-start">default</span>
              </a>
            </template>
            <div data-target="ref-selector.listContainer" role="menu" class="SelectMenu-list" style="max-height: 330px">
              <div class="SelectMenu-loading pt-3 pb-0" aria-label="Menu is loading">
                <svg style="box-sizing: content-box; color: var(--color-icon-primary);" viewBox="0 0 16 16" fill="none" width="32" height="32" class="anim-rotate">
  <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-opacity="0.25" stroke-width="2" vector-effect="non-scaling-stroke" />
  <path d="M15 8a7.002 7.002 0 00-7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke" />
</svg>
              </div>
            </div>
            <footer class="SelectMenu-footer"><a href="/astridx/boilerplate/tags">View all tags</a></footer>
          </ref-selector>
        </div>
      </tab-container>
    </input-demux>
  </div>
</div>

  </details>

</div>

      <h2 id="blob-path" class="breadcrumb flex-auto flex-self-center min-width-0 text-normal mx-2 width-full width-md-auto flex-order-1 flex-md-order-none mt-3 mt-md-0">
        <span class="js-repo-root text-bold"><span class="js-path-segment d-inline-block wb-break-all"><a data-pjax="true" href="/astridx/boilerplate/tree/t16"><span>boilerplate</span></a></span></span><span class="separator">/</span><span class="js-path-segment d-inline-block wb-break-all"><a data-pjax="true" href="/astridx/boilerplate/tree/t16/src"><span>src</span></a></span><span class="separator">/</span><span class="js-path-segment d-inline-block wb-break-all"><a data-pjax="true" href="/astridx/boilerplate/tree/t16/src/administrator"><span>administrator</span></a></span><span class="separator">/</span><span class="js-path-segment d-inline-block wb-break-all"><a data-pjax="true" href="/astridx/boilerplate/tree/t16/src/administrator/components"><span>components</span></a></span><span class="separator">/</span><span class="js-path-segment d-inline-block wb-break-all"><a data-pjax="true" href="/astridx/boilerplate/tree/t16/src/administrator/components/com_foos"><span>com_foos</span></a></span><span class="separator">/</span><span class="js-path-segment d-inline-block wb-break-all"><a data-pjax="true" href="/astridx/boilerplate/tree/t16/src/administrator/components/com_foos/forms"><span>forms</span></a></span><span class="separator">/</span><strong class="final-path">filter_foos.xml</strong>
      </h2>
      <a href="/astridx/boilerplate/find/t16"
            class="js-pjax-capture-input btn mr-2 d-none d-md-block"
            data-pjax
            data-hotkey="t">
        Go to file
      </a>

      <details id="blob-more-options-details" class="details-overlay details-reset position-relative">
  <summary role="button" type="button" class="btn ">          <svg aria-label="More options" class="octicon octicon-kebab-horizontal" height="16" viewBox="0 0 16 16" version="1.1" width="16" role="img"><path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
</summary>
  <div>          <ul class="dropdown-menu dropdown-menu-sw">
            <li class="d-block d-md-none">
              <a class="dropdown-item d-flex flex-items-baseline" data-hydro-click="{&quot;event_type&quot;:&quot;repository.click&quot;,&quot;payload&quot;:{&quot;target&quot;:&quot;FIND_FILE_BUTTON&quot;,&quot;repository_id&quot;:82167237,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t16/src/administrator/components/com_foos/forms/filter_foos.xml&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="d1a5b73635d7fcabe40a20ecabb8958ac83827a00e7673a09226065dac2d6be5" data-ga-click="Repository, find file, location:repo overview" data-hotkey="t" data-pjax="true" href="/astridx/boilerplate/find/t16">
                <span class="flex-auto">Go to file</span>
                <span class="text-small color-text-secondary" aria-hidden="true">T</span>
</a>            </li>
            <li data-toggle-for="blob-more-options-details">
              <button type="button" data-toggle-for="jumpto-line-details-dialog" class="btn-link dropdown-item">
                <span class="d-flex flex-items-baseline">
                  <span class="flex-auto">Go to line</span>
                  <span class="text-small color-text-secondary" aria-hidden="true">L</span>
                </span>
              </button>
            </li>
            <li class="dropdown-divider" role="none"></li>
            <li>
              <clipboard-copy value="src/administrator/components/com_foos/forms/filter_foos.xml" class="dropdown-item cursor-pointer" data-toggle-for="blob-more-options-details">
                Copy path
              </clipboard-copy>
            </li>
            <li>
              <clipboard-copy value="https://github.com/astridx/boilerplate/blob/ff32f655f7752e116322b76e97395d41f1213b1c/src/administrator/components/com_foos/forms/filter_foos.xml" class="dropdown-item cursor-pointer" data-toggle-for="blob-more-options-details" >
                <span class="d-flex flex-items-baseline">
                  <span class="flex-auto">Copy permalink</span>
                </span>
              </clipboard-copy>
            </li>
          </ul>
</div>
</details>    </div>



    <div class="Box d-flex flex-column flex-shrink-0 mb-3">
      <include-fragment src="/astridx/boilerplate/contributors/t16/src/administrator/components/com_foos/forms/filter_foos.xml" class="commit-loader">
        <div class="Box-header Box-header--blue d-flex flex-items-center">
          <div class="Skeleton avatar avatar-user flex-shrink-0 ml-n1 mr-n1 mt-n1 mb-n1" style="width:24px;height:24px;"></div>
          <div class="Skeleton Skeleton--text col-5 ml-2">&nbsp;</div>
        </div>

        <div class="Box-body d-flex flex-items-center" >
          <div class="Skeleton Skeleton--text col-1">&nbsp;</div>
          <span class="color-text-danger h6 loader-error">Cannot retrieve contributors at this time</span>
        </div>
</include-fragment>    </div>







    <div class="Box mt-3 position-relative
      ">

<div class="Box-header py-2 d-flex flex-column flex-shrink-0 flex-md-row flex-md-items-center">
  <div class="text-mono f6 flex-auto pr-3 flex-order-2 flex-md-order-1 mt-2 mt-md-0">

      104 lines (93 sloc)
      <span class="file-info-divider"></span>
    2.79 KB
  </div>

  <div class="d-flex py-1 py-md-0 flex-auto flex-order-1 flex-md-order-2 flex-sm-grow-0 flex-justify-between">

    <div class="BtnGroup">
      <a href="/astridx/boilerplate/raw/t16/src/administrator/components/com_foos/forms/filter_foos.xml" id="raw-url" role="button" class="btn btn-sm BtnGroup-item ">Raw</a>
        <a href="/astridx/boilerplate/blame/t16/src/administrator/components/com_foos/forms/filter_foos.xml" data-hotkey="b" role="button" class="btn js-update-url-with-hash btn-sm BtnGroup-item ">Blame</a>
    </div>

    <div>
          <a class="btn-octicon tooltipped tooltipped-nw js-remove-unless-platform"
             data-platforms="windows,mac"
             href="https://desktop.github.com"
             aria-label="Open this file in GitHub Desktop"
             data-ga-click="Repository, open with desktop">
              <svg class="octicon octicon-device-desktop" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M1.75 2.5h12.5a.25.25 0 01.25.25v7.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25v-7.5a.25.25 0 01.25-.25zM14.25 1H1.75A1.75 1.75 0 000 2.75v7.5C0 11.216.784 12 1.75 12h3.727c-.1 1.041-.52 1.872-1.292 2.757A.75.75 0 004.75 16h6.5a.75.75 0 00.565-1.243c-.772-.885-1.193-1.716-1.292-2.757h3.727A1.75 1.75 0 0016 10.25v-7.5A1.75 1.75 0 0014.25 1zM9.018 12H6.982a5.72 5.72 0 01-.765 2.5h3.566a5.72 5.72 0 01-.765-2.5z"></path></svg>
          </a>

          <a href="/login?return_to=%2Fastridx%2Fboilerplate%2Fblob%2Ft16%2Fsrc%2Fadministrator%2Fcomponents%2Fcom_foos%2Fforms%2Ffilter_foos.xml" class="btn-octicon disabled tooltipped tooltipped-nw"
            aria-label="You must be signed in to make or propose changes">
            <svg class="octicon octicon-pencil" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"></path></svg>
          </a>
          <a href="/login?return_to=%2Fastridx%2Fboilerplate%2Fblob%2Ft16%2Fsrc%2Fadministrator%2Fcomponents%2Fcom_foos%2Fforms%2Ffilter_foos.xml" class="btn-octicon btn-octicon-danger disabled tooltipped tooltipped-nw"
            aria-label="You must be signed in to make or propose changes">
            <svg class="octicon octicon-trash" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M6.5 1.75a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25V3h-3V1.75zm4.5 0V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675a.75.75 0 10-1.492.15l.66 6.6A1.75 1.75 0 005.405 15h5.19c.9 0 1.652-.681 1.741-1.576l.66-6.6a.75.75 0 00-1.492-.149l-.66 6.6a.25.25 0 01-.249.225h-5.19a.25.25 0 01-.249-.225l-.66-6.6z"></path></svg>
          </a>
    </div>
  </div>
</div>



  <div itemprop="text" class="Box-body p-0 blob-wrapper data type-xml  gist-border-0">

<table class="highlight tab-size js-file-line-container" data-tab-size="8" data-paste-markdown-skip>
      <tr>
        <td id="L1" class="blob-num js-line-number" data-line-number="1"></td>
        <td id="LC1" class="blob-code blob-code-inner js-file-line">&lt;?<span class="pl-ent">xml</span><span class="pl-e"> version</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>1.0<span class="pl-pds">&quot;</span></span><span class="pl-e"> encoding</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>utf-8<span class="pl-pds">&quot;</span></span>?&gt;</td>
      </tr>
      <tr>
        <td id="L2" class="blob-num js-line-number" data-line-number="2"></td>
        <td id="LC2" class="blob-code blob-code-inner js-file-line">&lt;<span class="pl-ent">form</span>&gt;</td>
      </tr>
      <tr>
        <td id="L3" class="blob-num js-line-number" data-line-number="3"></td>
        <td id="LC3" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L4" class="blob-num js-line-number" data-line-number="4"></td>
        <td id="LC4" class="blob-code blob-code-inner js-file-line">	&lt;<span class="pl-ent">fields</span> <span class="pl-e">name</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>filter<span class="pl-pds">&quot;</span></span>&gt;</td>
      </tr>
      <tr>
        <td id="L5" class="blob-num js-line-number" data-line-number="5"></td>
        <td id="LC5" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L6" class="blob-num js-line-number" data-line-number="6"></td>
        <td id="LC6" class="blob-code blob-code-inner js-file-line">		&lt;<span class="pl-ent">field</span></td>
      </tr>
      <tr>
        <td id="L7" class="blob-num js-line-number" data-line-number="7"></td>
        <td id="LC7" class="blob-code blob-code-inner js-file-line">			name=<span class="pl-s"><span class="pl-pds">&quot;</span>search<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L8" class="blob-num js-line-number" data-line-number="8"></td>
        <td id="LC8" class="blob-code blob-code-inner js-file-line">			type=<span class="pl-s"><span class="pl-pds">&quot;</span>text<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L9" class="blob-num js-line-number" data-line-number="9"></td>
        <td id="LC9" class="blob-code blob-code-inner js-file-line">			inputmode=<span class="pl-s"><span class="pl-pds">&quot;</span>search<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L10" class="blob-num js-line-number" data-line-number="10"></td>
        <td id="LC10" class="blob-code blob-code-inner js-file-line">			label=<span class="pl-s"><span class="pl-pds">&quot;</span>COM_FOOS_FILTER_SEARCH_LABEL<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L11" class="blob-num js-line-number" data-line-number="11"></td>
        <td id="LC11" class="blob-code blob-code-inner js-file-line">			description=<span class="pl-s"><span class="pl-pds">&quot;</span>COM_FOOS_FILTER_SEARCH_DESC<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L12" class="blob-num js-line-number" data-line-number="12"></td>
        <td id="LC12" class="blob-code blob-code-inner js-file-line">			hint=<span class="pl-s"><span class="pl-pds">&quot;</span>JSEARCH_FILTER<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L13" class="blob-num js-line-number" data-line-number="13"></td>
        <td id="LC13" class="blob-code blob-code-inner js-file-line">		/&gt;</td>
      </tr>
      <tr>
        <td id="L14" class="blob-num js-line-number" data-line-number="14"></td>
        <td id="LC14" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L15" class="blob-num js-line-number" data-line-number="15"></td>
        <td id="LC15" class="blob-code blob-code-inner js-file-line">		&lt;<span class="pl-ent">field</span></td>
      </tr>
      <tr>
        <td id="L16" class="blob-num js-line-number" data-line-number="16"></td>
        <td id="LC16" class="blob-code blob-code-inner js-file-line">			name=<span class="pl-s"><span class="pl-pds">&quot;</span>featured<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L17" class="blob-num js-line-number" data-line-number="17"></td>
        <td id="LC17" class="blob-code blob-code-inner js-file-line">			type=<span class="pl-s"><span class="pl-pds">&quot;</span>list<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L18" class="blob-num js-line-number" data-line-number="18"></td>
        <td id="LC18" class="blob-code blob-code-inner js-file-line">			onchange=<span class="pl-s"><span class="pl-pds">&quot;</span>this.form.submit();<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L19" class="blob-num js-line-number" data-line-number="19"></td>
        <td id="LC19" class="blob-code blob-code-inner js-file-line">			default=<span class="pl-s"><span class="pl-pds">&quot;</span><span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L20" class="blob-num js-line-number" data-line-number="20"></td>
        <td id="LC20" class="blob-code blob-code-inner js-file-line">			&gt;</td>
      </tr>
      <tr>
        <td id="L21" class="blob-num js-line-number" data-line-number="21"></td>
        <td id="LC21" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span><span class="pl-pds">&quot;</span></span>&gt;JOPTION_SELECT_FEATURED&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L22" class="blob-num js-line-number" data-line-number="22"></td>
        <td id="LC22" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>0<span class="pl-pds">&quot;</span></span>&gt;JUNFEATURED&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L23" class="blob-num js-line-number" data-line-number="23"></td>
        <td id="LC23" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>1<span class="pl-pds">&quot;</span></span>&gt;JFEATURED&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L24" class="blob-num js-line-number" data-line-number="24"></td>
        <td id="LC24" class="blob-code blob-code-inner js-file-line">		&lt;/<span class="pl-ent">field</span>&gt;</td>
      </tr>
      <tr>
        <td id="L25" class="blob-num js-line-number" data-line-number="25"></td>
        <td id="LC25" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L26" class="blob-num js-line-number" data-line-number="26"></td>
        <td id="LC26" class="blob-code blob-code-inner js-file-line">		&lt;<span class="pl-ent">field</span></td>
      </tr>
      <tr>
        <td id="L27" class="blob-num js-line-number" data-line-number="27"></td>
        <td id="LC27" class="blob-code blob-code-inner js-file-line">			name=<span class="pl-s"><span class="pl-pds">&quot;</span>published<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L28" class="blob-num js-line-number" data-line-number="28"></td>
        <td id="LC28" class="blob-code blob-code-inner js-file-line">			type=<span class="pl-s"><span class="pl-pds">&quot;</span>status<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L29" class="blob-num js-line-number" data-line-number="29"></td>
        <td id="LC29" class="blob-code blob-code-inner js-file-line">			label=<span class="pl-s"><span class="pl-pds">&quot;</span>JOPTION_SELECT_PUBLISHED<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L30" class="blob-num js-line-number" data-line-number="30"></td>
        <td id="LC30" class="blob-code blob-code-inner js-file-line">			onchange=<span class="pl-s"><span class="pl-pds">&quot;</span>this.form.submit();<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L31" class="blob-num js-line-number" data-line-number="31"></td>
        <td id="LC31" class="blob-code blob-code-inner js-file-line">			&gt;</td>
      </tr>
      <tr>
        <td id="L32" class="blob-num js-line-number" data-line-number="32"></td>
        <td id="LC32" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span><span class="pl-pds">&quot;</span></span>&gt;JOPTION_SELECT_PUBLISHED&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L33" class="blob-num js-line-number" data-line-number="33"></td>
        <td id="LC33" class="blob-code blob-code-inner js-file-line">		&lt;/<span class="pl-ent">field</span>&gt;</td>
      </tr>
      <tr>
        <td id="L34" class="blob-num js-line-number" data-line-number="34"></td>
        <td id="LC34" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L35" class="blob-num js-line-number" data-line-number="35"></td>
        <td id="LC35" class="blob-code blob-code-inner js-file-line">		&lt;<span class="pl-ent">field</span></td>
      </tr>
      <tr>
        <td id="L36" class="blob-num js-line-number" data-line-number="36"></td>
        <td id="LC36" class="blob-code blob-code-inner js-file-line">			name=<span class="pl-s"><span class="pl-pds">&quot;</span>category_id<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L37" class="blob-num js-line-number" data-line-number="37"></td>
        <td id="LC37" class="blob-code blob-code-inner js-file-line">			type=<span class="pl-s"><span class="pl-pds">&quot;</span>category<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L38" class="blob-num js-line-number" data-line-number="38"></td>
        <td id="LC38" class="blob-code blob-code-inner js-file-line">			label=<span class="pl-s"><span class="pl-pds">&quot;</span>JCATEGORY<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L39" class="blob-num js-line-number" data-line-number="39"></td>
        <td id="LC39" class="blob-code blob-code-inner js-file-line">			multiple=<span class="pl-s"><span class="pl-pds">&quot;</span>true<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L40" class="blob-num js-line-number" data-line-number="40"></td>
        <td id="LC40" class="blob-code blob-code-inner js-file-line">			extension=<span class="pl-s"><span class="pl-pds">&quot;</span>com_foos<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L41" class="blob-num js-line-number" data-line-number="41"></td>
        <td id="LC41" class="blob-code blob-code-inner js-file-line">			layout=<span class="pl-s"><span class="pl-pds">&quot;</span>joomla.form.field.list-fancy-select<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L42" class="blob-num js-line-number" data-line-number="42"></td>
        <td id="LC42" class="blob-code blob-code-inner js-file-line">			hint=<span class="pl-s"><span class="pl-pds">&quot;</span>JOPTION_SELECT_CATEGORY<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L43" class="blob-num js-line-number" data-line-number="43"></td>
        <td id="LC43" class="blob-code blob-code-inner js-file-line">			onchange=<span class="pl-s"><span class="pl-pds">&quot;</span>this.form.submit();<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L44" class="blob-num js-line-number" data-line-number="44"></td>
        <td id="LC44" class="blob-code blob-code-inner js-file-line">			published=<span class="pl-s"><span class="pl-pds">&quot;</span>0,1,2<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L45" class="blob-num js-line-number" data-line-number="45"></td>
        <td id="LC45" class="blob-code blob-code-inner js-file-line">		/&gt;</td>
      </tr>
      <tr>
        <td id="L46" class="blob-num js-line-number" data-line-number="46"></td>
        <td id="LC46" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L47" class="blob-num js-line-number" data-line-number="47"></td>
        <td id="LC47" class="blob-code blob-code-inner js-file-line">		&lt;<span class="pl-ent">field</span></td>
      </tr>
      <tr>
        <td id="L48" class="blob-num js-line-number" data-line-number="48"></td>
        <td id="LC48" class="blob-code blob-code-inner js-file-line">			name=<span class="pl-s"><span class="pl-pds">&quot;</span>access<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L49" class="blob-num js-line-number" data-line-number="49"></td>
        <td id="LC49" class="blob-code blob-code-inner js-file-line">			type=<span class="pl-s"><span class="pl-pds">&quot;</span>accesslevel<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L50" class="blob-num js-line-number" data-line-number="50"></td>
        <td id="LC50" class="blob-code blob-code-inner js-file-line">			label=<span class="pl-s"><span class="pl-pds">&quot;</span>JOPTION_SELECT_ACCESS<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L51" class="blob-num js-line-number" data-line-number="51"></td>
        <td id="LC51" class="blob-code blob-code-inner js-file-line">			onchange=<span class="pl-s"><span class="pl-pds">&quot;</span>this.form.submit();<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L52" class="blob-num js-line-number" data-line-number="52"></td>
        <td id="LC52" class="blob-code blob-code-inner js-file-line">			&gt;</td>
      </tr>
      <tr>
        <td id="L53" class="blob-num js-line-number" data-line-number="53"></td>
        <td id="LC53" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span><span class="pl-pds">&quot;</span></span>&gt;JOPTION_SELECT_ACCESS&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L54" class="blob-num js-line-number" data-line-number="54"></td>
        <td id="LC54" class="blob-code blob-code-inner js-file-line">		&lt;/<span class="pl-ent">field</span>&gt;</td>
      </tr>
      <tr>
        <td id="L55" class="blob-num js-line-number" data-line-number="55"></td>
        <td id="LC55" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L56" class="blob-num js-line-number" data-line-number="56"></td>
        <td id="LC56" class="blob-code blob-code-inner js-file-line">		&lt;<span class="pl-ent">field</span></td>
      </tr>
      <tr>
        <td id="L57" class="blob-num js-line-number" data-line-number="57"></td>
        <td id="LC57" class="blob-code blob-code-inner js-file-line">			name=<span class="pl-s"><span class="pl-pds">&quot;</span>language<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L58" class="blob-num js-line-number" data-line-number="58"></td>
        <td id="LC58" class="blob-code blob-code-inner js-file-line">			type=<span class="pl-s"><span class="pl-pds">&quot;</span>contentlanguage<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L59" class="blob-num js-line-number" data-line-number="59"></td>
        <td id="LC59" class="blob-code blob-code-inner js-file-line">			label=<span class="pl-s"><span class="pl-pds">&quot;</span>JOPTION_SELECT_LANGUAGE<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L60" class="blob-num js-line-number" data-line-number="60"></td>
        <td id="LC60" class="blob-code blob-code-inner js-file-line">			onchange=<span class="pl-s"><span class="pl-pds">&quot;</span>this.form.submit();<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L61" class="blob-num js-line-number" data-line-number="61"></td>
        <td id="LC61" class="blob-code blob-code-inner js-file-line">			&gt;</td>
      </tr>
      <tr>
        <td id="L62" class="blob-num js-line-number" data-line-number="62"></td>
        <td id="LC62" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span><span class="pl-pds">&quot;</span></span>&gt;JOPTION_SELECT_LANGUAGE&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L63" class="blob-num js-line-number" data-line-number="63"></td>
        <td id="LC63" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>*<span class="pl-pds">&quot;</span></span>&gt;JALL&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L64" class="blob-num js-line-number" data-line-number="64"></td>
        <td id="LC64" class="blob-code blob-code-inner js-file-line">		&lt;/<span class="pl-ent">field</span>&gt;</td>
      </tr>
      <tr>
        <td id="L65" class="blob-num js-line-number" data-line-number="65"></td>
        <td id="LC65" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L66" class="blob-num js-line-number" data-line-number="66"></td>
        <td id="LC66" class="blob-code blob-code-inner js-file-line">	&lt;/<span class="pl-ent">fields</span>&gt;</td>
      </tr>
      <tr>
        <td id="L67" class="blob-num js-line-number" data-line-number="67"></td>
        <td id="LC67" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L68" class="blob-num js-line-number" data-line-number="68"></td>
        <td id="LC68" class="blob-code blob-code-inner js-file-line">	&lt;<span class="pl-ent">fields</span> <span class="pl-e">name</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>list<span class="pl-pds">&quot;</span></span>&gt;</td>
      </tr>
      <tr>
        <td id="L69" class="blob-num js-line-number" data-line-number="69"></td>
        <td id="LC69" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L70" class="blob-num js-line-number" data-line-number="70"></td>
        <td id="LC70" class="blob-code blob-code-inner js-file-line">		&lt;<span class="pl-ent">field</span></td>
      </tr>
      <tr>
        <td id="L71" class="blob-num js-line-number" data-line-number="71"></td>
        <td id="LC71" class="blob-code blob-code-inner js-file-line">			name=<span class="pl-s"><span class="pl-pds">&quot;</span>fullordering<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L72" class="blob-num js-line-number" data-line-number="72"></td>
        <td id="LC72" class="blob-code blob-code-inner js-file-line">			type=<span class="pl-s"><span class="pl-pds">&quot;</span>list<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L73" class="blob-num js-line-number" data-line-number="73"></td>
        <td id="LC73" class="blob-code blob-code-inner js-file-line">			label=<span class="pl-s"><span class="pl-pds">&quot;</span>JGLOBAL_SORT_BY<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L74" class="blob-num js-line-number" data-line-number="74"></td>
        <td id="LC74" class="blob-code blob-code-inner js-file-line">			default=<span class="pl-s"><span class="pl-pds">&quot;</span>a.name ASC<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L75" class="blob-num js-line-number" data-line-number="75"></td>
        <td id="LC75" class="blob-code blob-code-inner js-file-line">			onchange=<span class="pl-s"><span class="pl-pds">&quot;</span>this.form.submit();<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L76" class="blob-num js-line-number" data-line-number="76"></td>
        <td id="LC76" class="blob-code blob-code-inner js-file-line">			&gt;</td>
      </tr>
      <tr>
        <td id="L77" class="blob-num js-line-number" data-line-number="77"></td>
        <td id="LC77" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span><span class="pl-pds">&quot;</span></span>&gt;JGLOBAL_SORT_BY&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L78" class="blob-num js-line-number" data-line-number="78"></td>
        <td id="LC78" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>a.ordering ASC<span class="pl-pds">&quot;</span></span>&gt;JGRID_HEADING_ORDERING_ASC&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L79" class="blob-num js-line-number" data-line-number="79"></td>
        <td id="LC79" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>a.ordering DESC<span class="pl-pds">&quot;</span></span>&gt;JGRID_HEADING_ORDERING_DESC&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L80" class="blob-num js-line-number" data-line-number="80"></td>
        <td id="LC80" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>a.published ASC<span class="pl-pds">&quot;</span></span>&gt;JSTATUS_ASC&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L81" class="blob-num js-line-number" data-line-number="81"></td>
        <td id="LC81" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>a.published DESC<span class="pl-pds">&quot;</span></span>&gt;JSTATUS_DESC&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L82" class="blob-num js-line-number" data-line-number="82"></td>
        <td id="LC82" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>a.name ASC<span class="pl-pds">&quot;</span></span>&gt;JGLOBAL_TITLE_ASC&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L83" class="blob-num js-line-number" data-line-number="83"></td>
        <td id="LC83" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>a.name DESC<span class="pl-pds">&quot;</span></span>&gt;JGLOBAL_TITLE_DESC&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L84" class="blob-num js-line-number" data-line-number="84"></td>
        <td id="LC84" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>category_title ASC<span class="pl-pds">&quot;</span></span>&gt;JCATEGORY_ASC&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L85" class="blob-num js-line-number" data-line-number="85"></td>
        <td id="LC85" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>category_title DESC<span class="pl-pds">&quot;</span></span>&gt;JCATEGORY_DESC&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L86" class="blob-num js-line-number" data-line-number="86"></td>
        <td id="LC86" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>access_level ASC<span class="pl-pds">&quot;</span></span>&gt;JGRID_HEADING_ACCESS_ASC&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L87" class="blob-num js-line-number" data-line-number="87"></td>
        <td id="LC87" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>access_level DESC<span class="pl-pds">&quot;</span></span>&gt;JGRID_HEADING_ACCESS_DESC&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L88" class="blob-num js-line-number" data-line-number="88"></td>
        <td id="LC88" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>association ASC<span class="pl-pds">&quot;</span></span> <span class="pl-e">requires</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>associations<span class="pl-pds">&quot;</span></span>&gt;JASSOCIATIONS_ASC&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L89" class="blob-num js-line-number" data-line-number="89"></td>
        <td id="LC89" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>association DESC<span class="pl-pds">&quot;</span></span> <span class="pl-e">requires</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>associations<span class="pl-pds">&quot;</span></span>&gt;JASSOCIATIONS_DESC&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L90" class="blob-num js-line-number" data-line-number="90"></td>
        <td id="LC90" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>language_title ASC<span class="pl-pds">&quot;</span></span> <span class="pl-e">requires</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>multilanguage<span class="pl-pds">&quot;</span></span>&gt;JGRID_HEADING_LANGUAGE_ASC&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L91" class="blob-num js-line-number" data-line-number="91"></td>
        <td id="LC91" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>language_title DESC<span class="pl-pds">&quot;</span></span> <span class="pl-e">requires</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>multilanguage<span class="pl-pds">&quot;</span></span>&gt;JGRID_HEADING_LANGUAGE_DESC&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L92" class="blob-num js-line-number" data-line-number="92"></td>
        <td id="LC92" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>a.id ASC<span class="pl-pds">&quot;</span></span>&gt;JGRID_HEADING_ID_ASC&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L93" class="blob-num js-line-number" data-line-number="93"></td>
        <td id="LC93" class="blob-code blob-code-inner js-file-line">			&lt;<span class="pl-ent">option</span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">&quot;</span>a.id DESC<span class="pl-pds">&quot;</span></span>&gt;JGRID_HEADING_ID_DESC&lt;/<span class="pl-ent">option</span>&gt;</td>
      </tr>
      <tr>
        <td id="L94" class="blob-num js-line-number" data-line-number="94"></td>
        <td id="LC94" class="blob-code blob-code-inner js-file-line">		&lt;/<span class="pl-ent">field</span>&gt;</td>
      </tr>
      <tr>
        <td id="L95" class="blob-num js-line-number" data-line-number="95"></td>
        <td id="LC95" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L96" class="blob-num js-line-number" data-line-number="96"></td>
        <td id="LC96" class="blob-code blob-code-inner js-file-line">		&lt;<span class="pl-ent">field</span></td>
      </tr>
      <tr>
        <td id="L97" class="blob-num js-line-number" data-line-number="97"></td>
        <td id="LC97" class="blob-code blob-code-inner js-file-line">			name=<span class="pl-s"><span class="pl-pds">&quot;</span>limit<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L98" class="blob-num js-line-number" data-line-number="98"></td>
        <td id="LC98" class="blob-code blob-code-inner js-file-line">			type=<span class="pl-s"><span class="pl-pds">&quot;</span>limitbox<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L99" class="blob-num js-line-number" data-line-number="99"></td>
        <td id="LC99" class="blob-code blob-code-inner js-file-line">			label=<span class="pl-s"><span class="pl-pds">&quot;</span>JGLOBAL_LIST_LIMIT<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L100" class="blob-num js-line-number" data-line-number="100"></td>
        <td id="LC100" class="blob-code blob-code-inner js-file-line">			default=<span class="pl-s"><span class="pl-pds">&quot;</span>25<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L101" class="blob-num js-line-number" data-line-number="101"></td>
        <td id="LC101" class="blob-code blob-code-inner js-file-line">			onchange=<span class="pl-s"><span class="pl-pds">&quot;</span>this.form.submit();<span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L102" class="blob-num js-line-number" data-line-number="102"></td>
        <td id="LC102" class="blob-code blob-code-inner js-file-line">		/&gt;</td>
      </tr>
      <tr>
        <td id="L103" class="blob-num js-line-number" data-line-number="103"></td>
        <td id="LC103" class="blob-code blob-code-inner js-file-line">	&lt;/<span class="pl-ent">fields</span>&gt;</td>
      </tr>
      <tr>
        <td id="L104" class="blob-num js-line-number" data-line-number="104"></td>
        <td id="LC104" class="blob-code blob-code-inner js-file-line">&lt;/<span class="pl-ent">form</span>&gt;</td>
      </tr>
</table>

  <details class="details-reset details-overlay BlobToolbar position-absolute js-file-line-actions dropdown d-none" aria-hidden="true">
    <summary class="btn-octicon ml-0 px-2 p-0 color-bg-primary border color-border-tertiary rounded-1" aria-label="Inline file action toolbar">
      <svg class="octicon octicon-kebab-horizontal" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
    </summary>
    <details-menu>
      <ul class="BlobToolbar-dropdown dropdown-menu dropdown-menu-se mt-2" style="width:185px">
        <li>
          <clipboard-copy role="menuitem" class="dropdown-item" id="js-copy-lines" style="cursor:pointer;">
            Copy lines
          </clipboard-copy>
        </li>
        <li>
          <clipboard-copy role="menuitem" class="dropdown-item" id="js-copy-permalink" style="cursor:pointer;">
            Copy permalink
          </clipboard-copy>
        </li>
        <li><a class="dropdown-item js-update-url-with-hash" id="js-view-git-blame" role="menuitem" href="/astridx/boilerplate/blame/ff32f655f7752e116322b76e97395d41f1213b1c/src/administrator/components/com_foos/forms/filter_foos.xml">View git blame</a></li>
          <li><a class="dropdown-item" id="js-new-issue" role="menuitem" href="/astridx/boilerplate/issues/new">Reference in new issue</a></li>
      </ul>
    </details-menu>
  </details>

  </div>

    </div>



  <details class="details-reset details-overlay details-overlay-dark" id="jumpto-line-details-dialog">
    <summary data-hotkey="l" aria-label="Jump to line"></summary>
    <details-dialog class="Box Box--overlay d-flex flex-column anim-fade-in fast linejump" aria-label="Jump to line">
      <!-- '"` --><!-- </textarea></xmp> --></option></form><form class="js-jump-to-line-form Box-body d-flex" action="" accept-charset="UTF-8" method="get">
        <input class="form-control flex-auto mr-3 linejump-input js-jump-to-line-field" type="text" placeholder="Jump to line&hellip;" aria-label="Jump to line" autofocus>
        <button type="submit" class="btn" data-close-dialog>Go</button>
</form>    </details-dialog>
  </details>


</div>



  </div>
</div>

    </main>
  </div>

  </div>


<div class="footer container-xl width-full p-responsive" role="contentinfo">
  <div class="position-relative d-flex flex-row-reverse flex-lg-row flex-wrap flex-lg-nowrap flex-justify-center flex-lg-justify-between pt-6 pb-2 mt-6 f6 color-text-secondary border-top color-border-secondary ">
    <ul class="list-style-none d-flex flex-wrap col-12 col-lg-5 flex-justify-center flex-lg-justify-between mb-2 mb-lg-0">
      <li class="mr-3 mr-lg-0">&copy; 2021 GitHub, Inc.</li>
        <li class="mr-3 mr-lg-0"><a href="https://docs.github.com/en/github/site-policy/github-terms-of-service" data-ga-click="Footer, go to terms, text:terms">Terms</a></li>
        <li class="mr-3 mr-lg-0"><a href="https://docs.github.com/en/github/site-policy/github-privacy-statement" data-ga-click="Footer, go to privacy, text:privacy">Privacy</a></li>
        <li class="mr-3 mr-lg-0"><a data-ga-click="Footer, go to security, text:security" href="https://github.com/security">Security</a></li>
        <li class="mr-3 mr-lg-0"><a href="https://www.githubstatus.com/" data-ga-click="Footer, go to status, text:status">Status</a></li>
        <li><a data-ga-click="Footer, go to help, text:Docs" href="https://docs.github.com">Docs</a></li>
    </ul>

    <a aria-label="Homepage" title="GitHub" class="footer-octicon d-none d-lg-block mx-lg-4" href="https://github.com">
      <svg height="24" class="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
</a>
    <ul class="list-style-none d-flex flex-wrap col-12 col-lg-5 flex-justify-center flex-lg-justify-between mb-2 mb-lg-0">
        <li class="mr-3 mr-lg-0"><a href="https://support.github.com" data-ga-click="Footer, go to contact, text:contact">Contact GitHub</a></li>
        <li class="mr-3 mr-lg-0"><a href="https://github.com/pricing" data-ga-click="Footer, go to Pricing, text:Pricing">Pricing</a></li>
      <li class="mr-3 mr-lg-0"><a href="https://docs.github.com" data-ga-click="Footer, go to api, text:api">API</a></li>
      <li class="mr-3 mr-lg-0"><a href="https://services.github.com" data-ga-click="Footer, go to training, text:training">Training</a></li>
        <li class="mr-3 mr-lg-0"><a href="https://github.blog" data-ga-click="Footer, go to blog, text:blog">Blog</a></li>
        <li><a data-ga-click="Footer, go to about, text:about" href="https://github.com/about">About</a></li>
    </ul>
  </div>
  <div class="d-flex flex-justify-center pb-6">
    <span class="f6 color-text-tertiary"></span>
  </div>


</div>



  <div id="ajax-error-message" class="ajax-error-message flash flash-error" hidden>
    <svg class="octicon octicon-alert" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8.22 1.754a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368L8.22 1.754zm-1.763-.707c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z"></path></svg>
    <button type="button" class="flash-close js-ajax-error-dismiss" aria-label="Dismiss error">
      <svg class="octicon octicon-x" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path></svg>
    </button>
    You can’t perform that action at this time.
  </div>

  <div class="js-stale-session-flash flash flash-warn flash-banner" hidden
    >
    <svg class="octicon octicon-alert" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8.22 1.754a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368L8.22 1.754zm-1.763-.707c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z"></path></svg>
    <span class="js-stale-session-flash-signed-in" hidden>You signed in with another tab or window. <a href="">Reload</a> to refresh your session.</span>
    <span class="js-stale-session-flash-signed-out" hidden>You signed out in another tab or window. <a href="">Reload</a> to refresh your session.</span>
  </div>
    <template id="site-details-dialog">
  <details class="details-reset details-overlay details-overlay-dark lh-default color-text-primary hx_rsm" open>
    <summary role="button" aria-label="Close dialog"></summary>
    <details-dialog class="Box Box--overlay d-flex flex-column anim-fade-in fast hx_rsm-dialog hx_rsm-modal">
      <button class="Box-btn-octicon m-0 btn-octicon position-absolute right-0 top-0" type="button" aria-label="Close dialog" data-close-dialog>
        <svg class="octicon octicon-x" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path></svg>
      </button>
      <div class="octocat-spinner my-6 js-details-dialog-spinner"></div>
    </details-dialog>
  </details>
</template>

    <div class="Popover js-hovercard-content position-absolute" style="display: none; outline: none;" tabindex="0">
  <div class="Popover-message Popover-message--bottom-left Popover-message--large Box color-shadow-large" style="width:360px;">
  </div>
</div>




  </body>
</html>


```

> `featured` is included here as a filter field for the sake of completeness, although we do not support this in the extension yet.

#### [administrator/components/com_foos/ sql/updates/mysql/16.0.0.sql](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-49ec0cc94fa89db6f20d60195f94c0fe)

In case of an update of your component, the file `16.0.0.sql` adds a column to store the sequence.

[administrator/components/com_foos/ sql/updates/mysql/16.0.0.sql](https://github.com/astridx/boilerplate/blob/t16/src/administrator/components/com_foos/sql/updates/mysql/16.0.0.sql)

```xml {numberLines: -2}
-- https://raw.githubusercontent.com/astridx/boilerplate/t16/src/administrator/components/com_foos/sql/updates/mysql/16.0.0.sql

ALTER TABLE `#__foos_details` ADD COLUMN  `ordering` int(11) NOT NULL DEFAULT 0 AFTER `alias`;

```

### Modified files

#### [administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-262e27353fbe755d3813ea2df19cd0ed)

The form used to create or modify an element is extended with a field for specifying the order.

[administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/blob/9a7f1349a8b8371a96e93056d7764c557686f7c1/src/administrator/components/com_foos/forms/foo.xml)

```xml {diff}
 			label="JFIELD_ACCESS_LABEL"
 			size="1"
 		/>
+
+		<field
+			name="ordering"
+			type="ordering"
+			label="JFIELD_ORDERING_LABEL"
+			content_type="com_foos.foo"
+		/>
 	</fieldset>
 </form>

```

#### [administrator/components/com_foos/ sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-896f245bc8e493f91277fd33913ef974)

In case of a new installation, the script in the file `install.mysql.utf8.sql` creates the database. Here we add a column to store the order.

[administrator/components/com_foos/ sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/9a7f1349a8b8371a96e93056d7764c557686f7c1/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```xml {diff}

 ALTER TABLE `#__foos_details` ADD COLUMN  `language` char(7) NOT NULL DEFAULT '*' AFTER `alias`;

 ALTER TABLE `#__foos_details` ADD KEY `idx_language` (`language`);
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `ordering` int(11) NOT NULL DEFAULT 0 AFTER `alias`;

```

#### [administrator/components/com_foos/ src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-2daf62ad6c51630353e31eaa3cc28626)

There are a lot of changes in the model for the list. In the constructor we first save the filter fields to the configuration.

In the `getListQuery()` method we adjust the database query to respect the filters and sorting. This way the data is immediately in the form in which we display it.

[administrator/components/com_foos/ src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/9a7f1349a8b8371a96e93056d7764c557686f7c1/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php {diff}
 use Joomla\CMS\MVC\Model\ListModel;
 use Joomla\CMS\Language\Associations;
 use Joomla\CMS\Factory;
+use Joomla\Utilities\ArrayHelper;

 /**
  * Methods supporting a list of foo records.

 	 */
 	public function __construct($config = array())
 	{
+
+		if (empty($config['filter_fields']))
+		{
+			$config['filter_fields'] = array(
+				'id', 'a.id',
+				'name', 'a.name',
+				'catid', 'a.catid', 'category_id', 'category_title',
+				'published', 'a.published',
+				'access', 'a.access', 'access_level',
+				'ordering', 'a.ordering',
+				'language', 'a.language', 'language_title',
+				'publish_up', 'a.publish_up',
+				'publish_down', 'a.publish_down',
+			);
+
+			$assoc = Associations::isEnabled();
+
+			if ($assoc)
+			{
+				$config['filter_fields'][] = 'association';
+			}
+		}
+
 		parent::__construct($config);
 	}
 	/**

 				array(
 					'a.id', 'a.name', 'a.alias', 'a.access',
 					'a.catid', 'a.published', 'a.publish_up', 'a.publish_down',
-					'a.language'
+					'a.language', 'a.ordering', 'a.state'
 				)
 			)
 		);

 			$query->where($db->quoteName('a.language') . ' = ' . $db->quote($language));
 		}

+		// Filter by access level.
+		if ($access = $this->getState('filter.access'))
+		{
+			$query->where($db->quoteName('a.access') . ' = ' . (int) $access);
+		}
+
+		// Filter by published state
+		$published = (string) $this->getState('filter.published');
+
+		if (is_numeric($published))
+		{
+			$query->where($db->quoteName('a.published') . ' = ' . (int) $published);
+		}
+		elseif ($published === '')
+		{
+			$query->where('(' . $db->quoteName('a.published') . ' = 0 OR ' . $db->quoteName('a.published') . ' = 1)');
+		}
+
+		// Filter by a single or group of categories.
+		$categoryId = $this->getState('filter.category_id');
+
+		if (is_numeric($categoryId))
+		{
+			$query->where($db->quoteName('a.catid') . ' = ' . (int) $categoryId);
+		}
+		elseif (is_array($categoryId))
+		{
+			$query->where($db->quoteName('a.catid') . ' IN (' . implode(',', ArrayHelper::toInteger($categoryId)) . ')');
+		}
+
+		// Filter by search in name.
+		$search = $this->getState('filter.search');
+
+		if (!empty($search))
+		{
+			if (stripos($search, 'id:') === 0)
+			{
+				$query->where('a.id = ' . (int) substr($search, 3));
+			}
+			else
+			{
+				$search = $db->quote('%' . str_replace(' ', '%', $db->escape(trim($search), true) . '%'));
+				$query->where(
+					'(' . $db->quoteName('a.name') . ' LIKE ' . $search . ')'
+				);
+			}
+		}
+
+		// Add the list ordering clause.
+		$orderCol = $this->state->get('list.ordering', 'a.name');
+		$orderDirn = $this->state->get('list.direction', 'asc');
+
+		if ($orderCol == 'a.ordering' || $orderCol == 'category_title')
+		{
+			$orderCol = $db->quoteName('c.title') . ' ' . $orderDirn . ', ' . $db->quoteName('a.ordering');
+		}
+
+		$query->order($db->escape($orderCol . ' ' . $orderDirn));
+
 		return $query;
 	}

```

#### [administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-8e3d37bbd99544f976bf8fd323eb5250)

The view loads the filter form `src/administrator/components/com_foos/ forms/foo.xml`, which is displayed in the upper area. Besides we add here the check if the active user is allowed to perform actions.

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/9a7f1349a8b8371a96e93056d7764c557686f7c1/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}
 \defined('_JEXEC') or die;

+use Joomla\CMS\Component\ComponentHelper;
+use Joomla\CMS\Helper\ContentHelper;
+use Joomla\CMS\Language\Associations;
 use Joomla\CMS\Factory;
 use Joomla\CMS\Language\Text;
 use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
diff --git a/src/administrator/components/com_foos/src/View/Foos/HtmlView.php b/src/administrator/components/com_foos/src/View/Foos/HtmlView.php
index af7c2fa6..f966bd96 100644
--- a/src/administrator/components/com_foos/src/View/Foos/HtmlView.php
+++ b/src/administrator/components/com_foos/src/View/Foos/HtmlView.php

 use Joomla\CMS\Toolbar\ToolbarHelper;
 use FooNamespace\Component\Foos\Administrator\Helper\FooHelper;
 use Joomla\CMS\Factory;
+use Joomla\CMS\MVC\View\GenericDataException;

 /**
  * View class for a list of foos.

 	 */
 	protected $items;

+	/**
+	 * The model state
+	 *
+	 * @var  \JObject
+	 */
+	protected $state;
+
+	/**
+	 * Form object for search filters
+	 *
+	 * @var  \JForm
+	 */
+	public $filterForm;
+
+	/**
+	 * The active search filters
+	 *
+	 * @var  array
+	 */
+	public $activeFilters;
+
 	/**
 	 * The sidebar markup
 	 *

 	{
 		$this->items = $this->get('Items');

+		$this->filterForm = $this->get('FilterForm');
+		$this->activeFilters = $this->get('ActiveFilters');
+		$this->state = $this->get('State');
+
+		// Check for errors.
+		if (count($errors = $this->get('Errors')))
+		{
+			throw new GenericDataException(implode("\n", $errors), 500);
+		}
+
+		// Preprocess the list of items to find ordering divisions.
+		// TODO: Complete the ordering stuff with nested sets
+		foreach ($this->items as &$item)
+		{
+			$item->order_up = true;
+			$item->order_dn = true;
+		}
+
 		// We don't need toolbar in the modal window.
 		if ($this->getLayout() !== 'modal')
 		{

 			{
 				// If the language is forced we can't allow to select the language, so transform the language selector filter into a hidden field.
 				$languageXml = new \SimpleXMLElement('<field name="language" type="hidden" default="' . $forcedLanguage . '" />');
+				$this->filterForm->setField($languageXml, 'filter', true);
+
+				// Also, unset the active language filter so the search tools is not open by default with this filter.
+				unset($this->activeFilters['language']);
+
+				// One last changes needed is to change the category filter to just show categories with All language or with the forced language.
+				$this->filterForm->setFieldAttribute('category_id', 'language', '*,' . $forcedLanguage, 'filter');
 			}
 		}


 	 */
 	protected function addToolbar()
 	{
-		FooHelper::addSubmenu('foos');
-		$this->sidebar = \JHtmlSidebar::render();
-
 		$canDo = ContentHelper::getActions('com_foos');

```

#### [administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-3186af99ea4e3321b497b86fcd1cd757)

The code below shows all the essentials for using `searchtools` in the list view of the backend.
In the case of the header, I replaced `<?php echo TEXT::_('JGRID_HEADING_ACCESS') ?>` with `<?php echo HTMLHelper::_('searchtools.sort', 'JGRID_HEADING_ACCESS', 'access_level', $listDirn, $listOrder); ?>`. This way the header of the table is marked with a small arrow when a sort is active in a column.

[administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/9a7f1349a8b8371a96e93056d7764c557686f7c1/src/administrator/components/com_foos/tmpl/foos/default.php)

```php {diff}
 use Joomla\CMS\Language\Multilanguage;
 use Joomla\CMS\Language\Associations;
 use Joomla\CMS\Layout\LayoutHelper;
+use Joomla\CMS\Session\Session;

+$canChange = true;
 $assoc = Associations::isEnabled();
+$listOrder = $this->escape($this->state->get('list.ordering'));
+$listDirn  = $this->escape($this->state->get('list.direction'));
+$saveOrder = $listOrder == 'a.ordering';

+if ($saveOrder && !empty($this->items)) {
+	$saveOrderingUrl = 'index.php?option=com_foos&task=foos.saveOrderAjax&tmpl=component&' . Session::getFormToken() . '=1';
+}
 ?>
 <form action="<?php echo Route::_('index.php?option=com_foos'); ?>" method="post" name="adminForm" id="adminForm">
 	<div class="row">

 						echo 'col-md-12';
 					} ?>">
 			<div id="j-main-container" class="j-main-container">
+				<?php echo LayoutHelper::render('joomla.searchtools.default', ['view' => $this]); ?>
 				<?php if (empty($this->items)) : ?>
 					<div class="alert alert-warning">
 						<?php echo Text::_('JGLOBAL_NO_MATCHING_RESULTS'); ?>
 					</div>
 				<?php else : ?>
 					<table class="table" id="fooList">
+						<caption id="captionTable" class="sr-only">
+							<?php echo Text::_('COM_FOOS_TABLE_CAPTION'); ?>, <?php echo Text::_('JGLOBAL_SORTED_BY'); ?>
+						</caption>
 						<thead>
 							<tr>
+								<th scope="col" style="width:1%" class="text-center d-none d-md-table-cell">
+									<?php echo HTMLHelper::_('searchtools.sort', '', 'a.ordering', $listDirn, $listOrder, null, 'asc', 'JGRID_HEADING_ORDERING', 'icon-menu-2'); ?>
+								</th>
 								<td style="width:1%" class="text-center">
 									<?php echo HTMLHelper::_('grid.checkall'); ?>
 								</td>
 								<th scope="col" style="width:1%" class="text-center d-none d-md-table-cell">
-									<?php echo Text::_('COM_FOOS_TABLE_TABLEHEAD_NAME'); ?>
-								</th>
-								<th scope="col" style="width:1%; min-width:85px" class="text-center">
-									<?php echo TEXT::_('JSTATUS'); ?>
+									<?php echo HTMLHelper::_('searchtools.sort', 'COM_FOOS_TABLE_TABLEHEAD_NAME', 'a.name', $listDirn, $listOrder); ?>
 								</th>
 								<th scope="col" style="width:10%" class="d-none d-md-table-cell">
-									<?php echo TEXT::_('JGRID_HEADING_ACCESS') ?>
+									<?php echo HTMLHelper::_('searchtools.sort', 'JGRID_HEADING_ACCESS', 'access_level', $listDirn, $listOrder); ?>
 								</th>
 								<?php if ($assoc) : ?>
 									<th scope="col" style="width:10%">
-										<?php echo Text::_('COM_FOOS_HEADING_ASSOCIATION'); ?>
+										<?php echo HTMLHelper::_('searchtools.sort', 'COM_FOOS_HEADING_ASSOCIATION', 'association', $listDirn, $listOrder); ?>
 									</th>
 								<?php endif; ?>
 								<?php if (Multilanguage::isEnabled()) : ?>
 									<th scope="col" style="width:10%" class="d-none d-md-table-cell">
-										<?php echo Text::_('JGRID_HEADING_LANGUAGE'); ?>
+										<?php echo HTMLHelper::_('searchtools.sort', 'JGRID_HEADING_LANGUAGE', 'language_title', $listDirn, $listOrder); ?>
 									</th>
 								<?php endif; ?>
 								<th scope="col" style="width:1%; min-width:85px" class="text-center">
-									<?php echo Text::_('JSTATUS'); ?>
+									<?php echo HTMLHelper::_('searchtools.sort', 'JSTATUS', 'a.published', $listDirn, $listOrder); ?>
 								</th>
 								<th scope="col">
-									<?php echo Text::_('COM_FOOS_TABLE_TABLEHEAD_ID'); ?>
+									<?php echo HTMLHelper::_('searchtools.sort', 'JGRID_HEADING_ID', 'a.id', $listDirn, $listOrder); ?>
 								</th>
 							</tr>
 						</thead>

 						foreach ($this->items as $i => $item) :
 							?>
 							<tr class="row<?php echo $i % 2; ?>">
+								<td class="order text-center d-none d-md-table-cell">
+									<?php
+									$iconClass = '';
+									if (!$canChange) {
+										$iconClass = ' inactive';
+									} else if (!$saveOrder) {
+										$iconClass = ' inactive tip-top hasTooltip" title="' . HTMLHelper::_('tooltipText', 'JORDERINGDISABLED');
+									}
+									?>
+									<span class="sortable-handler<?php echo $iconClass; ?>">
+										<span class="icon-menu" aria-hidden="true"></span>
+									</span>
+									<?php if ($canChange && $saveOrder) : ?>
+										<input type="text" style="display:none" name="order[]" size="5"
+											value="<?php echo $item->ordering; ?>" class="width-20 text-area-order">
+									<?php endif; ?>
+								</td>
 								<td class="text-center">
 									<?php echo HTMLHelper::_('grid.id', $i, $item->id); ?>
 								</td>


 									<div class="small">
 										<?php echo Text::_('JCATEGORY') . ': ' . $this->escape($item->category_title); ?>
-									 </div>
+									</div>
 								</th>
 								<td class="text-center">
 									<?php
-									echo HTMLHelper::_('jgrid.published', $item->published, $i, 'foos.', true, 'cb', $item->publish_up, $item->publish_down);
+									echo HTMLHelper::_('jgrid.published', $item->published, $i, 'foos.', $canChange, 'cb', $item->publish_up, $item->publish_down);
 									?>
 								</td>
 								<td class="small d-none d-md-table-cell">

```

#### [administrator/components/com_foos/ tmpl/foos/modal.php](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-aeba8d42de72372f42f890d454bf928e)

Icons show us if a column is sorted and in which direction. To make the sorting clear to someone who doesn't see these markers, we add a `<caption>` element. This is not displayed, it is read out.

> The [class `visually-hidden`](https://getbootstrap.com/docs/5.0/getting-started/accessibility/#visually-hidden-content) hides an element for all devices except screen readers.

[administrator/components/com_foos/ tmpl/foos/modal.php](https://github.com/astridx/boilerplate/blob/9a7f1349a8b8371a96e93056d7764c557686f7c1/src/administrator/components/com_foos/tmpl/foos/modal.php)

```php {diff}
 			<table class="table table-sm">
 				<thead>
 					<tr>
+					<caption id="captionTable" class="sr-only">
+						<?php echo Text::_('COM_FOOS_TABLE_CAPTION'); ?>, <?php echo Text::_('JGLOBAL_SORTED_BY'); ?>
+					</caption>
 						<th scope="col" style="width:10%" class="d-none d-md-table-cell">
 						</th>
 						<th scope="col" style="width:1%">
```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.

2. The database has been changed, so it is necessary to update it. Open the 'System | Information | Database' area as described in part 16. Select your component and click `Update Structure`.

![Joomla Published](/images/j4x16x1.png)

3. Öffne die Ansicht deiner Komponente im Administrationsbereich und filter, sortiere und suche nach Items in deiner Komponente.

![Joomla Filtern Sortieren und Suchen -Searchtools](/images/j4x20x1.png)
