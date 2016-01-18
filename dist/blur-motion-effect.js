(function(){
    var handClass = "blur-motion-effect",
        defaultIntensity = 0.25;

    $.attrHooks["stddeviation"] = {
        set: function(elem, value) {
            elem.setAttribute("stdDeviation", value);
            return value;
        },
        get: function(elem) {
            return elem.getAttribute("stdDeviation");
        }
    };
    $.fn.blurMotionEffect = function (intensity) {
        this.addClass(handClass);
        this.setBlurMotionIntensity(intensity);
        return this;
    };
    $.fn.destroyBlurMotionEffect = function () {
        this.removeClass(handClass);
        this.getBlurMotionFilter().remove();
        return this;
    };

    $.fn.setBlurMotionIntensity = function (intensity) {
        this.data("blurMotionIntensity", parseFloat(intensity));
        return this;
    };
    $.fn.getBlurMotionIntensity = function () {
        var intensity = this.data("blurMotionIntensity");
        return intensity >= 0 ? intensity : defaultIntensity;
    };

    $.fn.setBlurMotionLastOffset = function (offset) {
        offset.top = parseInt(offset.top);
        offset.left = parseInt(offset.left);
        this.data("blurMotionLastOffset", offset);
        return this;
    };
    $.fn.getBlurMotionLastOffset = function () {
        var offset = this.data("blurMotionLastOffset");
        return offset ? offset : this.offset();
    };

    $.fn.getBlurMotionFilter = function () {
        var filterMatches = this.css("filter").match(/url\(['"]?#([a-z0-9-_]+)['"]?\)/i),
            selector = "";
        if (filterMatches && filterMatches.length >= 1) {
            selector = "#" + filterMatches[1];
        }
        return $(selector);
    };
    $.fn.createBlurMotionFilter = function () {
        var newFilterId = getRandomString(16);
        while ($("#" + newFilterId).length) {
            newFilterId = getRandomString(16);
        }
        var blurClone = document.querySelector("#blur-motion-example").cloneNode(true);
        blurClone.setAttribute("id", newFilterId);
        $("#blur-motion-filters-box").append(blurClone);
        this.css({
            "filter": "url(#" + newFilterId + ")",
            "-webkit-filter": "url(#" + newFilterId + ")"
        });
        return $("#" + newFilterId);
    };

    $.fn.getBlurMotionValues = function () {
        var values = this.getBlurMotionFilter().find("feGaussianBlur").attr("stdDeviation").split(",");
        return {
            x: values[0],
            y: values[1]
        };
    };
    $.fn.setBlurMotionValues = function (x, y) {
        var $filter = this.getBlurMotionFilter();
        $filter = $filter.length > 0 ? $filter : this.createBlurMotionFilter();
        $filter.find("feGaussianBlur").attr("stdDeviation", parseInt(x) + "," + parseInt(y));
        return this;
    };

    var requestAnimationFrameEx = (function(){
        return window.requestAnimationFrame    ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(callback){
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    var updateMotionBlur = function () {
        $("." + handClass).each(function(){
            var $this = $(this),
                currentPos = $this.offset(),
                lastPos = $this.getBlurMotionLastOffset(),
                intensity = $this.getBlurMotionIntensity();

            var values = {
                x: Math.abs(currentPos.left - lastPos.left) * intensity,
                y: Math.abs(currentPos.top - lastPos.top) * intensity
            };
            $this.setBlurMotionValues(values.x, values.y)
                .setBlurMotionLastOffset(currentPos)
                .trigger("blurMotionEffectRender", values);
        });
        requestAnimationFrameEx(updateMotionBlur);
    };
    var getRandomString = function (length) {
        return Math.random().toString(36).substr(2, length + 2);
    };

    $(function(){
        $("body").prepend("<svg style=\"position: absolute; width: 0; height: 0; overflow: hidden; pointer-events: none;\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\"><defs id=\"blur-motion-filters-box\"><filter id=\"blur-motion-example\"><feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"0,0\" /></filter></defs></svg>");
        updateMotionBlur();
    });
})();