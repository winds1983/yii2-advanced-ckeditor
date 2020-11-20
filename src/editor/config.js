/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

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

	// https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html#cfg-removePlugins
	//config.removePlugins = 'about';

	// CKFinder
	// https://ckeditor.com/docs/ckfinder/ckfinder3/#!/guide/dev_ckeditor
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
};
