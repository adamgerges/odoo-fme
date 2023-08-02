odoo.define("website_slide_video.website_slide_video", function (require) {
  "use strict";
  // console.log(require);
  var core = require('web.core');
  var QWeb = core.qweb;
  var publicWidget = require('web.public.widget');
  // var fullscreen = require('website_slides.fullscreen');

  var Fullscreen = require('@website_slides/js/slides_course_fullscreen_player')[Symbol.for("default")];


  Fullscreen.include({
    xmlDependencies: (publicWidget.registry.websiteSlidesFullscreenPlayer.prototype.xmlDependencies || [])
      .concat(['/website_elearning_video/static/xml/extend_video_slides.xml']),

    // events: _.extend(Fullscreen.prototype.events, {
    //   'ended #elearning_uploaded_video': '_completeVideo',
    // }),

    // _completeVideo: function () {
    //   console.log('ended')
    // },

    /**
     * Extend the _renderSlide method so that slides of type "certification"
     * are also taken into account and rendered correctly
     *
     * @private
     * @override
     */
    _renderSlide: function () {
      var $this = this
      var def = this._super.apply(this, arguments);
      var slide = this.get('slide');
      var $content = this.$('.o_wslides_fs_content');
      if (slide.category === 'video' && slide.attachmentId == '' && slide.videoSourceType == "google_cloud") {
        $content.html(QWeb.render('website.slides.fullscreen.video.google_cloud', { widget: slide }));
      }
      else if (slide.category === 'video' && slide.attachmentId != '' && slide.videoSourceType == undefined) {
        $content.html(QWeb.render('website.slides.fullscreen.video.attachment', { widget: slide }));
      }
      if ($('.elearning_uploaded_video')[0]) {
        $('.elearning_uploaded_video').bind('contextmenu', function () { return false; });
        $('.elearning_uploaded_video')[0].addEventListener('ended', async function () {
          const data = await $this._rpc({
            route: `/slides/slide/set_completed`,
            params: { slide_id: slide.id },
          });

          $this.toggleCompletionButton(slide, true);
          $this.updateProgressbar(data.channel_completion);
        });
      }
      return Promise.all([def]);
    },
  })

  $(document).ready(function () {
    if ($('.elearning_uploaded_video')[0]) {
      $('.elearning_uploaded_video').bind('contextmenu', function () { return false; });
    }
  })
})
