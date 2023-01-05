export class FormValidator {
    constructor() {}

    /*
     * @private
     * Determines if a form dom node was passed in or just a string representing the form name
     */

    _formByNameOrNode(formNameOrNode) {
        return typeof formNameOrNode === "object" ? formNameOrNode : document.forms[formNameOrNode];
    }
}
