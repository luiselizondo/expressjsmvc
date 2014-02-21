/** 
 * Express does not accept multiple view locations so we have to patch express
 * Proposed solution found here 
 * http://stackoverflow.com/questions/11315351/multiple-view-paths-on-node-js-express
 */

function ViewEnableMultiFolders(app) {
  // Monkey-patch express to accept multiple paths for looking up views.
  // this path may change depending on your setup.
  var lookup_proxy = app.settings.view.prototype.lookup;

  app.settings.view.prototype.lookup = function(viewName) {
    console.log(viewName);
    var context, match;
    if (this.root instanceof Array) {
      for (var i = 0; i < this.root.length; i++) {
        context = {root: this.root[i]};
        console.log(context);
        match = lookup_proxy.call(context, viewName);
        if (match) {
          return match;
        }
      }
      return null;
    }
    return lookup_proxy.call(this, viewName);
  };
}

module.exports = ViewEnableMultiFolders;