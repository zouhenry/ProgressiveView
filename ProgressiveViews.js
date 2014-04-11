
var progressive = {
    delayTimeIncrement: 10,
    showCollection: function () {
        var that = this, ItemView, delayTimeIncrement, timeout = 0;

        //get delayTimeIncrement using getOptions
        delayTimeIncrement = Marionette.getOption(this, "delayTimeIncrement");

        //looping through all models in this collection
        this.collection.each(function (item, index) {
            setTimeout(function () {
                //Create the view
                ItemView = that.getItemView(item);
                that.addItemView(item, ItemView, index);
                
                if (index === that.collection.length) {
                    //since this is on a setTimeout, 
                    //need to know when the last item added
                    that.triggerMethod("showCollection:complete");
                }
            }, timeout);    //initially 0

            timeout += delayTimeIncrement;  //increment by 10ms (default) for each item
        }, this);
    }
}

Marionette.ProgressiveCompositeView = Marionette.CompositeView.extend(progressive);

Marionette.ProgressiveCollectionView = Marionette.CollectionView.extend(progressive);