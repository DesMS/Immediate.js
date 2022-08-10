/**
 * Immediates are cancelled using {@link clearImmediate}.
 * @param {Function | undefined} handler
 * @param  {...any} arguments
 * @returns {number} The "Immediate" id.
 */
function setImmediate(handler = undefined ? Function() : undefined, ...arguments) {
	if (setImmediate.data == undefined || setImmediate.data.prototype.constructor.name != `setImmediateData`) {
		setImmediate.data = class setImmediateData {
			static immediates = {};
			static listeners = {};
		};
	}
	if (setImmediate.arguments.length < 1) {
		throw new TypeError(`Failed to execute 'setImmediate' on '${this.constructor.name}': 1 argument required, but only 0 present`);
	}
	const data = setImmediate.data;
	var last = parseInt(Object.keys(data.immediates)[Object.keys(data.immediates).length - 1]);
	last = isNaN(last) ? -1 : last;
	var id = last + 1;
	data.immediates[id] = handler;
	var enc1 = Math.random() * (id < 1.0 ? 1.0 : id);
	var enc = `setImmediate-${enc1 * (10 ** enc1.toString().length)}`;
	var args = arguments;
	function a(e) {
		if (e.data == `${enc}`) {
			window.removeEventListener(`message`, a);
			if (setImmediate.data.immediates[id] != undefined && setImmediate.data.immediates[id].call != undefined) {
				setImmediate.data.immediates[id].call(this, ...args);
			}
			delete setImmediate.data.immediates[id];
			delete setImmediate.data.listeners[id];
		}
		return undefined;
	}
	data.listeners[id] = a;
	window.addEventListener(`message`, a);
	window.postMessage(`${enc}`, `*`);
	return id;
};
setImmediate.data = undefined;
/**
 * The global {@link clearImmediate} method cancels a "Immediate" previously established by calling {@link setImmediate}.
 * @param {Number | undefined} id
 * @returns {undefined} None (undefined)
 */
function clearImmediate(id = undefined ? Number() : undefined) {
	try {
		delete setImmediate.data.immediates[id];
	} catch (err) { };
	try {
		window.removeEventListener(`message`, setImmediate.data.listeners[id]);
	} catch (err) { };
	try {
		delete setImmediate.data.listeners[id];
	} catch (err) { };
	return undefined;
}
/**
 * ImmediateIntervals are cancelled using {@link clearImmediateInterval}.
 * @param {Function | undefined} handler
 * @param  {...any} arguments
 * @returns {number} The "ImmediateInterval" id.
 */
function setImmediateInterval(handler = undefined ? Function() : undefined, ...arguments) {
	if (setImmediateInterval.data == undefined || setImmediateInterval.data.prototype.constructor.name != `setImmediateIntervalData`) {
		setImmediateInterval.data = class setImmediateIntervalData {
			static immediates = {};
			static listeners = {};
		};
	}
	if (setImmediateInterval.arguments.length < 1) {
		throw new TypeError(`Failed to execute 'setImmediateInterval' on '${this.constructor.name}': 1 argument required, but only 0 present`);
	}
	const data = setImmediateInterval.data;
	var last = parseInt(Object.keys(data.immediates)[Object.keys(data.immediates).length - 1]);
	last = isNaN(last) ? -1 : last;
	var id = last + 1;
	data.immediates[id] = handler;
	var enc1 = Math.random() * (id < 1.0 ? 1.0 : id);
	var enc = `setImmediateInterval-${enc1 * (10 ** enc1.toString().length)}`;
	var args = arguments;
	function a(e) {
		if (e.data == `${enc}`) {
			window.postMessage(`${enc}`, `*`);
			if (setImmediateInterval.data.immediates[id] != undefined && setImmediateInterval.data.immediates[id].call != undefined) {
				setImmediateInterval.data.immediates[id].call(this, ...args);
			}
		}
		return undefined;
	}
	data.listeners[id] = a;
	window.addEventListener(`message`, a);
	window.postMessage(`${enc}`, `*`);
	return id;
};
setImmediateInterval.data = undefined;
/**
 * The global {@link clearImmediateInterval} method cancels a "ImmediateInterval" previously established by calling {@link setImmediateInterval}.
 * @param {Number | undefined} id
 * @returns {undefined} None (undefined)
 */
function clearImmediateInterval(id = undefined ? Number() : undefined) {
	try {
		delete setImmediateInterval.data.immediates[id];
	} catch (err) { };
	try {
		window.removeEventListener(`message`, setImmediateInterval.data.listeners[id]);
	} catch (err) { };
	try {
		delete setImmediateInterval.data.listeners[id];
	} catch (err) { };
	return undefined;
};
