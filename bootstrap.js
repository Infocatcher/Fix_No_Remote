function install(params, reason) {
}
function uninstall(params, reason) {
}
function startup(params, reason) {
	noRemote.override();
}
function shutdown(params, reason) {
	// Note: we should also restore for APP_SHUTDOWN reason to not break restart feature
	noRemote.restore();
}

var noRemote = {
	_origNoRemote: null,
	get env() {
		delete this.env;
		return this.env = Components.classes["@mozilla.org/process/environment;1"]
			.getService(Components.interfaces.nsIEnvironment);
	},
	override: function() {
		this._origNoRemote = this.env.get("MOZ_NO_REMOTE");
		this.env.set("MOZ_NO_REMOTE", null);
	},
	restore: function() {
		var noRemote = this._origNoRemote;
		if(noRemote) {
			this._origNoRemote = null;
			this.env.set("MOZ_NO_REMOTE", noRemote);
		}
	}
};