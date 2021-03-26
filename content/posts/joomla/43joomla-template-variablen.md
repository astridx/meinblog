---
date: 2021-01-13
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Template - Parameter und Variablen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-template-variablen
langKey: de
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Parameter machen dasTemplate im Backend flexibel anpassbar. Vielleicht sollen eine Farbauswahl möglich sein? Das Standardtemplate Cassiopeia beitet `logoFile`, `siteTitle` und `siteDescription` als Parameter an. 

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t37...t38) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In diesem Abschnitt bearbeiten wir die Komponenten und fügen ein Plugin hinzu.

### Neue Dateien

In diesem Abschnitt wurde nur das Bild `templates/facile/images/banner.jpg` hinzugefügt, welches im Banner per CSS angezeigt wird.

#### Template

##### [templates/facile/index.php](https://github.com/astridx/boilerplate/compare/t37...t38#diff-6155acc1859344bb0cdb1ef792d0107971f0d60c87f3fc3138e9672a2b924931)


[templates/facile/index.php](https://github.com/astridx/boilerplate/compare/t37...t38#diff-6155acc1859344bb0cdb1ef792d0107971f0d60c87f3fc3138e9672a2b924931)

```php {diff}
 <html lang="de">
 
 <head>
-	<meta charset="utf-8">
-	<meta name="viewport" content="width=device-width, initial-scale=1.0">
-	<link rel="stylesheet" href="<?php echo $templatePath; ?>/assets/css/main.css" />
-	<title>Titel</title>
+    <meta charset="utf-8">
+    <meta name="viewport" content="width=device-width, initial-scale=1.0">
+    <link rel="stylesheet" href="<?php echo $templatePath; ?>/assets/css/main.css" />
+    <title>Titel</title>
 </head>
 
 <body class="homepage is-preload">
-	<div id="page-wrapper">
-
-		<?php if ($this->countModules('menu', true)) : ?>
-		<nav id="nav">
-			<jdoc:include type="modules" name="menu" />
-		</nav>
-		<?php endif; ?>
-
-		<section id="main">
-			<div class="container">
-				<div class="row gtr-200">
-					<div class="row">
-
-						<?php if ($this->countModules('top-a', true)) : ?>
-						<jdoc:include type="modules" name="top-a" style="hr" />
-						<?php endif; ?>
-
-						<?php if ($this->countModules('sidebar-left', true)) : ?>
-						<div class="col-3 col-12-medium">
-							<div class="sidebar">
-								<jdoc:include type="modules" name="sidebar-left" style="none" />
-							</div>
-						</div>
-						<?php endif; ?>
-
-						<div class="col-6 col-12-medium imp-medium">
-							<div class="content">
-
-								<?php if ($this->countModules('search', true)) : ?>
-								<section id="search">
-									<jdoc:include type="modules" name="breadcrumbs" style="none" />
-								</section>
-								<?php endif; ?>
-
-								<?php if ($this->countModules('search', true)) : ?>
-								<section id="search">
-									<jdoc:include type="modules" name="search" style="none" />
-								</section>
-								<?php endif; ?>
-
-								<jdoc:include type="modules" name="main-top" style="none" />
-								<jdoc:include type="message" />
-								<main>
-									<jdoc:include type="component" />
-								</main>
-
-								<jdoc:include type="modules" name="main-bottom" style="none" />
-
-							</div>
-						</div>
-
-						<?php if ($this->countModules('sidebar-right', true)) : ?>
-						<div class="col-3 col-12-medium">
-							<div class="sidebar">
-								<jdoc:include type="modules" name="sidebar-right" style="none" />
-							</div>
-						</div>
-						<?php endif; ?>
-
-						<?php if ($this->countModules('bottom-a', true)) : ?>
-						<jdoc:include type="modules" name="bottom-a" style="none" />
-						<?php endif; ?>
-					</div>
-				</div>
-			</div>
-		</section>
-
-		<footer id="footer">
-			<?php if ($this->countModules('footer', true)) : ?>
-			<div id="copyright">
-				<jdoc:include type="modules" name="footer" />
-			</div>
-			<?php endif; ?>
-		</footer>
-
-		<jdoc:include type="modules" name="debug" />
-		<!-- Scripts -->
-		<script src="<?php echo $templatePath; ?>/assets/js/jquery.min.js"></script>
-		<script src="<?php echo $templatePath; ?>/assets/js/jquery.dropotron.min.js"></script>
-		<script src="<?php echo $templatePath; ?>/assets/js/jquery.scrolly.min.js"></script>
-		<script src="<?php echo $templatePath; ?>/assets/js/browser.min.js"></script>
-		<script src="<?php echo $templatePath; ?>/assets/js/breakpoints.min.js"></script>
-		<script src="<?php echo $templatePath; ?>/assets/js/util.js"></script>
-		<script src="<?php echo $templatePath; ?>/assets/js/main.js"></script>
-
-
-	</div>
+    <div id="page-wrapper">
+
+        <?php if ($this->countModules('menu', true)) : ?>
+        <nav id="nav">
+            <jdoc:include type="modules" name="menu" />
+        </nav>
+        <?php endif; ?>
+
+        <?php if ($this->params->get('showBanner')) : ?>
+        <section id="banner">
+            <div class="content">
+                <h2><?php echo htmlspecialchars($this->params->get('bannerTitle')); ?></h2>
+                <p><?php echo htmlspecialchars($this->params->get('bannerDescription')); ?></p>
+                <a href="#main"
+                    class="button scrolly"><?php echo htmlspecialchars($this->params->get('bannerButton')); ?></a>
+            </div>
+        </section>
+        <?php endif; ?>
+
+        <section id="main">
+            <div class="container">
+                <div class="row gtr-200">
+                    <div class="row">
+
+                        <?php if ($this->countModules('top-a', true)) : ?>
+                        <jdoc:include type="modules" name="top-a" style="hr" />
+                        <?php endif; ?>
+
+                        <?php if ($this->countModules('sidebar-left', true)) : ?>
+                        <div class="col-3 col-12-medium">
+                            <div class="sidebar">
+                                <jdoc:include type="modules" name="sidebar-left" style="none" />
+                            </div>
+                        </div>
+                        <?php endif; ?>
+
+                        <div class="col-6 col-12-medium imp-medium">
+                            <div class="content">
+
+                                <?php if ($this->countModules('search', true)) : ?>
+                                <section id="search">
+                                    <jdoc:include type="modules" name="breadcrumbs" style="none" />
+                                </section>
+                                <?php endif; ?>
+
+                                <?php if ($this->countModules('search', true)) : ?>
+                                <section id="search">
+                                    <jdoc:include type="modules" name="search" style="none" />
+                                </section>
+                                <?php endif; ?>
+
+                                <jdoc:include type="modules" name="main-top" style="none" />
+                                <jdoc:include type="message" />
+                                <main>
+                                    <jdoc:include type="component" />
+                                </main>
+
+                                <jdoc:include type="modules" name="main-bottom" style="none" />
+
+                            </div>
+                        </div>
+
+                        <?php if ($this->countModules('sidebar-right', true)) : ?>
+                        <div class="col-3 col-12-medium">
+                            <div class="sidebar">
+                                <jdoc:include type="modules" name="sidebar-right" style="none" />
+                            </div>
+                        </div>
+                        <?php endif; ?>
+
+                        <?php if ($this->countModules('bottom-a', true)) : ?>
+                        <jdoc:include type="modules" name="bottom-a" style="none" />
+                        <?php endif; ?>
+                    </div>
+                </div>
+            </div>
+        </section>
+
+        <footer id="footer">
+            <?php if ($this->params->get('showFooter')) : ?>
+            <div class="col-12">
+                <section>
+                    <?php 
+                        $fieldValues = $this->params->get('showFooterTouchFields');
+
+                        if (empty($fieldValues))
+                        {
+                            return;
+                        }
+
+                        $html = '<ul class="contact">';
+
+                        foreach ($fieldValues as $value)
+                        {
+                            $html .= '<li><a class="icon brands ' . $value->touchsubicon . '" href="' . $value->touchsuburl . '"><span class="label">' . $value->touchsubname . '</span></a></li>';
+
+                        }
+
+                        $html .= '</ul>';
+
+                        echo $html;
+
+                    ?>
+                </section>
+            </div>
+            <?php endif; ?>
+
+
+            <?php if ($this->countModules('footer', true)) : ?>
+            <div id="copyright">
+                <jdoc:include type="modules" name="footer" />
+            </div>
+            <?php endif; ?>
+        </footer>
+
+        <jdoc:include type="modules" name="debug" />
+        <!-- Scripts -->
+        <script src="<?php echo $templatePath; ?>/assets/js/jquery.min.js"></script>
+        <script src="<?php echo $templatePath; ?>/assets/js/jquery.dropotron.min.js"></script>
+        <script src="<?php echo $templatePath; ?>/assets/js/jquery.scrolly.min.js"></script>
+        <script src="<?php echo $templatePath; ?>/assets/js/browser.min.js"></script>
+        <script src="<?php echo $templatePath; ?>/assets/js/breakpoints.min.js"></script>
+        <script src="<?php echo $templatePath; ?>/assets/js/util.js"></script>
+        <script src="<?php echo $templatePath; ?>/assets/js/main.js"></script>
+
+
+    </div>
 </body>
 
 </html>
```

##### [templates/facile/language/en-GB/tpl_facile.ini](https://github.com/astridx/boilerplate/compare/t37...t38#diff-e46f43df955f9c24f237c461cd835bdfc8dde798943f6999e8675d4045334d6f)

[templates/facile/language/en-GB/tpl_facile.ini](https://github.com/astridx/boilerplate/compare/t37...t38#diff-e46f43df955f9c24f237c461cd835bdfc8dde798943f6999e8675d4045334d6f)

```xml {diff}
 TPL_FACILE_XML_DESCRIPTION="Facile is a Joomla 4 template."
+;params
+TPL_FACILE_BANNER_FIELDSET_LABEL="Banner"
+TPL_FACILE_BANNER_FIELDSET_DESC="Please copy banner image file to /templates/facile/images/banner.jpg"
+TPL_FACILE_BANNER_LABEL="Show Banner"
+TPL_FACILE_BANNER_TITLE="Title text"
+TPL_FACILE_BANNER_TAGLINE="Tagline text"
+TPL_FACILE_BANNER_BUTTON="Button text"
+TPL_FACILE_FOOTER_FIELDSET_LABEL="Social Footer"
+TPL_FACILE_FOOTER_FIELDSET_DESC="For example: https://fontawesome.com/icons/facebook?style=brands"
+TPL_FACILE_FOOTER_LABEL="Show Social Footer"
+TPL_FACILE_GET_IN_TOUCH="Social Link"
+TPL_FACILE_GET_IN_TOUCH_SUBNAME="Name"
+TPL_FACILE_GET_IN_TOUCH_SUBICON="Icon"
+TPL_FACILE_GET_IN_TOUCH_SUBURL="URL"
```

##### [templates/facile/templateDetails.xml](https://github.com/astridx/boilerplate/compare/t37...t38#diff-6155acc1859344bb0cdb1ef792d0107971f0d60c87f3fc3138e9672a2b924931)


[templates/facile/templateDetails.xml](https://github.com/astridx/boilerplate/compare/t37...t38#diff-6155acc1859344bb0cdb1ef792d0107971f0d60c87f3fc3138e9672a2b924931)

```xml {diff}
 		<position>footer</position>
 		<position>debug</position>
 	</positions>
+	<config>
+		<fields name="params">
+			<fieldset name="banner" label="TPL_FACILE_BANNER_FIELDSET_LABEL" description="TPL_FACILE_BANNER_FIELDSET_DESC">
+				<field
+					name="showBanner"
+					type="radio"
+					label="TPL_FACILE_BANNER_LABEL"
+					layout="joomla.form.field.radio.switcher"
+					default="0"
+					filter="integer"
+					>
+					<option value="0">JNO</option>
+					<option value="1">JYES</option>
+				</field>
+
+				<field
+					name="bannerTitle"
+					type="text"
+					default="Welcome to the Joomla version of TXT by HTML5 UP"
+					label="TPL_FACILE_BANNER_TITLE"
+					filter="string"
+					showon="showBanner:1"
+				/>
+
+				<field
+					name="bannerDescription"
+					type="text"
+					default="A free responsive site template built on HTML5, CSS3, and some other stuff"
+					label="TPL_FACILE_BANNER_TAGLINE"
+					filter="string"
+					showon="showBanner:1"
+				/>
+
+				<field
+					name="bannerButton"
+					type="text"
+					default="Alright let's go"
+					label="TPL_FACILE_BANNER_BUTTON"
+					filter="string"
+					showon="showBanner:1"
+				/>
+			</fieldset>
+			<fieldset name="footer" label="TPL_FACILE_FOOTER_FIELDSET_LABEL" description="TPL_FACILE_FOOTER_FIELDSET_DESC">
+				<field
+					name="showFooter"
+					type="radio"
+					label="TPL_FACILE_FOOTER_LABEL"
+					layout="joomla.form.field.radio.switcher"
+					default="0"
+					filter="integer"
+					>
+					<option value="0">JNO</option>
+					<option value="1">JYES</option>
+				</field>
+
+				<field
+					name="showFooterTouchFields"
+					type="subform"
+					label="TPL_FACILE_GET_IN_TOUCH"
+					multiple="true"
+					max="10"
+					showon="showFooter:1"
+					>
+					<form>
+						<field
+							name="touchsubname"
+							type="text"
+							label="TPL_FACILE_GET_IN_TOUCH_SUBNAME"
+							/>
+						<field
+							name="touchsubicon"
+							type="text"
+							label="TPL_FACILE_GET_IN_TOUCH_SUBICON"
+							/>
+						<field
+							name="touchsuburl"
+							type="url"
+							label="TPL_FACILE_GET_IN_TOUCH_SUBURL"
+							size="30"
+							filter="url"
+							validate="url"
+							/>
+					</form>
+				</field>
+			</fieldset>
+		</fields>
+	</config>
 </extension>
```

## Teste dein Joomla-Template

1. Führe eine neue Installation durch. Deinstalliere hierzu deine bisherige Installation und kopiere alle Dateien erneut.

Kopiere die Dateien im `templates` Ordner in den `templates` Ordner deiner Joomla 4 Installation.

Installiere dein Template wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast.

2. Template Style Facile als aktiv.

3. Installiere die Beispieldaten für die Tests

4. Rufe die URL `joomla-cms4/index.php?tp=1` auf.



![Joomla Template erstellen - Banner über Parameter im Frontend](/images/j4x43x1.png)

![Joomla Template erstellen - Banner über Parameter im Backend](/images/j4x43x2.png)

![Joomla Template erstellen - Social Media Backend](/images/j4x43x3.png)

![Joomla Template erstellen - Social Media Frontend](/images/j4x43x4.png)

## Geänderte Dateien

### Übersicht

### Alle Änderungen

github.com/astridx/boilerplate/compare/t36...t37.diff

## Links

[Joomla 4 Template Lightning](https://github.com/C-Lodder/lightning)
[Joomla 4 Template Sloth](https://github.com/dgrammatiko/sloth-pkg)
