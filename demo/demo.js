//Disclaimer: Do not use this scode in production. As it is created only to test ProgressiveViews's usage.

var dummyData = _.range(20).map(function (item) {
    return { id: item, label: "count " + item };
});

var ListItemView = Marionette.ItemView.extend({
    tagName: "li",
    template: "#template_item",
    onRender: function () {
        for (var cnt = 0; cnt < 50000000; cnt++) {
            var wasteCycles = cnt;
        }
        console.log("rendering: " + this.model.get("id"));
    }
});

var renderIntoDom = function (mainView) {
    $timerContent.hide();
    demoRegion.reset();                 //remove the existing view and remove bindings
	var start = Date.now();
    setTimeout(function () {            //gives the page a chance to clear the previous content
        demoRegion.show(mainView);      //render and display the view in region
        $timerContent.show();
        var end = Date.now();
        $timer.html(end - start + "ms");

    });
};

var renderProgressive = function () {
    //Progressive
    var ListView = Marionette.ProgressiveCompositeView.extend({ //progressive view
        childView: ListItemView,
        template: "#template_list",
        itemViewContainer: "#items_container",
        seralizeData: function () {
            return {};
        }
    });


    var entities = new Backbone.Collection(dummyData);
    var mainView = new ListView({ collection: entities });


    var start = Date.now();
    mainView.listenTo(entities, "showCollection:complete", function () {
        var end = Date.now();
        $timer.append(" <-> total time took: " + (end - start) + "ms");
    });

    renderIntoDom(mainView);
}

var renderRegular = function () {
    //regular
    var ListView = Marionette.CompositeView.extend({    //regular view
        childView: ListItemView,
        template: "#template_list",
        itemViewContainer: "#items_container",
        seralizeData: function () {
            return {};
        }
    });


    var entities = new Backbone.Collection(dummyData);  
    var mainView = new ListView({ collection: entities });
    renderIntoDom(mainView);
}
var $timerContent = $("#timerContent").hide();
var $timer = $timerContent.find("#timer");
var demoRegion = new Marionette.Region({ el: "#demoContent" }); //creates a new region
$("#renderProgressive").on("click", renderProgressive);         //bind to click event
$("#renderRegular").on("click", renderRegular);                 //bind to click event
