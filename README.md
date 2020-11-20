Yii2 Advanced CKEditor
===

Integrate CKEditor for Yii 2 framework, and integrate `codesnippet`, `mentions` and `CKFinder` plugins.

- `codesnippet`: Highlight code blocks
- `mentions`: can use `@` to mention some users and use `#` to mention some tickets
- `CKFinder`: need manually to download and put under `web` folder

**NOTE:** There are some customized integration, please see the following documentation.

## Configure CKEditor

### Configure Mentions

1) Mofidy the config file `vendor/winds1983/yii2-ckeditor/src/editor/config.js`, then you can change the below paramters:

- `feed`: Data source
- `itemTemplate`: Display template when query with @ or #
- `outputTemplate`: Display after select


```javascript
CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';

    // https://ckeditor.com/docs/ckeditor4/latest/features/codesnippet.html
    //config.codeSnippet_theme = 'pojoaque';

    // https://ckeditor.com/docs/ckeditor4/latest/features/mentions.html
    // config.mentions = [ { feed: ['Anna', 'Thomas', 'John'], minChars: 0 } ];
	config.mentions = [
		{
			feed: '/mention/users?name={encodedQuery}', // Implement it in your controller
			marker: '@',
            itemTemplate: '<li data-id="{id}">' +
				'<img class="img-circle mention-avatar" src="{avatar}" /> ' +
				'<strong class="fullname">{fullname}</strong> ' +
				'<span class="english_name">{fullEnglishName}</span>' +
			'</li>',
			//outputTemplate: '<a href="mailto:{email}">@{fullEnglishName}</a><span>&nbsp;</span>',
			minChars: 0
		},
		{
			feed: '/mention/tickets?name={encodedQuery}', // Implement it in your controller
			marker: '#',
			itemTemplate: '<li data-id="{id}"><strong>{region}</strong> {name}</li>',
			outputTemplate: '<a href="{tp_link}">{name}</a><span>&nbsp;</span>',
			minChars: 1
		}
	];
};
```

2) Add below style to you css file

```css
.mention-avatar {
    width: 22px;
}
```


#### Configuration Reference

```javascript
CKEDITOR.replace( 'editor1', {
    plugins: 'mentions,emoji,basicstyles,undo,link,wysiwygarea,toolbar',
    contentsCss: [
        CKEDITOR.basePath + 'contents.css',
        'assets/mentions/contents.css'
    ],
    height: 150,
    toolbar: [
        { name: 'document', items: [ 'Undo', 'Redo' ] },
        { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Strike' ] },
        { name: 'links', items: [ 'EmojiPanel', 'Link', 'Unlink' ] }
    ],
    mentions: [
        {
            feed: dataFeed,
            itemTemplate: '<li data-id="{id}">' +
                    '<img class="photo" src="assets/mentions/img/{avatar}.jpg" />' +
                    '<strong class="username">{username}</strong>' +
                    '<span class="fullname">{fullname}</span>' +
                '</li>',
            outputTemplate: '<a href="mailto:{username}@example.com">@{username}</a><span>&nbsp;</span>',
            minChars: 0
        },
        {
            feed: tags,
            marker: '#',
            itemTemplate: '<li data-id="{id}"><strong>{name}</strong></li>',
            outputTemplate: '<a href="https://example.com/social?tag={name}">{name}</a><span>&nbsp;</span>',
            minChars: 1
        }
    ]
} );
```

* [Mentions, Tags and Emoji](https://ckeditor.com/docs/ckeditor4/latest/examples/mentions.html#!/guide/dev_mentions.html)


## Integrate CKFinder

1) Download latest `CKFinder` (e.g: `CKFinder 3.5.1.1 for PHP`) from [CKFinder download](https://ckeditor.com/ckfinder/download/) page, then unzip and put it under `web` folder, like this:

```bash
/web/ckfinder
```

2) Define `CKFinderBaseUrl` in head of global page

```javascript
<script type="text/javascript">
    var CKFinderBaseUrl = '<?php echo Yii::$app->request->baseUrl; ?>/ckfinder';
</script>
```

3) Add below code to the file `vendor/winds1983/yii2-ckeditor/src/editor/config.js`

```javascript
if (typeof CKFinderBaseUrl != "undefined" || CKFinderBaseUrl) {
    config.filebrowserBrowseUrl = CKFinderBaseUrl + '/ckfinder.html';
    config.filebrowserImageBrowseUrl = CKFinderBaseUrl + '/ckfinder.html?type=Images';
    config.filebrowserFlashBrowseUrl = CKFinderBaseUrl + '/ckfinder.html?type=Flash';
    config.filebrowserUploadUrl = CKFinderBaseUrl + '/core/connector/php/connector.php?command=QuickUpload&type=Files';
    config.filebrowserImageUploadUrl = CKFinderBaseUrl + '/core/connector/php/connector.php?command=QuickUpload&type=Images';
    config.filebrowserFlashUploadUrl = CKFinderBaseUrl + '/core/connector/php/connector.php?command=QuickUpload&type=Flash';
    config.filebrowserWindowWidth = '1000';
    config.filebrowserWindowHeight = '700';
}
```

4) Configure CKFinder

`web/ckfinder/config.php`

Configure authentication:

```php
$config['authentication'] = function () {
    return true;
};
```

Update `baseUrl` to change upload root directory

```php
$config['backends'][] = array(
    'name'         => 'default',
    'adapter'      => 'local',
    'baseUrl'      => '/uploads/userfiles/', // change /ckfinder/userfiles/ to your own folder
//  'root'         => '', // Can be used to explicitly set the CKFinder user files directory.
    'chmodFiles'   => 0777,
    'chmodFolders' => 0755,
    'filesystemEncoding' => 'UTF-8',
);
```
If you want to get path when insert to Editor, you can set `baseUrl` with domian, like this:
```php
'baseUrl'      => 'http://fd.shinetechxian.com/uploads/userfiles/',
```
