CKEDITOR.on("instanceReady", function(evt) {
  const user = localStorage.getItem("email").split("@")[0];
  evt.editor.config.filebrowserUploadUrl += `?user=${user}`;
});

CKEDITOR.editorConfig = function(config) {
  config.removePlugins = "elementspath,image";
  config.extraPlugins = "image2,autogrow,codesnippet";
  config.toolbar = [
    { name: "basicstyles", items: ["Bold", "Italic", "Underline", "Strike"] },
    {
      name: "paragraph",
      items: [
        "NumberedList",
        "BulletedList",
        "-",
        "JustifyLeft",
        "JustifyCenter",
        "JustifyRight",
        "JustifyBlock"
      ]
    },
    {
      name: "insert",
      items: [
        "Image",
        "CodeSnippet",
        "HorizontalRule",
        "Smiley",
        "SpecialChar",
        "PageBreak"
      ]
    },
    "/",
    { name: "styles", items: ["Styles", "Format", "Font", "FontSize"] },
    { name: "colors", items: ["TextColor", "BGColor"] }
  ];
  config.image_previewText = " ";
  config.height = "500";
  config.filebrowserUploadUrl = "/uploads/images";
  config.autoGrow_minHeight = "500";
};
