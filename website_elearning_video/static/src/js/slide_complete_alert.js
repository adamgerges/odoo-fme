odoo.define('website_elearning_video.video_complete_alert',function(require){
    'use static'

    var publicWidget = require('web.public.widget');
    publicWidget.registry.completeVideoAlert = publicWidget.Widget.extend({
        selector:'#elearning_uploaded_video',
        // events:{
        //     'click #elearning_uploaded_video': '_completeVideo',
        // },
        
        init : function(){
            this.getUpdate();
            this._super.apply(this,arguments)
        },
        
    })

  
})
