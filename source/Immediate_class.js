class Immediate {
	static data = class {
		static immediates = {};
		static listeners = {};
	};
	static data2 = class {
		static immediates = {};
		static listeners = {};
	};
	/**
	 * Immediates are cancelled using {@link Immediate.clearImmediate}.
	 * @param {Function | undefined} handler
	 * @param  {...any} args
	 * @returns {number} The "Immediate" id.
	 */
	static setImmediate(handler = undefined ? Function() : undefined, ...args) {
		if (arguments.length < 1) {
			throw new TypeError(`Failed to execute 'setImmediate' on '${this.constructor.name}': 1 argument required, but only 0 present`);
		}
		const data = this.data;
		var last = parseInt(Object.keys(data.immediates)[Object.keys(data.immediates).length - 1]);
		last = isNaN(last) ? -1 : last;
		var id = last + 1;
		data.immediates[id] = handler;
		var enc1 = Math.random() * (id < 1.0 ? 1.0 : id);
		var enc = `setImmediate-${enc1 * (10 ** enc1.toString().length)}`;
		var arg = args;
		function a(e) {
			if (e.data == `${enc}`) {
				window.removeEventListener(`message`, a);
				if (Immediate.data.immediates[id] != undefined && Immediate.data.immediates[id].call != undefined) {
					Immediate.data.immediates[id].call(this, ...arg);
				}
				delete Immediate.data.immediates[id];
				delete Immediate.data.listeners[id];
			}
			return undefined;
		}
		data.listeners[id] = a;
		window.addEventListener(`message`, a);
		window.postMessage(`${enc}`, `*`);
		return id;
	};
	/**
	 * The global {@link Immediate.clearImmediate} method cancels a "Immediate" previously established by calling {@link Immediate.setImmediate}.
	 * @param {Number | undefined} id
	 * @returns {undefined} None (undefined)
	 */
	static clearImmediate(id = undefined ? Number() : undefined) {
		try {
			delete this.data.immediates[id];
		} catch (err) { };
		try {
			window.removeEventListener(`message`, setImmediate.data.listeners[id]);
		} catch (err) { };
		try {
			delete this.data.listeners[id];
		} catch (err) { };
		return undefined;
	};
	/**
	 * ImmediateIntervals are cancelled using {@link Immediate.clearImmediateInterval}.
	 * @param {Function | undefined} handler
	 * @param  {...any} args 
	 * @returns {number} The "ImmediateInterval" id.
	 */
	static setImmediateInterval(handler = undefined ? Function() : undefined, ...args) {
		if (arguments.length < 1) {
			throw new TypeError(`Failed to execute 'setImmediateInterval' on '${this.constructor.name}': 1 argument required, but only 0 present`);
		}
		const data = Immediate.data2;
		var last = parseInt(Object.keys(data.immediates)[Object.keys(data.immediates).length - 1]);
		last = isNaN(last) ? -1 : last;
		var id = last + 1;
		data.immediates[id] = handler;
		var enc1 = Math.random() * (id < 1.0 ? 1.0 : id);
		var enc = `setImmediateInterval-${enc1 * (10 ** enc1.toString().length)}`;
		var arg = args;
		function a(e) {
			if (e.data == `${enc}`) {
				window.postMessage(`${enc}`, `*`);
				if (Immediate.data2.immediates[id] != undefined && Immediate.data2.immediates[id].call != undefined) {
					Immediate.data2.immediates[id].call(this, ...args);
				}
			}
			return undefined;
		}
		data.listeners[id] = a;
		window.addEventListener(`message`, a);
		window.postMessage(`${enc}`, `*`);
		return id;
	};
	/**
	 * The global {@link Immediate.clearImmediateInterval} method cancels a "ImmediateInterval" previously established by calling {@link Immediate.setImmediateInterval}.
	 * @param {Number | undefined} id
	 * @returns {undefined} None (undefined)
	 */
	static clearImmediateInterval(id = undefined ? Number() : undefined) {
		try {
			delete Immediate.data2.immediates[id];
		} catch (err) { };
		try {
			window.removeEventListener(`message`, Immediate.data2.listeners[id]);
		} catch (err) { };
		try {
			delete Immediate.data2.listeners[id];
		} catch (err) { };
		return undefined;
	};
};
