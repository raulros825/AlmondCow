(function($) {
    $.fn.scrollSlideReveal = function(options) {
        var isMobile = /iPhone|iPod|Android|Windows Phone|Nokia/i.test(
            navigator.userAgent
        );
        if (isMobile) {
            options.height = options.height / 2;
            options.width = options.width / 2;

            if (options.border && options.border.width) {
                options.border.width = options.border.width / 2;
            }
        }

        var el = this;
        $(el).css("position", "relative");
        $(el).css("height", options.height + "px");

        if (
            !options.direction ||
            (options.direction != "right" && options.direction != "left")
        )
            options.direction = "left";
        var borderDirection = options.direction == "right" ? "left" : "right";

        var firstDiv = document.createElement("div");
        firstDiv.setAttribute(
            "style",
            "position: absolute; height: " +
                options.height +
                "px; width: " +
                options.width +
                "px; " +
                options.direction +
                ": calc(50% - " +
                options.width / 2 +
                "px); background-image: url('" +
                options.images[1] +
                "'); background-size: " +
                options.width +
                "px " +
                options.height +
                "px"
        );

        var secondDiv = document.createElement("div");
        secondDiv.setAttribute(
            "style",
            "position: absolute; height: " +
                options.height +
                "px; width: " +
                options.width +
                "px; " +
                options.direction +
                ": calc(50% - " +
                options.width / 2 +
                "px); background-image: url('" +
                options.images[0] +
                "'); background-size: " +
                options.width +
                "px " +
                options.height +
                "px; background-origin: border-box"
        );

        el.append(firstDiv);
        el.append(secondDiv);

        var firstOffset = firstDiv.getBoundingClientRect().top;
        var pageMaxScroll = document.documentElement.scrollTopMax;

        window.onscroll = function() {
            var pageScroll = Math.max(
                window.pageYOffset,
                document.documentElement.scrollTop,
                document.body.scrollTop
            );

            var multiplier,
                lastOffset = firstDiv.getBoundingClientRect().top;
            lastOffset = lastOffset < 0 ? 0 : lastOffset;

            // console.log(
            //     pageMaxScroll,
            //     firstOffset,
            //     lastOffset,
            //     document.documentElement.scrollTop,
            //     window.innerHeight
            //);

            if (pageMaxScroll < firstOffset) {
                multiplier = (pageMaxScroll - pageScroll) / pageMaxScroll;
            } else if (firstOffset > window.innerHeight) {
                multiplier =
                    (pageScroll - (firstOffset - window.innerHeight)) /
                    (firstOffset +
                        firstDiv.getBoundingClientRect().height -
                        (firstOffset - window.innerHeight));
            } else {
                multiplier = lastOffset / firstOffset;
            }

            if (multiplier > 1) {
                multiplier = 1;
            } else if (multiplier < 0) {
                multiplier = 0;
            }

            var backgroundPositionMultiplier =
                options.direction == "right" ? multiplier : 0;

            $(secondDiv).css("width", multiplier * options.width + "px");
            $(secondDiv).css(
                "background-position-x",
                backgroundPositionMultiplier * options.width + "px"
            );

            if (
                multiplier > 0 &&
                multiplier < 1 &&
                options.border &&
                options.border.width &&
                options.border.color
            ) {
                $(secondDiv).css(
                    "border-" + borderDirection,
                    options.border.width + "px solid " + options.border.color
                );
            } else {
                $(secondDiv).css("border-" + borderDirection, "0px");
            }
        };
    };
})(jQuery);

window.onbeforeunload = function() {
    window.scrollTo(0, 0);
};
