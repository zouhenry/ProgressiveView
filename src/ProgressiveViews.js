//Version 0.2
//Changelog: Updated to be compatible with Marionette Js 2.0
//Changed the design from time based to event based. This produces a much more consistent rendering across browsers / CPU speeds

var progressive = {
    showCollection: function () {   //this will only get called when this.collection is not empty

        var that = this;    //create a closure for setTimeout()
        var index = 0;      //model index
        
        //listen to the "render:complete" event, then render the next item
        this.listenTo(this.collection, "render:complete", function () {

            //using a setTimeout will allow next iteration to render when the current stack is cleared
            setTimeout(function () {
                var newIndex = ++index;
                if (newIndex === that.collection.length) {

                    that.stopListening(that.collection, "render:complete"); //stop listening to the event
                    
                    that.triggerMethod("showCollection:complete");  //notify when every item has been renderred
                } else {
                    that.renderChild(newIndex);
                }
            });
        });
        
        this.renderChild(index);    //kicks off the first render
    },
    renderChild: function (index) {
        var model = this.collection.at(index);      // gets the model by its index
        var ItemView = this.getChildView(model);    // gets the child view type
        this.addChild(model, ItemView, index);      // utilizes built-in addChild to render the view and append to DOM

        this.collection.trigger("render:complete"); // triggers 'rendering:complete' event 
    }
}

Marionette.ProgressiveCompositeView = Marionette.CompositeView.extend(progressive);     // creates a new ProgressiveCompositeView using CompositeView as base

Marionette.ProgressiveCollectionView = Marionette.CollectionView.extend(progressive);   // creates a new ProgressiveCollectionView using CompositeView as base